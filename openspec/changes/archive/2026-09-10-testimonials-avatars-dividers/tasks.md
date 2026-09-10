## 1. Content model

- [x] 1.1 Add `avatar` URL per entry in `src/data/testimonials.ts` (gender-matched Unsplash medical-professional portraits, `fit=crop&crop=faces&w=192&h=192&q=80`) and verify each URL returns HTTP 200 `image/jpeg`
- [x] 1.2 Confirm `Testimonial` type flows the new field with no type edits (derived from `as const` array)

## 2. Card avatars

- [x] 2.1 Destructure `avatar` in `src/components/molecules/TestimonialCard.astro` and render the circular `img` (`absolute -top-12 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg`, `width=96 height=96 loading=lazy`, `alt="Foto de {name}"`)
- [x] 2.2 Wrap card in `relative pt-12` div, flip `Card` to `overflow-visible`, add `rounded-l-xl` to accent bar and `h-8` content spacer above the quote icon

## 3. Dividers and spacing

- [x] 3.1 Add `DIVIDERS` const in `src/components/organisms/Testimonials.astro` (Picsum fixed IDs 237/1025, 600×600, verified HTTP 200) and interleave divider cells via map + fragment (`i < length - 1`)
- [x] 3.2 Switch grid to `mt-12 grid grid-cols-1 gap-gutter md:grid-cols-[1fr_5vw_1fr_5vw_1fr]`; divider slot `h-24 w-full overflow-hidden rounded-xl md:h-[60%] md:self-center` with `aria-hidden`, empty `alt`, `object-cover` img
- [x] 3.3 Pass `avatar` through to each `TestimonialCard`

## 4. Verification and docs

- [x] 4.1 Run `pnpm run build` (5 pages, sitemap) and confirm avatar + divider URLs present in `dist/index.html`
- [x] 4.2 Update `docs/component-dependencies.md` (TestimonialCard line, Testimonials organism line, `data/testimonials.ts` leaf line, per-page tree) with zero import changes
