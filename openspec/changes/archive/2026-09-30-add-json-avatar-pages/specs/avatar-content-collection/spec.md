## ADDED Requirements

### Requirement: Avatar content collection definition
The system SHALL define an Astro content collection named `avatars` in `src/content.config.ts` using the `glob` loader over `src/content/avatars/es/<slug>/page.json`, and SHALL validate every entry against a Zod schema passed through the `schema: ({ image }) => z.object({...})` callback so image fields resolve to `ImageMetadata`.

#### Scenario: Collection loads every avatar folder
- **WHEN** `getCollection('avatars')` runs during a build
- **THEN** it returns one entry per `src/content/avatars/es/<slug>/page.json` file, each entry's `id` being the folder slug (e.g. `dr-resultados`), with images resolved to `ImageMetadata`

#### Scenario: Invalid content fails the build
- **WHEN** any `page.json` omits a required field or mis-types a field (e.g. a string where an object is expected)
- **THEN** the Astro build fails with the Zod validation error naming the offending file and field, and no page is generated from it

### Requirement: Co-located JSON and image layout
Each avatar's content and static assets SHALL live together under `src/content/avatars/es/<slug>/`, where `page.json` is the content file and sibling images (hero, section media, testimonial portraits, product panels, gallery) are referenced from the JSON by relative path and resolved via the collection `image()` helper.

#### Scenario: Avatar folder is self-contained
- **WHEN** a developer inspects `src/content/avatars/es/dr-resultados/`
- **THEN** it contains `page.json` plus its image files (including the product gallery images), and no other avatar's assets are referenced

#### Scenario: Images remain Astro-pipelined
- **WHEN** a page generated from an avatar entry renders
- **THEN** every image is emitted through `astro:assets` (AVIF-first responsive output with hashed filenames), never as a raw un-optimized or external URL

### Requirement: Markdown for content text nodes only
Content string fields that render as visible text (headings, eyebrow, subtitle, labels, paragraphs, FAQ answers, testimonial quotes, disclaimers) SHALL be parsed as markdown at build time via `src/lib/markdown.ts`; fields that feed attributes or metadata (SEO `title`/`description`, image `alt`, form `placeholder`, `aria-label`, `href`, checkbox values, icon names) SHALL be treated as plain strings and SHALL NOT be rendered as markdown.

#### Scenario: Markdown renders in visible copy
- **WHEN** an avatar's JSON sets a heading or paragraph containing `**bold**` or a `[link](https://…)`
- **THEN** the generated HTML contains the corresponding `<strong>` / anchor markup in that text node

#### Scenario: Attributes stay literal
- **WHEN** an avatar's JSON sets an image `alt` or a form `placeholder` containing characters such as `*` or `#`
- **THEN** those characters appear verbatim in the attribute value with no markdown transformation

### Requirement: Image resolution helper
The collection entry → typed page data helper in `src/lib/avatars.ts` SHALL resolve image fields to `ImageMetadata` using the collection `image()` helper when it works with glob-loaded JSON, and SHALL fall back to an `import.meta.glob` image registry (JSON still stores relative paths) if `image()` does not resolve such paths.

#### Scenario: Images resolve either way
- **WHEN** a page generated from an avatar entry renders
- **THEN** every image field resolves to `ImageMetadata` and is emitted through `astro:assets`, regardless of which resolution mechanism is active

### Requirement: Per-avatar SEO
Each avatar JSON SHALL carry its own SEO block (title, description), and the generated page SHALL use these values instead of the previous global `currentPage` enum lookup. The social image (`og-image`) and the business fields used for the page's `LocalBusiness` JSON-LD (name, telephone, email, logo) SHALL remain global from `src/data/site-config.ts` for every page, while the site-origin chain (`PORTLESS_URL → SITE_URL → prod domain`) and canonical computation also remain global.

#### Scenario: Each page exposes its own metadata
- **WHEN** two different avatar pages are built
- **THEN** their `<title>` and `meta description` differ according to each avatar's JSON, while both share the same global `og:image`, `LocalBusiness` JSON-LD (telephone/email/logo), and origin chain for canonical and `og:url`

### Requirement: Global versus per-avatar data boundary
The system SHALL keep Header, Footer, nav links, brand logo, disclaimer text, product technical specs (Concentración / pH / ORP / Toxicidad / Presentaciones), the products formula banner (Fórmula / Mecanismo / Sin residuos), spec term labels, the "No requiere enjuague" pill, Material Symbols icon names, the og-image, the business fields (name/telephone/email/logo), and section anchor ids as global code constants, and SHALL source hero, challenges, testimonials, products content + line selection, and contact (including FAQ, media image, and full form copy) from per-avatar JSON. A global default copy block (with the retained `src/data/testimonials.ts` fallback) SHALL cover pages without an avatar entry.

#### Scenario: Specs never vary per avatar
- **WHEN** any avatar page renders its product panels
- **THEN** the technical spec values and formula banner equal the single global definitions in `src/data/products.ts`, and the avatar JSON contains no spec or banner values of its own

#### Scenario: Content varies per avatar
- **WHEN** two avatar pages are compared
- **THEN** their hero, challenges, testimonials, product headings/taglines/line selection, FAQ, and form copy come from each avatar's own JSON and differ where authored to differ

#### Scenario: Fallback for non-avatar pages
- **WHEN** a page without an avatar entry (e.g. `/contact`) renders a refactored organism
- **THEN** its content comes from the global default copy block rather than avatar JSON

### Requirement: Scaffolded avatar entries
The system SHALL ship six avatar entries under `src/content/avatars/es/`: `socio-crecimiento`, `dr-resultados`, `ingeniero-eficiencia`, `guardian-de-aire`, `estratega-de-fauna`, `dueno-responsable`; `dr-resultados` SHALL contain the previously hardcoded home copy verbatim, and the other five SHALL contain brand-safe Spanish copy authored from `docs/client-docs/` that matches the per-avatar mapping (hero, challenges pains, product line selection, testimonials segment, FAQ objections) with no placeholder markers.

#### Scenario: All six build
- **WHEN** the site builds
- **THEN** all six avatar pages are generated, `dr-resultados` reproduces the prior home copy, and the other five render their authored copy without build errors or placeholder markers

#### Scenario: Per-avatar mapping respected
- **WHEN** the five authored pages are inspected
- **THEN** their hero copy, challenges pains, product line selection (single line for `ingeniero-eficiencia` and `dueno-responsable`), testimonial segment headings, and FAQ objections match the per-avatar tables in `design/docs/client-pages-sections.md`

#### Scenario: No A-label remnants
- **WHEN** the repository is searched for `a1-socio-crecimiento`, `a2-dr-resultados`, `a3-…` through `a6-…` and for the labels `A1`–`A6`
- **THEN** no folder, slug, URL, or data field carries an `aN-` prefix or an `A1`–`A6` identifier
