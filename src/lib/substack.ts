// Cozora Premium Library — pulls skill posts live from the Substack archive API.
//
// Scope decision (2026-07-13): the Library shows standalone *skill drops* only.
// Weekly Expert Workshop recordings and AI Summit sessions are excluded via
// EXCLUDE_TAGS. Everything else that is a paid post is treated as a skill.
//
// Tier tabs use the three post tags below. Most skill posts are currently
// untagged and simply appear under "All" until Joel tags them in Substack;
// the exact tag strings must match (case-sensitive) to slot into a tier.

const PUBLICATION = 'https://cozora.substack.com';

// Posts carrying any of these tags are NOT skill drops — keep them out.
const EXCLUDE_TAGS = new Set<string>([
  'Weekly Expert Workshops',
  'Cozora AI Summit (March 27)',
]);

export const TIERS = ['Start Here', 'Apply AI', 'Go Deep'] as const;
export type Tier = (typeof TIERS)[number];

export interface SkillPost {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  url: string;
  coverImage: string | null;
  date: string; // ISO
  tier: Tier | null;
  reactions: number;
}

interface RawTag {
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
  reactions?: Record<string, number> | null;
}

function firstTier(tagNames: string[]): Tier | null {
  return (TIERS.find((t) => tagNames.includes(t)) as Tier) ?? null;
}

function sumReactions(reactions: RawPost['reactions']): number {
  if (!reactions) return 0;
  return Object.values(reactions).reduce((a, b) => a + (b || 0), 0);
}

/**
 * Fetch the full published archive, paging until exhausted (cap 300 posts).
 * Revalidated every 30 min so newly published skills appear automatically.
 */
async function fetchArchive(): Promise<RawPost[]> {
  const limit = 50;
  const all: RawPost[] = [];
  for (let offset = 0; offset < 300; offset += limit) {
    const res = await fetch(
      `${PUBLICATION}/api/v1/archive?sort=new&offset=${offset}&limit=${limit}`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0 (CozoraLibrary)' },
        next: { revalidate: 1800 },
      },
    );
    if (!res.ok) break;
    const batch = (await res.json()) as RawPost[];
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < limit) break;
  }
  return all;
}

/**
 * Skill drops only: paid posts that are not workshop/summit recordings.
 * Returns newest-first.
 */
export async function getSkillPosts(): Promise<SkillPost[]> {
  let raw: RawPost[];
  try {
    raw = await fetchArchive();
  } catch {
    return [];
  }

  return raw
    .filter((p) => p.audience === 'only_paid')
    .filter((p) => {
      const names = (p.postTags ?? []).map((t) => t.name ?? '');
      return !names.some((n) => EXCLUDE_TAGS.has(n));
    })
    .map((p): SkillPost => {
      const names = (p.postTags ?? []).map((t) => t.name ?? '');
      return {
        id: p.id,
        title: p.title ?? 'Untitled',
        subtitle: p.subtitle ?? '',
        slug: p.slug ?? '',
        url: p.canonical_url ?? `${PUBLICATION}/p/${p.slug ?? ''}`,
        coverImage: p.cover_image ?? null,
        date: p.post_date ?? '',
        tier: firstTier(names),
        reactions: sumReactions(p.reactions),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
