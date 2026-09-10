## MODIFIED Requirements

### Requirement: ContactForm molecule as production island
`src/components/molecules/ContactForm.tsx` SHALL compose the atoms inside a `glass-panel-heavy rounded-3xl p-10 md:p-14` card shell with Stitch skew on all viewports (`rotate-[-1deg]` base + `hover:rotate-0`, `lg:rotate-[-2deg]` at desktop), spanning the right column of the contact grid at full height (full-width stacked on mobile): a `grid grid-cols-1 md:grid-cols-2 gap-8` of the 4 inputs (name, clinica, telefono, email), a `¿Qué línea te interesa?` pill group (`flex flex-wrap gap-3`) of the linea checkbox trio, a Mensaje textarea with `rows=3`, and a `pt-6 flex justify-end` submit row with `Button type="submit" size="sm" variant="primary"` + `arrow_forward` `span` child (NOT the `Icon` atom — React island boundary); it SHALL read `errors`/`isSubmitted` from the store, run `validateAll()` on submit, and be mounted from an Astro page with `client:load`; all surrounding page content SHALL remain static Astro HTML. Submit SHALL be handled fully client-side (`onSubmit` with `preventDefault`, button `onClick` path) and SHALL NOT trigger a native `<form>` navigation through the ClientRouter.

#### Scenario: Static page with one island
- **WHEN** the landing page loads with JS disabled
- **THEN** all headings, copy, and layout render as static HTML while only the form island requires hydration; with JS enabled the form is interactive on load

#### Scenario: Glass grid shell
- **WHEN** the form renders inside `ContactSection`
- **THEN** inputs sit in a 2-column grid on desktop (stacked on mobile), line pills wrap in a flex group, the message area shows 3 rows, and the sm submit sits right-aligned with an arrow glyph
