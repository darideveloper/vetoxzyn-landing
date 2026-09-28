## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Single gallery instance across breakpoints
The section SHALL render exactly one `ProductGallery` instance whose position is controlled by CSS order/overlap (not by duplicating the slider per breakpoint), so a single autoplay timer and hydration cost serve all viewports.

#### Scenario: No duplicate sliders
- **WHEN** the page renders at any viewport width
- **THEN** exactly one gallery region exists in the DOM and in the accessibility tree
