## ADDED Requirements

### Requirement: Design-system showcase page
The system SHALL provide `src/pages/design-system.astro` rendering every standardized atom with all its variants (Eyebrow, Badge feature + 3 tag tones, Icon circles + bare set, Card ×3 with testimonial copy, and a React island demoing Input/Textarea/Checkbox/Button variants). Page-local `src/pages/_demos.tsx` SHALL bind atoms to an isolated `useState` demo store and SHALL NEVER import `store/contact`. The page SHALL carry explicit SEO title/description via `PageSEO`.

#### Scenario: Variant review without side effects
- **WHEN** a reviewer opens `/design-system`, types in the demo inputs, and toggles demo checkboxes
- **THEN** all variants render and respond locally while the persisted `vetoxzyn-contact-storage` draft remains untouched

#### Scenario: Showcase builds cleanly
- **WHEN** `pnpm build` runs
- **THEN** `/design-system` builds to static HTML (5 pages total) with no build errors and no new dependencies
