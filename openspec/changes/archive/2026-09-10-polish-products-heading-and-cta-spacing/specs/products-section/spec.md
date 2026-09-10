## ADDED Requirements

### Requirement: Single-line Instalaciones title
The Instalaciones panel `h3` SHALL render the title as the single word `Instalaciones` with no forced line break; natural text wrapping on narrow viewports remains allowed.

#### Scenario: Single-line render
- **WHEN** the dark panel renders its title
- **THEN** the heading text is `Instalaciones` with no `<br/>` break, and no horizontal overflow occurs at 390px

## MODIFIED Requirements

### Requirement: Voted atoms reuse
The panels SHALL use `Button variant="product" tone="light"` (Tópico) and `tone="dark"` (Instalaciones) for the `Ver ficha técnica` CTAs with an `arrow_forward` glyph, each carrying `mt-md` top margin separating it from its HUD spec grid, and `Badge variant="feature" icon="water_drop"|"cleaning_services"` for the two vertical `No requiere enjuague` pills (intentional restyle: glass feature pills replace the design's solid orange/pink pills per the P3-drop vote). The contact section SHALL carry `id="section-5"` so all `#section-5` links land. No new atom SHALL be created.

#### Scenario: Product CTAs
- **WHEN** the panels render their CTAs
- **THEN** both are full-width rectangular uppercase buttons (orange on light, burdeos on dark) labeled `Ver ficha técnica` with an arrow glyph, each linking to `#section-5`, each separated from its spec grid by `mt-md`, and the contact section carries `id="section-5"`

#### Scenario: Vertical pills
- **WHEN** the panels render their edge pills
- **THEN** each shows a `No requiere enjuague` feature pill with its icon (`water_drop` light / `cleaning_services` dark) in a vertical writing-mode wrapper
