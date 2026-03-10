'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Session } from '@/lib/bundles';

interface FormSession extends Session {
  _id: string;
}

const SKILL_NUMS = ['Create', 'Build', 'Think', 'Lead'];

export default function NewBundlePage() {
  const [formData, setFormData] = useState({
    skillNum: 'Create',
    name: '',
    tagline: '',
    description: '',
  });

  const [sessions, setSessions] = useState<FormSession[]>([
    {
      _id: '1',
      number: 1,
      creator: '',
      date: '',
      title: '',
      description: '',
    },
  ]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSessionChange = (
    id: string,
    field: string,
    value: string | number
  ) => {
    setSessions((prev) =>
      prev.map((session) =>
        session._id === id ? { ...session, [field]: value } : session
      )
    );
  };

  const handleAddSession = () => {
    const newId = Math.random().toString(36).slice(2, 9);
    setSessions((prev) => [
      ...prev,
      {
        _id: newId,
        number: prev.length + 1,
        creator: '',
        date: '',
        title: '',
        description: '',
      },
    ]);
  };

  const handleRemoveSession = (id: string) => {
    if (sessions.length > 1) {
      setSessions((prev) => prev.filter((s) => s._id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating new bundle:', {
      ...formData,
      sessions: sessions.map(({ _id, ...rest }) => rest),
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/bundles"
          className="text-sm text-cz-text-muted hover:text-cz-text transition-colors mb-4 inline-block"
        >
          ← Back to Bundles
        </Link>
        <h1 className="text-4xl font-display font-bold text-cz-text mb-2">
          Create New Bundle
        </h1>
        <p className="text-cz-text-muted">
          Add a new skill set bundle with sessions and resources
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-cz-bg-card border border-cz-border rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-mono text-cz-text-muted mb-2">
              Skill Number
            </label>
            <select
              name="skillNum"
              value={formData.skillNum}
              onChange={handleFormChange}
              className="w-full bg-cz-bg border border-cz-border text-cz-text rounded-lg px-4 py-2 focus:border-cz-teal focus:outline-none"
            >
              {SKILL_NUMS.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-mono text-cz-text-muted mb-2">
              Bundle Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="e.g., AI Content & Growth Machine"
              className="w-full bg-cz-bg border border-cz-border text-cz-text rounded-lg px-4 py-2 focus:border-cz-teal focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-cz-text-muted mb-2">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleFormChange}
              placeholder="e.g., Create, publish, grow — writing, video, design, audience."
              className="w-full bg-cz-bg border border-cz-border text-cz-text rounded-lg px-4 py-2 focus:border-cz-teal focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-cz-text-muted mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Describe the bundle and what users will learn..."
              rows={4}
              className="w-full bg-cz-bg border border-cz-border text-cz-text rounded-lg px-4 py-2 focus:border-cz-teal focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-bold text-cz-text">
              Sessions
            </h2>
            <button
              type="button"
              onClick={handleAddSession}
              className="text-sm px-4 py-2 rounded-lg border border-cz-border hover:border-cz-teal text-cz-text-muted hover:text-cz-teal transition-colors"
            >
              + Add Session
            </button>
          </div>

          {sessions.map((session, index) => (
            <div
              key={session._id}
              className="bg-cz-bg-card border border-cz-border rounded-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-mono text-cz-coral">
                  Session {index + 1}
                </h3>
                {sessions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSession(session._id)}
                    className="text-xs px-3 py-1 rounded bg-cz-coral/10 text-cz-coral hover:bg-cz-coral/20 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-cz-text-muted mb-2">
                    Creator
                  </label>
                  <input
                    type="text"
                    value={session.creator}
                    onChange={(e) =>
                      handleSessionChange(session._id, 'creator', e.target.value)
                    }
                    placeholder="e.g., Joel"
                    className="w-full bg-cz-bg border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-cz-text-muted mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={session.date}
                    onChange={(e) =>
                      handleSessionChange(session._id, 'date', e.target.value)
                    }
                    placeholder="e.g., Nov 3 2025"
                    className="w-full bg-cz-bg border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-cz-text-muted mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={session.title}
                  onChange={(e) =>
                    handleSessionChange(session._id, 'title', e.target.value)
                  }
                  placeholder="Session title"
                  className="w-full bg-cz-bg border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-cz-text-muted mb-2">
                  Description
                </label>
                <textarea
                  value={session.description}
                  onChange={(e) =>
                    handleSessionChange(
                      session._id,
                      'description',
                      e.target.value
                    )
                  }
                  placeholder="What will be covered in this session?"
                  rows={3}
                  className="w-full bg-cz-bg border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-cz-text-muted mb-2">
                  Video URL
                </label>
                <input
                  type="text"
                  placeholder="https://bunny.net/... (optional, add later)"
                  className="w-full bg-cz-bg border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-display font-semibold rounded-lg transition-colors"
          >
            Create Bundle
          </button>
          <Link
            href="/admin/bundles"
            className="px-6 py-3 border border-cz-border rounded-lg text-cz-text hover:border-cz-teal transition-colors text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
