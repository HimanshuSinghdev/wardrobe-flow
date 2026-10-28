# Wardrobe Flow

An interactive wardrobe that teaches how clothes work together. Pick a top, bottoms, shoes and an accessory, then see how formal the outfit reads and where the pieces disagree.

Built with Next.js (App Router), React, Tailwind CSS v4 and Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## How it teaches

Every piece has a formality from 1 (casual) to 5 (formal), plus a fit tip and the occasions it suits. The readout places each piece on a shared tape measure, marks the outfit's average, and explains what it sees: a gap of three steps or more, too many accent colors, empty slots.

Five preset looks (Weekend, Office, Evening, Beach, Cold day) show the same rules at work. Your last outfit is saved in the browser.

## Structure

```
app/                  layout, global styles and design tokens, the single page
components/
  WardrobeApp.tsx     page composition and layout
  OutfitCanvas.tsx    the cutting mat with layered garments
  OutfitReadout.tsx   verdict, formality chart and notes
  FormalityChart.tsx  the tape-measure chart
  CategoryTabs.tsx    accessible tabs (arrow keys, Home, End)
  ItemGrid.tsx        pieces in the open category
  ItemDetail.tsx      fit, occasions, formality and colors for the chosen piece
  PresetLooks.tsx     one-tap outfits
  garments/           19 garment drawings as SVG, no image files
data/                 categories, items, colors and looks as plain data
hooks/useOutfit.ts    reducer and localStorage persistence
lib/                  pure functions: outfit evaluation, color math, storage parsing
types/                shared types
```

## Decisions

- **Data first.** The catalog lives in `data/` as plain typed objects. Adding a piece means adding one entry and one drawing.
- **Pure logic, one reducer.** `evaluateOutfit` and `outfitReducer` are pure functions with explicit state, so they are easy to test and nothing mutates behind the scenes.
- **Drawn in code.** Garments are SVG paths recolored at render time, so the page ships no images and every color works without extra files.
- **Motion with a job.** The tape unrolls once on load, garments drop onto the mat, tabs slide a tape-yellow underline, and swaps cross-fade. Reduced-motion settings are respected through `MotionConfig`.
- **Phone first.** On small screens the canvas stays pinned at the top while the pieces scroll beneath it. On large screens it sits beside the controls.
- **Saved state is validated.** Anything read from localStorage is checked against the current catalog before use.
