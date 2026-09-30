## Purpose

Two-panel Products split (Tópico light / Instalaciones dark) with HUD spec grids, product CTAs, and formula banner on `/`.
## Requirements
### Requirement: Products section structure and anchors
The system SHALL render a static `Products` organism on `/` with `id="productos"` (per `SECTION_IDS.productos`), composed of a section header, a two-panel split (Tópico light / Instalaciones dark), and a `ProductGallery` proof strip, with client-side JavaScript limited to the gallery island (`client:visible`) and the existing GSAP reveal block.

#### Scenario: Section composition
- **WHEN** a visitor loads `/`
- **THEN** a `#productos` region appears between Testimonials and Contact containing an in-flow centered `SectionHeader` (`Dos contextos de uso, una orientación más clara`) with sub copy above the split, two half-panels side by side on desktop, and the gallery strip (between panels on mobile, overlapping below them on desktop)

#### Scenario: Hero anchor fulfilled
- **WHEN** a visitor activates a CTA targeting the Products section (`href="#productos"`)
- **THEN** the browser navigates to the Products section and keyboard focus can move into it

#### Scenario: GSAP ignores the gallery
- **WHEN** the Products scroll animation runs
- **THEN** the header and the two panels animate as before while the gallery strip is never selected by the panel reveal timeline and never blocks panel animation

### Requirement: Panel content and HUD specs
Each panel SHALL render its title, subhead, vertical pill, background image treatment, HUD spec grid (Concentración / pH / ORP / Toxicidad / Presentaciones with exact design values), and one product CTA.

#### Scenario: Tópico light panel
- **WHEN** the light panel renders
- **THEN** it shows title `Tópico`, sub `Higiene tópica de piel, mucosas y áreas post-quirúrgicas.`, specs `100 ppm (0.010%)` / `6.0–7.5 (neutro)` / `> 850 mV` / `Grado 0 (no irritante)` / `60 ml a 950 ml`, and a light-tone CTA

#### Scenario: Instalaciones dark panel
- **WHEN** the dark panel renders
- **THEN** it shows title `Instalaciones`, sub `Superficies, instrumental, áreas de consulta y quirófano, agua.`, specs `500 ppm (0.050%)` / `6.0–7.5 (neutro)` / `> 900 mV` / `Grado 0 (no irritante)` / `4L · 23L`, and a dark-tone CTA

### Requirement: Voted atoms reuse
The panels SHALL use `Button variant="product" tone="light"` (Tópico) and `tone="dark"` (Instalaciones) for the `Más información` CTAs with an `arrow_forward` glyph, each carrying `mt-md` top margin separating it from its HUD spec grid, and `Badge variant="feature" icon="water_drop"|"cleaning_services"` for the two vertical `No requiere enjuague` pills (intentional restyle: glass feature pills replace the design's solid orange/pink pills per the P3-drop vote). The contact section SHALL keep `id="contacto"` per `section-anchors`, while the product CTAs target the `#contacto-formulario` form wrapper. No new atom SHALL be created.

#### Scenario: Product CTAs
- **WHEN** the panels render their CTAs
- **THEN** both are full-width rectangular uppercase buttons (orange on light, burdeos on dark) labeled `Más información` with an arrow glyph, each linking to `#contacto-formulario`, each separated from its spec grid by `mt-md`

#### Scenario: Vertical pills
- **WHEN** the panels render their edge pills
- **THEN** each shows a `No requiere enjuague` feature pill with its icon (`water_drop` light / `cleaning_services` dark) in a vertical writing-mode wrapper

### Requirement: Formula banner
The section SHALL render a bottom banner with `Fórmula: H₂O + NaCl + electrólisis = HOCl`, `Mecanismo: Lisis por oxidación en segundos`, and `Sin residuos persistentes`.

#### Scenario: Banner content
- **WHEN** the section renders
- **THEN** all three banner items are visible (stacked on mobile, separated row on desktop) with the no-residue item emphasized

### Requirement: Responsive behavior
The section SHALL stack panels vertically on mobile (content first, HUD below) with the gallery ordered between them, and place both panels side by side on desktop (50/50 via grid) with the gallery as a full-width strip in a second row sitting directly on the panels' extended animated backgrounds, with wrapping CTAs, no horizontal overflow at 390/768/1280px, and vertical pills positioned without overlapping HUD content. Each vertical pill SHALL be bottom-anchored (`bottom-lg`) inside its panel's padded content column (not centered on the full-height article), sitting alongside its HUD card with a clear horizontal gap (HUD cards carry `sm:ml-md` / `sm:mr-md`), and fully below the panel title text.

#### Scenario: Mobile stacking
- **WHEN** the viewport is 390px wide
- **THEN** panels stack full-width with the gallery strip ordered between them (light → gallery → dark), text remains readable, CTAs wrap without horizontal scroll, and no element overflows the viewport

#### Scenario: Desktop overlap strip
- **WHEN** the viewport is 1280px wide
- **THEN** both panels sit side by side and span into the gallery row, while the gallery renders as a full-width strip in that row over their real photo backgrounds with gutters intact, covering no CTA, and introducing no horizontal scroll

#### Scenario: Tablet pill placement
- **WHEN** the viewport is 768px wide (stacked panels, pills visible)
- **THEN** each pill's top edge is below its panel title, its bottom edge sits ~24px under its HUD card's bottom edge, and a ~22px horizontal gap separates pill and card with no viewport overflow

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

### Requirement: Single-line Instalaciones title
The Instalaciones panel `h3` SHALL render the title as the single word `Instalaciones` with no forced line break; natural text wrapping on narrow viewports remains allowed.

#### Scenario: Single-line render
- **WHEN** the dark panel renders its title
- **THEN** the heading text is `Instalaciones` with no `<br/>` break, and no horizontal overflow occurs at 390px

### Requirement: Single gallery instance across breakpoints
The section SHALL render at most one `ProductGallery` instance — exactly one when the gallery source folder resolves at least one slide, zero when it resolves none — whose position is controlled by CSS order/overlap (not by duplicating the slider per breakpoint), so a single autoplay timer and hydration cost serve all viewports.

#### Scenario: No duplicate sliders
- **WHEN** the page renders at any viewport width with images present in the gallery folder
- **THEN** exactly one gallery region exists in the DOM and in the accessibility tree

#### Scenario: Empty source omits the strip
- **WHEN** the gallery source folder contains no image files
- **THEN** no gallery region, slide, or seam-blur band exists in the DOM or the accessibility tree, the two panels still render, and the empty grid row collapses to zero height

