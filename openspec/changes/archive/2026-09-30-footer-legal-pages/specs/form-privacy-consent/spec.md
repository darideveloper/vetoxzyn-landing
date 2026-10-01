## ADDED Requirements

### Requirement: Blocking privacy consent

The contact island SHALL render a consent `Checkbox` (store field `aceptaAviso`, `z.literal(true)`-style rule with a Spanish error message) whose label links inline to `/aviso-de-privacidad` and `/politica-de-cookies`. `validateAll()` SHALL fail while unchecked so submit is blocked and the existing error UI surfaces the Spanish message; the submit button is `disabled` only while `isLoading` (unchanged).

#### Scenario: Submit blocked without consent

- **WHEN** a visitor completes all fields but leaves consent unchecked and submits
- **THEN** no request is sent and a Spanish consent error is shown

#### Scenario: Submit succeeds with consent

- **WHEN** a visitor checks consent with a valid form and submits
- **THEN** the lead POST fires and success state renders as today

### Requirement: Consent never leaks or persists

`handleSubmit` SHALL keep its explicit field allow-list (consent flag excluded from the payload) and the persist `partialize` SHALL omit `aceptaAviso`; `initialState`/`reset()` SHALL restore it to `false`.

#### Scenario: Payload shape unchanged

- **WHEN** a consented form submits
- **THEN** the endpoint receives exactly the current lead fields, no consent key

#### Scenario: Consent resets

- **WHEN** the store rehydrates or `reset()` runs after success
- **THEN** consent is unchecked while lead-field persistence behavior is otherwise unchanged
