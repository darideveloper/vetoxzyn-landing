## Why

Each landing section currently owns its own background (Hero/Challenges/Products/Contact repeat `bg-surface-ice`, Testimonials uses its own clipped `bg-[#f3f3f7]/50` wash with `clip-path`). The page reads as stacked bands instead of one canvas, and the Testimonials clip-path visibly cuts its own decorators.

## What Changes

- Add a single global fixed background layer rendered once in `Layout.astro` (solid `surface-ice` fallback on `html,body` + one `position:fixed` decorator wash behind page content, reusing the existing `blob-bg` animation verbatim — no new durations, reduced-motion covered by the existing guard).
- Make section shells transparent: remove `bg-surface-ice` from Hero, Challenges, Products shell, and ContactSection shell (inner ProductPanel light/dark tones stay).
- Testimonials: delete the clipped fluid-wash layer + its `clip-path` style; keep the two blurred brand blobs + divider images as unclipped overlay decorators.
- ContactSection: keep `ContactBackdrop` (3 organic blobs + giant `BIOSEGURIDAD` type) and add a section-local tint/blur overlay above the global wash so the section still reads as distinct.
- Decorative motion reuses existing languages only (`blob-bg`/`moveBlob` for the wash; token-timed straighten already on the shells); no new durations or easings introduced.

## Capabilities

### New Capabilities

- `page-background`: global fixed background system — Layout-owned fixed wash, transparent-section contract, decorator overlay rules (unclipped, `overflow-x-clip`, `pointer-events-none`, `aria-hidden`), Contact tint/blur overlay, reduced-motion + fallback behavior.

### Modified Capabilities

- `testimonials-section`: background requirement changes from section-owned clipped fluid wash to transparent shell over the global wash with unclipped blob decorators.
- `contact-section`: background requirement changes from section-scoped wash on `bg-surface-ice` to section-local tint/blur overlay + retained `ContactBackdrop` over the global wash.

## Impact

- Affected code: `src/layouts/Layout.astro`, `src/styles/global.css`, `src/components/organisms/{Hero,Challenges,Testimonials,Products,ContactSection}.astro` (Contact tint overlay lives in `ContactSection.astro`; `ContactBackdrop.astro` untouched, no API change).
- No new dependencies, no API/route changes, no store changes; `about`/`contact` pages inherit the global wash via Layout automatically.
- Visual regression surface: full landing (`/`) + `/contact` at 390/768/1024/1280/1440, 0px horizontal overflow, reduced-motion pass.
