## ADDED Requirements

### Requirement: Working footer links

`FooterMeta` SHALL render six `NavLink`s: `922 223 1006 → wa.me/529222231006` (`target="_blank" rel="noopener"`, `font-semibold`), `Contacto → /contact`, `Canal comercial → /contact`, `Aviso de Privacidad → /aviso-de-privacidad`, `Política de Cookies → /politica-de-cookies`, `Términos → /terminos`. Each separator `·` (aria-hidden) SHALL live inside its link's `inline-flex` group so no wrapped line starts with a separator; the last link carries none. Links get `py-1` touch padding; the shared `.link` styling, focus ring, and token palette apply with no new CSS.

#### Scenario: Contact links navigate

- **WHEN** a visitor clicks `Contacto` or `Canal comercial` in the footer from any page
- **THEN** the app navigates to `/contact` (`Contáctanos`)

#### Scenario: Phone opens WhatsApp

- **WHEN** a visitor clicks the phone number in the footer
- **THEN** `https://wa.me/529222231006` opens in a new tab with `rel="noopener"`

#### Scenario: Legal links navigate

- **WHEN** a visitor clicks `Aviso de Privacidad`, `Política de Cookies`, or `Términos`
- **THEN** the matching legal page renders with `lang="es"` under the shared Header/main/Footer shell

#### Scenario: Mobile stacks centered

- **WHEN** the footer renders at 360px width
- **THEN** brand and links stack centered with no overflow and no wrapped line starts with a `·` separator

### Requirement: Responsive footer composition

The footer shell SHALL center-stack on mobile and switch to a `justify-between` row at `sm+`, sharing the page container (`max-w-max-width`, `px-gutter`) with a token top border (`border-on-surface/10`) and a Montserrat bold wordmark beside the lazy logo. Footer stays motionless (nav chrome).

#### Scenario: Desktop row

- **WHEN** the footer renders at 1024px width
- **THEN** brand sits left, links right in one row aligned with page sections above
