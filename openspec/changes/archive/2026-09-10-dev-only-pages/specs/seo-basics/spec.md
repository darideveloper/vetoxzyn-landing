## MODIFIED Requirements

### Requirement: Sitemap, robots, and static assets
The system SHALL generate `/sitemap-index.xml` via `@astrojs/sitemap` using the configured `site` URL, listing prod routes ONLY (dev-only routes SHALL NOT appear), serve dynamic `robots.txt` pointing at that sitemap, and ship `favicon.svg/.ico/.png`, `apple-touch-icon.png`, and 1200x630 `og-image.jpg` from `public/` with zero 404s.

#### Scenario: Crawler bootstrap
- **WHEN** a crawler fetches `/robots.txt` and `/sitemap-index.xml` from a production build
- **THEN** robots returns `Allow: /` plus the absolute sitemap URL and the sitemap lists all prod static routes and no dev-only routes
