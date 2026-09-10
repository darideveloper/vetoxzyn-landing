## Why

Section headings drifted: five organisms each own bespoke title classes (hardcoded px in Testimonials, Tailwind scale in Challenges, a missing `font-*` family in Contact), and `SectionHeader`'s `title`/`titleClass` props are dead because every caller bypasses them via slots. Separately, the project ships no brand logo — header/footer render plain text while the real `logo.webp` sits outside the repo and `BUSINESS_DATA.logo` points at a file that doesn't exist.

## What Changes

- `molecules/SectionHeader.astro` owns the canonical title classes via one shared default core for both levels (identical Montserrat `32px → 64px` visuals; `level` switches the tag only); callers drop bespoke slot classes.
- New `id` prop on `SectionHeader` so string titles keep heading anchors (`hero-heading`, per-section ids) without slots; the `title` slot survives only for exceptional inline markup (contact gradient span).
- All five section titles (Hero, Challenges, Testimonials, Products, ContactSection) converge on the single canonical `h2` size; Hero keeps `h1`.
- Real logo integrated: `public/brand/logo.webp` (copied from `~/Desktop/Downloads/stitch_vetoxzyn/logo/logo.webp`) rendered by a new `atoms/BrandLogo.astro`, adopted in `PrimaryNav` (header, `h-20`, eager) and `FooterMeta` (footer, `h-16`, lazy), replacing the text wordmarks.
- `BUSINESS_DATA.logo` repointed to `/brand/logo.webp` so JSON-LD emits a resolvable URL.
- Favicon explicitly out of scope (stays Astro stock).

## Capabilities

### New Capabilities
- `section-heading-typography`: canonical section-title type scale owned by SectionHeader (default classes per level, id prop, slot-escape rule).
- `brand-logo`: BrandLogo atom, header/footer adoption (sizes, loading strategy, alt), and `public/brand/` asset + site-config logo path.

### Modified Capabilities
- `organism-decomposition`: SectionHeader contract changes (default `titleClass` by `level` becomes the source of truth; new `id` prop; title slot restricted to exceptional markup).

## Impact

- Touched: `SectionHeader.astro` (extend existing), 5 organisms' heading blocks (class-only edits), `PrimaryNav.astro`, `FooterMeta.astro`, new `atoms/BrandLogo.astro`, `public/brand/logo.webp`, `src/data/site-config.ts`, `docs/component-dependencies.md` (mandatory living-doc update).
- No new dependencies; no API changes; `astro:assets` not used for the logo (already-WebP static file, stable URL needed for JSON-LD).
- Visual: section headings unify at 32/64px Montserrat; header/footer gain the real logo. Minor, intended pixel changes in Testimonials/Challenges/Contact headings.
