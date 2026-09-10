## Why

`src/pages/design-system.astro` is a dev showcase that currently builds to prod (`/design-system` ships in `dist/`, appears in `sitemap-index.xml`, gets canonical + JSON-LD). The project needs a scalable, reusable way to keep non-public pages (design system, demos, future debug pages) working locally while guaranteeing they never exist in production builds.

## What Changes

- Add `src/dev-pages/` convention: any `*.astro` file there becomes a dev-only route (`design-system.astro` → `/design-system`); `_*`-prefixed files are helpers and never routes.
- Add zero-dependency local integration `devOnlyPages()` that calls Astro's `injectRoute` only when `command === 'dev'` (maintainer-prescribed pattern); on `build`/`preview`/`sync` it injects nothing so `dist/` has no trace.
- Move `src/pages/design-system.astro` → `src/dev-pages/design-system.astro` and `src/pages/_demos.tsx` → `src/dev-pages/_demos.tsx` with no content rewrite (relative import keeps working).
- Prod guarantees: no dev HTML in `dist/` (nginx returns true 404), sitemap clean automatically with no per-page filter list, no `noindex` band-aid needed.
- Update `docs/component-dependencies.md` per-page trees for the move (Definition of Done).

## Capabilities

### New Capabilities

- `dev-only-pages`: convention + integration for dev-only routes that exist in `astro dev` and are absent from prod builds, sitemap, and robots surface.

### Modified Capabilities

- `design-system-showcase`: showcase page moves from `src/pages/` (prod route) to `src/dev-pages/` (dev-only route); "builds to static HTML (5 pages total)" requirement is replaced by dev-only availability.
- `seo-basics`: sitemap/robots requirement narrows to prod routes only — dev-only routes SHALL NOT appear in `sitemap-index.xml`.
- `static-deployment`: static routing requirement narrows — `dist/` SHALL contain only prod routes; dev-only paths resolve to nginx 404.

## Impact

- `astro.config.mjs` (+3 lines: import + integration registration), new `src/integrations/dev-only-pages.ts` (~30 lines, `node:fs` only, no new dependencies).
- Moved files: `src/pages/design-system.astro`, `src/pages/_demos.tsx` → `src/dev-pages/`.
- `docs/component-dependencies.md` living doc update; `about.astro` stub explicitly out of scope.
