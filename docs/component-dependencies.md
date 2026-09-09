---
created: 2026-09-06
updated: 2026-09-09
tags:
  - astro
  - components
  - architecture
  - documentation
type: resource
status: active
---

# Component Dependency Map

Living reference of how pages compose components (and subcomponents) in this project.

> **Keep this in sync.** Whenever pages or components are added, removed, renamed, or
> their imports change, regenerate the diagram below and update the Notes section.
> Re-run `rg "^import" src --glob "*.{astro,ts,tsx,jsx}"` to list imports, then redraw.

## Pages layer

File-based routing, SSG (`output` default `static`, no SSR adapter). No catch-all, no content collections, no i18n.

```
src/pages/
├── index.astro       ← landing: hero + products + ContactForm island
├── about.astro       ← static content page
├── contact.astro     ← contact details + ContactForm island
├── design-system.astro ← dev showcase: all atoms + variants (see below)
├── _demos.tsx        ← page-local React island for design-system (demo store, never a route)
├── 404.astro         ← not-found + primary-section links
└── robots.txt.ts     ← API route (dynamic robots.txt), no components
```

## Full dependency diagram

Pages are few, so per-page trees below are the reference. Overview:

```
┌──────────────────────────────────────────────┐
│  index / about / contact / 404 (.astro)      │
└──────────────────┬───────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│  Layout.astro (shared shell)                 │
│  styles/global.css · Header · <slot/> · Footer│
│  <slot name="seo"/> ← PageSEO per page       │
└──────────────────┬───────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│  Shared leaf layer                           │
│  data/site-config · consts · store · lib     │
└──────────────────────────────────────────────┘
```

## Per-page trees

### index.astro tree

```
index.astro
├── Layout.astro ──► shared shell (see below)
├── seo/PageSEO.astro ──► SEO chain (see below)
├── organisms/Hero.astro (static, no client: directive)
│   ├── atoms/Eyebrow.astro (E2, A2 eyebrow)
│   ├── atoms/Icon.astro ×7 (bullets ×5 circle pink md filled + biotech circle + verified bare)
│   ├── atoms/Button.tsx ×2 (primary md href="#section-5" + secondary md href="#section-3", static render)
│   └── assets/hero/hero-clinica-512.webp ──► astro:assets Image (eager, widths 384/512)
├── organisms/Products.astro (static, no client: directive, id="section-3")
│   ├── atoms/Badge.astro ×2 (feature vertical: water_drop + cleaning_services, P3-drop restyle)
│   ├── atoms/Button.tsx ×2 (product tone light|dark href="#section-5", static render)
│   └── assets/products/topico-512.webp + instalaciones-512.webp ──► astro:assets Image (lazy, widths 384/512)
└── molecules/ContactForm.tsx (client:load, section id="section-5")
    ├── atoms/Input.tsx ──► store/useField ──► store/contact
    ├── atoms/Textarea.tsx ──► store/useField ──► store/contact
    ├── atoms/Checkbox.tsx ──► store/useField ──► store/contact
    ├── atoms/Button.tsx ──► lib/utils (cn)
    └── store/contact (validateAll, isSubmitted, reset)
```

### design-system.astro tree

```
design-system.astro
├── Layout.astro ──► shared shell (see below)
├── seo/PageSEO.astro ──► SEO chain (currentPage="design-system", custom title/desc)
├── atoms/Eyebrow.astro · atoms/Badge.astro · atoms/Icon.astro · atoms/Card.astro (static)
└── _demos.tsx (client:load, page-local demo store — never touches store/contact)
    ├── atoms/Input.tsx · atoms/Textarea.tsx · atoms/Checkbox.tsx
    └── atoms/Button.tsx (all variants × sizes × tones)
```

### contact.astro tree

```
contact.astro
├── Layout.astro ──► shared shell (see below)
├── seo/PageSEO.astro ──► SEO chain (see below)
├── data/site-config (EMAIL, PHONES — direct links)
└── molecules/ContactForm.tsx ──► same subtree as index.astro
```

