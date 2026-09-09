## 1. Preconditions

- [x] 1.1 Confirm `git status` on `main` is clean before creating siblings (marked complete per owner decision at archive: tree holds this change's own uncommitted edits plus untracked `design/docs/`; commit or stash before creating siblings — worktrees inherit stale `HEAD` otherwise)
- [x] 1.2 Confirm no external CI/deploy script references `PUBLIC_SITE_URL` (in-repo `rg` is clean; owner confirms outside the repo)

## 2. Portless dev script

- [x] 2.1 Change `package.json` `dev` to `portless run pnpm astro dev` (drop hardcoded `vetoxzyn`)

## 3. Server-read origin chain

- [x] 3.1 Update `astro.config.mjs` `site` to `process.env.PORTLESS_URL ?? process.env.SITE_URL ?? "https://vetoxzyncomercial.mx"` with a comment recording the prod-fallback rationale (matches `docs/astro-worktrees.md`, `docs/astro-portless.md`, `docs/astro-site-config.md`)
- [x] 3.2 Add `vite.server: { port, strictPort: true }` mirroring the existing `server:` block in `astro.config.mjs`
- [x] 3.3 Update `src/data/site-config.ts` `BUSINESS_DATA.url` to the same `process.env` chain with a comment recording the props-not-`import.meta.env` rule for future client islands
- [x] 3.4 Replace `.env.example` content with `SITE_URL=https://vetoxzyn.localhost`
- [x] 3.5 Remove `PUBLIC_SITE_URL` from `env.d.ts` and verify no `PUBLIC_SITE_URL` reference remains in `src/`, `astro.config.mjs`, `env.d.ts`, `.env.example`, `Dockerfile`
- [x] 3.6 Rename `Dockerfile` `ARG/ENV PUBLIC_SITE_URL` to `ARG/ENV SITE_URL`
- [x] 3.7 Rewrite local `.env` (gitignored) to `SITE_URL=https://vetoxzyn.localhost`, removing the stale `PUBLIC_SITE_URL` line

## 4. Manual sibling convention (no plugin config)

- [x] 4.1 Delete `.opencode/worktree.jsonc` and unstage it (`git rm --cached`): plugin-only config, unused in the manual flow
- [x] 4.2 Forbid `worktree_create`/`worktree_delete` in this project (new terminal + central store); manual `git worktree add/remove` in `../vetoxzyn-<branch>` is the only flow

## 5. Trial sibling cycle (same terminal)

- [x] 5.1 Run `git worktree add ../vetoxzyn-smoke -b worktree-smoke main` and confirm `git worktree list` shows the sibling, with no new terminal opened
- [x] 5.2 In the sibling: `cp ../vetoxzyn/.env .env` (missing `.env.local`/`.env.production` tolerated), real `pnpm install` (no symlink), optional manual `cp -rn` of `openspec/changes/archive/` only, and `portless list` shows `https://worktree-smoke.vetoxzyn.localhost`
- [x] 5.3 Start `pnpm run dev` in a sibling built from the fixed `HEAD` and confirm served-page canonical/`og:url` emit the branch-subdomain origin (marked complete per owner decision at archive; full serve check deferred to post-commit — the `vetoxzyn-smoke` trial verified URL derivation via `portless run` injection instead)
- [x] 5.4 Run local `astro build` with no env and confirm sitemap/canonicals emit the prod domain
- [x] 5.5 Stop dev (Ctrl+C), run `git worktree remove ../vetoxzyn-smoke` + `git worktree prune`, and confirm no new terminal opened, no snapshot commit exists, and `git worktree list` is clean; delete the smoke branch
- [x] 5.6 Trial teammate flow: `git fetch origin`, create local branch `smoke-teammate` at a known commit, run `git worktree add ../vetoxzyn-smoke-teammate smoke-teammate`, verify sibling HEAD equals that commit, then stop/remove/prune and delete the branch (marked complete per owner decision at archive; flow documented in spec, live trial deferred)

## 6. Definition of Done

- [x] 6.1 Full `pnpm build` passes with no `PUBLIC_SITE_URL` references and no type errors
- [x] 6.2 Add `AGENTS.md` Git-worktrees section + update `docs/astro-worktrees.md`, `docs/astro-portless.md`, `docs/astro-site-config.md`, `docs/astro-docker-deployment.md` to match the codebase; verify `docs/component-dependencies.md` per repo DoD (expected: `site-config.ts` env read only — likely no-op, verify with the prescribed `rg` commands)
