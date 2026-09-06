## ADDED Requirements

### Requirement: Centralized business data source
The system SHALL hold all business identity in `src/data/site-config.ts` with `as const` exports: `PHONES`, `EMAIL`, `ADDRESS`, `SOCIAL_LINKS`, `GOOGLE_MAPS`, `BUSINESS_HOURS`, and the SEO bundle `BUSINESS_DATA` (name, legalName, url, logo, ogImage, contact, social).

#### Scenario: Single source of truth
- **WHEN** Header, Footer, Layout, or BaseSEO needs a phone number, email, address, or social URL
- **THEN** it imports the value from `@/data/site-config` and no hardcoded business string exists in any component

### Requirement: Global consts fallback
The system SHALL define `SITE_TITLE`, `SITE_DESCRIPTION` in `src/consts.ts` as the final SEO fallback after explicit props.

#### Scenario: SEO fallback chain
- **WHEN** a page renders `PageSEO` without explicit title/description
- **THEN** the document title/description resolve to `SITE_TITLE`/`SITE_DESCRIPTION`

### Requirement: Typed public env pattern
The system SHALL provide `env.d.ts` with the `ImportMetaEnv` pattern for future `PUBLIC_*` vars; no concrete `PUBLIC_*` var SHALL ship in this change (no client reader exists yet). Server-only `SITE_URL` (Portless dev URL) MUST be read via `process.env`, never `import.meta.env`.

#### Scenario: Typed env access
- **WHEN** a future feature adds a client-read URL (e.g. API base)
- **THEN** it is declared in `env.d.ts` under `ImportMetaEnv` for typed `import.meta.env` access with autocomplete instead of `any`
