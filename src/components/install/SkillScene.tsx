'use client';

import { useEffect, useRef, useState } from 'react';
import type { Scene } from '@/lib/installSteps';

/* ------------------------------------------------------------------ */
/*  Phase timeline hook — cycles 0..count-1 to drive the mock demo.    */
/*  Respects prefers-reduced-motion by freezing on the final phase.    */
/* ------------------------------------------------------------------ */
function usePhases(count: number, interval = 1400) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setPhase(count - 1);
      return;
    }
    setPhase(0);
    const id = setInterval(() => setPhase((p) => (p + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, interval]);
  return phase;
}

/* ------------------------------------------------------------------ */
/*  Shared primitives                                                  */
/* ------------------------------------------------------------------ */
function Cursor({ x, y, tapping }: { x: number; y: number; tapping: boolean }) {
  return (
    <div
      className="pointer-events-none absolute z-30 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className={tapping ? 'cz-cursor-tap' : ''}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
          <path
            d="M5 3l14 8-6 1.5L11 19 5 3z"
            fill="#EDF2F0"
            stroke="#0e1a1b"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function WindowFrame({
  chrome,
  label,
  children,
}: {
  chrome: 'browser' | 'app';
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-cz-border-strong bg-cz-bg shadow-2xl">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-cz-border bg-cz-bg-card px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        {chrome === 'browser' ? (
          <div className="ml-3 flex-1">
            <div className="max-w-[220px] rounded-md bg-cz-bg px-3 py-1 font-mono text-[10px] text-cz-text-muted">
              claude.ai
            </div>
          </div>
        ) : (
          <div className="ml-3 flex-1 text-center font-mono text-[10px] text-cz-text-muted">
            {label}
          </div>
        )}
        {chrome === 'browser' && (
          <div className="font-mono text-[10px] text-cz-text-muted">{label}</div>
        )}
      </div>
      <div className="relative aspect-[16/10] w-full">{children}</div>
    </div>
  );
}

