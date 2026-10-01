---
created: 2026-09-06
updated: 2026-09-30
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

File-based routing, SSG (`output` default `static`, no SSR adapter). One content collection (`avatars`, JSON + co-located images). No catch-all beyond `[slug]`, no i18n.

```
src/pages/ (prod routes — everything here ships in dist/ + sitemap)
├── index.astro       ← dummy placeholder (single <h1>, noindex, excluded from sitemap)
├── [slug].astro      ← avatar pages: getStaticPaths over `avatars` collection
│                        → /dr-resultados, /socio-crecimiento, /ingeniero-eficiencia,
│                          /guardian-de-aire, /estratega-de-fauna, /dueno-responsable
├── about.astro       ← static content page
├── aviso-de-privacidad.astro ← build-time Markdown privacy notice (client-provided, frozen)
├── politica-de-cookies.astro ← build-time Markdown cookie policy (`footer-legal-pages`)
├── terminos.astro ← build-time Markdown channel terms (`footer-legal-pages`)
├── contact.astro     ← branded H1 (SectionHeader h1) + ContactSection organism (DEFAULT_CONTACT)
├── 404.astro         ← branded ES not-found (SectionHeader h1 + B2/B3 CTAs + sitemap), flex-1 centered
└── robots.txt.ts     ← API route (dynamic robots.txt), no components

src/content/avatars/es/<slug>/ (content collection source — not a route)
├── page.json         ← per-avatar content (hero, challenges, testimonials, products, contact, seo)
└── *.webp + gallery/ ← co-located images (resolved via the collection `image()` helper)

src/dev-pages/ (dev-only — injected via devOnlyPages() on `astro dev`,
never emitted to dist/, never in sitemap; add top-level *.astro for a new
dev route, `*_` files are helpers)
├── design-system.astro ← dev showcase: all atoms + variants (see below)
└── _demos.tsx        ← page-local React island for design-system (demo store, never a route)
```

## Full dependency diagram

Pages are few, so per-page trees below are the reference. Overview:

