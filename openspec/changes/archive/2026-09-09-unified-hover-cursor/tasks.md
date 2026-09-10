## 1. Motion foundation (`global.css`)

- [x] 1.1 Add `--duration-hover` + `--ease-hover` to `@theme` and re-time `.tilt-float` to them
- [x] 1.2 Add `@layer base` cursor restore (`button`, `[role="button"]`, `summary`), `:disabled` not-allowed, shared `:focus-visible` ring, `summary` marker normalization
- [x] 1.3 Add shared `.lift` + `.link` + `.hover-subtle` classes on the tokens; extend `prefers-reduced-motion` gate to cover the contact-panel straighten

## 2. Atom adoption

- [x] 2.1 `Button.tsx`: adopt `.lift`, add `active:scale-[.98]` + `disabled:` states, add explicit `cursor-pointer` to the anchor branch (base layer covers the rest)
- [x] 2.2 `NavLink.astro`: adopt `.link` plus explicit `cursor-pointer` (covers header, footer, 404, contact-page, tel/mailto)
- [x] 2.3 `FaqItem.astro`: move `cursor-pointer` from `details` to `summary`, add `focus-visible` + token-timed hover wash
- [x] 2.4 `Checkbox.tsx`: add `cursor-pointer` to inner input; `Input.tsx` / `Textarea.tsx`: add `hover:border-*` + focus-ring parity
- [x] 2.5 `ContactForm.tsx`: gate `hover:rotate-0` under `motion-safe:`; `MediaWithTags.astro`: remove competing `duration-500`
- [x] 2.6 Display atoms (`Badge`, `Eyebrow`, `Card`, `Avatar`, `SpecItem`): adopt pointer-free `.hover-subtle` (`Icon` deliberately motionless — container rule)
- [x] 2.7 Display molecules (`FeatureRow`, `DisclaimerNote`, `ContactMedia`, `DividerImage`): adopt pointer-free `.hover-subtle`; layout chrome (`SectionHeader`, `FormulaStrip`, product articles, backdrops, nav chrome) stays motionless; `ponytail:` order comment locks tilt-after-subtle in `global.css`

## 3. Verification and docs

- [x] 3.1 `pnpm build` + tab-through (pointer on every `a`/`button`/`summary`, focus visible, disabled submit, subtle-only hover on static content) + reduced-motion emulation
- [x] 3.2 Redraw affected `docs/component-dependencies.md` trees (rg imports/files/pages) per Definition of Done
