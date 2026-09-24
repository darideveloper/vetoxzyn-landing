## MODIFIED Requirements

### Requirement: Single local masters with per-slot responsive widths

The system SHALL source exactly one local AI master per image slot and serve it via `astro:assets Picture` (`formats={['avif','webp']}`) with the per-slot `widths` table below; no `-384`/`-512` suffixed variants or per-slot `README` stubs SHALL remain, and no external hotlink SHALL remain:

| Slot | Master (native) | `widths` | `sizes` |
|---|---|---|---|
| Hero | `src/assets/hero/hero-clinica.webp` (1122×1402 4:5) | `[480, 800, 1024, 1280]` eager + `fetchpriority="high"` | `(max-width: 1024px) 100vw, 448px` |
| Challenges | `src/assets/challenges/challenges-clinica.webp` (1122×1402 4:5) | `[480, 800, 1024, 1200]` lazy | `(max-width: 1024px) 100vw, 450px` |
| Contact | `src/assets/contact/contact-clinica.webp` (1672×941 16:9) | `[480, 768, 1024]` lazy, container `aspect-[16/9]` + `object-cover` | `(max-width: 1024px) 100vw, 450px` |
| Products | `src/assets/products/topico.webp` + `instalaciones.webp` (4096×2304 16:9 each) | `[768, 1280, 1536, 2048]` lazy | `(max-width: 1024px) 100vw, 50vw` |
| Dividers | `src/assets/dividers/divider-1.webp` + `divider-2.webp` (1600×1600 each) via `DividerImage` | `[200, 400]` lazy | `(max-width: 768px) 100vw, 5vw` |

#### Scenario: Hero serves its master responsively

- **WHEN** the page builds and loads `/`
- **THEN** the hero card image is served from `hero-clinica.webp` build output as AVIF-first `<picture>` with responsive candidates per the hero `widths`, eager with high fetch priority, and no `-384`/`-512` hero variant is referenced

#### Scenario: Challenges serves its master responsively

- **WHEN** the challenges section renders
- **THEN** its media image is served from `challenges-clinica.webp` build output with the challenges `widths`, lazy with `decoding="async"`, under the gradient overlay

#### Scenario: Contact serves its master at fixed 16/9

- **WHEN** the contact layer renders on `/` or `/contact`
- **THEN** its image is served from `contact-clinica.webp` build output with `widths [480, 768, 1024]`, filling the `aspect-[16/9]` container with `object-cover` and no layout shift

#### Scenario: Products serve their masters full-bleed

- **WHEN** the products split renders
- **THEN** each panel background is served from its `topico.webp` / `instalaciones.webp` build output with `widths [768, 1280, 1536, 2048]` and the luminosity treatment intact

#### Scenario: Dividers are local

- **WHEN** the testimonials grid renders
- **THEN** both divider strips are served from the local `divider-1/2.webp` build output via `DividerImage` as AVIF-first `<picture>`, and no `picsum.photos` URL appears in markup or build output

#### Scenario: Avatars are pipelined

- **WHEN** testimonial cards render
- **THEN** the 3 avatars load as `Image` output (`widths [96,192]`, AVIF-first) from `src/assets/testimonials/` imports (Carlos's avatar imports the logo asset directly), and neither `public/testimonials/` nor any Unsplash hotlink remains in markup or build output
