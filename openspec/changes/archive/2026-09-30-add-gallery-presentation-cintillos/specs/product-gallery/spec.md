# Spec Delta

## MODIFIED Requirements

### Requirement: Gallery slide content and Spanish alts
The system SHALL render a `ProductGallery` island with slides sourced automatically from `src/assets/a2-dr-resultados/gallery/` via eager `import.meta.glob` (matching `png`, `webp`, `jpg`, `jpeg`, `avif`), sorted by path for a stable order, each with a Spanish alt text derived from its filename (separators `_-` become spaces, stacked extensions stripped) and a visually distinct presentation cintillo derived from the filename volume (for example, `60 ml`, `950 ml`, `4 L`, or `23 L`). Slide image URLs/srcsets SHALL be resolved by an Astro wrapper (via `astro:assets`) and passed as plain string props — the `.tsx` island stays presentational and never imports `astro:assets` components directly.

#### Scenario: Auto-sourced presentations visible
- **WHEN** a visitor reaches the gallery strip
- **THEN** one slide appears per image file in the gallery folder in filename order, each showing one product image, its filename-derived presentation cintillo, and no arrows or dots

#### Scenario: Screen-reader names
- **WHEN** a screen reader traverses the slides
- **THEN** each image announces its filename-derived Spanish alt (e.g. `Envase AtomizadorVetoxzyn 120ml`) and decorative layers are silent

#### Scenario: Empty folder skips the strip
- **WHEN** the gallery folder contains no image files
- **THEN** no gallery region, slide, or seam-blur markup renders and no gallery JS hydrates
