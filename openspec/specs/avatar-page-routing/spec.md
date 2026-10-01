# avatar-page-routing Specification

## Purpose
Dynamic `[slug]` avatar routes plus a minimal home page that links them, statically generated and covered by the sitemap.
## Requirements
### Requirement: Dynamic avatar route generation
The system SHALL provide `src/pages/[slug].astro` that generates one static page per `avatars` collection entry via `getStaticPaths`, mapping each entry's folder slug to the route parameter, with root-level slugs and no path prefix.

#### Scenario: One route per avatar
- **WHEN** the site builds with six avatar entries
- **THEN** exactly six HTML routes are emitted — `/socio-crecimiento`, `/dr-resultados`, `/ingeniero-eficiencia`, `/guardian-de-aire`, `/estratega-de-fauna`, `/dueno-responsable` — each rendering its entry's data with the shared design

#### Scenario: Route is derived, not hand-authored
- **WHEN** a new `src/content/avatars/es/<slug>/page.json` is added and the site rebuilt
- **THEN** a matching `/<slug>` route is generated with no new page file required

### Requirement: Minimal home page with avatar links
The system SHALL render `src/pages/index.astro` as a minimal home page containing a single `<h1>` and a navigation landmark of relative links (`/<slug>`) to every avatar page, sourced from the `avatars` collection; it SHALL NOT render the previous marketing sections at `/`, and SHALL NOT hardcode avatar slugs.

#### Scenario: Root lists every avatar
- **WHEN** a visitor loads `/`
- **THEN** the page shows one `<h1>` and a `nav` with one relative link per `avatars` entry (label from the entry's hero title), and none of the previous Hero/Challenges/Testimonials/Products/Contact sections

#### Scenario: Links come from the collection
- **WHEN** a new avatar entry is added and the site rebuilt
- **THEN** a matching link appears on `/` with no page-file edit required

#### Scenario: Home content moved to its slug
- **WHEN** a visitor loads `/dr-resultados`
- **THEN** the page renders the copy that previously lived at `/`

### Requirement: Static generation with sitemap coverage
The avatar routes SHALL be statically generated (no adapter, no SSR) and SHALL appear in the generated sitemap, while the home `/` SHALL be excluded (via `noindex` and sitemap exclusion) so search engines treat it as non-content.

#### Scenario: Sitemap contains avatars, not home
- **WHEN** a production build's `sitemap-index.xml` is inspected
- **THEN** it lists the six avatar routes and does not promote `/` as indexable content

### Requirement: Shared shell across generated routes
Every generated avatar page SHALL render inside the shared `Layout` with the global Header, Footer, brand logo, and `ClientRouter`, and SHALL reuse the same section organisms as the previous home, differing only by the data passed in.

#### Scenario: Identical shell
- **WHEN** any two avatar pages are compared
- **THEN** both contain the same Header, Footer, and layout chrome, and only the section content differs

