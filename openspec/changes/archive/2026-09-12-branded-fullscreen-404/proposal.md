## Why

The project ships a functionally correct `404.astro` (true nginx 404, Layout + PageSEO + sitemap nav) but it is visually bare: English unstyled `h1`, top-aligned short section, footer floating mid-viewport on a near-empty page. For a brand-driven landing (Stitch hero language, token palette, Spanish copy) the dead-end page should feel intentional and guide users back.

## What Changes

- Redesign `src/pages/404.astro` reusing existing atoms/molecules only: `SectionHeader` (centered, `level="h1"`, Eyebrow E2), aria-hidden giant `404` numeral (`text-massive` + token gradient `bg-gradient-to-br from-brand-pink to-primary` + `bg-clip-text` — longhand `background-image`, not the `background` shorthand, so the text clip survives the cascade), Spanish subtitle, primary `Button` (`/` "Volver al inicio") + secondary `Button` (`/contact` "Contacto"), `NavLink` sitemap row with Spanish labels ("Inicio", "Nosotros", "Contacto").
- ALL user-visible strings on the 404 page SHALL be Spanish (eyebrow, `h1`, subtitle, both CTAs, sitemap labels, `PageSEO` title/description); the decorative `404` numeral is `aria-hidden` (not read as text).
- Adopt Alternative A fullscreen shell: `Layout` body becomes `flex min-h-dvh flex-col`, `main` becomes `flex flex-1 flex-col`, 404 section becomes `flex flex-1 items-center justify-center` so content centers in exactly `100dvh − header − footer` with footer pinned to the viewport bottom on short pages.
- Set `Layout lang="es"` + Spanish `PageSEO` title/description on the 404 page; single `h1`, `aria-labelledby`, no new CSS / no new components / no new dependencies.
- Add a small Spanish-first language rule to `AGENTS.md` (mandatory): all user-visible website copy SHALL be written in Spanish; code identifiers, docs, and specs stay in English. This is what let the English 404 stub ship unnoticed — no language rule exists today.
- Verify `pnpm run check:palette` clean + `astro build` green + redraw `docs/component-dependencies.md` 404 tree.

## Capabilities

### New Capabilities

- None — no new capability; this restyles an existing route with existing atoms.

### Modified Capabilities

- `static-deployment`: the 404 route requirement gains branded Spanish content + fullscreen-centering behavior, and the shared `Layout` gains the flex-shell (`min-h-dvh` column, `main flex-1`) contract.

## Impact

- Touched: `src/layouts/Layout.astro` (2 class attrs), `src/pages/404.astro` (rewrite, all strings Spanish), `AGENTS.md` (Spanish-first language rule), `docs/component-dependencies.md` (404 tree redraw).
- No API, Docker, nginx, or routing changes; no new deps; Hero (`min-h-[90vh]`) and tall pages unaffected — only short pages gain sticky-footer behavior.
- Risk: Layout class change is global — mitigated by build + visual check of `/`, `/about`, `/contact`, `/404`.
