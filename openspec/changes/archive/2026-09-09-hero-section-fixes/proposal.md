## Why

The hero section shipped with three visible defects: the secondary CTA was nearly invisible (glass styling on a matching light background read as plain text), both CTAs had a glitched hover animation (two competing motion owners on the same element), and the mobile layout was left-aligned with poor visual balance on narrow screens. This change records the fixes that bring the hero in line with its design intent — no new features, no copy changes.

## What Changes

- **Secondary CTA becomes a ghost button**: `Button` `variant="secondary"` (B3) changes from glass pill (`border-white/60` + `bg-[#f9f9fd]/70`) to a transparent ghost pill with a visible brand-color border (`border-2 border-[#a83200]/40`, `text-[#a83200]`, `hover:bg-[#a83200]/10`). Applies everywhere the variant is used (hero + design-system showcase).
- **Single motion owner per hero CTA**: `tilt-float` removed from both hero `Button`s in `Hero.astro`; the atom's own `hover:scale-105` is now the only hover motion. The `tilt-float` effect stays on the hero visual card and other organisms.
- **Mobile-only centered hero**: below `md`, the hero content column centers (eyebrow, H1, subcopy, bullet block, CTAs); at `md` and up it returns to the original left-aligned layout. Desktop grid (`lg:grid-cols-12` 7+5) untouched.

## Capabilities

### New Capabilities

- None — no new behavior is introduced.

### Modified Capabilities

- `hero-section`: responsive behavior gains mobile centering (centered below `md`, left-aligned at `md+`); hero CTAs drop the `tilt-float` hover layer.
- `global-atoms`: standardized Button atom — `secondary` redefined from B3 glass pill to B3 ghost pill (transparent bg, brand border).

## Impact

- Touched files only: `src/components/atoms/Button.tsx` (variant styles + comment), `src/components/organisms/Hero.astro` (CTA classes, alignment classes).
- No import changes, no new dependencies, no copy/SEO/a11y changes; `docs/component-dependencies.md` tree unchanged (same atoms, same pages).
- Visual change confined to hero CTAs and below-`md` hero alignment; design-system showcase reflects the new ghost secondary automatically.
