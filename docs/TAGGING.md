# Cozora Library tagging

The library reads everything from Substack posts. Tags are the only metadata, so the rules
below are what keep the filters honest. Run `npm run audit:tags` to see what's out of line.

## Every skill gets exactly two tags

| Axis | Tag one of | Notes |
|------|-----------|-------|
| **Depth** | `Start Here` · `Apply AI` · `Go Deep` | Exact text, case-sensitive. Powers the depth tabs. |
| **Topic** | `Writing & Content` · `Video & Image` · `Coding & Building` · `Marketing & Growth` · `Research & Analysis` · `Productivity & Systems` · `Leadership & Strategy` | Shorter aliases also work (see `TOPICS` in `src/lib/substack.ts`). |

**Creator** is not a tag. It comes from the post's byline, so set the byline to the creator.
The library shows it as "by <name>".

## Never tag a skill with these (they keep a post out of the library)

`Weekly Expert Workshops` · `Cozora AI Summit (March 27)` · `Q&A Library`

## How a topic is decided

1. A topic tag on the post wins.
2. Otherwise a curated override in `SKILL_TOPIC_OVERRIDES` (keyed by slug) applies.
3. Otherwise a keyword guess over the title and subtitle, matched at the start of a word.
4. Otherwise the skill lands in "More Skills".

Steps 2 and 3 are stopgaps. Tag the post, then delete its override line.

## De-duplication

Posts with the same title collapse to the newest. Re-publishing a skill under a new slug
won't create a second card.

## Learning journeys

Journeys are ordered paths through existing skills, defined in `src/lib/journeys.ts` by
slug. They use no tags. A journey is `draft` (visible in `next dev` only) until someone
sets it to `live`.
