## MODIFIED Requirements

### Requirement: Centralized business data source
The system SHALL hold all business identity in `src/data/site-config.ts` with `as const` exports: `PHONES`, `EMAIL`, `ADDRESS`, `SOCIAL_LINKS`, `GOOGLE_MAPS`, `BUSINESS_HOURS`, and the SEO bundle `BUSINESS_DATA` (name, legalName, url, logo, ogImage, contact, social). `BUSINESS_DATA.url` SHALL resolve from build-time `import.meta.env.PUBLIC_SITE_URL` with fallback `"https://vetoxzyncomercial.mx"`; `EMAIL` SHALL be `address: "info@vetoxzyncomercial.mx"`, `href: "mailto:info@vetoxzyncomercial.mx"` (explicit literals, never string-derived from the URL).

#### Scenario: Single source of truth
- **WHEN** Header, Footer, Layout, or BaseSEO needs a phone number, email, address, or social URL
- **THEN** it imports the value from `@/data/site-config` and no hardcoded business string exists in any component

#### Scenario: Site URL resolves per environment
- **WHEN** the site builds with `PUBLIC_SITE_URL=https://vetoxzyn.localhost`
- **THEN** canonical, `og:url`, `og:image`, and JSON-LD `url`/`@id`/`logo`/`image` emit the localhost host; WHEN the var is unset or set to `https://vetoxzyncomercial.mx` THEN they emit the prod host

#### Scenario: Contact email on new domain
- **WHEN** any surface renders the contact email
- **THEN** it shows `info@vetoxzyncomercial.mx` with `mailto:info@vetoxzyncomercial.mx`, and no `info@vetoxzyn.mx` string remains in `src/`, `astro.config.mjs`, `env.d.ts`, `.env`, or `Dockerfile` (history under `openspec/changes/archive/**` excluded)

### Requirement: Typed public env pattern
The system SHALL declare `readonly PUBLIC_SITE_URL: string` in `env.d.ts` under `ImportMetaEnv` for typed `import.meta.env` access (declaration mandatory; the value may be unset at build time, where `??` fallbacks apply); `src/data/site-config.ts` SHALL read it via `import.meta.env` (build-inlined context) while `astro.config.mjs` SHALL read the same variable via Node 22 `process.loadEnvFile('.env')` with CLI-set `process.env` taking precedence over `.env` (Node context), with fallback to `https://vetoxzyncomercial.mx`. Bare server-only `SITE_URL` SHALL NOT remain as a second source in `.env`.

#### Scenario: Typed env access
- **WHEN** `BaseSEO.astro` (via `BUSINESS_DATA`) or `astro.config.mjs` (`site`) needs the site host
- **THEN** it resolves the single `PUBLIC_SITE_URL` value with autocomplete and without `any`, falling back to the prod host when unset, and `astro.config.mjs` `site` agrees with `BUSINESS_DATA.url` in every build
