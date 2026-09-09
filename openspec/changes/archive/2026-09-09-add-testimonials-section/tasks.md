## 1. Content source

- [x] 1.1 Create `src/data/testimonials.ts` as `as const` array with 3 Stitch entries (quote, name, role, accent orange|pink|green) and verify imports resolve.

## 2. Card molecule

- [x] 2.1 Create `src/components/molecules/TestimonialCard.astro` composing unchanged `Card` C1 + accent bar + bare filled `format_quote` Icon + quote + bordered footer, accepting entry + accent props.

## 3. Section organism and wiring

- [x] 3.1 Create `src/components/organisms/Testimonials.astro` with `id="section-3"`, section-owned bg decor (fluid wash + 2 blobs, aria-hidden), centered E2 Eyebrow/H2/subhead header, and grid mapping data to `TestimonialCard`.
- [x] 3.2 Wire `Testimonials` into `src/pages/index.astro` after the placeholder benefits block and before contact (placeholder stays) and verify `/#section-3` scrolls from Hero's secondary CTA.

## 4. Docs and verification

- [x] 4.1 Update `docs/component-dependencies.md` index tree (Testimonials subtree, Card now reachable) via the rg import walk.
- [x] 4.2 Run `pnpm run build` + visual check at 390/768/1280px (stacking, no h-overflow, accent tones, verbatim copy) and keyboard/screen-reader pass (single H1, H2 order, decor ignored).
