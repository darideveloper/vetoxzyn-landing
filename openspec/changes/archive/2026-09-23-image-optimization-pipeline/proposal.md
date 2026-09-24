## Why

Content images currently ship as WebP-only output with hand-default encoder settings and no tolerance guarantee for oversized sources. The project goal is a drop-in-any-size SSG pipeline: any source placed in `src/assets/` is auto-compressed and auto-optimized at build (AVIF primary + WebP fallback, tuned encoders, correct per-slot candidates) so pages render the best quality required at the smallest size possible.

## What Changes

- `ResponsiveImage` and `DividerImage` migrate from `Image` to `Picture` with `formats={['avif','webp']}` (AVIF `<source>` + WebP `<img>` fallback, no PNG/JPEG intermediate).
- `astro.config.mjs` gains an `image.service` block: `limitInputPixels:false` (any-size sources never hard-fail) plus tuned encoders — `webp { effort:6, quality:80 }`, `avif { effort:6, quality:70 }`.
- Per-slot candidate fixes: `DividerImage` default `sizes` corrected to its real grid slot with `widths [200,400]`; `ContactMedia` drops the unused 1600w candidate.
- `BrandLogo` moves from `public/brand/` to `src/assets/brand/` (hashed + AVIF output); JSON-LD `logo` resolves via `getImage()` in `BaseSEO` frontmatter (single source, no orphaned copy). The 3rd testimonial avatar (currently `/brand/logo.webp`) imports the logo asset directly instead of copying it.
- `og:image` gains `og:image:width` (1200), `og:image:height` (630), `og:image:secure_url`, and `og:image:alt` for social crawlers.
- Avatars move from `public/testimonials/` to `src/assets/testimonials/` (currently up to 1.1MB for 96px display); `testimonials.ts` imports them as `ImageMetadata`, `Avatar` accepts `ImageMetadata|string` and renders `Image` (`widths [96,192]`) for metadata with a plain-`<img>` fallback for strings. Carlos's avatar imports the logo asset directly (no copy, no duplication); `public/testimonials/` is deleted. `Avatar` also gains `decoding="async"` and moves `.hover-subtle` onto a wrapper element (container rule).
- Authoring workflow documented: drop any-size masters in `src/assets/`, import through the wrappers; `public/` stays reserved for stable-URL meta (`og-image.jpg`, favicons).

## Capabilities

### New Capabilities

- `image-pipeline`: the drop-any-size SSG image pipeline — multi-format `Picture` output, global sharp service tuning, unlimited source tolerance with authoring guidance, and the `src/assets`-only authoring workflow.

### Modified Capabilities

- `seo-basics`: image rule moves from `Image`/AVIF-only to `Picture` AVIF+WebP; `og:image` dimensions/alt added; JSON-LD `logo` resolves via `getImage()`.
- `brand-imagery`: masters served via `Picture` with updated per-slot widths table (dividers `[200,400]`, contact without 1600w).
- `brand-logo`: logo source moves to `src/assets/brand/` rendered via `Picture`; `/brand/logo.webp` public path is removed.
- `site-config-data`: `BUSINESS_DATA.logo` reference updated to the new resolvable logo source.
- `interaction-feedback`: `Avatar` keeps `.hover-subtle` but placed on its wrapper element, not the inner `<img>`.

## Impact

- Touched code: `src/components/atoms/{ResponsiveImage,DividerImage,BrandLogo,Avatar}.astro`, `src/components/molecules/ContactMedia.astro`, `src/components/seo/BaseSEO.astro`, `src/data/{site-config,testimonials}.ts`, `astro.config.mjs`.
- Asset moves: `public/brand/logo.webp` → `src/assets/brand/logo.webp` (**BREAKING** for any hardcoded `/brand/logo.webp` reference — JSON-LD + 3rd avatar updated in the same change); `public/testimonials/*.webp` → `src/assets/testimonials/` (`public/testimonials/` deleted).
- Build output grows AVIF variants per source in `dist/_astro/` (content-hashed, immutable-cacheable as today); build time rises modestly with AVIF encodes, absorbed by Astro's persistent image cache (`node_modules/.astro`).
- No new dependencies (`sharp` already installed); no `public/` URL changes except the removed brand path.
