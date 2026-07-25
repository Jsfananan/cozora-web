'use client';

import { useMemo, useState } from 'react';
import type { SkillPost, Tier } from '@/lib/substack';
import { TIERS, TOPICS, GENERAL_TOPIC } from '@/lib/substack';

const PAGE_SIZE = 30;

// Curated quick searches — plain strings that prefill the search box. No AI,
// no tokens; just the most useful entry points into the library.
const SUGGESTED_SEARCHES = ['cold email', 'carousels', 'video', 'newsletter', 'meeting prep', 'SEO', 'research'];

const TIER_BADGE: Record<Tier, string> = {
  'Start Here': 'bg-cz-teal/15 text-cz-teal border-cz-teal/40',
  'Apply AI': 'bg-cz-accent/15 text-cz-accent border-cz-accent/40',
  'Go Deep': 'bg-cz-coral/15 text-cz-coral border-cz-coral/40',
};

const TIER_TAG: Record<Tier, string> = {
  'Start Here': 'text-cz-teal border-cz-teal/30',
  'Apply AI': 'text-cz-accent border-cz-accent/30',
  'Go Deep': 'text-cz-coral border-cz-coral/30',
};

// Topic accent gradients (thumbnails, dots) keyed by TopicDef.key.
const TOPIC_GRADIENT: Record<string, string> = {
  writing: 'from-cz-deep-teal to-cz-teal',
  video: 'from-[#5a2d7a] to-cz-coral',
  coding: 'from-[#0f3d5c] to-[#3a9bd6]',
  marketing: 'from-[#7a5a1a] to-cz-accent',
  research: 'from-[#1a4f4a] to-[#4fb3a0]',
  systems: 'from-[#2a3a4a] to-[#6b8299]',
  leadership: 'from-[#5a1a3a] to-[#a03a6a]',
  general: 'from-cz-deep-teal to-cz-bg-card',
};

const TABS = ['All', ...TIERS] as const;
type Tab = (typeof TABS)[number];

const TOPIC_LABEL: Record<string, string> = {
  ...Object.fromEntries(TOPICS.map((t) => [t.key, t.label])),
  [GENERAL_TOPIC.key]: GENERAL_TOPIC.label,
};

