## 1. Global pipeline config

- [x] 1.1 Add `image.service` block to `astro.config.mjs` (`limitInputPixels:false`, `webp {effort:6, quality:80}`, `avif {effort:6, quality:70}`)
- [x] 1.2 Spike: verified in `node_modules/astro/dist/assets/services/sharp.js` (`resolveSharpEncoderOptions` spreads `{...serviceConfig.webp, ...(quality ? {quality} : {})}`) — service config is the base, component `quality` overrides only when passed. Wrappers pass no `quality`, so 80/70 apply. No wrapper changes needed. (Also confirmed: no upscaling — widths above source maxWidth are clamped; `decoding` defaults to `async`.)

## 2. Wrapper atoms to Picture

- [x] 2.1 Migrate `ResponsiveImage.astro` to `Picture` (`formats={['avif','webp']}`), add `decoding="async"` to the eager branch
- [x] 2.2 Migrate `DividerImage.astro` to `Picture`, fix default `sizes` to the real grid slot (`(max-width: 768px) 100vw, 5vw`), change default `widths` to `[200,400]`; pass hover classes via `pictureAttributes` so `.hover-subtle` stays off the inner `<img>` (container rule)
- [x] 2.3 Align `ContactMedia.astro` widths to `[480,768,1024]` (drop unused 1600w)

## 3. Brand logo migration

- [x] 3.1 Move `public/brand/logo.webp` → `src/assets/brand/logo.webp`; rewrite `BrandLogo.astro` on `Picture` (600w, `decoding="async"`, ratio lock kept)
- [x] 3.2 Resolve JSON-LD `logo` via `getImage()` in `BaseSEO` frontmatter; update `BUSINESS_DATA.logo` in `site-config.ts` to the imported `ImageMetadata`; `rg` for leftover `/brand/logo.webp` references
- [x] 3.3 Move `public/testimonials/*.webp` → `src/assets/testimonials/`; wire `ImageMetadata` imports in `src/data/testimonials.ts` (Carlos's avatar imports the logo asset directly); delete `public/testimonials/` and `public/brand/`

## 4. SEO + Avatar attributes

- [x] 4.1 Add `og:image:width` (1200), `og:image:height` (630), `og:image:secure_url`, `og:image:alt` (Spanish text, Language mandate) to `BaseSEO.astro`
- [x] 4.2 Widen `Avatar.astro` props to `ImageMetadata|string`: render `Image` (`widths [96,192]`) for metadata, plain `<img>` fallback for strings; add `decoding="async"`; add a wrapper element owning the outer `cls` (caller positioning) plus `.hover-subtle`; update the header comment to pipelined `src/assets` sources

## 5. Docs + verification

- [x] 5.1 Create `docs/astro-image-optimization.md` (workflow, quality targets, source-size guidance, lossless-master guidance for new files, `public/` exception)
- [x] 5.2 Refresh `docs/astro-seo.md` §6.2 example to `Picture` + formats
- [x] 5.3 Update `docs/component-dependencies.md` (re-run `rg "^import" src`, redraw affected trees)
- [x] 5.4 Refresh the `logo`/`ogImage` example in `docs/astro-site-config.md` to the new resolvable logo source
- [x] 5.5 Verify: `pnpm run check:palette` clean, `astro build` green, `dist/_astro/` contains AVIF + WebP per source, spot-check `<picture>` markup, compare output sizes (verified 2026-09-23: palette clean, 4 pages green, 24 AVIF + 35 WebP + 0 PNG in dist/_astro, 7 AVIF-first pictures, avatars 2–7KB, hero eager/high with sizes intact, og + JSON-LD tags present, zero stale refs)
