## MODIFIED Requirements

### Requirement: Hero responsive behavior
The hero SHALL be fully responsive: single-column stacked layout (content first, visual below) on mobile with all content-column items centered below the `md` breakpoint (eyebrow, H1, subcopy, bullet block, and CTA row) and left-aligned at `md` and up, `lg:grid-cols-12` (7+5) on desktop, fluid type (`display-lg-mobile` → `md:display-lg`), and no horizontal overflow at 390/768/1280px viewports.

#### Scenario: Mobile stacking
- **WHEN** the viewport is 390px wide
- **THEN** content stacks above the visual card with Stitch spacing (`px-gutter`), CTAs wrap without horizontal scroll, and blobs are clipped without horizontal scroll

#### Scenario: Mobile centering
- **WHEN** the viewport is below the `md` breakpoint
- **THEN** the eyebrow, H1, and subcopy are text-centered, the bullet list renders as a shrink-wrapped centered block with icon rows left-aligned inside, and the CTA row is center-justified

#### Scenario: Tablet and desktop alignment
- **WHEN** the viewport is at `md` or wider
- **THEN** the content column returns to left-aligned (`items-start`, `text-left`), the subcopy loses its auto margins, and the CTA row is start-justified

## ADDED Requirements

### Requirement: Single motion owner for hero CTAs
Each hero CTA SHALL have exactly one hover-motion owner: the `Button` atom's own `hover:scale-105`. The `tilt-float` effect SHALL NOT be applied to hero `Button`s; it remains available for non-interactive surfaces such as the hero visual card.

#### Scenario: Smooth CTA hover
- **WHEN** a visitor hovers either hero CTA
- **THEN** the button scales smoothly once with no snap, pop, or competing tilt/lift motion
