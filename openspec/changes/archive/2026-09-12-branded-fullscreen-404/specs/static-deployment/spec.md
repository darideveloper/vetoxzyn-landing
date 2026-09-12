## MODIFIED Requirements

### Requirement: Static pages and routing
The system SHALL ship SSG prod routes: `/` (landing with contact island), small content pages, and a branded `404.astro` reusing existing atoms/molecules only (`SectionHeader` centered `h1` + Eyebrow, aria-hidden `404` numeral, primary `Button` to `/`, secondary `Button` to `/contact`, `NavLink` sitemap row) where ALL user-visible strings are Spanish (eyebrow, `h1`, subtitle, both CTAs, sitemap labels "Inicio" / "Nosotros" / "Contacto", `PageSEO` title/description) and the page renders with `lang="es"`; dev-only routes from `src/dev-pages/` SHALL NOT emit to `dist/` and SHALL resolve to nginx 404 in production; every prod page SHALL wrap the shared `Layout` (Header/main/Footer, `<ClientRouter />` in head) where `body` is a `flex min-h-dvh flex-col` shell and `main` is `flex flex-1 flex-col` so short pages pin the footer and the 404 section (`flex flex-1 items-center justify-center`) centers in `100dvh − header − footer`. No SSR adapter SHALL be configured.

#### Scenario: Full static navigation
- **WHEN** a user clicks internal links between home, small pages, and a bad URL
- **THEN** navigation is client-side animated via View Transitions (full-load fallback in unsupported browsers) and the bad URL renders the branded 404 page (single Spanish `h1`, Spanish Eyebrow/subtitle, Spanish CTAs to `/` and `/contact`, Spanish sitemap labels, `lang="es"`, zero English visible strings) vertically and horizontally centered with the footer pinned to the viewport bottom

#### Scenario: Dev-only path is a true 404 in prod
- **WHEN** a production build is served and any client requests `/design-system`
- **THEN** nginx returns 404 with no dev HTML served
