// Cozora Premium Library — pulls skill posts live from the Substack archive API.
//
// Scope decision (2026-07-13): the Library shows standalone *skill drops* only.
// Workshop recordings, summit sessions and Q&A recordings are excluded via
// EXCLUDE_TAGS. Everything else that is a paid post is treated as a skill.
//
// TAGGING (see docs/TAGGING.md for the full rules)
//   Depth  : one of TIERS, exact tag text on the Substack post.
//   Topic  : one of TOPICS (tag alias), else a curated override (SKILL_TOPIC_OVERRIDES below),
//            else a word-start keyword guess.
//   Creator: read from the post's Substack byline, never typed by hand.
// `npm run audit:tags` prints what still needs tagging.
//
// No imports on purpose: scripts/audit-tags.mjs loads this file directly under Node.


const PUBLICATION = 'https://cozora.substack.com';

// Curated per-skill metadata that Substack tags can't carry yet.
//
// Topic resolution order in this file is:
//   1. an explicit Substack topic tag on the post (always wins)
//   2. SKILL_TOPIC_OVERRIDES below (keyed by Substack slug)
//   3. a word-start keyword match over title + subtitle (last resort)
//
// An override is a stopgap. Once a post carries a topic tag in Substack, delete its
// line here. `npm run audit:tags` lists which posts still rely on an override.
//
// Topic keys come from TOPICS in this file:
//   writing, video, coding, marketing, research, systems, leadership
//
// ⚠ Judgment calls (confirm or retag): fable-learning-skill, nova-weekly-reflection,
// focus-message-restructurer-skill, visual-brand-builder-skill, branded-slide-decks-skill.

export const SKILL_TOPIC_OVERRIDES: Record<string, string> = {
  // Writing & Content
  'voice-profile-builder-skill': 'writing',
  'draft-enhancement-pass': 'writing',
  'ending-strength-editor': 'writing',
  'first-person-pronoun-audit-skill': 'writing',
  'voice-anchored-social-repurposer': 'writing',
  'the-21-angle-notes-skill': 'writing',
  '21-substack-notes-agent': 'writing',

  // Leadership & Strategy
  'difficult-feedback-opener-rehearsal': 'leadership',
  'feedforward-avoidance-checker': 'leadership',
  'trust-deposit-tracker-post': 'leadership',
  'failure-reframing-rewriter-skill': 'leadership',
  'focus-message-restructurer-skill': 'leadership',
  'ai-failure-mode-resilience-simulation': 'leadership',
  'becoming-unpromptable-how-to-stay-f11': 'leadership',

  // Marketing & Growth
  'brand-style-guide-skill': 'marketing',
  'branded-slide-decks-skill': 'marketing',
  'mission-aligned-ai-marketing-how': 'marketing',

  // Video & Image
  'the-30-second-music-video-assembler': 'video',
  'the-kids-drawing-transformer-skill': 'video',
  'visual-brand-builder-skill': 'video',
  'turning-your-writing-into-film-a-5c6': 'video',

  // Research & Analysis
  'audience-problem-miner-skill': 'research',

  // Productivity & Systems
  'fable-learning-skill': 'systems',
  'nova-weekly-reflection': 'systems',
  'claude-codes-guide-to-building-your': 'systems',
  'claude-codes-guide-to-building-your-36f': 'systems',

  // Coding & Building
  'build-your-own-mac-app-prompt-chain': 'coding',
};

// Posts carrying any of these tags are NOT skill drops — keep them out.
// Compared case-insensitively.
const EXCLUDE_TAGS = new Set<string>(
  ['Weekly Expert Workshops', 'Cozora AI Summit (March 27)', 'Q&A Library'].map((t) => t.toLowerCase()),
);

export const TIERS = ['Start Here', 'Apply AI', 'Go Deep'] as const;
export type Tier = (typeof TIERS)[number];

export interface TopicDef {
  key: string;
  label: string;
  tags: string[]; // Substack tag aliases (case-insensitive) that pin this topic
  keywords: string[]; // fallback: matched at the START of a word in title + subtitle
}

