## MODIFIED Requirements

### Requirement: Static pages and routing
The system SHALL ship SSG prod routes: `/` (landing with contact island), small content pages, and a `404.astro` linking primary sections; dev-only routes from `src/dev-pages/` SHALL NOT emit to `dist/` and SHALL resolve to nginx 404 in production; every prod page SHALL wrap the shared `Layout` (Header/main/Footer, `<ClientRouter />` in head). No SSR adapter SHALL be configured.

#### Scenario: Full static navigation
- **WHEN** a user clicks internal links between home, small pages, and a bad URL
- **THEN** navigation is client-side animated via View Transitions (full-load fallback in unsupported browsers) and the bad URL renders the 404 page with links back to primary sections

#### Scenario: Dev-only path is a true 404 in prod
- **WHEN** a production build is served and any client requests `/design-system`
- **THEN** nginx returns 404 with no dev HTML served
