## Why

Organisms have grown into 76–150 line monoliths (Products 150, ContactSection 115) with copy-pasted heading blocks, mirrored light/dark panels, and raw `<img>`/`<a>`/`<details>`/`<dl>` tags bypassing the vanilla atomic hierarchy. Splitting them now restores the `organisms → molecules → atoms` contract before the next visual iteration makes the duplication worse.

## What Changes

- Add shared `molecules/SectionHeader.astro` (optional eyebrow + title + subtitle + align) and use it in Hero, Challenges, Testimonials, Products, ContactSection.
- Split Hero into `HeroBullets`, `HeroActions`, `HeroMediaCard` (credential chip as inner markup of `HeroMediaCard`, not a separate file); organism becomes section composition only.
- Split Challenges into `FeatureList` + `FeatureRow` as separate molecule files and `MediaWithTags`; organism keeps the 7/5 grid only.
- Collapse the two mirrored Products panels into one `molecules/ProductPanel.astro` with `tone="light"|"dark"` prop; extract `SpecGrid` (+ `SpecItem` atom) and `FormulaStrip`.
- Split ContactSection into `ContactBackdrop`, `FaqAccordion` (+ `FaqItem`, owns the exclusivity JS), `ContactMedia`, `DisclaimerNote`; remove the inline `<script is:inline>` from the organism.
- Decompose `molecules/ContactForm.tsx` into `FormRow`, `InterestPicker`, `FormSuccess` as separate molecule files (ContactForm stays the single `client:load` island; children are plain React components in its bundle).
- Atomize raw tags: new `atoms/Avatar.astro` + `atoms/DividerImage.astro` (both plain `<img>` wrappers — avatars/dividers are external Unsplash/picsum URLs, never `astro:assets`), `atoms/ResponsiveImage.astro` (astro:assets wrapper, local images only), `atoms/NavLink.astro`, `atoms/SpecItem.astro` (with `wide?` prop for the full-width Presentaciones cell); Header/Footer slim to `PrimaryNav` + `ContactLinks` + `FooterMeta`, and adopt `NavLink` in the `contact.astro` intro and `404.astro` sitemap nav.
- Update `docs/component-dependencies.md` (Per-page trees, Atom catalogue, Molecules/Organisms lists, Notes) and verify with `rg "^import" src --glob "*.{astro,ts,tsx,jsx}"`, `rg --files src/components`, `rg --files src/pages`.
- No visual or behavioral change: pixel-identical output, same anchors (`#desafios`, `#section-3/4/5`), same `client:load` islands, same store bindings.
- Explicitly out of scope: `design-system.astro`/`_demos.tsx` (dev showcase) and `about.astro` (placeholder) stay untouched.

## Capabilities

### New Capabilities

- `organism-decomposition`: contract for the extracted atoms/molecules, organism thinning, hierarchy compliance, and docs-tree updates.

### Modified Capabilities

- None. No spec-level behavior changes — existing `hero-section`, `challenges-section`, `testimonials-section`, `products-section`, `contact-section`, `contact-islands`, `global-atoms` requirements stay as-is; this is a structural refactor.

## Impact

- Affected: `src/components/organisms/*` (all 7 thinned), `src/components/molecules/*` (+21 new), `src/components/atoms/*` (+5 new), `src/pages/contact.astro` intro + `src/pages/404.astro` nav (reuse new molecules), `docs/component-dependencies.md`.
- No API, store, data, SEO, or deployment changes. No new dependencies. Risk is import-path churn; mitigated by per-organism verification (build + visual spot-check at 390/768/1280px).
