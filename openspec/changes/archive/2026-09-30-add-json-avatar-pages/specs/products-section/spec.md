## ADDED Requirements

### Requirement: Single-line panel layout
When an avatar declares only one product line, the section SHALL render that single panel full-width on desktop (spanning the space the two panels would occupy) rather than leaving an empty half, with the gallery strip behavior unchanged.

#### Scenario: Single-line avatar fills the row
- **WHEN** an avatar declares only one product line and the viewport is desktop width
- **THEN** the single panel spans the full content width with no empty second panel, and the gallery strip still renders per its own rules

## MODIFIED Requirements

### Requirement: Products section structure and anchors
The system SHALL render a static `Products` organism on each avatar page with `id="productos"` (per `SECTION_IDS.productos`), composed of a section header, a split of the product lines the avatar declares (`Tópico` light / `Instalaciones` dark; one or both), and a `ProductGallery` proof strip, with client-side JavaScript limited to the gallery island (`client:visible`) and the existing GSAP reveal block.

#### Scenario: Section composition
- **WHEN** a visitor loads an avatar page
- **THEN** a `#productos` region appears between Testimonials and Contact containing a centered `SectionHeader` from the avatar's copy above the split, the declared panel(s) side by side on desktop, and the gallery strip (between panels on mobile, overlapping below them on desktop)

#### Scenario: Hero anchor fulfilled
- **WHEN** a visitor activates a CTA targeting the Products section (`href="#productos"`)
- **THEN** the browser navigates to the Products section and keyboard focus can move into it

#### Scenario: GSAP ignores the gallery
- **WHEN** the Products scroll animation runs
- **THEN** the header and panels animate as before while the gallery strip is never selected by the panel reveal timeline and never blocks panel animation

### Requirement: Panel content and HUD specs
Each panel SHALL render its title, tagline, vertical pill, background image treatment, HUD spec grid (Concentración / pH / ORP / Toxicidad / Presentaciones with exact global design values), and one product CTA; the title, tagline and image SHALL come from the avatar data while the spec values and labels stay global. The section SHALL also render the global formula banner (Fórmula / Mecanismo / Sin residuos) from `src/data/products.ts` on every avatar page.

#### Scenario: Tópico light panel
- **WHEN** the light panel renders
- **THEN** it shows the avatar's light-line title and tagline, the global Tópico specs `100 ppm (0.010%)` / `6.0–7.5 (neutro)` / `> 850 mV` / `Grado 0 (no irritante)` / `30ml a 950ml`, and a light-tone CTA

#### Scenario: Instalaciones dark panel
- **WHEN** the dark panel renders
- **THEN** it shows the avatar's dark-line title and tagline, the global Instalaciones specs `500 ppm (0.050%)` / `6.0–7.5 (neutro)` / `> 900 mV` / `Grado 0 (no irritante)` / `1L · 4L · 20L`, and a dark-tone CTA

#### Scenario: Formula banner is global
- **WHEN** any avatar page renders the products section
- **THEN** the formula banner shows the global `Fórmula: H₂O + NaCl + electrólisis = HOCl`, `Mecanismo: Lisis por oxidación en segundos`, and `Sin residuos persistentes` values, identical on every avatar page

### Requirement: Local optimized imagery
Both panel backgrounds SHALL be local images resolved from the avatar's co-located content folder via the collection `image()` helper and `astro:assets` (responsive widths+sizes, `loading="lazy"`); no external image hotlink SHALL remain in this section.

#### Scenario: Optimized local render
- **WHEN** an avatar page builds and loads
- **THEN** both panel images are served from that avatar's local build output with the luminosity treatment intact and no external URL appears in the section markup
