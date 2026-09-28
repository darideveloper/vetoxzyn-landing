## Context

`Products` (`src/components/organisms/Products.astro`) is currently a header + `flex flex-col lg:flex-row` two-panel split (`ProductPanel` light/dark, each `min-h-[100vh]`, `ResponsiveImage widths=[768,1280,1536,2048]`, `mix-blend-luminosity`, gradients, `shadow-2xl`) animated by a GSAP ScrollTrigger timeline (`.js-products-header` + `.js-products-panel` stagger, dual `matchMedia` branches for `prefers-reduced-motion`). It is the heaviest section on `/` and already strains LCP/scroll on mid mobile.

The change adds a 7-image packaging proof strip (Tinified WebP 6–13KB: atomizadores 60/120/240/480/950ml + garrafas 4L/23L, at `/home/daridev/Downloads/gallery/tinified/`) using Swiper + React (explicit user requirement; CSS scroll-snap zero-JS was considered and rejected on that basis). React 19 + `@astrojs/react` are already installed; `swiper` is the only new dependency. Project constraints apply: vanilla atomic tiers (molecule may be `.tsx`), Spanish-first copy/alts, token-only palette, interaction-feedback tokens, `docs/component-dependencies.md` as Definition of Done, `pnpm run check:palette` + `astro build` green.

## Goals / Non-Goals

**Goals:**
- Show all 7 presentations as swipeable image-only slides with calm autoplay, responsive peek+grow columns.
- Mobile-between / desktop-overlap placement without horizontal overflow at 390/768/1280px and without covering panel CTAs.
- Add ~62KB images + deferred Swiper bundle with no LCP regression vs today.
- Full keyboard + screen-reader + `prefers-reduced-motion` parity.

**Non-Goals:**
- No arrows/dots/progress, no lightbox/zoom, no per-slide captions overlay.
- No changes to panel copy/specs/CTAs, no encoder retuning, no new routes, no SSR adapter.
- No virtual slides (7 static slides), no autoplay speed controls for the user.

## Decisions

### 1. One React island: `molecules/ProductGallery.tsx` with `client:visible`
Why: keeps the vanilla tier rule (molecules may import atoms/store/lib). Locked pattern (Astro wrapper + URL props): `Products.astro` frontmatter resolves the 7 gallery images via `astro:assets` and passes plain URL/srcset strings as props; the `.tsx` island is purely presentational and never imports `.astro` atoms or `astro:assets` components (slot pattern per `docs/astro-react-islands.md`). `client:visible` defers React + Swiper hydration until near-viewport; `client:load` would tax initial JS and fight GSAP. Alternative `client:only` rejected — we want SSR static markup for SEO/no-JS.
Astro/React boundary: React cannot import `.astro` atoms, so slides render plain `<img>` from the wrapper-supplied AVIF/WebP `srcset` strings. No Zustand needed (no cross-island state).

### 2. Swiper surface: core CSS + `Autoplay` module only
```tsx
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
<Swiper modules={[Autoplay]} loop speed={600}
  autoplay={{ delay: 3500, pauseOnMouseEnter: true, disableOnInteraction: false }}
  breakpoints={{ 0: { slidesPerView: 1.2, spaceBetween: 12 }, 640: { slidesPerView: 2, spaceBetween: 16 }, 1024: { slidesPerView: 3, spaceBetween: 20 }, 1280: { slidesPerView: 4, spaceBetween: 24 } }}>
```
Why: Navigation/Pagination/Scrollbar/A11y-extra modules + their CSS are dead weight for a minimal strip (verified against Swiper React docs: core excludes modules by default). `disableOnInteraction:false` = swipe doesn't kill the calm loop; `pauseOnMouseEnter` + touch-pause keeps it calm. Reduced-motion handled one level up (see §4).

