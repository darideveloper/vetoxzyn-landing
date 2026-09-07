## Why

The six Google Stitch designs (`design/stitch/*/`) each invented their own buttons, badges, icons, and form styles (5 button looks, 3 eyebrows, 3 badge families, 2 icon containers). Without a single standard, every new section re-implements visuals and the site drifts. This change locks one voted variant per element into reusable vanilla atoms (retroactive record of the showcase vote of 2026-09-07) so all future organisms compose the same pieces.

## What Changes

- Standardize `src/components/atoms/` to the voted variants: Button B2 primary / B3 secondary / B4 product (+ `size` md/sm, product `tone` light/dark); Icon I1 circle (+ `bare` mode, tones pink/orange/primary/green, sizes md/lg); Badge P1 feature (+ P2 tag with tones dark/primary/light and icon slot); Eyebrow E2; Input F1 underline; Textarea F3 glass; Checkbox F2 pill; Card C1 glass. Dropped: B1 gradient, B5 large submit, E1, E3, P3 vertical, I2 grey circle, C2 white card, C3 dark HUD card.
- Extend `src/store/contact.ts` with optional `clinica`/`telefono` strings and `lineaTopico`/`lineaInstalaciones`/`lineaDistribucion` booleans; wire them into `ContactForm` (new inputs + checkbox group, submit at `size="sm"`).
- Translate all `ContactForm` user-facing strings to Spanish (labels, placeholders, buttons, success text, Zod messages) — approved follow-up, not yet in code.
- Add living showcase `src/pages/design-system.astro` (+ page-local `_demos.tsx` island with isolated demo store) rendering every atom and variant; document the catalogue in `docs/atoms-page-global-components.md` and update `docs/component-dependencies.md`.
- Load Material Symbols Outlined in `Layout.astro` for Icon/Badge/Eyebrow.

## Capabilities

### New Capabilities

- `global-atoms`: standardized vanilla atom catalogue (Button, Icon, Badge, Eyebrow, Card, Input, Textarea, Checkbox) with exact variants, props, and dropped-variant list; every Stitch HUD pill, feature icon, CTA, and form control maps to one atom.
- `design-system-showcase`: `/design-system` page rendering all atoms and variants with a page-local demo store that never touches `store/contact`.

### Modified Capabilities

- `contact-islands`: store schema gains optional fields + linea booleans; `ContactForm` composes Checkbox atoms and new inputs; Button/Input/Textarea visual contract changes (B2 orange pill, F1 underline labels, sm submit). Needs a delta spec.

## Impact

- `src/components/atoms/*` (3 restyled, 5 new), `src/store/contact.ts` (schema + initial state), `src/components/molecules/ContactForm.tsx` (fields + sm buttons), `src/layouts/Layout.astro` (font link), `src/pages/design-system.astro` + `src/pages/_demos.tsx` (new), `docs/component-dependencies.md` + `docs/atoms-page-global-components.md`.
- No new dependencies; no API changes; submit remains local-only stub. Visual change: ContactForm island renders orange/F1 styling instead of the old black box look.
