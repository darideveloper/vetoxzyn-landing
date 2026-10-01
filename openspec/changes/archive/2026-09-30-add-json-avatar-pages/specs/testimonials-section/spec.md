## MODIFIED Requirements

### Requirement: Testimonials content model
The system SHALL source testimonial content from the avatar's JSON data (passed as a prop), as an array of 2–3 entries each with a Spanish quote, name, an optional role/organization line (empty or omitted SHALL render the name alone), accent (`orange` | `pink` | `green`), and a co-located `avatar` image resolved via the collection `image()` helper; the previous global `src/data/testimonials.ts` module SHALL no longer be the source for avatar page rendering.

#### Scenario: Per-avatar testimonials
- **WHEN** the testimonials section renders for two different avatars
- **THEN** each shows its own authored entries (quote, name, role, accent, portrait) with no duplicated literals in the component, and each card shows its entry's avatar half-overflowing the card top

#### Scenario: Entry count guard kept
- **WHEN** an avatar declares fewer than 2 or more than 3 testimonials
- **THEN** the section fails loudly rather than rendering a malformed grid

### Requirement: Testimonials header
The section SHALL render a centered header consisting of the standard `Eyebrow` (global `science` icon), an H2, and a subhead, all sourced from the avatar data prop (previously fixed to `EVIDENCIA CLÍNICA` / `Lo que dicen los veterinarios`).

#### Scenario: Header composition
- **WHEN** a visitor views the section header for a given avatar
- **THEN** eyebrow pill, H2, and subhead appear centered in that order using the unchanged `Eyebrow` atom, with text from the avatar JSON

### Requirement: Testimonials responsive layout and background
The section SHALL render a transparent shell over the global fixed wash (no section-owned wash fill, no `clip-path`), with a `grid-cols-1 gap-gutter` grid that becomes `md:grid-cols-[1fr_5vw_1fr_5vw_1fr]` on desktop, with decorative square divider images resolved from the avatar's data/co-located folder (rendered via `DividerImage` as `astro:assets` with `widths [400, 800]`, `aria-hidden`, empty `alt`) interleaved between the cards: full-width `h-24` strips when stacked on mobile, `5vw`-wide × 60%-of-row-height centered strips on desktop (`md:h-[60%] md:self-center`, `object-cover` crop). The grid carries `mt-12` so the overflowing avatars keep breathing room below the subhead. Background decor SHALL remain exactly the two blurred brand blobs (`bg-brand-orange/10 blur-3xl`, `bg-brand-pink/10 blur-3xl`, hidden from assistive tech) layered above the global wash inside an `overflow-x-clip` section, stacking without horizontal overflow at 390/768/1280px viewports and never vertically clipped. No external image hotlink SHALL remain in the section.

#### Scenario: Mobile stacking with divider strips
- **WHEN** the viewport is 390px wide
- **THEN** cards and full-width short divider strips stack single-column (card / divider / card / divider / card), blobs bleed without horizontal scroll, and the grid expands to the 5-track card/divider layout at desktop widths

#### Scenario: Dividers are local masters
- **WHEN** the grid renders on any viewport
- **THEN** both divider strips are served from the avatar's local build output (responsive `astro:assets`, `widths [400, 800]`) and no external image URL appears in the section markup
