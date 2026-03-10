# Cozora Bundle Store Build

## Pages Created

### 1. `/bundles` — Bundle Storefront
**File:** `src/app/bundles/page.tsx`

Displays all 4 skill sets in a 2x2 grid. Features:
- "The Skill Sets" section label in coral monospace
- "Master AI in 4 Practical Skill Sets" title
- Brief subtitle explaining the offer
- Card grid showing each bundle with:
  - Skill label (Create/Build/Think/Lead) with colored badge
  - Bundle name and tagline
  - Full description
  - Session count
  - Link to bundle detail page
- CTA: "Get All 4 Skill Sets — $99" (links to `/checkout`)
- "One payment. Lifetime access." tagline

### 2. `/bundles/[slug]` — Individual Bundle Detail
**File:** `src/app/bundles/[slug]/page.tsx`

Dynamic page for each bundle (uses `generateStaticParams` for static generation). Features:
- Back link to `/bundles`
- Skill label badge
- Bundle name as H1
- Full bundle description
- Session list showing:
  - Numbered session cards (1-4)
  - Session creator, date, title, description
  - Duration (if available)
- CTA: "Get All 4 Skill Sets — $99" (explains this bundle is part of the collection)
- "One payment. Lifetime access to all 16 sessions." note
- Metadata generation for SEO (title, description per bundle)

### 3. `/dashboard` — Buyer Dashboard
**File:** `src/app/dashboard/page.tsx`

Post-purchase access hub. Features:
- Redirect message for non-logged-in users (links to `/auth/login` and `/bundles`)
- 4 bundle cards in grid layout (clickable to expand/collapse)
- Each collapsed card shows:
  - Skill badge
  - Bundle name
  - Session count
  - Progress bar (placeholder: 25% filled)
- When expanded, shows session list with:
  - Video player placeholder (dark box with play icon + "Video available after purchase")
  - Session title, creator, date
  - PDF download button per bundle
- Client component with React state for toggle behavior

### 4. `/auth/login` — Login Page
**File:** `src/app/auth/login/page.tsx`

Simple authentication page. Features:
- "Welcome back" heading
- Email input field
- Password input field
- "Sign in" button (gold accent color, full width)
- Link to `/bundles` for new buyers: "Don't have an account yet? Purchase the Skill Sets to get started."
- Dark themed card centered on page
- Client component with form state handling

### 5. `/checkout/success` — Post-Purchase Success Page
**File:** `src/app/checkout/success/page.tsx`

Confirmation and account creation flow. Features:
- Checkmark icon in circular badge
- "You're in!" heading
- "All 4 Skill Sets are now unlocked." subheading
- Optional account creation form:
  - Email input
  - Password input
  - "Create account" button
  - "Skip for now" button
- Primary CTA: "Go to Your Dashboard" (links to `/dashboard`)
- Supports showing/hiding account form
- Client component with form state

## Design System Integration

All pages use the Cozora design tokens from `src/app/globals.css`:
- **Backgrounds:** `cz-bg` (#0e1a1b), `cz-bg-card` (#132224), `cz-bg-card-hover` (#1a2e30)
- **Text:** `cz-text` (#EDF2F0), `cz-text-muted` (#AEC4D6), `cz-text-dim` (#555)
- **Accents:** `cz-accent` (#C79219, gold), `cz-coral` (#D63BA3), `cz-teal` (#7ED3C0), `cz-deep-teal` (#1D5C5E)
- **Fonts:** Sora (display), Outfit (body), IBM Plex Mono (mono)

All pages:
- Include Navbar component
- Use consistent card styling (dark bg, teal borders)
- Support mobile-first responsive design
- Use Tailwind 4 utilities exclusively (no custom CSS)

## Data Structure

Bundle data is pulled from `src/lib/bundles.ts`:
```typescript
interface Session {
  number: number;
  creator: string;
  date: string;
  title: string;
  description: string;
  videoId?: string; // Future: Bunny.net video ID
  duration?: string;
}

interface Bundle {
  slug: string;
  skillNum: string; // "Create", "Build", "Think", "Lead"
  name: string;
  tagline: string;
  description: string;
  sessions: Session[];
  pdfUrl?: string; // Future: Supabase Storage path
}
```

## Authentication & Payment Notes

All auth and payment flows have TODO placeholders and are ready for wiring:

### `/auth/login`
- Form state ready
- Needs: Supabase authentication integration

### `/checkout/success`
- Account creation form ready
- Needs: Supabase account creation + purchase record linking

### `/dashboard`
- Currently shows static unpurchased state (non-logged-in redirect)
- Needs: Auth check + fetch user's purchased bundles from Supabase

### Checkout Flow
- `/bundles/page.tsx` and `/bundles/[slug]/page.tsx` both link to `/checkout`
- Needs: Create `/checkout` page (Stripe checkout form or redirect to Stripe Checkout session)
- Needs: Create `/api/checkout` endpoint to generate Stripe session

## Responsive Design

- **Mobile (sm):** Single column grids, stack buttons vertically
- **Tablet (md):** 2-column grids, side-by-side navigation
- **Desktop (lg):** Full layouts with proper spacing and typography scale

## Next Steps

1. **Wire Stripe checkout:**
   - Create `/api/checkout` endpoint (POST)
   - Update `/bundles/page.tsx` and bundle detail pages to POST to API
   - Redirect to Stripe Checkout session

2. **Wire Supabase auth:**
   - Implement login/signup in `/auth/login` page
   - Implement account creation in `/checkout/success`
   - Add auth context/hook for checking login state across pages

3. **Wire purchase access:**
   - Add Supabase query to `/dashboard` to fetch user's purchased bundles
   - Update auth redirect logic (currently hardcoded to show redirect)
   - Implement PDF download links (query Supabase Storage)

4. **Video hosting:**
   - Upload sessions to Bunny.net
   - Add `videoId` to bundle data
   - Create video player component using Bunny.net iframe

5. **PDF generation:**
   - Create session PDFs
   - Upload to Supabase Storage
   - Generate signed download URLs
