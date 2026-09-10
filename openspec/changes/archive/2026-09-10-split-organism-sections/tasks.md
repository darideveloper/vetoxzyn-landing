## 1. Leaf atoms (no dependents yet)

- [x] 1.1 Create `atoms/Avatar.astro` (plain `<img>`, 96px rounded-full bordered — external Unsplash URLs, never astro:assets) and use it in `TestimonialCard` for the half-overflow avatar
- [x] 1.2 Create `atoms/DividerImage.astro` (plain `<img>`, square lazy — external picsum URLs, never astro:assets) and use it for the two Testimonials divider slots (keep `DIVIDERS` URLs in the organism, pass as `src` props)
- [x] 1.3 Create `atoms/ResponsiveImage.astro` (astro:assets wrapper, local images only: `widths=[384,512]`, `sizes` passthrough, `eager?` → eager/high-priority vs lazy/async) and swap in Hero, Challenges, Products ×2, ContactSection
- [x] 1.4 Create `atoms/NavLink.astro` and `atoms/SpecItem.astro` (spec `dt`/`dd` cell with `wide?` prop for the col-span-2 Presentaciones cell, light/dark via inherited context props)

## 2. Shared molecules

- [x] 2.1 Create `molecules/SectionHeader.astro` (`eyebrow?`, title slot/string, `subtitle?`, `align`) and adopt in Testimonials first (simplest header), verify build
- [x] 2.2 Adopt `SectionHeader` in Challenges, Products header, ContactSection header, Hero copy block (preserve Hero `h1#hero-heading`)
- [x] 2.3 Create `molecules/ContactLinks.astro` (phone+email pair) + `PrimaryNav` + `FooterMeta`; thin Header/Footer and `contact.astro` intro, adopt `NavLink` in `404.astro` sitemap nav, verify links

## 3. Hero + Challenges thinning

- [x] 3.1 Create `HeroBullets` (move `bullets` const inside), `HeroActions`, `HeroMediaCard` (credential chip as inner markup, not a separate file) as separate molecule files; thin `Hero.astro` to shell+grid, verify build + visual
- [x] 3.2 Create `FeatureList` + `FeatureRow` as separate molecule files (move `features` const inside `FeatureList`) + `MediaWithTags`; thin `Challenges.astro` to 7/5 grid, verify build + visual at 1024–1280px (badge-clip regression zone)

## 4. Products collapse (largest organism)

- [x] 4.1 Create `SpecGrid` + `FormulaStrip`; verify spec cells render identically in isolation
- [x] 4.2 Create `ProductPanel` (`tone="light"|"dark"`: backdrop, header, SpecGrid, CTA, vertical Badge) and render both lines through it; thin `Products.astro` to header + 2 panels + strip, verify build + 390/768/1280px spot-check

## 5. Contact section + form

- [x] 5.1 Create `FaqItem` + `FaqAccordion` (owns single-open exclusivity, scoped script); delete inline `<script is:inline>` from `ContactSection.astro`
- [x] 5.2 Create `ContactBackdrop`, `ContactMedia`, `DisclaimerNote`; thin `ContactSection.astro` to composition, verify `/` and `/contact` + FAQ exclusivity + 390/1440px overflow check
- [x] 5.3 Extract `FormRow`, `InterestPicker`, `FormSuccess` as separate molecule files under `molecules/` (ContactForm.tsx stays the single `client:load` island, store logic untouched); verify validation/submit/reset + ES errors

## 6. Hierarchy + docs (Definition of Done)

- [x] 6.1 Run `rg "^import" src --glob "*.{astro,ts,tsx,jsx}"` and confirm tier rules (atoms←store/lib, molecules←atoms, organisms←molecules/atoms, atoms acyclic, no `ui/`/`Validated*`)
- [x] 6.2 Update `docs/component-dependencies.md`: redraw `index.astro` + `contact.astro` + `404.astro` per-page trees, extend Atom catalogue (+5) and Molecules/Organisms lists, record header/panel/FAQ/ResponsiveImage/plain-img/404-NavLink/SpecItem-wide/data-consts decisions in Notes; re-run `rg --files src/components | sort` + `rg --files src/pages | sort` to verify zero drift
- [x] 6.3 Final `pnpm run build` + landing/contact/404 smoke check (anchors `#desafios`/`#section-3/4/5`, island hydration, no visual diff)
