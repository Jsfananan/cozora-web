'use client';

import { useEffect, useMemo, useState } from 'react';
import SkillScene from './SkillScene';
import {
  buildSteps,
  SURFACE_META,
  DELIVERY_META,
  type Surface,
  type Delivery,
} from '@/lib/installSteps';

type Stage = 'surface' | 'delivery' | 'steps' | 'done';

const LS_SURFACE = 'cz-install-surface';
const LS_DELIVERY = 'cz-install-delivery';
const LS_STEP = 'cz-install-step';
const LS_DONE = 'cz-install-done';

const SUBSTACK = 'https://cozora.substack.com/';

function SurfaceIcon({ kind }: { kind: 'browser' | 'app' }) {
  if (kind === 'browser') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 8h18" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6" cy="6" r="0.7" fill="currentColor" />
        <circle cx="8.4" cy="6" r="0.7" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="5" width="19" height="12" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 20h8M12 17v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function DeliveryIcon({ kind }: { kind: 'file' | 'prompt' }) {
  if (kind === 'file') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M6 3h8l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 3v4h4M9 14l3 3 3-3M12 10v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 10l2 2-2 2M11 14h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScreenshotReveal({ src }: { src: string }) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'fail'>('loading');
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5">
      {status === 'ok' && (
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-cz-teal underline underline-offset-4 transition-colors hover:text-cz-text"
        >
          <span aria-hidden>📷</span>
          {open ? 'Hide the real screen' : 'See the real screen'}
        </button>
      )}
      {/* Always mounted so it can probe-load; hidden until opened. */}
      <img
        src={src}
        alt="The actual Claude screen for this step"
        onLoad={() => setStatus('ok')}
        onError={() => setStatus('fail')}
        className={
          open && status === 'ok'
            ? 'cz-rise-in mt-3 w-full rounded-xl border border-cz-border shadow-lg'
            : 'hidden'
        }
      />
    </div>
  );
}

