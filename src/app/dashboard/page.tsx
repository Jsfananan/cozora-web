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

interface DbBundlePdf {
  id: string;
  bundle_id: string;
  file_name: string;
  storage_path: string;
  file_size: number | null;
  created_at: string;
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
  bundle_pdfs: DbBundlePdf[];
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
                href="/access"
                className="px-8 py-3 border border-cz-text-muted hover:border-cz-text bg-transparent text-cz-text rounded-lg transition-colors"
              >
                Recover Access
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
        <main className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-cz-text mb-4">
              No Skill Sets on this account
            </h1>
            <p className="text-lg text-cz-text-muted mb-4">
              We couldn&apos;t find a Skill Sets purchase linked to this email. If you
              bought them with a different address, look them up below.
            </p>
            <p className="text-cz-text-muted mb-8">
              The Skill Sets bundles are no longer sold. Everything Cozora publishes
              now lives in the weekly Skill Library on Substack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/access"
                className="px-8 py-3 bg-cz-accent hover:opacity-90 text-cz-bg font-semibold rounded-lg transition-opacity"
              >
                Recover Access
              </Link>
              <a
                href="https://cozora.substack.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-cz-text-muted hover:border-cz-text bg-transparent text-cz-text rounded-lg transition-colors"
              >
                Join the Community
              </a>
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
      <main className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 pb-16">
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
                      {bundle.bundle_pdfs?.length > 0 && (
                        <div className="px-6 py-4 bg-cz-accent/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-cz-accent font-semibold text-sm">PDF</span>
                            <span className="text-sm text-cz-text">{bundle.bundle_pdfs[0].file_name}</span>
                          </div>
                          <a
                            href={`/api/content/pdf/download?path=${encodeURIComponent(bundle.bundle_pdfs[0].storage_path)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-cz-accent/10 hover:bg-cz-accent/20 text-cz-accent rounded-lg transition-colors text-sm font-semibold"
                          >
                            Download PDF
                          </a>
                        </div>
                      )}
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
