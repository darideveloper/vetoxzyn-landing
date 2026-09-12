## MODIFIED Requirements

### Requirement: Voted atoms reuse
The panels SHALL use `Button variant="product" tone="light"` (Tópico) and `tone="dark"` (Instalaciones) for the `Más información` CTAs with an `arrow_forward` glyph, each carrying `mt-md` top margin separating it from its HUD spec grid, and `Badge variant="feature" icon="water_drop"|"cleaning_services"` for the two vertical `No requiere enjuague` pills (intentional restyle: glass feature pills replace the design's solid orange/pink pills per the P3-drop vote). The contact section SHALL keep `id="contacto"` per `section-anchors`, while the product CTAs target the `#contacto-formulario` form wrapper. No new atom SHALL be created.

#### Scenario: Product CTAs
- **WHEN** the panels render their CTAs
- **THEN** both are full-width rectangular uppercase buttons (orange on light, burdeos on dark) labeled `Más información` with an arrow glyph, each linking to `#contacto-formulario`, each separated from its spec grid by `mt-md`

#### Scenario: Vertical pills
- **WHEN** the panels render their edge pills
- **THEN** each shows a `No requiere enjuague` feature pill with its icon (`water_drop` light / `cleaning_services` dark) in a vertical writing-mode wrapper