export const TOPICS: TopicDef[] = [
  {
    key: 'writing',
    label: 'Writing & Content',
    tags: ['Writing', 'Writing & Content', 'Content'],
    keywords: ['writ', 'content', 'newsletter', 'copy', 'carousel', 'essay', 'blog', 'ghostwrit', 'headline', 'editor', 'draft', 'voice'],
  },
  {
    key: 'video',
    label: 'Video & Image',
    tags: ['Video', 'Video & Image', 'Image', 'Design'],
    keywords: ['video', 'image', 'photo', 'storyboard', 'thumbnail', 'visual', 'design', 'film', 'cinema', 'midjourney', 'veo', 'drawing'],
  },
  {
    key: 'coding',
    label: 'Coding & Building',
    tags: ['Coding', 'Coding & Building', 'Build', 'Development'],
    keywords: ['code', 'coding', 'build', 'vibe', 'developer', 'api', 'deploy', 'script', 'automation', 'no-code', 'nocode'],
  },
  {
    key: 'marketing',
    label: 'Marketing & Growth',
    tags: ['Marketing', 'Marketing & Growth', 'Growth'],
    keywords: ['market', 'growth', 'ads', 'launch', 'funnel', 'sales', 'audience', 'seo', 'cold email', 'outreach', 'brand'],
  },
  {
    key: 'research',
    label: 'Research & Analysis',
    tags: ['Research', 'Research & Analysis', 'Analysis'],
    keywords: ['research', 'analy', 'data', 'report', 'synthes', 'insight', 'study', 'competitive'],
  },
  {
    key: 'systems',
    label: 'Productivity & Systems',
    tags: ['Systems', 'Productivity', 'Productivity & Systems'],
    keywords: ['system', 'productiv', 'workflow', 'organize', 'notion', 'task', 'mind dump', 'inbox', 'reflection'],
  },
  {
    key: 'leadership',
    label: 'Leadership & Strategy',
    tags: ['Leadership', 'Strategy', 'Leadership & Strategy'],
    keywords: ['lead', 'manage', 'strateg', 'team', '1:1', 'one-on-one', 'coach', 'decision', 'meeting', 'feedback'],
  },
];

export const GENERAL_TOPIC = { key: 'general', label: 'More Skills' } as const;

export type TopicSource = 'tag' | 'curated' | 'keyword' | 'none';

