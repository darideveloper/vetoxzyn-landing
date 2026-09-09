## Context

The repo follows `docs/astro-worktrees.md` (Git Worktrees + Portless) and `docs/astro-portless.md`, but the implementation drifted from both: `package.json` pins `portless vetoxzyn` (hardcoded app name), and the site origin uses a client-exposed `PUBLIC_SITE_URL` instead of the spec chain `PORTLESS_URL → SITE_URL → fallback`. Portless 0.10.3 (installed globally) supports `portless run` with worktree-prefix URLs. Worktrees in this project are manual siblings (`../vetoxzyn-<branch>`, same terminal session) following the `enredarte-landing` reference (`enredarte-fix-header-responsive` live sibling: real `node_modules/`, hand-copied divergent `.env`, no plugin hooks). The opencode-worktree plugin is installed globally but SHALL NOT be used here: `worktree_create` always forks a session plus opens a new terminal and always nests under `<base>/<project-hash>/<branch>`, so it can produce neither the same-terminal nor the sibling-folder requirement; `.opencode/worktree.jsonc` (plugin-only config) is therefore deleted. Verified: `vetoxzyn-feature-testimonials` sibling worktree exists (same-folder layout), `openspec/changes/archive/` is committed (not ignored) while active changes are ignored, and every reader of `BUSINESS_DATA.url` is server-rendered `.astro` frontmatter (`BaseSEO.astro`, `Footer.astro`).

## Goals / Non-Goals

**Goals:**
- `pnpm run dev` yields a per-checkout URL with zero per-worktree configuration.
- Canonicals, OG tags, JSON-LD, sitemap, and `Astro.site` print the checkout's own URL in dev and the prod domain in builds.
- Agent sessions stay in the same terminal on manual siblings (`../vetoxzyn-<branch>`) with a real `pnpm install` — no new terminal, no central store, no symlinks.
- All spec-chain deviations are decided once, here.

**Non-Goals:**
- Cleaning the current dirty tree on `main` (owner does this manually before implementation).
- Changing `docs/*.md` except the worktree exception note (`docs/astro-worktrees.md` appendix) and the new `AGENTS.md` worktree section.
- Human sibling-directory worktree flow (this change makes it the only flow).
- Touching active openspec proposals or archiving anything.

## Decisions

### 1. `portless run` over hardcoded app name
`dev` becomes `portless run pnpm astro dev`. Portless infers the base name (`package.json` `name` → git root → dir basename) and prepends the branch subdomain inside worktrees. Alternative — keep `portless vetoxzyn` and pass `--name` per worktree — rejected: manual, error-prone, and exactly the collision the docs forbid.

### 2. Single server-read origin chain over client `PUBLIC_` var
Both `astro.config.mjs` (`site`) and `BUSINESS_DATA.url` read `process.env.PORTLESS_URL ?? process.env.SITE_URL ?? "https://vetoxzyncomercial.mx"`. `PORTLESS_URL` first so a stale `SITE_URL` copied via `.env` can never shadow the live checkout URL. Alternative — keep `import.meta.env.PUBLIC_SITE_URL` and override it per worktree `.env` — rejected: per-worktree manual edits fight auto-derive, and client bundles cannot see the injected `PORTLESS_URL` anyway. Safe because all current `.url` importers are `.astro` server frontmatter; a code comment records the rule that future client islands receive the origin via props.

### 3. Prod-domain fallback at the end of the chain
The chain ends at the prod domain (`https://vetoxzyncomercial.mx`), not `.localhost`: dev never reaches the fallback (portless always injects `PORTLESS_URL`), so the fallback only matters for builds — where shipping `localhost` into sitemap/canonicals would be a silent prod defect. `docs/astro-worktrees.md`, `docs/astro-portless.md`, and `docs/astro-site-config.md` document this chain; the code comment in `astro.config.mjs` records it.

### 4. Real `pnpm install` per sibling over symlinked `node_modules`
No `worktree.jsonc`, no `symlinkDirs`, no install guard. Each sibling runs a real `pnpm install` — this matches the live reference (`enredarte-fix-header-responsive` has a real directory, not a symlink) and removes the whole symlink class of bugs (pnpm non-TTY abort, absolute-path snapshot risk, `sharp` native-reuse across trees). Cost: minutes per sibling on first boot; accepted.

### 5. Manual archive-only openspec sharing over hooks or full sync
No `postCreate`/`preDelete` exist in this flow, so nothing crosses automatically. When archive context is needed, the operator copies it explicitly by hand (`cp -rn` of `openspec/changes/archive/`, either direction). Active proposals never move on their own (isolation: one branch = one proposal). Full-sync rejected (sibling proposals leak); auto-sync rejected (no mechanism for it without the plugin).

### 6. Manual deletion ordering over snapshot commits
Nothing auto-commits here. Order is: stop the dev server in that checkout (Ctrl+C) → `git worktree remove ../vetoxzyn-<branch>` → `git worktree prune`. There is no `git add -A` snapshot, so no machine-local path can leak into history; review-before-delete and squash-on-merge still apply.

### 7. Dockerfile `SITE_URL` rename with BREAKING flag
`ARG/ENV PUBLIC_SITE_URL` → `ARG/ENV SITE_URL`, build-arg carries the prod domain. Server-only name matches the chain semantics. External CI passing the old name breaks loudly (missing-arg build emits prod fallback — safe output, but must be updated).

## Risks / Trade-offs

- [Risk] Stale sibling left after merge clutters `git worktree list` → Mitigation: trial asserts remove + prune + clean list; DoD keeps the check.
- [Risk] Operator forgets stop-before-remove, leaving an orphaned route → Mitigation: deletion order is a spec requirement; proxy 404 with live direct port means restart the server in a persistent terminal.
- [Risk] External CI/deploy scripts referencing `PUBLIC_SITE_URL` outside this repo → Mitigation: tasks include a verification step (`rg` in-repo is clean; owner confirms external refs); failure mode is safe (prod fallback) not broken output.
- [Risk] Branch names with `/` get sanitized in the subdomain → Mitigation: `portless list` is the URL source of truth after first run (documented in spec).

## Migration Plan

1. Owner cleans the dirty tree on `main` (manual, out of scope).
2. Apply config edits (`package.json`, `astro.config.mjs`, `site-config.ts`, `.env.example`, `env.d.ts`, `Dockerfile`) + unstage and delete `.opencode/worktree.jsonc` + add `AGENTS.md` worktree section + update `docs/astro-worktrees.md` (checklist, bootstrap, exception note), `docs/astro-portless.md` (agent subsection), `docs/astro-site-config.md` (chain), `docs/astro-docker-deployment.md` (`SITE_URL` build-arg).
3. Trial cycle in the same terminal: `git worktree add ../vetoxzyn-smoke -b worktree-smoke main` → `cp .env` + real `pnpm install` → assert `portless list` branch-subdomain URL, canonical/`og:url`, prod-domain build → stop dev → `git worktree remove ../vetoxzyn-smoke` → `git worktree prune` → assert clean `git worktree list` with no new terminal and no snapshot commit → delete smoke branch.
4. Rollback: revert the single commit; worktrees created before/after are plain git worktrees and unaffected. No data migration involved.
