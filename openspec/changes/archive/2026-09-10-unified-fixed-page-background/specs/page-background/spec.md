## ADDED Requirements

### Requirement: Global fixed background layer

The system SHALL render a single global background layer once in `src/layouts/Layout.astro` as the first `<body>` child: an `aria-hidden="true"`, `pointer-events-none`, `position:fixed inset-0` decorator wash behind all page content at a non-negative z-level (never `z-index:-10` against the `body` background), with `html,body` keeping a solid `surface-ice` fallback background. The layer SHALL reuse existing brand tokens (`secondary-fixed/40`, `primary-fixed-dim/30`) and the existing `blob-bg` morph animation verbatim (no `motion-safe:` variant, no new durations — the pre-existing `prefers-reduced-motion` guard already targets `.blob-bg`).

#### Scenario: Continuous canvas across sections
- **WHEN** a visitor scrolls `/` from Hero through ContactSection
- **THEN** one continuous wash stays fixed behind all sections with no band seams between organisms

#### Scenario: Shared across pages
- **WHEN** a visitor loads `/`, `/contact`, or `/about`
- **THEN** the same fixed wash renders behind page content with no per-page duplication

#### Scenario: Reduced motion
- **WHEN** a visitor prefers reduced motion
- **THEN** the fixed layer renders statically (no blob drift) with all content fully visible

### Requirement: Transparent section shells

Hero, Challenges, Products shell, ContactSection shell, and Testimonials shells SHALL be transparent (no `bg-surface-ice` or section-owned wash fills on the `<section>` element itself). Interior fills that ARE the design (ProductPanel light/dark tones, Challenges white content card, glass/FAQ/HUD panels, tilted media cards) SHALL remain unchanged.

#### Scenario: Gutters show the global wash
- **WHEN** a visitor views the landing between cards
- **THEN** the visible background in the gutters is the global wash, identical across Hero/Challenges/Testimonials/Products/Contact seams

#### Scenario: Product tones preserved
- **WHEN** a visitor views the Products split panels
- **THEN** the light panel still reads white and the dark panel still reads `inverse-surface` full-bleed, with only the header strip and FormulaStrip seams showing the global wash

### Requirement: Section decorator overlay contract

Section-local decorators (Testimonials blobs, ContactBackdrop) SHALL render as `absolute`, `aria-hidden="true"`, `pointer-events-none` layers inside a `relative` section, stacked above the global wash but below the section's content grid. Testimonials and ContactSection (the bleeding-decorator sections) SHALL use `overflow-x-clip` (with `overflow-hidden` fallback pairing) so decorators may bleed vertically without producing horizontal scroll. Hero keeps its existing `overflow-hidden` (its blobs stay cropped to the hero grid by design).

#### Scenario: Decorators never clip vertically
- **WHEN** a visitor views Testimonials at 390px or 1440px width
- **THEN** both blurred brand blobs render whole (no slash cut), content stays above them, and no horizontal scrollbar appears

#### Scenario: Decorators stay inert
- **WHEN** a keyboard or screen-reader user traverses any section
- **THEN** decorator layers receive no focus, announce nothing, and intercept no pointer events

### Requirement: Contact distinctive tint overlay

ContactSection SHALL layer a section-local tint/blur overlay (`absolute inset-0`, above the global wash, below `ContactBackdrop` + content): a `bg-gradient-to-b from-brand-pink/[0.07] via-transparent to-brand-orange/[0.09]` gradient with a light `backdrop-blur` — while retaining the existing `ContactBackdrop` (3 organic blobs + giant rotated `BIOSEGURIDAD` at `opacity-[0.03]`). The combination SHALL read as a distinct "room" without introducing a new theme or retuning glass panels.

#### Scenario: Contact reads distinct
- **WHEN** a visitor scrolls from Products into ContactSection
- **THEN** the Contact region shows a visibly warmer tinted blur behind the glass form/FAQ while body copy contrast stays at its current passing level
