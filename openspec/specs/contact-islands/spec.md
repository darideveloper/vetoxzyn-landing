## ADDED Requirements

### Requirement: Contact store with Zod validation and persist
The system SHALL provide `src/store/contact.ts` (contactSchema: name non-empty, email valid, message min 10 chars; `clinica`/`telefono` optional free strings; `lineaTopico`/`lineaInstalaciones`/`lineaDistribucion` booleans defaulting false; `buildFieldSchemaMap` enforcing unique field names; `setField` validating per-keystroke; `validateAll()` for submit; `reset()`; `isSubmitted`/`isLoading` transient flags) persisted to localStorage under `vetoxzyn-contact-storage` with `partialize` stripping `errors`, `isLoading`, `isSubmitted`. `src/store/useField.ts` SHALL provide the hydration-safe hook (`mounted` gate, `initialState` fallback, dotted-path support).

#### Scenario: Keystroke validation
- **WHEN** a user types an invalid email into the email field
- **THEN** `errors.email` is set from the Zod message and the atom displays it; correcting the value clears that field's error

#### Scenario: Draft survives reload and navigation
- **WHEN** a user fills the form then reloads or navigates to another page and back (VT swap)
- **THEN** name/email/message/clinica/telefono/linea values are restored from localStorage with no errors restored

#### Scenario: Submit validates all then stubs success
- **WHEN** the user submits with any invalid field
- **THEN** `validateAll()` returns false, all invalid fields show errors, and no submit proceeds; WHEN all fields are valid THEN `isSubmitted` becomes true, the success state renders, and the store resets for the next entry

### Requirement: Vanilla self-bound atoms
`src/components/atoms/` SHALL contain self-contained `Input.tsx` (F1 underline, uppercase xs label), `Textarea.tsx` (F3 glass), `Checkbox.tsx` (F2 pill), and `Button.tsx` (B2 primary / B3 secondary / B4 product with size and tone props) binding the store directly via an injectable `useField` prop (default `@/store/useField`); NO `ui/` directory and NO `Validated*` components SHALL exist. Atom-to-atom imports MUST stay acyclic; atoms MAY import `atoms/*`, `store/*`, `lib/*` only. All React code SHALL follow the islands conventions: `export function Name`, `import * as React from "react"`, no semicolons, double quotes, no `"use client"` directive, `@/` aliases for all project imports.

#### Scenario: Direct atom consumption
- **WHEN** `ContactForm` renders `<Input field="email" label="Email" client:load />`
- **THEN** the input displays the store value, writes through `setValue` on change, and shows the field error without any wrapper component

### Requirement: ContactForm molecule as production island
`src/components/molecules/ContactForm.tsx` SHALL compose the atoms inside a `glass-panel-heavy rounded-3xl p-10 md:p-14` card shell with Stitch skew on all viewports (`rotate-[-1deg]` base + `hover:rotate-0`, `lg:rotate-[-2deg]` at desktop), spanning the right column of the contact grid at full height (full-width stacked on mobile): a `grid grid-cols-1 md:grid-cols-2 gap-8` of the 4 inputs (name, clinica, telefono, email), a `¿Qué línea te interesa?` pill group (`flex flex-wrap gap-3`) of the linea checkbox trio, a Mensaje textarea with `rows=3`, and a `pt-6 flex justify-end` submit row with `Button type="submit" size="sm" variant="primary"` + `arrow_forward` `span` child (NOT the `Icon` atom — React island boundary); it SHALL read `errors`/`isSubmitted` from the store, run `validateAll()` on submit, and be mounted from an Astro page with `client:load`; all surrounding page content SHALL remain static Astro HTML. Submit SHALL be handled fully client-side (`onSubmit` with `preventDefault`, button `onClick` path) and SHALL NOT trigger a native `<form>` navigation through the ClientRouter.

#### Scenario: Static page with one island
- **WHEN** the landing page loads with JS disabled
- **THEN** all headings, copy, and layout render as static HTML while only the form island requires hydration; with JS enabled the form is interactive on load

#### Scenario: Glass grid shell
- **WHEN** the form renders inside `ContactSection`
- **THEN** inputs sit in a 2-column grid on desktop (stacked on mobile), line pills wrap in a flex group, the message area shows 3 rows, and the sm submit sits right-aligned with an arrow glyph

### Requirement: ContactForm fully in Spanish
All user-facing `ContactForm` strings SHALL be Spanish: labels (Nombre, Clínica / Hospital, Teléfono / WhatsApp, Correo, Mensaje), placeholders, submit/success buttons (Enviar solicitud, Enviar otro mensaje), success message, and Zod validation messages in `contactSchema`. NO English UI string SHALL remain in the molecule or its schema messages.

#### Scenario: Spanish-only form
- **WHEN** a user opens any page embedding `ContactForm` and submits it empty
- **THEN** every label, placeholder, button, and validation error reads in Spanish with zero English strings
