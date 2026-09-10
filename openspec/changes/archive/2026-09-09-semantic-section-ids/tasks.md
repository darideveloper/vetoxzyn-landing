## 1. Anchor source of truth + section renames

- [x] 1.1 Create `src/data/section-ids.ts` (`as const`) with `inicio`, `desafios`, `testimonios`, `productos`, `contacto`, `contacto-formulario`, `contacto-faq`
- [x] 1.2 Add missing `id="inicio"` to `Hero.astro` section (import from source of truth) + `scroll-mt-*` offset
- [x] 1.3 Rename `Testimonials.astro` `section-3` → `testimonios` via source of truth + `scroll-mt-*` offset
- [x] 1.4 Rename `Products.astro` `section-4` → `productos` via source of truth + `scroll-mt-*` offset
- [x] 1.5 Rename `ContactSection.astro` `section-5` → `contacto` via source of truth + `scroll-mt-*` offset; switch `Challenges.astro` `desafios` to source of truth import + `scroll-mt-*` offset (desafios unchanged)
- [x] 1.6 Verify no `section-3/4/5` literals remain in implementation: `rg 'section-[345]' src` (excluded by design: the change's own spec names old ids in the removal scenario, and `docs/component-dependencies.md` Notes retain them in historical change records) — src clean

## 2. CTA retargeting

- [x] 2.1 Retarget `HeroActions.astro` CTAs to `#contacto` (primary) and `#productos` (secondary) via source of truth
- [x] 2.2 Retarget `ProductPanel.astro` CTA (`Ver ficha técnica`) to `#contacto` via source of truth
- [x] 2.3 Click-test both CTAs on `/` plus deep links `/#inicio /#desafios /#testimonios /#productos /#contacto` on `/` and `/contact` (verified via `dist/` HTML: hrefs + ids present, targets exist)

## 3. Contact sub-anchors

- [x] 3.1 Add `contacto-formulario` id to the `ContactForm` wrapper (in `ContactForm.tsx` outer div) via source of truth
- [x] 3.2 Add `contacto-faq` id to `FaqAccordion.astro` root via source of truth (keep `data-faq` script scope unchanged)
- [x] 3.3 Deep-link test `/#contacto-formulario` and `/#contacto-faq` on `/` and `/contact`; confirm single instance per page (verified via `dist/` HTML: ids present once per page)

## 4. Form label association

- [x] 4.1 Add optional `idPrefix` prop (default `""`) to atoms `Input.tsx`, `Textarea.tsx`, `Checkbox.tsx`; render `id` as `idPrefix` + kebab-case(`field`) wired to `<label htmlFor>` (keep `useField(field)` signature for `_demos.tsx` compat)
- [x] 4.2 Pass `idPrefix="contacto-"` at call sites (`ContactForm.tsx`, `InterestPicker.tsx`) so DOM ids are `contacto-name`, `contacto-clinica`, `contacto-telefono`, `contacto-email`, `contacto-message`, `contacto-linea-topico`, `contacto-linea-instalaciones`, `contacto-linea-distribucion`; store keys stay unprefixed
- [x] 4.3 Verify no duplicate ids per page, labels associated (a11y spot-check), submit/validate/reset + persist unchanged, and dev-only `/design-system` form demo still renders (dist: 8/8 ids + labels, no dupes; `src/store/*` untouched; demo props optional-only so it renders unchanged)

## 5. Docs + final verification

- [x] 5.1 Update `docs/component-dependencies.md` per-page trees + notes (`#section-3/4/5` → new slugs, `inicio` added, contact sub-anchors, form id note) after re-running the `rg "^import"` / `rg --files` commands
- [x] 5.2 Run `pnpm run check:palette` (must report clean) and `astro build` green; confirm `aria-labelledby` pairs intact (`rg 'aria-labelledby|id=' src`) — palette clean, build 4 pages, no aria orphans, no dupes
