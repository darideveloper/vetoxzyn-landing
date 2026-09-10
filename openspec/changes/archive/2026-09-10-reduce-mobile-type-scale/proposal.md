## Why

Page text feels oversized on mobile viewports: section titles at 32px and body copy at 16–18px dominate small screens, hurting scannability and visual hierarchy. Tablet and desktop sizes are settled and must not change, so the fix is a mobile-only (`<768px`) type scale: headings −20%, body and small UI text −10%.

## What Changes

- Appended one mobile-only `@media (max-width: 767px)` block to `src/styles/global.css` overriding `font-size` for the text utilities in use — no component files touched.
- Heading scale (−20%): `text-display-lg-mobile` 32px → 25.6px, `text-xl` 20px → 16px.
- Body scale (−10%): `text-body-lg` 18px → 16.2px, `text-body-md` 16px → 14.4px, `text-base`/`text-lg` likewise.
- Small UI text follows body (−10%): `text-caption` 12px → 10.8px, `text-label-bold` 14px → 12.6px, `text-xs`/`text-sm` likewise.
- Icon glyphs follow body (−10%): `text-2xl`/`text-3xl`/`text-4xl`, `text-[16px]` arrow.
- Form inputs scale with body to 16.2px, staying above the iOS 16px focus-zoom threshold.
- Explicitly unchanged: `text-massive` backdrop (`12vw`), all line-heights, all spacing, every `md+` (tablet/desktop) rendering.

## Capabilities

### New Capabilities
- `mobile-type-scale`: mobile-only (`<768px`) font-size overrides for body, small UI text, icons, and raw Tailwind-scale text — rates, class table, scope boundaries (backdrop, line-heights, spacing excluded), and the tablet/desktop-identity rule.

### Modified Capabilities
- `section-heading-typography`: mobile section-title size changes from 32px to 25.6px; desktop 64px requirement unchanged.

## Impact

- Affected code: `src/styles/global.css` only (one appended media block, unlayered so it wins over `@layer utilities` without `!important`).
- No component, layout, data, store, or lib files changed; no API, dependency, or deployment impact.
- Visual impact confined to viewports below 768px; tablet/desktop output verified pixel-identical (desktop `64px`/`18px` tokens intact in compiled CSS).