### 3. Placement via `Products.astro` grid (shared backgrounds, no copies)
- Grid `grid-cols-1 lg:grid-cols-2 lg:grid-rows-[100vh_auto]`: both panel wrappers span rows 1–2 (`lg:row-start-1 lg:row-end-3`, explicit `lg:col-start-1/2`); the gallery wrapper sits `lg:col-span-2 lg:col-start-1 lg:row-start-2`. The explicit column start is load-bearing — without it auto-placement fled the gallery into implicit tracks. Mobile flow = panel-light → gallery → panel-dark via plain DOM order.
- Because the panels span both rows, the strip sits directly on their real animated photo backgrounds (same elements, same `image-pan` — sync is structural, not copied). This replaced an earlier duplicated static backdrop, which read as frozen next to the panning panels.
- `ProductPanel` picked up desktop-only layout classes so content keeps today's positions while the article stretches: article `lg:h-full lg:items-start` (top-anchored), content column `lg:h-auto lg:min-h-[100vh]`, and `lg:w-1/2` dropped (grid columns own width). Mobile is byte-identical (all `lg:`).
- Gutters (`px-gutter`, `max-w-5xl`) keep the strip off viewport edges; row top padding tightened (`lg:pt-md`) with `lg:pb-xl` below so the strip connects to the HUD/CTA instead of floating.
- Why one grid + CSS over two gallery instances: single Swiper instance = single autoplay timer, single hydration cost, no duplicate IDs; CSS order avoids JS breakpoint listeners.
- Alternative rejected: absolute-positioned overlay (breaks flow height + focus order + reduced-motion predictability).

### 4. Motion contract: GSAP exclusion + reduced-motion kill-switch
- Gallery root gets its own class (e.g. `.js-products-gallery`) and is **excluded** from the existing `gsap.from(... .js-products-panel)` timeline selectors; optional standalone `autoAlpha` fade (or none) so two animation drivers never fight.
- Autoplay instantiation gated on `matchMedia("(prefers-reduced-motion: no-preference)")`; under `reduce`, render the same slides as a static swipeable row with autoplay disabled (Swiper `autoplay={false}`). Touch swipe still works — only automatic movement stops.
- Offscreen: island hydrates on `client:visible`; additionally pause autoplay when the section leaves viewport (Swiper `autoplay.stop()/start()` via IntersectionObserver or `document.visibilitychange`) so background tabs don't burn cycles.
- All slide transitions use motion tokens where custom CSS is needed — `--duration-hover` plus the overshoot-free `--ease-gallery-zoom` for the bleed zoom; no hardcoded durations/easings.

### 5. Image budget: small-width AVIF-first set, lazy everything
- Copy 7 masters to `src/assets/gallery/`; the Astro wrapper renders them via the existing pipeline (`Picture formats=[avif,webp]`, `widths=[256,320,400]` — masters measured at 400px square, so the set stays at/below native with no upscaling — `sizes="(max-width: 639px) 82vw, (max-width: 1023px) 46vw, (max-width: 1279px) 31vw, 24vw"`) and passes the resulting URL/srcset strings to the `.tsx` island, whose `<img>`s carry `loading="lazy"`, `decoding="async"`; `fetchpriority` untouched (panels keep LCP priority).
- Why not reuse panel widths: a 2048w `srcset` for 300px slides wastes decode + bandwidth; small set keeps each slide ~10–30KB delivered.
- Spanish alts drafted from filenames (e.g. `Envase atomizador Vetoxzyn de 120 mililitros`); decorative layers hidden, slides are meaningful images with alts. No `public/` usage per `image-pipeline`.

### 6. A11y/i18n/palette
- Region `aria-roledescription="carrusel"` + Spanish `aria-label` (e.g. `Galería de presentaciones Vetoxzyn`); each slide is a real link to `#contacto-formulario` with a Spanish action label (`Consultar sobre …`), keyboard-focusable with the shared ring, drags excluded via Swiper `preventClicks`; focus never trapped; visible focus ring from base layer.
- Strip consumes palette tokens only (`bg-on-primary`, `shadow-card`, `text-on-surface`, …); no hex/`style=` color; `check:palette` clean.