function shortTopic(key: string | null): string {
  if (!key) return GENERAL_TOPIC.label;
  return (TOPIC_LABEL[key] ?? '').split(' ')[0];
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

/* ---------- Featured (big card) ---------- */
function FeaturedCard({ post, index }: { post: SkillPost; index: number }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${index * 60}ms` }}
      className="cz-lib-in group flex flex-col overflow-hidden rounded-2xl border border-cz-border-strong bg-cz-bg-elevated shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1.5 hover:border-cz-teal/40 hover:bg-cz-bg-elevated-hover hover:shadow-xl hover:shadow-black/40"
    >
      <div className="relative aspect-[2/1] w-full overflow-hidden bg-cz-bg">
        <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImage} alt={post.title} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${TOPIC_GRADIENT[post.topic ?? 'general']}`}>
            <span className="font-display text-2xl font-bold text-cz-text/40">cozora</span>
          </div>
        )}
        {post.tier && (
          <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium backdrop-blur-sm ${TIER_BADGE[post.tier]}`}>
            {post.tier}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-cz-text transition-colors group-hover:text-cz-accent">
          {post.title}
        </h3>
        {post.subtitle && <p className="mt-2 line-clamp-2 text-sm text-cz-text-muted">{post.subtitle}</p>}
        <div className="mt-4 flex items-center justify-between border-t border-cz-border pt-3">
          <span className="font-mono text-xs text-cz-text-muted">{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-cz-teal transition-colors group-hover:text-cz-accent">
            Open <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  );
}

/* ---------- Compact row (list + accordion) ---------- */
function SkillRow({ post, showTopic = true }: { post: SkillPost; showTopic?: boolean }) {
  const initial = post.title.replace(/^The\s+/i, '').charAt(0).toUpperCase();
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-xl border border-cz-border-strong bg-cz-bg-elevated px-4 py-3 shadow-sm shadow-black/20 transition-all duration-200 hover:border-cz-teal/40 hover:bg-cz-bg-elevated-hover"
    >
      <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-gradient-to-br font-display text-lg font-bold text-cz-bg/85 ${TOPIC_GRADIENT[post.topic ?? 'general']}`}>
        {initial}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-[15px] font-bold text-cz-text transition-colors group-hover:text-cz-accent">
          {post.title}
        </span>
        {post.subtitle && <span className="mt-0.5 block truncate text-[13px] text-cz-text-muted">{post.subtitle}</span>}
      </span>
      <span className="hidden flex-none items-center gap-2 sm:flex">
        {showTopic && post.topic && (
          <span className="rounded-full border border-cz-teal/30 px-2.5 py-0.5 font-mono text-[11px] text-cz-teal">
            {shortTopic(post.topic)}
          </span>
        )}
        {post.tier && (
          <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${TIER_TAG[post.tier]}`}>
            {post.tier}
          </span>
        )}
      </span>
      <span className="hidden w-12 flex-none text-right font-mono text-xs text-cz-text-dim md:block">
        {formatDate(post.date)}
      </span>
      <ArrowRight className="flex-none text-cz-teal transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}

/* ---------- Accordion section (default topic index) ---------- */
function TopicSection({
  topicKey,
  label,
  posts,
  open,
  onToggle,
  onSeeAll,
}: {
  topicKey: string;
  label: string;
  posts: SkillPost[];
  open: boolean;
  onToggle: () => void;
  onSeeAll: () => void;
}) {
  const preview = posts.slice(0, 5);
  return (
    <div className={`overflow-hidden rounded-2xl border bg-cz-bg-elevated shadow-sm shadow-black/20 ${open ? 'border-cz-teal/40' : 'border-cz-border-strong'}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-cz-bg-elevated-hover"
      >
        <span className="flex items-center gap-3">
          <span className={`h-2.5 w-2.5 flex-none rounded-full bg-gradient-to-br ${TOPIC_GRADIENT[topicKey]}`} />
          <span className="font-display text-[17px] font-bold text-cz-text">{label}</span>
          <span className="font-mono text-sm text-cz-text-dim">{posts.length}</span>
        </span>
        <span className={`font-mono text-sm transition-colors ${open ? 'text-cz-teal' : 'text-cz-text-dim'}`}>
          {open ? '▾' : '▸'}
        </span>
      </button>
      {open && (
        <div className="border-t border-cz-border-strong bg-cz-bg/50 p-3">
          <div className="flex flex-col gap-2">
            {preview.map((p) => (
              <SkillRow key={p.id} post={p} showTopic={false} />
            ))}
          </div>
          {posts.length > preview.length && (
            <button
              onClick={onSeeAll}
              className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 font-display text-sm font-semibold text-cz-teal transition-colors hover:text-cz-accent"
            >
              Show all {posts.length} {label.split(' ')[0]} skills <ArrowRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function LibraryBrowser({ posts }: { posts: SkillPost[] }) {
  const [tab, setTab] = useState<Tab>('All');
  const [topic, setTopic] = useState<string | null>(null); // null = all topics
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openTopic, setOpenTopic] = useState<string | null>(TOPICS[0]?.key ?? null);

  const q = query.trim().toLowerCase();
  // Browse mode = the curated categorized index. The moment a member searches,
  // picks a topic, or picks a tier, we flip to the flat filtered results list.
  const isBrowsing = !q && topic === null && tab === 'All';

  const tierCounts = useMemo(() => {
    const c: Record<Tab, number> = { All: posts.length, 'Start Here': 0, 'Apply AI': 0, 'Go Deep': 0 };
    for (const p of posts) if (p.tier) c[p.tier] += 1;
    return c;
  }, [posts]);

  const topicGroups = useMemo(() => {
    const groups = new Map<string, SkillPost[]>();
    for (const t of TOPICS) groups.set(t.key, []);
    groups.set(GENERAL_TOPIC.key, []);
    for (const p of posts) groups.get(p.topic ?? GENERAL_TOPIC.key)!.push(p);
    return groups;
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const tierOk = tab === 'All' || p.tier === tab;
      const topicOk = topic === null || (p.topic ?? GENERAL_TOPIC.key) === topic;
      const textOk = !q || p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q);
      return tierOk && topicOk && textOk;
    });
  }, [posts, tab, topic, q]);

  const featured = posts.slice(0, 3);

  function selectTopic(key: string | null) {
    setTopic(key);
    setVisible(PAGE_SIZE);
  }
  function selectTab(t: Tab) {
    setTab(t);
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      {/* Search */}
      <div className="animate-fade-up delay-300 mx-auto mb-4 max-w-xl">
        <div className="relative">
          <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cz-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
            placeholder="Search skills…"
            className="w-full rounded-full border border-cz-border bg-cz-bg-card py-3 pl-12 pr-4 text-cz-text placeholder:text-cz-text-muted/70 outline-none transition-colors focus:border-cz-accent"
          />
        </div>
        {/* Suggested searches */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-cz-text-dim">Try</span>
          {SUGGESTED_SEARCHES.map((s) => (
            <button
              key={s}
              onClick={() => { setQuery(s); setVisible(PAGE_SIZE); }}
              className="rounded-full border border-cz-border bg-cz-bg-card px-3 py-1 font-mono text-xs text-cz-text-muted transition-all hover:-translate-y-0.5 hover:border-cz-teal hover:text-cz-teal"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Topic filter */}
      <div className="animate-fade-up delay-400 mb-2 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => selectTopic(null)}
          className={`rounded-full border px-4 py-2 font-mono text-sm transition-all duration-300 hover:-translate-y-0.5 ${topic === null ? 'border-cz-border-strong bg-cz-deep-teal text-cz-teal' : 'border-cz-border bg-cz-bg-card text-cz-text-muted hover:text-cz-text'}`}
        >
          All Topics
        </button>
        {TOPICS.map((t) => {
          const count = topicGroups.get(t.key)?.length ?? 0;
          if (count === 0) return null;
          return (
            <button
              key={t.key}
              onClick={() => selectTopic(t.key)}
              className={`rounded-full border px-4 py-2 font-mono text-sm transition-all duration-300 hover:-translate-y-0.5 ${topic === t.key ? 'border-cz-border-strong bg-cz-deep-teal text-cz-teal' : 'border-cz-border bg-cz-bg-card text-cz-text-muted hover:text-cz-text'}`}
            >
              {t.label}
              <span className={`ml-2 ${topic === t.key ? 'text-cz-teal/60' : 'text-cz-text-dim'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Depth (tier) filter */}
      <div className="animate-fade-up delay-400 mb-10 flex flex-wrap justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => selectTab(t)}
            className={`rounded-full border px-4 py-2 font-mono text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
              tab === t ? 'border-cz-accent bg-cz-accent text-cz-bg shadow-lg shadow-cz-accent/20' : 'border-cz-border bg-cz-bg-card text-cz-text-muted hover:border-cz-border-strong hover:text-cz-text'
            }`}
          >
            {t}
            <span className={`ml-2 ${tab === t ? 'text-cz-bg/70' : 'text-cz-text-dim'}`}>{tierCounts[t]}</span>
          </button>
        ))}
      </div>

      {isBrowsing ? (
        /* ===== Browse mode: featured rail + categorized index ===== */
        <>
          {featured.length > 0 && (
            <>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-cz-accent">★ New this week</p>
              <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((p, i) => (
                  <FeaturedCard key={p.id} post={p} index={i} />
                ))}
              </div>
            </>
          )}
          <div className="flex flex-col gap-3">
            {[...TOPICS, GENERAL_TOPIC].map((t) => {
              const group = topicGroups.get(t.key) ?? [];
              if (group.length === 0) return null;
              return (
                <TopicSection
                  key={t.key}
                  topicKey={t.key}
                  label={t.label}
                  posts={group}
                  open={openTopic === t.key}
                  onToggle={() => setOpenTopic(openTopic === t.key ? null : t.key)}
                  onSeeAll={() => selectTopic(t.key)}
                />
              );
            })}
          </div>
        </>
      ) : (
        /* ===== Results mode: flat, dense, paginated ===== */
        <>
          <div className="mb-5 flex items-center justify-between">
            <p className="font-mono text-sm text-cz-text-muted">
              {filtered.length} {filtered.length === 1 ? 'skill' : 'skills'}
              {topic && <span className="text-cz-teal"> · {TOPIC_LABEL[topic]}</span>}
              {tab !== 'All' && <span className="text-cz-accent"> · {tab}</span>}
              {q && <span className="text-cz-text"> · “{query.trim()}”</span>}
            </p>
            <button
              onClick={() => { setQuery(''); selectTopic(null); selectTab('All'); }}
              className="font-mono text-xs text-cz-text-dim underline underline-offset-2 transition-colors hover:text-cz-text"
            >
              Clear
            </button>
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="flex flex-col gap-2">
                {filtered.slice(0, visible).map((p) => (
                  <SkillRow key={p.id} post={p} showTopic={topic === null} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="rounded-full border border-cz-border-strong bg-cz-bg-card px-6 py-3 font-mono text-sm text-cz-text transition-colors hover:bg-cz-bg-card-hover"
                  >
                    Load {Math.min(PAGE_SIZE, filtered.length - visible)} more
                  </button>
                  <span className="mt-2.5 block font-mono text-xs text-cz-text-dim">
                    Showing {Math.min(visible, filtered.length)} of {filtered.length} skills
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="font-display text-lg text-cz-text">No skills found</p>
              <p className="mt-2 text-sm text-cz-text-muted">Try a different search term or topic.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
