## ADDED Requirements

### Requirement: Testimonials content model
The system SHALL source testimonial content from `src/data/testimonials.ts` as a const array of exactly 3 entries, each with verbatim Stitch Spanish quote, name, clinic/city role line, and accent (`orange` | `pink` | `green`).

#### Scenario: Single content source
- **WHEN** the testimonials section renders
- **THEN** all 3 cards display the Stitch copy verbatim (Dr. Alejandro Méndez / Clínica Veterinaria San José · Ciudad de México; Dra. Sofía Ramírez / Hospital Veterinario Central · Guadalajara; MVZ Carlos Valdés / Clínica BioPet · Monterrey) driven from the data file with no duplicated literals in components

### Requirement: Testimonials section placement and anchor
The system SHALL render the testimonials section on `/` after the placeholder benefits block and before contact with `id="section-3"`, leaving the placeholder in place until `02-challenges` replaces it, so the existing Hero secondary CTA (`href="#section-3"`) navigates to it.

#### Scenario: Anchor navigation
- **WHEN** a visitor activates Hero's "Ver línea Tópico" CTA or loads `/#section-3`
- **THEN** the browser scrolls to the testimonials section

### Requirement: Testimonials header
The section SHALL render a centered header consisting of standard E2 `Eyebrow` (science icon, `EVIDENCIA CLÍNICA`), H2 `Lo que dicen los veterinarios`, and the Stitch subhead about documented real experiences.

#### Scenario: Header composition
- **WHEN** a visitor views the section header
- **THEN** eyebrow pill, H2, and subhead appear centered in that order using the unchanged `Eyebrow` atom (no pink-outline override)

### Requirement: Testimonial card composition
Each card SHALL compose the unchanged `Card` C1 shell with a left accent bar (`w-1`, orange/pink/green per entry), a bare filled `format_quote` `Icon` (`text-4xl opacity-50`, matching tone), the italic quote, and a bordered footer with bold name + caption role/clinic line.

#### Scenario: Three accent variants
- **WHEN** the grid renders
- **THEN** card 1 shows an orange bar/quote icon, card 2 pink, card 3 green (`tertiary-fixed-dim`), each footer separated by a top border, with no bespoke card shell duplicating `Card` styles

### Requirement: Testimonials responsive layout and background
The section SHALL render a `grid-cols-1 md:grid-cols-3 gap-gutter` grid over section-owned decor (fluid wash + two blurred brand blobs, hidden from assistive tech), stacking without horizontal overflow at 390/768/1280px viewports.

#### Scenario: Mobile stacking
- **WHEN** the viewport is 390px wide
- **THEN** cards stack single-column, blobs are clipped with no horizontal scroll, and the grid expands to 3 columns at desktop widths

### Requirement: Testimonials static behavior and accessibility
The section SHALL be fully static (no React island, no store, no interactivity beyond `tilt-float` hover), keep a single page H1 (section uses H2), unskipped heading order, decorative background hidden from assistive tech, and `vetoxzyn®` lowercase + ® spelling in the third quote.

#### Scenario: Assistive-tech pass
- **WHEN** a screen-reader or keyboard user traverses the section
- **THEN** one H2 is announced in order, background decor is ignored, all text is readable without client JS, and quote marks/icons expose no redundant announcements
