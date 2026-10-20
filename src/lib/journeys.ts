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
export type JourneyIcon = 'sparkles' | 'pen' | 'chat' | 'play' | 'swatch';

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
};

export const DRAFT_OUTCOMES: Record<string, string> = {
  'ai-failure-mode-resilience-simulation': 'Run a simulation of an AI failure and see how your team would respond.',
};

export const JOURNEYS: JourneyDef[] = [
  {
    id: 'substack-creators',
    title: 'Write, Grow and Run Your Substack',
    intent: 'Grow my Substack',
    icon: 'pen',
    tagline: 'Find what your readers want, write in your voice, fill your Notes, then repurpose each post into video.',
    audience: 'Substack writers and creators',
    topic: 'writing',
    status: 'live',
    steps: [
      'audience-problem-miner-skill',
      'voice-profile-builder-skill',
      'draft-enhancement-pass',
      'the-21-angle-notes-skill',
      '21-substack-notes-agent',
      'voice-anchored-social-repurposer',
      'video-script-writer-skill',
      'cozora-skills-youtube-content-repurposing',
    ],
  },
  {
    id: 'get-started',
    title: 'Get Started',
    intent: 'Get started with skills',
    icon: 'sparkles',
    tagline: 'Install your first skill, then try four beginner-friendly ones.',
    audience: 'anyone new to Claude skills',
    topic: 'systems',
    status: 'live',
    steps: [
      { id: 'install-a-skill', title: 'Install a Claude Skill', url: '/skills-guide', creator: 'Cozora', tier: 'Start Here' },
      'mind-dump-digest-skill',
      'cozora-skills-the-anti-sycophancy',
      'the-21-angle-notes-skill',
      'audience-problem-miner-skill',
    ],
  },
  {
    id: 'voice-everywhere',
    title: 'Find Your Voice, Then Use It Everywhere',
    intent: 'Write in my voice',
    icon: 'pen',
    tagline: 'Build a voice profile, tighten your drafts, then turn one piece into social posts and Notes.',
    audience: 'writers and creators',
    topic: 'writing',
    status: 'live',
    steps: [
      'voice-profile-builder-skill',
      'draft-enhancement-pass',
      'ending-strength-editor',
      'first-person-pronoun-audit-skill',
      'voice-anchored-social-repurposer',
      'the-21-angle-notes-skill',
    ],
  },
  {
    id: 'hard-moments',
    title: 'Lead Through the Hard Moments',
    intent: 'Lead through hard moments',
    icon: 'chat',
    tagline: 'Rehearse the feedback, restructure the message, reframe what went wrong, and build a weekly reflection habit.',
    audience: 'leaders and managers',
    topic: 'leadership',
    status: 'live',
    steps: [
      'difficult-feedback-opener-rehearsal',
      'focus-message-restructurer-skill',
      'ai-failure-mode-resilience-simulation',
      'failure-reframing-rewriter-skill',
      'nova-weekly-reflection',
    ],
  },
  {
    id: 'ideas-to-video',
    title: 'Turn Ideas Into Video and Visuals',
    intent: 'Make video and visuals',
    icon: 'play',
    tagline: 'Write the script, turn writing into film, assemble a short music video, then repurpose it for YouTube and LinkedIn.',
    audience: 'creators and content teams',
    topic: 'video',
    status: 'live',
    steps: [
      'video-script-writer-skill',
      'turning-your-writing-into-film-a-5c6',
      'the-30-second-music-video-assembler',
      'cozora-skills-youtube-content-repurposing',
      'the-linkedin-carousel-kit',
    ],
  },
  {
    id: 'brand-system',
    title: 'Build Your Brand System',
    intent: 'Build my brand',
    icon: 'swatch',
    tagline: 'Mine your audience for their problems, then build a style guide, a visual brand and on-brand LinkedIn carousels.',
    audience: 'founders and solo operators',
    topic: 'marketing',
    status: 'live',
    steps: [
      'audience-problem-miner-skill',
      'brand-style-guide-skill',
      'visual-brand-builder-skill',
      'the-linkedin-carousel-kit',
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
