## Why

The home page (Hero, Challenges, Testimonials, Products, ContactSection) is currently static on scroll. Adding GSAP + ScrollTrigger section reveals makes it feel premium and guides the eye, but it must stay fast, accessible, and SEO-safe — especially the above-fold Hero/LCP.

## What Changes

- Add `gsap` dependency and shared SSR-safe module `src/lib/gsap.ts` (plugin registration, `ScrollTrigger.config`, `gsap.defaults`, `load` + `astro:page-load` refresh).
- Add SEO-safe reveal base: `.js-reveal` + `.no-js` CSS fallback in `src/styles/global.css` plus `no-js` → `js` swap in `Layout.astro`; content visible with JS disabled and for crawlers.
- Animate all 5 home sections on scroll with the section-reveal pattern (scoped selectors, `gsap.set(autoAlpha:1)` before `.from()`, `toggleActions: "play none none none"`):
  - Hero: minimal transform-only entrance (no opacity hide on H1/LCP media, short duration), `transition:animate="none"`, session guard so it plays once.
  - Challenges / Testimonials / Products / ContactSection: header + staggered cards/media reveals with per-section `start` tuning.
- Add optimized extras: scrubbed parallax on decorative blobs/glows only (`ease:"none"`, transform-only); kinetic marquee factory via `src/lib/kinetic-marquee.ts` and stat-counter helper via `src/lib/animate-counters.ts` as reusable patterns (concrete strip/stats placement deferred to implementation; no existing marquee or `data-value` markup today). Swiper is dropped from scope — any horizontal strip uses CSS `overflow-x: auto`.
- Every animated section honors `prefers-reduced-motion` via `gsap.matchMedia()` (full motion vs fade-only) and follows the ClientRouter VT lifecycle (presence guard, `mm.revert()`, immediate `init()`, `astro:page-load` re-init, `astro:after-swap` cleanup).
- Explicitly out of scope: branded preloader / `animation-manager` (skipped per decision); about/contact/404 pages (home only); Swiper (dropped per decision — CSS `overflow-x: auto` instead); SplitText/ScrollSmoother/Flip/Draggable.

## Capabilities

### New Capabilities

- `gsap-foundation`: shared GSAP module, per-component wiring + VT lifecycle, `.js-reveal`/`.no-js` fallback, reduced-motion contract, refresh strategy, token/palette + interaction-feedback compliance.
- `scroll-reveals`: per-section scroll reveals for the 5 home sections with Hero minimal-transform rule, plus parallax and deferred marquee/counter patterns (factories only, no fixed host section).

### Modified Capabilities

- None. Existing section specs (hero, challenges, testimonials, products, contact) keep their content/layout requirements; this change only adds motion behavior covered by the new capabilities above.

## Impact

- Affected code: `src/lib/gsap.ts` (new), `src/lib/kinetic-marquee.ts` + `src/lib/animate-counters.ts` (new, only for extras), `src/styles/global.css` (fallback rules), `src/layouts/Layout.astro` (no-js class + swap script), `src/components/organisms/{Hero,Challenges,Testimonials,Products,ContactSection}.astro` (scoped `<script>` blocks + `js-*` classes + `transition:animate="none"`).
- Dependencies: `gsap@^3.12.7` (new, required); no new Swiper dependency.
- Performance: per-page tree-shaken ScrollTrigger, deferred scripts, transform/opacity-only tweens, `limitCallbacks` + `ignoreMobileResize`, refresh on load/page-load; risk is LCP regression if Hero hides opacity — mitigated by transform-only rule.
- Accessibility/SEO: reduced-motion fade-only fallback, no-JS visible content, LCP-safe Hero, decorative motion gets `aria-hidden` + `motion-safe` parity.
