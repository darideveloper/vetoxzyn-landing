## Why

The landing (`/`) currently renders `Hero` + a temporary English "Why Vetoxzyn" placeholder + contact. The next Stitch section in narrative order is `design/stitch/02-challanges` (Transciende los Obstáculos Clínicos), which establishes the Desafío/Solución story and is the first consumer of `Badge tag dark/light` and `Icon circle orange`. Building it now replaces placeholder copy with real ES content and unblocks testimonials/products.

## What Changes

- New static organism `src/components/organisms/Challenges.astro` (`section#desafios`) replicating `02-challanges/code.html` + `screen.png`: left white content card (Eyebrow + H2 + sub + 3 feature rows) and right floating media card (local WebP image + 2 HUD badges).
- Mount `<Challenges />` on `src/pages/index.astro` directly after `<Hero />`, ahead of the placeholder benefits block.
- Download the Stitch `aida-public` placeholder image, convert to WebP, ship under `src/assets/challenges/` and render via `astro:assets Image` (`loading="lazy"`); no `googleusercontent` hotlink remains.
- Reuse standardized atoms untouched per `docs/atoms-page-global-components.md`: `Eyebrow E2`, `Icon circle orange size lg` ×3 (`shield`, `water_drop`, `eco`), `Badge tag dark` (CLINICAL GRADE) + `Badge tag light icon=verified` (99.9% PURE). Bespoke Stitch wrappers (overlap `-ml-16`, `-rotate-3 hover:rotate-0`, `rounded-[24px/32px]`, gradient overlay) live in the organism only.
- Update living docs `docs/component-dependencies.md` (per-page tree + organism catalogue) to include the new organism.

## Capabilities

### New Capabilities
- `challenges-section`: static challenges/problem-solution section (content card + floating media card, atom reuse, responsive overlap, local lazy image, a11y/brand rules).

### Modified Capabilities
- None. Hero CTA hrefs (`#section-3`/`#section-5`) stay as-is; rewiring them to `#desafios` is an explicit follow-up, not part of this change.

## Impact

- Added: `src/components/organisms/Challenges.astro`, `src/assets/challenges/*.webp`, change-local `specs/challenges-section/spec.md` (archives to `openspec/specs/challenges-section/spec.md`).
- Modified: `src/pages/index.astro` (mount point), `docs/component-dependencies.md` (trees + catalogue + notes).
- No store, no island (`client:`), no new tokens in `src/styles/global.css` (map to closest existing), no SEO/route changes, no breaking changes.
