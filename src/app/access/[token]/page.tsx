'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { bundles, getBundleStats } from '@/lib/bundles';

const { totalBundles } = getBundleStats();

const skillColorMap: Record<string, { text: string; bg: string; border: string }> = {
  Create: { text: 'text-cz-coral', bg: 'bg-cz-coral/10', border: 'border-cz-coral/30' },
  Build: { text: 'text-cz-teal', bg: 'bg-cz-teal/10', border: 'border-cz-teal/30' },
  Think: { text: 'text-cz-teal', bg: 'bg-cz-teal/10', border: 'border-cz-teal/30' },
  Lead: { text: 'text-cz-accent', bg: 'bg-cz-accent/10', border: 'border-cz-accent/30' },
};

type AccessState = 'loading' | 'valid' | 'invalid';

export default function AccessPage() {
  const params = useParams();
  const token = params.token as string;
  const [state, setState] = useState<AccessState>('loading');
  const [email, setEmail] = useState('');
  const [expandedBundles, setExpandedBundles] = useState<Set<string>>(new Set());
  const [showBookmarkTip, setShowBookmarkTip] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch('/api/access/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        if (res.ok) {
          const data = await res.json();
          setEmail(data.email);
          setState('valid');
          // Show bookmark tip for first-time visitors
          if (!localStorage.getItem(`cz-bookmarked-${token}`)) {
            setShowBookmarkTip(true);
          }
        } else {
          setState('invalid');
        }
      } catch {
        setState('invalid');
      }
    };
    verify();
  }, [token]);

  const dismissBookmarkTip = () => {
    setShowBookmarkTip(false);
    localStorage.setItem(`cz-bookmarked-${token}`, '1');
  };

  const toggleBundle = (slug: string) => {
    const next = new Set(expandedBundles);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setExpandedBundles(next);
  };

  if (state === 'loading') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 px-4 flex items-center justify-center">
          <p className="text-cz-text-muted font-mono">Verifying access...</p>
        </main>
      </>
    );
  }

  if (state === 'invalid') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 px-4 flex items-center justify-center">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-display font-bold text-cz-text mb-4">
              Invalid Access Link
            </h1>
            <p className="text-cz-text-muted mb-8">
              This link is no longer valid or doesn&apos;t exist. If you&apos;ve purchased the Skill Sets, you can recover your access link.
            </p>
            <Link
              href="/access"
              className="inline-block px-8 py-3 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors"
            >
              Recover My Access
            </Link>
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
          {/* Bookmark tip banner */}
          {showBookmarkTip && (
            <div className="mb-8 bg-cz-accent/10 border border-cz-accent/30 rounded-xl p-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-cz-text font-semibold mb-1">
                  Bookmark this page
                </p>
                <p className="text-sm text-cz-text-muted">
                  This is your permanent access link. Save it to your bookmarks so you can always come back. Lost it? Recover it anytime at{' '}
                  <Link href="/access" className="text-cz-accent hover:underline">cozora.org/access</Link>.
                </p>
              </div>
              <button
                onClick={dismissBookmarkTip}
                className="text-cz-text-muted hover:text-cz-text shrink-0 text-lg leading-none"
              >
                &times;
              </button>
            </div>
          )}

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-cz-text">
                Your Skill Sets
              </h1>
              <div className="inline-flex items-center px-4 py-2 bg-cz-teal/10 border border-cz-teal/30 rounded-full">
                <span className="text-sm font-mono text-cz-teal">All {totalBundles} bundles unlocked</span>
              </div>
            </div>
            <p className="text-cz-text-muted">
              {email && <>Purchased by <span className="text-cz-text">{email}</span> &middot; </>}
              All sessions and downloads are yours forever.
            </p>
          </div>

          {/* Bundle grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map((bundle) => {
              const colors = skillColorMap[bundle.skillNum] || skillColorMap.Build;
              const isExpanded = expandedBundles.has(bundle.slug);

              return (
                <div key={bundle.slug}>
                  <button
                    onClick={() => toggleBundle(bundle.slug)}
                    className="w-full text-left"
                  >
                    <div className={`h-full bg-cz-bg-card border border-cz-border hover:border-cz-text-muted rounded-xl p-6 transition-all hover:bg-cz-bg-card-hover ${isExpanded ? 'border-cz-text-muted' : ''}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-mono ${colors.text} ${colors.bg}`}>
                          {bundle.skillNum}
                        </div>
                        <span
                          className="text-cz-text-muted transition-transform duration-200"
                          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
                          &#x25BC;
                        </span>
                      </div>

                      <h2 className="text-xl font-display font-bold text-cz-text mb-2">
                        {bundle.name}
                      </h2>
                      <p className="text-sm text-cz-text-muted mb-3">
                        {bundle.tagline}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-cz-text-muted">
                        <span>{bundle.sessions.length} sessions</span>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 bg-cz-bg-card border border-cz-border rounded-xl p-6 space-y-6">
                      {bundle.sessions.map((session) => (
                        <div key={session.number} className="border-b border-cz-border pb-6 last:border-b-0 last:pb-0">
                          {/* Video player */}
                          <div className="mb-4 aspect-video bg-cz-bg rounded-lg border border-cz-border flex items-center justify-center relative overflow-hidden">
                            {session.videoId ? (
                              <iframe
                                src={`https://iframe.mediadelivery.net/embed/${session.videoId}?autoplay=false&preload=false`}
                                allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                              />
                            ) : (
                              <>
                                <div className="absolute inset-0 bg-gradient-to-br from-cz-accent/10 to-cz-teal/10" />
                                <div className="relative z-10 text-center">
                                  <div className="text-4xl mb-2 text-cz-text-muted">&#9654;</div>
                                  <p className="text-sm text-cz-text-muted font-mono">
                                    Video coming soon
                                  </p>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Session info */}
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

                          {/* Download PDF button */}
                          {bundle.pdfUrl ? (
                            <a
                              href={bundle.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block px-4 py-2 bg-cz-accent/10 hover:bg-cz-accent/20 text-cz-accent rounded-lg transition-colors text-sm font-semibold"
                            >
                              &#8595; Download PDF
                            </a>
                          ) : (
                            <span className="inline-block px-4 py-2 bg-cz-bg text-cz-text-dim rounded-lg text-sm font-mono">
                              PDF coming soon
                            </span>
                          )}
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
