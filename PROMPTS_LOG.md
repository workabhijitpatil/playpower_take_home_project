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

- Replaced broken Airbnb user CDN URLs with Unsplash photo URLs

---

## AI Subagent Architecture Used
- **Planner agent** — decomposed requirements from the PDF spec + reference URL
- **Research agent** — fetched live page content, analysed screenshot
- **Code-writing agent** — wrote each component sequentially
- **QA agent (planned)** — pixel-parity verification against reference screenshot

---

## Key Design Decisions
1. **No backend** — all data in static `listing.ts`, keeps build simple and fast
2. **Airbnb Cereal VF** — loaded directly from Airbnb's own CDN for pixel-perfect font match
3. **Real photo CDN URLs** — used actual `a0.muscache.com` hosting URLs from the listing
4. **SVG map** — custom hand-drawn Candolim coastline instead of Google Maps (no API key needed)
5. **Framer Motion** — AnimatePresence for smooth lightbox fade transitions
6. **Shared date state** — check-in/checkout lifted to `page.tsx` so calendar and booking card stay in sync
