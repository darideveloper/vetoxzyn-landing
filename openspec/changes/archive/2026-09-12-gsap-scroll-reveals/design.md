## Context

Home (`src/pages/index.astro`) renders 5 organisms in order: Hero → Challenges → Testimonials → Products → ContactSection. No GSAP exists today (`gsap`/`swiper` absent from `package.json`, no `src/lib/gsap.ts`, no `.js-reveal`/`.no-js` in `src`). `Layout.astro` already ships `<ClientRouter />` with a persistent Header/main/Footer shell, so the canonical VT + GSAP lifecycle (`docs/astro-client-side-page-transitions.md` §5.4) applies. Styling is token-only (`docs/design-tokens.md`, `pnpm run check:palette`) and motion must respect `openspec/specs/interaction-feedback/spec.md` (shared `--duration-hover`/`--ease-hover`, `.lift`/`.link`/`.hover-subtle`, cursor/focus contract, container rule, layout chrome stays motionless). Implementation pattern source: `docs/gsap-scrolltrigger/` (01 setup, 03 reveal template, 04 extras, 05 a11y/pitfalls, 06 swiper).

## Goals / Non-Goals

**Goals:**
- Scroll reveals on all 5 home sections, attractive but GPU-cheap (transform/opacity only, one timeline per section, `play none none none`).
- Hero stays LCP/SEO-safe: minimal transform-only entrance, never opacity-hides H1/LCP media.
- Full a11y: `matchMedia` reduced-motion branches + `.no-js` fallback + `ScrollTrigger.refresh()` correctness under VT.
- Zero new motion language: reuse interaction-feedback tokens/classes; new color only via token first.

**Non-Goals:**
- No preloader / `animation-manager` (explicitly skipped).
- No Swiper (dropped per decision — CSS `overflow-x: auto` for any horizontal strip).
- No about/contact/404 animation, no SplitText/ScrollSmoother/Flip/Draggable, no CSS-only hover rework, no `reveal-helper.ts` DRY refactor (per-group choreography wins).

## Decisions

1. **Shared module `src/lib/gsap.ts` verbatim from `01` + one VT line.** SSR guard + `ScrollTrigger.config({limitCallbacks, ignoreMobileResize})` + `gsap.defaults({ease:"power4.out",duration:1.2})` + `load → refresh()`. Add `document astro:page-load → ScrollTrigger.refresh()` per §5.4 (VT swaps never fire `load`). Alternative (per-file registration only): rejected — single source, cacheable chunk.
2. **Per-component `<script>` imports, never Layout-global, never `is:inline`.** Astro bundles + defers; ScrollTrigger tree-shaken per page. Each script follows §5.4 triple-entry: presence guard → `mm?.revert()` → `matchMedia` branches → immediate `init()` + `astro:page-load` re-init + `astro:after-swap` cleanup; `transition:animate="none"` on each animated section root.
3. **SEO strategy = hybrid C (`01` §4).** `.js-reveal` CSS hiding + `.no-js` override + `gsap.set(autoAlpha:1)` before `.from()`. Alternative A (`fromTo+clearProps`, zero CSS): simpler but loses strict no-JS hiding parity with the `03` template; C keeps the copy-paste template intact. Never `opacity-0` alone (P9).
4. **Hero = transform-only minimal.** `y:24→0` / `scale` on media card, short durations (≤0.9s), no `autoAlpha:0` on H1/subtitle/LCP image, `sessionStorage` once-per-session guard. Alternative (full reveal / static hero): full risks LCP delay; static undersells — minimal is the middle path the user chose.
5. **Section starts tuned, not uniform.** Hero entrance (load, not scroll); Challenges `top 75%`; Testimonials `top 80%` (card grid); Products `top 75%`; ContactSection `top 80%` (tall). Tall-section rule from P2: if a `start` never fires, fall back to `top bottom`. One timeline per section, groups staggered (`-=` overlaps), easings `power4.out` headers / `power3.out` cards / `expo.out` long travel / `back.out(1.7)` only for tiny icon pops.
6. **Extras fenced, placement deferred.** Parallax: decorative blobs/glows only, `scrub 0.8`, `ease:"none"`, inside `no-preference` branch. Marquee: `kinetic-marquee.ts` factory (duplicate-once + modulo wrap + `_marqueeInit` guard + cleanup, `aria-hidden`) — pattern only, concrete host strip deferred to implementation (no marquee markup exists today). Counters: `animate-counters.ts` (`data-value`, zero-out before tl, append at `"<"`) — pattern only, concrete stats deferred (no `data-value` markup exists today). Swiper: dropped — any horizontal strip uses CSS `overflow-x: auto`.
7. **No `reveal-helper.ts`.** Reference ships verbose per-section template (self-contained, deletable, per-group timing). Helper collapses groups into one stagger and is flagged convenience-only in `03`.

## Risks / Trade-offs

- [Risk] Hero opacity-hiding delays LCP → Mitigation: transform-only rule + no `autoAlpha:0` on LCP nodes + short durations; verify LCP in build.
- [Risk] VT cross-fade flash (content at natural state before GSAP hides it) → Mitigation: `transition:animate="none"` on every animated root (§5.4).
- [Risk] Duplicate triggers after VT navigation (stale `document` listeners) → Mitigation: presence guard + `mm?.revert()` + `after-swap` cleanup.
- [Risk] Wrong offsets after images/fonts/VT swap → Mitigation: `refresh()` on `load` + `page-load`; `ignoreMobileResize`.
- [Risk] `overflow-x:hidden/clip` ancestors break trigger measurement (P2; Testimonials/ContactSection already use `overflow-x-clip`) → Mitigation: keep triggers inside unclipped scope or retune `start`; test tall/mobile viewports.
- [Risk] Marquee double-duplication on re-init (P6) → Mitigation: `_marqueeInit` guard + returned cleanup on unmount/swap.
- [Risk] Palette / motion-language drift (raw hex, new hover inventions, `cursor-pointer` on static) → Mitigation: token-only colors, shared `.lift/.link/.hover-subtle`, container rule, `check:palette` + build green; update `docs/component-dependencies.md`.
