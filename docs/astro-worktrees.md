---
created: 2026-09-09
updated: 2026-09-09
tags:
  - astro
  - git
  - worktrees
  - portless
  - documentation
type: resource
status: active
---

# Git Worktrees + Portless (Core)

One checkout per branch, all runnable at once. Each checkout gets its own stable `.localhost` URL automatically — no port juggling, no stash/checkout cycles when switching branches.

This is a **core pattern — included in every Astro project**. It builds on [Portless Dev Workflow](./astro-portless.md) and [Base config](./astro-base-config.md).

## Why

Parallel branches (features, per-teammate branches, release lines) share a single checkout by default, forcing `stash` + `checkout` cycles and allowing only one dev server at a time. Git worktrees give every branch its own directory sharing one `.git`, and `portless run` gives every directory its own URL. Combined: `main` and any number of branches run side by side.

## Prerequisites

- git, Node ≥22, pnpm
- Portless installed globally:

```bash
npm install -g portless
```

### Portless integration checklist (per project)

Worktrees only get collision-free URLs if the project derives its dev URL instead of hardcoding it:

1. The `dev` script must use `portless run` — never a hardcoded app name (a hardcoded name makes every checkout fight over one URL):

```json
{
  "scripts": {
    "dev": "portless run pnpm astro dev"
  }
}
```

> This matches the vault canonical ([astro-base-config](./astro-base-config.md) §3). Behind a MITM corporate proxy, prefix with `NODE_OPTIONS=--use-openssl-ca`.

2. `astro.config.mjs` must accept the injected `PORT`, falling back when running outside portless, and derive `site` from the injected URL (both live inside the same `defineConfig`):

```js
export default defineConfig({
  site: process.env.PORTLESS_URL ?? process.env.SITE_URL ?? "https://<project>.localhost",
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
  },
  vite: {
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
      strictPort: true,
    },
  },
})

Resolution chain: `PORTLESS_URL → SITE_URL → <project>.localhost fallback`. The app consumer (`site-config` / SEO canonicals) uses the same order — see [All Config in One Place](./astro-site-config.md).

3. `.env.example` must carry the dev URL plus the backend contract (never commit real values — use placeholders):

```bash
SITE_URL=https://<project>.localhost
API_BASE_URL=https://<backend>.localhost
API_TOKEN=<paste-token-here>
```

Full portless reference → see [Portless Dev Workflow](./astro-portless.md).

## URL Model

`portless run` derives the base name automatically (in order: `package.json` `name` → git repo root → directory basename). Inside a git worktree it prepends the branch as a subdomain:

```
main checkout:                    https://<project>.localhost
worktree on branch <branch>:      https://<branch>.<project>.localhost
```

Portless also injects `PORT`, `HOST`, and `PORTLESS_URL` into each dev server process. `portless list` is the source of truth for which routes are live.

## Layout

Two conventions, same URLs either way. Never nest a worktree inside the main checkout (it confuses watchers and build output).

**Humans — sibling directories:**

```bash
<projects-root>/
  <project>/              # main checkout
  <project>-<branch>/     # worktree (e.g. <project>-feature-auth)
