# Cozora Web — cozora.org

## Purpose
Self-hosted landing page for Cozora. Replaces Kajabi entirely. Subscriptions, the weekly Skill Library, and live sessions all live on Substack — this site is the marketing landing page, the public Skill Library index, the install guide, and the access portal for past Skill Sets buyers.

## ⚠ The $99 Skill Sets bundle store is RETIRED (2026-08-07)
Joel pulled the bundles from sale. **Do not rebuild any of it.**
- **Gone:** `/bundles`, `/bundles/[slug]`, `/ai-bundles`, `/checkout`, `/checkout/success`, `src/components/BuyButton.tsx`, `POST /api/checkout`. All 301-redirect to `/` (`/checkout/success` → `/access`) via `redirects()` in `next.config.ts`.
- **Still works — existing buyers keep access forever:** `/access` (email lookup), `/access/[token]`, `/auth/login`, `/dashboard` (purchased state), `/api/recover-access`, `/api/verify-purchase`, `/api/content/*`, `/admin/*`.
- **Stripe:** `/api/webhooks/stripe` is intentionally left in place to honor any in-flight or manually-created session. Nothing on the site can start a new checkout. Archive the Stripe product separately if you want the paper trail closed.
- `src/lib/bundles.ts` survives only as `getBundleStats()` + admin form types.

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
- `/` — Landing page (Hero, SkillSets, Pricing, Creators, About, Faq, Footer). Single offer: the $39/mo Substack membership.
- `/library` — Public Premium Library (topic index + fast search)
- `/dashboard` — Buyer dashboard (video player + PDF downloads) for past Skill Sets buyers
- `/access` — Recover access by purchase email
- `/auth/login` — Login page
- `/creator-guide` — Onboarding guide for the 40+ community creators
- `/skills-guide` — **Interactive "Install a Claude Skill" guide** (built 2026-07-07; published at cozora.org/skills-guide 2026-07-08). Compass-style wizard: pick **surface** (web/desktop) → pick **delivery** (downloadable .zip vs prompt-to-paste) → verified steps, each with an animated faux-UI scene + optional real screenshot + check-to-advance → "Thank you for being part of Cozora" finale. Client-side state, progress persisted to localStorage. No auth (linked from Substack for members).

### Install Guide (`/skills-guide`)
- **Files:** `src/app/install/page.tsx` (route + metadata), `src/components/install/InstallGuide.tsx` (state machine: surface + delivery pickers, progress, screenshot reveal, finale), `src/components/install/SkillScene.tsx` (phase-driven animated mock-UI scenes), `src/lib/installSteps.ts` (step content + `buildSteps(surface, delivery)`). Scene keyframes live in `globals.css` under "INSTALL GUIDE — SCENE ANIMATIONS".
- **Two tracks (delivery fork):** `file` = download .zip → enable code execution → Customize → Skills → Upload a skill → use. `prompt` = copy prompt → enable code execution → paste into Cowork (desktop) / Claude chat (web) → answer its questions → **Save skill** → use. Most Cozora skills are `prompt`.
- **⚠ VERIFIED CONTENT:** every menu path/button label in `installSteps.ts` ("Customize → Skills", "Code execution and file creation", "+ Create skill", "Upload a skill", `.zip` < 50 MB, "Save skill", Cowork = desktop chat name) is verified against Anthropic's Help Center (support.claude.com, Nov 2026) AND Joel's own screenshots + "Leading with Claude" drafts (`~/Documents/Claude/leading-with-claude/screenshots/ss-red-pen-*.png`, `ss-list-of-my-skills.png`). Do NOT change labels without re-checking. Web & desktop flows are identical per Anthropic; only chrome + entry-point/Cowork wording differ.
- **Real screenshots:** each step optionally reveals a real screenshot from `public/install-shots/` (filenames + shot list in `public/install-shots/SHOTLIST.md`). A step with a missing file just falls back to the animation (img onError hides the reveal). Already wired-in from the ebook: `use-skill.png`, `prompt-3-paste.png`, `prompt-5-save.png`. **Do NOT publish `ss-list-of-my-skills.png` as-is** — it exposes Joel's private skill names (wr-*, caio-*, client skills); needs a clean reshoot for `file-3-skills.png`.

### API Routes
- `POST /api/webhooks/stripe` — Stripe webhook handler (checkout.session.completed). Legacy — retained to honor in-flight sessions; nothing on the site creates new ones.
- `POST /api/recover-access` — Look up a past purchase by email, issue an access token
- `POST /api/access/verify` / `POST /api/verify-purchase` — Access checks
- `GET /api/content/video`, `/api/content/pdf`, `/api/content/pdf/download` — Gated content delivery

### Key Files
- `src/lib/bundles.ts` — Bundle data (4 bundles, 16 sessions)
- `src/lib/stripe.ts` — Stripe client (nullable when key not set)
- `src/lib/supabase/schema.sql` — Database schema (run in Supabase SQL Editor)
- `src/lib/supabase/middleware.ts` — Purchase verification helpers

## Offer Model (current)
- **Only offer: the Cozora membership on Substack — $39/month or $359/year (save $109).** Free tier follows along; creator interviews are free to all.
- Prices are stated in `src/components/Hero.tsx`, `src/components/Pricing.tsx`, `src/components/Faq.tsx`, and `src/app/creator-guide/page.tsx`. Change all four together.
- **Legacy (closed):** $99 one-time unlocked all 4 bundles (Create, Build, Think, Lead — 15 sessions). Purchases were recorded by email and linked to a profile at signup. Those records still power `/access` and `/dashboard`.

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
