## Why

Section anchor ids on `/` are inconsistent and non-descriptive: `desafios` (semantic ES) coexists with numbered placeholders (`section-3`, `section-4`, `section-5`), and `Hero` has no section id at all. Numbered ids break on reorder (already happened once when Testimonials/Products were reordered), are not shareable/deep-linkable, and the two in-page CTAs (`HeroActions`, `ProductPanel`) point at opaque targets. Form fields also render `<label>` without `id`/`for` association.

## What Changes

- Rename home sections to semantic ES slugs: Hero → `inicio`, Testimonials `section-3` → `testimonios`, Products `section-4` → `productos`, ContactSection `section-5` → `contacto`. Keep `desafios` unchanged.
- Keep existing product panel heading ids (`products-topico-title`, `products-instalaciones-title`) and heading `aria-labelledby` wiring unchanged.
- Add scoped sub-anchors inside ContactSection: `contacto-formulario` (form wrapper), `contacto-faq` (FaqAccordion root).
- Add `id`/`for` (`htmlFor`) association to form atoms (`Input`, `Textarea`, `Checkbox`) via an optional `idPrefix` prop (kebab-case derivation from the existing `field` prop); call sites (`ContactForm`, `InterestPicker`) pass `idPrefix="contacto-"`.
- Retarget in-repo anchor consumers: `HeroActions` → `#contacto` / `#productos`; `ProductPanel` CTA → `#contacto`.
- Add `scroll-mt-*` offset on anchored sections so sticky-header navigation does not hide targets.
- **BREAKING**: old anchors `#section-3`, `#section-4`, `#section-5` stop working. No redirects (static site, in-repo consumers only).

## Capabilities

### New Capabilities
- `section-anchors`: semantic, stable anchor ids for all home sections + contact sub-anchors, single source of truth, CTA retargeting, scroll offset, and form label association rules.

### Modified Capabilities
- None (no existing spec covers anchor ids; `hero-section`, `products-section`, `testimonials-section`, `contact-section`, `contact-islands` describe content/layout, not id contracts).

## Impact

- Affected code: `Hero.astro`, `Testimonials.astro`, `Products.astro`, `ContactSection.astro`, `FaqAccordion.astro`, `HeroActions.astro`, `ProductPanel.astro`, `ContactForm.tsx`, `InterestPicker.tsx`, atoms `Input.tsx`/`Textarea.tsx`/`Checkbox.tsx`, new `src/data/section-ids.ts`, `docs/component-dependencies.md` (per-page trees name `#section-3/4/5`).
- No API, store-shape, or styling-token changes. No new routes. Dev-only `design-system` ids (`button`, `eyebrow`, …) untouched.
- Verification: `astro build` green, `pnpm run check:palette` clean, anchor click + deep-link check on `/` and `/contact`.
