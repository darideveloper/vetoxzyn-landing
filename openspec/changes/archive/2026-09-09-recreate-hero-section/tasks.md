## 1. Local hero image (download → WebP → repo)

- [x] 1.1 Extract Stitch source URL(s) from `design/stitch/01-hero-layout/code.html` (and `01-hero-bullet-list` if art differs) and download original(s) to `/tmp/opencode/hero-src/` (curl, keep original filename + note dimensions).
- [x] 1.2 Create `src/assets/hero/` with a short `README.md` (source URL, origin = Stitch placeholder, original dimensions, conversion command + quality used, license status = replace with brand art).
- [x] 1.3 Convert to WebP (native 512 + 384 — source is only 512px, no upscaling; see `src/assets/hero/README.md`)
- [x] 1.4 Confirm no `googleusercontent` reference remains planned (grep `design/stitch` URL out of future hero code path).

## 2. Theme tokens + fonts

- [x] 2.1 Port hero-needed Stitch tokens from `01-hero-layout/code.html` tailwind config into `src/styles/global.css` `@theme`: brand-pink/orange, surface-ice/on-surface(-variant), secondary-fixed, primary-fixed-dim, glass-border, spacing (gutter, margin-mobile/desktop, max-width), fonts (Montserrat/Open Sans) + sizes (display-lg/mobile, body-lg, caption, label-bold).
- [x] 2.2 Add `shadow-ambient`, `glass-panel`, `blob-bg` keyframes, `tilt-float` utilities (from Stitch `<style>`) to global CSS.
- [x] 2.3 Add Google Fonts (Montserrat 600/700 + Open Sans 400/700, `display=swap`)

## 3. Button polymorphic href (global-atoms delta)

- [x] 3.1 Extend `src/components/atoms/Button.tsx` with optional `href?: string`
- [x] 3.2 Render-check `design-system` + `ContactForm` (5 demo buttons + submit still `<button>`, identical classes — verified via dev-server HTML)

## 4. Hero organism (hybrid A2)

- [x] 4.1 Create `src/components/organisms/Hero.astro`
- [x] 4.2 Add vertical bullet rows ×5
- [x] 4.3 Add CTA row (`Button primary/secondary md` anchors; `className` not `class` for React-in-Astro props)
- [x] 4.4 Wire visual (`astro:assets Image`, local WebP widths 384/512, eager, alt + avatar overlay)
- [x] 4.5 Responsive/a11y pass (single H1, blobs aria-hidden, focusable anchors, safe-vocab copy verified in build output; viewport visual in 6.1)

## 5. Page embed + living docs

- [x] 5.1 Embed `<Hero />` in `src/pages/index.astro`
- [x] 5.2 Update `docs/component-dependencies.md`

## 6. Verify

- [x] 6.1 `pnpm build` clean (5 pages, images optimized, sitemap emitted); dev-server HTML verified (hero, responsive classes, no hotlink). Pixel-vs-`screen.png` at 390/768/1280 not done — no browser tool in this session; classes are Stitch-verbatim.
- [x] 6.2 Keyboard/assistive pass (single H1, blobs aria-hidden, native-anchor CTAs focusable, image alt verified in served HTML)
