// Cozora Learning Journeys — ordered paths through library skills.
//
// A journey is a short sequence of existing skill posts, in the order a member should
// work through them. Steps are referenced by Substack slug, so the title and creator
// byline always come from the skill's own post and can't drift from it. A step can also
// be a plain link (the install guide, for example).
//
// STATUS GATE: a journey with status 'draft' renders only in `next dev`. It never
// ships to production until someone flips it to 'live' here.
//
// ⚠ Slugs must match Substack exactly. A slug that no longer resolves is dropped at
// render time; a journey left with fewer than MIN_STEPS steps is hidden.

import type { SkillPost } from './substack';

export type JourneyStatus = 'draft' | 'live';
export type JourneyIcon = 'sparkles' | 'pen' | 'chat' | 'play' | 'swatch' | 'bulb' | 'code';

export type JourneyStepDef =
  | string // Substack slug
  | { id: string; title: string; url: string; creator?: string; tier?: SkillPost['tier'] };

export interface JourneyDef {
  id: string;
  title: string;
  intent: string; // short "I want to..." label for the picker
  icon: JourneyIcon;
  tagline: string; // one line: what you can do after finishing
  audience: string; // who it's for, lower-case start (reads after "For")
  topic: string; // TopicDef.key
  status: JourneyStatus;
  steps: JourneyStepDef[]; // in order
}

export interface JourneyStep {
  slug: string;
  title: string;
  outcome: string | null; // one plain line: what this step gives you
  creator: string | null;
  tier: SkillPost['tier'];
  url: string;
}

export interface ResolvedJourney {
  id: string;
  title: string;
  intent: string;
  icon: JourneyIcon;
  tagline: string;
  audience: string;
  topic: string;
  creatorCount: number;
  draft: boolean;
  steps: JourneyStep[];
}

const MIN_STEPS = 3;

// One line per step: what the step gives you. Keyed by slug (or a link step's id).
// Most Substack subtitles on skill posts are bylines, so these lines are written here.
//
// VERIFIED_OUTCOMES: based on the post's public description or preview text (checked
// 2026-10-19). These ship.
// DRAFT_OUTCOMES: written from the skill's TITLE ONLY. They describe a creator's work
// without anyone having checked it, so they render in `next dev` only and never in
// production. To ship one, confirm it against the skill, then move it up.
export const VERIFIED_OUTCOMES: Record<string, string> = {
  'install-a-skill': 'Add your first skill to Claude, step by step, on web or desktop.',
  'mind-dump-digest-skill': 'Reads your idea backlog every 48 hours and hands you a filtered, actionable digest.',
  'the-21-angle-notes-skill': 'Turn one idea into 21 ready-to-publish Substack Notes in under 5 minutes.',
  'brand-style-guide-skill': 'A 20-minute brand discovery session that turns your answers into a style guide.',
  'failure-reframing-rewriter-skill': 'Reframe a disappointing result without changing the facts.',
  'focus-message-restructurer-skill': 'Restructure what you say on a bad day, when how you communicate matters most.',
  'nova-weekly-reflection': 'A guided weekly reflection that connects the dots from your week.',
  'the-linkedin-carousel-kit': 'Turn a newsletter issue into a LinkedIn carousel without starting from scratch each time.',
  'turning-your-writing-into-film-a-5c6': "Turn an article you've already written into a short film.",
  'video-script-writer-skill': 'Write short video scripts so you can show up on camera as yourself.',
  'visual-brand-builder-skill': "Keep header images and visuals consistent with each brand's style.",
  'branded-slide-decks-skill': "Build slide decks that match each brand's look and voice.",

  // Confirmed by Joel 2026-10-19 (were title-only drafts)
  'cozora-skills-the-anti-sycophancy': 'Get Claude to push back instead of just agreeing with you.',
  'audience-problem-miner-skill': 'Dig up the real problems your audience is trying to solve.',
  'voice-profile-builder-skill': 'Build a profile of how you write, so AI drafts sound like you.',
  'draft-enhancement-pass': 'Run a polish pass over a draft before you publish it.',
  'ending-strength-editor': 'Strengthen how each piece ends.',
  'first-person-pronoun-audit-skill': 'Check how much your writing leans on I, me and my.',
  'voice-anchored-social-repurposer': 'Turn one piece into social posts that still sound like you.',
  'difficult-feedback-opener-rehearsal': 'Rehearse how you open a hard feedback conversation.',
  'the-30-second-music-video-assembler': 'Assemble a 30-second music video.',
  'cozora-skills-youtube-content-repurposing': 'Turn a YouTube video into content for your other channels.',

  // Added 2026-10-20 with the Substack journey draft. Written from the post's public preview.
  '21-substack-notes-agent': 'Pull your Notes performance data first, then write 21 Notes in your voice weighted toward what converted.',

  // Added 2026-10-29 for the brand refresh journeys. Each line is from the post's public preview.
  'fable-learning-skill': 'Ask Claude for a fable instead of a summary, so a hard idea sticks.',
  'the-red-pen-review-skill': "An outside editor that reads your draft fresh and doesn't soften the feedback.",
  'trust-deposit-tracker-post': 'Track the small deposits of trust you make with colleagues, so credibility is there when you need it.',
  'feedforward-avoidance-checker': 'Check your planned feedback for avoidance before you deliver it.',
  'ai-failure-mode-resilience-simulation': 'Simulate AI failure scenarios before launch and turn each one you can\'t answer into a fix.',
  'the-universal-vibe-coding-blueprint': 'Have Claude map the data, permissions and product logic before it writes any code.',
  'build-your-own-mac-app-prompt-chain': 'Build a Mac app from a spec with a chain of nine prompts, no coding on your part.',
  'article-to-podcast-post': 'Turn an article into a natural multi-voice podcast script, with steps to publish it.',
  'brand-photo-shoot-stock-image-replacer': 'Generate a set of photorealistic brand images from a brief instead of using stock photos.',
};

