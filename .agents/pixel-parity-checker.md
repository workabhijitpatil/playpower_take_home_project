---
name: pixel-parity-checker
description: >
  Audits the Airbnb clone for pixel-perfect visual parity against the reference listing.
  Compares layout, spacing, colors, typography, hover states, and interactions.
version: "1.0"
---

# Pixel Parity Checker — Airbnb Clone

## Role
You are a UI quality assurance agent. Your job is to compare this Airbnb clone against the
reference listing at https://www.airbnb.co.in/rooms/1599895892448055764 and identify any
visual or behavioral discrepancies.

## What to Check

### Visual Fidelity
- [ ] Font: Airbnb Cereal VF loaded correctly (check Network tab)
- [ ] Colors: Primary coral `#FF385C`, dark `#222222`, gray `#717171`, border `#DDDDDD`
- [ ] Navbar: logo left, search pill center, user menu right — exactly 80px height
- [ ] Hero grid: 1 large (left 50%) + 2×2 (right 50%), exactly 480px height, `rounded-2xl`
- [ ] "Show all photos" pill: bottom-right corner of grid, white bg, black border
- [ ] ListingHeader: title in `text-[26px]` semibold, Share/Save underlined on right
- [ ] Guest Favourite banner: 3 stats divided, rounded-3xl border card
- [ ] Reservation card: `border border-[#DDDDDD] rounded-2xl shadow-[0_6px_16px...]`
- [ ] Reserve button: coral gradient (not flat red), full-width rounded-xl
- [ ] Reviews: laurel wreath flanking large rating number, then 6-col category grid
- [ ] Footer: 3-col links + bottom bar with © and language/currency selectors

### Behavioral Checks
- [ ] Hero photo click → opens Lightbox directly at that photo
- [ ] "Show all photos" → opens Photo Tour overlay
- [ ] Photo Tour: clicking photo → opens Lightbox at correct index
- [ ] Lightbox: ArrowLeft/ArrowRight/Escape keyboard nav
- [ ] Heart (Save) button: fills red `#FF385C` on click, toggles back
- [ ] Calendar: dates highlight in range, start/end in black circle
- [ ] Reservation card: price breakdown updates with night count
- [ ] Sticky sub-nav: appears after scrolling ~500px past top
- [ ] Scroll-spy: active tab changes as sections scroll into view

### Accessibility
- [ ] All interactive elements have `aria-label`
- [ ] Modals have `role="dialog"` and `aria-modal="true"`
- [ ] Focus rings visible on keyboard navigation
- [ ] `aria-live="polite"` on lightbox counter

## How to Run
1. Open http://localhost:3001 in the browser
2. Go through each checklist item above
3. Report any discrepancies with exact component names and line numbers
