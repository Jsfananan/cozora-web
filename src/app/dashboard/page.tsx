'use client';

import { useState } from 'react';
import Link from 'next/link';
import { bundles } from '@/lib/bundles';
import Navbar from '@/components/Navbar';

const skillColorMap = {
  Create: { text: 'text-cz-coral', bg: 'bg-cz-coral/10' },
  Build: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Think: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Lead: { text: 'text-cz-accent', bg: 'bg-cz-accent/10' },
};

export default function DashboardPage() {
  const [expandedBundles, setExpandedBundles] = useState<Set<string>>(new Set());

  const toggleBundleExpanded = (slug: string) => {
    const newExpanded = new Set(expandedBundles);
    if (newExpanded.has(slug)) {
      newExpanded.delete(slug);
    } else {
      newExpanded.add(slug);
    }
    setExpandedBundles(newExpanded);
  };

  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-display font-bold text-cz-text mb-4">
              Access Your Skill Sets
            </h1>
            <p className="text-lg text-cz-text-muted mb-8">
              Sign in to view your purchased bundles and access all sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/login"
                className="px-8 py-3 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/bundles"
                className="px-8 py-3 border border-cz-border hover:border-cz-border-strong bg-transparent text-cz-text rounded-lg transition-colors"
              >
                View Skill Sets
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-cz-text mb-2">
              Your Skill Sets
            </h1>
            <p className="text-cz-text-muted">
              Access all your purchased bundles and sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map((bundle) => {
              const colors =
                skillColorMap[bundle.skillNum as keyof typeof skillColorMap] ||
                { text: 'text-cz-teal', bg: 'bg-cz-teal/10' };
              const isExpanded = expandedBundles.has(bundle.slug);

              return (
                <div key={bundle.slug}>
                  <button
                    onClick={() => toggleBundleExpanded(bundle.slug)}
                    className="w-full text-left"
                  >
                    <div className="h-full bg-cz-bg-card border border-cz-border hover:border-cz-border-strong rounded-xl p-6 transition-all hover:bg-cz-bg-card-hover">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-mono ${colors.text} ${colors.bg}`}>
                          {bundle.skillNum}
                        </div>
                        <span className="text-cz-text-muted transition-transform" style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}>
                          ↓
                        </span>
                      </div>

                      <h2 className="text-xl font-display font-bold text-cz-text mb-2">
                        {bundle.name}
                      </h2>

                      <div className="flex items-center gap-4 text-sm text-cz-text-muted">
                        <span>{bundle.sessions.length} sessions</span>
                        <div className="flex-1 h-2 bg-cz-border rounded-full overflow-hidden">
                          <div className="h-full bg-cz-accent w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 bg-cz-bg-card border border-cz-border rounded-xl p-6 space-y-6">
                      {bundle.sessions.map((session) => (
                        <div key={session.number} className="border-b border-cz-border pb-6 last:border-b-0 last:pb-0">
                          <div className="mb-4 aspect-video bg-cz-bg rounded-lg border border-cz-border flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cz-accent/10 to-cz-teal/10" />
                            <div className="relative z-10 text-center">
                              <div className="text-5xl mb-2">▶</div>
                              <p className="text-sm text-cz-text-muted font-mono">
                                Video available after purchase
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-cz-text mb-2">
                              {session.title}
                            </h3>
                            <p className="text-cz-text-muted mb-3">
                              {session.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-cz-text-muted font-mono">
                              <span>with {session.creator}</span>
                              <span>{session.date}</span>
                            </div>
                          </div>

                          <button className="px-4 py-2 bg-cz-accent/10 hover:bg-cz-accent/20 text-cz-accent rounded-lg transition-colors text-sm font-semibold">
                            ↓ Download PDF
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
