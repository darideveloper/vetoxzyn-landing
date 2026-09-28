## Why

The Products section explains two usage contexts (Tópico / Instalaciones) but shows no actual packaging, so visitors cannot connect each context to its real presentations (atomizadores 60–950ml, garrafas 4L/23L). Seven Tinified product shots (~6–13KB each) are ready to close that gap as a visual proof strip — but the section is already the heaviest on the page (2× full-viewport 2048w images + blend + GSAP), so the slider must add proof without regressing LCP or interaction cost.

## What Changes

- Add a React + Swiper gallery island (`ProductGallery`) inside the `#productos` section:
  - 7 slides, Spanish alt text drafted from filenames; each slide shows one product image on a consistent white plate and links to the contact form (`#contacto-formulario`).
  - Autoplay calm loop (`delay 3500ms`, `loop`, `pauseOnMouseEnter`, continues after swipe, fully off under `prefers-reduced-motion`).
  - Responsive columns via Swiper breakpoints (peek + grow): mobile `1.2` con peek, `sm 2`, `lg 3`, `xl 4`.
  - Minimal chrome: swipe + autoplay only — no arrows, no dots; clicking a slide scrolls to the contact form (`#contacto-formulario`).
- Placement:
  - Mobile (`<lg`): slider renders **between** the two `ProductPanel` cards (light → gallery → dark).
  - Desktop (`lg+`): slider renders **below both panels as a full-width strip overlapping them** — both panels span grid rows 1–2 so the strip sits directly on their real animated photo backgrounds (same elements, same `image-pan`), `z-20`, with gutters intact.
- Performance isolation:
  - Island hydrates with `client:visible` only; Swiper ships only core CSS + `Autoplay` module (no Navigation/Pagination).
  - Gallery images use small widths (`[256, 320, 400]` — masters are 400px squares, so the set stays at/below native, never upscaled), `loading="lazy"`, `decoding="async"`, AVIF-first via existing `ResponsiveImage` pipeline — resolved by an Astro wrapper that passes URL/srcset strings to the presentational `.tsx` (React never touches `astro:assets` directly).
  - Gallery is excluded from the Products GSAP reveal timeline so autoplay never fights scroll animation.
- Assets: copy 7 files from `/home/daridev/Downloads/gallery/tinified/` into `src/assets/gallery/` and import via `astro:assets` (never `public/`).
- Dependency: add `swiper` (pinned current) — React + `@astrojs/react` already present, no new framework needed.

## Capabilities

### New Capabilities

- `product-gallery`: Swiper gallery island — slide content/alts, contact slide links, breakpoints, calm autoplay contract, lazy-image budget, `client:visible` hydration, reduced-motion off-switch, mobile-between / desktop-overlap placement, white product plates with 1.5×→1.6× bleed zoom.

### Modified Capabilities

- `products-section`: section composition changes (gallery insertion points + grid row-span overlap strip + GSAP exclusion); panel copy/specs/CTAs unchanged, though `ProductPanel` picked up desktop-only layout classes (`lg:h-full lg:items-start`, content `lg:h-auto lg:min-h-[100vh]`, dropped `lg:w-1/2`) so grid columns own panel width.
- `image-pipeline`: gallery slot guidance (small-width `[256,320,400]` set for strips vs 2048w panel masters) — authoring rule extension, no encoder changes.

## Impact

- Affected: `src/components/organisms/Products.astro` (grid restructure + gallery insertion + GSAP selector guard), `src/components/molecules/ProductPanel.astro` (desktop-only layout classes), new `src/components/molecules/ProductGallery.tsx` (+ Swiper CSS import), `src/styles/global.css` (pre-hydration slide geometry, swiper `overflow: visible` override, `.product-bleed`, `--ease-gallery-zoom` token), `src/assets/gallery/*.webp` (7 new), `package.json`/`pnpm-lock.yaml` (`swiper` 14.2.0), `docs/component-dependencies.md` (new island + asset leaves).
- Risks: Swiper bundle measured at 83KB raw / ~25KB gzip (tree-shaken, Autoplay only), deferred via `client:visible`; autoplay + GSAP contention mitigated by timeline exclusion + offscreen pause; overlap strip must not cause horizontal overflow at 390/768/1280px or cover CTAs (verified via build + viewport checks).
- Constraints honored: Spanish-first alts/copy, token-only palette (no hex), interaction-feedback tokens (no per-component durations), vanilla atomic tiers (molecule may be `.tsx`), `pnpm run check:palette` + `astro build` green.
