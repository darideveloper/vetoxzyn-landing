## Why

The Products gallery strip was hardcoded: 7 fixed imports from `src/assets/gallery/` with hand-written alts, and a flat white (`bg-on-primary`) card plate disconnected from the page branding. Any new product photo required a code edit, and the old gallery folder is now superseded by `src/assets/a2-dr-resultados/gallery/`. Sourcing the strip automatically from the new folder (and skipping it when empty) removes the per-photo code tax while the ice-glass plate ties each card to the brand wash.

## What Changes

- `Products.astro` frontmatter sources slides via `import.meta.glob` (eager) over `src/assets/a2-dr-resultados/gallery/*.{png,webp,jpg,jpeg,avif}` instead of 7 hardcoded imports from `src/assets/gallery/`; entries sorted by path, alts derived from filenames.
- Same AVIF-first `getImage` srcset pipeline (`widths [256, 320, 400]`) and presentational `.tsx` island contract (plain URL-string props) are kept.
- Gallery strip (including its feathered `backdrop-blur-md` seam band) renders only when at least one slide resolves; an empty folder (`.gitkeep` only) yields no strip markup.
- Each slide plate changes from flat white `bg-on-primary` to the ice-glass finish `border border-glass-border bg-surface-ice/80 backdrop-blur-md` (same voice as `HeroMediaCard`), keeping `shadow-card`, the `scale 1.5 → 1.6` bleed zoom, and the `#contacto-formulario` slide link.
- `docs/component-dependencies.md` gallery entries updated to the auto-glob source and ice-glass plate.

## Capabilities

### New Capabilities

- None — both workstreams change existing behavior; no new spec-level capability is introduced.

### Modified Capabilities

- `product-gallery`: slide source becomes the auto-globbed `a2-dr-resultados/gallery/` folder with filename-derived alts (replacing the fixed 7-file set and hand-written alts); plate finish becomes ice-glass.
- `products-section`: gallery strip becomes conditional — omitted entirely when the source folder resolves zero slides.

## Impact

- Affected code: `src/components/organisms/Products.astro` (frontmatter source + conditional strip), `src/components/molecules/ProductGallery.tsx` (plate classes + comment only, no prop or behavior change), `docs/component-dependencies.md` (living-doc descriptions).
- No new dependencies, no API changes, no token additions (all classes reuse existing palette tokens).
- Verification: `pnpm run check:palette` clean + `astro build` green with 7 images and with an empty folder (no `Galería de presentaciones` region in output).
- Note: 7 legacy `.webp` files under `src/assets/gallery/` are now unreferenced (stashed separately as `images only`); their deletion is out of scope for this change.
