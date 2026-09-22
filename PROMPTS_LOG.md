# PROMPTS_LOG.md — AI-Native Development Workflow

## Project: Airbnb Clone Take-Home (PlayPower Labs)
**Reference:** https://www.airbnb.co.in/rooms/1599895892448055764  
**Model used:** Claude Sonnet (Thinking) via Antigravity IDE

---

## Prompt Sequence

### Step 1 — Analysis & Planning
> "This is my take-home project as part of interview process. Reference URL is https://www.airbnb.co.in/rooms/1599895892448055764. Let me first discuss the plan before building anything."

**Agent actions:**
- Fetched the live Airbnb listing page via `read_url_content`
- Analysed the full-page screenshot from the reference listing
- Reviewed previous conversation context for existing work
- Produced a detailed implementation plan covering 3 screens, tech stack, file structure, exact design tokens, and build phases

---

### Step 2 — Confirmed Reference URL & Requested Fresh Build
> "I want to build this project from scratch. Use https://www.airbnb.co.in/rooms/1599895892448055764 as reference."

**Agent actions:**
- Created `implementation_plan.md` artifact with full from-scratch plan
- Identified exact data from the reference listing: ₹1,900/night · ★4.75 · 128 reviews · Mirashya (Superhost) · Candolim, Goa

---

### Step 3 — Scaffold & Dependencies
> "Proceed" (user approved the plan)

**Prompts used internally:**
- `npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack`
- `npm install framer-motion lucide-react date-fns clsx tailwind-merge`

---

### Step 4 — Component-by-Component Build
Each component was built with this prompt pattern:
> "Write [ComponentName] matching the Airbnb reference exactly. Use [design tokens], [exact colors], [exact behaviors described]."

**Components built:**
1. `globals.css` — Airbnb Cereal VF font + design tokens + reserve button gradient
2. `layout.tsx` — root layout with SEO metadata
3. `listing.ts` — complete data file with real CDN photos, host info, reviews
4. `AirbnbLogo.tsx` — SVG Airbnb logo with wordmark
5. `Navbar.tsx` — sticky header with search pill, user menu dropdown
6. `ListingHeader.tsx` — h1 title + Share/Save with heart animation
7. `PhotoHeroGrid.tsx` — 5-photo asymmetric grid + "Show all photos" pill
8. `PropertyOverview.tsx` — subtitle, specs, Guest Favourite banner
9. `HighlightPerks.tsx` — icon + title + description perk rows
10. `AboutSection.tsx` — AirCover + collapsible description + sleeping arrangements
11. `AmenitiesSection.tsx` + `AmenitiesModal.tsx` — 2-col list + full modal
12. `CalendarSection.tsx` — dual-month range picker with date math
13. `ReservationCard.tsx` — sticky card with guests dropdown + fee breakdown
14. `ReviewsSection.tsx` — laurel wreath + 6 category scores + filter tags + cards
15. `LocationMap.tsx` — SVG Candolim coastline map with animated pin
16. `HostSection.tsx` — host card with stats + bio + contact
17. `HouseRulesSection.tsx` — 3-col rules/safety/cancellation
18. `StickySubNav.tsx` — scroll-spy tabs with Photos/Amenities/Reviews/Location
19. `PhotoTourModal.tsx` — Screen 2: full-screen overlay + category pills + grouped grid
20. `LightboxModal.tsx` — Screen 3: Framer Motion transitions + keyboard nav
21. `Footer.tsx` — 3-column + bottom bar with locale controls
22. `page.tsx` — main page assembling all components + shared state

---

### Step 5 — Bug Fix Pass
> "Fix reviewer avatar 404 errors"
- Replaced broken Airbnb user CDN URLs with authentic fallback photos.

---

### Step 6 — Visual Parity & Pixel Precision Refinements
> "Fix airbnb logo it is not original and its position is also not on right place"
> "Still there is difference between navbars of our clone and webpage"
> "Icons in rating are different fix that"
> "Zoom in and out only when we expand the map"

**Agent actions:**
- Extracted and integrated the official Airbnb SVG logo and wordmark with exact padding and sizing.
- Added authentic 3D laurel wreath badges to the "Guest favourite" banner and exact rating icons.
- Integrated interactive Leaflet map with custom Candolim marker pin and scroll-wheel zoom enabled on expansion.

---

### Step 7 — Authentic Airbnb "Photo Tour" Architecture
> "When we press on show all photos our clone shows like first 2 photos and original page shows like last 3 photos so fix that"
> "Gym and pool photos are totally blur and we have pool photo in the place of bathroom photo. Fix that"

**Agent actions:**
- Completely re-architected `PhotoTourModal.tsx` to match the authentic Airbnb Photo Tour:
  - Top 9-room thumbnail table of contents (`Living room 1`, `Living room 2`, `Full kitchen`, `Bedroom`, `Full bathroom`, `Gym`, `Exterior`, `Pool`, `Additional photos`).
  - 2-column layout (left: room name + amenities; right: sequential full and half photo rows).
- Resolved image mapping: relocated courtyard swimming pool photo from bathroom to Pool section; added crisp high-resolution 1200px/4K assets for the gym, bathroom, and pool.

---

### Step 8 — Sticky Room Headers, Cross-Component Navigation & Vercel Deployment
> "When we scroll down in photo tour page names like living room 1, living room 2, full kitchen slide down till its photo ends like shown in photos"
> "When we click any photo on main page it should act like show all photo button and go to that photo in photo tour page"

**Agent actions:**
- Implemented CSS `sticky top-20` on room title blocks in `PhotoTourModal`: titles pin to the top and scroll along with their room's photos, naturally unpinning when the section ends.
- Linked hero collage photos and "Where you'll sleep" cards to open the Photo Tour modal and auto-scroll directly to that room's section.
- Resolved TypeScript compilation types (`ReviewMentionTag`, `PhotoTourModalProps`), verified clean static build (`npm run build`), and deployed to Vercel with zero warnings.

---

## AI Subagent Architecture Used
- **Planner Agent** — Analyzed the original Airbnb listing, generated architectural breakdown and iterative tasks.
- **Visual Parity Agent** — Extracted exact design tokens, typography, 3D laurel assets, and verified alignment against screenshots.
- **Feature & State Agent** — Developed modular components, sticky scroll behaviors, and cross-component navigation.
- **QA & Verification Subagent** — Conducted automated Playwright browser tests, captured viewports, and ensured production build compliance.

---

## Key Design & Engineering Decisions
1. **Zero-Latency Static Data Architecture** — Structured in typed `listing.ts` files, enabling instantaneous static site generation (SSG) on edge CDNs.
2. **Authentic Airbnb Cereal Variable Font** — Loaded directly for 1:1 typography matching.
3. **Sequential Row Chunking** — Implemented custom grouping logic to handle full-width and side-by-side half-width photos without layout distortion.
4. **CSS Sticky Anchoring** — Used lightweight native CSS sticky positioning for buttery smooth 60fps room title pinning without heavy scroll listeners.
5. **Strict TypeScript Compliance** — 100% type-checked interfaces for zero runtime crashes.