```

**Agent-driven sessions** (opencode-worktree plugin) live under `~/.local/share/opencode/worktree/<project-id>/<branch>/` instead. See the appendix below.

## Lifecycle

```bash
git fetch origin
git worktree add ../<project>-<branch> <branch>        # existing branch
git worktree add ../<project>-feature -b feature/xyz main  # new branch
git worktree list
# ... after merge:
git worktree remove ../<project>-<branch>
git worktree prune
```

Bootstrap each new worktree — gitignored paths are per-checkout and don't transfer:

```bash
cd ../<project>-<branch>
cp ../<project>/.env .env   # or: cp .env.example .env on a fresh clone, then fill values
test -L node_modules || pnpm install
pnpm run dev   # → https://<branch>.<project>.localhost
```

If the project ships `.opencode/worktree.jsonc`, force-add it once (it falls under the `.*/` gitignore):

```bash
git add -f .opencode/worktree.jsonc
```

## What Doesn't Transfer

| Path | Why | Action per worktree |
|---|---|---|
| `node_modules/` | gitignored | `pnpm install` (or symlink, see appendix) |
| `.env` | gitignored (secrets) | copy from main checkout or `.env.example`; keep `API_BASE_URL` on the shared backend unless testing another one |
| `.astro/`, `dist/` | generated | recreated by `dev`/`build` |
| Dotfolders (`.vscode/`, `.opencode/`, …) | gitignored via `.*/` | reconfigure if needed; force-add `worktree.jsonc` |
| Uncommitted changes | worktrees start from committed `HEAD` | commit or stash first, or they won't be there |

> A fresh `.env` copy keeps main's `SITE_URL` — with the auto-derive chain above this is harmless (each checkout resolves its own `PORTLESS_URL` first). Override `SITE_URL` per worktree only if canonicals or redirects must differ explicitly.

## Stopping

Each checkout stops independently with Ctrl+C in its own terminal — the route unregisters when its dev process exits. Consequences worth knowing:

- There is **no per-route stop command**. `portless stop <name>` does not stop anything: portless parses `stop` as an app name and registers a bogus `stop.localhost` route instead. `portless proxy stop` stops the proxy itself.
- Routes live only while the parent `portless run` process lives. A backgrounded/nohup'd server whose parent died leaves an orphaned child and an unregistered route (proxy 404s while the direct port still answers). Keep each server in a persistent terminal or tmux window.
- Deleting a worktree does **not** stop its dev server — stop it first (Ctrl+C), then remove.

## Team Rules

- One dev server per checkout. A second `pnpm run dev` on an already-served URL fails with "already registered by PID…" — that means it's already running; open the URL instead of fighting it.
- Review before deleting. Never delete a worktree with unmerged/unreviewed work.
- Squash on merge, so agent snapshot commits (see appendix) don't pollute history.
- Branch names with `/` get sanitized in the subdomain — check `portless list` for the exact URL after first run.

## Troubleshooting

| Issue | Fix |
|---|---|
| `"…localhost" is already registered by PID …` | That checkout's server is already running — open the URL, or stop that process first |
| Proxy 404 but direct `http://127.0.0.1:<port>/` answers | The `portless run` parent died and the route unregistered — restart the dev server in a persistent terminal |
| `.localhost` doesn't resolve (Safari, Firefox) | Run `portless hosts sync` |
| Port conflict on 443 | Portless falls back to 1355; check `portless status` |
| `command not found: portless` | Run `npm install -g portless` |

## Appendix: opencode-worktree Plugin (Agent Sessions)

The [opencode-worktree](https://github.com/kdcokenny/opencode-worktree) plugin lets agents create and manage their own worktrees via `worktree_create(branch, baseBranch?)` / `worktree_delete(reason)` tools, each opening a fresh OpenCode session (new tmux window when inside tmux).

**Project config** (`.opencode/worktree.jsonc` — force-add, it falls under the `.*/` ignore):

```jsonc
{
  "sync": {
    "copyFiles": [".env"],
    "symlinkDirs": ["node_modules"]
  },
  "hooks": {
    // Skip install when symlinked: pnpm aborts against symlinked
    // modules dirs in non-TTY runs.
    "postCreate": ["test -L node_modules || pnpm install"],
    // Snapshot commits can't include gitignored planning artifacts,
    // and `node_modules/` ignore rules don't match symlinks — so drop
    // the symlink before the plugin's `git add -A` or an absolute
    // machine-local path gets committed to the team branch.
    "preDelete": ["test -L node_modules && rm node_modules || true"]
    // OPTIONAL — only if the project uses openspec: append the MAIN-sync
    // strings to the arrays above (do NOT add second postCreate/preDelete
    // keys — JSON allows only one of each). Post-create:
    //   "MAIN=$(git worktree list --porcelain 2>/dev/null | awk '/^worktree /{print $2; exit}'); [ -n \"$MAIN\" ] && mkdir -p openspec/changes && cp -rn \"$MAIN/openspec/changes/.\" openspec/changes/ || true",
    // Pre-delete (append after the rm string):
    //   "MAIN=$(git worktree list --porcelain 2>/dev/null | awk '/^worktree /{print $2; exit}'); [ -n \"$MAIN\" ] && cp -rn openspec/changes/. \"$MAIN/openspec/changes/\" || true"
  }
}
```

**Proven gotchas:**

- `worktree_delete` auto-commits a local `chore(worktree): session snapshot` (no push) and only completes on session-idle — in headless `opencode run` sessions it silently never fires. Forbid deletion while planning artifacts are unmerged.
- `pnpm install` against a symlinked `node_modules` aborts without a TTY — hence the `test -L` guard above.
- Gitignored planning/proposal directories are invisible to both the new session and the snapshot commit — sync them in `postCreate`/`preDelete` only if the project uses them (see optional block above).

## Connection to Other Patterns

- Portless setup, commands, and env vars → see [Portless Dev Workflow](./astro-portless.md)
- `SITE_URL` consumption (redirects, canonicals) → see [All Config in One Place](./astro-site-config.md)
- Base config (canonical scripts, env truth table) → see [Astro Base Config](./astro-base-config.md)
- Production serving (Docker/nginx, not portless) → see [Dockerized Deployment](./astro-docker-deployment.md)
