## 1. Module-gated reveal swap

- [x] 1.1 Gate the `no-js` → `js` swap in `src/layouts/Layout.astro` on `"noModule" in document.createElement("script")` so module-less browsers keep `no-js` and render static content
- [x] 1.2 Verify in prod HTML that the swap script still runs synchronously in `<head>` and modern browsers get `class="js"` with zero console errors

## 2. Fail-open storage

- [x] 2.1 Wrap the `sessionStorage` once-per-session check in `src/components/organisms/Hero.astro` in try/catch (fail-open = replay entrance, never throw inside the matchMedia callback)
- [x] 2.2 Give zustand `persist` in `src/store/contact.ts` an explicit `createJSONStorage` with a safe wrapper (try/catch + in-memory fallback) so blocked storage degrades to unpersisted form state
- [x] 2.3 Simulate throwing storage (block `sessionStorage`/`localStorage` via Playwright) and confirm hero reveals, sections reveal, and the contact island hydrates

## 3. Reduced-motion reveal guards

- [x] 3.1 In `Challenges.astro`, `Testimonials.astro`, `Products.astro`, `ContactSection.astro` reduce branches: reveal immediately when the section is already in viewport at init, else one-shot on-enter
- [x] 3.2 Scroll through every section in a modern browser (including reduced-motion emulation) and confirm each reveals exactly once with no stuck-hidden content

## 4. Regression verification and Done

- [x] 4.1 Run the module-blocked regression (Playwright route-block `/_astro/*.js`): assert 0 hidden `.js-reveal` nodes and a readable H1
- [x] 4.2 Confirm modern-browser load is unchanged (full animated reveals, 0 console errors)
- [x] 4.3 Run `pnpm run check:palette` clean, `astro build` green, and update `docs/component-dependencies.md` if any import changed
