## ADDED Requirements

### Requirement: Single local masters with per-slot responsive widths

The system SHALL source exactly one local AI master per image slot and serve it via `astro:assets Image` with the per-slot `widths` table below; no `-384`/`-512` suffixed variants or per-slot `README` stubs SHALL remain, and no external hotlink SHALL remain except the 3 kept Unsplash avatars:

| Slot | Master (native) | `widths` | `sizes` |
|---|---|---|---|
| Hero | `src/assets/hero/hero-clinica.webp` (2560×3200 4:5) | `[480, 800, 1024, 1280]` eager + `fetchpriority="high"` | `(max-width: 1024px) 100vw, 448px` |
| Challenges | `src/assets/challenges/challenges-clinica.webp` (2400×3000 4:5) | `[480, 800, 1024, 1200]` lazy | `(max-width: 1024px) 100vw, 450px` |
| Contact | `src/assets/contact/contact-clinica.webp` (3200×1800 16:9) | `[640, 1024, 1600]` lazy, container `aspect-[16/9]` + `object-cover` | `(max-width: 1024px) 100vw, 450px` |
| Products | `src/assets/products/topico.webp` + `instalaciones.webp` (4096×2304 16:9 each) | `[768, 1280, 1536, 2048]` lazy | `(max-width: 1024px) 100vw, 50vw` |
| Dividers | `src/assets/dividers/divider-1.webp` + `divider-2.webp` (1600×1600 each) via `DividerImage` | `[400, 800]` lazy | `80px` |

#### Scenario: Hero serves its master responsively

- **WHEN** the page builds and loads `/`
- **THEN** the hero card image is served from `hero-clinica.webp` build output with responsive candidates per the hero `widths`, eager with high fetch priority, and no `-384`/`-512` hero variant is referenced

#### Scenario: Challenges serves its master responsively

- **WHEN** the challenges section renders
- **THEN** its media image is served from `challenges-clinica.webp` build output with the challenges `widths`, lazy with `decoding="async"`, under the gradient overlay

#### Scenario: Contact serves its master at fixed 16/9

- **WHEN** the contact layer renders on `/` or `/contact`
- **THEN** its image is served from `contact-clinica.webp` build output with `widths [640, 1024, 1600]`, filling the `aspect-[16/9]` container with `object-cover` and no layout shift

#### Scenario: Products serve their masters full-bleed

- **WHEN** the products split renders
- **THEN** each panel background is served from its `topico.webp` / `instalaciones.webp` build output with `widths [768, 1280, 1536, 2048]` and the luminosity treatment intact

#### Scenario: Dividers are local

- **WHEN** the testimonials grid renders
- **THEN** both divider strips are served from the local `divider-1/2.webp` build output via `DividerImage`, and no `picsum.photos` URL appears in markup or build output

#### Scenario: Avatars stay external

- **WHEN** testimonial cards render
- **THEN** the 3 avatars still load from their Unsplash URLs via plain `<img>` (`Avatar.astro`), and no local avatar file is referenced
