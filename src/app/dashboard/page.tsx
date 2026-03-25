'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

type AuthState = 'loading' | 'unauthenticated' | 'no-purchase' | 'purchased';

interface DbSession {
  id: string;
  number: number;
  creator: string;
  date: string | null;
  title: string;
  description: string | null;
  video_url: string | null;
  duration: string | null;
  notes_title: string | null;
  notes_content: string | null;
  sort_order: number;
  is_active: boolean;
}

interface DbBundle {
  id: string;
  slug: string;
  skill_num: string;
  name: string;
  tagline: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  sessions: DbSession[];
}

const skillColorMap: Record<string, { text: string; bg: string }> = {
  Create: { text: 'text-cz-coral', bg: 'bg-cz-coral/10' },
  Build: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Think: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Lead: { text: 'text-cz-accent', bg: 'bg-cz-accent/10' },
};

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <main className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl mx-auto text-center w-full">
            <p className="text-cz-text-muted">Loading...</p>
          </div>
        </main>
      </>
    }>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const isAdminPreview = searchParams.get('preview') === 'admin';
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [expandedBundles, setExpandedBundles] = useState<Set<string>>(new Set());
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const [bundles, setBundles] = useState<DbBundle[]>([]);
  const [bundlesLoading, setBundlesLoading] = useState(true);

  const fetchBundles = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/bundles');
      if (res.ok) {
        const data = await res.json();
        setBundles(data);
      }
    } catch (err) {
      console.error('Failed to fetch bundles:', err);
    } finally {
      setBundlesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBundles();
  }, [fetchBundles]);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAdminPreview) {
        setAuthState('purchased');
        return;
      }

      // TODO: Wire to Supabase auth
      setAuthState('purchased');
    };

    checkAuth();
  }, [isAdminPreview]);

  const toggleBundleExpanded = (slug: string) => {
    const newExpanded = new Set(expandedBundles);
    if (newExpanded.has(slug)) {
      newExpanded.delete(slug);
    } else {
      newExpanded.add(slug);
    }
    setExpandedBundles(newExpanded);
  };

  const toggleSessionExpanded = (sessionId: string) => {
    const next = new Set(expandedSessions);
    if (next.has(sessionId)) {
      next.delete(sessionId);
    } else {
      next.add(sessionId);
    }
    setExpandedSessions(next);
  };

  const handleDownloadPDF = (bundleId: string) => {
    // TODO: Call /api/content/pdf?bundleId=xxx to download PDF
    console.log(`Download PDF for bundle: ${bundleId}`);
  };

  if (authState === 'loading' || bundlesLoading) {
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
                See what&apos;s included in each bundle. Purchase to unlock all videos and downloads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bundles.map((bundle) => {
                const colors = skillColorMap[bundle.skill_num] || { text: 'text-cz-teal', bg: 'bg-cz-teal/10' };
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
                            {bundle.skill_num}
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
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="mt-4 bg-cz-bg-card border border-cz-border rounded-xl p-6 space-y-6">
                        {bundle.sessions.map((session) => (
                          <div key={session.id} className="border-b border-cz-border pb-6 last:border-b-0 last:pb-0">
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
                              <h3 className="text-lg font-semibold text-cz-text mb-2">{session.title}</h3>
                              <p className="text-cz-text-muted mb-3">{session.description}</p>
                              <div className="flex flex-wrap gap-4 text-sm text-cz-text-muted font-mono">
                                <span>with {session.creator}</span>
                                {session.date && <span>{session.date}</span>}
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

  // Purchased state
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {isAdminPreview && (
            <div className="mb-6 bg-cz-coral/10 border border-cz-coral/30 rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-mono text-cz-coral">
                Admin Preview — This is how paid customers see the dashboard
              </span>
              <Link
                href="/admin/bundles"
                className="text-sm font-semibold text-cz-coral hover:text-cz-coral/80 transition-colors"
              >
                Back to Admin
              </Link>
            </div>
          )}
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

          <div className="space-y-4">
            {bundles.map((bundle) => {
              const colors = skillColorMap[bundle.skill_num] || { text: 'text-cz-teal', bg: 'bg-cz-teal/10' };
              const isBundleExpanded = expandedBundles.has(bundle.slug);

              return (
                <div key={bundle.slug} className="bg-cz-bg-card border border-cz-border rounded-xl overflow-hidden">
                  {/* Bundle header */}
                  <button
                    onClick={() => toggleBundleExpanded(bundle.slug)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-cz-bg-card-hover transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-mono ${colors.text} ${colors.bg}`}>
                        {bundle.skill_num}
                      </div>
                      <div>
                        <h2 className="text-xl font-display font-bold text-cz-text">{bundle.name}</h2>
                        <p className="text-sm text-cz-text-muted mt-0.5">{bundle.sessions.length} sessions</p>
                      </div>
                    </div>
                    <span className="text-cz-text-muted text-lg" style={{ transform: isBundleExpanded ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.2s' }}>↓</span>
                  </button>

                  {/* Sessions list */}
                  {isBundleExpanded && (
                    <div className="border-t border-cz-border divide-y divide-cz-border/50">
                      {bundle.sessions.map((session) => {
                        const isSessionExpanded = expandedSessions.has(session.id);
                        return (
                          <div key={session.id}>
                            {/* Session header row */}
                            <button
                              onClick={() => toggleSessionExpanded(session.id)}
                              className="w-full px-6 py-4 flex items-center justify-between hover:bg-cz-bg transition-colors text-left"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-cz-text-dim w-6">{session.number}</span>
                                <div>
                                  <p className="font-semibold text-cz-text text-sm">{session.title}</p>
                                  <p className="text-xs text-cz-text-muted mt-0.5">
                                    {session.creator}{session.date ? ` • ${session.date}` : ''}{session.duration ? ` • ${session.duration}` : ''}
                                  </p>
                                </div>
                              </div>
                              <span className="text-cz-text-muted text-sm ml-4 flex-shrink-0" style={{ transform: isSessionExpanded ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.2s' }}>↓</span>
                            </button>

                            {/* Session content */}
                            {isSessionExpanded && (
                              <div className="px-6 pb-6 bg-cz-bg space-y-4">
                                {/* Video */}
                                <div className="aspect-video bg-cz-bg-card rounded-lg border border-cz-border flex items-center justify-center relative overflow-hidden">
                                  {session.video_url ? (
                                    <iframe
                                      src={session.video_url}
                                      allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
                                      allowFullScreen
                                      className="w-full h-full"
                                    />
                                  ) : (
                                    <>
                                      <div className="absolute inset-0 bg-gradient-to-br from-cz-accent/10 to-cz-teal/10" />
                                      <div className="relative z-10 text-center">
                                        <div className="text-5xl mb-2">▶</div>
                                        <p className="text-sm text-cz-text-muted font-mono">Video coming soon</p>
                                      </div>
                                    </>
                                  )}
                                </div>

                                {/* Description */}
                                {session.description && (
                                  <p className="text-cz-text-muted text-sm">{session.description}</p>
                                )}

                                {/* Notes */}
                                {(session.notes_title || session.notes_content) && (
                                  <div className="bg-white rounded-lg border border-cz-border p-5">
                                    {session.notes_title && (
                                      <h4 className="text-lg font-display font-bold text-gray-900 mb-3">
                                        {session.notes_title}
                                      </h4>
                                    )}
                                    {session.notes_content && (
                                      <div
                                        className="text-sm leading-relaxed prose prose-sm max-w-none"
                                        style={{ color: '#111' }}
                                        dangerouslySetInnerHTML={{ __html: session.notes_content }}
                                      />
                                    )}
                                  </div>
                                )}

                                {/* PDF */}
                                <button
                                  onClick={() => handleDownloadPDF(bundle.slug)}
                                  className="px-4 py-2 bg-cz-accent/10 hover:bg-cz-accent/20 text-cz-accent rounded-lg transition-colors text-sm font-semibold"
                                >
                                  ↓ Download PDF
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
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
