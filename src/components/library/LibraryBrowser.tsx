'use client';

import { useMemo, useState } from 'react';
import type { SkillPost, Tier } from '@/lib/substack';
import { TIERS } from '@/lib/substack';

const TIER_STYLES: Record<Tier, string> = {
  'Start Here': 'bg-cz-teal/15 text-cz-teal border-cz-teal/40',
  'Apply AI': 'bg-cz-accent/15 text-cz-accent border-cz-accent/40',
  'Go Deep': 'bg-cz-coral/15 text-cz-coral border-cz-coral/40',
};

const TABS = ['All', ...TIERS] as const;
type Tab = (typeof TABS)[number];

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

function SkillCard({ post, index }: { post: SkillPost; index: number }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${Math.min(index, 11) * 55}ms` }}
      className="cz-lib-in group flex flex-col overflow-hidden rounded-2xl border border-cz-border bg-cz-bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-cz-border-strong hover:bg-cz-bg-card-hover hover:shadow-xl hover:shadow-black/30"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-cz-surface/30">
        {/* Sheen sweep on hover */}
        <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cz-deep-teal to-cz-bg-card">
            <span className="font-display text-2xl font-bold text-cz-text/40">
              cozora
            </span>
          </div>
        )}
        {post.tier && (
          <span
            className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium backdrop-blur-sm ${TIER_STYLES[post.tier]}`}
          >
            {post.tier}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-cz-text transition-colors group-hover:text-cz-accent">
          {post.title}
        </h3>
        {post.subtitle && (
          <p className="mt-2 line-clamp-2 text-sm text-cz-text-muted">
            {post.subtitle}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-cz-border pt-3">
          <span className="font-mono text-xs text-cz-text-muted">
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-cz-teal transition-colors group-hover:text-cz-accent">
            Open
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function LibraryBrowser({ posts }: { posts: SkillPost[] }) {
  const [tab, setTab] = useState<Tab>('All');
  const [query, setQuery] = useState('');

  const counts = useMemo(() => {
    const c: Record<Tab, number> = { All: posts.length, 'Start Here': 0, 'Apply AI': 0, 'Go Deep': 0 };
    for (const p of posts) if (p.tier) c[p.tier] += 1;
    return c;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const tierOk = tab === 'All' || p.tier === tab;
      const textOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q);
      return tierOk && textOk;
    });
  }, [posts, tab, query]);

  return (
    <div>
      {/* Search */}
      <div className="animate-fade-up delay-300 mx-auto mb-8 max-w-xl">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cz-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills…"
            className="w-full rounded-full border border-cz-border bg-cz-bg-card py-3 pl-12 pr-4 text-cz-text placeholder:text-cz-text-muted/70 outline-none transition-colors focus:border-cz-accent"
          />
        </div>
      </div>

      {/* Tier tabs */}
      <div className="animate-fade-up delay-400 mb-10 flex flex-wrap justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-4 py-2 font-mono text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
              tab === t
                ? 'border-cz-accent bg-cz-accent text-cz-bg shadow-lg shadow-cz-accent/20'
                : 'border-cz-border bg-cz-bg-card text-cz-text-muted hover:border-cz-border-strong hover:text-cz-text'
            }`}
          >
            {t}
            <span className={`ml-2 ${tab === t ? 'text-cz-bg/70' : 'text-cz-text-dim'}`}>
              {counts[t]}
            </span>
          </button>
        ))}
      </div>

      {/* Grid — keyed by tab so cards re-run their entrance stagger on tab switch */}
      {filtered.length > 0 ? (
        <div key={tab} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <SkillCard key={p.id} post={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="font-display text-lg text-cz-text">No skills found</p>
          <p className="mt-2 text-sm text-cz-text-muted">
            {query ? 'Try a different search term.' : 'New skills appear here automatically.'}
          </p>
        </div>
      )}
    </div>
  );
}
