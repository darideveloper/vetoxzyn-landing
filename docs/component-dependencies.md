---
created: 2026-09-06
updated: 2026-09-06
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
├── index.astro       ← landing: hero + benefits + ContactForm island
├── about.astro       ← static content page
├── contact.astro     ← contact details + ContactForm island
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
└── molecules/ContactForm.tsx (client:load)
    ├── atoms/Input.tsx ──► store/useField ──► store/contact
    ├── atoms/Textarea.tsx ──► store/useField ──► store/contact
    ├── atoms/Button.tsx ──► lib/utils (cn)
    └── store/contact (validateAll, isSubmitted, reset)
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
- `store/contact.ts` — contactSchema (Zod), field map, setField/validateAll/reset, persist
- `store/useField.ts` — hydration-safe field hook (injectable into atoms)
- `lib/api/client.ts` — `safeFetch` + `FetchError` (scaffold, no callers yet)
- `lib/api/types.ts`, `lib/api/constants.ts` — shared API types/messages (scaffold)

## Notes

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
