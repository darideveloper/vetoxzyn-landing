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

### Requirement: Typed public env
The system SHALL declare `PUBLIC_SITE_URL` (and future `PUBLIC_*`) in `env.d.ts` under `ImportMetaEnv` so client code gets typed `import.meta.env` access; server-only vars MUST NOT use the `PUBLIC_` prefix.

#### Scenario: Typed env access
- **WHEN** code reads `import.meta.env.PUBLIC_SITE_URL`
- **THEN** TypeScript provides a string type with autocomplete instead of `any`
