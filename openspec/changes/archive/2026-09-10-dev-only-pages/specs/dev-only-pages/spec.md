## ADDED Requirements

### Requirement: Dev-only route convention and injection
The system SHALL provide a zero-dependency integration `devOnlyPages()` that maps top-level `*.astro` files in `src/dev-pages/` to same-name routes (`design-system.astro` → `/design-system`) using Astro's `injectRoute`, ONLY when `command === 'dev'`. Files prefixed `_*` and non-`.astro` files SHALL be treated as helpers and never become routes. On `build`, `preview`, and `sync` the integration SHALL inject nothing.

#### Scenario: Dev page works locally
- **WHEN** `pnpm run dev` serves the site and a reviewer opens `/design-system`
- **THEN** the page renders as a normal `.astro` route (Layout shell, SEO slot, React island hydration, `@/*` aliases resolve)

#### Scenario: Adding a second dev page needs no config
- **WHEN** a developer drops `src/dev-pages/future-debug.astro` into the folder and opens `/future-debug` in dev
- **THEN** the route resolves with no changes to `astro.config.mjs`, sitemap config, or SEO components

#### Scenario: Helpers never route
- **WHEN** `src/dev-pages/_demos.tsx` exists alongside the showcase page
- **THEN** no `/_demos` route exists in dev or prod; the file is importable only as a relative helper
