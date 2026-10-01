## Why

The site today is a single hand-coded landing page: every section's Spanish copy, images, testimonials, FAQ and form labels are literals inside organisms/`.tsx` islands, and the only editable data files (`testimonials.ts`, `site-config.ts`) are TypeScript. The client needs six audience-specific landing pages (the Vetoxzyn® avatars: distributors, veterinarians, producers, bird keepers, fauna specialists, pet owners) that share one design but differ entirely in content. Editing six copies of hardcoded components is unmaintainable and error-prone.

We want each avatar page to be **data-driven from JSON plus its own static assets**, auto-rendered per slug by one layout, so non-developers can write/edit content without touching components.

## What Changes

- Introduce an Astro **content collection** (`avatars`) that loads per-avatar JSON + co-located images from `src/content/avatars/es/<slug>/`, validated by a Zod schema (including `image()` for image fields).
- Add **markdown support** for content text nodes, rendered at build via the existing `src/lib/markdown.ts`.
- **BREAKING** — `/` stops being the marketing landing page. It becomes a minimal home page (a single `<h1>` plus a `nav` of relative links to every avatar page, built from the collection). The current home content moves verbatim to the `dr-resultados` avatar page (`/dr-resultados`).
- Drop the `aN-` identifier prefix everywhere (folders, slugs, URLs, data). Avatar slugs become `socio-crecimiento`, `dr-resultados`, `ingeniero-eficiencia`, `guardian-de-aire`, `estratega-de-fauna`, `dueno-responsable`; A1–A6 identifiers are removed entirely.
- Refactor the home-layout organisms (`Hero`, `Challenges`, `Testimonials`, `Products`, `ProductPanel`, `ContactSection` + FAQ + media) and the `ContactForm.tsx` island to accept typed data props instead of hardcoded literals, so the same design renders any avatar's data.
- Add a dynamic route `src/pages/[slug].astro` that generates the avatar routes via `getStaticPaths`.
- Extend SEO so each page supplies its own title and description, while the social image (`og-image`) and the `LocalBusiness` business identity (name/telephone/email/logo) stay global.
- Keep global, shared-as-code data: Header/Footer/nav, brand logo, disclaimer text, product technical specs (`Concentración`/`pH`/`ORP`/`Toxicidad`/`Presentaciones`), the products formula banner (`Fórmula`/`Mecanismo`/`Sin residuos`), the "No requiere enjuague" pill, spec labels, all Material Symbols icon names, og-image, and business identity fields. A global default copy block (backed by the retained `src/data/testimonials.ts`) covers pages without an avatar entry.
- Scaffold all six avatar entries now: `dr-resultados` with the migrated home copy; the other five with real Spanish copy authored from `docs/client-docs/` (Avatares Objetivos, per-section guide, Master de Producto, Manual V2), brand-safe and matching the per-avatar mapping.

## Capabilities

### New Capabilities
- `avatar-content-collection`: The `avatars` content collection — folder layout (`src/content/avatars/es/<slug>/`), JSON schema (markdown text nodes, `image()` asset fields, per-page SEO + business JSON-LD, testimonials, FAQ, product-line selection, form copy), and global-vs-per-avatar data boundaries.
- `avatar-page-routing`: Dynamic per-slug rendering — `src/pages/[slug].astro` + `getStaticPaths`, the root-level slug scheme, and the minimal home page (`/`) with relative links to every avatar page.
- `avatar-page-data-props`: The prop contracts for the home-layout organisms and the contact-form island that let one design render any avatar's JSON content (including the fully per-avatar form copy and its validation messages).

### Modified Capabilities
- `hero-section`: Hero copy, CTAs, overlay card and hero image SHALL come from the page's data props instead of hardcoded A2 literals.
- `challenges-section`: Section copy, feature rows, section image and badges SHALL be driven by data props.
- `testimonials-section`: Testimonial entries, avatars, dividers and section copy SHALL be driven by data props on avatar pages (2–3 entries); `src/data/testimonials.ts` is retained as a global fallback for non-avatar pages, no longer the avatar page source.
- `products-section`: Heading, shown lines, per-line tagline, panel images and gallery SHALL be driven by data props while technical specs stay global.
- `product-gallery`: Gallery sources SHALL be resolved from the current page's avatar folder rather than the hardcoded `a2-dr-resultados` path.
- `contact-section`: Section copy, FAQ, contact media and full form copy SHALL be driven by data props; the disclaimer stays global.
- `contact-islands`: The contact form island SHALL receive per-avatar copy (labels, placeholders, options, validation messages) as serializable props.
- `seo-basics`: SEO title/description SHALL be per-page sourced from each avatar's data, replacing the global `currentPage` enum; og-image and the `LocalBusiness` business fields stay global.
- `section-anchors`: Section ids remain global constants, but they now apply across dynamically generated avatar pages as well as home.

## Impact

- **New**: `src/content.config.ts`; `src/content/avatars/es/<slug>/` (JSON + images); `src/pages/[slug].astro`; `src/data/products.ts` (global specs); `src/lib/avatars.ts` (collection → typed page data helper).
- **Modified**: `src/pages/index.astro` (minimal home with avatar links); `src/components/organisms/{Hero,Challenges,Testimonials,Products,ContactSection}.astro`; `src/components/molecules/{ProductPanel,TestimonialCard,FaqAccordion,ContactMedia,InterestPicker}.astro`; `src/components/molecules/ContactForm.tsx`; `src/components/seo/{PageSEO,BaseSEO}.astro`; `src/store/contact.ts` (validation messages become injected); `src/data/testimonials.ts` (demoted to a global fallback, no longer the page source). New atoms/molecules: `atoms/InlineMarkdown.astro` (markdown text nodes in `SectionHeader`).
- **Removed/moved**: `src/assets/a1..a6-*/` folders superseded by co-located content folders (only `a2-dr-resultados/gallery` has real images today).
- **Conventions**: must satisfy atomic-tier import rules, `pnpm run check:palette`, and update `docs/component-dependencies.md` (Definition of Done).
- **Build output**: new static routes + sitemap entries; `/` changes meaning.
