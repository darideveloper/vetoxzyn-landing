---
created: 2026-09-23
updated: 2026-09-23
tags:
  - astro
  - images
  - performance
type: resource
status: active
---

# Image Optimization Pipeline

Drop-any-size SSG image system: any source placed in `src/assets/` is auto-compressed at build into AVIF-first responsive output. No per-image config beyond the wrapper props.

```
src/assets/<slot>/any-size.webp  (any dimensions, any byte size)
        │  import → <ResponsiveImage src sizes /> / <DividerImage src />
        ▼
  ASTRO BUILD (sharp, tuned via astro.config.mjs `image.service`)
   decode → downscale per `widths` → AVIF + WebP → hash → dist/_astro/
        ▼
  <picture><source type="image/avif" /><source type="image/webp" />
    <img srcset sizes loading decoding /></picture>
```

## Authoring workflow

1. Drop the master in `src/assets/<slot>/` — any size (guidance: 2048–4096px max per slot; the pipeline tolerates bigger, builds just work harder).
2. Import it and render through a wrapper atom (`ResponsiveImage`, `DividerImage`, `BrandLogo`, `Avatar`) — never a raw `<img>` for local files.
3. Pass the real `sizes` for the slot. `widths` already have per-slot defaults; override only when the layout differs.

## Quality targets (locked)

Configured once in `astro.config.mjs` (`image.service.config`); wrappers pass no `quality`, so these apply everywhere (verified: component `quality` would override per-format if ever passed):

| Format | effort | quality |
|---|---|---|
| webp | 6 | 80 |
| avif | 6 | 70 |

AVIF needs the lower number for equal perceived quality. `limitInputPixels:false` lets giant sources through instead of hard-failing the build.

## Source fidelity guidance (new files)

Keep masters lossless (PNG / lossless WebP) when possible so the build performs a single lossy encode per output format. Current masters are lossy WebP — accepted as-is (negligible at 80/70), do not re-export them.

## `public/` exception

`public/` is never processed by Astro — by design. It holds stable-URL meta only: `og-image.jpg` (1200×630), favicons, `apple-touch-icon.png`. Content images (including avatars and the brand logo) live in `src/assets/` and ship hashed from `dist/_astro/` with immutable nginx caching.

## Entry points

- `atoms/ResponsiveImage.astro` — `Picture` AVIF+WebP, eager (LCP) vs lazy branches
- `atoms/DividerImage.astro` — `Picture` AVIF+WebP, small widths, hover via `pictureAttributes` (container rule)
- `atoms/BrandLogo.astro` — `Picture` single 600w; JSON-LD logo resolves via `getImage()` on the same source in `BaseSEO`
- `atoms/Avatar.astro` — `Image [96,192]` for `ImageMetadata`, plain-`<img>` fallback for string URLs
