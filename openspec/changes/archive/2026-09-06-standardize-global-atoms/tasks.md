## 1. Button atom

- [x] 1.1 Restyle `Button.tsx` to B2 primary (orange pill) + B3 secondary (glass pill) + B4 product (rectangular full-width)
- [x] 1.2 Add `size="md"|"sm"` (md = hero spec, sm = forms) and product-only `tone="light"|"dark"`
- [x] 1.3 Verify dropped looks (B1 gradient, B5 large) exist nowhere

## 2. Icon and Badge atoms

- [x] 2.1 Create `Icon.astro` (I1 circle default; `bare` mode; tones pink/orange/primary/green; sizes md/lg; `filled`)
- [x] 2.2 Create `Badge.astro` (P1 feature + P2 tag with tones dark/primary/light and icon slot)
- [x] 2.3 Create `Eyebrow.astro` (E2) and `Card.astro` (C1 glass)

## 3. Form atoms and store

- [x] 3.1 Restyle `Input.tsx` to F1 (underline, uppercase xs label) and `Textarea.tsx` to F3 (glass)
- [x] 3.2 Create store-bound `Checkbox.tsx` (F2 pill)
- [x] 3.3 Extend `contactSchema` with `clinica`/`telefono` + three linea booleans; wire into `ContactForm` with `size="sm"` buttons

## 4. Showcase, shell, and docs

- [x] 4.1 Load Material Symbols Outlined in `Layout.astro`
- [x] 4.2 Create `design-system.astro` + page-local `_demos.tsx` (isolated demo store, never `store/contact`)
- [x] 4.3 Write `docs/atoms-page-global-components.md` and update `docs/component-dependencies.md` (catalogue + page trees)

## 5. Verification

- [x] 5.1 `pnpm build` green (5 pages, sitemap emitted), zero console errors on `/design-system`
- [x] 5.2 Confirm every Stitch HUD pill, feature icon, CTA, and form control maps to exactly one atom

## 6. Spanish copy (approved follow-up, not yet in code)

- [x] 6.1 Translate `ContactForm` labels/placeholders/buttons/success text to Spanish
- [x] 6.2 Translate `contactSchema` Zod messages to Spanish; rebuild and confirm zero English strings
