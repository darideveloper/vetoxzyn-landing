## ADDED Requirements

### Requirement: Shared section header molecule

The system SHALL provide a `molecules/SectionHeader.astro` component with optional eyebrow, title, subtitle, and `align` ("left"|"center") props, SHALL preserve heading levels (Hero `h1#hero-heading`, `h2` elsewhere), and SHALL use it for the heading blocks in Hero, Challenges, Testimonials, Products, and ContactSection.

#### Scenario: Consistent headings render

- **WHEN** any of the five sections renders its heading
- **THEN** the eyebrow, title, subtitle, alignment, and heading level match the pre-split output exactly

#### Scenario: No inline heading duplication remains

- **WHEN** the change is complete
- **THEN** no organism contains an inline Eyebrow+h2+p heading block that SectionHeader covers

### Requirement: Hero organism decomposition

The system SHALL compose `organisms/Hero.astro` from `SectionHeader`, `HeroBullets` (5 Icon+label rows), `HeroActions` (2-Button CTA group), and `HeroMediaCard` (image + credential overlay chip), with the organism holding only the section shell and grid.

#### Scenario: Hero renders identically

- **WHEN** the landing page Hero renders
- **THEN** bullets, CTAs (`#section-5`, `#section-4`), media card, and credential overlay are visually and functionally identical to before

### Requirement: Challenges organism decomposition

The system SHALL compose `organisms/Challenges.astro` from `SectionHeader`, `FeatureList` (3 `FeatureRow` items with Icon + title + desafio/solucion), and `MediaWithTags` (tilted image + 2 absolute Badge tags), with the organism holding only the 7/5 grid.

#### Scenario: Challenges renders identically

- **WHEN** the `#desafios` section renders
- **THEN** feature rows, badges (`CLINICAL GRADE`, `99.9% PURE`), and tilted media card match the pre-split output

### Requirement: Single product panel with tone prop

The system SHALL provide `molecules/ProductPanel.astro` with `tone="light"|"dark"` rendering backdrop, header, `SpecGrid`, product CTA, and vertical Badge pill, SHALL extract `SpecGrid` (grid of `SpecItem` atoms) and `FormulaStrip` (formula banner), and SHALL render both product lines through this molecule.

#### Scenario: Both product lines render identically

- **WHEN** the `#section-4` section renders
- **THEN** Topico (light) and Instalaciones (dark) panels show identical specs, CTAs (`#section-5`), pills, and the formula banner as before

#### Scenario: No mirrored panel markup remains

- **WHEN** the change is complete
- **THEN** `Products.astro` contains no duplicated light/dark panel markup outside `ProductPanel`

### Requirement: Contact section decomposition with FAQ ownership

The system SHALL compose `organisms/ContactSection.astro` from `SectionHeader`, `ContactBackdrop` (blobs + massive word), `FaqAccordion` (glass panel + N `FaqItem` details items, owning the single-open exclusivity behavior), `ContactMedia`, `DisclaimerNote`, and the `ContactForm` island, with no inline `<script is:inline>` remaining in the organism.

#### Scenario: Contact section renders and behaves identically

- **WHEN** `/` (`#section-5`) and `/contact` render
- **THEN** header, FAQ (single-open), image, disclaimer, and form match pre-split output and behavior

### Requirement: Contact form internal decomposition

The system SHALL structure `molecules/ContactForm.tsx` from `FormRow` (input grids), `InterestPicker` (label + 3 Checkbox group), and `FormSuccess` (submitted state + reset) as separate molecule files, while remaining a single `client:load` island bound to the `contact` store with unchanged validation and submit behavior.

#### Scenario: Form submits and resets as before

- **WHEN** a user fills and submits the form, then clicks reset
- **THEN** validation errors, success message, and reset behave exactly as before

### Requirement: Raw-tag atomization and shell molecules

The system SHALL provide `atoms/Avatar.astro` + `atoms/DividerImage.astro` (both plain `<img>` wrappers for external URLs, never `astro:assets`), `atoms/ResponsiveImage.astro` (astro:assets wrapper, local images only), `atoms/NavLink.astro`, and `atoms/SpecItem.astro` (with `wide?` prop for full-width cells), and SHALL compose Header/Footer from `PrimaryNav`, `ContactLinks`, and `FooterMeta` molecules, adopting `NavLink` in the `contact.astro` intro and `404.astro` sitemap nav with no raw `<a>` link pairs left in shells or those pages.

#### Scenario: No raw bypass tags remain

- **WHEN** the change is complete
- **THEN** no avatar, divider, responsive image, nav link, or spec cell bypasses its atom, the full-width Presentaciones cell renders via `wide`, and Header/Footer/`contact.astro` intro/`404.astro` nav share the link molecules

### Requirement: Single-use data consts live in molecules

The system SHALL keep single-use data arrays (`bullets`, `features`) inside their new molecules (`HeroBullets`, `FeatureList`) instead of prop-drilling, while Testimonials `DIVIDERS` URLs stay in the organism and pass as `src` props to `DividerImage`.

#### Scenario: Data colocated, no prop-drilling

- **WHEN** the split organisms render
- **THEN** bullets, features, and dividers show identical content with no new props on the molecule interfaces except `DividerImage src`

### Requirement: Atomic hierarchy compliance

The system SHALL keep all new components within vanilla import rules (atoms ← `atoms/store/lib`; molecules ← `atoms/store/lib`; organisms ← `molecules/atoms/store/lib`), with atom-to-atom imports acyclic and no `ui/` or `Validated*` tier introduced.

#### Scenario: Hierarchy verifies clean

- **WHEN** imports are swept with `rg "^import" src --glob "*.{astro,ts,tsx,jsx}"`
- **THEN** every import resolves within its tier's allowed set with no cycles

### Requirement: Component-dependencies docs updated

The system SHALL update `docs/component-dependencies.md` to reflect the new trees and catalogues: redrawn Per-page trees for `index.astro`, `contact.astro`, and `404.astro` (new ContactSection/ProductPanel subtrees, NavLink in 404), extended Atom catalogue (+5 atoms), extended Molecules/Organisms lists, and Notes entries recording the single-header, single-panel-tone, FAQ-ownership, ResponsiveImage-convention, plain-img-for-external-URLs, 404-NavLink, SpecItem-wide, and data-const-placement decisions.

#### Scenario: Docs match code

- **WHEN** a reviewer re-runs `rg "^import" src`, `rg --files src/components`, and `rg --files src/pages`
- **THEN** every page-to-leaf path in the doc matches the actual imports with no missing or stale entries
