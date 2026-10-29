'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import type { JourneyIcon, JourneyStep, ResolvedJourney } from '@/lib/journeys';
import JourneyScene from './JourneyScene';
import InstallModal from '../install/InstallModal';
import { initialOf } from '@/lib/initial';

const STORAGE_KEY = 'cz-journeys-v2';

type Progress = Record<string, string[]>; // journey id → slugs marked done

// Per-viewer convenience only. The page works the same without it.
function loadProgress(): Progress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveProgress(value: Progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* private window or blocked storage: progress just won't persist */
  }
}

/** Shorter display titles: drop "Cozora Skills:" and a trailing "Skill"/"Post". */
function displayTitle(title: string): string {
  let t = title.replace(/^cozora skills:\s*/i, '').trim();
  if (!/claude skill$/i.test(t)) t = t.replace(/\s+(skill|post)$/i, '').trim();
  if (t.length > 38 && t.includes(': ')) t = t.split(': ')[0];
  return t;
}

/** Link steps (the install guide) are free pages on cozora.org; every library skill is a Premium Substack post. */
function isFree(step: JourneyStep) {
  return step.url.startsWith('/');
}

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cz-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F3]';

const ICON_PATHS: Record<JourneyIcon, string> = {
  sparkles:
    'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z',
  pen: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10',
  chat: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155',
  play: 'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z',
  swatch:
    'M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z',
  bulb: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
  code: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
};

// Gradients from the four brand colors (teal, fuchsia, amber, mint) plus one warm peach.
// Light gradients only: the glyphs on them are Ink (#22303A), which clears 3:1 on every stop.
const ICON_GRADIENT: Record<JourneyIcon, string> = {
  sparkles: 'from-[#FFD2B0] to-[#B9A6EE]',
  pen: 'from-[#8FD3C4] to-[#C8EBE2]',
  chat: 'from-[#FFB48A] to-[#FFD2B0]',
  play: 'from-[#B9A6EE] to-[#FFB48A]',
  swatch: 'from-[#FFD2B0] to-[#8FD3C4]',
  bulb: 'from-[#B9A6EE] to-[#D9CCF7]',
  code: 'from-[#8FD3C4] to-[#B9A6EE]',
};

function Icon({ name, className = '' }: { name: JourneyIcon; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[name]} />
    </svg>
  );
}