export const DRAFT_OUTCOMES: Record<string, string> = {};

// Order here is the order in the picker. Journey ids are kept stable across edits so
// members' saved progress (localStorage, keyed by id + slug) survives a change.
// Brand refresh 2026-10-29: the seven journeys from the "Proposed journeys" board.
// Recordings (tagged Weekly Expert Workshops / Q&A Library) are not library skills, so the
// board's "Session:" steps are left out. A journey with fewer than MIN_STEPS steps hides
// itself, which is why "Build With AI" stays hidden until it has a third skill.
export const JOURNEYS: JourneyDef[] = [
  {
    id: 'substack-creators',
    title: 'Grow Your Substack',
    intent: 'Grow my Substack',
    icon: 'pen',
    tagline: 'Ideas, then Notes, then repurposing. Turn one idea into Notes, see what your readers want, and give each post a second life.',
    audience: 'Substack writers and creators',
    topic: 'writing',
    status: 'live',
    steps: [
      'the-21-angle-notes-skill',
      'audience-problem-miner-skill',
      '21-substack-notes-agent',
      'voice-anchored-social-repurposer',
      'the-linkedin-carousel-kit',
      'article-to-podcast-post',
    ],
  },
  {
    id: 'get-started',
    title: 'Start With AI Skills',
    intent: "I'm new to AI",
    icon: 'sparkles',
    tagline: 'Install your first skill, then try two that make Claude more useful from day one.',
    audience: 'anyone new to Claude skills',
    topic: 'systems',
    status: 'live',
    steps: [
      { id: 'install-a-skill', title: 'Install a Claude Skill', url: '/skills-guide', creator: 'Cozora', tier: 'Start Here' },
      'cozora-skills-the-anti-sycophancy',
      'fable-learning-skill',
    ],
  },
  {
    id: 'voice-everywhere',
    title: 'Write Better With AI',
    intent: 'Write better',
    icon: 'swatch',
    tagline: 'Build a voice profile, then edit, tighten and finish your drafts so they still sound like you.',
    audience: 'writers and creators',
    topic: 'writing',
    status: 'live',
    steps: [
      'voice-profile-builder-skill',
      'the-red-pen-review-skill',
      'draft-enhancement-pass',
      'ending-strength-editor',
      'first-person-pronoun-audit-skill',
    ],
  },
  {
    id: 'think-learn',
    title: 'Think and Learn With AI',
    intent: 'Think and learn',
    icon: 'bulb',
    tagline: 'Learn in stories, get pushback instead of agreement, and build a habit of reviewing your own ideas.',
    audience: 'anyone who wants to think more clearly with AI',
    topic: 'systems',
    status: 'live',
    steps: [
      'fable-learning-skill',
      'cozora-skills-the-anti-sycophancy',
      'mind-dump-digest-skill',
      'nova-weekly-reflection',
    ],
  },
  {
    id: 'hard-moments',
    title: 'Lead Your Team With AI',
    intent: 'Lead my team',
    icon: 'chat',
    tagline: 'Rehearse the feedback, restructure the message, build trust, and test how your team handles an AI failure.',
    audience: 'leaders and managers',
    topic: 'leadership',
    status: 'live',
    steps: [
      'difficult-feedback-opener-rehearsal',
      'focus-message-restructurer-skill',
      'failure-reframing-rewriter-skill',
      'feedforward-avoidance-checker',
      'trust-deposit-tracker-post',
      'ai-failure-mode-resilience-simulation',
    ],
  },
  {
    id: 'ideas-to-video',
    title: 'Create Visuals and Video',
    intent: 'Make visuals and video',
    icon: 'play',
    tagline: 'Set your brand, make images and slides that match it, then write the script and turn your writing into film.',
    audience: 'creators and content teams',
    topic: 'video',
    status: 'live',
    steps: [
      'brand-photo-shoot-stock-image-replacer',
      'brand-style-guide-skill',
      'visual-brand-builder-skill',
      'branded-slide-decks-skill',
      'video-script-writer-skill',
      'turning-your-writing-into-film-a-5c6',
    ],
  },
  {
    id: 'build-with-ai',
    title: 'Build With AI',
    intent: 'Build with AI',
    icon: 'code',
    tagline: 'Plan before you build, then go from a spec to a working app without writing code yourself.',
    audience: 'people who want to build with AI, no code needed to start',
    topic: 'coding',
    status: 'live',
    steps: [
      'the-universal-vibe-coding-blueprint',
      'build-your-own-mac-app-prompt-chain',
    ],
  },
];

