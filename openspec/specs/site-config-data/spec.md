## Purpose

Single source of truth for business identity (`src/data/site-config.ts`) and the server-only site-origin/env resolution chain.
## Requirements
### Requirement: Centralized business data source
The system SHALL hold all business identity in `src/data/site-config.ts` with `as const` exports: `PHONES`, `EMAIL`, `ADDRESS`, `SOCIAL_LINKS`, `GOOGLE_MAPS`, `BUSINESS_HOURS`, and the SEO bundle `BUSINESS_DATA` (name, legalName, url, logo, ogImage, contact, social). `BUSINESS_DATA.logo` SHALL be the imported `ImageMetadata` of `src/assets/brand/logo.webp` (not a public URL string); `BaseSEO` frontmatter SHALL pass it to `getImage()` to emit the absolute build URL for JSON-LD `logo`. `BUSINESS_DATA.url` SHALL resolve server-side from `process.env.PORTLESS_URL ?? process.env.SITE_URL` with fallback `"https://vetoxzyncomercial.mx"`; `EMAIL` SHALL be `address: "info@vetoxzyncomercial.mx"`, `href: "mailto:info@vetoxzyncomercial.mx"` (explicit literals, never string-derived from the URL). `PHONES.main` SHALL be the real WhatsApp identity `raw: "+5214615747483"`, `formatted: "+52 1 461 574 7483"`, `href: "tel:+5214615747483"`, plus `wa: "https://wa.me/5214615747483"`. `SOCIAL_LINKS` SHALL hold facebook only (`https://www.facebook.com/vetoxzyn`); the instagram key SHALL NOT exist. Client islands SHALL receive the origin via props from `.astro` parents, never via `import.meta.env`.

#### Scenario: Single source of truth
- **WHEN** Header, Footer, Layout, or BaseSEO needs a phone number, email, address, or social URL
- **THEN** it imports the value from `@/data/site-config` and no hardcoded business string exists in any component

#### Scenario: Site URL resolves per checkout in dev, prod in builds
- **WHEN** the dev server runs under Portless with `PORTLESS_URL=https://<branch>.vetoxzyn.localhost`
- **THEN** canonical, `og:url`, `og:image`, and JSON-LD `url`/`@id`/`logo`/`image` emit the checkout's own URL; WHEN `PORTLESS_URL` is unset and `SITE_URL` is set (e.g. Docker build with `https://vetoxzyncomercial.mx`) THEN they emit `SITE_URL`; WHEN both are unset THEN they emit the prod host

#### Scenario: Contact email on new domain
- **WHEN** any surface renders the contact email
- **THEN** it shows `info@vetoxzyncomercial.mx` with `mailto:info@vetoxzyncomercial.mx`, and no `info@vetoxzyn.mx` string remains in `src/`, `astro.config.mjs`, `env.d.ts`, `.env`, or `Dockerfile` (history under `openspec/changes/archive/**` excluded)

#### Scenario: WhatsApp identity
- **WHEN** any surface renders the phone number
- **THEN** it shows `+52 1 461 574 7483` linking to `https://wa.me/5214615747483`, and no `12345678901` string remains in `src/`

### Requirement: Global consts fallback
The system SHALL define `SITE_TITLE`, `SITE_DESCRIPTION` in `src/consts.ts` as the final SEO fallback after explicit props.

#### Scenario: SEO fallback chain
- **WHEN** a page renders `PageSEO` without explicit title/description
- **THEN** the document title/description resolve to `SITE_TITLE`/`SITE_DESCRIPTION`

### Requirement: Typed server-only env pattern
The system SHALL NOT declare `PUBLIC_SITE_URL` in `env.d.ts` under `ImportMetaEnv`; the site origin is server-only and SHALL be read via `process.env` (`PORTLESS_URL ?? SITE_URL`, fallback `https://vetoxzyncomercial.mx`) in both `src/data/site-config.ts` (all importers are server-rendered `.astro` frontmatter) and `astro.config.mjs` (Node 22 `process.loadEnvFile('.env')` with CLI-set `process.env` taking precedence over `.env`). Bare client-exposed `PUBLIC_SITE_URL` SHALL NOT remain as a second source in `.env`, `.env.example`, or code.

#### Scenario: Typed env access
- **WHEN** `BaseSEO.astro` (via `BUSINESS_DATA`) or `astro.config.mjs` (`site`) needs the site host
- **THEN** it resolves the single server-read chain with `astro.config.mjs` `site` agreeing with `BUSINESS_DATA.url` in every build and dev checkout, and no `PUBLIC_SITE_URL` reference remains in `src/`, `astro.config.mjs`, `env.d.ts`, `.env.example`, or `Dockerfile`

