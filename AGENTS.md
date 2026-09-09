## Development

Canonical dev start (Astro foreground under `portless run` — this is what serves the `.localhost` URL):

```bash
pnpm run dev
```

Never `--background` there — it orphans the proxy route. `astro dev --background` + `astro dev stop` / `status` / `logs` are reserved for direct non-portless runs (no `.localhost` URL). Servers are started manually — agents never autostart them (see `docs/astro-portless.md` § "Running under AI agents").

## Git worktrees

One checkout per branch, all runnable at once. `pnpm run dev` uses `portless run`, so each checkout gets its own URL automatically: main → `https://vetoxzyn.localhost`, a worktree on branch `<branch>` → `https://<branch>.vetoxzyn.localhost`.

This project uses **manual siblings only, in the same terminal session**. Never use the `worktree_create` / `worktree_delete` plugin tools here (they open a new terminal and nest under the central store). Never nest a worktree inside the main checkout.

```bash
/mnt/hd/develop/astro/
  vetoxzyn/              # main checkout
  vetoxzyn-<branch>/     # sibling worktree (e.g. vetoxzyn-feature-auth)
```

Lifecycle:

```bash
git fetch origin
git worktree add ../vetoxzyn-<branch> <branch>                  # existing branch
git worktree add ../vetoxzyn-feature -b feature/xyz main        # new branch
git worktree list
# ... after merge, stop dev first (Ctrl+C), then:
git worktree remove ../vetoxzyn-<branch>
git worktree prune
```

Bootstrap each new sibling (gitignored paths are per-checkout — `node_modules/`, `.env`, `.astro/`, `dist/` don't transfer):

```bash
cd ../vetoxzyn-<branch>
cp ../vetoxzyn/.env .env
pnpm install
pnpm run dev   # → https://<branch>.vetoxzyn.localhost
```

Gotchas:

- Real `pnpm install` per sibling (no `node_modules` symlink).
- A fresh `.env` copy keeps main's `SITE_URL` — harmless, the `PORTLESS_URL → SITE_URL → prod` chain resolves each checkout's own URL first.
- Openspec: nothing crosses automatically. Copy `openspec/changes/archive/` by hand (`cp -rn`) only when needed; active proposals stay isolated. New siblings also need `.opencode/skills/openspec-*` + `commands/opsx-*.md` synced by hand (markdown only); archive back to main before merge (only `archive/` is tracked).
- New siblings start from committed `HEAD` only — commit or stash uncommitted changes first.
- Branch names with `/` get sanitized in the subdomain — check `portless list` after first run.
- One dev server per checkout; review before deleting; squash on merge.

## Project docs conventions

- All design docs live in `docs/*.md`.
- `[[name]]` means `docs/name.md` in this repo. Resolve locally, never web-search it.
- If a referenced doc does not exist, skip it. Do not invent it.
- `docs/astro.md` is the hub overview.

## Atomic Component Hierarchy (mandatory, vanilla-only)

This project is locked to **Vanilla only** (approach 1 in `docs/astro-atomic-components.md`).
MUST read `docs/astro-atomic-components.md` before any create/edit in
`src/components/**`, `src/pages/**`, or `src/layouts/**`.

- Structure: `src/components/{atoms,molecules,organisms}/`. No `src/components/ui/`.
- Tiers can be `.astro` or `.tsx` (e.g. React islands), but tier rules still apply.
- No `Validated*` wrapper tier. Atoms are self-contained: Tailwind + Zustand via injectable `useField`, consumed directly.
- Import rules (vanilla):
  - `atoms/*` → `atoms/*`, `store/*`, `lib/*`
  - `molecules/*` → `atoms/*`, `store/*`, `lib/*`
  - `organisms/*` → `molecules/*`, `atoms/*`, `store/*`, `lib/*`
- Atom-to-atom imports must stay acyclic.
- Never scaffold `ui/` or `Validated*`. When in doubt, stop and ask instead of guessing.

## Component Dependency Map (mandatory living doc)

Living reference: `docs/component-dependencies.md` (project override — not repo root).
Skeleton: `docs/component-dependencies-template.md`.
Method: `docs/component-dependencies-guide.md`.

This is part of Definition of Done. After ANY add, remove, rename, or import-change in
`src/pages/**`, `src/components/**`, `src/layouts/**`, `src/data/**`, `src/store/**`, or
`src/lib/**`, update `docs/component-dependencies.md` before finishing the task:

1. Re-run (never from memory):
   ```bash
   rg "^import" src --glob "*.{astro,ts,tsx,jsx}"
   rg --files src/components | sort
   rg --files src/pages | sort
   ```
2. Walk each page top-down to leaves (`lib/`, `data/`, styles) and redraw the affected `Per-page trees`.
3. Update `Pages layer`, `Shared shell (Layout)`, `Shared leaf layer` if affected.
4. Update `Notes`: decisions, tradeoffs, and list components unreachable from any page as orphan/cleanup candidates.

## On-demand docs index (reference, not mandatory)

Before a task touching a domain, read the corresponding existing doc:

| Task | Read first |
|---|---|
| React island / interactive widget | `docs/astro-react-islands.md` |
| Zustand / persist / Zod state | `docs/astro-zustand-zod.md` |
| SEO / meta / JSON-LD / sitemap | `docs/astro-seo.md` |
| Business data / prices / content | `docs/astro-site-config.md` |
| API calls | `docs/astro-fetch-wrapper.md` |
| Dockerfile / pnpm / nginx deploy | `docs/astro-docker-deployment.md` |
| `<ClientRouter />` page transitions | `docs/astro-client-side-page-transitions.md` |
| Portless dev / `.localhost` URLs | `docs/astro-portless.md` |

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
