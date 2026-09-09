## Why

The landing (`src/pages/index.astro`) is still placeholder copy with no hero, while the voted global atoms (`Button`, `Eyebrow`, `Badge`, `Icon`) and the Stitch designs (`01-hero-layout`, `01-hero-bullet-list`) plus A2 copy (`design/docs/client-pages-sections.md` Sec 1) already define exactly what the hero should be. Building the hybrid hero now unblocks the A2 client page and removes the external Stitch hotlink dependency.

## What Changes

- New `src/components/organisms/Hero.astro` (static Astro, no island): `01-hero-layout` shell (blobs, grid 7+5, visual glass card with bottom avatar overlay) + `01-hero-bullet-list` vertical Icon feature rows ×5 (A2 Dr. Resultados copy, hardcoded).
- Bullets replace the badges row (same 5 trust items, no duplication).
- Extend `src/components/atoms/Button.tsx` with optional `href?: string`: renders `<a>` with identical variant/size classes when present, `<button>` otherwise. No visual change to existing usages.
- Download Stitch hero image(s), convert to WebP, store under `src/assets/hero/`, render local WebP via `astro:assets Image` (eager, WebP widths+sizes) instead of the `googleusercontent` hotlink.
- Embed `<Hero />` in `src/pages/index.astro` (replaces placeholder hero block); rest of page untouched.
- Port Stitch hero tokens (brand pink/orange, surfaces, `shadow-ambient`, `blob`/`tilt-float`, Montserrat/Open Sans) into `src/styles/global.css` `@theme`.
- Update `docs/component-dependencies.md` per DoD (new organism tree + Button href note).

## Capabilities

### New Capabilities

- `hero-section`: hybrid A2 hero organism — layout, copy, responsive behavior, CTAs, local-image rendering, accessibility (single H1, alt, contrast, keyboard/focus).

### Modified Capabilities

- `global-atoms`: `Button` gains polymorphic `href` (anchor rendering with identical B2/B3 styling). Requirement change to the atom contract, backward compatible.

## Impact

- Affected: `src/components/atoms/Button.tsx`, new `src/components/organisms/Hero.astro`, `src/pages/index.astro`, `src/styles/global.css`, `src/assets/hero/*`, `docs/component-dependencies.md`.
- No new dependencies (conversion via existing `ffmpeg`/Pillow or `sharp` already in Astro pipeline; prefer `astro:assets`).
- No routing/store/API changes; anchors `#section-3`/`#section-5` remain dead targets until galería/contacto organisms land (documented, not failures).
