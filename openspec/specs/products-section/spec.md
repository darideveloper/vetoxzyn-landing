## ADDED Requirements

### Requirement: Products section structure and anchors
The system SHALL render a static `Products` organism on `/` with `id="section-3"`, composed of a section header, a two-panel split (Tópico light / Instalaciones dark), and a formula banner, with no client-side JavaScript.

#### Scenario: Section composition
- **WHEN** a visitor loads `/`
- **THEN** a `#section-3` region appears between Hero and Contact containing an in-flow `h2` header (`Líneas para tu clínica y quirófano`) with sub copy above the split (flattened from the design's absolute overlay), two half-panels side by side on desktop, and a full-width formula banner at the bottom

#### Scenario: Hero anchor fulfilled
- **WHEN** a visitor activates the Hero secondary CTA (`Ver línea Tópico`, `href="#section-3"`)
- **THEN** the browser navigates to the Products section and keyboard focus can move into it

### Requirement: Panel content and HUD specs
Each panel SHALL render its title, subhead, vertical pill, background image treatment, HUD spec grid (Concentración / pH / ORP / Toxicidad / Presentaciones with exact design values), and one product CTA.

#### Scenario: Tópico light panel
- **WHEN** the light panel renders
- **THEN** it shows title `Tópico`, sub `Higiene tópica de piel, mucosas y áreas post-quirúrgicas.`, specs `100 ppm (0.010%)` / `6.0–7.5 (neutro)` / `> 850 mV` / `Grado 0 (no irritante)` / `30ml a 950ml`, and a light-tone CTA

#### Scenario: Instalaciones dark panel
- **WHEN** the dark panel renders
- **THEN** it shows title `Instalaciones`, sub `Superficies, instrumental, áreas de consulta y quirófano, agua.`, specs `500 ppm (0.050%)` / `6.0–7.5 (neutro)` / `> 900 mV` / `Grado 0 (no irritante)` / `1L · 4L · 20L`, and a dark-tone CTA

### Requirement: Voted atoms reuse
The panels SHALL use `Button variant="product" tone="light"` (Tópico) and `tone="dark"` (Instalaciones) for the `Ver ficha técnica` CTAs with an `arrow_forward` glyph, and `Badge variant="feature" icon="water_drop"|"cleaning_services"` for the two vertical `No requiere enjuague` pills (intentional restyle: glass feature pills replace the design's solid orange/pink pills per the P3-drop vote). The contact section SHALL carry `id="section-5"` so all `#section-5` links land. No new atom SHALL be created.

#### Scenario: Product CTAs
- **WHEN** the panels render their CTAs
- **THEN** both are full-width rectangular uppercase buttons (orange on light, burdeos on dark) labeled `Ver ficha técnica` with an arrow glyph, each linking to `#section-5`, and the contact section carries `id="section-5"`

#### Scenario: Vertical pills
- **WHEN** the panels render their edge pills
- **THEN** each shows a `No requiere enjuague` feature pill with its icon (`water_drop` light / `cleaning_services` dark) in a vertical writing-mode wrapper

### Requirement: Formula banner
The section SHALL render a bottom banner with `Fórmula: H₂O + NaCl + electrólisis = HOCl`, `Mecanismo: Lisis por oxidación en segundos`, and `Sin residuos persistentes`.

#### Scenario: Banner content
- **WHEN** the section renders
- **THEN** all three banner items are visible (stacked on mobile, separated row on desktop) with the no-residue item emphasized

### Requirement: Responsive behavior
The section SHALL stack panels vertically on mobile (content first, HUD below) and split `flex-col lg:flex-row` (50/50) on desktop, with wrapping CTAs, no horizontal overflow at 390/768/1280px, and vertical pills positioned without overlapping HUD content.

#### Scenario: Mobile stacking
- **WHEN** the viewport is 390px wide
- **THEN** panels stack full-width, text remains readable, CTAs wrap without horizontal scroll, and no element overflows the viewport

### Requirement: Local optimized imagery
Both panel backgrounds SHALL be local WebP images under `src/assets/products/` rendered via `astro:assets Image` (responsive widths+sizes, `loading="lazy"`); no external image hotlink SHALL remain in this section.

#### Scenario: Optimized local render
- **WHEN** the page builds and loads `/`
- **THEN** both panel images are served from local build output with the luminosity treatment intact and no `googleusercontent` URL appears in the section markup

### Requirement: Accessibility and brand rules
The section SHALL keep unskipped heading order (section `h2` → panel `h3`s), decorative layers hidden from assistive tech, meaningful alt text on both images, keyboard-operable CTAs with visible focus, `prefers-reduced-motion` disabling the pan animation, and safe-vocabulary copy (no cura/trata/desinfectante-clínico claims).

#### Scenario: Assistive-tech pass
- **WHEN** a screen-reader or keyboard user traverses the section
- **THEN** headings announce in order, images expose alt text, both CTAs are reachable/operable by keyboard, and no decorative gradient/pan layer is announced