/** Journeys visible in this environment, with each step resolved against live posts. */
export function resolveJourneys(posts: SkillPost[], showDrafts = process.env.NODE_ENV !== 'production'): ResolvedJourney[] {
  const outcomeFor = (id: string) => VERIFIED_OUTCOMES[id] ?? (showDrafts ? DRAFT_OUTCOMES[id] : undefined) ?? null;
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const out: ResolvedJourney[] = [];

  for (const j of JOURNEYS) {
    if (j.status !== 'live' && !showDrafts) continue;

    const steps: JourneyStep[] = [];
    for (const def of j.steps) {
      if (typeof def !== 'string') {
        steps.push({
          slug: def.id,
          title: def.title,
          outcome: outcomeFor(def.id),
          creator: def.creator ?? null,
          tier: def.tier ?? null,
          url: def.url,
        });
        continue;
      }
      const p = bySlug.get(def);
      if (!p) continue;
      steps.push({ slug: def, title: p.title, outcome: outcomeFor(def), creator: p.creator, tier: p.tier, url: p.url });
    }
    if (steps.length < MIN_STEPS) continue;

    const creators = new Set(steps.map((s) => s.creator).filter((c): c is string => !!c && c !== 'Cozora'));
    out.push({
      id: j.id,
      title: j.title,
      intent: j.intent,
      icon: j.icon,
      tagline: j.tagline,
      audience: j.audience,
      topic: j.topic,
      creatorCount: creators.size,
      draft: j.status !== 'live',
      steps,
    });
  }
  return out;
}
