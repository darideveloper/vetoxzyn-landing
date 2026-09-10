## Why

The `03-testimonials` section shipped as three uniform glass cards with no human face and no visual rhythm between cards, so the social-proof block reads as flat text. Adding client avatars half-overflowing each card and small photographic dividers between cards gives each quote a recognizable author and breaks the card-to-card monotony, using vet-themed stock imagery until licensed brand art lands.

## What Changes

- Each `TestimonialCard` renders a circular client avatar (`h-24 w-24 rounded-full`) centered on the card's top edge, half overflowing above the card (`-top-12`), with white ring + shadow over the unchanged `Card` C1 shell.
- `src/data/testimonials.ts` gains an `avatar` URL per entry (gender-matched medical-professional stock portraits, face-cropped squares); swap URLs only when real client photos land.
- Two decorative square divider images (dog photography, `picsum.photos` fixed IDs 237/1025) render between the three cards: thin centered strips (`5vw` wide × 60% of row height) on desktop, full-width short strips (`h-24`) when cards stack on mobile. Decorative only (`aria-hidden`, empty `alt`).
- Header-to-grid spacing grows (`mt-12`) so the overflowing avatars keep ~80px breathing room below the subhead; each card reserves its overflow space internally (`pt-12` wrapper + `h-8` content spacer).

## Capabilities

### New Capabilities
- None — all behavior extends the existing testimonials section; no new spec.

### Modified Capabilities
- `testimonials-section`: content model gains per-entry `avatar`; card composition gains half-overflow avatar; responsive layout gains divider slots, 5-track desktop grid, and revised header/grid spacing.

## Impact

- Touched: `src/data/testimonials.ts`, `src/components/molecules/TestimonialCard.astro`, `src/components/organisms/Testimonials.astro`, `docs/component-dependencies.md`.
- No new dependencies, no API changes, no store/island changes; section stays fully static.
- New external hotlinks (3× Unsplash avatars, 2× Picsum dividers) consistent with the project's placeholder-art pattern; local-asset migration is a future swap with no markup change.
