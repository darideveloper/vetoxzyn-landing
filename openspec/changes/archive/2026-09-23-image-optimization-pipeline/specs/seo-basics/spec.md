## MODIFIED Requirements

### Requirement: Optimized images via astro:assets

Whenever a raster content image is added, it SHALL be rendered with the `Picture` component from `astro:assets` (`formats={['avif','webp']}`, `widths` + `sizes` responsive set, encoders from the global `image.service` config — webp quality 80, avif quality 70); hero images SHALL use `loading="eager"` + `fetchpriority="high"` + `decoding="async"`, all other images `loading="lazy"` + `decoding="async"`. SVG art SHALL pass through unchanged (Astro does not rasterize SVG). No placeholder image SHALL be added just to satisfy this rule.

#### Scenario: Responsive hero and lazy sections

- **WHEN** a raster hero or section image is added to a page
- **THEN** the hero loads eagerly at high priority while below-fold images lazy-load as AVIF-first `<picture>` with responsive widths and no layout shift from missing dimensions

## ADDED Requirements

### Requirement: Social image dimensions

`BaseSEO` SHALL emit `og:image:width` (1200), `og:image:height` (630), `og:image:secure_url` (same value as `og:image`), and `og:image:alt` (Spanish text per the Language mandate) alongside `og:image` so social crawlers size the preview card correctly.

#### Scenario: Preview card metadata

- **WHEN** any page renders its SEO head
- **THEN** the markup contains `og:image` plus its width, height, secure URL, and alt tags
