## Purpose

Hybrid A2 hero organism (layout shell + bullet list + visual card) for the landing page.
## Requirements
### Requirement: Hybrid A2 hero structure
The system SHALL render a hero organism combining the `01-hero-layout` shell (animated blob background, content column + visual glass card) with the `01-hero-bullet-list` vertical feature rows, sourcing its copy, bullets, overlay card, hero image and CTA targets from the page's avatar data prop rather than hardcoded A2 literals. The visual glass card SHALL render at its designed width (28rem cap, filling its 5-col cell); width utilities shadowed by the Stitch spacing scale (bare `max-w-xs/sm/md/lg/xl`, which compile to 4/12/24/48/80px) SHALL NOT be used — explicit arbitrary rem values SHALL be used instead.

#### Scenario: Hero composition
- **WHEN** a visitor loads any avatar page on desktop
- **THEN** the hero shows the avatar's eyebrow + H1 + sub + bullet rows + 2 CTAs in a 7-col content column beside a 5-col visual glass card with bottom avatar overlay, over animated blobs

#### Scenario: Bullets per avatar
- **WHEN** the hero renders its bullet items
- **THEN** the bullet labels come from the avatar data while the bullet icons remain global code constants (per the no-per-avatar-icon decision), and no glass-pill badges row is rendered

#### Scenario: Card fills its cell
- **WHEN** a visitor loads an avatar page at 1280px viewport
- **THEN** the visual card measures ~448×560px with its image filling the card, and no shadowed max-width utility applies to the hero card

### Requirement: Hero copy and CTAs
The hero SHALL render the eyebrow, H1, subtitle, CTA labels, overlay-card name/role and CTA link targets from the avatar data prop; the primary CTA SHALL target the contact form anchor and the secondary CTA the products anchor via `SECTION_IDS`.

#### Scenario: CTA targets
- **WHEN** a visitor activates the primary or secondary CTA
- **THEN** the browser navigates to the contact-form anchor or the products anchor respectively, keyboard-focusable with visible focus state

#### Scenario: Copy comes from data
- **WHEN** the hero renders for a given avatar
- **THEN** its eyebrow, H1, subtitle and CTA labels match that avatar's JSON values verbatim

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

### Requirement: Hero local WebP image
The hero visual SHALL render a local image resolved from the avatar's co-located content folder via the collection `image()` helper and `astro:assets` (eager, `fetchpriority="high"`, widths+sizes); no external hotlink SHALL remain in the hero.

#### Scenario: Optimized local render
- **WHEN** an avatar page builds and loads
- **THEN** the hero card image is served from that avatar's local build output (AVIF-first responsive output) and displays with the luminosity/opacity treatment and avatar overlay intact

### Requirement: Hero accessibility and brand rules
The hero SHALL contain exactly one H1 per page, unskipped heading order, decorative blobs hidden from assistive tech, meaningful alt on the hero image, `vetoxzyn®` lowercase + ® spelling, and safe-vocabulary copy (no cura/trata/desinfectante clínico claims).

#### Scenario: Assistive-tech pass
- **WHEN** a screen-reader or keyboard user traverses the hero
- **THEN** one H1 is announced, blobs are ignored, CTAs are reachable/operable by keyboard, and the image exposes its alt text

### Requirement: Single motion owner for hero CTAs
Each hero CTA SHALL have exactly one hover-motion owner: the `Button` atom's own `hover:scale-105`. The `tilt-float` effect SHALL NOT be applied to hero `Button`s; it remains available for non-interactive surfaces such as the hero visual card.

#### Scenario: Smooth CTA hover
- **WHEN** a visitor hovers either hero CTA
- **THEN** the button scales smoothly once with no snap, pop, or competing tilt/lift motion