### about.astro tree

```
about.astro
├── Layout.astro ──► shared shell (see below)
└── seo/PageSEO.astro ──► SEO chain (see below)
```

### 404.astro tree

```
404.astro
├── Layout.astro ──► shared shell (see below)
└── seo/PageSEO.astro ──► SEO chain (see below)
```

## Atom catalogue (standardized 2026-09-07, Stitch showcase vote)

Vanilla-only (`atoms/` self-contained, no `ui/`, no `Validated*`).
Decisions: primary Button B2 orange pill (submit reuses B2, B1 gradient + B5 large dropped);
secondary Button B3 glass pill (hero) + B4 rectangular w-full uppercase (product cards only);
Eyebrow E2 orange-tint pill (E1/E3 dropped); Badge P1 glass feature pill + P2 black
`CLINICAL GRADE` tag w/ orange border (P3 vertical dropped); Icon I1 w-10 pink circle;
Input F1 underline; Textarea F3 glass; Checkbox F2 pill; Card C1 glass.

```
src/components/atoms/
├── Button.tsx    (React, variant primary|secondary|product, size md|sm, tone light|dark for product, optional href → renders <a> with identical classes) ──► lib/utils
├── Input.tsx     (F1 underline, store-bound) ──► store/useField ──► store/contact
├── Textarea.tsx  (F3 glass, store-bound) ──► store/useField ──► store/contact
├── Checkbox.tsx  (F2 pill, store-bound) ──► store/useField ──► store/contact
├── Icon.astro    (I1 circle default; variant bare, tone pink|orange|primary|green, size md|lg — GAP-A)
├── Badge.astro   (P1 feature | P2 tag with tone dark|primary|light + icon — GAP-B)
├── Eyebrow.astro (E2, static)
└── Card.astro    (C1 glass shell, static)
```

```
src/components/organisms/
├── Hero.astro    (static A2 hero: 01-hero-layout shell + bullet-list Icon rows; bespoke visual card, NOT Card C1) ──► atoms/{Eyebrow,Icon,Button} + astro:assets
├── Products.astro (static 04-products split: in-flow h2 header + light/dark panels + formula banner; HUD panels bespoke, NOT Card C1) ──► atoms/{Badge,Button} + astro:assets
├── Header.astro
└── Footer.astro
```

`Layout.astro` loads Material Symbols Outlined (FILL 0..1) for Icon/Badge/Eyebrow.
Badge `feature` + Button `product` are now reachable via `Products` on `/`
(`#section-3`); Button `href` anchors are live targets (`#section-3` Products,
`#section-5` contact section on `/`). Card C1 stays showcase-only (reachable
via `design-system`, no landing page uses it until testimonials land).
`atoms.astro` showcase page was temporary and deleted the same day.

## Shared shell (Layout)

```
Layout.astro
├── styles/global.css (tailwind v4 theme, single import)
├── astro:transitions ClientRouter (default fallback)
├── <slot name="seo"/> ← per-page PageSEO
├── organisms/Header.astro
│   └── data/site-config (PHONES, EMAIL)
├── <slot/> = page content
└── organisms/Footer.astro
    └── data/site-config (BUSINESS_DATA, PHONES, EMAIL)
```

## Optional chains

### SEO chain

```
PageSEO.astro ─► seo/BaseSEO.astro
                 ├── consts.ts (SITE_TITLE, SITE_DESCRIPTION)
                 └── data/site-config.ts (BUSINESS_DATA)
```

Single-language only: no i18n, no hreflang, canonical from `BUSINESS_DATA.url + pathname`, `og:locale` hardcoded `en_US`.

### Islands (React)

| Island | Mount | Binds to |
|---|---|---|
| `molecules/ContactForm.tsx` | `client:load` on `/` and `/contact` | `store/contact` (fields + submit), `store/useField` via atoms |

