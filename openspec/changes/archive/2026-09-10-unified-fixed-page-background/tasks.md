## 1. Global wash foundation

- [x] 1.1 Add `.page-bg` fixed layer styles + `html,body` fallback to `src/styles/global.css` (tokens/`.blob-bg` reused verbatim, existing `prefers-reduced-motion` guard covers it)
- [x] 1.2 Render single `aria-hidden` `.page-bg` div as the first `<body>` child in `src/layouts/Layout.astro` (behind Header, `<main>` slot, and Footer; non-negative z-level per design §5)

## 2. Transparent shells

- [x] 2.1 Remove `bg-surface-ice` from Hero, Challenges, Products shell, ContactSection shell (interior panel fills untouched; Testimonials wash handled in §3)
- [x] 2.2 Verify ProductPanel light/dark tones + Challenges white card still read correctly over the wash

## 3. Testimonials unclipped decorators

- [x] 3.1 Delete `.bg-fluid-shape` div + `<style>` clip-path block from `Testimonials.astro`, keep two blur blobs
- [x] 3.2 Switch Testimonials section to `overflow-x-clip` (+ `overflow-hidden` fallback) and confirm blobs bleed vertically with 0px horizontal overflow

## 4. Contact distinctive overlay

- [x] 4.1 Add section-local tint/blur overlay div inside `ContactSection.astro` above global wash, below `ContactBackdrop` + content
- [x] 4.2 Confirm `ContactBackdrop` blobs + `BIOSEGURIDAD` + glass form/FAQ contrast unchanged over the combined layers

## 5. Verification + docs

- [x] 5.1 Run `pnpm build` clean + headless 0px-overflow check at 390/768/1024/1280/1440 on `/` and `/contact` + reduced-motion pass
- [x] 5.2 Update `docs/component-dependencies.md` per DoD (Layout `.page-bg`, shell class changes, ContactSection overlay — no import changes)
