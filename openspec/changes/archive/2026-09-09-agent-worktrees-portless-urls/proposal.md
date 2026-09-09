## Why

Every checkout beyond `main` starts URL-broken: the repo's hardcoded `portless vetoxzyn` dev script plus `PUBLIC_SITE_URL`-based origin make all checkouts fight over one URL. Fixing this once gives every sibling worktree (`../vetoxzyn-<branch>`, created and worked in the same terminal session — no new terminal, no plugin central store) its own per-checkout URL with zero extra config.

## What Changes

- `dev` script switches to `portless run pnpm astro dev` so each checkout (main or worktree) gets its own `.localhost` URL automatically.
- Site origin converges to one server-read chain `PORTLESS_URL → SITE_URL → prod fallback` in `astro.config.mjs` (`site`) and `src/data/site-config.ts` (`BUSINESS_DATA.url`); `PUBLIC_SITE_URL` is removed from `.env.example`, `env.d.ts`, `Dockerfile`, and code.
- `astro.config.mjs` gains `vite.server.strictPort` mirroring `server.strictPort`.
- New sibling-worktree convention (same terminal, same folder): `git worktree add ../vetoxzyn-<branch>`, bootstrap with `cp ../vetoxzyn/.env .env` + real `pnpm install` (no symlink), per-worktree URL comes free from the `portless run` chain. `worktree_create`/`worktree_delete` are forbidden here (they always open a new terminal and use the central store). No `.opencode/worktree.jsonc` ships.
- `Dockerfile` build-arg renamed `PUBLIC_SITE_URL` → `SITE_URL` (prod domain passed at build).
- **BREAKING**: any external CI/deploy script passing `PUBLIC_SITE_URL` as a build-arg or env var must switch to `SITE_URL`.

## Capabilities

### New Capabilities
- `agent-worktrees`: sibling worktree convention contract — `../vetoxzyn-<branch>` layout, same-session manual lifecycle, real-install bootstrap, manual archive-only openspec sharing.

### Modified Capabilities
- `site-config-data`: `BUSINESS_DATA.url` resolution changes from `import.meta.env.PUBLIC_SITE_URL` to server-read `PORTLESS_URL → SITE_URL → prod` chain; typed-env pattern drops `PUBLIC_SITE_URL`.
- `seo-basics`: canonical/`og:url`/JSON-LD origin becomes per-checkout dynamic in dev (branch-subdomain URL), prod domain in builds.
- `static-deployment`: Dockerfile build-arg renamed to `SITE_URL`; sitemap/robots/canonical expectations follow the new chain.
- `project-foundation`: dev workflow changes from hardcoded `portless vetoxzyn` to `portless run` with worktree-prefix URLs.

## Impact

- Affected files: `package.json`, `astro.config.mjs`, `src/data/site-config.ts`, `.env.example`, `env.d.ts`, `Dockerfile`, `AGENTS.md`, `docs/astro-worktrees.md`, `docs/astro-portless.md`, `docs/astro-site-config.md`, `docs/astro-docker-deployment.md`. Deleted: `.opencode/worktree.jsonc` (unstaged, removed).
- Systems: Portless dev URLs (all checkouts), Astro sitemap/canonicals, Docker image builds, manual sibling worktree sessions.
- Dependencies: none added. Requires global `portless` (already installed, 0.10.3). The opencode-worktree plugin stays installed globally but is not used by this project.
- Untouched by this change: current uncommitted work on `main` (user cleans manually), active openspec proposals.
