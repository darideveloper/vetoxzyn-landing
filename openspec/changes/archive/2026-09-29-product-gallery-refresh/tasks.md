## 1. Auto-glob gallery source

- [x] 1.1 Replace the 7 hardcoded `@/assets/gallery/` imports in `Products.astro` with eager `import.meta.glob` over `@/assets/a2-dr-resultados/gallery/*.{png,webp,jpg,jpeg,avif}`, sorted by path with filename-derived Spanish alts
- [x] 1.2 Keep the AVIF-first `getImage` pipeline (`widths [256, 320, 400]`, `GALLERY_SIZES` unchanged) and the presentational island contract (plain URL-string props)

## 2. Conditional strip

- [x] 2.1 Render the gallery strip wrapper (seam-blur band + `ProductGallery`) only when `gallerySlides.length > 0`
- [x] 2.2 Verify empty folder builds with no `Galería de presentaciones` region in `dist/index.html`

## 3. Ice-glass plate

- [x] 3.1 Change the slide plate in `ProductGallery.tsx` from `bg-on-primary` to `border border-glass-border bg-surface-ice/80 backdrop-blur-md` (token-only, `shadow-card` and bleed zoom untouched)

## 4. Living docs and verification

- [x] 4.1 Update `docs/component-dependencies.md` gallery entries (auto-glob source, ice-glass plate, empty-skip)
- [x] 4.2 Verify `pnpm run check:palette` clean, `astro build` green with 7 images (7 filename-derived alts in output) and with an empty folder
- [x] 4.3 Record the photo-drop convention (descriptive Spanish `snake_case` filenames since alts derive from them, square masters ≤ ~800px, `png`/`webp`/`jpg`/`avif` only)
