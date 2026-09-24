## MODIFIED Requirements

### Requirement: BrandLogo atom and src brand asset

The system SHALL ship the real logo as `src/assets/brand/logo.webp` (600×244) and provide `atoms/BrandLogo.astro` rendering it via `Picture` from `astro:assets` (`formats={['avif','webp']}`, single 600w candidate) with `width=600 height=244`, `alt="Vetoxzyn"`, `decoding="async"`, ratio-locked sizing via caller-passed height class (`h-* w-auto`), and caller-controlled loading strategy. No `public/brand/logo.webp` SHALL remain.

#### Scenario: Logo asset resolves

- **WHEN** any page renders `BrandLogo`
- **THEN** the logo is served from the hashed `dist/_astro/` build output as AVIF-first `<picture>` with zero 404s

#### Scenario: Logo renders without distortion

- **WHEN** `BrandLogo` renders at any caller-given height class
- **THEN** the image keeps its 600:244 aspect ratio (`w-auto`) and carries the `Vetoxzyn` alt text

### Requirement: Logo in header and footer

The system SHALL render `BrandLogo` in the site header via `PrimaryNav` (`h-20`, eager with high fetch priority, wrapped in the home `NavLink`) and in the footer via `FooterMeta` (`h-16`, lazy), replacing the text wordmarks, with the JSON-LD `logo` field resolved via `getImage()` on the same `src/assets/brand/logo.webp` source in `BaseSEO` frontmatter so it emits a resolvable absolute URL.

#### Scenario: Header shows linked logo

- **WHEN** any page renders the header
- **THEN** the `h-20` logo is shown (no `Vetoxzyn` text wordmark) and activates the home link via click, keyboard, and middle-click

#### Scenario: Footer shows logo and resolvable SEO

- **WHEN** any page renders the footer
- **THEN** the `h-16` lazy logo is shown beside the copyright line, and the JSON-LD `logo` field resolves to the hashed logo build output (not the removed `/brand/logo.webp` path)
