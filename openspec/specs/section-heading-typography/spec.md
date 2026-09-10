## ADDED Requirements

### Requirement: Canonical section-title style owned by SectionHeader

The system SHALL render every section title (Hero `h1`, Challenges/Testimonials/Products/ContactSection `h2`) in one identical visual style — Montserrat 700, `25.6px/1.25` mobile scaling to `64px/1.1/-0.02em` desktop — with the heading tag as the only difference between Hero and sections.

#### Scenario: All section titles share one size
- **WHEN** Hero, Challenges, Testimonials, Products, and ContactSection render their titles at the same viewport
- **THEN** all five titles show identical font family, size, weight, and line height (only the tag — `h1` vs `h2` — differs)

#### Scenario: No bespoke title sizing remains
- **WHEN** the change is complete
- **THEN** no organism title uses hardcoded px sizes (`text-[32px]`, `md:text-[48px]`), Tailwind-scale sizes (`text-4xl`, `text-5xl`), or omits the Montserrat `font-*` family class

### Requirement: SectionHeader default title classes with id prop

The system SHALL provide `molecules/SectionHeader.astro` with a locked canonical core class string applied for both `level="h1"` and `level="h2"`, an optional `id` prop rendered on string titles, and `titleClass` merged after the core for spacing/extras only (callers can append layout classes but cannot change family or size).

#### Scenario: String titles get canonical style and anchor
- **WHEN** a caller passes `level`, `title`, and `id` (e.g. Hero `h1` + `hero-heading`)
- **THEN** the rendered heading carries the canonical core classes and the given `id`, with no title slot needed

#### Scenario: Title slot restricted to inline markup
- **WHEN** a title needs inline markup a string cannot express (contact gradient span)
- **THEN** the `title` slot is used and its content reuses the canonical core classes, preserving the heading `id`
