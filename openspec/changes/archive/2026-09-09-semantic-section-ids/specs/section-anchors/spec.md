## ADDED Requirements

### Requirement: Semantic home section anchors
The system SHALL expose stable semantic ES ids on every home section: `inicio` (Hero), `desafios` (Challenges), `testimonios` (Testimonials), `productos` (Products), `contacto` (ContactSection). Old ids `section-3`, `section-4`, `section-5` SHALL NOT exist.

#### Scenario: Deep link to each section
- **WHEN** a user visits `/#testimonios`, `/#productos`, `/#contacto`, `/#desafios`, or `/#inicio`
- **THEN** the browser scrolls to the matching section (with sticky-header offset applied)

#### Scenario: No numbered section ids remain
- **WHEN** the built home page HTML is searched for `id="section-3"`, `id="section-4"`, `id="section-5"`
- **THEN** no matches are found

### Requirement: Anchor ids are centrally defined
The system SHALL define all section anchor ids once in `src/data/section-ids.ts` (exported `as const`), and organisms plus CTA molecules SHALL consume ids from that module instead of string literals.

#### Scenario: Single source of truth
- **WHEN** a developer reads `src/data/section-ids.ts`
- **THEN** every home section and contact sub-anchor id is listed there with no duplicates

### Requirement: In-page CTAs target semantic anchors
`HeroActions` primary/secondary CTAs SHALL link to `#contacto` and `#productos` respectively, and each `ProductPanel` CTA SHALL link to `#contacto`.

#### Scenario: CTA navigation
- **WHEN** a user clicks "Cotiza para tu clínica" in the hero
- **THEN** the page navigates to `#contacto`
- **WHEN** a user clicks "Ver línea Tópico" in the hero
- **THEN** the page navigates to `#productos`
- **WHEN** a user clicks "Ver ficha técnica" on either product panel
- **THEN** the page navigates to `#contacto`

### Requirement: Contact sub-anchors
`ContactSection` SHALL expose `contacto-formulario` on the form wrapper and `contacto-faq` on the `FaqAccordion` root, in addition to `contacto` on the `<section>`.

#### Scenario: Direct link to form and FAQ
- **WHEN** a user visits `/#contacto-formulario` or `/#contacto-faq`
- **THEN** the browser scrolls to the form / FAQ region respectively

### Requirement: Form controls are label-associated
`Input`, `Textarea`, and `Checkbox` atoms SHALL accept an optional `idPrefix` prop (default `""`) and render an `id` derived as `idPrefix` + kebab-case(`field`), associated with their `<label>` (`for` / `htmlFor`). The contact form SHALL pass `idPrefix="contacto-"`, producing `contacto-name`, `contacto-clinica`, `contacto-telefono`, `contacto-email`, `contacto-message`, `contacto-linea-topico`, `contacto-linea-instalaciones`, `contacto-linea-distribucion`, while store keys remain unprefixed. (Two store keys are EN — `name`, `message` — so their DOM ids keep the EN fragment; store keys are out of scope.)

#### Scenario: Assistive technology association
- **WHEN** a screen reader or automated a11y check inspects the contact form
- **THEN** every visible label is programmatically associated with its control (no orphan labels, no duplicate ids on the page)

#### Scenario: Store compatibility
- **WHEN** the form is submitted, validated, or reset
- **THEN** Zustand `store/contact` behavior (field keys, validation, persist) is unchanged

### Requirement: Heading a11y wiring preserved
Each section SHALL keep its existing heading id and `aria-labelledby` association (`hero-heading`, `challenges-heading`, `testimonials-heading`, `products-heading`, `contact-heading`) and each `ProductPanel` SHALL keep its dynamic `products-topico-title` / `products-instalaciones-title` wiring.

#### Scenario: No a11y regression
- **WHEN** the built pages are inspected
- **THEN** every `<section>`/`<article>` `aria-labelledby` value matches an existing heading `id` on the same page
