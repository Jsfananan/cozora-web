'use client';

import Link from 'next/link';
import { useState } from 'react';

const skillColorMap = {
  Create: 'text-cz-coral',
  Build: 'text-cz-teal',
  Think: 'text-cz-teal',
  Lead: 'text-cz-accent',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cz-bg text-cz-text">
      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-50 w-64 bg-cz-bg-card border-r border-cz-border transition-transform lg:translate-x-0 lg:static`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-cz-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs font-mono text-cz-coral bg-cz-coral/10 px-2 py-1 rounded">
                  ADMIN
                </div>
              </div>
              <h1 className="text-lg font-display font-bold text-cz-text">
                Cozora
              </h1>
            </div>

            <nav className="flex-1 p-6 space-y-2">
              <Link
                href="/admin"
                className="block px-4 py-2 rounded-lg text-sm font-body text-cz-text-muted hover:text-cz-text hover:bg-cz-bg-card-hover transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/bundles"
                className="block px-4 py-2 rounded-lg text-sm font-body text-cz-text-muted hover:text-cz-text hover:bg-cz-bg-card-hover transition-colors"
              >
                Bundles
              </Link>
              <Link
                href="/admin/settings"
                className="block px-4 py-2 rounded-lg text-sm font-body text-cz-text-muted hover:text-cz-text hover:bg-cz-bg-card-hover transition-colors"
              >
                Settings
              </Link>
            </nav>

            <div className="p-6 border-t border-cz-border">
              <a
                href="/"
                className="text-xs text-cz-text-muted hover:text-cz-text transition-colors"
              >
                ← Back to site
              </a>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="bg-cz-bg-card border-b border-cz-border sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-cz-bg-card-hover transition-colors"
              >
                <svg
                  className="w-6 h-6"
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
              <div className="flex-1" />
              <div className="text-sm text-cz-text-muted">Admin Panel</div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
