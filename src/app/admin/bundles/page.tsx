'use client';

import { useState } from 'react';
import Link from 'next/link';
import { bundles } from '@/lib/bundles';
import type { Bundle, Session } from '@/lib/bundles';

const skillColorMap = {
  Create: { text: 'text-cz-coral', bg: 'bg-cz-coral/10' },
  Build: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Think: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Lead: { text: 'text-cz-accent', bg: 'bg-cz-accent/10' },
};

function SessionRow({
  bundle,
  session,
}: {
  bundle: Bundle;
  session: Session;
}) {
  const [videoUrl, setVideoUrl] = useState(session.videoId || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveVideo = () => {
    setIsSaving(true);
    console.log(`Saving video for ${bundle.name} - Session ${session.number}:`, {
      videoUrl,
      bundleSlug: bundle.slug,
      sessionNumber: session.number,
    });
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="bg-cz-bg p-4 rounded-lg border border-cz-border/50 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-xs font-mono text-cz-text-muted mb-1">
            Session {session.number}
          </div>
          <h4 className="font-body font-semibold text-cz-text">
            {session.title}
          </h4>
          <p className="text-sm text-cz-text-muted mt-1">
            {session.creator} • {session.date}
          </p>
        </div>

        <div>
          <label className="block text-xs font-mono text-cz-text-muted mb-2">
            Video URL
          </label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://bunny.net/..."
            className="w-full bg-cz-bg-card border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={handleSaveVideo}
            disabled={isSaving}
            className="flex-1 px-3 py-2 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-body font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <div className={`w-3 h-3 rounded-full ${videoUrl ? 'bg-cz-teal' : 'bg-cz-text-dim'}`} />
        </div>
      </div>
    </div>
  );
}

function BundleCard({ bundle }: { bundle: Bundle }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadedPdfs, setUploadedPdfs] = useState<
    { name: string; size: number; id: string }[]
  >([]);

  const colors = skillColorMap[bundle.skillNum as keyof typeof skillColorMap];

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      console.log(`PDF selected for ${bundle.name}:`, {
        fileName: file.name,
        size: file.size,
        bundleSlug: bundle.slug,
      });

      const newPdf = {
        name: file.name,
        size: Math.round(file.size / 1024),
        id: Math.random().toString(36).slice(2, 9),
      };
      setUploadedPdfs([...uploadedPdfs, newPdf]);
      setPdfFile(null);
    }
  };

  const handleDeletePdf = (id: string) => {
    console.log(`Deleting PDF from ${bundle.name}:`, id);
    setUploadedPdfs(uploadedPdfs.filter((pdf) => pdf.id !== id));
  };

  const handleStatusToggle = () => {
    setIsActive(!isActive);
    console.log(`Toggling status for ${bundle.name}:`, {
      isActive: !isActive,
      bundleSlug: bundle.slug,
    });
  };

  return (
    <div className="bg-cz-bg-card border border-cz-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-cz-bg-card-hover transition-colors"
      >
        <div className="flex items-center gap-4 flex-1 text-left">
          <div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono ${colors.text} ${colors.bg} mb-2`}>
              {bundle.skillNum}
            </div>
            <h3 className="text-lg font-display font-bold text-cz-text">
              {bundle.name}
            </h3>
            <p className="text-sm text-cz-text-muted mt-1">
              {bundle.sessions.length} sessions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusToggle();
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isActive ? 'bg-cz-teal' : 'bg-cz-text-dim'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-cz-bg transition-transform ${
                  isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <svg
            className={`w-5 h-5 text-cz-text-muted transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-cz-border bg-cz-bg px-6 py-6 space-y-6">
          <div>
            <h4 className="text-sm font-mono text-cz-coral uppercase tracking-wider mb-4">
              Sessions
            </h4>
            <div className="space-y-4">
              {bundle.sessions.map((session) => (
                <SessionRow key={session.number} bundle={bundle} session={session} />
              ))}
            </div>
          </div>

          <div className="border-t border-cz-border pt-6">
            <h4 className="text-sm font-mono text-cz-teal uppercase tracking-wider mb-4">
              Resources
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-cz-text-muted mb-3">
                  Upload PDF
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="block w-full text-sm text-cz-text-muted
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-cz-accent file:text-cz-bg
                    hover:file:bg-cz-accent-hover cursor-pointer"
                />
              </div>

              {uploadedPdfs.length > 0 && (
                <div>
                  <p className="text-xs font-mono text-cz-text-muted mb-2">
                    {uploadedPdfs.length} file{uploadedPdfs.length !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-2">
                    {uploadedPdfs.map((pdf) => (
                      <div
                        key={pdf.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-cz-bg-card border border-cz-border/50"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <svg
                            className="w-4 h-4 text-cz-accent flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                          </svg>
                          <div className="truncate">
                            <p className="text-sm text-cz-text truncate">
                              {pdf.name}
                            </p>
                            <p className="text-xs text-cz-text-muted">
                              {pdf.size} KB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          <button className="p-1 text-cz-text-muted hover:text-cz-teal transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeletePdf(pdf.id)}
                            className="p-1 text-cz-text-muted hover:text-cz-coral transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BundlesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-cz-text mb-2">
            Manage Bundles
          </h1>
          <p className="text-cz-text-muted">
            Edit sessions, upload videos, and manage PDFs
          </p>
        </div>
        <Link
          href="/admin/bundles/new"
          className="px-6 py-3 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-display font-semibold rounded-lg transition-colors"
        >
          Add New Bundle
        </Link>
      </div>

      <div className="space-y-4">
        {bundles.map((bundle) => (
          <BundleCard key={bundle.slug} bundle={bundle} />
        ))}
      </div>
    </div>
  );
}