One instance per page; surrounding content stays static Astro HTML. Submit is fully client-side (`preventDefault`, never native form navigation, so ClientRouter swaps don't interfere). Zustand `persist` (`vetoxzyn-contact-storage`) survives reloads and VT navigations.

### i18n

Not present (single language — see design Non-Goals).

### Design-system / showcase page

None.

## Shared leaf layer

- `lib/utils.ts` — `cn()` class joiner (atoms only)
- `data/site-config.ts` — PHONES, EMAIL, ADDRESS, SOCIAL_LINKS, GOOGLE_MAPS, BUSINESS_HOURS, BUSINESS_DATA (`as const`)
- `src/consts.ts` — SITE_TITLE, SITE_DESCRIPTION (SEO fallback)
- `styles/global.css` — tailwind v4 + tw-animate-css + `@theme inline` tokens
  (hero set + `04-products` set: inverse-surface, inverse-on-surface,
  secondary-container, on-secondary-container, tertiary + tertiary-fixed family;
  effects: tilt-float/blob/shadow-ambient/glass-panel + hud-panel/hud-panel-dark/
  writing-vertical/image-pan with reduced-motion guard)
- `store/contact.ts` — contactSchema (Zod: name/email/message required + clinica/telefono
  optional strings + lineaTopico/lineaInstalaciones/lineaDistribucion booleans), field map,
  setField/validateAll/reset, persist
- `store/useField.ts` — hydration-safe field hook (injectable into atoms)
- `lib/api/client.ts` — `safeFetch` + `FetchError` (scaffold, no callers yet)
- `lib/api/types.ts`, `lib/api/constants.ts` — shared API types/messages (scaffold)

## Notes

- Hybrid hero (`recreate-hero-section`): `organisms/Hero.astro` = `01-hero-layout`
  shell (blobs, 12-col 7+5, bottom avatar overlay) + `01-hero-bullet-list` Icon
  rows ×5 (bullets replace the badges row — same 5 items, no duplication).
  React `Button` inside static Astro MUST use `className`, never `class`.
- Hero image is a 512px Stitch placeholder (`src/assets/hero/`, see README):
  widths reduced to native 512/384 (no upscaling); re-export at 1024+ when
  brand art lands. No external hotlinks in code.
- Products (`add-products-section`): `organisms/Products.astro` = `04-products`
  split (in-flow h2 header flattened from the absolute overlay + light Tópico /
  dark Instalaciones panels + formula banner). Vertical pills are glass `Badge
  feature` (intentional P3-drop restyle over the design's solid pills); HUD
  panels bespoke (C1 is light-only). Product images are hero-reuse placeholders
  (`src/assets/products/`, see README, lazy widths 384/512); swap files with no
  markup change when brand art lands. Ficha CTAs point to `#section-5` (contact
  section tagged in the same change) until real ficha URLs exist.
- Initial setup (`initial-landing-setup`): vanilla-only atoms per `astro-atomic-components` (no `ui/`, no `Validated*`); single Zustand `contact` store (not generic `form.ts`) until a second form exists.
- All business values in `site-config.ts` are placeholders (`TODO(replace)`) — canonical/JSON-LD wrong until real data lands.
- No `PUBLIC_*` env vars exist; Dockerfile ships zero `ARG/ENV` pairs by design.
- Hero/section images: none yet (placeholder SVG not used — Astro won't rasterize SVG via `Image`); any future raster image MUST use `astro:assets Image` (AVIF, widths+sizes, eager hero / lazy rest).
- **Orphaned / not reachable from any page**: none. Template `Welcome.astro` deleted during setup. `src/assets/astro.svg` unused (harmless template leftover, remove when real brand art lands).

## Related

- [[component-dependencies-guide]]
- [[astro-atomic-components]]
- [[astro-react-islands]]
- [[astro-site-config]]
- [[astro-seo]]
