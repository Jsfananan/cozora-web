'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const skillColorMap: Record<string, { text: string; bg: string }> = {
  Create: { text: 'text-cz-coral', bg: 'bg-cz-coral/10' },
  Build: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Think: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Lead: { text: 'text-cz-accent', bg: 'bg-cz-accent/10' },
};

interface DbSession {
  id: string;
  bundle_id: string;
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

function SessionRow({
  session,
  onSaved,
}: {
  session: DbSession;
  onSaved: () => void;
}) {
  const [videoUrl, setVideoUrl] = useState(session.video_url || '');
  const [notesTitle, setNotesTitle] = useState(session.notes_title || '');
  const [notesContent, setNotesContent] = useState(session.notes_content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const editorRef = useRef<HTMLDivElement>(null);

  const handleEditorInput = useCallback(() => {
    if (editorRef.current) {
      setNotesContent(editorRef.current.innerHTML);
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      const res = await fetch(`/api/admin/sessions/${session.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          video_url: videoUrl || null,
          notes_title: notesTitle || null,
          notes_content: notesContent || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }
      setSaveStatus('success');
      onSaved();
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('Save failed:', err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
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
            {session.creator} {session.date ? `• ${session.date}` : ''}
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
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-3 py-2 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-body font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm"
          >
            {isSaving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error — Retry' : 'Save'}
          </button>
          <div className={`w-3 h-3 rounded-full ${videoUrl ? 'bg-cz-teal' : 'bg-cz-text-dim'}`} />
        </div>
      </div>

      <div className="border-t border-cz-border/30 pt-4 space-y-3">
        <h5 className="text-xs font-mono text-cz-accent uppercase tracking-wider">
          Session Notes
        </h5>
        <div>
          <label className="block text-xs font-mono text-cz-text-muted mb-1">
            Notes Title
          </label>
          <input
            type="text"
            value={notesTitle}
            onChange={(e) => setNotesTitle(e.target.value)}
            placeholder="e.g. Turning Your Writing Into Film: A Practical Guide"
            className="w-full bg-cz-bg-card border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-cz-text-muted mb-1">
            Notes Content
          </label>
          <div className="flex gap-1 mb-2 flex-wrap">
            {[
              { cmd: 'bold', label: 'B', style: 'font-bold' },
              { cmd: 'italic', label: 'I', style: 'italic' },
            ].map(({ cmd, label, style }) => (
              <button
                key={cmd}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  document.execCommand(cmd, false);
                }}
                className={`px-2 py-1 text-xs ${style} bg-cz-bg-card border border-cz-border text-cz-text-muted hover:text-cz-text hover:border-cz-teal rounded transition-colors`}
              >
                {label}
              </button>
            ))}
            {[
              { cmd: 'formatBlock', arg: 'h2', label: 'H2' },
              { cmd: 'formatBlock', arg: 'h3', label: 'H3' },
              { cmd: 'formatBlock', arg: 'p', label: 'P' },
            ].map(({ cmd, arg, label }) => (
              <button
                key={label}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  document.execCommand(cmd, false, arg);
                }}
                className="px-2 py-1 text-xs font-mono bg-cz-bg-card border border-cz-border text-cz-text-muted hover:text-cz-text hover:border-cz-teal rounded transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            className="w-full bg-cz-bg-card border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none min-h-[120px] max-h-[400px] overflow-y-auto prose prose-invert prose-sm max-w-none [&_h2]:text-lg [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-cz-text [&_h2]:mt-3 [&_h2]:mb-1 [&_h3]:text-base [&_h3]:font-display [&_h3]:font-bold [&_h3]:text-cz-text [&_h3]:mt-2 [&_h3]:mb-1 [&_p]:text-cz-text [&_p]:mb-2 [&_b]:text-cz-text [&_strong]:text-cz-text"
            dangerouslySetInnerHTML={{ __html: notesContent }}
            suppressContentEditableWarning
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-cz-text-dim">
          <div className={`w-2 h-2 rounded-full ${notesTitle || notesContent ? 'bg-cz-teal' : 'bg-cz-text-dim'}`} />
          {notesTitle || notesContent ? 'Notes added' : 'No notes yet'}
        </div>
      </div>
    </div>
  );
}

function AddSessionForm({ bundle, onSaved }: { bundle: DbBundle; onSaved: () => void }) {
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextNumber = bundle.sessions.length + 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !creator.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bundle_id: bundle.id,
          number: nextNumber,
          title: title.trim(),
          creator: creator.trim(),
          date: date.trim() || null,
          description: description.trim() || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create session');
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create session');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cz-bg border border-cz-teal/30 rounded-lg p-4 space-y-3">
      <h5 className="text-xs font-mono text-cz-teal uppercase tracking-wider">
        New Session #{nextNumber}
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-cz-text-muted mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Session title"
            required
            className="w-full bg-cz-bg-card border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-cz-text-muted mb-1">Creator *</label>
          <input
            type="text"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            placeholder="Speaker name"
            required
            className="w-full bg-cz-bg-card border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-cz-text-muted mb-1">Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g. March 5, 2026"
            className="w-full bg-cz-bg-card border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-cz-text-muted mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short session description"
            className="w-full bg-cz-bg-card border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
          />
        </div>
      </div>
      {error && <p className="text-xs text-cz-coral">{error}</p>}
      <button
        type="submit"
        disabled={isSaving || !title.trim() || !creator.trim()}
        className="px-4 py-2 bg-cz-teal hover:bg-cz-teal/80 text-cz-bg font-semibold rounded-lg text-sm transition-colors disabled:opacity-50"
      >
        {isSaving ? 'Adding...' : 'Add Session'}
      </button>
    </form>
  );
}

function BundleCard({ bundle, onRefresh }: { bundle: DbBundle; onRefresh: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const colors = skillColorMap[bundle.skill_num] || { text: 'text-cz-teal', bg: 'bg-cz-teal/10' };

  return (
    <div className="bg-cz-bg-card border border-cz-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-cz-bg-card-hover transition-colors"
      >
        <div className="flex items-center gap-4 flex-1 text-left">
          <div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono ${colors.text} ${colors.bg} mb-2`}>
              {bundle.skill_num}
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
          <div className={`w-3 h-3 rounded-full ${bundle.is_active ? 'bg-cz-teal' : 'bg-cz-text-dim'}`} />
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
                <SessionRow key={session.id} session={session} onSaved={onRefresh} />
              ))}
            </div>

            {showAddForm ? (
              <AddSessionForm
                bundle={bundle}
                onSaved={() => {
                  setShowAddForm(false);
                  onRefresh();
                }}
              />
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full py-2 border border-dashed border-cz-border hover:border-cz-teal text-cz-text-muted hover:text-cz-teal rounded-lg text-sm font-mono transition-colors"
              >
                + Add Session
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BundlesPage() {
  const [bundles, setBundles] = useState<DbBundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBundles = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/bundles');
      if (!res.ok) throw new Error('Failed to fetch bundles');
      const data = await res.json();
      setBundles(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch bundles:', err);
      setError('Failed to load bundles from database. Have you run the SQL migrations?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBundles();
  }, [fetchBundles]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <p className="text-cz-text-muted">Loading bundles from database...</p>
      </div>
    );
  }

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
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard?preview=admin"
            className="px-5 py-3 border border-cz-teal text-cz-teal hover:bg-cz-teal/10 font-body font-semibold rounded-lg transition-colors text-sm"
          >
            Preview as Customer
          </Link>
          <Link
            href="/admin/bundles/new"
            className="px-6 py-3 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-display font-semibold rounded-lg transition-colors"
          >
            Add New Bundle
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-cz-coral/10 border border-cz-coral/30 rounded-lg px-4 py-3">
          <p className="text-sm text-cz-coral">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {bundles.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} onRefresh={fetchBundles} />
        ))}
      </div>

      {!error && bundles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-cz-text-muted">No bundles found. Run the SQL migrations to seed the initial data.</p>
        </div>
      )}
    </div>
  );
}