function Arrow({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

function Check({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function AccessBadge({ step }: { step: JourneyStep }) {
  return isFree(step) ? (
    <span className="inline-flex items-center rounded-full bg-cz-deep-teal px-2.5 py-1 font-mono text-[11px] font-medium text-cz-teal">Free guide</span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-cz-coral/10 px-2.5 py-1 font-mono text-[11px] font-medium text-[#A8512C]">Premium skill</span>
  );
}

/* ---------- "What you'll get" card ----------
   Describes the step in one line. It never shows a made-up result. */
function StepPreview({ step, reduced }: { step: JourneyStep; reduced: boolean }) {
  const hasOutcome = Boolean(step.outcome);
  const text = step.outcome ?? '';
  const [shown, setShown] = useState(reduced ? text.length : 0);

  useEffect(() => {
    if (reduced) {
      setShown(text.length);
      return;
    }
    setShown(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setShown(Math.min(i, text.length));
      if (i >= text.length) window.clearInterval(id);
    }, 22);
    return () => window.clearInterval(id);
  }, [text, reduced]);

  const typing = shown < text.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-cz-border-strong bg-white shadow-[0_18px_40px_-24px_rgba(31,41,55,0.35)]">
      <div className="flex items-center gap-2 border-b border-cz-border bg-[#F6F1E8] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFB48A]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFD2B0]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#8FD3C4]" />
        <span className="ml-2 truncate font-mono text-xs text-cz-text-muted">{displayTitle(step.title)}</span>
      </div>
      <div className="p-5 sm:p-6">
        {hasOutcome ? (
          <>
            <p className="font-mono text-xs uppercase tracking-widest text-[#A8512C]">What you&apos;ll get</p>
            {/* Screen readers get the whole line at once; the typing effect is visual only. */}
            <p className="sr-only">{text}</p>
            <p aria-hidden className="mt-2 min-h-[3.5rem] font-display text-lg font-semibold leading-snug text-cz-text">
              {text.slice(0, shown)}
              {typing && <span className="cz-jny-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-cz-coral" />}
            </p>
          </>
        ) : (
          <>
            <p className="font-mono text-xs uppercase tracking-widest text-cz-text-muted">Inside this step</p>
            <p className="mt-2 font-display text-lg font-semibold leading-snug text-cz-text">
              The full walkthrough and the ready-to-run skill, in one Substack post.
            </p>
          </>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-cz-border pt-4">
          <AccessBadge step={step} />
          {step.creator && (
            <span className="flex items-center gap-2 text-sm text-cz-text-muted">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cz-seafoam font-display text-[11px] font-bold text-cz-text">
                {initialOf(step.creator)}
              </span>
              Built by {step.creator}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Badge ---------- */
function Medal({ icon, size = 'lg', reduced = false }: { icon: JourneyIcon; size?: 'sm' | 'md' | 'lg'; reduced?: boolean }) {
  const dim = size === 'lg' ? 'h-28 w-28' : size === 'md' ? 'h-14 w-14' : 'h-7 w-7';
  return (
    <span className={`relative inline-block flex-none ${dim} ${size === 'lg' && !reduced ? 'cz-jny-badge' : ''}`}>
      <span
        className={`absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br text-cz-text ring-white ${size === 'lg' ? 'ring-4 shadow-[0_18px_40px_-14px_rgba(31,95,91,0.7)]' : 'ring-2'} ${ICON_GRADIENT[icon]}`}
      >
        <Icon name={icon} className={size === 'lg' ? 'h-12 w-12' : size === 'md' ? 'h-6 w-6' : 'h-3.5 w-3.5'} />
        <span aria-hidden className="cz-jny-glint absolute inset-y-0 left-0 w-1/3 bg-white/35" />
      </span>
    </span>
  );
}

/* ---------- Finale ---------- */
const CONFETTI_COLORS = ['#FFB48A', '#B9A6EE', '#8FD3C4', '#FFB48A', '#1F5F5B', '#FFD2B0'];

function Finale({
  journey,
  next,
  reduced,
  onNext,
  onRestart,
}: {
  journey: ResolvedJourney;
  next: ResolvedJourney | null;
  reduced: boolean;
  onNext: () => void;
  onRestart: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-cz-border-strong bg-white px-6 py-16 text-center shadow-[0_24px_60px_-32px_rgba(31,95,91,0.5)]">
      {!reduced && (
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-24">
          {Array.from({ length: 22 }).map((_, i) => {
            const angle = (i / 22) * Math.PI * 2;
            const dist = 110 + (i % 4) * 30;
            return (
              <span
                key={i}
                className="cz-jny-confetti absolute h-2.5 w-1.5 rounded-sm"
                style={
                  {
                    background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                    '--dx': `${Math.round(Math.cos(angle) * dist)}px`,
                    '--dy': `${Math.round(Math.sin(angle) * dist * 0.7 + 40)}px`,
                    '--r': `${(i % 2 ? 1 : -1) * (180 + i * 20)}deg`,
                    animationDelay: `${(i % 5) * 40}ms`,
                  } as CSSProperties
                }
              />
            );
          })}
        </div>
      )}
      <div className="flex justify-center">
        <Medal icon={journey.icon} reduced={reduced} />
      </div>
      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-[#A8512C]">Badge earned</p>
      <h3 className="mt-2 font-display text-2xl font-bold text-cz-text sm:text-3xl">{journey.title}</h3>
      <p className="mx-auto mt-3 max-w-sm text-cz-text-muted">You finished all {journey.steps.length} steps. Nice work.</p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {next && (
          <button
            type="button"
            onClick={onNext}
            className={`inline-flex min-h-[48px] items-center gap-2 rounded-full bg-cz-accent px-6 font-display text-base font-semibold text-white shadow-lg shadow-cz-accent/20 transition-all hover:-translate-y-0.5 hover:bg-cz-accent-hover ${FOCUS}`}
          >
            Next: {next.intent} <Arrow />
          </button>
        )}
        <button
          type="button"
          onClick={onRestart}
          className={`inline-flex min-h-[48px] items-center rounded-full border border-cz-border-strong bg-white px-5 font-display text-sm font-semibold text-cz-text transition-colors hover:border-cz-teal ${FOCUS}`}
        >
          Start this journey again
        </button>
      </div>
    </div>
  );
}

/* ---------- Main ---------- */
export default function JourneyShowcase({ journeys }: { journeys: ResolvedJourney[] }) {
  const [sel, setSel] = useState(0);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState<Progress>({});
  const [loaded, setLoaded] = useState(false);
  const [finale, setFinale] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const [cheer, setCheer] = useState<{ done: string; next: string | null } | null>(null);
  // After someone picks a journey, the big goal cards fold into a compact strip so the
  // journey map gets the screen. "All goals" brings the cards back.
  const [compact, setCompact] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const journey = journeys[Math.min(sel, journeys.length - 1)];
  const n = journey?.steps.length ?? 0;
  const done = (journey && progress[journey.id]) || [];
  const firstOpen = journey ? journey.steps.findIndex((s) => !done.includes(s.slug)) : 0;

  useEffect(() => {
    setProgress(loadProgress());
    setLoaded(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // The intro plays once, the first time the section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    // Fallback: never leave the path hidden if the observer doesn't fire.
    const t = window.setTimeout(() => setSeen(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  // A link like /library#journey-think-learn opens that journey (the home page goal chips use it).
  // Re-checked on hashchange so clicking a goal while already on /library still works.
  useEffect(() => {
    const apply = () => {
      const m = window.location.hash.match(/^#journey-(.+)$/);
      if (!m) return;
      const i = journeys.findIndex((j) => j.id === m[1]);
      if (i === -1) return;
      setSel(i);
      setCompact(true);
      window.requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ block: 'start' }));
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, [journeys]);

  // Land returning visitors on the first step they haven't finished.
  useEffect(() => {
    if (!loaded || !journey) return;
    const d = progress[journey.id] ?? [];
    const idx = journey.steps.findIndex((s) => !d.includes(s.slug));
    setActive(idx === -1 ? 0 : idx);
    setFinale(idx === -1 && d.length > 0);
    setCheer(null);
    // only on journey change / first load, not on every progress tick
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, sel]);

  const update = useCallback(
    (fn: (current: string[]) => string[]) => {
      if (!journey) return;
      setProgress((prev) => {
        const merged = { ...prev, [journey.id]: fn(prev[journey.id] ?? []) };
        saveProgress(merged);
        return merged;
      });
    },
    [journey],
  );

  if (!journey) return null;

  const step = journey.steps[Math.min(active, n - 1)];
  const isDone = done.includes(step.slug);
  const nextJourney = journeys.length > 1 ? journeys[(sel + 1) % journeys.length] : null;

  // The step card opens inline under its step; bring it into view after a tap.
  function revealStage() {
    // On wide screens the step card sits in its own column, so there's nothing to scroll to.
    if (window.matchMedia('(min-width: 1024px)').matches) return;
    window.requestAnimationFrame(() => stageRef.current?.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' }));
  }

  function goTo(i: number) {
    setActive(i);
    setFinale(false);
    setCheer(null);
    revealStage();
  }

  function markDone() {
    if (isDone) {
      update((d) => d.filter((s) => s !== step.slug));
      return;
    }
    const nextDone = [...done, step.slug];
    update(() => nextDone);
    const nextIdx = journey.steps.findIndex((s, i) => i > active && !nextDone.includes(s.slug));
    const anyOpen = journey.steps.findIndex((s) => !nextDone.includes(s.slug));
    if (anyOpen === -1) {
      setCheer(null);
      setFinale(true);
    } else {
      const target = nextIdx === -1 ? anyOpen : nextIdx;
      setCheer({ done: displayTitle(step.title), next: displayTitle(journey.steps[target].title) });
      setActive(target);
    }
    revealStage();
  }

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next: number | null = null;
    if (e.key in keys) next = (sel + keys[e.key] + journeys.length) % journeys.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = journeys.length - 1;
    if (next === null) return;
    e.preventDefault();
    setSel(next);
    tabRefs.current[next]?.focus();
  }

  useEffect(() => {
    if (!compact) return;
    const el = tabRefs.current[sel];
    const box = el?.parentElement;
    if (!el || !box) return;
    box.scrollTo({ left: Math.max(0, el.offsetLeft - box.offsetLeft - 12), behavior: reduced ? 'auto' : 'smooth' });
  }, [compact, sel, reduced]);

  function pick(i: number) {
    setSel(i);
    if (compact) return;
    setCompact(true);
    window.requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' }));
  }

  const stageCard = (
    <>
      {cheer && (
        <p className={`mb-4 inline-flex flex-wrap items-center gap-2 rounded-full bg-cz-deep-teal px-4 py-2 text-sm font-medium text-cz-teal ${reduced ? '' : 'cz-jny-pop'}`}>
          <Check className="h-4 w-4" />
          {cheer.done} done.{cheer.next && <> Next up: {cheer.next}.</>}
        </p>
      )}
      <div className="flex flex-col gap-6 rounded-3xl border border-cz-border-strong bg-white/85 p-5 backdrop-blur-sm sm:p-7 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-6 lg:p-9">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="font-mono text-xs uppercase tracking-widest text-[#A8512C]">
            Step {active + 1} of {n}
            {isDone && <span className="ml-2 text-cz-teal">· done</span>}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-cz-text lg:text-3xl">{displayTitle(step.title)}</h3>
          {step.creator && <p className="mt-1 text-base text-cz-text-muted">by {step.creator}</p>}
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <StepPreview step={step} reduced={reduced} />
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-end">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={step.url}
              target={isFree(step) ? undefined : '_blank'}
              rel={isFree(step) ? undefined : 'noopener noreferrer'}
              onClick={(e) => {
                // The install guide opens in a pop-up so people stay on this page.
                if (step.url === '/skills-guide' && !e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  setInstallOpen(true);
                }
              }}
              className={`inline-flex min-h-[52px] items-center gap-2 rounded-full bg-cz-accent px-7 font-display text-base font-semibold text-white shadow-lg shadow-cz-accent/25 transition-all hover:-translate-y-0.5 hover:bg-cz-accent-hover ${FOCUS}`}
            >
              {active === firstOpen && done.length > 0 ? `Continue at step ${active + 1}` : `Open step ${active + 1}`}
              <Arrow className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={markDone}
              aria-pressed={isDone}
              className={`inline-flex min-h-[48px] items-center gap-1.5 rounded-full border px-5 text-sm font-semibold transition-colors ${FOCUS} ${
                isDone ? 'border-cz-teal bg-cz-deep-teal text-cz-teal' : 'border-cz-border-strong bg-white text-cz-text hover:border-cz-teal'
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              {isDone ? 'Done' : "I've done this"}
            </button>
          </div>
          {!isFree(step) && <p className="mt-3 text-sm text-cz-text-muted">Premium skill on Substack. Members open it in full.</p>}
        </div>
      </div>
    </>
  );

  const pathClass = reduced ? '' : seen ? 'cz-jny-intro' : 'cz-jny-pre';

  return (
    <section
      ref={sectionRef}
      id="journeys"
      aria-label="Learning journeys"
      className="relative mb-16 scroll-mt-28 overflow-hidden rounded-[28px] border border-[#E8E0D2] bg-gradient-to-br from-[#F4EFFA] via-[#FBF8F3] to-[#E3F4EF] p-5 shadow-[0_30px_80px_-40px_rgba(31,95,91,0.45)] sm:p-12 lg:p-14"
    >
      <div aria-hidden className="cz-jny-drift pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#FFD2B0]/50 blur-3xl" />
      <div aria-hidden className="cz-jny-drift-slow pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-[#8FD3C4]/30 blur-3xl" />

      <div className="relative">
        {journeys.some((j) => j.draft) && (
          <p className="mb-4 rounded-lg border border-dashed border-cz-coral/50 bg-cz-coral/10 px-3 py-2 font-mono text-xs text-[#A8512C]">
            Draft preview. Draft journeys are hidden on cozora.org until set to live in src/lib/journeys.ts.
          </p>
        )}

        {/* Heading */}
        {!compact && (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-cz-coral px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-white">
              New
            </span>
            <span className="font-mono text-sm uppercase tracking-widest text-cz-accent">Learning journeys</span>
          </div>
        )}
        {!compact && (
          <>
            <h2 className="mt-3 font-display text-3xl font-bold text-cz-text sm:text-4xl">What do you want to do?</h2>
            <p className="mt-2 max-w-2xl text-base text-cz-text-muted sm:text-lg">
              Pick a goal. We&apos;ll walk you through the right skills in order, one step at a time.
            </p>
          </>
        )}

        {/* Intent picker: full cards, or a compact strip once a journey is picked */}
        <div className={compact ? 'cz-lib-in flex items-center gap-2' : ''}>
        {compact && (
          <button
            type="button"
            onClick={() => setCompact(false)}
            aria-label="Show all goals"
            title="All goals"
            className={`flex h-11 w-11 flex-none items-center justify-center rounded-full border border-cz-border-strong bg-white/80 text-cz-text transition-colors hover:border-cz-teal ${FOCUS}`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v5H4zM14 15h6v5h-6z" />
            </svg>
          </button>
        )}
        <div
          key={compact ? 'strip' : 'grid'}
          className={
            compact
              ? 'flex min-w-0 flex-1 snap-x gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible'
              : 'mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4'
          }
          role="tablist"
          aria-label="Choose a journey"
          onKeyDown={onTabKey}
        >
          {journeys.map((j, i) => {
            const selected = i === sel;
            const jd = (progress[j.id] ?? []).filter((s) => j.steps.some((st) => st.slug === s)).length;
            const setRef = (el: HTMLButtonElement | null) => {
              tabRefs.current[i] = el;
            };
            if (compact) {
              return (
                <button
                  key={j.id}
                  ref={setRef}
                  role="tab"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => pick(i)}
                  className={`flex min-h-[44px] flex-none snap-start items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-left transition-colors duration-300 ${FOCUS} ${
                    selected ? 'border-cz-accent bg-cz-accent text-white shadow-md shadow-cz-accent/25' : 'border-cz-border-strong bg-white/80 text-cz-text hover:bg-white'
                  }`}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-cz-text ${ICON_GRADIENT[j.icon]}`}>
                    <Icon name={j.icon} className="h-4 w-4" />
                  </span>
                  <span className="whitespace-nowrap font-display text-sm font-semibold lg:text-[13px]">{j.intent}</span>
                  {jd > 0 && (
                    <span className={`font-mono text-xs ${selected ? 'text-white/80' : 'text-cz-text-muted'}`}>
                      {jd}/{j.steps.length}
                    </span>
                  )}
                </button>
              );
            }
            return (
              <button
                key={j.id}
                ref={setRef}
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => pick(i)}
                className={`group relative flex flex-col items-start gap-3 rounded-2xl border p-5 pb-6 text-left transition-all duration-300 hover:-translate-y-0.5 ${FOCUS} ${
                  selected
                    ? 'border-cz-accent bg-cz-deep-teal shadow-[0_14px_30px_-18px_rgba(29,92,94,0.55)]'
                    : 'border-cz-border-strong bg-white/70 hover:bg-white'
                }`}
              >
                {selected && jd !== j.steps.length && (
                  <span aria-hidden className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-cz-accent text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-cz-text shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${ICON_GRADIENT[j.icon]} ${selected ? 'cz-sc-float' : ''}`}
                >
                  <Icon name={j.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-[15px] font-semibold leading-snug text-cz-text">{j.intent}</span>
                <span className="font-mono text-[13px] text-cz-text-muted">
                  {jd > 0 ? `${jd} of ${j.steps.length} done` : plural(j.steps.length, 'step', 'steps')}
                </span>
                {jd === j.steps.length && (
                  <span className="absolute right-3 top-3">
                    <Medal icon={j.icon} size="sm" />
                  </span>
                )}
                {jd > 0 && (
                  <span className="absolute inset-x-4 bottom-2 h-1 overflow-hidden rounded-full bg-cz-border">
                    <span className="block h-full rounded-full bg-gradient-to-r from-[#8FD3C4] to-cz-accent" style={{ width: `${(jd / j.steps.length) * 100}%` }} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        </div>

        {/* Journey summary */}
        <div
          key={`sum-${journey.id}`}
          className={`cz-lib-in flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-14 ${compact ? 'mt-8' : 'mt-12'}`}
          role="tabpanel"
          aria-label={journey.intent}
        >
          <div className="relative mx-auto aspect-[16/10] w-full max-w-[340px] overflow-hidden rounded-3xl lg:order-2 border border-[#E8E0D2] bg-white/70 shadow-[0_20px_50px_-30px_rgba(31,95,91,0.55)]">
            <div aria-hidden className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br opacity-25 blur-2xl ${ICON_GRADIENT[journey.icon]}`} />
            <div className="relative h-full w-full p-2">
              <JourneyScene icon={journey.icon} />
            </div>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold leading-snug text-cz-text lg:text-3xl">{journey.tagline}</p>
            <p className="mt-3 font-mono text-[13px] text-cz-text-muted">
              For {journey.audience} · {plural(n, 'step', 'steps')}
              {journey.creatorCount > 0 && <> · {plural(journey.creatorCount, 'creator', 'creators')}</>}
              {' · '}
              {(() => {
                const free = journey.steps.filter(isFree).length;
                const paid = n - free;
                if (!free) return 'all Premium skills';
                if (!paid) return 'all free';
                return `${free} free, ${paid} Premium`;
              })()}
            </p>
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3 font-mono text-[13px] text-cz-text-muted">
                <span>{done.length} of {n} done</span>
                {firstOpen !== -1 && done.length > 0 && !finale && (
                  <button
                    type="button"
                    onClick={() => goTo(firstOpen)}
                    className={`inline-flex items-center gap-1.5 text-right font-display text-sm font-semibold text-cz-teal transition-colors hover:text-cz-accent ${FOCUS}`}
                  >
                    Next up: {displayTitle(journey.steps[firstOpen].title)} <Arrow className="h-3.5 w-3.5 flex-none" />
                  </button>
                )}
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E8E0D2]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8FD3C4] via-cz-teal to-cz-accent transition-[width] duration-1000 ease-out"
                  style={{ width: `${(done.length / Math.max(n, 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course layout: step list on the left, the open step on the right (wide screens).
            On narrow screens it's one vertical path and the open step expands in place. */}
        <div className="mt-14 lg:grid lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div>
        <ol key={`path-${journey.id}`} className={`mt-14 flex flex-col gap-5 ${pathClass}`}>
          {journey.steps.map((s, i) => {
            const isActive = i === active && !finale;
            const stepDone = done.includes(s.slug);
            const nodeState = stepDone
              ? 'border-cz-teal bg-cz-teal text-white'
              : isActive
                ? 'scale-110 border-cz-coral bg-cz-coral text-white shadow-lg shadow-cz-coral/30'
                : 'border-cz-border-strong bg-white text-cz-text-muted';
            return (
              <li key={s.slug} className="relative" style={{ '--i': i } as CSSProperties}>
                {i < n - 1 && (
                  <div aria-hidden className="cz-jny-track absolute left-[27.5px] top-[30px] h-[calc(100%+1.25rem)] w-[3px]">
                    <span className="absolute left-0 top-0 block h-full w-full rounded-full bg-[#D9CFBC]" />
                    <span
                      className={`absolute left-0 top-0 block h-full w-full origin-top rounded-full bg-gradient-to-b from-[#8FD3C4] to-cz-teal transition-transform duration-700 ${
                        stepDone ? 'scale-y-100' : 'scale-y-0'
                      }`}
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={isActive ? 'step' : undefined}
                  aria-expanded={isActive}
                  aria-label={`Step ${i + 1}: ${displayTitle(s.title)}${stepDone ? ' (done)' : ''}`}
                  className={`relative flex min-h-[60px] w-full items-center gap-4 rounded-2xl p-2 text-left transition-colors ${FOCUS} ${
                    isActive ? 'bg-white/80' : 'hover:bg-white/60'
                  }`}
                >
                  <span className="cz-jny-node relative z-10 flex-none">
                    <span
                      className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 font-display text-sm font-bold transition-all duration-500 ${nodeState}`}
                    >
                      {stepDone ? <Check /> : i + 1}
                      {isActive && !reduced && (
                        <span aria-hidden className="cz-jny-ring pointer-events-none absolute inset-0 rounded-full border-2 border-cz-coral" />
                      )}
                    </span>
                  </span>
                  <span className="cz-jny-label min-w-0">
                    <span
                      className={`block font-display text-base font-semibold leading-snug transition-colors ${
                        isActive ? 'text-[#A8512C]' : stepDone ? 'text-cz-teal' : 'text-cz-text'
                      }`}
                    >
                      {displayTitle(s.title)}
                    </span>
                    {s.creator && <span className="mt-0.5 block truncate font-mono text-[13px] text-cz-text-muted">{s.creator}</span>}
                  </span>
                </button>

                {isActive && (
                  <div ref={stageRef} key={`${journey.id}-${active}`} className="cz-lib-in ml-11 mt-4 scroll-mt-36 sm:ml-[3.75rem] lg:hidden">
                    {stageCard}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex items-center gap-4 rounded-3xl border border-cz-border bg-white/70 p-5">
          <span className={done.length === n ? '' : 'opacity-40 grayscale'}>
            <Medal icon={journey.icon} size="md" reduced />
          </span>
          <p className="text-sm leading-relaxed text-cz-text-muted">
            {done.length === n ? (
              <span className="font-semibold text-cz-text">Badge earned: {journey.title}</span>
            ) : (
              <>Finish all {n} steps to earn the <span className="font-semibold text-cz-text">{journey.title}</span> badge.</>
            )}
          </p>
        </div>
        </div>

        <aside className="hidden lg:sticky lg:top-32 lg:block">{!finale && <div key={`${journey.id}-${active}`} className="cz-lib-in">{stageCard}</div>}</aside>
        </div>

        {finale && (
          <div ref={stageRef} className="mt-10 scroll-mt-28">
            <Finale
              journey={journey}
              next={nextJourney}
              reduced={reduced}
              onNext={() => setSel((sel + 1) % journeys.length)}
              onRestart={() => {
                update(() => []);
                setActive(0);
                setFinale(false);
              }}
            />
          </div>
        )}

        {journey.steps[0]?.url !== '/skills-guide' && (
          <p className="mt-5 text-sm text-cz-text-muted">
            New to Claude skills?{' '}
            <button
              type="button"
              onClick={() => setInstallOpen(true)}
              className={`font-medium text-cz-teal underline underline-offset-2 hover:text-cz-accent ${FOCUS}`}
            >
              Here&apos;s how to install one
            </button>
            .
          </p>
        )}
      </div>
      {installOpen && <InstallModal onClose={() => setInstallOpen(false)} />}
    </section>
  );
}
