## 1. SectionHeader canonical defaults

- [x] 1.1 Extend `molecules/SectionHeader.astro` with shared canonical core (both levels), extras-only `titleClass` merge, `id` prop on string titles, and exported core const for slot reuse
- [x] 1.2 Migrate Hero/Challenges/Testimonials/Products to string titles (`title` + `id`, extras via `titleClass`), keeping tags and anchors
- [x] 1.3 Migrate ContactSection to canonical core via imported const in the gradient `title` slot, preserving `contact-heading` id

## 2. Brand logo integration

- [x] 2.1 Copy `~/Desktop/Downloads/stitch_vetoxzyn/logo/logo.webp` → `public/brand/logo.webp` and create `atoms/BrandLogo.astro` (plain `<img>`, 600×244, `alt="Vetoxzyn"`, height class + loading props)
- [x] 2.2 Adopt `BrandLogo` in `PrimaryNav` (`h-10` eager/high-priority inside home `NavLink`) and `FooterMeta` (`h-8` lazy), replacing text wordmarks
- [x] 2.3 Repoint `BUSINESS_DATA.logo` to `/brand/logo.webp`

## 3. Verification and docs

- [x] 3.1 Run `pnpm build` with zero errors and spot-check headings (390/768/1280) plus header/footer logo with no overflow
- [x] 3.2 Update `docs/component-dependencies.md` per-page trees for the new `BrandLogo` edges and heading-block changes (re-run the three `rg` commands, never from memory)
