## 1. Spike & schema foundation

- [x] 1.1 Spike: verify `image()` resolves relative paths in a glob-loaded JSON content collection under Astro 7.2.7 (throwaway folder, then delete); if it fails, switch to an `import.meta.glob` image registry in `src/lib/avatars.ts` (auto-fallback, no further approval needed) — **RESULT: `image()` works with JSON (resolved to ImageMetadata). No fallback needed. Note: collection entry id is `es/<slug>/page`; a `generateId` derives the slug.**
- [x] 1.2 Create `src/content.config.ts` defining the `avatars` collection (`glob` loader, `base: ./src/content/avatars`, pattern `es/**/page.json`) with the full Zod schema (`schema: ({ image }) => avatarSchema(image)`) covering hero, challenges, testimonials (2–3), products (line selection + content, no specs), contact (FAQ, media, full form copy), SEO, all text nodes as strings. Schema lives in `src/lib/avatar-schema.ts` (factory taking Astro's `image()` helper).
- [x] 1.3 Add `src/data/products.ts` with the GLOBAL technical specs (Tópico/Instalaciones values), the products formula banner (Fórmula/Mecanismo/Sin residuos), spec term labels, and "No requiere enjuague" text
- [x] 1.4 Add `src/data/copy.ts` (global `DISCLAIMER` + `DEFAULT_FORM_COPY` with error messages); confirm `SECTION_IDS` remains the global anchor source; add `src/data/default-contact.ts` (global contact slice) for non-avatar pages, backed by the retained `src/data/testimonials.ts` fallback
- [x] 1.5 Add `src/lib/avatars.ts` exporting slice types derived from the schema and `toPageData(entry)`; `src/lib/avatar-schema.ts` exports `AvatarData`/slice types

## 2. Content scaffolding

- [x] 2.1 Create `src/content/avatars/es/dr-resultados/` and migrate the current home copy verbatim into `page.json` (hero, challenges, testimonials, products, contact, FAQ, form copy, SEO)
- [x] 2.2 Move the existing product gallery images (`Garrafa_4L_Vetoxzyn.webp.png`, `Garrafa_23L_Vetoxzyn.webp.png`, `Envase_AtomizadorVetoxzyn_*.webp.png`) into the `dr-resultados` co-located folder and reference them from `page.json`
- [x] 2.3 Move/reference the current home images (hero, challenges, contact, testimonial portraits, dividers) into the `dr-resultados` folder
- [x] 2.4 Create the other five entries (`socio-crecimiento`, `ingeniero-eficiencia`, `guardian-de-aire`, `estratega-de-fauna`, `dueno-responsable`) with schema-valid Spanish placeholder `page.json` (each marked with an obvious placeholder marker)
- [x] 2.4a Replace the five placeholder avatar `page.json` contents with real copy authored from `docs/client-docs/` (placeholder markers removed; copy matches the docs' per-avatar mapping)
- [x] 2.5 Remove the old `src/assets/a1…a6-*` folders once content is relocated, and grep the repo to confirm no `aN-` prefix or `A1`–`A6` identifier remains
- [x] 2.6 Update `docs/astro-image-optimization.md` to record the co-located content-image exception

## 3. Organism refactor to props

- [x] 3.1 Refactor `Hero.astro` + `HeroBullets`/`HeroActions`/`HeroMediaCard` to render from an avatar `data` prop (eyebrow, H1, sub, bullets, CTAs, overlay card, hero image)
- [x] 3.2 Refactor `Challenges.astro` + `FeatureList`/`FeatureRow`/`MediaWithTags` to render from data (copy, rows, section image, badges)
- [x] 3.3 Refactor `Testimonials.astro` + `TestimonialCard` to render from data; make `role` optional (name-only when omitted) in `lib/testimonials`; keep `src/data/testimonials.ts` as a global fallback (no longer the avatar page source)
- [x] 3.4 Refactor `Products.astro` + `ProductPanel.astro` to render declared lines from data while consuming global specs + formula banner from `src/data/products.ts`; single declared line renders full-width on desktop
- [x] 3.5 Generalize the `Products.astro` gallery glob to the current avatar's folder and thread it through `ProductGallery` (from task 2.2)
- [x] 3.6 Refactor `ContactSection.astro` + `FaqAccordion`/`ContactMedia`/`ContactBackdrop` to render header, FAQ, media, and backdrop word from data, with the disclaimer from the global constant
- [x] 3.7 Thread full per-avatar form copy (labels, placeholders, interest labels, radio options, validation messages) into `ContactForm.tsx`, `InterestPicker`, and `FormSuccess` as serializable props, keeping field keys/store structure fixed, and update `src/store/contact.ts` (`buildContactSchema`, `setErrorCopy`) to accept injected messages with Spanish defaults
- [x] 3.8 Verify `dr-resultados` renders visually identical to the previous home (manual compare in dev)

## 4. Routing, SEO & home page

- [x] 4.1 Create `src/pages/[slug].astro` with `getStaticPaths` over the `avatars` collection, composing `Layout` + `PageSEO` + the five section organisms from typed page data
- [x] 4.2 Rewrite `src/pages/index.astro` to a minimal home page (single `<h1>` + a `nav` of relative links to every avatar page, sourced from the collection)
- [x] 4.3 Extend `PageSEO.astro`/`BaseSEO.astro` to accept the per-page `seo` object (title, description, optional `noindex`) sourced from avatar JSON, keeping og-image and the `LocalBusiness` business fields (name/telephone/email/logo) global from `site-config.ts`
- [x] 4.4 Emit `noindex` on the home `/` and exclude it from the sitemap via the `@astrojs/sitemap` filter
- [x] 4.5 Confirm `/contact` and `/about` (existing pages) still build and render correctly with the refactored `ContactSection`, sourcing the global default copy block; confirm `/aviso-de-privacidad` and `/404` are unchanged

## 5. Verification & docs (Definition of Done)

- [x] 5.1 Run `pnpm run build` and confirm all six avatar routes + existing pages + sitemap generate with zero errors
- [x] 5.2 Verify sitemap lists avatar routes and excludes the home `/`; confirm no `aN-` URLs in output
- [x] 5.3 Run `pnpm run check:palette` (must report clean)
- [x] 5.4 Accessibility pass on an avatar page: single H1, unskipped headings, `aria-labelledby` wired, form labels associated, gallery keyboard-traversable
- [x] 5.5 Responsive check at 390/768/1280px on an avatar page (no horizontal overflow, gallery/panels/pills correct)
- [x] 5.6 Update `docs/component-dependencies.md` (re-run the `rg` import/page walk per the guide; redraw affected per-page trees; list orphan/cleanup candidates such as the old `src/assets/a1…a6-*` folders)
- [x] 5.7 Run `openspec validate add-json-avatar-pages` and confirm the change is coherent before archiving
