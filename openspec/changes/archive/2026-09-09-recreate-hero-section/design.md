## Context

`src/pages/index.astro` is placeholder copy. The voted atoms (`Button.tsx`, `Eyebrow.astro`, `Icon.astro`, `Badge.astro`) exist and are showcased in `src/pages/design-system.astro`; the hero reference is `design/stitch/01-hero-layout/code.html` (shell, badges row, visual card) + `design/stitch/01-hero-bullet-list/code.html` (vertical Icon rows, HUD pills) with A2 copy in `design/docs/client-pages-sections.md` Sec 1. `src/styles/global.css` has almost no theme tokens (only `brand-500`); Stitch tokens live in the CDN `tailwind.config` inline in `code.html`. `Layout.astro` already provides Material Symbols, Header/Footer, `<ClientRouter />`. Project is locked to vanilla-only atomic tiers (`AGENTS.md`, `docs/astro-atomic-components.md`): `organisms → molecules/atoms/store/lib`, no `ui/`, no `Validated*`, atom-to-atom imports acyclic. `docs/component-dependencies.md` is a living doc and part of DoD.

## Goals / Non-Goals

**Goals:**
- Hybrid A2 hero organism, fully responsive (mobile 1-col → desktop 12-col 7+5), static (no JS island), accessible (single H1, focus-visible CTAs, alt/aria on visual).
- Maximum reuse of voted atoms; single source of truth for B2/B3 CTA styling.
- Zero external image hotlinks: Stitch hero art downloaded, converted to WebP, stored in-repo, rendered via `astro:assets`.
- Stitch look preserved (blobs, glass, tilt-float, ambient shadow, Montserrat/Open Sans).

**Non-Goals:**
- No A1/A3–A6 variants (A2 hardcoded; prop-driven avatar support is a later change).
- No galería/testimonios/contacto sections (anchors `#section-3`/`#section-5` stay dead targets for now).
- No dark-mode, i18n, backend form, or CMS/content-file work.
- No new animation library (CSS keyframes only).

## Decisions

### 1. `organisms/Hero.astro`, static Astro — over React island or page-inline markup
Hero has no state (anchors + hover + CSS blobs). A static organism keeps `<ClientRouter />` swaps cheap, ships zero JS, and follows tier rules (`organisms → atoms`). The React `Button` atom is imported with no `client:` directive (static render, zero JS). Alternative (React island) rejected: hydration cost for no behavior. Alternative (inline in `index.astro`) rejected: hero is a screen region that will be reused by `/clients/*` routes.

### 2. Bullets replace badges — over keeping both
Both list the same 5 trust items (`pH neutro · HOCl biomimético · Grado 0 · Cero corrosión · Sin residuos`). Keeping both duplicates content and doubles vertical space on mobile. Bullets (Icon circle + label rows) chosen because they use the `Icon` atom as voted and scan better under the subhead. `Badge feature` stays available for other sections.

### 3. Extend `Button.tsx` with optional `href` (polymorphic anchor) — over `<a>`-styled-by-copy or `<button onClick>`
Design CTAs are anchors (`#section-5`, `#section-3`); the atom renders `<button>`. Copying B2/B3 classes into Hero forks the source of truth; `onClick` navigation breaks SEO/keyboard/middle-click. `href?: string` renders `<a>` with the identical `variants[variant] + sizes[size]` class chain when present, `<button>` otherwise — backward compatible, one prop, no visual change to existing usages. Arrow `arrow_forward` stays a children span (per `atoms-page-global-components.md`: icon passed as children, not the `Icon` atom).

### 4. Local WebP via `astro:assets Image` — over keeping the Stitch `googleusercontent` URL or hand-written `<img>`
Hotlink risks breakage, leaks referrers, and skips the Astro optimizer (no WebP widths+sizes, no eager-hero hint). Pipeline: download original(s) → `src/assets/hero/` → build-time convert to WebP (quality ~82, native 512 + 384 — Stitch source is only 512px, no upscaling) → `<Image>` eager + `fetchpriority="high"`, widths+sizes, alt describing surgical-instrument context. The Stitch `mix-blend-luminosity` + opacity treatment is reproduced in CSS over the optimized image. Alternative (`public/` + plain `<img>`) rejected: loses optimizer + type-safe imports.

### 5. Port Stitch tokens into `global.css` `@theme` — over per-file arbitrary values
`code.html` uses ~40 color tokens + `spacing (gutter/margin/max-width)`, `fontFamily (Montserrat/Open Sans)`, `fontSize (display-lg/mobile, body-lg, caption, label-bold)`. Porting once to Tailwind v4 `@theme` keeps Hero classes semantic (`bg-surface-ice`, `text-on-surface-variant`, `px-gutter`, `max-w-max-width`) and reusable by later sections. Only hero-needed tokens are ported (YAGNI); the rest when sections 2–5 land.

### 6. Layout-version visual (bottom avatar overlay only) — over bullet-version HUD pills
Keeps the hybrid minimal and matches `01-hero-layout`'s calmer card. HUD pills (`Badge tag primary/light`) remain available for the bullet variant later.

## Risks / Trade-offs

- [Risk] Stitch source image is AI-generated placeholder with unknown license/size → Mitigation: treat as placeholder, keep original filename + `README` note in `src/assets/hero/`, swap when brand art lands; verify dimensions ≥1024px wide or reduce target widths.
- [Risk] `Button` polymorphic change touches a global atom → Mitigation: prop is optional, existing `<button>` path untouched; verify `design-system.astro` + `ContactForm` submit render identically (`pnpm build` + visual check).
- [Risk] Font loading (Montserrat/Open Sans via Google Fonts) → Mitigation: add `<link>` once in `Layout.astro` head with `display=swap`; fallback stacks stay system-ui.
- [Risk] Dead anchors (`#section-3/#section-5` have no targets yet) → Mitigation: documented in specs; CTAs still focusable/keyboard-operable, no JS errors.
- [Risk] Token port drift from Stitch hexes → Mitigation: copy hexes verbatim from `code.html` config; snapshot `screen.png` side-by-side review.

## Migration Plan

1. Land Hero + Button `href` + local WebP + tokens in one change; no route changes.
2. Verify: `pnpm build` (sitemap/robots clean), `astro dev --background` visual check vs `screen.png` at 390/768/1280px, keyboard tab through CTAs.
3. Update `docs/component-dependencies.md` in the same change (DoD).
4. Rollback: revert `index.astro` hero block to placeholder (single hunk); atoms/images additive otherwise.
