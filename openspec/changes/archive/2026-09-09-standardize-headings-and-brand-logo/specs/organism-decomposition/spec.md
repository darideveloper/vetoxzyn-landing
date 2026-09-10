## MODIFIED Requirements

### Requirement: Shared section header molecule

The system SHALL provide a `molecules/SectionHeader.astro` component with optional eyebrow, title, subtitle, `align` ("left"|"center"), `level` ("h1"|"h2"), and `id` props, SHALL apply a locked canonical title core (`font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface`) for both levels with caller `titleClass` merged after the core for spacing/extras only, SHALL restrict the `title` slot to inline-markup cases (reusing the canonical core), and SHALL use it for the heading blocks in Hero (`h1#hero-heading`), Challenges, Testimonials, Products, and ContactSection (all `h2`).

#### Scenario: Consistent headings render

- **WHEN** any of the five sections renders its heading
- **THEN** the eyebrow, title, subtitle, alignment match the pre-change output, every title shows the identical canonical Montserrat `32px → 64px` style, and heading levels/tags/ids (`h1#hero-heading`, section `h2` ids) are preserved

#### Scenario: No inline heading duplication remains

- **WHEN** the change is complete
- **THEN** no organism contains an inline Eyebrow+h2+p heading block that SectionHeader covers, and no title carries bespoke sizing (hardcoded px, Tailwind-scale sizes, or missing font family)
