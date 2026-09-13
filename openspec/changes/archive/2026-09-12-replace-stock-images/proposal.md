## Why

Landing shipped with low-res Stitch placeholders (`-384`/`-512` variants + `README` stubs) and external `picsum.photos` hotlinks for testimonial dividers. Brand AI masters have now landed, so the codebase consolidates to one high-res source per slot with per-slot responsive widths — better sharpness on retina/desktop, no external hotlinks (except avatars), and predictable build output with slot-appropriate served payloads.

## What Changes

- Replace 10 low-res variants + 4 `README` stubs with 7 single masters (no `-384`/`-512` suffixes):
  - `hero/hero-clinica.webp` (4:5 master), `challenges/challenges-clinica.webp` (4:5), `contact/contact-clinica.webp` (16:9), `products/topico.webp` + `instalaciones.webp` (16:9), new `dividers/divider-1.webp` + `divider-2.webp` (square).
- `atoms/ResponsiveImage.astro`: add optional `widths?: number[]` prop; defaults become `eager → [480, 800, 1024, 1280]`, `lazy → [480, 800, 1024, 1200]` (was fixed `[384, 512]`).
- `atoms/DividerImage.astro`: **BREAKING** `src: string` (plain `<img>`, external-only) → `src: ImageMetadata` via `astro:assets Image` with `widths = [400, 800]`, `sizes = "80px"`, `loading="lazy"`, `decoding="async"`.
- Call-site updates (imports + per-slot `widths` + tuned `sizes`, alt/copy unchanged):
  - `HeroMediaCard` → hero master, `widths [480, 800, 1024, 1280]`, `sizes …448px`.
  - `MediaWithTags` → challenges master, `widths [480, 800, 1024, 1200]`, `sizes …450px`.
  - `ContactMedia` → contact master, `widths [640, 1024, 1600]`, `sizes …450px`, container gains `aspect-[16/9]`, image `h-full object-cover` (was `h-auto`).
  - `ProductPanel` → topico/instalaciones masters, `widths [768, 1280, 1536, 2048]`.
- `organisms/Testimonials.astro`: `DIVIDERS` picsum URLs → local `divider-1/2.webp` imports (`ImageMetadata[]`).
- Avatars explicitly excluded: `Avatar.astro` stays plain `<img>` with the 3 Unsplash URLs.
- Sync `docs/component-dependencies.md` trees/notes with the above (no behavior change).

## Capabilities

### New Capabilities

- `brand-imagery`: single-local-master-per-slot contract — which master file backs each slot, per-slot responsive `widths` table, local-only dividers, and the avatar exclusion rule.

### Modified Capabilities

- `global-atoms`: `ResponsiveImage` gains the `widths?` prop with new defaults; `DividerImage` switches from external-only plain `<img>` to local-only `astro:assets` image.
- `testimonials-section`: divider strips change from external fixed dog-photography stock to the two local divider masters.
- `contact-section`: contact image changes from natural aspect (`h-auto w-full`) to fixed `16/9` cover (`aspect-[16/9]`, `h-full object-cover`).

## Impact

- Affected code: `ResponsiveImage`, `DividerImage`, `HeroMediaCard`, `MediaWithTags`, `ContactMedia`, `ProductPanel`, `Testimonials`, `docs/component-dependencies.md`, `src/assets/**`.
- Sole caller of `DividerImage` (`Testimonials`) is updated, so the **BREAKING** `src` type change is contained.
- No API, routing, store, or copy changes; alt texts, `sizes` passthrough behavior (values retuned per slot), and GSAP/hover language untouched.
- Build: fewer source files (14 removed — 10 variants + 4 READMEs — 7 added), larger per-file masters (~40–142KB each) but responsive `widths` keep served payloads slot-appropriate; `astro build` + `check:palette` stay green.
