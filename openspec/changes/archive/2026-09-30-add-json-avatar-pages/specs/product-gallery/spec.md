## MODIFIED Requirements

### Requirement: Gallery slide content and Spanish alts
The system SHALL render a `ProductGallery` island with image-only slides sourced automatically from the **current avatar's co-located gallery folder** (`src/content/avatars/es/<slug>/gallery/`) via eager `import.meta.glob` (matching `png`, `webp`, `jpg`, `jpeg`, `avif`) resolved per avatar, sorted by path for a stable order, each with a Spanish alt text derived from its filename (separators `_-` become spaces, stacked extensions stripped) or provided in JSON. JSON-provided alts SHALL remain plain strings (never markdown-rendered), and every slide image field SHALL resolve via the collection `image()` helper (or the `import.meta.glob` registry fallback). Slide image URLs/srcsets SHALL be resolved by an Astro wrapper (via `astro:assets`) and passed as plain string props — the `.tsx` island stays presentational and never imports `astro:assets` components directly.

#### Scenario: Auto-sourced presentations visible
- **WHEN** a visitor reaches the gallery strip on an avatar page
- **THEN** one slide appears per image file in that avatar's gallery source in filename order, each showing one product image with no text overlay, arrows, or dots

#### Scenario: Screen-reader names
- **WHEN** a screen reader traverses the slides
- **THEN** each image announces its Spanish alt (filename-derived or JSON-provided) and decorative layers are silent

#### Scenario: Empty folder skips the strip
- **WHEN** an avatar's gallery source contains no image files
- **THEN** no gallery region, slide, or seam-blur markup renders, the panels still render, and no gallery JS hydrates
