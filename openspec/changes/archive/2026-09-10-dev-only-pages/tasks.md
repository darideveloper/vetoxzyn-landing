## 1. Integration

- [x] 1.1 Create `src/integrations/dev-only-pages.ts` exporting `devOnlyPages()` (default dir `src/dev-pages`; node:fs scan, `*.astro` minus `_*`, `injectRoute` only on `command === 'dev'`, `addWatchFile`)
- [x] 1.2 Register `devOnlyPages()` in `astro.config.mjs` integrations array

## 2. Page move

- [x] 2.1 Move `src/pages/design-system.astro` → `src/dev-pages/design-system.astro` (no content rewrite; keep `./_demos` relative import)
- [x] 2.2 Move `src/pages/_demos.tsx` → `src/dev-pages/_demos.tsx` (stays underscore helper, never a route)
- [x] 2.3 Verify no remaining references to `src/pages/design-system` or `src/pages/_demos` (`rg` imports)

## 3. Verification

- [x] 3.1 Dev check: `pnpm run dev` serves `/design-system` with Layout, island hydration, and isolated demo store
- [x] 3.2 Prod check: `pnpm build` emits no `dist/design-system/`, `sitemap-index.xml` lists prod routes only
- [x] 3.3 Confirm prod 404 semantics (no dev HTML served) and `robots.txt` unchanged (`Allow: /` + sitemap URL)

## 4. Living docs

- [x] 4.1 Update `docs/component-dependencies.md` per-page trees for the move (design-system tree points at `src/dev-pages/`, `src/pages/` listing drops both files)
