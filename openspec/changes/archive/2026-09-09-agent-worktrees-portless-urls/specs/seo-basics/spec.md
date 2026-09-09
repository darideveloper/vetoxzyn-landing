## MODIFIED Requirements

### Requirement: Two-layer single-language SEO hierarchy
The system SHALL provide `BaseSEO.astro` (core engine, `useTagLine` default `true`) and thin `PageSEO.astro` wrapper (defaults `jsonType="LocalBusiness"`; does not forward `useTagLine`). Title resolves prop → `SITE_TITLE`; description resolves prop → `baseDescription` → `SITE_DESCRIPTION`. Off-home pages append `| BUSINESS_DATA.name` unless `useTagLine` is `false`. No i18n/hreflang branches SHALL exist. `BUSINESS_DATA.url` (the origin prefix for canonical, `og:url`, `og:image`, JSON-LD `url`/`@id`/`logo`/`image`) SHALL be the checkout's own URL in dev (Portless branch-subdomain) and the prod domain in builds.

#### Scenario: Home page metadata
- **WHEN** `index.astro` renders `<PageSEO currentPage="home" slot="seo" />`
- **THEN** `<head>` contains resolved title (no tagline duplication), meta description, canonical `${BUSINESS_DATA.url}/`, OG/Twitter tags with `og:locale="en_US"`, and a `LocalBusiness` JSON-LD block (name, url, telephone, address, geo, sameAs)

#### Scenario: Non-prod indexing guard
- **WHEN** the site builds with `import.meta.env.PROD === false`
- **THEN** pages emit `<meta name="robots" content="noindex, nofollow" />`

#### Scenario: Worktree canonical reflects its own checkout
- **WHEN** a dev server runs in a worktree with `PORTLESS_URL=https://<branch>.vetoxzyn.localhost`
- **THEN** the served pages' canonical and `og:url` emit the branch-subdomain origin, not the main checkout's URL

### Requirement: Layout SEO slot pattern
`Layout.astro` SHALL render `<slot name="seo" />` inside `<head>`, global favicons (`/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`), `<ClientRouter />`, Header/Footer shell, and `<slot />` body content.

#### Scenario: Page injects SEO without touching Layout
- **WHEN** any page places `<PageSEO slot="seo" />` inside `<Layout>`
- **THEN** its metadata lands in `<head>` while body content renders in the shared shell unchanged

### Requirement: Sitemap, robots, and static assets
The system SHALL generate `/sitemap-index.xml` via `@astrojs/sitemap` using the configured `site` URL, serve dynamic `robots.txt` pointing at that sitemap, and ship `favicon.svg/.ico/.png`, `apple-touch-icon.png`, and 1200x630 `og-image.jpg` from `public/` with zero 404s.

#### Scenario: Crawler bootstrap
- **WHEN** a crawler fetches `/robots.txt` and `/sitemap-index.xml`
- **THEN** robots returns `Allow: /` plus the absolute sitemap URL and the sitemap lists all static routes

### Requirement: Optimized images via astro:assets
Whenever a raster content image is added, it SHALL be rendered with the `Image` component from `astro:assets` (AVIF format, `widths` + `sizes` responsive set, `quality ~60`); hero images SHALL use `loading="eager"` + `fetchpriority="high"`, all other images `loading="lazy"` + `decoding="async"`. SVG art SHALL pass through unchanged (Astro does not rasterize SVG). No placeholder image SHALL be added just to satisfy this rule.

#### Scenario: Responsive hero and lazy sections
- **WHEN** a raster hero or section image is added to a page
- **THEN** the hero loads eagerly at high priority while below-fold images lazy-load in AVIF with responsive widths and no layout shift from missing dimensions

### Requirement: Heading hierarchy and interactive a11y
Every page SHALL have exactly one `H1` with `H2-H6` in unskipped order; interactive elements with non-descriptive visible text SHALL carry `aria-label`.

#### Scenario: Hierarchy and labels
- **WHEN** the landing page renders
- **THEN** there is exactly one `H1`, section headings descend without skipping levels, and icon-only buttons expose `aria-label` context