function startsWord(hay: string, kw: string): boolean {
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${escaped}`).test(hay);
}

function resolveTopic(
  tagNames: string[],
  slug: string,
  title: string,
  subtitle: string,
): { topic: string | null; source: TopicSource } {
  const lowerTags = tagNames.map((t) => t.toLowerCase());
  const explicit = TOPICS.find((topic) => topic.tags.some((tag) => lowerTags.includes(tag.toLowerCase())));
  if (explicit) return { topic: explicit.key, source: 'tag' };

  const curated = SKILL_TOPIC_OVERRIDES[slug];
  if (curated && TOPICS.some((t) => t.key === curated)) return { topic: curated, source: 'curated' };

  const hay = `${title} ${subtitle}`.toLowerCase();
  const inferred = TOPICS.find((topic) => topic.keywords.some((kw) => startsWord(hay, kw)));
  return inferred ? { topic: inferred.key, source: 'keyword' } : { topic: null, source: 'none' };
}

export interface SkillPost {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  url: string;
  coverImage: string | null;
  date: string; // ISO
  tier: Tier | null;
  topic: string | null; // TopicDef.key, or null → General bucket
  topicSource: TopicSource;
  creator: string | null; // Substack byline name(s)
  tags: string[]; // raw Substack tag names
  reactions: number;
}

interface RawTag {
  name?: string;
}

interface RawByline {
  name?: string;
}

interface RawPost {
  id: number;
  title?: string;
  subtitle?: string;
  slug?: string;
  canonical_url?: string;
  cover_image?: string | null;
  post_date?: string;
  audience?: string;
  postTags?: RawTag[] | null;
  publishedBylines?: RawByline[] | null;
  reactions?: Record<string, number> | null;
}

function firstTier(tagNames: string[]): Tier | null {
  return (TIERS.find((t) => tagNames.includes(t)) as Tier) ?? null;
}

function sumReactions(reactions: RawPost['reactions']): number {
  if (!reactions) return 0;
  return Object.values(reactions).reduce((a, b) => a + (b || 0), 0);
}

// Most guest posts are published under a shared byline: the Cozora founders plus the
// guest creator. The creator we show is the guest. Michael Simmons left COZORA
// (amendment v2.2), so he is never shown as a creator; the founders appear only on
// posts that have no guest.
const FOUNDER_NAMES = new Set(['Claudia Faith', 'Joel Salinas']);
const FORMER_FOUNDER_NAMES = new Set(['Michael Simmons']);

function creatorOf(bylines: RawPost['publishedBylines']): string | null {
  const names = (bylines ?? []).map((b) => (b.name ?? '').trim()).filter(Boolean);
  if (!names.length) return null;
  const guests = names.filter((n) => !FOUNDER_NAMES.has(n) && !FORMER_FOUNDER_NAMES.has(n));
  if (guests.length) return guests.join(' & ');
  const founders = names.filter((n) => !FORMER_FOUNDER_NAMES.has(n));
  return founders.length ? founders.join(' & ') : 'Cozora';
}

function titleKey(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Fetch the full published archive, paging until exhausted (cap 300 posts).
 * Revalidated every 30 min so newly published skills appear automatically.
 */
async function fetchArchive(): Promise<RawPost[]> {
  const limit = 50;
  const byId = new Map<number, RawPost>();
  // ⚠ Substack's archive endpoint can return a SHORT page that is not the last page
  // (verified 2026-10-19: offset 0 returns 23 posts, offset 23 returns 50 more). So a
  // short page must not end the loop and the offset must advance by what came back, not
  // by `limit`. Only an empty page, or the cap, ends it. De-dupe by id for safety.
  let offset = 0;
  while (offset < 300) {
    const res = await fetch(
      `${PUBLICATION}/api/v1/archive?sort=new&offset=${offset}&limit=${limit}`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0 (CozoraLibrary)' },
        next: { revalidate: 1800 },
      } as RequestInit,
    );
    if (!res.ok) break;
    const batch = (await res.json()) as RawPost[];
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const p of batch) byId.set(p.id, p);
    offset += batch.length;
  }
  return [...byId.values()];
}

/**
 * Skill drops only: paid posts that are not workshop/summit/Q&A recordings.
 * Re-posts with the same title are collapsed to the newest. Returns newest-first.
 */
export async function getSkillPosts(): Promise<SkillPost[]> {
  let raw: RawPost[];
  try {
    raw = await fetchArchive();
  } catch {
    return [];
  }

  const sorted = raw
    .filter((p) => p.audience === 'only_paid')
    .filter((p) => {
      const names = (p.postTags ?? []).map((t) => (t.name ?? '').toLowerCase());
      return !names.some((n) => EXCLUDE_TAGS.has(n));
    })
    .map((p): SkillPost => {
      const names = (p.postTags ?? []).map((t) => t.name ?? '').filter(Boolean);
      const slug = p.slug ?? '';
      const { topic, source } = resolveTopic(names, slug, p.title ?? '', p.subtitle ?? '');
      return {
        id: p.id,
        title: (p.title ?? 'Untitled').trim(),
        subtitle: p.subtitle ?? '',
        slug,
        url: p.canonical_url ?? `${PUBLICATION}/p/${slug}`,
        coverImage: p.cover_image ?? null,
        date: p.post_date ?? '',
        tier: firstTier(names),
        topic,
        topicSource: source,
        creator: creatorOf(p.publishedBylines),
        tags: names,
        reactions: sumReactions(p.reactions),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const seen = new Set<string>();
  return sorted.filter((p) => {
    const key = titleKey(p.title);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
