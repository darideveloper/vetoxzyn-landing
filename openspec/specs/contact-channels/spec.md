# contact-channels Specification

## Purpose
TBD - created by archiving change fix-links-ctas. Update Purpose after archive.
## Requirements
### Requirement: WhatsApp as the single phone channel
The system SHALL render the company WhatsApp number `+52 1 461 574 7483` as the only phone channel in `ContactLinks` (header `PrimaryNav`, footer `FooterMeta`, `/contact` page). Each phone link SHALL point to `https://wa.me/5214615747483` with `target="_blank" rel="noopener"`, display text `+52 1 461 574 7483`, and keep a `tel:+5214615747483` fallback available from `site-config`. No `tel:+12345678901` placeholder SHALL remain in `src/`.

#### Scenario: Visitor contacts via WhatsApp
- **WHEN** a visitor clicks the phone number in the header, footer, or contact page
- **THEN** a new tab opens `https://wa.me/5214615747483`

#### Scenario: No placeholder phone remains
- **WHEN** `src/` is searched for `12345678901`
- **THEN** no matches are found

### Requirement: New-tab links via NavLink passthrough
`NavLink` SHALL accept optional `target` and `rel` props passed through to the rendered `<a>` (defaulting to current behavior when absent), so `ContactLinks` and `FooterMeta` can render `target="_blank" rel="noopener"` without dropping the shared `.link` styling. Fallback: a native `<a class="link …">` is acceptable where passthrough is impractical.

#### Scenario: External links open in a new tab
- **WHEN** a visitor clicks the WhatsApp phone link or the Facebook logo link
- **THEN** the destination opens in a new tab with `rel="noopener"` and the link keeps the shared `.link` visual language

### Requirement: Facebook logo link in footer
The system SHALL render a Facebook logo link in `FooterMeta` pointing to `https://www.facebook.com/vetoxzyn` with `target="_blank" rel="noopener"`, an accessible label (e.g. `aria-label="Vetoxzyn en Facebook"`), and no Instagram link anywhere. The link SHALL use token-only palette classes (no hardcoded hex).

#### Scenario: Visitor opens Facebook
- **WHEN** a visitor clicks the Facebook logo in the footer
- **THEN** `https://www.facebook.com/vetoxzyn` opens in a new tab

#### Scenario: No Instagram surface
- **WHEN** any page renders
- **THEN** no `instagram.com` link appears in header, footer, contact page, or SEO social bundle

### Requirement: Marketing CTAs land directly on the contact form
`HeroActions` primary CTA ("Cotiza para tu clínica") and both `ProductPanel` CTAs ("Más información") SHALL link to `#contacto-formulario` (the form wrapper), not the `#contacto` section top, so each click lands directly on the form. Explicit exemption: the `HeroActions` secondary CTA ("Ver línea Tópico") SHALL keep linking to `#productos`. Nav links (logo, About, Contact, 404) and external links (WhatsApp, email, Facebook) are out of scope for retargeting.

#### Scenario: CTA lands on the form
- **WHEN** a visitor clicks "Cotiza para tu clínica" or either "Más información" button
- **THEN** the page smooth-scrolls so the contact form itself is visible below the sticky header

#### Scenario: Product-line navigation preserved
- **WHEN** a visitor clicks "Ver línea Tópico"
- **THEN** the page smooth-scrolls to `#productos` (not the contact form)

