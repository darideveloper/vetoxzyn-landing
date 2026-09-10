## ADDED Requirements

### Requirement: BrandLogo atom and public brand asset

The system SHALL ship the real logo as `public/brand/logo.webp` (600×244) and provide `atoms/BrandLogo.astro` rendering it as a plain `<img>` with `width=600 height=244`, `alt="Vetoxzyn"`, ratio-locked sizing via caller-passed height class (`h-* w-auto`), and caller-controlled loading strategy.

#### Scenario: Logo asset resolves
- **WHEN** a client or crawler requests `/brand/logo.webp`
- **THEN** the server returns the logo image with zero 404s

#### Scenario: Logo renders without distortion
- **WHEN** `BrandLogo` renders at any caller-given height class
- **THEN** the image keeps its 600:244 aspect ratio (`w-auto`) and carries the `Vetoxzyn` alt text

### Requirement: Logo in header and footer

The system SHALL render `BrandLogo` in the site header via `PrimaryNav` (`h-10`, eager with high fetch priority, wrapped in the home `NavLink`) and in the footer via `FooterMeta` (`h-8`, lazy), replacing the text wordmarks, with `BUSINESS_DATA.logo` set to `"/brand/logo.webp"` so JSON-LD emits a resolvable logo URL.

#### Scenario: Header shows linked logo
- **WHEN** any page renders the header
- **THEN** the `h-10` logo is shown (no `Vetoxzyn` text wordmark) and activates the home link via click, keyboard, and middle-click

#### Scenario: Footer shows logo and resolvable SEO
- **WHEN** any page renders the footer
- **THEN** the `h-8` lazy logo is shown beside the copyright line, and the JSON-LD `logo` field resolves to the same `/brand/logo.webp` file
