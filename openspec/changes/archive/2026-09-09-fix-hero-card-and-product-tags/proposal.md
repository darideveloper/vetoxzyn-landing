## Why

Two layout defects shipped with the Stitch port: the hero visual card rendered at 24px wide (image crushed to a 22px sliver) because Stitch spacing tokens shadow Tailwind's `max-w-*` scale, and the Products vertical edge pills sat centered on the panel where they nearly touched (2px gap) and vertically overlapped the title/HUD content at stacked tablet sizes. Both contradict the `hero-section` and `products-section` specs and the Stitch reference screenshots.

## What Changes

- Replace shadowed `max-w-md/sm/lg` utilities with explicit arbitrary widths (`max-w-[28rem]` / `[24rem]` / `[32rem]`) in `Hero.astro`, `Products.astro`, and `ContactForm.tsx`; add a warning comment on the Stitch spacing scale in `src/styles/global.css`.
- Give the Products HUD spec cards `sm:ml-md` / `sm:mr-md` so a ~22px gap separates them from the vertical edge pills wherever the pills are visible.
- Re-anchor both vertical pills from panel-centered (`top-1/2 -translate-y-1/2` on the `article`) to bottom-aligned (`bottom-lg`) inside the padded content column, placing each pill alongside its HUD card and clear of the title text.
- No new atoms, no new tokens, no import changes; no `component-dependencies.md` update required (class-only edits).

## Capabilities

### New Capabilities

- None. All changes restore or refine already-specified behavior.

### Modified Capabilities

- `hero-section`: visual glass card SHALL render at its intended width (28rem cap, filling the 5-col cell) instead of collapsing to the shadowed spacing value.
- `products-section`: vertical `No requiere enjuague` pills SHALL be bottom-anchored inside the content column with separation from the HUD card, satisfying the existing no-overlap requirement at stacked (tablet) sizes.

## Impact

- Touched: `src/components/organisms/Hero.astro`, `src/components/organisms/Products.astro`, `src/components/molecules/ContactForm.tsx`, `src/styles/global.css` (comment only).
- Verified at 390/768/1280px: hero card 448×560 with image filling it, pill–card gap 22px, no horizontal overflow. `pnpm run build` clean (5 pages).
- Standing rule going forward: never use bare `max-w-xs/sm/md/lg/xl` in this project (they compile to 4/12/24/48/80px); use arbitrary rem values.
