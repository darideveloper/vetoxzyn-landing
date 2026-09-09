## 1. Width-token collision fix (hero + products + form)

- [x] 1.1 Confirm root cause: `max-w-md` compiles to `max-width:24px` (Stitch `--spacing-md` shadows container scale); verify `--container-*` restore is ineffective in Tailwind 4.3.3 and revert it.
- [x] 1.2 Replace `max-w-md` → `max-w-[28rem]` in `Hero.astro` (visual card), `Products.astro` (header copy + both HUD cards), `max-w-sm` → `max-w-[24rem]` (both panel subheads), `max-w-lg` → `max-w-[32rem]` (`ContactForm.tsx`).
- [x] 1.3 Add spacing-scale warning comment in `src/styles/global.css` (never use bare `max-w-xs/sm/md/lg/xl`).
- [x] 1.4 `pnpm run build` clean; dist CSS contains 24/28/32rem and no shadowed rule on shipped markup; hero card measures ~448×560 with image filling it.

## 2. Pill–card separation (tablet and up)

- [x] 2.1 Add `sm:ml-md` to Tópico `.hud-panel` and `sm:mr-md` to Instalaciones `.hud-panel-dark` (`Products.astro`).
- [x] 2.2 Verify at 768px: ~22px horizontal gap both panels, no horizontal overflow.

## 3. Pill bottom-anchoring

- [x] 3.1 Move both pill wrappers from article-centered (`top-1/2 -translate-y-1/2` on `article`) to `bottom-lg` inside the padded content column (`Products.astro`).
- [x] 3.2 Verify at 768px: pill top below title, pill bottom ~24px under card bottom edge, gap intact; screenshot sign-off at 390/768/1280px.
