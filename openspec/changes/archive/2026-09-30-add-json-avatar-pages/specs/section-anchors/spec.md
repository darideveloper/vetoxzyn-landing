## MODIFIED Requirements

### Requirement: Semantic home section anchors
The system SHALL expose stable semantic ES ids on every avatar page section: `inicio` (Hero), `desafios` (Challenges), `testimonios` (Testimonials), `productos` (Products), `contacto` (ContactSection). Old ids `section-3`, `section-4`, `section-5` SHALL NOT exist.

#### Scenario: Deep link to each section
- **WHEN** a user visits any avatar page route with `#testimonios`, `#productos`, `#contacto`, `#desafios`, or `#inicio`
- **THEN** the browser scrolls to the matching section (with sticky-header offset applied) on that page

#### Scenario: No numbered section ids remain
- **WHEN** the built avatar page HTML is searched for `id="section-3"`, `id="section-4"`, `id="section-5"`
- **THEN** no matches are found

### Requirement: In-page CTAs target semantic anchors
`HeroActions` primary/secondary CTAs SHALL link to the contact-form anchor and the products anchor via `SECTION_IDS`, and each `ProductPanel` CTA SHALL link to the contact-form anchor, on every generated avatar page.

#### Scenario: CTA navigation
- **WHEN** a user clicks the hero primary CTA on any avatar page
- **THEN** the page navigates to the contact form
- **WHEN** a user clicks the hero secondary CTA
- **THEN** the page navigates to the products section
- **WHEN** a user clicks a product panel CTA
- **THEN** the page navigates to the contact form

### Requirement: Heading a11y wiring preserved
Each section SHALL keep its existing heading id and `aria-labelledby` association (`hero-heading`, `challenges-heading`, `testimonials-heading`, `products-heading`, `contact-heading`) on every generated avatar page, and each `ProductPanel` SHALL keep its dynamic `products-topico-title` / `products-instalaciones-title` wiring.

#### Scenario: No a11y regression
- **WHEN** the built avatar pages are inspected
- **THEN** every `<section>`/`<article>` `aria-labelledby` value matches an existing heading `id` on the same page
