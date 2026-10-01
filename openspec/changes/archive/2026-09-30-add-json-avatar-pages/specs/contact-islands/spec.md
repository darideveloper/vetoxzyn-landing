## MODIFIED Requirements

### Requirement: ContactForm molecule as production island
`src/components/molecules/ContactForm.tsx` SHALL compose the atoms inside a `glass-panel-heavy rounded-3xl p-10 md:p-14` card shell with Stitch skew, spanning the right column of the contact grid at full height (full-width stacked on mobile): a `grid grid-cols-1 md:grid-cols-2 gap-8` of the avatar-declared inputs, the avatar's interest checkboxes, an avatar-declared message textarea, and a right-aligned submit row with `Button type="submit" size="sm" variant="primary"` + `arrow_forward` `span` child (NOT the `Icon` atom — React island boundary); it SHALL receive all per-avatar copy (labels, placeholders, interest labels, radio options, heading/eyebrow, validation messages) as serializable props, read `errors`/`isSubmitted` from the store, run validation on submit, and be mounted from the page with `client:load`; all surrounding page content SHALL remain static Astro HTML. Submit SHALL be handled fully client-side and SHALL NOT trigger a native `<form>` navigation through the ClientRouter.

#### Scenario: Static page with one island
- **WHEN** an avatar page loads with JS disabled
- **THEN** all headings, copy, and layout render as static HTML while only the form island requires hydration; with JS enabled the form is interactive on load

#### Scenario: Per-avatar copy props
- **WHEN** the form renders on two different avatar pages
- **THEN** its labels, placeholders, interest options, and heading reflect each avatar's supplied copy, with safe Spanish defaults applied for any omitted string

### Requirement: ContactForm fully in Spanish
All user-facing `ContactForm` strings SHALL be Spanish, whether supplied per avatar (labels, placeholders, interest labels, radio options, buttons, success message) or held as defaults, and the Zod validation messages SHALL be provided per avatar with Spanish defaults in `contactSchema`.

#### Scenario: Spanish-only form
- **WHEN** a user opens an avatar page embedding `ContactForm` and submits it empty
- **THEN** every label, placeholder, button, and validation error reads in Spanish with zero English strings
