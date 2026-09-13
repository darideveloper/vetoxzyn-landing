## 1. Brand masters land

- [x] 1.1 Add 7 single masters (`hero/hero-clinica.webp`, `challenges/challenges-clinica.webp`, `contact/contact-clinica.webp`, `products/topico.webp` + `instalaciones.webp`, `dividers/divider-1.webp` + `divider-2.webp`) and delete the 10 `-384`/`-512` variants plus 4 per-slot `README` stubs
- [x] 1.2 Verify native sizes (hero 2560×3200, challenges 2400×3000, contact 3200×1800, products 2× 4096×2304, dividers 2× 1600×1600) and aspect ratios (4:5 / 16:9 / square)

## 2. Atom contracts

- [x] 2.1 `ResponsiveImage`: add optional `widths?: number[]` with eager `[480, 800, 1024, 1280]` / lazy `[480, 800, 1024, 1200]` defaults, keeping `sizes` passthrough and eager/lazy loading contract
- [x] 2.2 `DividerImage`: switch `src: string` plain `<img>` to `src: ImageMetadata` `astro:assets Image` with `widths [400, 800]`, `sizes "80px"`, lazy + async

## 3. Call-site migration

- [x] 3.1 `HeroMediaCard`: point to hero master with `widths [480, 800, 1024, 1280]`, `sizes …448px`, eager
- [x] 3.2 `MediaWithTags`: point to challenges master with `widths [480, 800, 1024, 1200]`, `sizes …450px`
- [x] 3.3 `ContactMedia`: point to contact master with `widths [640, 1024, 1600]`, `sizes …450px`, container `aspect-[16/9]`, image `h-full object-cover`
- [x] 3.4 `ProductPanel`: point to topico/instalaciones masters with `widths [768, 1280, 1536, 2048]`
- [x] 3.5 `Testimonials`: replace picsum `DIVIDERS` URLs with local divider imports (`ImageMetadata[]`)
- [x] 3.6 Confirm `Avatar` untouched (plain `<img>`, 3 Unsplash URLs) and no other `DividerImage` callers exist (`rg "DividerImage"`)

## 4. Docs and verification

- [x] 4.1 Sync `docs/component-dependencies.md` trees/notes (masters, widths, `DividerImage`/`ResponsiveImage` contracts, avatar exclusion)
- [x] 4.2 Run `pnpm run check:palette` clean and `astro build` green with no `picsum`/`googleusercontent`/`-384`/`-512` references left (`rg "picsum|googleusercontent|-384|-512" src`)
- [x] 4.3 Visual pass at 390/768/1280px: hero card, challenges card, contact 16/9, products split, testimonial dividers render sharp with no layout shift or horizontal overflow
