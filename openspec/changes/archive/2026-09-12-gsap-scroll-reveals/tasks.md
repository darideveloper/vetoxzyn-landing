## 1. Foundation

- [x] 1.1 Add `gsap@^3.12.7` (`pnpm add gsap`) and create `src/lib/gsap.ts` verbatim (SSR guard, ScrollTrigger config, defaults, `load` + `astro:page-load` refresh)
- [x] 1.2 Add `.js-reveal` + `.no-js .js-reveal` rules to `src/styles/global.css` and `no-js` class + `is:inline` swap script to `Layout.astro`
- [x] 1.3 Verify foundation: dev boot, SSR build passes, JS-disabled page shows all content, `check:palette` clean

## 2. Hero minimal entrance

- [x] 2.1 Add Hero scoped script with VT lifecycle (guard, `mm.revert()`, immediate init, page-load/after-swap) + `transition:animate="none"` on section root
- [x] 2.2 Implement transform-only entrance (no opacity on H1/LCP, ≤0.9s) + session once-per-session guard + reduced-motion branch
- [x] 2.3 Add Hero decorative parallax (blobs only, `scrub 0.8`, `ease none`, `no-preference` only, `aria-hidden` already present)

## 3. Section reveals

- [x] 3.1 Challenges reveal (header + feature list stagger, `top 75%`, unhide-before-`.from()`, reduced-motion fade)
- [x] 3.2 Testimonials reveal (header + cards + dividers, `top 80%`, `overflow-x-clip` trigger check)
- [x] 3.3 Products reveal (header + panels + FormulaStrip, `top 75%`, layout chrome stays motionless per interaction-feedback)
- [x] 3.4 ContactSection reveal (header + FAQ/media/disclaimer + form shell only — never animate inputs, `top 80%` with tall fallback)

## 4. Extras

- [x] 4.1 Create `src/lib/kinetic-marquee.ts` factory (guard + cleanup + reduced-motion return) as a reusable pattern; concrete host strip deferred to implementation
- [x] 4.2 Create `src/lib/animate-counters.ts` (`data-value` + zero-out + `"<"` append) as a reusable pattern; concrete stats wiring deferred to implementation
- [x] 4.3 Swiper dropped per decision — use CSS `overflow-x: auto` for any horizontal strip; do not add the `swiper` dependency

## 5. Verify and close

- [x] 5.1 Run matrix: scroll reveals once, reduced-motion emulation fade-only, JS-disabled visible, mobile + tall desktop, VT navigation without duplicates/flash
- [x] 5.2 Run `pnpm run check:palette`, `astro build` green, and update `docs/component-dependencies.md` via the `rg` re-run method
