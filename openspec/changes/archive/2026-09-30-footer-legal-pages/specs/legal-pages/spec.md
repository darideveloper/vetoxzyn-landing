## ADDED Requirements

> Out of scope: `/aviso-de-privacidad` (`src/data/privacy-notice.md`) is client-provided and stays byte-identical — no rewrite, no date change.

### Requirement: Cookie policy page

The system SHALL serve `/politica-de-cookies` following the aviso page pattern (`Layout lang="es"`, `PageSEO currentPage="cookies"`, `Markdown` from `src/data/cookies-policy.md?raw`, `max-w-4xl` section) describing necessary storage (`vetoxzyn-contact-storage` localStorage, `hero-entered` sessionStorage), active third party (Google Fonts) and planned ones (Meta pixel, Google Analytics — worded as upcoming, not active), purposes, browser opt-out, and the `grupohocliva@gmail.com` contact, with Spanish copy and a current update date. No counsel review precedes publication (template-grade copy).

#### Scenario: Policy renders

- **WHEN** a visitor opens `/politica-de-cookies`
- **THEN** the page shows the cookie inventory, opt-out instructions, and contact in Spanish under the shared layout shell

### Requirement: Terms page

The system SHALL serve `/terminos` following the aviso page pattern (`Layout lang="es"`, `PageSEO currentPage="terms"`, `Markdown` from `src/data/terms.md?raw`) as a light non-transactional template: channel purpose (contact/quotes, no online sale), acceptable use, intellectual property, liability limit with professional-criterion referral, contact, changes, and current date — all Spanish.

#### Scenario: Terms render

- **WHEN** a visitor opens `/terminos`
- **THEN** the page states the channel is contact-only (no online contracting) with liability and contact sections in Spanish
