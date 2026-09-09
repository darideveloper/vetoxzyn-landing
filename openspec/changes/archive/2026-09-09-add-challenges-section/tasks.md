## 1. Asset pipeline

- [x] 1.1 Download Stitch `aida-public` image from `design/stitch/02-challanges/code.html` to `/tmp`, inspect native width, convert to WebP (`cwebp`/`ffmpeg`/`python-pil`), save as `src/assets/challenges/challenges-clinica-<native>.webp` (e.g. `-512` if native ≥512, else native width — never upscale); if the link is dead, stop and report rather than hotlinking
- [x] 1.2 Verify no `googleusercontent`/`lh3` string remains referenced by the new section (`rg "googleusercontent" src`)

## 2. Organism

- [x] 2.1 Create `src/components/organisms/Challenges.astro` (static, no `client:` directive): `section#desafios` with `aria-labelledby`, `lg:grid-cols-12` (7+5, `lg:-ml-16` overlap), left white card (`Eyebrow` + H2 + sub + 3-row data array) and right floating media card (`tilt-float` hover lift, gradient overlay; static `-rotate-3` dropped after live-measured badge clip, offsets `-ml-6`/`-mr-6`)
- [x] 2.2 Wire atoms-as-is: `Icon circle orange lg` (`shield`, `water_drop`, `eco`), `Badge tag dark` (CLINICAL GRADE) + `Badge tag light icon="verified"` (99.9% PURE); map Stitch colors to existing `global.css` tokens only (zero `global.css` diff)
- [x] 2.3 Render image via `astro:assets Image` (`loading="lazy"`, `decoding="async"`, responsive `widths`/`sizes`, ES alt, no upscaling); keep H2/H4 order, single page H1 untouched

## 3. Page wiring

- [x] 3.1 Mount `<Challenges />` in `src/pages/index.astro` directly after `<Hero />`
- [x] 3.2 Verify `pnpm run build` passes and `/` shows Hero → Challenges order with `section#desafios` present

## 4. Docs + verification

- [x] 4.1 Update `docs/component-dependencies.md`: `index.astro` tree, organism catalogue (`Challenges.astro` + atom sub-tree), notes (Icon `lg` correction, placeholder image, hero hrefs still dead); re-run all three per AGENTS.md: `rg "^import" src --glob "*.{astro,ts,tsx,jsx}"`, `rg --files src/components | sort`, `rg --files src/pages | sort`
- [x] 4.2 Correct `docs/atoms-page-global-components.md` 02-challanges Icon entry (`md` → `lg`) so code/docs agree
- [x] 4.3 Visual + a11y pass at 390/768/1280px: no horizontal overflow, badges inside viewport, heading order, alt announced, `prefers-reduced-motion` disables tilt
