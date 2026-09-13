## ADDED Requirements

### Requirement: ResponsiveImage per-slot widths prop

`src/components/atoms/ResponsiveImage.astro` SHALL accept an optional `widths?: number[]` prop passed through to `astro:assets Image`; when omitted it SHALL default to `[480, 800, 1024, 1280]` for `eager` and `[480, 800, 1024, 1200]` for lazy, preserving the existing `sizes` passthrough, `eager → loading="eager" + fetchpriority="high"` vs lazy `loading="lazy" + decoding="async"` contract.

#### Scenario: Explicit per-slot widths win

- **WHEN** a caller passes `widths={[640, 1024, 1600]}` (e.g. `ContactMedia`)
- **THEN** the emitted `srcset` contains exactly those candidates and the loading/decoding contract for its `eager` flag is unchanged

#### Scenario: Defaults cover unmigrated callers

- **WHEN** a caller omits `widths`
- **THEN** an eager instance emits the `[480, 800, 1024, 1280]` set with high fetch priority and a lazy instance the `[480, 800, 1024, 1200]` set with async decoding

### Requirement: DividerImage local-only astro:assets image

`src/components/atoms/DividerImage.astro` SHALL take `src: ImageMetadata` (local only) plus optional `widths = [400, 800]` and `sizes = "80px"`, rendering `astro:assets Image` with `loading="lazy"` and `decoding="async"`; plain `<img>` string URLs and external sources SHALL NOT be accepted.

#### Scenario: Local divider render

- **WHEN** `Testimonials` renders `<DividerImage src={divider1} />`
- **THEN** the output is an optimized local image with the `[400, 800]` srcset, lazy loading, async decoding, and the shared `.hover-subtle` cover styling
