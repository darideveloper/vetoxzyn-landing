## Context

The current site is one static landing (`src/pages/index.astro`) composing five organisms. All user-visible Spanish copy is literal inside components; a couple of data files (`src/data/testimonials.ts`, `src/data/site-config.ts`) are TypeScript modules. Images are pipelined `src/assets/**` imports surfaced through the `ResponsiveImage`/`DividerImage`/`Avatar` atoms; gallery slides come from a `import.meta.glob` over `@/assets/a2-dr-resultados/gallery/*`.

Stack: Astro 7.2.7, static output (no adapter), React 19 islands, Tailwind v4 tokens, Zustand + Zod for the contact form, `marked` already available via `src/lib/markdown.ts`. Project conventions are binding: vanilla atomic tiers, token-only palette (`pnpm run check:palette`), and `docs/component-dependencies.md` must be updated for every touched page/component/import.

Decision inputs (locked with the client during exploration):

- Layout template = the **existing home layout**, fed per-avatar data (no new sections).
- Content = **Astro content collection (Option A)**: JSON + Zod, with `image()` for images.
- **Co-located** JSON + images: `src/content/avatars/es/<slug>/`.
- **Locale folder now**, Astro `i18n` config deferred until a second language exists.
- **Root-level slugs** (`/dr-resultados`), `aN-` prefix removed everywhere, A1–A6 identifiers removed.
- `/` becomes a minimal home hub (h1 + avatar links); current home copy migrates to `dr-resultados`.
- Per-avatar: all hero, challenges, testimonials, products *content* + contact (incl. FAQ, media, and **full form copy**), SEO + business JSON-LD. Global: nav/footer/logo, disclaimer, product technical specs, spec labels, "No requiere enjuague", icon names, section ids.
- **Markdown everywhere** in content text nodes; attributes/meta/alt/placeholders/hrefs/values stay plain.

## Goals / Non-Goals

**Goals:**
- One design, N avatar pages, each rendered from its own `/es/<slug>/` JSON + assets.
- Authoring content means editing JSON in one folder per avatar — no component edits.
- Zod-validated data with types flowing into organisms, build fails loudly on bad content.
- Preserve the current visual output for `dr-resultados` (it inherits the migrated home copy verbatim).
- Honor existing conventions (atomic tiers, palette, image pipeline, docs updates).

**Non-Goals:**
- No new sections or visual redesign; layout stays as today's home.
- No Astro `i18n` routing config yet (single language `es`), no multi-language copy.
- No CMS/admin UI; JSON is edited in-repo.
- No nav/menu listing of avatar pages (standalone, SEO/sitemap only).
- No changes to the backend contact API contract.
- No per-avatar icon customization (icons are code constants).

## Decisions

### D1 — Astro Content Collections with JSON loader, not plain glob or TS modules
Use `defineCollection({ loader: glob({ pattern, base }) , schema })` in `src/content.config.ts`. Chosen over `import.meta.glob` + manual Zod (more plumbing, must hand-build image registry) and over `data/*.ts` modules (not JSON, requires build-time TS edits). Content layer gives schema validation, typed `getCollection`, and `image()` resolution in one mechanism. **Alternatives rejected:** plain glob (reimplements the layer), TS data modules (violates the JSON requirement).

### D2 — Co-located content folders
`src/content/avatars/es/<slug>/page.json` plus sibling image files (hero, section media, testimonial portraits, product panels) and a `gallery/` subfolder for the product-gallery slides. Chosen by the client over the split `src/assets/aN/` layout. Trade-off: deviates from `docs/astro-image-optimization.md`'s "content images live in `src/assets/`" note; the doc must be updated to record the exception. All images remain Astro-pipelined (`image()` → `ImageMetadata` → `astro:assets`), so hashing/AVIF/WebP behavior is unchanged.

### D3 — Locale segment without Astro i18n
Path carries `es/` now; `astro.config.mjs` gets no `i18n` block. Rationale: zero functional benefit for one locale; adding config + URL helpers now is ceremony. The locale folder means adding `en/` and enabling `i18n: { defaultLocale:'es', locales:['es','en'], routing:{ prefixDefaultLocale:false } }` later is a config-only change. **Alternative rejected:** wiring i18n now (YAGNI).

### D4 — One dynamic route, slug is the folder name
`src/pages/[slug].astro` with `getStaticPaths` mapping each collection entry's `id` (folder slug) → params. Slugs are the folder names (`dr-resultados`, …), no prefix. Home content is *not* special-cased into `index.astro`; it is a normal collection entry. `src/pages/index.astro` becomes a minimal home page (single `<h1>` + a `nav` of `/<slug>` links sourced from the collection). **Alternative rejected:** keeping a bespoke home; the client wants home to become an avatar page.

