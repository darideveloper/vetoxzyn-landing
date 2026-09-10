## Context

`src/pages/design-system.astro` is a living atom showcase that ships to production today: it builds to `dist/design-system/`, is listed in `sitemap-index.xml` (bare `sitemap()` integration, no `filter`), and gets full SEO treatment (canonical + `LocalBusiness` JSON-LD via `PageSEO`). `src/pages/_demos.tsx` is its page-local React island (underscore prefix = never a route, isolated `useState` store, never touches `store/contact`).

Project constraints: `output` static default (no SSR adapter), nginx serves `dist/` with `try_files $uri $uri/index.html =404`, Docker `COPY . .` + `pnpm build`, portless dev per worktree, zero-new-dependency posture (`loadEnvFile` over deps, single `ARG/ENV` pair by design), and the living `docs/component-dependencies.md` (Definition of Done). Astro maintainer guidance for exactly this problem (dev-only internal docs): custom integration + `injectRoute` when `command === "dev"`. The community `astro-dev-only-routes` plugin proves the pattern but adds `globby`/`kleur`/`slash` deps, has a known `index.astro` collision bug, and is 8★ unmaintained.

## Goals / Non-Goals

**Goals:**
- Dev-only routes work in `astro dev` (per-checkout portless URLs, HMR) as normal `.astro` pages (Layout, SEO slot, React islands, `@/*` aliases).
- Prod builds contain zero trace: no HTML in `dist/`, true nginx 404, sitemap clean with no per-page filter list.
- Adding page N+1 is a file drop with zero config; the system ports to the next Astro project by copying one file.
- No new runtime/build dependencies.

**Non-Goals:**
- Nested dev routing (`/dev/foo/bar`) — flat mapping only until asked.
- `ALLOW_DEV_PAGES=1` build override — YAGNI unless previewing the showcase from a prod-like build is needed.
- Auth wall in dev — dev server is already local.
- `about.astro` placeholder content — separate problem, explicitly out of scope.
- SSR/middleware/redirect guards — inapplicable to static + nginx.

## Decisions

### D1: `src/dev-pages/` folder outside `src/pages/` (over `__`-prefix inside `src/pages/`)
Files under `src/pages/` ARE prod routes by definition; keeping dev pages there requires un-building, un-listing, un-indexing each one. A folder the file router never sees cannot leak by forgetting a prefix. Mapping stays clean (`design-system.astro` → `/design-system`, no `__` stripping). Helpers co-locate (`_demos.tsx` moves with its page, `./_demos` import unchanged). Alternative (community plugin's `__secret.astro` in `src/pages/`) rejected: same `injectRoute` core but leak-prone prefix discipline + ugly URLs.

### D2: Local `devOnlyPages()` integration (over `astro-dev-only-routes` dependency)
`astro:config:setup` provides `command` + `injectRoute` + `addWatchFile` natively. A ~30-line integration using `node:fs.readdirSync` (flat, `*.astro`, skip `_*`) covers this repo's needs with no new deps, no collision bug surface, and full control of logging. External plugin rejected: unmaintained, extra deps violate repo posture, known `index` bug.

### D3: Gate on `command === 'dev'` (over frontmatter `return 404` / middleware / sitemap-filter-only)
Frontmatter `if (!import.meta.env.DEV) return new Response(null, {status: 404})` is a runtime status — in static output the file is still emitted and nginx serves it as 200. Middleware needs an SSR server that doesn't exist here. Sitemap `filter` + `noindex` is soft-hide (URL still 200 if guessed). `command === 'dev'` injection means prod builds never emit the route at all: true 404, sitemap clean automatically, nothing to noindex. `preview`/`sync` inject nothing so preview behaves like prod.

### D4: Flat, minimal contract (over configurable glob/nesting)
Only top-level `*.astro` map to `/<basename>`; `_*` and non-astro files are helpers. No recursion, no dynamic `[slug]` support, no config options beyond `dir`. Rationale: current need is 1 page + N future debug pages; nesting/options are speculative complexity. If nesting is ever needed, folder → URL prefix is the reserved extension path.

## Risks / Trade-offs

- [Risk] Prod chrome links a dev-only URL → dead link in prod (nginx 404) → Mitigation: dev pages stay unlinked from `PrimaryNav`/Footer/404 sitemap nav; note the rule in `docs/component-dependencies.md`.
- [Risk] `astro sync` type surface differs for injected vs file routes → Mitigation: `tsconfig.json` already includes `**/*`, editors resolve `src/dev-pages/` normally; verify `astro check`-equivalent (`pnpm build`) passes.
- [Risk] New dev file requires dev-server restart to register (if `addWatchFile` misses it) → Mitigation: `addWatchFile(dir)` + document restart fallback; HMR for edits within registered pages works natively.
- [Risk] Someone runs `pnpm build` locally to preview and expects dev pages → Mitigation: by design `build`/`preview` exclude them; dev pages are verified via `pnpm run dev` only.
- [Trade-off] Injected routes bypass file-router conventions (no automatic `404` handling, no content collections) → Acceptable: dev pages are hand-written `.astro` showcases, not collections-driven content.
