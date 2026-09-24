## ADDED Requirements

### Requirement: Drop-any-size multi-format pipeline

The system SHALL render every `src/assets/` content image through `Picture` from `astro:assets` with `formats={['avif','webp']}`, so any-size source masters are auto-compressed at build into AVIF `<source>` candidates plus a WebP `<img>` fallback with responsive `srcset`. No per-image format config SHALL be required beyond the wrapper props (`src`, `sizes`, `widths`, `eager`).

#### Scenario: New source auto-optimizes

- **WHEN** an author drops any-size `.webp` into `src/assets/` and imports it through `ResponsiveImage` or `DividerImage`
- **THEN** the build emits hashed AVIF + WebP variants in `dist/_astro/` and the markup contains `<picture>` with an `image/avif` source and a WebP fallback `img` with `srcset`/`sizes`

### Requirement: Global encoder tuning and unlimited sources

The system SHALL configure `image.service` in `astro.config.mjs` with `limitInputPixels:false`, `webp { effort:6, quality:80 }`, and `avif { effort:6, quality:70 }`, so oversized sources never hard-fail the build and every output uses the tuned encoders.

#### Scenario: Giant source builds

- **WHEN** a source larger than sharp's default input pixel limit is imported through a wrapper
- **THEN** `astro build` succeeds and emits the tuned AVIF + WebP candidates

### Requirement: Assets-only authoring workflow

Content images SHALL live in `src/assets/` and be imported through the wrapper atoms; `public/` SHALL remain reserved for stable-URL meta (`og-image.jpg`, favicons) and SHALL never be used for content images.

#### Scenario: Authoring rule is documented

- **WHEN** a contributor reads `docs/astro-image-optimization.md`
- **THEN** they find the drop → import → auto-optimize workflow, the quality targets, the per-slot source-size guidance (2048–4096px), the lossless-master guidance for new files (single lossy encode per format), and the `public/` exception
