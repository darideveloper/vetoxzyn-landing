## Why

Landing currently shows Hero + placeholder benefits + contact; the Stitch `03-testimonials` section ("Lo que dicen los veterinarios") is the next designed proof block and Hero's `href="#section-3"` is a dead anchor until it lands.

## What Changes

- Add `Testimonials` page section (`id="section-3"`) to `index.astro` after the placeholder benefits block and before contact (placeholder stays until `02-challenges` replaces it), matching Stitch `03-testimonials` content and layout (centered header + 3-col grid).
- Add `src/data/testimonials.ts` with the 3 fixed Spanish quotes (names, clinics, orange/pink/green accents) as the single content source.
- Add `molecules/TestimonialCard.astro` (Card C1 shell + accent bar + bare quote Icon + quote + footer) and `organisms/Testimonials.astro` (bg decor + E2 Eyebrow header + grid mapping data to cards).
- Reuse global atoms unchanged: `Eyebrow` E2 standard, `Card` C1, `Icon` bare tones; no atom API changes, no React (fully static).
- Update `docs/component-dependencies.md` per-page tree (index gains Testimonials subtree; Card becomes reachable).

## Capabilities

### New Capabilities

- `testimonials-section`: static social-proof section — content model (3 quotes with accents), section layout/behavior (anchor, header, responsive grid, decorative background), and card composition rules.

### Modified Capabilities

- None (no existing spec requirements change; Hero anchor becomes live but its spec behavior is unchanged).

## Impact

- Affected: `src/pages/index.astro`, new `src/data/testimonials.ts`, new `src/components/molecules/TestimonialCard.astro`, new `src/components/organisms/Testimonials.astro`, `docs/component-dependencies.md`.
- No API, store, or dependency changes; no breaking changes. Known follow-up (out of scope): Hero secondary label "Ver línea Tópico" points at `#section-3` but semantically wants products (`section-4`) — fixed when products lands.
