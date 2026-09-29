## MODIFIED Requirements

### Requirement: Gallery slide content and Spanish alts
The system SHALL render a `ProductGallery` island with image-only slides sourced automatically from `src/assets/a2-dr-resultados/gallery/` via eager `import.meta.glob` (matching `png`, `webp`, `jpg`, `jpeg`, `avif`), sorted by path for a stable order, each with a Spanish alt text derived from its filename (separators `_-` become spaces, stacked extensions stripped). Slide image URLs/srcsets SHALL be resolved by an Astro wrapper (via `astro:assets`) and passed as plain string props — the `.tsx` island stays presentational and never imports `astro:assets` components directly.

#### Scenario: Auto-sourced presentations visible
- **WHEN** a visitor reaches the gallery strip
- **THEN** one slide appears per image file in the gallery folder in filename order, each showing one product image with no text overlay, arrows, or dots

#### Scenario: Screen-reader names
- **WHEN** a screen reader traverses the slides
- **THEN** each image announces its filename-derived Spanish alt (e.g. `Envase AtomizadorVetoxzyn 120ml`) and decorative layers are silent

#### Scenario: Empty folder skips the strip
- **WHEN** the gallery folder contains no image files
- **THEN** no gallery region, slide, or seam-blur markup renders and no gallery JS hydrates

### Requirement: Consistent product plate for transparent cutouts
Gallery masters are transparent cutouts, so each slide SHALL render inside one consistent surface — an ice-glass plate (`bg-surface-ice/80`, `border border-glass-border`, `backdrop-blur-md`, `rounded-2xl`, `p-md`, elevation via `shadow-card`, `object-contain`, same voice as `HeroMediaCard`) — so products read identically on the light panel, the dark panel, and mobile's page background. The image SHALL render at `scale: 1.5` past the plate with no clipping (oversized bleed), easing to `1.6` on hover; the swiper viewport SHALL be `overflow: visible` so the track never cuts the bleed.

#### Scenario: Legible on every background
- **WHEN** a slide renders over the light half, the dark half, or the mobile page background
- **THEN** the product is legible against the same ice-glass plate, with the image contained (never cropped) and elevation declared once (shadow plus glass hairline, no extra border invention)
