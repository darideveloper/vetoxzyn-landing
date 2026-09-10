## MODIFIED Requirements

### Requirement: Testimonials responsive layout and background
The section SHALL render a transparent shell over the global fixed wash (no section-owned wash fill, no `clip-path`), with a `grid-cols-1 gap-gutter` grid that becomes `md:grid-cols-[1fr_5vw_1fr_5vw_1fr]` on desktop, with decorative square divider images (fixed dog-photography stock, `aria-hidden`, empty `alt`) interleaved between the 3 cards: full-width `h-24` strips when stacked on mobile, `5vw`-wide × 60%-of-row-height centered strips on desktop (`md:h-[60%] md:self-center`, `object-cover` crop). The grid carries `mt-12` so the overflowing avatars keep breathing room below the subhead. Background decor SHALL be exactly the two blurred brand blobs (`bg-brand-orange/10 blur-3xl`, `bg-brand-pink/10 blur-3xl`, hidden from assistive tech) layered above the global wash inside an `overflow-x-clip` section, stacking without horizontal overflow at 390/768/1280px viewports and never vertically clipped.

#### Scenario: Mobile stacking with divider strips
- **WHEN** the viewport is 390px wide
- **THEN** cards and full-width short divider strips stack single-column (card / divider / card / divider / card), blobs bleed without horizontal scroll, and the grid expands to the 5-track card/divider layout at desktop widths

#### Scenario: Unclipped decorators over global wash
- **WHEN** a visitor views the section at any viewport
- **THEN** no slash-cut wash is visible, both blurred blobs render whole above the continuous global background, and the section shell itself contributes no background fill