### D5 — `image()` inside a glob-loaded JSON collection (spike required)
The schema uses `schema: ({ image }) => z.object({ ... imageField: image() ... })`. This is documented for markdown frontmatter and data collections; behavior with co-located JSON must be verified in Phase 1 (throwaway spike). **Fallback if it fails:** keep Option A but resolve images via a `import.meta.glob` registry in `src/lib/avatars.ts` (loader still Zod-validates everything else); the JSON stores relative paths either way.

### D6 — Markdown for content text nodes only
Long and short *text nodes* (headings, labels, paragraphs, FAQ answers, quotes, disclaimers) are markdown-rendered at build through `src/lib/markdown.ts` (`marked`, with heading-id/external-link post-processing), surfaced via `atoms/InlineMarkdown.astro` (uses `renderInline`, strips the wrapping `<p>`) and wired into `SectionHeader` for eyebrow/title/subtitle. Attributes and metadata (`seo.title`, `seo.description`, image `alt`, form `placeholder`, `aria-label`, `href`, icon names, checkbox values) are plain strings and are never piped through markdown. **Rationale:** safe, and matches the client's "markdown everywhere" intent scoped to visible content.

### D7 — Data boundaries: global constants vs per-avatar JSON
Global (code/consts): Header, Footer, nav links, brand logo asset, disclaimer text, product technical specs, the products formula banner (Fórmula/Mecanismo/Sin residuos), spec term labels, "No requiere enjuague", Material Symbols icon names, `SECTION_IDS` anchors, the og-image, the business fields (name/telephone/email/logo), and brand/legal SEO scaffolding. Per-avatar JSON: hero, challenges, testimonials, products content + line selection, contact (incl. FAQ, media, form copy), SEO title/description. Product specs live once in `src/data/products.ts`; each avatar references which lines it shows. **Rationale:** specs, banner, disclaimer, og-image and business identity are brand-critical and must not drift; everything audience-specific is content.

### D8 — Organisms take a single typed `data` prop
Each refactored organism receives a typed slice of the page data (e.g. `<Hero data={page.hero} />`), not loose scalars, to keep prop surfaces stable as content grows. Types derive from the Zod schema (`z.infer`) exposed via a small `PageData` type in `src/lib/avatars.ts`. Components stay presentational; no data fetching inside organisms.

### D9 — Contact form copy fully per-avatar, fixed field keys, validation messages injected
`ContactForm.tsx` and `InterestPicker`/labels receive per-avatar strings as serializable props (labels, placeholders, interest labels, radio options, heading/eyebrow, buttons/errors). The **field set and store keys stay fixed** (`name`, `clinica`, `telefono`, `ciudadEstado`, `email`, `lineaTopico`, `lineaInstalaciones`, `lineaDistribucion`, `medioContacto`, `motivoInteres`, `message`): avatar JSON overrides copy only, never structure. The Zustand store (`src/store/contact.ts`) currently holds module-level validation-message constants; these become an injected copy object (e.g. `validateAll(copy)` or `setCopy(copy)` on mount) with safe Spanish defaults. Store persistence key stays shared (one form instance per page). **Rationale:** fully-declarative dynamic fields would force the store, Zod schema, and submit payload to become dynamic for no real content benefit. **Trade-off:** slight store API change, but structure stays stable.

### D10 — Per-page SEO title/description; global social image and business identity
`PageSEO`/`BaseSEO` accept a `seo` object with the page's **title and description** sourced from each avatar's JSON. The social image (`og-image`) and the `LocalBusiness` JSON-LD business fields (name, telephone, email, logo) stay **global** from `src/data/site-config.ts`, as does the site URL chain (`PORTLESS_URL → SITE_URL → prod`). Canonical is computed per generated route. **Rationale:** per-avatar OG images and duplicated business data add files/drift for no current need; title/description are the meaningful per-page SEO levers.

### D14 — Single-line panel spans full width
When an avatar declares one product line, `Products` renders that panel full-width on desktop rather than leaving an empty column; the two-line case keeps the existing 50/50 split. The gallery strip behavior is unchanged in both cases. **Rationale:** an empty half-column reads as broken; the docs describe single-line avatars (A3, A6).

### D15 — Testimonial role is optional
`role`/organization is optional in the testimonial entry; when empty or omitted the card renders the name alone (matches the two shipped testimonials, which have empty role). **Rationale:** several segments have no established organization line yet.

