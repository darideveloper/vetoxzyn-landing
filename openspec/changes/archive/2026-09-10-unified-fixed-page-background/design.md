## Context

Landing (`/`) composes Hero → Challenges → Testimonials → Products → ContactSection inside `Layout.astro` (`Header` + `<slot/>` + `Footer`, `ClientRouter` enabled). Four organism shells re-declare `bg-surface-ice` (`#f9f9fd`); Testimonials instead owns a `bg-[#f3f3f7]/50` fluid wash with `clip-path: polygon(...)` plus two blurred brand blobs (`Testimonials.astro:15-17,46-48`). ContactSection owns `ContactBackdrop` (3 organic blobs + giant rotated `BIOSEGURIDAD`, `overflow-hidden absolute inset-0`) on top of `bg-surface-ice` (`ContactSection.astro:10-16`, `ContactBackdrop.astro:4-11`). Hero owns two animated `.blob-bg` circles (`Hero.astro:12-13`, keyframes `moveBlob` in `global.css:170-182`).

Constraints: vanilla-only atomic hierarchy (`organisms/` = section composition, decorators as molecules); interaction-feedback spec (tokens `--duration-hover`/`--ease-hover`, shared `.lift`/`.link`/`.hover-subtle`, motionless layout chrome, `motion-safe:` parity + `prefers-reduced-motion` guards); transparency must not break ProductPanel dark/light tones, glass panels (`glass-panel`, `glass-panel-heavy`, `hud-panel`), or `backdrop-blur` legibility.

## Goals / Non-Goals

**Goals:**
- One fixed global wash rendered once in Layout, visible continuously behind all sections on `/`, `/contact`, `/about`.
- Transparent organism shells (Hero, Challenges, Products shell, ContactSection shell, Testimonials) so the global wash is the single source of section background.
- Testimonials decorators preserved but never clipped (blobs bleed vertically, no horizontal scroll).
- ContactSection keeps a distinctive tinted/blur identity above the global wash via section-local overlay + retained `ContactBackdrop`.
- Zero motion/a11y regressions (existing reduced-motion guards extend to the new fixed layer).

**Non-Goals:**
- New imagery, new palette, or brand art swaps (placeholder WebPs stay).
- Restyling ProductPanel tones, glass/HUD panels, cards, or typography.
- Parallax scrolling, scroll-linked animation, or per-section scroll triggers.
- Touching store, islands, SEO, routing, or `design-system.astro`.

## Decisions

### 1. Fixed `div.page-bg` in Layout over `background-attachment: fixed`
Single `aria-hidden` div as the first child of `<body>` in `Layout.astro`: `position:fixed; inset:0; z-index:0 (behind content via the §5 contract — never negative); pointer-events:none`, containing 2 large soft blobs reusing `secondary-fixed/40` / `primary-fixed-dim/30` with the existing `blob-bg` morph animation (same language as Hero; no `motion-safe:` variant — the pre-existing global `prefers-reduced-motion` guard already targets `.blob-bg`). `html,body` keep solid `background: surface-ice` as paint fallback.
- *Alternative rejected:* `background-attachment: fixed` on `body` — one rule, but janky/ignored on iOS Safari and repaints on every ClientRouter swap. `position:fixed` is composited and persists in the Layout shell.
- *Alternative rejected:* per-page wrapper div — duplicates the layer on every page instead of once in the shared shell.

### 2. Transparent shells, toned interiors untouched
Delete `bg-surface-ice` from the four shells; interiors that ARE the design (ProductPanel `bg-inverse-surface`/`bg-white`, Challenges white content card, glass/FAQ panels) keep their fills. The global wash shows only in the gutters between cards — exactly the "one canvas" effect.
- *Why not a body gradient:* flat `surface-ice` + faint blobs preserves contrast ratios glass panels were tuned against; a stronger wash would force retuning every glass blur.

### 3. Testimonials: delete fluid wash + clip-path, keep blobs, switch to `overflow-x-clip`
Remove the `.bg-fluid-shape` div and its `<style>` block; keep the two `blur-3xl` circles as `absolute -z-10` decorators; change section overflow from `overflow-hidden` to `overflow-x-clip` so blobs bleed top/bottom (the "without cutting them" requirement) while horizontal overflow stays 0px. Divider images and avatar overlaps unchanged.
- *Alternative rejected:* keeping `clip-path` with larger insets — preserves the slash aesthetic but reintroduces edge clipping on every viewport change; the slash was Stitch chrome, not content.

### 4. Contact: section-local tint overlay above global, `ContactBackdrop` retained
Add one `absolute inset-0` tint div inside ContactSection (`bg-gradient-to-b from-brand-pink/[0.07] via-transparent to-brand-orange/[0.09]` + subtle `backdrop-blur-[2px]`), with existing `ContactBackdrop` (blobs + `BIOSEGURIDAD`) layered above it. Section shell goes transparent + keeps `overflow-x-clip`. Glass form/FAQ keep floating above both layers, so no contrast retune.
- *Alternative rejected:* second fixed layer for Contact — fixed layers don't scope to sections; would leak the tint onto every page. Section-absolute overlay scopes correctly and dies with the section.
- *Alternative rejected:* full dark band (inverse like Products dark panel) — stronger differentiation but breaks the light-glass tuning of `glass-panel-heavy` and reads as a third theme; tint preserves it.

### 5. Stacking contract: global wash below content, section decor above wash
Fixed layer renders as the first `<body>` child (behind Header, `<main>` slot, and Footer) at a non-negative level (`z-0` or unpositioned-behind via isolation — never `z-index:-10` against a `body` background, which some browsers paint over); each `relative` section keeps its own decorators above the wash but below its content grid. All decorators `aria-hidden="true"` + `pointer-events-none`. No new stacking contexts from transforms on shells. Hero keeps `overflow-hidden`; Testimonials + ContactSection use `overflow-x-clip` (+ `overflow-hidden` fallback).

## Risks / Trade-offs

- [Risk] Negative z-index wash can paint behind the `body` background → Mitigation: wash uses a non-negative level (`z-0` first `<body>` child, content grids above); `body` fallback stays a plain solid so a failed layer degrades to flat, never to invisible.
- [Risk] Fixed layer + `backdrop-blur` sections can band on low-end GPUs → Mitigation: blobs reuse the Hero opacities (`secondary-fixed/40`, `primary-fixed-dim/30`) as static `blur(80px)` shapes (no per-frame blur animation; only `transform` animates via the existing `moveBlob` keyframes).
- [Risk] `overflow-x-clip` unsupported on very old browsers (falls back to visible → horizontal scroll from `-right-40` blobs) → Mitigation: keep `overflow-hidden` fallback pair (`overflow-hidden overflow-x-clip` utilities cascade; modern browsers apply clip, old keep hidden — vertical bleed slightly cropped there, acceptable).
- [Risk] ProductPanel dark full-bleed panels punch through the wash (by design) making the "global" feel discontinuous at section-4 → Mitigation: accepted and documented; panels ARE the content there, shell transparency only affects the header strip + FormulaStrip seams.
- [Trade-off] Hero `overflow-hidden` still crops its blobs at section bounds (vs. global bleed) → accepted: Hero blobs are compositional to the hero grid, not page ambient; unclipping Hero would leak pink into Challenges.
- [Risk] Reduced-motion users get a static wash → Mitigation: none needed beyond reuse — the wash blobs carry the existing `.blob-bg` class, so the pre-existing `prefers-reduced-motion` guard (which kills `moveBlob`/`morph`) already covers them with no new selectors.
