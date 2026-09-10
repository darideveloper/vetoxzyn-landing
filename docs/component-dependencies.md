---
created: 2026-09-06
updated: 2026-09-10
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
src/pages/ (prod routes — everything here ships in dist/ + sitemap)
├── index.astro       ← landing: hero + challenges + testimonials + products + ContactForm island
├── about.astro       ← static content page
├── contact.astro     ← contact details + ContactForm island
├── 404.astro         ← not-found + primary-section links
└── robots.txt.ts     ← API route (dynamic robots.txt), no components

src/dev-pages/ (dev-only — injected via devOnlyPages() on `astro dev`,
never emitted to dist/, never in sitemap; add top-level *.astro for a new
dev route, `_*` files are helpers)
├── design-system.astro ← dev showcase: all atoms + variants (see below)
└── _demos.tsx        ← page-local React island for design-system (demo store, never a route)
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
├── organisms/Hero.astro (static shell + grid, no client: directive)
│   ├── molecules/SectionHeader.astro (eyebrow + h1#hero-heading title slot + subtitle)
│   ├── molecules/HeroBullets.astro (bullets const inside) ──► atoms/Icon ×5 (circle pink md filled)
│   ├── molecules/HeroActions.astro ──► atoms/Button ×2 (primary md href="#section-5" + secondary md href="#section-4")
│   └── molecules/HeroMediaCard.astro (credential chip as inner markup)
│       ├── atoms/ResponsiveImage.astro (eager) ──► assets/hero/hero-clinica-512.webp
│       └── atoms/Icon.astro ×2 (biotech circle filled + verified bare primary)
├── organisms/Challenges.astro (static shell + 7/5 grid, section#desafios, no client: directive)
│   ├── molecules/SectionHeader.astro (E2 eyebrow + h2 slot + subtitle)
│   ├── molecules/FeatureList.astro (features const inside) ──► molecules/FeatureRow.astro ×3
│   │   └── atoms/Icon.astro (circle orange lg per row: shield, water_drop, eco)
│   └── molecules/MediaWithTags.astro (tilted overlapping media card)
│       ├── atoms/ResponsiveImage.astro ──► assets/challenges/challenges-clinica-512.webp
│       └── atoms/Badge.astro ×2 (tag dark CLINICAL GRADE + tag light icon=verified 99.9% PURE)
├── organisms/Testimonials.astro (static, id="section-3", no client: directive)
│   ├── molecules/SectionHeader.astro (E2 + h2 slot + subtitle, align center)
│   ├── molecules/TestimonialCard.astro ×3 ──► data/testimonials
│   │   ├── atoms/Card.astro (C1 glass shell, relative h-full overflow-visible + tilt-float)
│   │   ├── atoms/Avatar.astro (plain img, external Unsplash URL)
│   │   └── atoms/Icon.astro (bare filled format_quote, tone per accent)
│   └── atoms/DividerImage.astro ×2 (plain img, external picsum URLs from DIVIDERS const in organism)
├── organisms/Products.astro (static shell + split row + strip, no client: directive, id="section-4")
│   ├── molecules/SectionHeader.astro (h2 slot + subtitle, align center, no eyebrow)
│   ├── molecules/ProductPanel.astro ×2 (tone light|dark: backdrop + header + SpecGrid + CTA + vertical pill)
│   │   ├── atoms/ResponsiveImage.astro ──► assets/products/topico-512.webp | instalaciones-512.webp
│   │   ├── molecules/SpecGrid.astro (tone + items from panel SPECS const) ──► atoms/SpecItem.astro ×5 (wide? on Presentaciones)
│   │   ├── atoms/Button.tsx (product tone light|dark href="#section-5")
│   │   └── atoms/Badge.astro (feature vertical: water_drop | cleaning_services)
│   └── molecules/FormulaStrip.astro (formula banner)
└── organisms/ContactSection.astro (static shell + backdrop + grid, section#section-5)
    ├── molecules/SectionHeader.astro (h2 slot w/ gradient span + subtitle)
    ├── molecules/ContactBackdrop.astro (organic blobs + BIOSEGURIDAD massive type)
    ├── molecules/ContactForm.tsx (client:load, form base layer)
    │   ├── molecules/FormRow.tsx ×2 ──► atoms/Input ×2 each (name/clinica, telefono/email)
    │   ├── molecules/InterestPicker.tsx ──► atoms/Checkbox ×3 (lineaTopico/Instalaciones/Distribucion)
    │   ├── molecules/FormSuccess.tsx ──► atoms/Button (reset, size sm)
    │   ├── atoms/Textarea (message) + atoms/Button (submit primary sm)
    │   └── store/contact (validateAll, isSubmitted, reset)
    ├── molecules/FaqAccordion.astro (glass panel + header + single-open exclusivity script)
    │   ├── molecules/FaqItem.astro ×3 (details/summary + bare orange add_circle Icon)
    │   └── atoms/Icon.astro (circle pink lg filled info, header)
    ├── molecules/ContactMedia.astro ──► atoms/ResponsiveImage.astro ──► assets/contact/contact-clinica-512.webp
    └── molecules/DisclaimerNote.astro ──► atoms/Icon.astro (bare orange filled warning)
```

### design-system.astro tree (dev-only: `src/dev-pages/`, injected on `astro dev`, absent from prod builds)

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
├── atoms/NavLink.astro ×2 (intro block direct links: phone + email)
├── data/site-config (EMAIL, PHONES — direct links intro block)
└── organisms/ContactSection.astro ──► same subtree as index.astro
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
├── seo/PageSEO.astro ──► SEO chain (see below)
└── atoms/NavLink.astro ×3 (sitemap nav: /, /about, /contact)
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
├── Card.astro    (C1 glass shell, static)
├── Avatar.astro      (plain <img>, h-24 rounded-full bordered — external URLs only, never astro:assets)
├── DividerImage.astro (plain <img>, square lazy — external URLs only, never astro:assets)
├── ResponsiveImage.astro (astro:assets wrapper, local images only: widths 384/512, sizes passthrough, eager? → eager/high-priority vs lazy/async)
├── NavLink.astro     (href + class passthrough <a>)
└── SpecItem.astro    (spec dt/dd cell: term + tone light|dark + wide? col-span-2 + valueClass override, value in slot)
```

```
src/components/organisms/ (all thinned to section composition — shells + grids only)
├── Hero.astro            (section shell + blobs + 12-col grid) ──► molecules/{SectionHeader,HeroBullets,HeroActions,HeroMediaCard}
├── Challenges.astro      (section shell + 7/5 grid) ──► molecules/{SectionHeader,FeatureList,MediaWithTags}
├── Testimonials.astro    (section shell + header + card/divider grid) ──► molecules/{SectionHeader,TestimonialCard} + atoms/DividerImage + data/testimonials
├── Products.astro        (section shell + split row + strip) ──► molecules/{SectionHeader,ProductPanel ×2,FormulaStrip}
├── ContactSection.astro  (section shell + backdrop + 12-col grid, no inline script) ──► molecules/{SectionHeader,ContactBackdrop,ContactForm,FaqAccordion,ContactMedia,DisclaimerNote}
├── Header.astro          (border-b shell) ──► molecules/PrimaryNav
└── Footer.astro          (border-t shell) ──► molecules/FooterMeta
```

```
src/components/molecules/
├── ContactForm.tsx (client:load island: shell + validation/submit, children plain React in its bundle)
│   ├── FormRow.tsx ×2 (grid wrapper) ──► atoms/Input ×2 each
│   ├── InterestPicker.tsx ──► atoms/Checkbox ×3
│   ├── FormSuccess.tsx ──► atoms/Button (reset)
│   └── atoms/{Input,Textarea,Button} direct + store/contact
├── TestimonialCard.astro (static: Card C1 + Avatar + bare Icon + footer) ──► atoms/{Card,Avatar,Icon} + data/testimonials (type-only)
├── SectionHeader.astro (eyebrow? + title string/slot + subtitle string/slot + align left|center; level preserved via slot) ──► atoms/Eyebrow
├── HeroBullets.astro (bullets const inside) ──► atoms/Icon ×5
├── HeroActions.astro (2-Button CTA group) ──► atoms/Button ×2
├── HeroMediaCard.astro (glass image + credential chip inner markup) ──► atoms/{ResponsiveImage,Icon ×2} + assets/hero
├── FeatureList.astro (features const inside) ──► molecules/FeatureRow ×3
├── FeatureRow.astro (Icon + title + desafío/solución) ──► atoms/Icon
├── MediaWithTags.astro (tilted image + gradient + 2 absolute tags) ──► atoms/{ResponsiveImage,Badge ×2} + assets/challenges
├── ProductPanel.astro (tone light|dark: backdrop + header + SpecGrid + CTA + vertical pill; SPECS const inside) ──► atoms/{ResponsiveImage,Button,Badge} + molecules/SpecGrid + assets/products
├── SpecGrid.astro (tone + items → SpecItem grid) ──► atoms/SpecItem
├── FormulaStrip.astro (static formula banner)
├── FaqAccordion.astro (glass panel + header + single-open exclusivity script; faqs const inside) ──► molecules/FaqItem ×3 + atoms/Icon
├── FaqItem.astro (details/summary + bare Icon) ──► atoms/Icon
├── ContactBackdrop.astro (static blobs + BIOSEGURIDAD massive type)
├── ContactMedia.astro ──► atoms/ResponsiveImage + assets/contact
├── DisclaimerNote.astro ──► atoms/Icon
├── FormRow.tsx (grid wrapper, React children only)
├── InterestPicker.tsx ──► atoms/Checkbox ×3
├── FormSuccess.tsx ──► atoms/Button
├── PrimaryNav.astro ──► molecules/ContactLinks + atoms/NavLink + data/site-config (via ContactLinks)
├── ContactLinks.astro (phone + email pair, multiple roots) ──► atoms/NavLink ×2 + data/site-config
└── FooterMeta.astro (© + links row) ──► molecules/ContactLinks + data/site-config (BUSINESS_DATA)
```

`Layout.astro` loads Material Symbols Outlined (FILL 0..1) for Icon/Badge/Eyebrow.
`Card` C1 is reachable via `Testimonials` on `/` (`#section-3`) + the
`design-system` showcase. Badge `feature` + Button `product` are reachable
via `Products` on `/` (`#section-4`); Badge tag + Icon orange + Eyebrow are
reachable via `Challenges` (`#desafios`) + `Hero` on `/`; Checkbox is reachable
via `ContactForm` on `/` + `/contact`. Button `href` anchors are live targets
(`#section-3` Testimonials, `#section-4` Products, `#section-5` contact section
on `/`, `#desafios` Challenges). `atoms.astro` showcase page was temporary and deleted the same day.

## Shared shell (Layout)

```
Layout.astro
├── styles/global.css (tailwind v4 theme, single import)
├── astro:transitions ClientRouter (default fallback)
├── <slot name="seo"/> ← per-page PageSEO
├── organisms/Header.astro (border-b shell)
│   └── molecules/PrimaryNav.astro
│       ├── atoms/NavLink.astro (brand + /about + /contact)
│       └── molecules/ContactLinks.astro ──► atoms/NavLink ×2 + data/site-config (PHONES, EMAIL)
├── <slot/> = page content
└── organisms/Footer.astro (border-t shell)
    └── molecules/FooterMeta.astro
        ├── data/site-config (BUSINESS_DATA)
        └── molecules/ContactLinks.astro (see above)
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
- `data/testimonials.ts` — TESTIMONIALS (`as const` ×3: quote/name/role/accent/avatar) + `Testimonial`/`TestimonialAccent` types (testimonials section only)
- `src/consts.ts` — SITE_TITLE, SITE_DESCRIPTION (SEO fallback)
- `styles/global.css` — tailwind v4 + tw-animate-css + `@theme inline` tokens
  (17 colors, see `docs/design-tokens.md`: hero set + `04-products` set minus
  pruned dead tokens + `error` + `--shadow-card/media`;
  `05-contact-form` set: font-impact, text-massive (12vw/0.8/900/-0.05em);
  effects: tilt-float/blob/shadow-ambient/glass-panel + hud-panel/hud-panel-dark/
  writing-vertical/image-pan + glass-panel-heavy/organic-blob-1-2/deep-float-shadow/
  floating-element/z-stack-1-2-3 with reduced-motion guard)
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
- Challenges section (`add-challenges-section`): `organisms/Challenges.astro` replicates `design/stitch/02-challanges` (content card 7-col + tilted media card 5-col, `lg:-ml-16`, hover lift via `tilt-float` — Stitch's static `-rotate-3` dropped after live measurement showed ~22px badge-text clip at 1024–1280px; offsets `-ml-6`/`-mr-6` = `px-gutter`, verified 0px overflow/clip at 390/768/1024/1280/1440); feature-row Icons are `circle orange lg` (w-12 in Stitch = our `lg`, doc previously said `md` — corrected here and in `atoms-page-global-components.md`); media image is a 512px Stitch placeholder (`src/assets/challenges/`, landscape JPEG cropped via `object-cover` in the `aspect-[4/5]` card, lazy, widths capped at native 512/384); no `Card C1`/`Button`/island in this section.
- Testimonials section (`add-testimonials-section`, merged from `feature/testimonials`): `organisms/Testimonials.astro` = `03-testimonials` (E2 eyebrow `EVIDENCIA CLÍNICA` + 3-col grid of `molecules/TestimonialCard.astro` over `data/testimonials.ts`, Stitch verbatim ES copy); merge kept main's newer `Hero` (`max-w-[28rem]` card fix), `ContactForm` (`max-w-[32rem]`), `global.css` (products tokens + HUD/image-pan effects) and `hero-section` spec. `id` collision resolved by narrative order: Testimonials keeps `section-3`, Products moved to `section-4`, Hero secondary CTA (`Ver línea Tópico`) retargeted `#section-3` → `#section-4`.
- Contact section (`add-contact-section`): `organisms/ContactSection.astro` replicates `design/stitch/05-contact-form` content (blob background + `BIOSEGURIDAD` massive type + in-flow header flattened from the Stitch `lg:absolute` overlay per Products precedent) as a simplified static grid in the standard `max-w-max-width` container — left column stacking FAQ + image + disclaimer, right column with the `ContactForm` island at full height; mild skew tilts, no overlap, float disabled (follow-up simplifications of the absolute overlap machine). Deviations from Stitch, all decided in explore: submit is voted `Button primary sm` + `arrow_forward` span (B5-large dropped; span not `Icon` atom — React island boundary); disclaimer sits beside the image in row 2 and stacks visible on mobile (Stitch `hidden lg:flex` dropped — compliance copy). Verified 0px overflow at 390/768/1024/1280/1440 on both `/` and `/contact` (headless, incl. FAQ exclusivity, island hydration, ES validation errors). Contact image is a `src/assets/contact/` placeholder (byte-reuse of the products crop, `TODO(replace)` in README); swap files with no markup change when brand art lands. `ContactForm` shell is now glass grid (`FormRow` `md:grid-cols-2`, pill group, `rows=3`, `flex justify-end` submit) and fully ES (island + store fallbacks + both page headings — the "labels partly EN" note is closed).
- Organism decomposition (`split-organism-sections`, 2026-09-10): all 7 organisms thinned to section composition; 21 new molecules + 5 new atoms (see catalogues above). Decisions: single `SectionHeader` (title/subtitle as string props or slots — slots preserve `h1#hero-heading`, section `h2` ids, and the contact gradient span; eyebrow optional since Products/Contact headers have none); single `ProductPanel tone="light"|"dark"` (SPECS const + pill text inside the panel; mirrors Button `product tone` precedent); `FaqAccordion` owns the single-open exclusivity script (scoped `[data-faq]`, no inline script in organism); `ResponsiveImage` wraps `astro:assets` for local images only while `Avatar`/`DividerImage` stay plain `<img>` (external Unsplash/picsum URLs); `SpecItem wide?` covers the col-span-2 Presentaciones cell; single-use data consts (`bullets`, `features`, `faqs`) live inside their molecules, `DIVIDERS` URLs stay in Testimonials and pass as `src` props; grid placement classes stay at organism call sites via `class` passthrough (molecules own only their own look); molecule→molecule edges are parent→child composition only (ContactForm→FormRow trio, FaqAccordion→FaqItem, FeatureList→FeatureRow, ProductPanel→SpecGrid, PrimaryNav/FooterMeta→ContactLinks), acyclic; `NavLink` adopted in `contact.astro` intro + `404.astro` sitemap nav. `design-system.astro`/`_demos.tsx` + `about.astro` untouched by design. Pixel-identical output verified via build + content spot-checks.
- Dev-only pages (`dev-only-pages`): `src/dev-pages/design-system.astro` + `_demos.tsx` moved out of `src/pages/` (git rename, no content change — `./_demos` relative import intact); `src/integrations/dev-only-pages.ts` injects top-level `*.astro` as `/<basename>` via `injectRoute` only when `command === 'dev'` (registered in `astro.config.mjs`); prod `dist/` has no `design-system/` output (nginx 404), sitemap lists prod routes only, `robots.txt` unchanged. New dev page = drop a file in `src/dev-pages/` (flat, `_*` = helper). Verified via hook simulation (dev injects `/design-system`, build/preview/sync inject nothing) + `pnpm build` green at 4 pages.
- Centralized palette (`centralize-color-palette`, 2026-09-10): all component/page/layout colors now resolve to `@theme` tokens (see `docs/design-tokens.md`); no import/file moves — trees above unchanged. Decisions: deleted 5 dead tokens + folded `primary-fixed-dim` into `secondary-fixed` (one blurred hero blob); new `error` (`#b3261e`) + `--shadow-card/media` tokens; `white`→`on-primary`, `black`→`inverse-surface`, hairline `gray-100`→`surface-container-highest`; fixed dead `font-headline-sm text-headline-sm` in `FaqAccordion` (remapped to `body-lg` bold). Known micro-deltas vs pixel-identical: `Button`/`Card` shadows now use `.shadow-ambient` (adds a soft second layer), `hover:bg-black` is now `on-surface` (`#1a1c1f`). Guardrail: `pnpm run check:palette` (advisory) + `AGENTS.md` palette law.

## Related

- [[component-dependencies-guide]]
- [[astro-atomic-components]]
- [[astro-react-islands]]
- [[astro-site-config]]
- [[astro-seo]]
