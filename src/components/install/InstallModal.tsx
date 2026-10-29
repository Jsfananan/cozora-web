'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import InstallGuide from './InstallGuide';

/** The install walkthrough in a pop-up, so people never leave the page they were on. */
export default function InstallModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-cz-text/50 p-3 backdrop-blur-sm sm:p-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label="Install a Claude skill" className="cz-lib-in relative my-auto w-full max-w-5xl rounded-[28px] border border-cz-border-strong bg-cz-bg shadow-2xl">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cz-border-strong bg-white text-cz-text transition-colors hover:border-cz-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cz-accent"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <InstallGuide embedded onClose={onClose} />
      </div>
    </div>,
    document.body,
  );
}
