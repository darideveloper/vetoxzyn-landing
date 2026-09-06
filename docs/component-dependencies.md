# Component Dependency Map

Living reference of how pages compose components (and subcomponents) in this project.
Vanilla-only project (see `docs/astro-atomic-components.md`, approach 1). No `ui/`, no `Validated*` tier.

> **Keep this in sync.** Whenever pages or components are added, removed, renamed, or
> their imports change, regenerate the diagram below and update the Notes section.
> Re-run `rg "^import" src --glob "*.{astro,ts,tsx,jsx}"` to list imports, then redraw.
> Method: `docs/component-dependencies-guide.md`. Skeleton: `docs/component-dependencies-template.md`.

## Pages layer

File-based routing. Single route.

```
src/pages/
├── index.astro        ← renders <Layout><Welcome /></Layout>, static (no getStaticPaths, no COMPONENT_MAP)
```

## Full dependency diagram

```
┌────────────────┐
│ index.astro    │
└───────┬────────┘
        ▼
┌─────────────────────────┐
│     Layout.astro        │
│  inline <style> only    │
│  <slot/> = page content │
└───────┬─────────────────┘
        ▼ (slot content)
┌─────────────────────────┐
│   Welcome.astro         │
│   assets/astro.svg      │
│   assets/background.svg │
│   scoped <style> only   │
└─────────────────────────┘
```

## Per-page trees

### index.astro tree

```
index.astro
├── Layout.astro ────► no component imports (leaf: inline <style>, /favicon.svg, /favicon.ico)
└── Welcome.astro (inside <Layout> slot)
    ├── assets/astro.svg (leaf)
    └── assets/background.svg (leaf)
```

Verified with:
```bash
rg "^import" src --glob "*.{astro,ts,tsx,jsx}"
rg --files src/components | sort
rg --files src/pages | sort
```
Result (2026-09-06):
- `src/pages/index.astro`: imports `Welcome`, `Layout`
- `src/components/Welcome.astro`: imports `assets/astro.svg`, `assets/background.svg`

## Shared shell (Layout)

```
Layout.astro
├── /favicon.svg, /favicon.ico (static links in <head>)
├── inline <style> (html, body reset)
├── <slot/> = page content
└── (no Header/Footer yet, no styles/global.css yet)
```

## Optional chains

None present yet. Add subsections here only when introduced:

- SEO chain: absent (no `BaseSEO.astro`, no `data/site-config.ts` yet — see `docs/astro-seo.md` when added).
- Islands (React/Vue/Svelte): absent (no `client:*` directives — see `docs/astro-react-islands.md` when added).
- Design-system / showcase page: absent.
- i18n: absent (single-language, no catch-all route).

## Shared leaf layer

Terminal dependencies currently in use:

- `src/assets/astro.svg` — static image imported by `Welcome.astro`
- `src/assets/background.svg` — static image imported by `Welcome.astro`

Not yet present (add here when created):

- `lib/utils.ts`, `lib/api/…`, `data/site-config.ts`, `consts.ts`, `styles/global.css`, `store/…`

## Notes

- **Decision (2026-09-06):** project locked to vanilla self-bound atoms. No `src/components/ui/`, no `Validated*` tier. See `AGENTS.md`.
- **Tech debt:** `src/components/Welcome.astro` is a starter-kit flat component. It does not live in `atoms/`, `molecules/`, or `organisms/`. Migrate or delete on the first real page task, then redraw this map.
- **Orphaned / not reachable from any page:** none — `Welcome.astro` is reachable from `index.astro`. No dead components.
- **Routing:** file-based. No catch-all `[...path]`, no content collections, no API routes (`*.ts` in `src/pages/`).

## Related

- `docs/component-dependencies-guide.md`
- `docs/component-dependencies-template.md`
- `docs/astro-atomic-components.md`
- `docs/astro-react-islands.md`
- `docs/astro-site-config.md`
- `docs/astro-seo.md`
