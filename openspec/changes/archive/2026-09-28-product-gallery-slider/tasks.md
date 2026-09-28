## 1. Assets + dependency setup

- [x] 1.1 Copy 7 Tinified masters from `/home/daridev/Downloads/gallery/tinified/` to `src/assets/gallery/` (exact filenames preserved) and confirm `ls -lh` shows ~6–13KB each
- [x] 1.2 Add `swiper` dependency (`pnpm add swiper`, pin resolved major) and confirm React 19 + `@astrojs/react` untouched
- [x] 1.3 Draft 7 Spanish alts in a `GALLERY` source array (atomizador 60/120/240/480/950ml + garrafa 4L/23L, e.g. `Envase atomizador Vetoxzyn 120 ml`) for review before wiring

## 2. Gallery island (React + Swiper, lean surface)

- [x] 2.1 Create `src/components/molecules/ProductGallery.tsx` rendering `Swiper` + 7 `SwiperSlide` image-only slides, `modules={[Autoplay]}` only, `import "swiper/css"` core only (no Navigation/Pagination CSS)
- [x] 2.2 Configure calm autoplay + breakpoints: `loop`, `speed 600`, `autoplay { delay: 3500, pauseOnMouseEnter: true, disableOnInteraction: false }`, breakpoints `0:{1.2,12} / 640:{2,16} / 1024:{3,20} / 1280:{4,24}`
- [x] 2.3 Gate autoplay on `prefers-reduced-motion: no-preference` (static swipeable row when `reduce`) and pause offscreen (`IntersectionObserver` stop/start + `visibilitychange`)
- [x] 2.4 Wire small-width images via Astro wrapper: resolve AVIF-first `srcset` at `[256,320,400]` (400px-square masters, no upscaling) with slot-matched `sizes` in `Products.astro` frontmatter and pass URL strings as props to the presentational `.tsx`; `<img>`s carry `loading="lazy"`, `decoding="async"`; region `aria-roledescription="carrusel"` + Spanish `aria-label`; no new headings; token-only palette classes

## 3. Products section integration (order + overlap)

- [x] 3.1 Restructure `src/components/organisms/Products.astro`: panels span grid rows 1–2 (`lg:row-end-3`) so the strip sits on their real animated backgrounds; gallery placed `lg:col-span-2 lg:col-start-1 lg:row-start-2` (explicit col start — auto-placement had put it in implicit tracks); mobile keeps DOM order light → gallery → dark; panels take `lg:h-full lg:items-start` + content `lg:h-auto lg:min-h-[100vh]` so the CTA/HUD sit above the strip with clearance
- [x] 3.2 Guard GSAP timeline selectors so `.js-products-panel`/header animation ignores `.js-products-gallery`; gallery gets no reveal hooks
- [x] 3.3 Verify no `cursor-pointer` on static content (slide links carry it as real anchors), no hardcoded durations/easings — motion runs on `--duration-hover` plus `--ease-hover`/`--ease-gallery-zoom` tokens only

## 4. Verification + Definition of Done

- [x] 4.1 Run `pnpm run check:palette` (must report clean) and `astro build` green; record Swiper contribution to client bundle
- [x] 4.2 Viewport pass 390/768/1280px: mobile-between order, desktop overlap with gutters, zero horizontal overflow, CTAs uncovered; keyboard trap-free tab + visible focus; reduced-motion static-row check
- [x] 4.3 Update `docs/component-dependencies.md` (re-run the three `rg` commands, redraw Products per-page tree, note new `ProductGallery` + `src/assets/gallery/` leaves) and screenshot batch (desktop + mobile) with one fix round

## 5. UI refinement (post-review: empty band, frozen-copy backdrop, layout jump)

- [x] 5.1 Delete the duplicated static backdrop added under the strip; panels span both grid rows instead so the strip shares the panels' own animated `image-pan` backgrounds (no frozen copy)
- [x] 5.2 Fix pre-hydration geometry in `global.css` (`.js-products-gallery` breakpoint widths/gaps) so the unhydrated strip is correct → CLS measured `0` (was header/row 1104px → 354px)
- [x] 5.3 Give transparent cutouts a consistent white plate (`bg-on-primary` + `shadow-card` + `p-md` + `object-contain`); legible on light, dark and mobile white
- [x] 5.4 Soften the light/dark seam behind the strip with a feathered masked `backdrop-blur-md` band (`lg` only) and tighten row top padding (`lg:pt-md`)
- [x] 5.5 Verify: CLS `0`, palette clean, build green, viewport pass 390/768/1280 (slide widths 283/352/226 exact, no horizontal scroll), detector clean except pre-existing `--ease-hover` token
- [x] 5.6 Scale slide images to `1.5` with no clipping (plate drops `overflow-hidden`): oversized bleed over the plate; swiper viewport forced `overflow: visible`; hover eases to `1.6` on shared tokens with reduced-motion parity; verified no page-level horizontal overflow
- [x] 5.7 Smooth the zoom with an overshoot-free `--ease-gallery-zoom` token and link each slide to `#contacto-formulario` (Spanish `aria-label`, `cursor-pointer`, Swiper `preventClicks` keeps drags from navigating); verified easing + click-scroll live
