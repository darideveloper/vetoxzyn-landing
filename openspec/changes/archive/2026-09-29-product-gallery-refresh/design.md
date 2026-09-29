## Context

`Products.astro` frontmatter hardcoded 7 imports from `src/assets/gallery/` with hand-written Spanish alts, and `ProductGallery.tsx` rendered each slide on a flat white plate (`bg-on-primary`). The gallery source of truth has moved to `src/assets/a2-dr-resultados/gallery/` (currently 7 `.png` files with double `.webp.png` extensions plus `.gitkeep`), and the white plate reads disconnected from the page wash (`surface-ice` + glass voice used by `HeroMediaCard`, `Card`, `FaqItem`). Constraints: vanilla-only atomic hierarchy (no new atoms), token-only palette (no hex/`style=` colors), interaction-feedback tokens for motion, `client:visible` island stays presentational (plain string props, never `astro:assets`).

## Goals / Non-Goals

**Goals:**
- Zero-code photo drops: adding/removing files in the gallery folder changes the strip with no component edit.
- Empty folder degrades to no strip (no empty carousel, no broken Swiper, no a11y ghost region).
- Each card reads on-brand via the existing ice-glass voice while keeping cutout legibility on light, dark, and mobile backgrounds.

**Non-Goals:**
- Deleting the legacy `src/assets/gallery/*.webp` files (stashed separately; removal is a follow-up).
- New palette tokens, new atoms, or any Swiper behavior change (breakpoints, autoplay, hydration stay untouched).
- CMS, filtering, captions, or per-slide copy — slides stay image-only links to `#contacto-formulario`.

## Decisions

- **`import.meta.glob` (eager) over explicit imports.** Vite resolves the folder at build time; sorting by path gives a stable, filename-controlled order. Alternative (keeping explicit imports) rejected: every photo drop costs a code edit. Alternative (server-side `fs` read) rejected: `import.meta.glob` is the Astro-idiomatic build-time mechanism and yields `ImageMetadata` directly.
- **Filename-derived alts** (`_`/`-` → spaces, strip stacked `.webp.png` extensions) over hand-written alts. Rationale: alts stay in sync with drops for free; filenames already carry the Spanish presentation names. Trade-off: less editorial polish than hand-written copy — accepted, mitigated by naming discipline on drop.
- **Conditional strip (`gallerySlides.length > 0`) over an empty-state placeholder.** An empty carousel with zero slides breaks Swiper loop semantics and leaves a labelled-but-empty `region` for screen readers; omitting the whole strip (blur band included) keeps DOM, a11y tree, and hydration cost at zero. The `lg:grid-rows-[100vh_auto]` grid is untouched — the empty `auto` row collapses to zero height.
- **Ice-glass plate (`border border-glass-border bg-surface-ice/80 backdrop-blur-md`) over flat white or brand-gradient washes.** Reuses the exact `HeroMediaCard` voice (already proven legible over imagery), stays inside existing tokens (no additions), and melts into the page wash instead of floating as disconnected white tiles. Stronger options previewed in-browser (pale-pink tint, brand gradient, dark stage) were set aside — `Cristal hielo` chosen as the minimal branded step.
- **Keep the AVIF-first `getImage` pipeline and `widths [256, 320, 400]`** unchanged: new PNG masters compress to ~7–12KB candidates, same budget as before.

## Risks / Trade-offs

- [Risk] Double-extension filenames (`.webp.png`) could confuse future glob authors → Mitigation: glob matches terminal extensions (`png|webp|jpg|jpeg|avif`) and the alt derivation strips a stacked `.webp` remainder; documented in the frontmatter comment.
- [Risk] A single oversized drop (e.g. 4000px master) inflates build-time encoding → Mitigation: `widths` cap output at 400w; convention (square ≤ ~800px masters) noted in tasks.
- [Risk] Filename-derived alts depend on drop hygiene (`IMG_0042.png` yields a poor alt) → Mitigation: drop convention (descriptive Spanish snake_case) recorded in tasks; no code guard (YAGNI).