export default function InstallGuide() {
  const [stage, setStage] = useState<Stage>('surface');
  const [surface, setSurface] = useState<Surface>('web');
  const [delivery, setDelivery] = useState<Delivery>('prompt');
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(() => buildSteps(surface, delivery), [surface, delivery]);
  const total = steps.length;

  // Restore progress
  useEffect(() => {
    try {
      const done = localStorage.getItem(LS_DONE) === '1';
      const s = localStorage.getItem(LS_SURFACE) as Surface | null;
      const d = localStorage.getItem(LS_DELIVERY) as Delivery | null;
      const i = parseInt(localStorage.getItem(LS_STEP) || '', 10);
      const validS = s === 'web' || s === 'desktop';
      const validD = d === 'file' || d === 'prompt';
      if (validS) setSurface(s);
      if (validD) setDelivery(d);
      if (done) {
        setStage('done');
      } else if (validS && validD && Number.isFinite(i)) {
        setStepIndex(Math.max(0, Math.min(i, buildSteps(s, d).length - 1)));
        setStage('steps');
      } else if (validS) {
        setStage('delivery');
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (
    patch: Partial<{ surface: Surface; delivery: Delivery; step: number; done: boolean }>,
  ) => {
    try {
      if (patch.surface) localStorage.setItem(LS_SURFACE, patch.surface);
      if (patch.delivery) localStorage.setItem(LS_DELIVERY, patch.delivery);
      if (patch.step !== undefined) localStorage.setItem(LS_STEP, String(patch.step));
      if (patch.done !== undefined) localStorage.setItem(LS_DONE, patch.done ? '1' : '0');
    } catch {
      /* ignore */
    }
  };

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const chooseSurface = (s: Surface) => {
    setSurface(s);
    persist({ surface: s });
    setStage('delivery');
    toTop();
  };

  const chooseDelivery = (d: Delivery) => {
    const keepPlace = d === delivery;
    setDelivery(d);
    const start = keepPlace ? stepIndex : 0;
    setStepIndex(start);
    persist({ delivery: d, step: start, done: false });
    setStage('steps');
    toTop();
  };

  // Quick surface flip mid-flow — same track length, keep place.
  const flipSurface = () => {
    const s: Surface = surface === 'web' ? 'desktop' : 'web';
    setSurface(s);
    persist({ surface: s });
  };

  const advance = () => {
    if (stepIndex < total - 1) {
      const next = stepIndex + 1;
      setStepIndex(next);
      persist({ step: next });
      toTop();
    } else {
      setStage('done');
      persist({ done: true });
      toTop();
    }
  };

  const back = () => {
    if (stepIndex > 0) {
      const prev = stepIndex - 1;
      setStepIndex(prev);
      persist({ step: prev });
    } else {
      setStage('delivery');
    }
  };

  const restart = () => {
    setStepIndex(0);
    persist({ step: 0, done: false });
    setStage('surface');
    toTop();
  };

  /* ---------------------------------------------------------------- */
  /*  STAGE: SURFACE                                                   */
  /* ---------------------------------------------------------------- */
  if (stage === 'surface') {
    return (
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:pt-36">
        <div className="animate-fade-up text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cz-coral">
            Cozora · Skill Setup
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-cz-text sm:text-5xl">
            Install your first
            <br />
            <span className="text-cz-teal">Claude skill</span> in minutes
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cz-text-muted">
            A guided, click-by-click walkthrough. No jargon, no guessing — do one step,
            check it off, and move to the next. You’ll be running your skill by the end.
          </p>
        </div>

        <div className="animate-fade-up delay-200 mt-12">
          <p className="mb-4 text-center font-display text-sm font-semibold text-cz-text-muted">
            First — where do you use Claude?
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {(['web', 'desktop'] as Surface[]).map((s) => {
              const meta = SURFACE_META[s];
              return (
                <button
                  key={s}
                  onClick={() => chooseSurface(s)}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-cz-border bg-cz-bg-card p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-cz-teal/60 hover:bg-cz-bg-card-hover"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cz-deep-teal/40 text-cz-teal transition-colors group-hover:bg-cz-deep-teal group-hover:text-cz-text">
                    <SurfaceIcon kind={meta.icon} />
                  </span>
                  <span className="font-display text-lg font-semibold text-cz-text">{meta.name}</span>
                  <span className="text-sm leading-relaxed text-cz-text-muted">{meta.blurb}</span>
                  <span className="mt-1 flex items-center gap-1 font-display text-sm font-semibold text-cz-teal">
                    Continue <span className="animate-arrow-nudge">→</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm text-cz-text-muted">
            Not sure? Pick either — the steps are nearly identical.
          </p>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  STAGE: DELIVERY                                                  */
  /* ---------------------------------------------------------------- */
  if (stage === 'delivery') {
    return (
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:pt-36">
        <button
          onClick={() => setStage('surface')}
          className="mb-6 text-sm text-cz-text-muted transition-colors hover:text-cz-text"
        >
          ← Back
        </button>
        <div className="animate-fade-up text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cz-coral">
            Cozora · Skill Setup
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-cz-text sm:text-4xl">
            How did your skill arrive?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cz-text-muted">
            Cozora skills come one of two ways. Check the skill’s Cozora post and pick what you see.
          </p>
        </div>

        <div className="animate-fade-up delay-200 mt-10 grid gap-4 sm:grid-cols-2">
          {(['prompt', 'file'] as Delivery[]).map((d) => {
            const meta = DELIVERY_META[d];
            return (
              <button
                key={d}
                onClick={() => chooseDelivery(d)}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-cz-border bg-cz-bg-card p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-cz-teal/60 hover:bg-cz-bg-card-hover"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cz-deep-teal/40 text-cz-teal transition-colors group-hover:bg-cz-deep-teal group-hover:text-cz-text">
                  <DeliveryIcon kind={meta.icon} />
                </span>
                <span className="font-display text-lg font-semibold text-cz-text">{meta.name}</span>
                <span className="text-sm leading-relaxed text-cz-text-muted">{meta.blurb}</span>
                <span className="mt-1 flex items-center gap-1 font-display text-sm font-semibold text-cz-teal">
                  Start the walkthrough <span className="animate-arrow-nudge">→</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-6 text-center text-sm text-cz-text-muted">
          Most Cozora skills are a <span className="text-cz-text">prompt to paste</span>. If there’s a
          file to download instead, pick the other one.
        </p>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  STAGE: DONE                                                      */
  /* ---------------------------------------------------------------- */
  if (stage === 'done') {
    return (
      <div className="mx-auto max-w-2xl px-5 pb-28 pt-32 text-center sm:pt-36">
        <div className="animate-fade-up">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cz-teal/15">
            <div className="cz-check-pop flex h-14 w-14 items-center justify-center rounded-full bg-cz-teal text-3xl text-cz-bg">
              ✓
            </div>
          </div>
          <h1 className="mt-7 font-display text-4xl font-bold leading-tight text-cz-text sm:text-5xl">
            Your skill is live.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-cz-text-muted">
            You just did the thing most people are still only reading about. From here, every
            new skill you add takes about a minute.
          </p>
        </div>

        <div className="animate-fade-up delay-200 mt-10 overflow-hidden rounded-2xl border border-cz-coral/30 bg-gradient-to-br from-cz-coral/15 to-cz-accent/10 p-8">
          <div className="mx-auto mb-3 flex items-center justify-center gap-2">
            <span className="h-6 w-6 rounded-full bg-gradient-to-br from-cz-teal to-cz-coral" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cz-coral">Cozora</span>
          </div>
          <h2 className="font-display text-xl font-bold text-cz-text">
            Thank you for being part of Cozora
          </h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-cz-text-muted">
            To our founding members, and to the 40+ creators who show up every week to build in
            the open and hand you what actually works — thank you. This is a community that
            learns AI together, out loud.{' '}
            <span className="text-cz-teal">You don’t learn AI alone.</span> We’re glad you’re here.
          </p>
        </div>

        <div className="animate-fade-up delay-300 mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={SUBSTACK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-cz-accent px-6 py-3 font-display font-semibold text-cz-bg transition-colors hover:bg-cz-accent-hover"
          >
            Browse more skills →
          </a>
          <a
            href="/"
            className="rounded-lg border border-cz-border bg-cz-bg-card px-6 py-3 font-display font-semibold text-cz-text transition-colors hover:bg-cz-bg-card-hover"
          >
            Back to Cozora.org
          </a>
        </div>

        <button
          onClick={restart}
          className="mt-8 text-sm text-cz-text-muted underline underline-offset-4 transition-colors hover:text-cz-text"
        >
          Install another skill from the top
        </button>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  STAGE: STEPS                                                     */
  /* ---------------------------------------------------------------- */
  const step = steps[stepIndex];
  const sMeta = SURFACE_META[surface];
  const dMeta = DELIVERY_META[delivery];

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-28 sm:pt-32">
      {/* progress + context */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-cz-teal">
            Step {stepIndex + 1} of {total}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStage('delivery')}
              className="rounded-full border border-cz-border bg-cz-bg-card px-3 py-1 text-xs text-cz-text-muted transition-colors hover:text-cz-text"
              title="Change how your skill arrived"
            >
              {dMeta.name}
            </button>
            <button
              onClick={flipSurface}
              className="flex items-center gap-1.5 rounded-full border border-cz-border bg-cz-bg-card px-3 py-1 text-xs text-cz-text-muted transition-colors hover:text-cz-text"
              title="Switch Claude surface"
            >
              <span className="text-cz-teal">
                <span className="block h-4 w-4">
                  <SurfaceIcon kind={sMeta.icon} />
                </span>
              </span>
              <span className="hidden sm:inline">{surface === 'web' ? 'Web' : 'Desktop'}</span>
              <span className="text-cz-text-dim">· switch</span>
            </button>
          </div>
        </div>
        <div className="flex gap-1.5">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                i < stepIndex ? 'bg-cz-teal' : i === stepIndex ? 'bg-cz-coral' : 'bg-cz-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* step body — keyed so it re-animates on change */}
      <div key={step.id} className="grid items-center gap-8 md:grid-cols-2">
        <div className="cz-rise-in order-1 md:order-2">
          <SkillScene scene={step.scene} />
        </div>

        <div className="cz-rise-in order-2 md:order-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cz-deep-teal font-display text-sm font-bold text-cz-text">
            {stepIndex + 1}
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-cz-text sm:text-3xl">
            {step.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-cz-text-muted">{step.body}</p>

          {step.tip && (
            <div className="mt-4 flex gap-2.5 rounded-xl border border-cz-teal/25 bg-cz-teal/5 px-4 py-3">
              <span className="text-cz-teal" aria-hidden>💡</span>
              <p className="text-sm leading-relaxed text-cz-text-muted">{step.tip}</p>
            </div>
          )}

          {step.screenshot && <ScreenshotReveal src={step.screenshot} />}

          <div className="mt-7 flex items-center gap-4">
            <button
              onClick={advance}
              className="group flex items-center gap-2 rounded-lg bg-cz-teal px-6 py-3 font-display font-semibold text-cz-bg transition-all hover:bg-[#6bc4ad] hover:shadow-lg hover:shadow-cz-teal/20"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-cz-bg/40 text-xs transition-colors group-hover:border-cz-bg group-hover:bg-cz-bg/15">
                ✓
              </span>
              {step.check}
            </button>
            <button
              onClick={back}
              className="text-sm text-cz-text-muted transition-colors hover:text-cz-text"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
