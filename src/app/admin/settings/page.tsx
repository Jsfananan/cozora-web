'use client';

import { useState } from 'react';

interface ExpandedSection {
  [key: string]: boolean;
}

export default function SettingsPage() {
  const [expanded, setExpanded] = useState<ExpandedSection>({
    videos: false,
    pdfs: false,
    sessions: false,
    bundles: false,
  });

  const toggleSection = (section: string) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-cz-text mb-2">
          Bundle & Content Management
        </h1>
        <p className="text-cz-text-muted">
          Comprehensive guide to adding videos, PDFs, sessions, and bundles. The single source of truth for all content is <code className="text-cz-teal font-mono text-sm">src/lib/bundles.ts</code>.
        </p>
      </div>

      <div className="space-y-4">
        {/* VIDEOS SECTION */}
        <div className="bg-cz-bg-card border border-cz-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('videos')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-cz-bg/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="inline-block px-2.5 py-1 bg-cz-teal/20 text-cz-teal text-xs font-mono rounded">
                VIDEOS
              </span>
              <h2 className="text-lg font-display font-bold text-cz-text">
                How to Add Videos
              </h2>
            </div>
            <span className={`text-cz-text-muted transition-transform inline-block ${expanded.videos ? 'rotate-180' : ''}`}>&#x25BC;</span>
          </button>

          {expanded.videos && (
            <div className="border-t border-cz-border px-6 py-6 space-y-6 bg-cz-bg/30">
              <div>
                <h3 className="font-display font-semibold text-cz-text mb-3">
                  Step-by-Step Instructions
                </h3>
                <ol className="space-y-3 text-sm text-cz-text">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      1
                    </span>
                    <span>
                      Log in to <strong>Bunny.net Stream</strong> dashboard
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      2
                    </span>
                    <span>
                      Navigate to your video library and upload the video file
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      3
                    </span>
                    <span>
                      After processing completes, copy the <strong>Video ID</strong> from the video details page
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      4
                    </span>
                    <span>
                      Open <code className="text-cz-teal font-mono bg-cz-bg px-2 py-1 rounded text-xs">src/lib/bundles.ts</code> in your code editor
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      5
                    </span>
                    <span>
                      Find the bundle and session where you want to add the video
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      6
                    </span>
                    <span>
                      Add <code className="text-cz-teal font-mono bg-cz-bg px-2 py-1 rounded text-xs">videoId</code> property to the session object
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      7
                    </span>
                    <span>
                      Optionally add <code className="text-cz-teal font-mono bg-cz-bg px-2 py-1 rounded text-xs">duration</code> (e.g., "45 min") for display
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      8
                    </span>
                    <span>
                      Commit and push to deploy the changes
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-cz-bg border border-cz-border rounded-lg p-4">
                <p className="text-xs font-mono text-cz-text-muted mb-3 uppercase tracking-wide">
                  Example Code
                </p>
                <pre className="text-xs text-cz-text overflow-x-auto font-mono space-y-2">
                  <code>{`{
  number: 1,
  creator: "Joel",
  date: "Nov 3 2025",
  title: "Session Title",
  description: "Session description",
  videoId: "abc123def456",  // Bunny.net video ID
  duration: "45 min"         // Optional
}`}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* PDFs SECTION */}
        <div className="bg-cz-bg-card border border-cz-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('pdfs')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-cz-bg/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="inline-block px-2.5 py-1 bg-cz-coral/20 text-cz-coral text-xs font-mono rounded">
                PDFs
              </span>
              <h2 className="text-lg font-display font-bold text-cz-text">
                How to Add PDFs
              </h2>
            </div>
            <span className={`text-cz-text-muted transition-transform inline-block ${expanded.pdfs ? 'rotate-180' : ''}`}>&#x25BC;</span>
          </button>

          {expanded.pdfs && (
            <div className="border-t border-cz-border px-6 py-6 space-y-6 bg-cz-bg/30">
              <div>
                <h3 className="font-display font-semibold text-cz-text mb-3">
                  Step-by-Step Instructions
                </h3>
                <ol className="space-y-3 text-sm text-cz-text">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-coral/20 text-cz-coral rounded-full font-mono text-xs font-bold">
                      1
                    </span>
                    <span>
                      Log in to the <strong>Supabase dashboard</strong> for the Cozora project
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-coral/20 text-cz-coral rounded-full font-mono text-xs font-bold">
                      2
                    </span>
                    <span>
                      Navigate to <strong>Storage</strong> in the left sidebar
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-coral/20 text-cz-coral rounded-full font-mono text-xs font-bold">
                      3
                    </span>
                    <span>
                      Create a bucket called <code className="text-cz-coral font-mono bg-cz-bg px-2 py-1 rounded text-xs">pdfs</code> if it doesn't already exist
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-coral/20 text-cz-coral rounded-full font-mono text-xs font-bold">
                      4
                    </span>
                    <span>
                      Click into the bucket and upload your PDF file
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-coral/20 text-cz-coral rounded-full font-mono text-xs font-bold">
                      5
                    </span>
                    <span>
                      Right-click the file and select <strong>"Copy URL"</strong> to get the public URL
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-coral/20 text-cz-coral rounded-full font-mono text-xs font-bold">
                      6
                    </span>
                    <span>
                      Open <code className="text-cz-coral font-mono bg-cz-bg px-2 py-1 rounded text-xs">src/lib/bundles.ts</code> in your code editor
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-coral/20 text-cz-coral rounded-full font-mono text-xs font-bold">
                      7
                    </span>
                    <span>
                      Find the bundle you want to add the PDF to
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-coral/20 text-cz-coral rounded-full font-mono text-xs font-bold">
                      8
                    </span>
                    <span>
                      Set the <code className="text-cz-coral font-mono bg-cz-bg px-2 py-1 rounded text-xs">pdfUrl</code> property to the Supabase Storage URL you copied
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-coral/20 text-cz-coral rounded-full font-mono text-xs font-bold">
                      9
                    </span>
                    <span>
                      Commit and push to deploy the changes
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-cz-bg border border-cz-border rounded-lg p-4">
                <p className="text-xs font-mono text-cz-text-muted mb-3 uppercase tracking-wide">
                  Example Code
                </p>
                <pre className="text-xs text-cz-text overflow-x-auto font-mono">
                  <code>{`{
  slug: "ai-content-growth",
  skillNum: "Create",
  name: "AI Content & Growth Machine",
  tagline: "...",
  description: "...",
  sessions: [...],
  pdfUrl: "https://supabase.../storage/v1/object/public/pdfs/bundle-name.pdf"
}`}</code>
                </pre>
              </div>

              <div className="p-4 rounded-lg border border-cz-teal/30 bg-cz-teal/5">
                <p className="text-sm text-cz-text">
                  <strong className="text-cz-teal">Tip:</strong> PDF URLs must be public for the dashboard to access them. Make sure the Supabase Storage bucket has public access enabled.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SESSIONS SECTION */}
        <div className="bg-cz-bg-card border border-cz-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('sessions')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-cz-bg/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="inline-block px-2.5 py-1 bg-cz-deep-teal/40 text-cz-teal text-xs font-mono rounded">
                SESSIONS
              </span>
              <h2 className="text-lg font-display font-bold text-cz-text">
                How to Add New Sessions to a Bundle
              </h2>
            </div>
            <span className={`text-cz-text-muted transition-transform inline-block ${expanded.sessions ? 'rotate-180' : ''}`}>&#x25BC;</span>
          </button>

          {expanded.sessions && (
            <div className="border-t border-cz-border px-6 py-6 space-y-6 bg-cz-bg/30">
              <div>
                <h3 className="font-display font-semibold text-cz-text mb-3">
                  Step-by-Step Instructions
                </h3>
                <ol className="space-y-3 text-sm text-cz-text">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      1
                    </span>
                    <span>
                      Open <code className="text-cz-teal font-mono bg-cz-bg px-2 py-1 rounded text-xs">src/lib/bundles.ts</code>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      2
                    </span>
                    <span>
                      Find the bundle where you want to add a new session (Create, Build, Think, or Lead)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      3
                    </span>
                    <span>
                      Locate the <code className="text-cz-teal font-mono bg-cz-bg px-2 py-1 rounded text-xs">sessions</code> array within that bundle
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      4
                    </span>
                    <span>
                      Add a new session object with all required properties (see example below)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      5
                    </span>
                    <span>
                      Optionally include <code className="text-cz-teal font-mono bg-cz-bg px-2 py-1 rounded text-xs">videoId</code> and <code className="text-cz-teal font-mono bg-cz-bg px-2 py-1 rounded text-xs">duration</code> if the video is already uploaded
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      6
                    </span>
                    <span>
                      All pages automatically update — session counts and bundle cards refresh instantly, no additional changes needed
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-teal/20 text-cz-teal rounded-full font-mono text-xs font-bold">
                      7
                    </span>
                    <span>
                      Commit and push to deploy
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-cz-bg border border-cz-border rounded-lg p-4">
                <p className="text-xs font-mono text-cz-text-muted mb-3 uppercase tracking-wide">
                  Example Code
                </p>
                <pre className="text-xs text-cz-text overflow-x-auto font-mono">
                  <code>{`{
  number: 5,
  creator: "Jane Smith",
  date: "Mar 15 2026",
  title: "Session Title Goes Here",
  description: "Description of what this session covers",
  videoId: "bunny-video-id-here",  // Optional
  duration: "50 min"                // Optional
}`}</code>
                </pre>
              </div>

              <div className="p-4 rounded-lg border border-cz-teal/30 bg-cz-teal/5">
                <p className="text-sm text-cz-text">
                  <strong className="text-cz-teal">Important:</strong> The session count automatically updates across the entire site whenever you add a new session. No hardcoded counts or text changes are necessary.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* BUNDLES SECTION */}
        <div className="bg-cz-bg-card border border-cz-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('bundles')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-cz-bg/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="inline-block px-2.5 py-1 bg-cz-accent/20 text-cz-accent text-xs font-mono rounded">
                BUNDLES
              </span>
              <h2 className="text-lg font-display font-bold text-cz-text">
                How to Add a New Bundle
              </h2>
            </div>
            <span className={`text-cz-text-muted transition-transform inline-block ${expanded.bundles ? 'rotate-180' : ''}`}>&#x25BC;</span>
          </button>

          {expanded.bundles && (
            <div className="border-t border-cz-border px-6 py-6 space-y-6 bg-cz-bg/30">
              <div>
                <h3 className="font-display font-semibold text-cz-text mb-3">
                  Step-by-Step Instructions
                </h3>
                <ol className="space-y-3 text-sm text-cz-text">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-accent/20 text-cz-accent rounded-full font-mono text-xs font-bold">
                      1
                    </span>
                    <span>
                      Open <code className="text-cz-accent font-mono bg-cz-bg px-2 py-1 rounded text-xs">src/lib/bundles.ts</code>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-accent/20 text-cz-accent rounded-full font-mono text-xs font-bold">
                      2
                    </span>
                    <span>
                      Find the <code className="text-cz-accent font-mono bg-cz-bg px-2 py-1 rounded text-xs">bundles</code> array (around line 27)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-accent/20 text-cz-accent rounded-full font-mono text-xs font-bold">
                      3
                    </span>
                    <span>
                      Add a new bundle object with all required properties (see example below)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-accent/20 text-cz-accent rounded-full font-mono text-xs font-bold">
                      4
                    </span>
                    <span>
                      Include an array of sessions within the bundle (each session follows the Session structure)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-accent/20 text-cz-accent rounded-full font-mono text-xs font-bold">
                      5
                    </span>
                    <span>
                      All pages automatically pick up the new bundle — bundle cards, counts, everything updates instantly
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 bg-cz-accent/20 text-cz-accent rounded-full font-mono text-xs font-bold">
                      6
                    </span>
                    <span>
                      Commit and push to deploy
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-cz-bg border border-cz-border rounded-lg p-4">
                <p className="text-xs font-mono text-cz-text-muted mb-3 uppercase tracking-wide">
                  Example Code
                </p>
                <pre className="text-xs text-cz-text overflow-x-auto font-mono">
                  <code>{`{
  slug: "new-bundle-slug",
  skillNum: "Skill",
  name: "New Bundle Name",
  tagline: "Short tagline for the bundle",
  description: "Longer description explaining what this bundle teaches",
  sessions: [
    {
      number: 1,
      creator: "Creator Name",
      date: "Month DD YYYY",
      title: "Session Title",
      description: "What this session covers",
      videoId: "optional-bunny-id",
      duration: "45 min"
    }
  ],
  pdfUrl: "optional-supabase-storage-url"
}`}</code>
                </pre>
              </div>

              <div className="p-4 rounded-lg border border-cz-accent/30 bg-cz-accent/5">
                <p className="text-sm text-cz-text">
                  <strong className="text-cz-accent">Power Feature:</strong> The entire site dynamically renders all bundles. Create a new bundle in this file and it instantly appears on the bundles page, pricing, and all associated pages. No UI changes required.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* INFO SECTION */}
        <div className="bg-cz-bg-card border border-cz-deep-teal/40 rounded-lg p-6">
          <h2 className="text-lg font-display font-bold text-cz-text mb-4">
            Important File Reference
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-cz-text-muted mb-2">
                All bundle and session data lives in one place:
              </p>
              <code className="block bg-cz-bg border border-cz-border rounded px-4 py-3 text-sm text-cz-teal font-mono">
                src/lib/bundles.ts
              </code>
            </div>
            <p className="text-sm text-cz-text">
              This is the <strong>single source of truth</strong> for all Cozora content. Every change to bundles, sessions, videos, or PDFs happens here. The rest of the application automatically reads from this file and updates every page in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
