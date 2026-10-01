# avatar-page-data-props Specification

## Purpose
Typed per-avatar page data passed as props into presentational organisms, including contact-form copy and product-line selection.
## Requirements
### Requirement: Typed page data passed to organisms
The system SHALL expose a typed page-data object derived from the avatar Zod schema (`z.infer`) via `src/lib/avatars.ts`, and each section organism SHALL accept a single typed `data` prop for its slice (e.g. `<Hero data={page.hero} />`), containing no hardcoded user-visible copy for the varying fields.

#### Scenario: Organism renders only from props
- **WHEN** a section organism is rendered with a given avatar's data slice
- **THEN** all varying text, links, and images displayed come from that prop, and no avatar-specific literal (e.g. "Dr. Resultados", "tu clínica") remains in the component source

#### Scenario: Two avatars, one component
- **WHEN** the same organism renders for two different avatar entries
- **THEN** it produces different content from the props without any conditional branching on a specific avatar name or id

### Requirement: Per-avatar contact form copy
The contact form island (`ContactForm.tsx`) and its dependent molecules (interest picker, success state, submit/error strings) SHALL receive all user-visible copy as serializable props sourced from the avatar JSON, including field labels, placeholders, interest-checkbox labels, radio options, section heading/eyebrow, and validation messages. The form's **field keys and store structure SHALL remain fixed** (name, clinica, telefono, ciudadEstado, email, interest flags, medioContacto, motivoInteres, message); avatar JSON SHALL override copy only, never the field set or the submit payload shape.

#### Scenario: Form copy follows the avatar
- **WHEN** two avatar pages render the contact form
- **THEN** their labels, placeholders, interest options, and validation messages reflect each avatar's JSON copy rather than a shared hardcoded set, while both forms submit the same fixed field-key payload

#### Scenario: Validation messages are injected
- **WHEN** a user submits an avatar page's form with an invalid field
- **THEN** the error message shown is the one supplied for that avatar (falling back to a safe Spanish default when the JSON omits it)

### Requirement: Product line selection per avatar
The products section SHALL render only the product lines an avatar declares (Tópico and/or Instalaciones — some avatars show a single line), using each line's per-avatar heading/tagline and the global technical specs, and the section SHALL keep its existing layout behavior for the number of lines shown.

#### Scenario: Single-line avatar
- **WHEN** an avatar's JSON declares only one product line
- **THEN** the products section renders that single panel (with the gallery behavior intact) and no empty second panel

#### Scenario: Two-line avatar
- **WHEN** an avatar's JSON declares both lines
- **THEN** both panels render side by side on desktop exactly as the previous home did

### Requirement: Global default copy for non-avatar pages
Pages that reuse the refactored organisms without an avatar entry (`/contact`, `/about`) SHALL source their content from a global default copy block with the same shape as the per-avatar slices (including a default testimonial set retained in `src/data/testimonials.ts`), so they render identically in structure. Other non-avatar pages (`/aviso-de-privacidad`, `/404`) SHALL remain unchanged and SHALL NOT use the avatar content model.

#### Scenario: Non-avatar page renders from defaults
- **WHEN** `/contact` or `/about` renders the refactored `ContactSection`
- **THEN** it displays generic default copy from the global default block with no avatar entry required

#### Scenario: Unrelated pages untouched
- **WHEN** `/aviso-de-privacidad` or `/404` renders
- **THEN** it renders as before, independent of the avatar content model

### Requirement: Component conventions preserved
The refactored organisms and molecules SHALL continue to obey the project's vanilla atomic-tier import rules, remain presentational (no data fetching inside organisms), keep the shared interaction-feedback behavior (hover/cursor/focus tokens and classes), and introduce no new hardcoded colors outside palette tokens.

#### Scenario: Conventions pass
- **WHEN** `pnpm run check:palette` runs and the atomic-tier import rules are reviewed after the refactor
- **THEN** the palette check reports clean and no tier-rule violation is introduced

