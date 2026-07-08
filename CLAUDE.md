# Cozora Web — cozora.org

## Purpose
Self-hosted landing page + bundle store for Cozora. Replaces Kajabi entirely. Subscriptions and live sessions live on Substack — this site handles the marketing landing page and the $99 one-time bundle purchase (all 4 skill sets).

## Stack
- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4 with custom @theme design tokens
- **Auth + DB:** Supabase (project: aflddhsycgieyomqtgyp, dedicated Cozora project)
- **Payments:** Stripe Checkout (one-time $99)
- **Video hosting:** Bunny.net Stream (TBD — videos currently on Google Drive)
- **Deploy:** Vercel (TBD)
- **Repo:** TBD (Jsfananan/cozora-web)

## Design System
Ported from the Kajabi redesign (`~/Documents/Claude/cozora-kajabi-redesign/`). Dark premium aesthetic.

| Token | Value | Usage |
|-------|-------|-------|
| `cz-bg` | `#0e1a1b` | Main background |
| `cz-bg-card` | `#132224` | Card backgrounds |
| `cz-accent` | `#C79219` | Gold CTAs, primary buttons |
| `cz-coral` | `#D63BA3` | Section labels, highlights |
| `cz-teal` | `#7ED3C0` | Accent, checkmarks, hover states |
| `cz-deep-teal` | `#1D5C5E` | Featured card bg, secondary buttons |
| `font-display` | Sora | Headings |
| `font-body` | Outfit | Body text |
| `font-mono` | IBM Plex Mono | Labels, tags |

## Architecture

### Pages
- `/` — Landing page (Hero, SkillSets, Pricing, Footer)
- `/bundles` — Bundle storefront (all 4 skill sets)
- `/bundles/[slug]` — Individual bundle detail (static, generateStaticParams)
- `/dashboard` — Buyer dashboard (video player + PDF downloads)
- `/auth/login` — Login page
- `/checkout/success` — Post-purchase confirmation + account creation
- `/skills-guide` — **Interactive "Install a Claude Skill" guide** (built 2026-07-07; published at cozora.org/skills-guide 2026-07-08). Compass-style wizard: pick **surface** (web/desktop) → pick **delivery** (downloadable .zip vs prompt-to-paste) → verified steps, each with an animated faux-UI scene + optional real screenshot + check-to-advance → "Thank you for being part of Cozora" finale. Client-side state, progress persisted to localStorage. No auth (linked from Substack for members).

### Install Guide (`/skills-guide`)
- **Files:** `src/app/install/page.tsx` (route + metadata), `src/components/install/InstallGuide.tsx` (state machine: surface + delivery pickers, progress, screenshot reveal, finale), `src/components/install/SkillScene.tsx` (phase-driven animated mock-UI scenes), `src/lib/installSteps.ts` (step content + `buildSteps(surface, delivery)`). Scene keyframes live in `globals.css` under "INSTALL GUIDE — SCENE ANIMATIONS".
- **Two tracks (delivery fork):** `file` = download .zip → enable code execution → Customize → Skills → Upload a skill → use. `prompt` = copy prompt → enable code execution → paste into Cowork (desktop) / Claude chat (web) → answer its questions → **Save skill** → use. Most Cozora skills are `prompt`.
- **⚠ VERIFIED CONTENT:** every menu path/button label in `installSteps.ts` ("Customize → Skills", "Code execution and file creation", "+ Create skill", "Upload a skill", `.zip` < 50 MB, "Save skill", Cowork = desktop chat name) is verified against Anthropic's Help Center (support.claude.com, Nov 2026) AND Joel's own screenshots + "Leading with Claude" drafts (`~/Documents/Claude/leading-with-claude/screenshots/ss-red-pen-*.png`, `ss-list-of-my-skills.png`). Do NOT change labels without re-checking. Web & desktop flows are identical per Anthropic; only chrome + entry-point/Cowork wording differ.
- **Real screenshots:** each step optionally reveals a real screenshot from `public/install-shots/` (filenames + shot list in `public/install-shots/SHOTLIST.md`). A step with a missing file just falls back to the animation (img onError hides the reveal). Already wired-in from the ebook: `use-skill.png`, `prompt-3-paste.png`, `prompt-5-save.png`. **Do NOT publish `ss-list-of-my-skills.png` as-is** — it exposes Joel's private skill names (wr-*, caio-*, client skills); needs a clean reshoot for `file-3-skills.png`.

### API Routes
- `POST /api/checkout` — Creates Stripe Checkout Session
- `POST /api/webhooks/stripe` — Stripe webhook handler (checkout.session.completed)

### Key Files
- `src/lib/bundles.ts` — Bundle data (4 bundles, 16 sessions)
- `src/lib/stripe.ts` — Stripe client (nullable when key not set)
- `src/lib/supabase/schema.sql` — Database schema (run in Supabase SQL Editor)
- `src/lib/supabase/middleware.ts` — Purchase verification helpers

## Bundle Model
- $99 one-time payment unlocks ALL 4 bundles
- 4 bundles: Create, Build, Think, Lead
- Each bundle has 4-5 sessions (~60 min video + PDF)
- Purchase recorded by email — linked to profile when user signs up

## Environment Variables
| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Set |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Set |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | For webhook — get from Supabase dashboard |
| `STRIPE_SECRET_KEY` | Yes | From Stripe dashboard |
| `STRIPE_WEBHOOK_SECRET` | Yes | From Stripe webhook endpoint |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | For client-side Stripe |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://cozora.org` |
| `BUNNY_API_KEY` | Later | For video hosting |
| `BUNNY_LIBRARY_ID` | Later | For video hosting |

## Current State
- **Build:** PASSING
- **Phase:** Scaffold complete, needs Stripe + Supabase secrets to go live
- **Created:** 2026-03-10

## Next Steps
1. Run schema.sql in Supabase SQL Editor
2. Add Stripe keys to .env.local
3. Set up Stripe webhook endpoint
4. Upload videos to Bunny.net, update bundle data with video IDs
5. Upload PDFs to Supabase Storage
6. Create GitHub repo + deploy to Vercel
7. Point cozora.org DNS to Vercel
