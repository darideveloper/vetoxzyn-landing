## MODIFIED Requirements

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

### Requirement: Challenges local WebP image
The media card visual SHALL render a local image resolved from the avatar's co-located content folder via the collection `image()` helper and `astro:assets` (`loading="lazy"`, responsive widths+sizes, no upscaling beyond native); no external hotlink SHALL remain in the section.

#### Scenario: Optimized local render
- **WHEN** an avatar page builds and loads
- **THEN** the challenges image is served from that avatar's local build output (responsive AVIF-first) with the gradient overlay intact and `decoding="async"`