function Ring({
  children,
  active,
  className = '',
}: {
  children: React.ReactNode;
  active: boolean;
  className?: string;
}) {
  return (
    <div className={`rounded-lg ${active ? 'cz-pulse-ring' : ''} ${className}`}>{children}</div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene: download the skill file (from Substack)                     */
/* ------------------------------------------------------------------ */
function DownloadScene({ postTitle, button }: { postTitle: string; button: string }) {
  const phase = usePhases(3, 1500); // 0 approach, 1 tap, 2 file lands
  return (
    <WindowFrame chrome="browser" label="cozora.substack.com">
      <div className="absolute inset-0 flex flex-col gap-3 p-5">
        <div className="mx-auto flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-cz-teal to-cz-coral" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-cz-coral">
            Cozora
          </span>
        </div>
        <div className="mx-auto max-w-[80%] text-center font-display text-sm font-semibold leading-snug text-cz-text">
          {postTitle}
        </div>
        <div className="mx-auto h-1.5 w-24 rounded bg-cz-border" />
        <div className="mx-auto mt-1 h-1.5 w-40 rounded bg-cz-border/60" />

        <div className="mt-auto flex flex-col items-center gap-3">
          <Ring active={phase === 1}>
            <div
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 font-display text-xs font-semibold ${
                phase >= 1 ? 'bg-cz-accent text-cz-bg' : 'bg-cz-deep-teal text-cz-text'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {button}
            </div>
          </Ring>
          {phase === 2 && (
            <div className="cz-drop-in flex items-center gap-2 rounded-md border border-cz-teal/40 bg-cz-bg-card px-3 py-1.5">
              <span className="font-mono text-[10px] text-cz-teal">▣ skill.zip</span>
              <span className="cz-check-pop text-cz-teal">✓</span>
            </div>
          )}
        </div>
      </div>
      <Cursor x={phase >= 1 ? 50 : 74} y={phase >= 1 ? 74 : 40} tapping={phase === 1} />
    </WindowFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene: open a menu / dropdown (e.g. profile → Settings)            */
/* ------------------------------------------------------------------ */
function MenuScene({
  chrome,
  trigger,
  items,
  highlight,
}: {
  chrome: 'browser' | 'app';
  trigger: string;
  items: string[];
  highlight: string;
}) {
  const phase = usePhases(3, 1500); // 0 approach trigger, 1 open menu, 2 highlight item
  return (
    <WindowFrame chrome={chrome} label={chrome === 'app' ? 'Claude' : 'Claude'}>
      <div className="absolute inset-0 flex">
        {/* left rail */}
        <div className="flex w-14 flex-col items-center gap-3 border-r border-cz-border bg-cz-bg-card py-3">
          <div className="h-5 w-5 rounded-md bg-gradient-to-br from-cz-teal to-cz-coral" />
          <div className="h-1.5 w-6 rounded bg-cz-border" />
          <div className="h-1.5 w-6 rounded bg-cz-border" />
          <div className="mt-auto">
            <Ring active={phase === 0}>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cz-deep-teal font-display text-[11px] font-bold text-cz-text">
                {trigger.charAt(0).toUpperCase()}
              </div>
            </Ring>
          </div>
        </div>
        {/* main */}
        <div className="relative flex-1 p-4">
          <div className="h-2 w-28 rounded bg-cz-border" />
          <div className="mt-2 h-2 w-20 rounded bg-cz-border/50" />

          {/* dropdown */}
          {phase >= 1 && (
            <div className="cz-drop-in absolute bottom-3 left-3 w-44 overflow-hidden rounded-lg border border-cz-border-strong bg-cz-bg-card shadow-xl">
              {items.map((it) => {
                const isTarget = it === highlight;
                return (
                  <div
                    key={it}
                    className={`flex items-center gap-2 px-3 py-2 text-[11px] ${
                      isTarget && phase === 2
                        ? 'bg-cz-deep-teal/60 text-cz-text'
                        : 'text-cz-text-muted'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isTarget ? 'bg-cz-teal' : 'bg-cz-border'
                      }`}
                    />
                    {it}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Cursor
        x={phase === 0 ? 9 : 20}
        y={phase === 0 ? 82 : phase === 1 ? 70 : 62}
        tapping={phase === 0 || phase === 2}
      />
    </WindowFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene: settings panel with left nav — highlight the target item    */
/* ------------------------------------------------------------------ */
function PanelScene({
  chrome,
  nav,
  highlight,
  heading,
  hint,
}: {
  chrome: 'browser' | 'app';
  nav: string[];
  highlight: string;
  heading: string;
  hint?: string;
}) {
  const phase = usePhases(2, 1600);
  return (
    <WindowFrame chrome={chrome} label="Settings">
      <div className="absolute inset-0 flex">
        <div className="w-36 border-r border-cz-border bg-cz-bg-card p-2">
          <div className="mb-2 px-2 font-mono text-[9px] uppercase tracking-widest text-cz-text-muted">
            Settings
          </div>
          {nav.map((it) => {
            const isTarget = it === highlight;
            return (
              <Ring key={it} active={isTarget && phase === 1} className="mb-1">
                <div
                  className={`rounded-md px-2.5 py-1.5 text-[11px] ${
                    isTarget
                      ? 'bg-cz-deep-teal/60 font-semibold text-cz-text'
                      : 'text-cz-text-muted'
                  }`}
                >
                  {it}
                </div>
              </Ring>
            );
          })}
        </div>
        <div className="flex-1 p-4">
          <div className="font-display text-xs font-semibold text-cz-text">{heading}</div>
          {hint && <div className="mt-1 text-[10px] leading-relaxed text-cz-text-muted">{hint}</div>}
          <div className="mt-3 space-y-2">
            <div className="h-2 w-full rounded bg-cz-border/50" />
            <div className="h-2 w-4/5 rounded bg-cz-border/40" />
            <div className="h-2 w-2/3 rounded bg-cz-border/30" />
          </div>
        </div>
      </div>
      <Cursor x={phase === 0 ? 40 : 14} y={phase === 0 ? 50 : 34} tapping={phase === 1} />
    </WindowFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene: upload / add the skill file                                 */
/* ------------------------------------------------------------------ */
function UploadScene({
  chrome,
  button,
  fileName,
}: {
  chrome: 'browser' | 'app';
  button: string;
  fileName: string;
}) {
  const phase = usePhases(3, 1500); // 0 approach button, 1 tap, 2 file added + success
  return (
    <WindowFrame chrome={chrome} label="Settings">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5">
        <div className="font-display text-xs font-semibold text-cz-text">Skills</div>
        <Ring active={phase === 1}>
          <div
            className={`flex items-center gap-2 rounded-lg border border-dashed px-5 py-3 ${
              phase >= 1
                ? 'border-cz-teal/60 bg-cz-deep-teal/30'
                : 'border-cz-border-strong bg-cz-bg-card'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14m-7-7h14"
                stroke="#7ED3C0"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-display text-[11px] font-semibold text-cz-teal">{button}</span>
          </div>
        </Ring>
        {phase === 2 && (
          <div className="cz-drop-in flex items-center gap-2 rounded-md border border-cz-teal/40 bg-cz-bg-card px-3 py-1.5">
            <span className="font-mono text-[10px] text-cz-text">▣ {fileName}</span>
            <span className="cz-check-pop flex h-4 w-4 items-center justify-center rounded-full bg-cz-teal text-[9px] font-bold text-cz-bg">
              ✓
            </span>
          </div>
        )}
      </div>
      <Cursor x={50} y={phase >= 1 ? 46 : 30} tapping={phase === 1} />
    </WindowFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene: toggle a capability on                                      */
/* ------------------------------------------------------------------ */
function ToggleScene({
  chrome,
  label,
  sublabel,
}: {
  chrome: 'browser' | 'app';
  label: string;
  sublabel?: string;
}) {
  const phase = usePhases(2, 1500);
  const on = phase === 1;
  return (
    <WindowFrame chrome={chrome} label="Settings">
      <div className="absolute inset-0 flex flex-col justify-center p-6">
        <div className="flex items-center justify-between rounded-lg border border-cz-border bg-cz-bg-card px-4 py-3">
          <div>
            <div className="font-display text-[11px] font-semibold text-cz-text">{label}</div>
            {sublabel && <div className="mt-0.5 text-[9px] text-cz-text-muted">{sublabel}</div>}
          </div>
          <Ring active={phase === 0}>
            <div
              className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors duration-300 ${
                on ? 'bg-cz-teal' : 'bg-cz-border-strong'
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                  on ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
          </Ring>
        </div>
      </div>
      <Cursor x={78} y={50} tapping={phase === 0} />
    </WindowFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene: use the skill inside a chat                                 */
/* ------------------------------------------------------------------ */
function ChatScene({
  chrome,
  prompt,
  pill,
}: {
  chrome: 'browser' | 'app';
  prompt: string;
  pill: string;
}) {
  const phase = usePhases(3, 1600); // 0 typing, 1 skill fires, 2 response
  const typed =
    phase === 0 ? prompt.slice(0, Math.max(1, Math.floor(prompt.length * 0.6))) : prompt;
  return (
    <WindowFrame chrome={chrome} label="Claude">
      <div className="absolute inset-0 flex flex-col p-4">
        <div className="flex-1 space-y-2 overflow-hidden">
          {phase >= 1 && (
            <div className="cz-rise-in ml-auto max-w-[75%] rounded-2xl rounded-br-sm bg-cz-deep-teal px-3 py-2 text-[10px] leading-snug text-cz-text">
              {prompt}
            </div>
          )}
          {phase >= 1 && (
            <div className="cz-rise-in flex items-center gap-1.5">
              <span className="flex items-center gap-1 rounded-full bg-cz-teal/15 px-2 py-0.5 font-mono text-[9px] text-cz-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-cz-teal" /> {pill}
              </span>
              <span className="font-mono text-[9px] text-cz-text-muted">skill active</span>
            </div>
          )}
          {phase >= 2 && (
            <div className="cz-rise-in max-w-[80%] space-y-1.5 rounded-2xl rounded-bl-sm bg-cz-bg-card px-3 py-2">
              <div className="h-1.5 w-full rounded bg-cz-border" />
              <div className="h-1.5 w-5/6 rounded bg-cz-border/70" />
              <div className="h-1.5 w-3/5 rounded bg-cz-border/50" />
            </div>
          )}
        </div>
        {/* compose bar */}
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-cz-border-strong bg-cz-bg-card px-3 py-2">
          <span className="flex-1 truncate text-[10px] text-cz-text">
            {phase === 0 ? (
              <>
                {typed}
                <span className="cz-caret">|</span>
              </>
            ) : (
              <span className="text-cz-text-muted">Ask anything…</span>
            )}
          </span>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cz-accent text-[9px] text-cz-bg">
            ↑
          </div>
        </div>
      </div>
      <Cursor x={phase === 0 ? 88 : 50} y={88} tapping={phase === 1} />
    </WindowFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene: copy the prompt (from a Cozora post)                        */
/* ------------------------------------------------------------------ */
function CopyPromptScene({ postTitle, button }: { postTitle: string; button: string }) {
  const phase = usePhases(3, 1500); // 0 approach, 1 tap copy, 2 copied
  return (
    <WindowFrame chrome="browser" label="cozora.substack.com">
      <div className="absolute inset-0 flex flex-col gap-2.5 p-5">
        <div className="mx-auto flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-cz-teal to-cz-coral" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-cz-coral">Cozora</span>
        </div>
        <div className="mx-auto max-w-[80%] text-center font-display text-sm font-semibold leading-snug text-cz-text">
          {postTitle}
        </div>
        {/* prompt code block */}
        <div className="relative mt-1 rounded-lg border border-cz-border bg-cz-bg-card p-3">
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded bg-cz-teal/30" />
            <div className="h-1.5 w-11/12 rounded bg-cz-border" />
            <div className="h-1.5 w-4/5 rounded bg-cz-border/70" />
            <div className="h-1.5 w-full rounded bg-cz-border/60" />
            <div className="h-1.5 w-2/3 rounded bg-cz-border/50" />
          </div>
          <div className="absolute -top-2 right-2">
            <Ring active={phase === 1}>
              <div
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-display text-[10px] font-semibold ${
                  phase >= 1 ? 'bg-cz-teal text-cz-bg' : 'bg-cz-deep-teal text-cz-text'
                }`}
              >
                {phase === 2 ? (
                  <>
                    <span className="cz-check-pop">✓</span> Copied
                  </>
                ) : (
                  <>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {button}
                  </>
                )}
              </div>
            </Ring>
          </div>
        </div>
      </div>
      <Cursor x={phase >= 1 ? 78 : 60} y={phase >= 1 ? 40 : 60} tapping={phase === 1} />
    </WindowFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene: paste the prompt into Cowork / a chat                       */
/* ------------------------------------------------------------------ */
function PasteScene({
  chrome,
  surfaceName,
  prompt,
}: {
  chrome: 'browser' | 'app';
  surfaceName: string;
  prompt: string;
}) {
  const phase = usePhases(3, 1600); // 0 pasted chip, 1 tap send, 2 sent bubble
  return (
    <WindowFrame chrome={chrome} label={surfaceName === 'Cowork' ? 'Cowork' : 'Claude'}>
      <div className="absolute inset-0 flex flex-col p-4">
        <div className="flex-1">
          {phase >= 2 && (
            <div className="cz-rise-in ml-auto max-w-[78%] rounded-2xl rounded-br-sm bg-cz-deep-teal px-3 py-2 text-[10px] leading-snug text-cz-text">
              {prompt}
            </div>
          )}
        </div>
        {/* composer */}
        <div className="rounded-xl border border-cz-border-strong bg-cz-bg-card p-2.5">
          {phase < 2 && (
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-md border border-cz-teal/40 bg-cz-teal/10 px-2 py-1">
              <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-cz-teal">
                Pasted
              </span>
              <span className="text-[9px] text-cz-text-muted">skill prompt</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-cz-text">
              {phase < 2 ? (
                <>
                  {prompt}
                  <span className="cz-caret">|</span>
                </>
              ) : (
                <span className="text-cz-text-muted">Write a message…</span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] text-cz-text-muted">Sonnet</span>
              <Ring active={phase === 1}>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cz-accent text-[9px] text-cz-bg">
                  ↑
                </div>
              </Ring>
            </div>
          </div>
        </div>
      </div>
      <Cursor x={phase === 1 ? 88 : 50} y={phase === 1 ? 84 : 70} tapping={phase === 1} />
    </WindowFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene: Claude asks a setup question, user answers                  */
/* ------------------------------------------------------------------ */
function AnswerScene({
  chrome,
  question,
  answer,
}: {
  chrome: 'browser' | 'app';
  question: string;
  answer: string;
}) {
  const phase = usePhases(3, 1600); // 0 question + typing, 1 answer sent, 2 next nod
  const typed = phase === 0 ? answer.slice(0, Math.max(1, Math.floor(answer.length * 0.55))) : answer;
  return (
    <WindowFrame chrome={chrome} label={chrome === 'app' ? 'Cowork' : 'Claude'}>
      <div className="absolute inset-0 flex flex-col p-4">
        <div className="flex-1 space-y-2">
          <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-cz-bg-card px-3 py-2 text-[10px] leading-snug text-cz-text">
            {question}
          </div>
          {phase >= 1 && (
            <div className="cz-rise-in ml-auto max-w-[75%] rounded-2xl rounded-br-sm bg-cz-deep-teal px-3 py-2 text-[10px] leading-snug text-cz-text">
              {answer}
            </div>
          )}
          {phase >= 2 && (
            <div className="cz-rise-in flex items-center gap-1.5 font-mono text-[9px] text-cz-text-muted">
              <span className="cz-check-pop text-cz-teal">✓</span> got it — next question
            </div>
          )}
        </div>
        <div className="flex items-center justify-between rounded-xl border border-cz-border-strong bg-cz-bg-card px-3 py-2">
          <span className="text-[10px] text-cz-text">
            {phase === 0 ? (
              <>
                {typed}
                <span className="cz-caret">|</span>
              </>
            ) : (
              <span className="text-cz-text-muted">Write a message…</span>
            )}
          </span>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cz-accent text-[9px] text-cz-bg">
            ↑
          </div>
        </div>
      </div>
      <Cursor x={phase === 0 ? 88 : 50} y={88} tapping={phase === 1} />
    </WindowFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene: the built skill card + "Save skill"                         */
/* ------------------------------------------------------------------ */
function SaveSkillScene({
  chrome,
  skillName,
  button,
}: {
  chrome: 'browser' | 'app';
  skillName: string;
  button: string;
}) {
  const phase = usePhases(3, 1500); // 0 approach, 1 tap save, 2 saved
  return (
    <WindowFrame chrome={chrome} label={chrome === 'app' ? 'Cowork' : 'Claude'}>
      <div className="absolute inset-0 flex flex-col justify-center gap-2 p-4">
        <div className="font-mono text-[9px] text-cz-text-muted">
          Skill is built and packaged.
        </div>
        {/* skill card */}
        <div className="flex items-center gap-3 rounded-xl border border-cz-border-strong bg-cz-bg-card p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cz-deep-teal/40 text-cz-teal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-display text-[11px] font-semibold text-cz-text">{skillName}</div>
            <div className="font-mono text-[9px] text-cz-text-muted">Skill</div>
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-cz-border text-cz-text-muted">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <Ring active={phase === 1}>
            <div
              className={`rounded-md px-3 py-1.5 font-display text-[10px] font-semibold ${
                phase >= 2 ? 'bg-cz-teal text-cz-bg' : phase === 1 ? 'bg-cz-teal text-cz-bg' : 'border border-cz-border-strong text-cz-text'
              }`}
            >
              {phase === 2 ? (
                <span className="cz-check-pop">✓ Saved</span>
              ) : (
                button
              )}
            </div>
          </Ring>
        </div>
      </div>
      <Cursor x={phase >= 1 ? 84 : 55} y={phase >= 1 ? 50 : 30} tapping={phase === 1} />
    </WindowFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */
export default function SkillScene({ scene }: { scene: Scene }) {
  // Re-mount on scene change so the phase timeline restarts cleanly.
  const key = useRef(0);
  key.current += 1;

  switch (scene.kind) {
    case 'download':
      return <DownloadScene postTitle={scene.postTitle} button={scene.button} />;
    case 'copyPrompt':
      return <CopyPromptScene postTitle={scene.postTitle} button={scene.button} />;
    case 'paste':
      return (
        <PasteScene chrome={scene.chrome} surfaceName={scene.surfaceName} prompt={scene.prompt} />
      );
    case 'answer':
      return <AnswerScene chrome={scene.chrome} question={scene.question} answer={scene.answer} />;
    case 'saveSkill':
      return (
        <SaveSkillScene chrome={scene.chrome} skillName={scene.skillName} button={scene.button} />
      );
    case 'menu':
      return (
        <MenuScene
          chrome={scene.chrome}
          trigger={scene.trigger}
          items={scene.items}
          highlight={scene.highlight}
        />
      );
    case 'panel':
      return (
        <PanelScene
          chrome={scene.chrome}
          nav={scene.nav}
          highlight={scene.highlight}
          heading={scene.heading}
          hint={scene.hint}
        />
      );
    case 'upload':
      return <UploadScene chrome={scene.chrome} button={scene.button} fileName={scene.fileName} />;
    case 'toggle':
      return <ToggleScene chrome={scene.chrome} label={scene.label} sublabel={scene.sublabel} />;
    case 'chat':
      return <ChatScene chrome={scene.chrome} prompt={scene.prompt} pill={scene.pill} />;
    default:
      return null;
  }
}
