## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

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
