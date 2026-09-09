## ADDED Requirements

### Requirement: Challenges section structure
The system SHALL render a static `Challenges` organism as `section#desafios` combining the `02-challanges` left content card (white `rounded-[24px]`, Eyebrow + H2 + sub + 3 feature rows) with the right floating media card (white `p-4 rounded-[32px]`, `aspect-[4/5]` image + gradient overlay + 2 HUD badges), overlapping via `lg:-ml-16` with hover lift via the existing `.tilt-float` utility (no static tilt, Hero-consistent).

#### Scenario: Section composition
- **WHEN** a visitor loads `/` on desktop
- **THEN** below the hero a `section#desafios` shows a 7-col content card beside a 5-col tilted media card overlapping the content card edge, with CLINICAL GRADE top-left and 99.9% PURE bottom-right badges overlaid

#### Scenario: Mount order
- **WHEN** `src/pages/index.astro` renders
- **THEN** `<Challenges />` appears directly after `<Hero />` inside the shared `Layout`, before the remaining page sections

### Requirement: Challenges copy
The organism SHALL use the exact Stitch ES strings: eyebrow `Dr. Resultados`, H2 `Transciende los Obstáculos Clínicos`, sub `Soluciones biomiméticas diseñadas para superar los desafíos diarios en bioseguridad e higiene veterinaria, garantizando resultados predecibles y seguros.`, and the 3 rows (Cero Corrosión / Alta Pureza / Biodegradable) each with `Desafío:` (`text-on-surface` semibold) and `Solución:` (`text-brand-orange` semibold) lines per `code.html`.

#### Scenario: Copy fidelity
- **WHEN** the section renders
- **THEN** all headings, sub, and Desafío/Solución paragraphs match the Stitch source verbatim (including accents)

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
The media card visual SHALL render a local WebP image from `src/assets/challenges/` via `astro:assets Image` (`loading="lazy"`, responsive widths+sizes, no upscaling beyond native) converted from the Stitch `aida-public` source; no external `googleusercontent` hotlink SHALL remain in the section.

#### Scenario: Optimized local render
- **WHEN** the page builds and loads `/`
- **THEN** the challenges image is served from the local build output (WebP responsive) with the gradient overlay intact and `decoding="async"`

### Requirement: Challenges accessibility and brand rules
The section SHALL contain no H1 (H2 top heading, H4 row titles, unskipped order), expose `aria-labelledby` on the section, hide decorative overlays from assistive tech, provide meaningful Spanish alt on the image, honor `prefers-reduced-motion` for tilt/rotate, keep keyboard-reachable content with visible focus, and use safe-vocabulary copy (no cura/trata/desinfectante clínico claims).

#### Scenario: Assistive-tech pass
- **WHEN** a screen-reader or keyboard user traverses the section
- **THEN** headings announce in order (no duplicate H1), the image exposes its alt, badges are read as plain text (no duplicated icon names), and tilt animations are disabled under reduced-motion
