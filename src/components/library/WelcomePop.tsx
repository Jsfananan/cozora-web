'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SEEN_KEY = 'cz-welcome-seen';

// A one-time welcome that pops up shortly after the library loads. Shows once per
// browser session (sessionStorage), closes on Escape, the backdrop, or either button,
// and "Start my journey" scrolls to the journeys section.
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
    primaryRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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

      <div className="cz-wel-pop relative w-full max-w-md overflow-hidden rounded-[28px] border border-[#F0E2C8] bg-gradient-to-br from-[#FFF1DC] via-[#FFFDF8] to-[#E6F6F0] px-7 pb-8 pt-10 text-center shadow-[0_40px_90px_-30px_rgba(31,41,55,0.55)] sm:px-10">
        <div aria-hidden className="cz-jny-drift pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#FFD3A8]/60 blur-3xl" />
        <div aria-hidden className="cz-jny-drift-slow pointer-events-none absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-[#7ED3C0]/40 blur-3xl" />

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
                  <stop offset="0%" stopColor="#7ED3C0" />
                  <stop offset="50%" stopColor="#1D5C5E" />
                  <stop offset="100%" stopColor="#D63BA3" />
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
                <path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill={i % 2 ? '#F6C26B' : '#D63BA3'} />
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

          <div className="cz-wel-line mt-7 flex flex-col items-center gap-2" style={{ animationDelay: '480ms' }}>
            <button
              ref={primaryRef}
              type="button"
              onClick={() => close(true)}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-cz-accent px-7 font-display text-base font-semibold text-white shadow-lg shadow-cz-accent/25 transition-all hover:-translate-y-0.5 hover:bg-cz-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cz-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8] sm:w-auto"
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
