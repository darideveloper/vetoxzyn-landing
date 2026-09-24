## Context

Content images live as single large masters in `src/assets/` (1122–4096px WebP, ~1.5MB each after the latest content pull) and render through two wrapper atoms (`ResponsiveImage`, `DividerImage`) using `astro:assets Image` — WebP-only output, default encoder settings, no `image:` config block. Avatars live in `public/testimonials/` (up to 1.1MB for 96px display), bypassing the pipeline entirely. SSG is static (no adapter), `sharp 0.35.4` installed, `dist/_astro/` hashed output with immutable nginx caching. `BrandLogo` is a plain `<img>` over `public/brand/logo.webp` (stable URL, doubles as JSON-LD logo); avatars are external Unsplash `<img>` by design.

## Goals / Non-Goals

**Goals:**
- Any-size source dropped in `src/assets/` + imported through a wrapper = AVIF + WebP output, tuned encoders, correct per-slot candidates — zero per-image config beyond `sizes`.
- Stable-URL meta (`og-image.jpg`, favicons) untouched; JSON-LD logo stays resolvable after the brand move.
- No new dependencies; build stays green and cache-friendly.

**Non-Goals:**
- No custom sharp scripts, no `astro:build:start` integration, no global `image.layout` (wrappers own sizing).
- No localizing Unsplash avatars; no re-exporting current lossy masters to lossless (guidance only for new files).
- No `public/` processing (Astro never optimizes `public/` — accepted by design).

## Decisions

**1. `Picture` with `formats={['avif','webp']}` in both wrappers (over `Image format="avif"` or WebP-only).**
Rationale: single change point covers every content image; `<source type="image/avif">` + WebP `<img>` fallback is automatic; with WebP sources the fallback needs no PNG/JPEG intermediate. Implementation note (found at build): `fallbackFormat="webp"` is required explicitly — without it Astro defaults the fallback `<img>` to PNG (multi-MB files). Alternative `format="avif"` on `Image` was rejected (no fallback for legacy browsers). WebP-only was rejected (leaves ~20–30% size savings on the table; docs already recommend AVIF).

**2. Global `image.service.config` with `limitInputPixels:false`, `webp {effort:6, quality:80}`, `avif {effort:6, quality:70}` (over per-component `quality` props).**
Rationale: one config block sets the whole pipeline; `limitInputPixels:false` is what makes "any big size" literally true (default ~268MP hard-fails giant sources). AVIF needs a lower quality number than WebP for equal perceived quality. Open question carried to implementation: verify whether a component-level `quality` prop overrides service config — if so, pass `quality` explicitly in wrappers to pin 80/70.

**3. `BrandLogo` moves to `src/assets/brand/logo.webp` rendered via `Picture`; JSON-LD `logo` via `getImage()` in `BaseSEO` frontmatter (over keeping a `public/` copy).**
Rationale: single source of truth — no orphaned 19KB duplicate to keep in sync; the rendered logo gets hashing + AVIF like everything else. `og:image` (the crawler-critical stable URL) stays in `public/`. Alternative "keep public copy for JSON-LD" rejected (duplication). Alternative "point logo at og-image" rejected (wrong semantics).

**4. Slot candidate corrections ride along (DividerImage `sizes`→real grid slot + `widths [200,400]`; ContactMedia drops 1600w).**
Rationale: `sizes` is the browser's download decision — a wrong `sizes` defeats the whole pipeline. The current `80px` default and unused 1600w candidate are objectively wrong against measured layouts. `Picture` spreads plain classes onto the inner `<img>`, so `DividerImage` hover classes go through `pictureAttributes` to keep `.hover-subtle` on the container per the interaction-feedback rule.

**5. Docs: new `docs/astro-image-optimization.md` + mandated `component-dependencies.md` + `astro-seo.md §6.2` refresh.**
Rationale: the authoring workflow ("drop in `src/assets/`, import through wrappers") is a convention that only works if written down; the deps map update is mandatory per `AGENTS.md`.

**6. Avatars join the pipeline (over one-time manual compression of `public/` files).**
Rationale: the pulled portraits weigh 1.1MB + 325KB for 96px display — the worst size ratio on the site — and `public/` files bypass every encoder. Moving them to `src/assets/testimonials/` with `ImageMetadata` imports turns them into ~20–30KB total with zero per-file maintenance; manual compression was rejected (unhashed URLs, repeats on every future drop). Carlos's avatar imports the logo asset directly, so no file copy and no duplication. `testimonials.ts` keeps its `as const` shape; the derived `Testimonial` type widens `avatar` to `string | ImageMetadata`, which `Avatar` accepts.

## Risks / Trade-offs

- [AVIF encodes slow the build] → Mitigation: Astro persists image transforms in `node_modules/.astro` between builds; per-checkout caches are warm in normal dev flow. Cold CI/Docker builds pay the full cost once.
- [Component `quality` may override service config] → Mitigation: spike during implementation; pin `quality` in wrappers if needed.
- [`/brand/logo.webp` URL breaks] → Mitigation: `BUSINESS_DATA.logo` + `BaseSEO` updated in the same change; `rg` for hardcoded references before finishing. **BREAKING** for any external hotlink to that path.
- [Lossy→lossy re-encode on current masters] → Accepted: visually negligible at 80/70; lossless-master guidance applies to new files only.
- [Huge sources slow builds] → Accepted with documented 2048–4096px/slot authoring guidance; pipeline tolerates bigger.
