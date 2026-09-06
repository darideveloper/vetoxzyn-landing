## ADDED Requirements

### Requirement: Contact store with Zod validation and persist
The system SHALL provide `src/store/contact.ts` (contactSchema: name non-empty, email valid, message min 10 chars; `buildFieldSchemaMap` enforcing unique field names; `setField` validating per-keystroke; `validateAll()` for submit; `reset()`; `isSubmitted`/`isLoading` transient flags) persisted to localStorage under `vetoxzyn-contact-storage` with `partialize` stripping `errors`, `isLoading`, `isSubmitted`. `src/store/useField.ts` SHALL provide the hydration-safe hook (`mounted` gate, `initialState` fallback, dotted-path support).

#### Scenario: Keystroke validation
- **WHEN** a user types an invalid email into the email field
- **THEN** `errors.email` is set from the Zod message and the atom displays it; correcting the value clears that field's error

#### Scenario: Draft survives reload and navigation
- **WHEN** a user fills the form then reloads or navigates to another page and back (VT swap)
- **THEN** name/email/message values are restored from localStorage with no errors restored

#### Scenario: Submit validates all then stubs success
- **WHEN** the user submits with any invalid field
- **THEN** `validateAll()` returns false, all invalid fields show errors, and no submit proceeds; WHEN all fields are valid THEN `isSubmitted` becomes true, the success state renders, and the store resets for the next entry

### Requirement: Vanilla self-bound atoms
`src/components/atoms/` SHALL contain self-contained `Input.tsx`, `Textarea.tsx`, `Button.tsx` binding the store directly via an injectable `useField` prop (default `@/store/useField`); NO `ui/` directory and NO `Validated*` components SHALL exist. Atom-to-atom imports MUST stay acyclic; atoms MAY import `atoms/*`, `store/*`, `lib/*` only.

#### Scenario: Direct atom consumption
- **WHEN** `ContactForm` renders `<Input field="email" label="Email" client:load />`
- **THEN** the input displays the store value, writes through `setValue` on change, and shows the field error without any wrapper component

### Requirement: ContactForm molecule as sole island
`src/components/molecules/ContactForm.tsx` SHALL compose the atoms, read `errors`/`isSubmitted` from the store, run `validateAll()` on submit, and be mounted from an Astro page with `client:load`; all surrounding page content SHALL remain static Astro HTML.

#### Scenario: Static page with one island
- **WHEN** the landing page loads with JS disabled
- **THEN** all headings, copy, and layout render as static HTML while only the form island requires hydration; with JS enabled the form is interactive on load