### 7. Stable pre-hydration geometry (CLS = 0)
`client:visible` means Swiper's `slidesPerView` does not apply until near-viewport; with Swiper's base CSS (`.swiper-slide { width: 100% }`) that rendered one full-width square and a ~750px section jump (measured: row 1104px → 354px). Fix: `global.css` defines slide width + margin under `.js-products-gallery` mirroring the breakpoints (`83.333%/12`, `calc(50% - 8px)/16`, `calc((100% - 40px)/3)/20`, `calc((100% - 72px)/4)/24`). Swiper's inline styles win after init and compute to the same values → measured CLS `0`, stable 226px at 1280. Fallback if widths ever drift: `client:load`. Alternative (reserve height only) rejected — leaves the giant-image first paint for no-JS/crawlers.

### 8. Product plate + seam blend
- Gallery masters are transparent cutouts (verified: `hasAlpha=true`, corners `[0,0,0,0]`), so they vanish on the light half and on mobile white. Every slide now sits on one consistent white plate (`bg-on-primary`, `rounded-2xl`, `p-md`, `shadow-card`, `object-contain`) — elevation declared once via shadow (craft floor), legible on light/dark/mobile alike. The image renders at `scale: 1.5` past the plate (no clipping) for the oversized bleed look, easing to `1.6` on hover; the swiper viewport is forced `overflow: visible` so the track never cuts the bleed.
- The strip row adds an `aria-hidden` feathered `backdrop-blur-md` band masked horizontally (transparent→30%→70%→transparent) over the light/dark seam, so the same panel photos keep showing while the hard center edge diffuses behind the carousel (`lg` only). Studio alternative (wide gradient veil) held in reserve if the blur reads muddy.

## Risks / Trade-offs

- [Swiper bundle ~40KB gzip even tree-shaken] → Mitigation: `client:visible` + modules `[Autoplay]` only + core CSS only; document size in tasks verification.
- [Autoplay vs GSAP jank on mid mobile] → Mitigation: timeline exclusion, `speed 600`, offscreen pause, reduced-motion off.
- [Overlap covering CTAs / causing x-overflow at 390px] → Mitigation: grid row-span overlap (no negative margins), gutters, `overflow-x-clip` guard on the region, viewport matrix check (390/768/1280) + `astro build` before merge.
- [React 19 + Swiper SSR mismatch] → Mitigation: SSR static slides via Astro wrapper props, hydrate on visible; fallback: `client:only` only if build proves mismatch (not default).
- [Filenames → alts drift when real photos swap] → Mitigation: alts live next to imports in one `GALLERY` array; swapping a file forces alt review in the same diff.
- [Two-panel `min-h-100vh` + strip pushes Contact further down] → Accepted: strip is compact (~220–300px tall); page lengthens modestly, LCP unaffected (lazy/below-fold on desktop).

## Migration Plan

1. `pnpm add swiper` (pin), copy 7 assets, add island + Products restructure behind no flag (static site, atomic deploy).
2. Verify: `pnpm run check:palette`, `astro build`, viewport pass 390/768/1280, keyboard + reduced-motion pass.
3. Rollback: revert single change (island + Products block + dep + global.css gallery rules); panels keep their pre-change layout since the `ProductPanel` edits are desktop-only classes inside the same revert.
4. Post-merge: update `docs/component-dependencies.md` in the same PR (DoD); no data migration.

## Open Questions

- Q1 (resolved in explore): desktop = overlapping strip below panels sharing their backgrounds. Done.
- Q2 (resolved in implementation): overlap depth settled as grid row-span (no `-mt`, no glass strip) with screenshots; the earlier `-mt-16`/glass approach was tried and replaced.
- Q3 (resolved): Swiper pinned at 14.2.0; `pauseOnMouseEnter` semantics verified intact in v14 typings.
