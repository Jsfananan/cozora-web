'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cz-bg/85 backdrop-blur-xl border-b border-cz-border'
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
              Skill Sets
            </a>
            <a
              href="https://leadershipinchange10.substack.com/t/cozora"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cz-text-muted hover:text-cz-text transition-colors"
            >
              Schedule
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
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-cz-text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
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
              Skill Sets
            </a>
            <a
              href="https://leadershipinchange10.substack.com/t/cozora"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-cz-text-muted hover:text-cz-text transition-colors"
            >
              Schedule
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
          </div>
        )}
      </div>
    </nav>
  );
}
