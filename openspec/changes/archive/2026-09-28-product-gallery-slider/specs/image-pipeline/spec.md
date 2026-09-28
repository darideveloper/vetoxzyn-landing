## ADDED Requirements

### Requirement: Small-width strip image set
Gallery strip images in `src/assets/gallery/` SHALL be rendered through the existing `Picture` pipeline with a small-width set (`widths=[256, 320, 400]`, AVIF-first + WebP fallback — sized at/below the 400px-square masters, never upscaled) and slot-matched `sizes`, keeping the tuned global encoders unchanged.

#### Scenario: Strip authoring rule
- **WHEN** a contributor adds a gallery-strip image
- **THEN** docs and review expect the `[256, 320, 400]` set with lazy loading — not the 2048w panel masters — while output still uses the global `effort/quality` tuning

### Requirement: Gallery assets live under src/assets
The 7 gallery masters SHALL live in `src/assets/gallery/` and be imported through `astro:assets`; `public/` SHALL NOT be used for gallery content images.

#### Scenario: No public gallery images
- **WHEN** the gallery renders
- **THEN** every slide URL resolves from build output (`/_astro/…`), with no `/gallery/…` public path in markup
