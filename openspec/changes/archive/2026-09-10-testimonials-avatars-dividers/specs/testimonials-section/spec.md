## MODIFIED Requirements

### Requirement: Testimonials content model
The system SHALL source testimonial content from `src/data/testimonials.ts` as a const array of exactly 3 entries, each with verbatim Stitch Spanish quote, name, clinic/city role line, accent (`orange` | `pink` | `green`), and `avatar` stock portrait URL (gender-matched medical-professional photo, square, swappable URL-only for real client photos).

#### Scenario: Single content source
- **WHEN** the testimonials section renders
- **THEN** all 3 cards display the Stitch copy verbatim (Dr. Alejandro Méndez / Clínica Veterinaria San José · Ciudad de México; Dra. Sofía Ramírez / Hospital Veterinario Central · Guadalajara; MVZ Carlos Valdés / Clínica BioPet · Monterrey) driven from the data file with no duplicated literals in components, and each card shows its entry's avatar half-overflowing the card top

### Requirement: Testimonial card composition
Each card SHALL compose the unchanged `Card` C1 shell (`overflow-visible`) with a left accent bar (`w-1 rounded-l-xl`, orange/pink/green per entry), a circular client avatar (`h-24 w-24 rounded-full`, white ring + shadow, centered with `-top-12` so half overflows the card; `width`/`height` + `loading="lazy"`), an `h-8` spacer keeping the quote clear of the overlap, a bare filled `format_quote` `Icon` (`text-4xl opacity-50`, matching tone), the italic quote, and a bordered footer with bold name + caption role/clinic line.

#### Scenario: Three accent variants with avatars
- **WHEN** the grid renders
- **THEN** card 1 shows an orange bar/quote icon, card 2 pink, card 3 green (`tertiary-fixed-dim`), each footer separated by a top border, each card topped by its author's circular photo half above the card edge, with no bespoke card shell duplicating `Card` styles

### Requirement: Testimonials responsive layout and background
The section SHALL render a `grid-cols-1 gap-gutter` grid that becomes `md:grid-cols-[1fr_5vw_1fr_5vw_1fr]` on desktop, with decorative square divider images (fixed dog-photography stock, `aria-hidden`, empty `alt`) interleaved between the 3 cards: full-width `h-24` strips when stacked on mobile, `5vw`-wide × 60%-of-row-height centered strips on desktop (`md:h-[60%] md:self-center`, `object-cover` crop). The grid carries `mt-12` so the overflowing avatars keep breathing room below the subhead. Background stays section-owned decor (fluid wash + two blurred brand blobs, hidden from assistive tech), stacking without horizontal overflow at 390/768/1280px viewports.

#### Scenario: Mobile stacking with divider strips
- **WHEN** the viewport is 390px wide
- **THEN** cards and full-width short divider strips stack single-column (card / divider / card / divider / card), blobs are clipped with no horizontal scroll, and the grid expands to the 5-track card/divider layout at desktop widths
