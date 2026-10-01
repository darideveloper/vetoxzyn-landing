## MODIFIED Requirements

### Requirement: Two-layer single-language SEO hierarchy
The system SHALL provide `BaseSEO.astro` (core engine) and thin `PageSEO.astro` wrapper, where each page supplies a `seo` object (title, description) sourced from that page's avatar data, with the social image and business JSON-LD fields held globally from `src/data/site-config.ts`. Title resolves page value → `SITE_TITLE`; description resolves page value → `SITE_DESCRIPTION`. No i18n/hreflang branches SHALL exist. `BUSINESS_DATA.url` (the origin prefix for canonical, `og:url`, `og:image`, JSON-LD `url`/`@id`) SHALL remain the checkout's own URL in dev (Portless branch-subdomain) and the prod domain in builds, computed globally, and the business fields (telephone, email, logo) plus the og-image SHALL also come from global config for every page.

#### Scenario: Per-page metadata
- **WHEN** any avatar page renders `<PageSEO seo={...} slot="seo" />`
- **THEN** `<head>` contains that page's resolved title, meta description, the global og-image, canonical for its own route, OG/Twitter tags, and a `LocalBusiness` JSON-LD block using the global telephone/email/logo with the global origin

#### Scenario: Non-prod indexing guard
- **WHEN** the site builds with `import.meta.env.PROD === false`
- **THEN** pages emit `<meta name="robots" content="noindex, nofollow" />`

#### Scenario: Worktree canonical reflects its own checkout
- **WHEN** a dev server runs in a worktree with `PORTLESS_URL=https://<branch>.vetoxzyn.localhost`
- **THEN** the served pages' canonical and `og:url` emit the branch-subdomain origin, not the main checkout's URL

#### Scenario: Dummy home is not indexed
- **WHEN** the production sitemap is generated
- **THEN** the home `/` is excluded from indexable content (excluded from the sitemap and emitted `noindex`) and the avatar routes are included

### Requirement: Sitemap, robots, and static assets
The system SHALL generate `/sitemap-index.xml` via `@astrojs/sitemap` using the configured `site` URL, listing prod routes ONLY (all generated avatar routes; dev-only routes and the home `/` SHALL NOT appear), serve dynamic `robots.txt` pointing at that sitemap, and ship `favicon.svg/.ico/.png`, `apple-touch-icon.png`, and 1200x630 `og-image.jpg` from `public/` with zero 404s.

#### Scenario: Crawler bootstrap
- **WHEN** a crawler fetches `/robots.txt` and `/sitemap-index.xml` from a production build
- **THEN** robots returns `Allow: /` plus the absolute sitemap URL and the sitemap lists all avatar routes and no dev-only or placeholder routes

### Requirement: Heading hierarchy and interactive a11y
Every page SHALL have exactly one `H1` with `H2-H6` in unskipped order; interactive elements with non-descriptive visible text SHALL carry `aria-label`.

#### Scenario: Hierarchy and labels
- **WHEN** any avatar page (and the home) renders
- **THEN** there is exactly one `H1`, section headings descend without skipping levels, and icon-only buttons expose `aria-label` context
