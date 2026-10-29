'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SEEN_KEY = 'cz-welcome-seen';

// A one-time welcome that pops up shortly after the library loads. Shows once per
// browser session (sessionStorage), closes on Escape, the backdrop, or either button,
// and "Start my journey" scrolls to the journeys section.
const MAP_PATH = 'M24 62 Q62 0 100 26 T176 60 T252 26';
const STOPS = [
  { x: 24, y: 62, delay: 700 },
  { x: 100, y: 26, delay: 1000 },
  { x: 176, y: 60, delay: 1300 },
];

/* A tiny journey map that draws itself: the path, three numbered stops, a traveler
   dot riding the path, and the goal star at the end. Runs once, about 1.3s. */
function MiniMap() {
  return (
    <div aria-hidden className="relative mx-auto h-[84px] w-[276px]">
      <svg viewBox="0 0 276 84" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="cz-wel-path-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8FD3C4" />
            <stop offset="60%" stopColor="#1F5F5B" />
            <stop offset="100%" stopColor="#FFB48A" />
          </linearGradient>
        </defs>
        <path d={MAP_PATH} fill="none" stroke="#E8E0D2" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 9" />
        <path className="cz-wel-path" d={MAP_PATH} pathLength={100} fill="none" stroke="url(#cz-wel-path-grad)" strokeWidth="4" strokeLinecap="round" />
        {STOPS.map((s, i) => (
          <g key={i} className="cz-wel-node" style={{ animationDelay: `${s.delay}ms` }}>
            <circle cx={s.x} cy={s.y} r="12" fill="#fff" stroke="#1F5F5B" strokeWidth="3" />
            <text x={s.x} y={s.y + 4.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1F5F5B" fontFamily="Bricolage Grotesque, sans-serif">
              {i + 1}
            </text>
          </g>
        ))}
        <g className="cz-wel-node cz-wel-goal" style={{ animationDelay: '1700ms' }}>
          <circle cx="252" cy="26" r="15" fill="#FFB48A" />
          <path d="M252 16l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8z" fill="#fff" />
        </g>
      </svg>
      <span className="cz-wel-traveler absolute left-0 top-0 h-3.5 w-3.5 rounded-full bg-[#FFD2B0] shadow-[0_0_0_4px_rgba(246,194,107,0.35)]" />
    </div>
  );
}

export default function WelcomePop() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const primaryRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      /* storage blocked: still show it once for this page view */
    }
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  const close = useCallback((thenJourneys = false) => {
    try {
      window.sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* ignore */
    }
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      if (thenJourneys) document.getElementById('journeys')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 220);
  }, []);

  useEffect(() => {
    if (!open) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const focusTimer = window.setTimeout(() => primaryRef.current?.focus(), reduce ? 0 : 2100);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center p-4 ${closing ? 'cz-wel-out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cz-welcome-title"
    >
      <button
        type="button"
        aria-label="Close welcome"
        tabIndex={-1}
        onClick={() => close()}
        className="cz-wel-backdrop absolute inset-0 cursor-default bg-[#1F2937]/35 backdrop-blur-[3px]"
      />

      <div className="cz-wel-pop relative w-full max-w-md overflow-hidden rounded-[28px] border border-[#E8E0D2] bg-gradient-to-br from-[#F4EFFA] via-[#FBF8F3] to-[#E3F4EF] px-7 pb-8 pt-10 text-center shadow-[0_40px_90px_-30px_rgba(31,41,55,0.55)] sm:px-10">
        <div aria-hidden className="cz-jny-drift pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#FFD2B0]/60 blur-3xl" />
        <div aria-hidden className="cz-jny-drift-slow pointer-events-none absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-[#8FD3C4]/40 blur-3xl" />

        <button
          type="button"
          onClick={() => close()}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-cz-text-muted transition-colors hover:bg-white/70 hover:text-cz-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cz-accent"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative">
          {/* Spinning ring, echoing the Cozora logo's teal-to-magenta mark */}
          <div aria-hidden className="relative mx-auto h-20 w-20">
            <svg viewBox="0 0 80 80" className="cz-wel-ring absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="cz-wel-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8FD3C4" />
                  <stop offset="50%" stopColor="#1F5F5B" />
                  <stop offset="100%" stopColor="#FFB48A" />
                </linearGradient>
              </defs>
              <circle cx="40" cy="40" r="30" fill="none" stroke="url(#cz-wel-grad)" strokeWidth="10" />
            </svg>
            <span className="cz-wel-wave absolute inset-0 flex items-center justify-center text-3xl">👋</span>
            {[
              { x: '-12px', y: '6px', d: 0 },
              { x: '78px', y: '-4px', d: 400 },
              { x: '84px', y: '62px', d: 800 },
              { x: '-8px', y: '70px', d: 1200 },
            ].map((s, i) => (
              <svg
                key={i}
                viewBox="0 0 16 16"
                className="cz-sc cz-sc-twinkle absolute h-4 w-4"
                style={{ left: s.x, top: s.y, animationDelay: `${s.d}ms` }}
              >
                <path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill={i % 2 ? '#FFD2B0' : '#FFB48A'} />
              </svg>
            ))}
          </div>

          <p className="cz-wel-line mt-6 font-mono text-xs uppercase tracking-widest text-cz-accent" style={{ animationDelay: '180ms' }}>
            Cozora Skills Library
          </p>
          <h2 id="cz-welcome-title" className="cz-wel-line mt-2 font-display text-4xl font-bold text-cz-text" style={{ animationDelay: '280ms' }}>
            Welcome!
          </h2>
          <p className="cz-wel-line mt-3 text-lg text-cz-text-muted" style={{ animationDelay: '380ms' }}>
            Ready to start your journey?
          </p>

          <div className="mt-6">
            <MiniMap />
          </div>

          <div className="cz-wel-line mt-6 flex flex-col items-center gap-2" style={{ animationDelay: '2000ms' }}>
            <button
              ref={primaryRef}
              type="button"
              onClick={() => close(true)}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-cz-accent px-7 font-display text-base font-semibold text-white shadow-lg shadow-cz-accent/25 transition-all hover:-translate-y-0.5 hover:bg-cz-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cz-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F3] sm:w-auto"
            >
              Start my journey
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => close()}
              className="min-h-[44px] rounded-full px-4 text-sm font-medium text-cz-text-muted transition-colors hover:text-cz-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cz-accent"
            >
              Just browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
