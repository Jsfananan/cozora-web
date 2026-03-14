'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { bundles, getBundleStats } from '@/lib/bundles';
import Navbar from '@/components/Navbar';

const { totalBundles } = getBundleStats();

type AuthState = 'loading' | 'unauthenticated' | 'no-purchase' | 'purchased';

const skillColorMap = {
  Create: { text: 'text-cz-coral', bg: 'bg-cz-coral/10' },
  Build: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Think: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Lead: { text: 'text-cz-accent', bg: 'bg-cz-accent/10' },
};

export default function DashboardPage() {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [expandedBundles, setExpandedBundles] = useState<Set<string>>(new Set());

  useEffect(() => {
    const checkAuth = async () => {
      // TODO: Wire to Supabase auth
      // For development: default to 'purchased' so we can see the full UI
      // Replace this with real auth check:
      // const { data: { user } } = await supabase.auth.getUser();
      // if (!user) {
      //   setAuthState('unauthenticated');
      //   return;
      // }
      // const { data: purchase } = await supabase
      //   .from('purchases')
      //   .select('id')
      //   .eq('email', user.email)
      //   .single();
      // setAuthState(purchase ? 'purchased' : 'no-purchase');

      setAuthState('purchased');
    };

    checkAuth();
  }, []);

  const toggleBundleExpanded = (slug: string) => {
    const newExpanded = new Set(expandedBundles);
    if (newExpanded.has(slug)) {
      newExpanded.delete(slug);
    } else {
      newExpanded.add(slug);
    }
    setExpandedBundles(newExpanded);
  };

  const handleDownloadPDF = (bundleId: string) => {
    // TODO: Call /api/content/pdf?bundleId=xxx to download PDF
    console.log(`Download PDF for bundle: ${bundleId}`);
  };

  if (authState === 'loading') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl mx-auto text-center w-full">
            <p className="text-cz-text-muted">Loading...</p>
          </div>
        </main>
      </>
    );
  }

  if (authState === 'unauthenticated') {
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
                className="px-8 py-3 bg-cz-accent hover:opacity-90 text-cz-bg font-semibold rounded-lg transition-opacity"
              >
                Sign In
              </Link>
              <Link
                href="/bundles"
                className="px-8 py-3 border border-cz-text-muted hover:border-cz-text bg-transparent text-cz-text rounded-lg transition-colors"
              >
                Purchase Skill Sets
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (authState === 'no-purchase') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 bg-gradient-to-r from-cz-accent/20 to-cz-coral/20 border border-cz-accent/40 rounded-xl p-6 sm:p-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-cz-text mb-2">
                  Unlock All Skill Sets
                </h2>
                <p className="text-cz-text-muted mb-6">
                  Get complete access to Create, Build, Think, and Lead bundles
                </p>
                <Link
                  href="/bundles"
                  className="inline-block px-8 py-3 bg-cz-accent hover:opacity-90 text-cz-bg font-semibold rounded-lg transition-opacity"
                >
                  Get All Skill Sets — $99
                </Link>
              </div>
            </div>

            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-cz-text mb-2">
                Preview Available
              </h1>
              <p className="text-cz-text-muted">
                See what's included in each bundle. Purchase to unlock all videos and downloads.
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
                      <div className="h-full bg-cz-bg-card border border-cz-border hover:border-cz-text-muted rounded-xl p-6 transition-all hover:bg-cz-bg-card-hover">
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
                                <div className="text-5xl mb-2">🔒</div>
                                <p className="text-sm text-cz-text-muted font-mono">
                                  Purchase to unlock
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

                            <button disabled className="px-4 py-2 bg-cz-text-dim/20 text-cz-text-dim rounded-lg cursor-not-allowed text-sm font-semibold">
                              ↓ Download PDF — Purchase required
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/bundles"
                className="inline-block px-8 py-3 bg-cz-accent hover:opacity-90 text-cz-bg font-semibold rounded-lg transition-opacity"
              >
                Get All Skill Sets — $99
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-cz-text">
                Your Skill Sets
              </h1>
              <div className="inline-flex items-center px-4 py-2 bg-cz-teal/10 border border-cz-teal/30 rounded-full">
                <span className="text-sm font-mono text-cz-teal">✓ All bundles unlocked</span>
              </div>
            </div>
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
                    <div className="h-full bg-cz-bg-card border border-cz-border hover:border-cz-text-muted rounded-xl p-6 transition-all hover:bg-cz-bg-card-hover">
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
                            {session.videoId ? (
                              <iframe
                                src={`https://iframe.mediadelivery.net/embed/bundly/${session.videoId}?autoplay=false&preload=false`}
                                allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                              />
                            ) : (
                              <>
                                <div className="absolute inset-0 bg-gradient-to-br from-cz-accent/10 to-cz-teal/10" />
                                <div className="relative z-10 text-center">
                                  <div className="text-5xl mb-2">▶</div>
                                  <p className="text-sm text-cz-text-muted font-mono">
                                    Video coming soon
                                  </p>
                                </div>
                              </>
                            )}
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
                              {session.duration && <span>{session.duration}</span>}
                            </div>
                          </div>

                          <button
                            onClick={() => handleDownloadPDF(bundle.slug)}
                            className="px-4 py-2 bg-cz-accent/10 hover:bg-cz-accent/20 text-cz-accent rounded-lg transition-colors text-sm font-semibold"
                          >
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