```
┌──────────────────────────────────────────────┐
│  index / about / contact / aviso / cookies / terminos / 404 (.astro)      │
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

### index.astro tree (dummy placeholder)

```
index.astro
├── Layout.astro ──► shared shell (lang="es")
├── seo/PageSEO.astro (currentPage="home", noindex, slot="seo")
└── <h1>vetoxzyn</h1> (no organisms — the marketing landing moved to /dr-resultados)
```

### [slug].astro tree (avatar pages — one row per content entry)

```
[slug].astro
├── getStaticPaths ──► getCollection("avatars") + lib/avatars.toPageData
├── Layout.astro ──► shared shell (lang="es")
├── seo/PageSEO.astro (currentPage=<slug>, title/description from page.seo, slot="seo")
├── organisms/Hero.astro data=<HeroData>
│   ├── molecules/SectionHeader.astro (eyebrow + h1#hero-heading + subtitle from data)
│   ├── molecules/HeroBullets.astro labels=<string[]> ──► atoms/Icon ×N (global icons)
│   ├── molecules/HeroActions.astro (labels from data; hrefs via data/section-ids)
│   └── molecules/HeroMediaCard.astro image/alt/overlay from data ──► atoms/ResponsiveImage + atoms/Icon ×2
├── organisms/Challenges.astro data=<ChallengesData>
│   ├── molecules/SectionHeader.astro (eyebrow + h2#challenges-heading + subtitle from data)
│   ├── molecules/FeatureList.astro features=<...> ──► molecules/FeatureRow.astro ×N (global icons)
│   └── molecules/MediaWithTags.astro image/alt/badges from data ──► atoms/ResponsiveImage + atoms/Badge ×2
├── organisms/Testimonials.astro data=<TestimonialsData>
│   ├── molecules/SectionHeader.astro (eyebrow + h2 + subtitle from data)
│   ├── molecules/TestimonialCard.astro ×2|3 (quote/name/optional role/accent/avatar from data)
│   └── atoms/DividerImage.astro (optional, from data.divider)
├── organisms/Products.astro data=<ProductsData> slug=<slug>
│   ├── molecules/SectionHeader.astro (title + subtitle from data)
│   ├── molecules/ProductPanel.astro ×1|2 (title/tagline/image from data; specs + pill from data/products.ts; single line → full-width)
│   ├── molecules/ProductGallery.tsx (client:visible; gallery glob filtered to the avatar folder)
│   └── molecules/FormulaStrip.astro (global formula banner)
└── organisms/ContactSection.astro data=<ContactData>
    ├── molecules/SectionHeader.astro (eyebrow + h2#contact-heading + subtitle from data)
    ├── molecules/ContactBackdrop.astro word=<data.backdropWord>
    ├── molecules/ContactForm.tsx copy=<data.form> (client:load; per-avatar labels/placeholders/errors; store/contact injects error copy)
    ├── molecules/FaqAccordion.astro faqs=<data.faq>
    ├── molecules/ContactMedia.astro image/alt from data
    └── molecules/DisclaimerNote.astro (global disclaimer)
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
└── organisms/ContactSection.astro ──► same subtree as index.astro (+ `page-title` slot outlet)
    └── molecules/SectionHeader.astro slotted in by the page (level="h1" string title "Contáctanos" — first page-level use)
```

### about.astro tree

```
about.astro
├── Layout.astro ──► shared shell (see below)
└── seo/PageSEO.astro ──► SEO chain (see below)
```

### aviso-de-privacidad.astro tree

```
aviso-de-privacidad.astro
├── Layout.astro ──► shared shell (lang="es")
├── seo/PageSEO.astro ──► SEO chain (currentPage="privacy")
└── atoms/Markdown.astro ──► lib/markdown + data/privacy-notice.md
```

### politica-de-cookies.astro tree (`footer-legal-pages`)

```
politica-de-cookies.astro
├── Layout.astro ──► shared shell (lang="es")
├── seo/PageSEO.astro ──► SEO chain (currentPage="cookies")
└── atoms/Markdown.astro ──► lib/markdown + data/cookies-policy.md
```

### terminos.astro tree (`footer-legal-pages`)

```
terminos.astro
├── Layout.astro ──► shared shell (lang="es")
├── seo/PageSEO.astro ──► SEO chain (currentPage="terms")
└── atoms/Markdown.astro ──► lib/markdown + data/terms.md
```

### 404.astro tree

```
404.astro
├── Layout.astro ──► shared shell (see below)
├── seo/PageSEO.astro ──► SEO chain (see below, ES title/desc)
├── molecules/SectionHeader.astro (E2 eyebrow "Error 404" + h1#not-found-heading + ES subtitle, align center)
├── atoms/Button.tsx ×2 (primary md href="/" + secondary md href="/contact", static — no client: directive)
└── atoms/NavLink.astro ×3 (ES sitemap nav: Inicio /, Nosotros /about, Contacto /contact)
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
├── Button.tsx    (React, variant primary|secondary|product, size md|sm, tone light|dark for product, optional href → renders <a> with identical classes + explicit cursor-pointer; all variants token-colored + .lift + active:scale-[.98] + disabled:opacity/cursor-not-allowed, pointer via base layer) ──► lib/utils
├── Input.tsx     (F1 underline, store-bound, optional idPrefix → label-associated id, hover:border-on-surface/30, token-timed, focus ring via base) ──► store/useField ──► store/contact
├── Textarea.tsx  (F3 glass, store-bound, optional idPrefix → label-associated id, hover:border-on-surface/30, token-timed, focus ring via base) ──► store/useField ──► store/contact
├── Checkbox.tsx  (F2 pill, store-bound, optional idPrefix → label-associated id, cursor-pointer on label + input, token-timed wash; `label: React.ReactNode` so consent rows embed inline links; error span `text-error` when invalid) ──► store/useField ──► store/contact
├── Icon.astro    (I1 circle default; variant bare, tone pink|orange|primary|green, size md|lg — GAP-A; deliberately motionless — parent containers own the motion)
├── Badge.astro   (P1 feature | P2 tag with tone dark|primary|light + icon — GAP-B; .hover-subtle, pointer-free)
├── Eyebrow.astro (E2, static; .hover-subtle, pointer-free)
├── Card.astro    (C1 glass shell, static; .hover-subtle, pointer-free)
├── Avatar.astro      (wrapper div owning outer cls + .hover-subtle; astro:assets Image [96,192] for ImageMetadata src, plain-<img> fallback for string src; h-24 rounded-full bordered; decoding async; pointer-free)
├── DividerImage.astro (Picture AVIF+WebP, local images only: widths [200,400], sizes `(max-width: 768px) 100vw, 5vw`, lazy/async; hover via pictureAttributes so .hover-subtle stays off the inner <img>; pointer-free)
├── ResponsiveImage.astro (Picture AVIF+WebP wrapper, local images only: widths prop with per-slot defaults, sizes passthrough, eager? → eager/high-priority/decoding-async vs lazy/async)
├── NavLink.astro     (.link + explicit cursor-pointer <a>: color + underline-offset hover, focus-visible parity; optional target/rel passthrough for new-tab external links)
├── Markdown.astro    (build-time marked renderer with heading anchors and external-link behavior)
├── SpecItem.astro    (spec dt/dd cell: term + tone light|dark + wide? col-span-2 + valueClass override, value in slot; .hover-subtle, pointer-free)
└── BrandLogo.astro   (Picture AVIF+WebP single 600w of src/assets/brand/logo.webp 600×244, alt vetoxzyn, caller height class + w-auto ratio lock, loading/fetchpriority/decoding-async props; pointer-free)
```

```
src/components/organisms/ (all thinned to section composition — shells + grids only;
  home five carry scoped GSAP <script> blocks importing lib/gsap + VT lifecycle
  guard/revert/page-load/after-swap, roots tagged transition:animate="none")
├── Hero.astro            (section shell + blobs + 12-col grid) ──► molecules/{SectionHeader,HeroBullets,HeroActions,HeroMediaCard} + lib/gsap
├── Challenges.astro      (section shell + 7/5 grid) ──► molecules/{SectionHeader,FeatureList,MediaWithTags} + lib/gsap
├── Testimonials.astro    (section shell + prop-driven 2|3 card/divider grid) ──► molecules/{SectionHeader,TestimonialCard} + atoms/DividerImage + lib/{testimonials,gsap}
├── Products.astro        (section shell + grid + overlap gallery strip; feathered backdrop-blur softens the light/dark seam behind the strip) ──► molecules/{SectionHeader,ProductPanel ×2,ProductGallery,FormulaStrip} + lib/gsap + astro:assets (getImage) + assets/gallery
├── ContactSection.astro  (section shell + backdrop + 12-col grid, GSAP reveal script only — no other inline script) ──► molecules/{SectionHeader,ContactBackdrop,ContactForm,FaqAccordion,ContactMedia,DisclaimerNote} + lib/gsap
├── Header.astro          (border-b shell) ──► molecules/PrimaryNav
└── Footer.astro          (border-t shell) ──► molecules/FooterMeta
```

```
src/components/molecules/
├── ContactForm.tsx (client:load island: shell + validation/submit, wrapper #contacto-formulario, children plain React in its bundle)
│   ├── FormRow.tsx ×2 (grid wrapper) ──► atoms/Input ×2 each
│   ├── InterestPicker.tsx (idPrefix passthrough) ──► atoms/Checkbox ×3
│   ├── FormSuccess.tsx ──► atoms/Button (reset)
│   ├── atoms/Checkbox (consent `aceptaAviso`, rich label with aviso/cookie links — `footer-legal-pages`)
│   └── atoms/{Input,Textarea,Button} direct + store/contact
├── TestimonialCard.astro (static: Card C1 + Avatar + bare Icon + footer) ──► atoms/{Card,Avatar,Icon} + lib/testimonials (type-only)
├── SectionHeader.astro (eyebrow? + title + titleClass extras + level h1|h2 + id + subtitle + align left|center; locked SECTION_TITLE_CORE for both levels, title slot only for inline markup reusing the core) ──► atoms/Eyebrow
├── HeroBullets.astro (bullets const inside) ──► atoms/Icon ×5
├── HeroActions.astro (2-Button CTA group: primary → #contacto-formulario, secondary → #productos) ──► atoms/Button ×2 + data/section-ids
├── HeroMediaCard.astro (glass hero image) ──► atoms/ResponsiveImage + assets/hero
├── FeatureList.astro (features const inside) ──► molecules/FeatureRow ×3
├── FeatureRow.astro (Icon + title + desafío/solución; .hover-subtle, pointer-free) ──► atoms/Icon
├── MediaWithTags.astro (tilted image + gradient + 2 absolute tags) ──► atoms/{ResponsiveImage,Badge ×2} + assets/challenges
├── ProductPanel.astro (tone light|dark: backdrop + header + SpecGrid + CTA href="#contacto-formulario" + vertical pill; SPECS const inside) ──► atoms/{ResponsiveImage,Button,Badge} + molecules/SpecGrid + data/section-ids + assets/products
├── ProductGallery.tsx (client:visible island, presentational: slides, presentation labels, + sizes string props only; Swiper core CSS + Autoplay module, calm loop, breakpoints, reduced-motion gate + offscreen pause; white product plates with decorative volume cintillos; region carrusel, Spanish aria-label, no headings) ──► swiper/{react,modules,css} (no Navigation/Pagination)
├── SpecGrid.astro (tone + items → SpecItem grid) ──► atoms/SpecItem
├── FormulaStrip.astro (static formula banner)
├── FaqAccordion.astro (glass panel + header + single-open exclusivity script; faqs const inside; root #contacto-faq) ──► molecules/FaqItem ×3 + atoms/Icon + data/section-ids
├── FaqItem.astro (cursor-pointer on summary only + token-timed wash + focus-visible ring + marker normalization + bare Icon) ──► atoms/Icon
├── ContactBackdrop.astro (static blobs + BIOSEGURIDAD massive type)
├── ContactMedia.astro (.hover-subtle, pointer-free) ──► atoms/ResponsiveImage + assets/contact
├── DisclaimerNote.astro (.hover-subtle, pointer-free) ──► atoms/Icon
├── FormRow.tsx (grid wrapper, React children only)
├── InterestPicker.tsx (optional idPrefix passthrough) ──► atoms/Checkbox ×3
├── FormSuccess.tsx ──► atoms/Button
├── PrimaryNav.astro ──► atoms/{NavLink,BrandLogo h-20 eager} (no ContactLinks — orphan since 2026-09-23)
├── ContactLinks.astro (ORPHAN, retained for future use: static phone + email spans, no links) ──► data/site-config (PHONES.formatted, EMAIL.address)
└── FooterMeta.astro (BrandLogo h-16 lazy + Montserrat wordmark + 6-NavLink centered-stack→sm-row with grouped · separators, page container — `footer-legal-pages`) ──► atoms/{NavLink ×6,BrandLogo} + data/site-config (PHONES)
```

`Layout.astro` loads Material Symbols Outlined (FILL 0..1) for Icon/Badge/Eyebrow.
`Card` C1 is reachable via `Testimonials` on `/` (`#testimonios`) + the
`design-system` showcase. Badge `feature` + Button `product` are reachable
via `Products` on `/` (`#productos`); Badge tag + Icon orange + Eyebrow are
reachable via `Challenges` (`#desafios`) + `Hero` (`#inicio`) on `/`; Checkbox is reachable
via `ContactForm` on `/` + `/contact`. Button `href` anchors are live targets
(`#testimonios` Testimonials, `#productos` Products / Hero secondary CTA, `#contacto` contact section
on `/` / `/contact`, `#desafios` Challenges, `#inicio` Hero, plus `#contacto-formulario` form wrapper
(targeted by the hero primary + both product `Más información` CTAs) / `#contacto-faq` sub-anchor). `atoms.astro` showcase page was temporary and deleted the same day.

## Shared shell (Layout)

```
Layout.astro (flex-shell: body `flex min-h-dvh flex-col`, main `flex flex-1 flex-col` — short pages pin the footer, tall content grows normally)
├── styles/global.css (tailwind v4 theme, single import + `.page-bg` fixed wash + `.js-reveal`/`.no-js` GSAP fallback)
├── <html class="no-js"> + is:inline swap to `js` (GSAP no-JS fallback switch)
├── astro:transitions ClientRouter (default fallback)
├── `.page-bg` fixed decorator wash (first `<body>` child, `aria-hidden`, behind Header/slot/Footer)
├── <slot name="seo"/> ← per-page PageSEO
├── organisms/Header.astro (border-b shell)
│   └── molecules/PrimaryNav.astro
│       ├── atoms/NavLink.astro ×3 (logo-home + /about + /contact)
│       │   └── (NavLink also renders ContactLinks wa.me phone new-tab + email)
│       ├── atoms/BrandLogo.astro (h-20 eager high-priority ──► src/assets/brand/logo.webp via Picture)
│       └── molecules/ContactLinks.astro ──► atoms/NavLink ×2 + data/site-config (PHONES.wa, EMAIL)
├── <slot/> = page content
└── organisms/Footer.astro (border-t shell)
    └── molecules/FooterMeta.astro
        ├── atoms/BrandLogo.astro (h-16 lazy ──► src/assets/brand/logo.webp via Picture)
        └── atoms/NavLink.astro ×6 (phone wa.me new-tab via PHONES, Contacto /contact, Aviso /aviso-de-privacidad, Canal /contact, Cookies /politica-de-cookies, Términos /terminos) ──► data/site-config (PHONES)
```

## Optional chains

### SEO chain

```
PageSEO.astro ─► seo/BaseSEO.astro (og:image width/height/secure_url/alt + JSON-LD logo via getImage())
                 ├── astro:assets getImage (logo URL from BUSINESS_DATA.logo ImageMetadata)
                 ├── consts.ts (SITE_TITLE, SITE_DESCRIPTION)
                 └── data/site-config.ts (BUSINESS_DATA, logo = imported src/assets/brand/logo.webp ImageMetadata)
```

Single-language only: no i18n, no hreflang, canonical from `BUSINESS_DATA.url + pathname`, `og:locale` hardcoded `en_US`.

### Islands (React)

| Island | Mount | Binds to |
|---|---|---|
| `molecules/ContactForm.tsx` | `client:load` on `/` and `/contact` | `store/contact` (fields + submit), `store/useField` via atoms |
| `molecules/ProductGallery.tsx` | `client:visible` on `/` (inside Products) | nothing (presentational URL props from Products frontmatter; no store) |

One instance per page; surrounding content stays static Astro HTML. Submit is fully client-side (`preventDefault`, never native form navigation, so ClientRouter swaps don't interfere). Zustand `persist` (`vetoxzyn-contact-storage`) survives reloads and VT navigations.

### i18n

Not present (single language — see design Non-Goals).

### Design-system / showcase page

None.

## Shared leaf layer

- `lib/utils.ts` — `cn()` class joiner (atoms only) + `toKebab()` field→id fragment (form atoms: `idPrefix` + kebab(`field`), label-associated)
- `lib/gsap.ts` — SSR-safe GSAP entry (registerPlugin + ScrollTrigger.config + gsap.defaults + `load`/`astro:page-load` refresh); imported by the 5 home organism scripts + the two pattern helpers below (gsap chunk shared/cached)
- `lib/kinetic-marquee.ts` — infinite-marquee factory (pattern only, no host wired) ──► lib/gsap (+ gsap/ModifiersPlugin)
- `lib/animate-counters.ts` — `data-value` stat-counter helper (pattern only, no stats wired) ──► lib/gsap
- `data/site-config.ts` — PHONES (`922 223 1006`, `tel:+529222231006`, `wa.me/529222231006`), EMAIL (`grupohocliva@gmail.com`), ADDRESS (Minatitlán domicile, `MX`), SOCIAL_LINKS, GOOGLE_MAPS, BUSINESS_HOURS, BUSINESS_DATA (`legalName: "GRUPO HOCLIVA SAS"`, `as const`; logo = imported `src/assets/brand/logo.webp` ImageMetadata). Only consumers: `BaseSEO` (BUSINESS_DATA) + orphan `ContactLinks` (formatted/address); footer renders no phone/email.
- `data/section-ids.ts` — SECTION_IDS (`as const`: inicio, desafios, testimonios, productos, contacto, contactoFormulario, contactoFaq); single source of truth for section anchors — organisms + CTA molecules import from here, never hardcode
- `lib/testimonials.ts` — shared `Testimonial`/`TestimonialAccent` props contract for 2- or 3-record sections
- `data/testimonials.ts` — TESTIMONIALS (`as const` ×2: quote/name/role/accent/avatar as imported `ImageMetadata` from `src/assets/testimonials/`), satisfying `lib/testimonials` types
- `src/consts.ts` — SITE_TITLE, SITE_DESCRIPTION (SEO fallback)
- `styles/global.css` — tailwind v4 + tw-animate-css + `@theme inline` tokens
  (17 colors, see `docs/design-tokens.md`: hero set + `04-products` set minus
  pruned dead tokens + `error` + `--shadow-card/media`;
  `05-contact-form` set: font-impact, text-massive (12vw/0.8/900/-0.05em);
  interaction-feedback set (`unified-hover-cursor`): `--duration-hover` 250ms +
  `--ease-hover` spring-lite, `@layer base` cursor restore (button/role-button/summary),
  `:disabled` not-allowed, shared `:focus-visible` ring, summary marker normalization,
  shared `.lift` / `.link` / `.hover-subtle` hover language;
  effects: tilt-float/blob/shadow-ambient/glass-panel + hud-panel/hud-panel-dark/
  writing-vertical/image-pan + glass-panel-heavy/organic-blob-1-2/deep-float-shadow/
   floating-element/z-stack-1-2-3 with reduced-motion guard incl. contact-panel straighten)
    + page-background set (`.page-bg` fixed wash + `html,body` surface-ice fallback +
    header/main/footer z-1 context) + smooth-scroll set (`html scroll-behavior: smooth`,
    reduced-motion `auto`)
- `store/contact.ts` — contactSchema (Zod: name/email/message required + clinica/telefono
  optional strings + lineaTopico/lineaInstalaciones/lineaDistribucion booleans + `aceptaAviso` consent boolean refined to `true` — `footer-legal-pages`), field map,
  setField/validateAll/reset, persist (consent excluded from storage and POST payload)
- `store/useField.ts` — hydration-safe field hook (injectable into atoms)
- `lib/api/client.ts` — `safeFetch` + `FetchError` (scaffold, no callers yet)
- `lib/api/types.ts`, `lib/api/constants.ts` — shared API types/messages (scaffold)

## Notes

- Hybrid hero (`recreate-hero-section`): `organisms/Hero.astro` = `01-hero-layout`
  shell (blobs, 12-col 7+5, bottom avatar overlay) + `01-hero-bullet-list` Icon
  rows ×5 (bullets replace the badges row — same 5 items, no duplication).
  React `Button` inside static Astro MUST use `className`, never `class`.
- Hero, Challenges, Contact and Products images are AI masters (`replace-stock-images`): single high-res source per slot (no `-384/-512` variants), responsive widths per slot (Hero/Challenges/Contact/Products as above, Dividers via DividerImage); zero external hotlinks — avatars are pipelined `src/assets` imports (`image-optimization-pipeline`), not Unsplash.
- Image pipeline (`image-optimization-pipeline`): `ResponsiveImage`/`DividerImage`/`BrandLogo` render `Picture` AVIF+WebP, `Avatar` renders `Image [96,192]`; encoders pinned in `astro.config.mjs` (`image.service`: webp 80 / avif 70, `limitInputPixels:false`); `public/` holds stable-URL meta only (`og-image.jpg`, favicons) — see `docs/astro-image-optimization.md`.
- Products (`add-products-section`): `organisms/Products.astro` = `04-products`
  split (in-flow h2 header flattened from the absolute overlay + light Tópico /
  dark Instalaciones panels + formula banner). Vertical pills are glass `Badge
  feature` (intentional P3-drop restyle over the design's solid pills); HUD
  panels bespoke (C1 is light-only). Product images are hero-reuse placeholders
  (`src/assets/products/`, see README, lazy widths 384/512); swap files with no
  markup change when brand art lands. Product CTAs are `Más información` → `#contacto-formulario`
  (`fix-links-ctas`); the hero secondary (`Ver línea Tópico`) keeps `#productos` as the deliberate exemption.
- Initial setup (`initial-landing-setup`): vanilla-only atoms per `astro-atomic-components` (no `ui/`, no `Validated*`); single Zustand `contact` store (not generic `form.ts`) until a second form exists.
- Business values in `site-config.ts` (`footer-legal-pages`, 2026-09-30): phone `922 223 1006` (`tel:+529222231006`, `wa.me/529222231006`), email `grupohocliva@gmail.com`, Minatitlán domicile, `legalName: "GRUPO HOCLIVA SAS"` — the frozen aviso identity; maps and hours stay placeholders (`TODO(replace)`). Supersedes the `fix-links-ctas` 461 values above (history kept).
- No `PUBLIC_*` env vars exist; Dockerfile ships zero `ARG/ENV` pairs by design.
- Hero/section images: none yet (placeholder SVG not used — Astro won't rasterize SVG via `Image`); any future raster image MUST use the wrapper atoms (`ResponsiveImage`/`DividerImage`, AVIF-first `Picture`, widths+sizes, eager hero / lazy rest) — see `docs/astro-image-optimization.md`.
- **Orphaned / not reachable from any page**: `molecules/ContactLinks.astro` (static phone/email spans, retained for future use) + `molecules/FormulaStrip.astro` (see below). Template `Welcome.astro` deleted during setup. `src/assets/astro.svg` unused (harmless template leftover, remove when real brand art lands).
- Challenges section (`add-challenges-section`): `organisms/Challenges.astro` replicates `design/stitch/02-challanges` (content card 7-col + tilted media card 5-col, `lg:-ml-16`, hover lift via `tilt-float` — Stitch's static `-rotate-3` dropped after live measurement showed ~22px badge-text clip at 1024–1280px; offsets `-ml-6`/`-mr-6` = `px-gutter`, verified 0px overflow/clip at 390/768/1024/1280/1440); feature-row Icons are `circle orange lg` (w-12 in Stitch = our `lg`, doc previously said `md` — corrected here and in `atoms-page-global-components.md`); media image is a 512px Stitch placeholder (`src/assets/challenges/`, landscape JPEG cropped via `object-cover` in the `aspect-[4/5]` card, lazy, widths capped at native 512/384); no `Card C1`/`Button`/island in this section.
- Testimonials section (`add-testimonials-section`, merged from `feature/testimonials`): `organisms/Testimonials.astro` = `03-testimonials` (E2 eyebrow `EVIDENCIA CLÍNICA` + 3-col grid of `molecules/TestimonialCard.astro` over `data/testimonials.ts`, Stitch verbatim ES copy); merge kept main's newer `Hero` (`max-w-[28rem]` card fix), `ContactForm` (`max-w-[32rem]`), `global.css` (products tokens + HUD/image-pan effects) and `hero-section` spec. `id` collision resolved by narrative order: Testimonials keeps `section-3`, Products moved to `section-4`, Hero secondary CTA (`Ver línea Tópico`) retargeted `#section-3` → `#section-4`.
- Contact section (`add-contact-section`): `organisms/ContactSection.astro` replicates `design/stitch/05-contact-form` content (blob background + `BIOSEGURIDAD` massive type + in-flow header flattened from the Stitch `lg:absolute` overlay per Products precedent) as a simplified static grid in the standard `max-w-max-width` container — left column stacking FAQ + image + disclaimer, right column with the `ContactForm` island at full height; mild skew tilts, no overlap, float disabled (follow-up simplifications of the absolute overlap machine). Deviations from Stitch, all decided in explore: submit is voted `Button primary sm` + `arrow_forward` span (B5-large dropped; span not `Icon` atom — React island boundary); disclaimer sits beside the image in row 2 and stacks visible on mobile (Stitch `hidden lg:flex` dropped — compliance copy). Verified 0px overflow at 390/768/1024/1280/1440 on both `/` and `/contact` (headless, incl. FAQ exclusivity, island hydration, ES validation errors). Contact image is a `src/assets/contact/` placeholder (byte-reuse of the products crop, `TODO(replace)` in README); swap files with no markup change when brand art lands. `ContactForm` shell is now glass grid (`FormRow` `md:grid-cols-2`, pill group, `rows=3`, `flex justify-end` submit) and fully ES (island + store fallbacks + both page headings — the "labels partly EN" note is closed).
- Organism decomposition (`split-organism-sections`, 2026-09-10): all 7 organisms thinned to section composition; 21 new molecules + 5 new atoms (see catalogues above). Decisions: single `SectionHeader` (title/subtitle as string props or slots — slots preserve `h1#hero-heading`, section `h2` ids, and the contact gradient span; eyebrow optional since Products/Contact headers have none); single `ProductPanel tone="light"|"dark"` (SPECS const + pill text inside the panel; mirrors Button `product tone` precedent); `FaqAccordion` owns the single-open exclusivity script (scoped `[data-faq]`, no inline script in organism); `ResponsiveImage`/`DividerImage`/`BrandLogo` wrap `astro:assets Picture` and `Avatar` wraps `Image` (all local `src/assets`, no external image URLs); `SpecItem wide?` covers the col-span-2 Presentaciones cell; single-use data consts (`bullets`, `features`, `faqs`) live inside their molecules, `DIVIDERS` URLs stay in Testimonials and pass as `src` props; grid placement classes stay at organism call sites via `class` passthrough (molecules own only their own look); molecule→molecule edges are parent→child composition only (ContactForm→FormRow trio, FaqAccordion→FaqItem, FeatureList→FeatureRow, ProductPanel→SpecGrid, PrimaryNav/FooterMeta→ContactLinks), acyclic; `NavLink` adopted in `contact.astro` intro + `404.astro` sitemap nav. `design-system.astro`/`_demos.tsx` + `about.astro` untouched by design. Pixel-identical output verified via build + content spot-checks.
- Unified hover/cursor (`unified-hover-cursor`, 2026-09-10): no import/file/page changes (rg verified — trees above unchanged, class-only diff). Motion now token-driven (`--duration-hover`/`--ease-hover`); pointer via base layer + explicit `cursor-pointer` on `NavLink` and `Button` anchor branch; pressables on `.lift`, links on `.link`, display containers (`Badge`, `Eyebrow`, `Card`, `Avatar`, `SpecItem`, `FeatureRow`, `DisclaimerNote`, `ContactMedia`, `DividerImage`) on pointer-free `.hover-subtle`. Container rule: `Icon` glyphs and inner `ResponsiveImage` stay motionless so nested parents never double-animate (FAQ toggle icon no longer lifts inside its washing row); layout chrome (`SectionHeader`, `FormulaStrip`, product articles, backdrops, nav chrome) stays still. `FaqItem` pointer moved `details`→`summary` (former `outline-none` removed so the base focus ring shows); `Input`/`Textarea` dropped `outline-none` (same reason) and gained `hover:border-on-surface/30`; `ContactForm` straighten gated `motion-safe:`; `MediaWithTags` transition dedupe (tilt owns it); product image blend retimed to the token. Tradeoff: `.tilt-float` + `.hover-subtle` both match on tilted cards — tilt wins by source order, locked with a `ponytail:` comment in `global.css`.
- Headings + brand logo (`standardize-headings-and-brand-logo`, 2026-09-10): `SectionHeader` owns the canonical title core (`SECTION_TITLE_CORE` const, identical Montserrat 32px → 64px for h1+h2, `titleClass` extras-only, new `id` prop); Hero/Challenges/Testimonials/Products moved to string titles (tags/anchors kept), Contact keeps the gradient `title` slot on the imported const. New `atoms/BrandLogo.astro` (plain `<img>`, pointer-free) serves `public/brand/logo.webp` in `PrimaryNav` (h-20 eager/high-priority inside home `NavLink`) + `FooterMeta` (h-16 lazy), replacing text wordmarks; `BUSINESS_DATA.logo` → `/brand/logo.webp` (JSON-LD resolves; favicon still stock, out of scope). Superseded by `image-optimization-pipeline`: logo moved to `src/assets/brand/`, rendered via `Picture`, JSON-LD via `getImage()`. Verified `pnpm build` clean + 0px overflow at 390/768/1280 on `/` and `/contact` (headless) + header 80px eager / footer 64px lazy logo render. Unchanged: card-level h4s, `design-system.astro`/`about.astro` demo headings, theme tokens.
- Unified fixed page background (`unified-fixed-page-background`, 2026-09-10): no import/file/page changes (rg verified — trees above unchanged, class-only diff). `Layout.astro` renders one `aria-hidden` `.page-bg` fixed wash (first `<body>` child, `z-0`, `secondary-fixed`/`primary-fixed-dim` blobs reusing `.blob-bg`, reduced-motion covered by the existing guard); `html,body` fallback to `surface-ice`; `header/main/footer` sit in a `z-1` context above it. Hero/Challenges/Products-shell/Contact-shell dropped `bg-surface-ice` (interior fills untouched: ProductPanel light/dark, Challenges white card, glass/FAQ/HUD); Testimonials keeps the `.bg-fluid-shape` wash tokenized (`bg-surface-container-highest/50`, `clip-path` restored — merge vote over the wash-removal) with `overflow-x-clip` + `overflow-hidden` fallback and `pointer-events-none` blobs; ContactSection gained a section-local warm tint/blur overlay (`from-brand-pink/[0.07] via-transparent to-brand-orange/[0.09]`, `backdrop-blur-[2px]`) below the untouched `ContactBackdrop`. Hero keeps `overflow-hidden` (blobs cropped by design). Verified `pnpm build` clean + 0px overflow at 390/768/1024/1280/1440 on `/` and `/contact` (headless) + reduced-motion static wash + panel/glass tones intact.
- Contact form shell glow-up (2026-09-10, no change): no import/file changes (rg verified — trees unchanged, markup/class-only diff in `ContactForm.tsx` + `FormSuccess.tsx`, atoms untouched per the voted zero-atom-edits rule). Form shell wrapped in a gradient hairline (`from-brand-orange/40 via-on-primary/60 to-brand-pink/40`, `p-[1.5px]`) keeping the voted `-1°/-2°` tilt + `motion-safe:` straighten; new header row (gradient `biotech` glyph + eyebrow + H3 `Solicita tu diagnóstico`, order H2→H3 intact); second pink glow blob mirroring the orange one; CTA gains `group` arrow-slide (`motion-safe:group-hover:translate-x-1`) + trust line (`Respuesta en menos de 24 h · Sin compromiso`); shell `motion-safe:focus-within` lift. `FormSuccess` mirrors the wrap/tilt with a green `check_circle` chip + next-step line, keeping `role="status"`. Verified `pnpm build` clean + 0px overflow at 390/768/1280 on `/` and `/contact` (headless) + island fill/submit→success flow + reduced-motion tilt held.
- Dev-only pages (`dev-only-pages`): `src/dev-pages/design-system.astro` + `_demos.tsx` moved out of `src/pages/` (git rename, no content change — `./_demos` relative import intact); `src/integrations/dev-only-pages.ts` injects top-level `*.astro` as `/<basename>` via `injectRoute` only when `command === 'dev'` (registered in `astro.config.mjs`); prod `dist/` has no `design-system/` output (nginx 404), sitemap lists prod routes only, `robots.txt` unchanged. New dev page = drop a file in `src/dev-pages/` (flat, `_*` = helper). Verified via hook simulation (dev injects `/design-system`, build/preview/sync inject nothing) + `pnpm build` green at 4 pages.
- Centralized palette (`centralize-color-palette`, 2026-09-10): all component/page/layout colors now resolve to `@theme` tokens (see `docs/design-tokens.md`); no import/file moves — trees above unchanged. Decisions: deleted 5 dead tokens + folded `primary-fixed-dim` into `secondary-fixed` (one blurred hero blob); new `error` (`#b3261e`) + `--shadow-card/media` tokens; `white`→`on-primary`, `black`→`inverse-surface`, hairline `gray-100`→`surface-container-highest`; fixed dead `font-headline-sm text-headline-sm` in `FaqAccordion` (remapped to `body-lg` bold). Known micro-deltas vs pixel-identical: `Button`/`Card` shadows now use `.shadow-ambient` (adds a soft second layer), `hover:bg-black` is now `on-surface` (`#1a1c1f`). Guardrail: `pnpm run check:palette` (advisory) + `AGENTS.md` palette law.
- Semantic section ids (`semantic-section-ids`): home anchors renamed to ES slugs — Hero `#inicio` (new), Testimonials `#testimonios`, Products `#productos`, Contact `#contacto` (was `section-3/4/5`), `desafios` unchanged; sub-anchors `#contacto-formulario` (ContactForm wrapper) + `#contacto-faq` (FaqAccordion root); all ids centralized in `data/section-ids.ts` (`as const`) consumed by organisms + `HeroActions`/`ProductPanel` CTAs; every section carries `scroll-mt-20`; form atoms gained optional `idPrefix` (`lib/utils.ts` `toKebab`) with `ContactForm`/`InterestPicker` passing `idPrefix="contacto-"` (store keys unprefixed). Historical `section-3/4/5` mentions above are pre-rename records.
- Link/CTA fix (`fix-links-ctas`, 2026-09-12): `PHONES.main` is the real WhatsApp identity (`+52 1 461 574 7483`, `tel:+5214615747483`, `wa.me/5214615747483` — visible phone links point at `wa.me` new-tab); `SOCIAL_LINKS` facebook-only (instagram key deleted, SEO `sameAs` follows); `FooterMeta` gains an inline-SVG Facebook logo link (`target=_blank rel=noopener`, `aria-label`, `currentColor` fill — no new CSS/token); `NavLink` accepts optional `target`/`rel`; hero primary + both product CTAs land directly on `#contacto-formulario` (form wrapper gained `scroll-mt-20`; `global.css` gained `scroll-behavior: smooth` + reduced-motion `auto`); `Ver línea Tópico` keeps `#productos` as the explicit exemption; no routes added/removed — trees above redrawn for the import/label/target diffs only.
- Branded fullscreen 404 (`branded-fullscreen-404`, 2026-09-12): `404.astro` rewritten from the EN stub to the hero voice, all strings ES (`SectionHeader` centered `h1#not-found-heading` + E2 eyebrow + subtitle, aria-hidden `404` numeral in `text-massive` + token gradient `bg-gradient-to-br from-brand-pink to-primary` + `bg-clip-text`, B2 primary → `/` + B3 secondary → `/contact` static Buttons, `NavLink` sitemap relabeled Inicio/Nosotros/Contacto, `lang="es"` + ES `PageSEO`); flex-shell decision: `body flex min-h-dvh flex-col` + `main flex flex-1 flex-col` in `Layout` so the 404 section (`flex flex-1 items-center justify-center`) centers in `100dvh − header − footer` with zero chrome arithmetic — no-op for tall pages (verified `/`, `/about`, `/contact` unchanged in `dist/`), sticky-footer side effect on short pages. New mandatory `AGENTS.md ## Language` rule (user-visible copy in Spanish; code/docs/specs in English). Out of scope by design: shared Header/Footer chrome still EN (`PrimaryNav` About/Contact) — separate change if wanted. Verified `check:palette` clean + `astro build` green (4 pages, `404.html` single `h1`, zero EN in 404 section). Post-verify bug fix: the numeral originally used the shared `.gradient-primary` class — its `background` shorthand resets `background-clip` to `border-box` later in the cascade (dev 54606 > 27564, prod 46967 > 27054), rendering a gradient box instead of gradient text; switched to `bg-gradient-to-br from-brand-pink to-primary` (longhand `background-image`, clip survives; same hexes `#db6f85`→`#a83200`), verified on the running `/404` page.
- GSAP scroll reveals (`gsap-scroll-reveals`): new `gsap@3.15.0` dep + `lib/gsap.ts` (SSR guard, `limitCallbacks`/`ignoreMobileResize`, `power4.out`/1.2s defaults, `load` + `astro:page-load` refresh); `global.css` gains `@utility js-reveal` + `.no-js .js-reveal` override and `Layout.astro` gains `<html class="no-js">` + swap script (content visible with JS off); all 5 home organisms own one scoped timeline each (`play none none none`, unhide-before-`.from()`, `matchMedia` fade-only reduce branch, VT guard/revert/page-load/after-swap, `transition:animate="none"` roots) — Hero transform-only ≤0.9s + session once-guard + blob-wrapper parallax (`scrub 0.8`), Challenges `top 75%`, Testimonials `top 80%` + glow parallax, Products `top 75%`, Contact `top 80%` (form shell only, island/inputs never tweened); `lib/kinetic-marquee.ts` + `lib/animate-counters.ts` ship as unwired patterns (hosts deferred), Swiper dropped (CSS overflow instead). No color/hover-language changes (`check:palette` clean): `js-*` hooks are behavior-only classes, layout chrome untouched. Verified `pnpm build` green.
- Branded contact H1 (`remove-contact-intro-block`): `contact.astro` intro block (unstyled `<h1>Contacto</h1>` + phone/email `NavLink` paragraph) replaced by `<SectionHeader level="h1" title="Contáctanos" slot="page-title" />` (plain string title, no slot — canonical `SECTION_TITLE_CORE`, zero bespoke classes) projected into a new optional `page-title` slot outlet in `ContactSection` (above the in-flow header, `Astro.slots.has` guard — empty on `/`, landing output unchanged), so the H1 shares the section tint/backdrop background; the separate page-level `<section>` shell is gone (page = `Layout` + `PageSEO` + one organism). Imports drop `NavLink` + `PHONES`/`EMAIL`, keep `SectionHeader` (first page-level molecule use — permitted, pages compose). Phone/email stay reachable via shell `ContactLinks` (no `contact-channels` delta).

- JSON avatar pages (`add-json-avatar-pages`, 2026-09-30): the marketing landing moved from `/` to a JSON-driven collection. New: `src/content.config.ts` (`avatars` glob collection, `base: src/content/avatars`, `pattern: es/**/page.json`, `generateId` strips the locale + `/page.json`), `src/lib/avatar-schema.ts` (`avatarSchema(image)` factory + `AvatarData`/slice types), `src/lib/avatars.ts` (`toPageData`), `src/data/products.ts` (global specs + formula banner), `src/data/copy.ts` (global disclaimer + `DEFAULT_FORM_COPY`), `src/data/default-contact.ts`, `src/pages/[slug].astro` (`getStaticPaths` over the collection → 6 routes), `src/content/avatars/es/<slug>/` (JSON + co-located images + `gallery/`). `/` is now a dummy `<h1>` (noindex + sitemap-excluded via the `@astrojs/sitemap` filter); `/dr-resultados` carries the previous home copy verbatim. All home organisms (`Hero`, `Challenges`, `Testimonials`, `Products`, `ProductPanel`, `ContactSection`, `FaqAccordion`, `ContactMedia`, `ContactBackdrop`, `Hero*`/`FeatureList`/`MediaWithTags`) take a typed `data` prop; `ContactForm.tsx` takes a `copy` prop (per-avatar labels/placeholders/errors) and injects validation messages into `store/contact` (`setErrorCopy`, `buildContactSchema`). Global vs per-avatar boundary: header/footer/logo, disclaimer, product specs + formula banner, icon names, og-image, business identity, section ids, form field keys → global; hero/challenges/testimonials/products-content/contact (incl. FAQ, media, form copy) + SEO title/description → per-avatar JSON. `src/data/testimonials.ts` demoted to a global fallback (no longer the avatar page source). Old `src/assets/a1..a6-*` + `src/assets/gallery/` folders removed; images now co-located (documented exception in `docs/astro-image-optimization.md`). Markdown rule: content text nodes rendered via `lib/markdown.ts`; attributes/meta stay plain. Spike finding: `image()` resolves relative paths in glob-loaded JSON; entry id is the folder slug via `generateId`.
- Orphan/cleanup candidates: `src/assets/{hero,challenges,contact,products,dividers,testimonials}/` originals are now only used by `data/default-contact.ts` (contact) and `data/testimonials.ts` (testimonials fallback); the rest can be pruned once the 5 placeholder avatars get real copy (task 2.4a) and no global page needs them.
- Testimonial refresh (2026-09-23): the first two entries in `data/testimonials.ts` are MVZ Daniela Ávila and MVZ Alan Doshey Gamborino Prieto, with their supplied local public photos at `public/testimonials/{daniela-avila,alan-gamborino}.webp`; the third testimonial remains unchanged.
- Footer legal pages (`footer-legal-pages`, 2026-09-30): `FooterMeta` 2 dead spans → 6 `NavLink`s (phone→wa.me new-tab, `/contact` ×2, aviso, `/politica-de-cookies`, `/terminos`); new `data/cookies-policy.md` + `data/terms.md` with matching routes (aviso page pattern, `lang="es"`); `/aviso-de-privacidad` frozen (client copy, untouched); `site-config` identity → frozen aviso values (phone/email/address/legalName + `href`/`wa` keys); `ContactForm` gains blocking consent `Checkbox` (`aceptaAviso`, rich label with aviso/cookie `.link`s, excluded from persist + payload); `Checkbox` atom `label: React.ReactNode` + error span. Decisions: no cookie banner, light non-transactional terms, generic processors, Meta/GA worded as planned, no counsel review (template-grade). Verified `check:palette` clean + `astro build` green (9 routes incl. new legal pages, sitemap auto-lists them).

### Current Products subtree (2026-09-23)

```text
index.astro
└── organisms/Products.astro ──► molecules/{SectionHeader, ProductPanel ×2, ProductGallery} + lib/gsap + astro:assets (getImage)
    ├── SectionHeader.astro (two-use-context heading and orientation copy)
    ├── ProductPanel.astro ×2 ──► atoms/{ResponsiveImage, Button, Badge} + molecules/SpecGrid + data/section-ids + assets/products
    │   └── SpecGrid.astro ──► atoms/SpecItem ×5
    └── ProductGallery.tsx (client:visible; single instance — mobile-between via DOM order, desktop-overlap via grid span + explicit row/col placement; GSAP-excluded by design; pre-hydration width geometry in global.css; slides are white plates) ──► swiper (Autoplay only) + assets/gallery (7 × 400px, widths [256,320,400] AVIF-first)
```

`molecules/FormulaStrip.astro` is rendered again by `Products.astro` on every avatar page (global formula banner from `data/products.ts`), per `add-json-avatar-pages`.

### Current Contact subtree (2026-09-23)

```text
index.astro and contact.astro
└── organisms/ContactSection.astro ──► molecules/{SectionHeader, ContactForm, FaqAccordion, ContactMedia, DisclaimerNote} + lib/gsap
    ├── SectionHeader.astro (orientation heading and contextual support copy)
    ├── ContactForm.tsx (client:load) ──► store/contact + data/section-ids + lib/api/{contact, client, constants}
    │   ├── FormRow.tsx ×2 ──► atoms/Input.tsx ×4 (name, clinic, phone, city/state)
    │   ├── atoms/Input.tsx (optional email) + atoms/Textarea.tsx (custom message)
    │   ├── InterestPicker.tsx ──► atoms/Checkbox.tsx ×3 (patient hygiene, spaces/processes, distributor)
    │   ├── atoms/Checkbox.tsx (consent `aceptaAviso` with aviso/cookie links — `footer-legal-pages`)
    │   ├── atoms/RadioGroup.tsx ×2 (preferred contact method and interest reason)
    │   ├── FormSuccess.tsx ──► atoms/Button.tsx
    │   └── lib/api/contact.ts ──► lib/api/{client, types} + store/contact (type only)
    └── FaqAccordion.astro ──► molecules/FaqItem.astro ×4 + atoms/Icon.astro + data/section-ids
```

`store/contact.ts` persists every contact field except `aceptaAviso`, while excluding transient submission state. Full-form Zod validation requires the contact details, email, both radio selections, a 10-character message, at least one interest option, and accepted privacy consent before `ContactForm.tsx` snapshots Zustand data and submits JSON (consent flag stripped from the payload). The typed endpoint rejects explicit unsuccessful JSON responses and distinguishes timeout, request, and generic errors.

### Current Footer subtree (2026-09-23)

```text
Layout.astro
└── organisms/Footer.astro ──► molecules/FooterMeta.astro
    └── atoms/BrandLogo.astro (h-16, carga diferida) + contenido estático del footer
```

`FooterMeta.astro` renders BrandLogo + a 6-`NavLink` row (phone→wa.me new-tab, `/contact` ×2, `/aviso-de-privacidad`, `/politica-de-cookies`, `/terminos` — `footer-legal-pages`, 2026-09-30). No email/Facebook in the footer; `ContactLinks` is orphan (static spans, retained for future use). `DisclaimerNote.astro` remains reachable through `ContactSection` and now states the non-substitution-of-professional-judgment product notice.

### Current Header subtree (2026-09-24)

```text
Layout.astro
└── organisms/Header.astro ──► molecules/PrimaryNav.astro
    └── atoms/{NavLink ×3, BrandLogo.astro}
```

`PrimaryNav.astro` ya no muestra el teléfono ni el correo. `ContactLinks.astro` se conserva para posibles usos futuros, pero no está conectado a ninguna página.

## Related

- [[component-dependencies-guide]]
- [[astro-atomic-components]]
- [[astro-react-islands]]
- [[astro-site-config]]
- [[astro-seo]]
