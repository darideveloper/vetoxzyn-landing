## Purpose

Static Challenges organism (`#desafios`) pairing a content card with a floating media card.
## Requirements
### Requirement: Challenges section structure
The system SHALL render a static `Challenges` organism as `section#desafios` combining the left content card (white `rounded-[24px]`, Eyebrow + H2 + sub + feature rows) with the right floating media card (white `p-4 rounded-[32px]`, `aspect-[4/5]` image + gradient overlay + HUD badges), overlapping via `lg:-ml-16` with hover lift via the existing `.tilt-float` utility (no static tilt, Hero-consistent), with eyebrow, H2, sub, feature rows, section image and badges sourced from the avatar data prop.

#### Scenario: Section composition
- **WHEN** a visitor loads an avatar page on desktop
- **THEN** `section#desafios` shows a 7-col content card beside a 5-col tilted media card overlapping the content card edge, with the avatar's two badges overlaid on the media card

#### Scenario: Mount order
- **WHEN** the avatar page template renders
- **THEN** `<Challenges />` appears directly after `<Hero />` inside the shared `Layout`, before the remaining page sections

### Requirement: Challenges copy
The organism SHALL render the eyebrow, H2, sub and each feature row (row title plus `Desafío:` and `Enfoque:`/`Solución:` lines) from the avatar data prop, using safe-vocabulary Spanish, with the row template prefixes (`Desafío:` / `Enfoque:`) provided by the organism or the data.

#### Scenario: Copy per avatar
- **WHEN** the section renders for a given avatar
- **THEN** all headings, sub, and Desafío/Solución paragraphs match that avatar's JSON values, including accents

### Requirement: Challenges atom reuse
The organism SHALL reuse standardized atoms with zero atom edits: `Eyebrow` E2 default (`science` icon), `Icon variant="circle" tone="orange" size="lg"` ×3 (`shield`, `water_drop`, `eco`), `Badge variant="tag" tone="dark"` without icon (CLINICAL GRADE with pulse dot), and `Badge variant="tag" tone="light" icon="verified"` (99.9% PURE). No `Button`, `Card C1`, or form atoms SHALL appear in this section.

#### Scenario: Atom mapping
- **WHEN** the section renders
- **THEN** feature rows show orange circle icons, the media card shows the black/orange CLINICAL GRADE tag and the white verified 99.9% PURE tag, and no other atom variants are introduced

### Requirement: Challenges responsive behavior
The section SHALL be fully responsive: single-column stacked layout (content card first, media card below, no overlap/rotation offset causing overflow) on mobile, `lg:grid-cols-12` (7+5 with `-ml-16` overlap) on desktop, fluid type, and no horizontal overflow at 390/768/1280px viewports.

#### Scenario: Mobile stacking
- **WHEN** the viewport is 390px wide
- **THEN** content stacks above the media card with no overlap (`-ml-16`) or rotation offsets applied, badges stay inside the viewport, and no horizontal scroll appears

### Requirement: Challenges local WebP image
The media card visual SHALL render a local image resolved from the avatar's co-located content folder via the collection `image()` helper and `astro:assets` (`loading="lazy"`, responsive widths+sizes, no upscaling beyond native); no external hotlink SHALL remain in the section.

#### Scenario: Optimized local render
- **WHEN** an avatar page builds and loads
- **THEN** the challenges image is served from that avatar's local build output (responsive AVIF-first) with the gradient overlay intact and `decoding="async"`

### Requirement: Challenges accessibility and brand rules
The section SHALL contain no H1 (H2 top heading, H4 row titles, unskipped order), expose `aria-labelledby` on the section, hide decorative overlays from assistive tech, provide meaningful Spanish alt on the image, honor `prefers-reduced-motion` for tilt/rotate, keep keyboard-reachable content with visible focus, and use safe-vocabulary copy (no cura/trata/desinfectante clínico claims).

#### Scenario: Assistive-tech pass
- **WHEN** a screen-reader or keyboard user traverses the section
- **THEN** headings announce in order (no duplicate H1), the image exposes its alt, badges are read as plain text (no duplicated icon names), and tilt animations are disabled under reduced-motion

