## Why

The Products split renders a forced two-line panel title (`Instala-<br/>ciones`) that contradicts the `Instalaciones` title in the products-section spec, and both product CTAs sit flush against their HUD spec grids with no separation and no horizontal inset. Small polish to match spec wording and restore visual rhythm.

## What Changes

- `Products.astro` Instalaciones panel `h3`: remove the forced `Instala-<br/>ciones` break so the title renders as a single word `Instalaciones` (natural wrapping still applies on narrow viewports).
- Both product CTAs (`tone="light"` Tópico, `tone="dark"` Instalaciones): add `className="mt-md"` (24px, existing `--spacing-md` token) to separate each button from its spec `<dl>`.
- `Button.tsx` `product` variant (B4): add `px-4` horizontal padding; vertical rhythm (`py-3`) untouched so button height is unchanged.

## Capabilities

### New Capabilities

- None — polish only, no new behavior.

### Modified Capabilities

- `products-section`: panel title renders single-line `Instalaciones`; CTAs separated from HUD spec grids by `mt-md`.
- `global-atoms`: `product` Button variant gains `px-4` horizontal padding (height unchanged).

## Impact

- Touched files: `src/components/organisms/Products.astro`, `src/components/atoms/Button.tsx`.
- Both product cards plus the `design-system` showcase (renders all Button variants) pick up the `px-4` change.
- No anchor, copy, imagery, or responsive-structure changes; no new atoms or dependencies.
- Out of scope (pre-existing, untouched): `products-section/spec.md` still references `id="section-3"` while implementation uses `id="section-4"` after Testimonials took `section-3` — left as-is.
