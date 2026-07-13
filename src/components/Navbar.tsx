'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Premium subscriber redirect banner */}
      {!bannerDismissed && (
        <div className="fixed top-0 left-0 right-0 z-60 bg-gradient-to-r from-cz-accent/95 to-cz-accent/80 border-b border-cz-accent overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-banner-shimmer"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
            <p className="text-sm text-cz-bg font-body text-center flex-1 font-medium">
              <span className="hidden sm:inline">Already a Cozora Premium Subscriber? </span>
              <span className="sm:hidden">Premium Subscriber? </span>
              <a
                href="https://cozora.substack.com/p/premium-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-cz-bg hover:text-cz-deep-teal transition-colors underline underline-offset-2"
              >
                Start Here <span className="animate-arrow-nudge">→</span>
              </a>
            </p>
            <button
              onClick={() => setBannerDismissed(true)}
              className="relative shrink-0 text-cz-bg/70 hover:text-cz-bg transition-colors p-1"
              aria-label="Dismiss banner"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          bannerDismissed ? 'top-0' : 'top-[41px]'
        } ${
          isScrolled || isMobileMenuOpen
            ? 'bg-cz-bg/95 backdrop-blur-xl border-b border-cz-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              href="#"
              className="text-2xl font-display font-bold text-cz-text"
            >
              cozora
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#skill-sets"
                className="text-cz-text-muted hover:text-cz-text transition-colors"
              >
                Skill Library
              </a>
              <a
                href="#pricing"
                className="text-cz-text-muted hover:text-cz-text transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-cz-text-muted hover:text-cz-text transition-colors"
              >
                About
              </a>
              <a
                href="/library"
                className="text-cz-text-muted hover:text-cz-text transition-colors"
              >
                Library
              </a>
              <a
                href="/skills-guide"
                className="text-cz-text-muted hover:text-cz-text transition-colors"
              >
                Install a Skill
              </a>
              <a
                href="https://cozora.substack.com/premium-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cz-teal hover:text-cz-accent transition-colors font-medium text-sm"
              >
                Member Resources
              </a>
              <a
                href="https://cozora.substack.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors text-sm"
              >
                Subscribe
              </a>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-cz-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <a
                href="#skill-sets"
                className="block text-cz-text-muted hover:text-cz-text transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Skill Library
              </a>
              <a
                href="#pricing"
                className="block text-cz-text-muted hover:text-cz-text transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#about"
                className="block text-cz-text-muted hover:text-cz-text transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/library"
                className="block text-cz-text-muted hover:text-cz-text transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Library
              </a>
              <a
                href="/skills-guide"
                className="block text-cz-text-muted hover:text-cz-text transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Install a Skill
              </a>
              <a
                href="https://cozora.substack.com/premium-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-cz-teal hover:text-cz-accent transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Member Resources
              </a>
              <a
                href="https://cozora.substack.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-5 py-2.5 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors text-sm mt-2"
              >
                Subscribe
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
