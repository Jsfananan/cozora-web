// Tag audit for the Cozora Library.
//   npm run audit:tags
//
// Reads the live Substack archive through the same code the site uses, then prints what
// still needs fixing in Substack so the library can stop relying on guesses.
// Exit code is always 0: it's a worklist, not a gate.

import { getSkillPosts, TIERS, TOPICS } from '../src/lib/substack.ts';

const posts = await getSkillPosts();
const KNOWN_TAGS = new Set([
  ...TIERS,
  ...TOPICS.flatMap((t) => t.tags),
  'Weekly Expert Workshops',
  'Cozora AI Summit (March 27)',
  'Q&A Library',
].map((t) => t.toLowerCase()));

const line = (p) => `  ${p.date.slice(0, 10)}  ${p.slug}\n             ${p.title}${p.creator ? `  [${p.creator}]` : ''}`;
const section = (title, list, hint) => {
  console.log(`\n${title} (${list.length})${hint ? `\n  → ${hint}` : ''}`);
  for (const p of list) console.log(line(p));
};

console.log(`Cozora library audit: ${posts.length} skills (after exclusions and de-duplication)`);

section('MISSING DEPTH TAG', posts.filter((p) => !p.tier), `add one of: ${TIERS.join(' / ')}`);
section('TOPIC FROM A CURATED OVERRIDE (no Substack topic tag)', posts.filter((p) => p.topicSource === 'curated'),
  'tag in Substack, then delete the slug from SKILL_TOPIC_OVERRIDES');
section('TOPIC GUESSED FROM KEYWORDS (verify or tag)', posts.filter((p) => p.topicSource === 'keyword'),
  'tag in Substack so it stops depending on a keyword guess');
section('NO TOPIC AT ALL (lands in "More Skills")', posts.filter((p) => p.topicSource === 'none'), 'tag with a topic');
section('NO CREATOR BYLINE', posts.filter((p) => !p.creator), 'set the byline on the Substack post');

const unknown = new Map();
for (const p of posts) for (const t of p.tags) if (!KNOWN_TAGS.has(t.toLowerCase())) unknown.set(t, (unknown.get(t) ?? 0) + 1);
console.log(`\nUNRECOGNISED TAGS (${unknown.size})\n  → typo, or a new tag that needs adding to the taxonomy`);
for (const [t, n] of unknown) console.log(`  "${t}" on ${n} post${n === 1 ? '' : 's'}`);

const byCreator = new Map();
for (const p of posts) byCreator.set(p.creator ?? '(none)', (byCreator.get(p.creator ?? '(none)') ?? 0) + 1);
console.log('\nSKILLS PER CREATOR');
for (const [c, n] of [...byCreator].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(3)}  ${c}`);