### D16 — Only `/contact` and `/about` adopt the default copy block
`/aviso-de-privacidad` and `/404` keep their current implementations and do not participate in the avatar content model. **Rationale:** they don't use the refactored marketing organisms and have their own content (the privacy notice already has `src/data/privacy-notice.md`).

### D11 — Home `/` is noindex and sitemap-excluded
`src/pages/index.astro` renders a single `<h1>` plus a `nav` of relative links to every avatar page, emits `noindex`, and is excluded from the sitemap (via `@astrojs/sitemap` filter) so it acts as a lightweight hub rather than indexable content; the avatar routes carry all indexable SEO weight. **Alternative rejected:** redirecting `/` to an avatar (the client wants a home hub, not a redirect).

### D12 — Global default copy block for non-avatar pages
`/contact` and `/about` reuse the refactored `ContactSection` but have no avatar entry. They source from a **global default copy block** (a code constant with the same shape as the contact slice) rather than avatar JSON, so they render the same organisms with generic copy. **Alternative rejected:** separate page content entries (extra content type for two pages) or leaving them hand-authored (duplication).

### D13 — `src/data/testimonials.ts` kept as global fallback
The file is retained as a global default/fallback testimonial array (and the `Testimonial` type stays in `src/lib/testimonials.ts`); it is simply no longer the page source for avatar pages. Available to the global default copy path (D12). **Alternative rejected:** deleting it (loses a convenient fallback and churns `brand-imagery` expectations).

## Risks / Trade-offs

- **`image()` + JSON glob unproven (D5)** → Phase-1 spike; auto-fallback to the documented `import.meta.glob` registry (no schema or design change on failure, no further approval needed).
- **Duplicate-content / SEO when `/` changes meaning** → `/` is a minimal home hub (h1 + avatar nav), emitted `noindex` and excluded from the sitemap (D11); verify sitemap output.
- **Specs drift if any avatar copies them** → specs remain global by contract (D7); Zod schema does not expose spec fields per avatar.
- **Fully per-avatar form copy bloats JSON and the store API** → field keys stay fixed (D9); one shared `copy` shape with Zod defaults so omissions stay valid; validation messages get safe Spanish defaults.
- **Per-avatar business/OG data would duplicate brand identity 6×** → kept global (D10); avatar JSON carries only title/description.
- **Empty half-column on single-line avatars** → single panel spans full width (D14).
- **Copy for the 5 avatars could be inaccurate** → authored from `docs/client-docs/` and verified against the per-avatar mapping tables; task 2.4a done. Testimonials reuse the two real entries (accepted tradeoff, swap to segment quotes when available).
- **`docs/component-dependencies.md` / palette / atomic-tier drift** → mandatory DoD tasks; run `pnpm run check:palette` and full `astro build`.
- **`/contact` and `/about` need copy without avatar data** → global default copy block (D12); keep `data/testimonials.ts` as fallback (D13) rather than deleting it.
- **`src/data/testimonials.ts` demotion could surprise `brand-imagery`/`testimonials-section`** → file is kept (D13); update affected spec/docs notes only.

## Migration Plan

1. Phase-1 spike validates `image()` with JSON; decide registry fallback if needed.
2. Land schema + global data (`products.ts`, disclaimer, SEO defaults).
3. Scaffold `es/<slug>/page.json` for all six; migrate home copy into `dr-resultados`; author the other five from `docs/client-docs/`; move `a2` gallery images into the co-located folder.
4. Refactor organisms to props, section by section, verifying `dr-resultados` visually equals today's home.
5. Add `[slug].astro`; rewrite `index.astro` to the minimal home hub (h1 + avatar links); extend SEO.
6. Grep for lingering `aN-` references and A1–A6 labels; remove old asset folders.
7. Verify: `pnpm run build` (routes + sitemap), `pnpm run check:palette`, update `docs/component-dependencies.md`.

**Rollback:** the change is additive until step 5; reverting `index.astro` + removing `[slug].astro` restores the previous site while new content folders are harmless leftovers.

## Open Questions

None outstanding — all implementation gaps were resolved during review:

- `image()` risk → spike with auto-fallback to glob registry (D5).
- Dummy `/` SEO → `noindex` + sitemap exclusion (D11).
- Form field set → fixed keys, per-avatar labels only (D9).
- `/contact` + `/about` copy → global default copy block (D12); `/aviso-de-privacidad` + `/404` untouched (D16).
- `data/testimonials.ts` → kept as global fallback (D13).
- og-image + business JSON-LD → global, not per-avatar (D10).
- Products formula banner → global (D7).
- Single-line product panel → full-width (D14).
- Testimonial role → optional (D15).
