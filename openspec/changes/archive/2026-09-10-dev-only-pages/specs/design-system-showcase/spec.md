## MODIFIED Requirements

### Requirement: Design-system showcase page
The system SHALL provide `src/dev-pages/design-system.astro` (dev-only route, NOT a prod page) rendering every standardized atom with all its variants (Eyebrow, Badge feature + 3 tag tones, Icon circles + bare set, Card ×3 with testimonial copy, and a React island demoing Input/Textarea/Checkbox/Button variants). Page-local `src/dev-pages/_demos.tsx` SHALL bind atoms to an isolated `useState` demo store and SHALL NEVER import `store/contact`. The page SHALL carry explicit SEO title/description via `PageSEO`. The page SHALL resolve in `astro dev` and SHALL NOT emit any file to `dist/` on `pnpm build`.

#### Scenario: Variant review without side effects
- **WHEN** a reviewer opens `/design-system` in dev, types in the demo inputs, and toggles demo checkboxes
- **THEN** all variants render and respond locally while the persisted `vetoxzyn-contact-storage` draft remains untouched

#### Scenario: Showcase excluded from production
- **WHEN** `pnpm build` runs
- **THEN** the build succeeds with no `dist/design-system/` output, no new dependencies, and no dev-only URL in the sitemap
