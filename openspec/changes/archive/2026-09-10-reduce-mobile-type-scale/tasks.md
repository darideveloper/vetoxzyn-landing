## 1. Mobile scale block in global.css

- [x] 1.1 Append unlayered `@media (max-width: 767px)` block at end of `src/styles/global.css` with heading overrides (`text-display-lg-mobile` → 25.6px, `text-xl` → 16px)
- [x] 1.2 Add body/small-text/icon overrides to the same block (`text-body-lg` → 16.2px, `text-body-md` → 14.4px, `text-caption` → 10.8px, `text-label-bold` → 12.6px, `text-xs`/`text-sm`/`text-base`/`text-lg`, `text-2xl`/`text-3xl`/`text-4xl`, `text-[16px]`)

## 2. Build verification

- [x] 2.1 Run `pnpm run build` and confirm it completes with no errors
- [x] 2.2 Confirm compiled CSS contains all 14 mobile overrides and desktop tokens are intact (`md:text-display-lg` 64px, `text-body-lg` 18px)
- [x] 2.3 Eyeball check on real device (~390px smaller type, 768px/1280px identical to before)
