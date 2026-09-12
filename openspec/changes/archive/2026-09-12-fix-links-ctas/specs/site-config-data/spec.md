## MODIFIED Requirements

### Requirement: Centralized business data source
The system SHALL hold all business identity in `src/data/site-config.ts` with `as const` exports: `PHONES`, `EMAIL`, `ADDRESS`, `SOCIAL_LINKS`, `GOOGLE_MAPS`, `BUSINESS_HOURS`, and the SEO bundle `BUSINESS_DATA` (name, legalName, url, logo, ogImage, contact, social). `BUSINESS_DATA.url` SHALL resolve server-side from `process.env.PORTLESS_URL ?? process.env.SITE_URL` with fallback `"https://vetoxzyncomercial.mx"`; `EMAIL` SHALL be `address: "info@vetoxzyncomercial.mx"`, `href: "mailto:info@vetoxzyncomercial.mx"` (explicit literals, never string-derived from the URL). `PHONES.main` SHALL be the real WhatsApp identity `raw: "+5214615747483"`, `formatted: "+52 1 461 574 7483"`, `href: "tel:+5214615747483"`, plus `wa: "https://wa.me/5214615747483"`. `SOCIAL_LINKS` SHALL hold facebook only (`https://www.facebook.com/vetoxzyn`); the instagram key SHALL NOT exist. Client islands SHALL receive the origin via props from `.astro` parents, never via `import.meta.env`.

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
