## MODIFIED Requirements

### Requirement: Business identity in site-config with resolvable logo

The system SHALL hold all business identity in `src/data/site-config.ts` with `as const` exports as before; `BUSINESS_DATA.logo` SHALL be the imported `ImageMetadata` of `src/assets/brand/logo.webp` (typed via `astro/client`, not a public URL string) instead of the removed `"/brand/logo.webp"` path, and `BaseSEO` frontmatter SHALL pass it to `getImage()` to emit the absolute build URL, so JSON-LD `logo` stays resolvable.

#### Scenario: Logo URL resolves after brand move

- **WHEN** any page renders its JSON-LD block
- **THEN** the `logo` field contains an absolute URL pointing at the hashed logo build output, and no `/brand/logo.webp` reference remains in config, markup, or build output
