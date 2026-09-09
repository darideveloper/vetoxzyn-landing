## MODIFIED Requirements

### Requirement: Dependency and config baseline
The system SHALL provide the React-islands + Tailwind v4 + SSG baseline: pinned deps, astro config with site/sitemap/react/tailwind/inlineStylesheets/PORT-aware server with `strictPort: true` on both `server` and `vite.server`, `@/*` TS aliases with `jsx: react-jsx` and `jsxImportSource: react`, and default static output (no explicit `output` key, no SSR adapter). `site` SHALL resolve `process.env.PORTLESS_URL ?? process.env.SITE_URL` with fallback `https://vetoxzyncomercial.mx` (prod-safe fallback; dev never reaches it since Portless always injects `PORTLESS_URL`).

#### Scenario: Fresh install builds static output
- **WHEN** a developer runs `pnpm install && pnpm build`
- **THEN** the build succeeds with `react()` and `sitemap()` integrations active, Tailwind v4 styles applied via `src/styles/global.css`, `@/` imports resolving, and `dist/` containing static HTML with no SSR adapter required

#### Scenario: Dev server honors Portless PORT
- **WHEN** `PORT=47xx pnpm astro dev` runs (injected by Portless)
- **THEN** Astro listens on the injected port, falling back to `4321` when `PORT` is unset

### Requirement: Portless dev workflow
The system SHALL support named-URL local dev via `portless run` with project name `vetoxzyn`: `dev` script SHALL be `portless run pnpm astro dev` (never a hardcoded app name), so the main checkout serves `https://vetoxzyn.localhost` and each worktree serves `https://<branch>.vetoxzyn.localhost` automatically.

#### Scenario: Named URL dev start
- **WHEN** a developer runs `pnpm run dev`
- **THEN** Portless serves the site at `https://vetoxzyn.localhost` with auto-HTTPS, proxying to the ephemeral Astro port, and `SITE_URL` in `.env` matches that URL

#### Scenario: Worktree gets its own URL with no extra config
- **WHEN** a second checkout (worktree on another branch) runs `pnpm run dev`
- **THEN** Portless serves it at `https://<branch>.vetoxzyn.localhost` alongside the main checkout with no port juggling and no URL collision

### Requirement: Tailwind v4 theming entry
The system SHALL expose styling through `src/styles/global.css` using `@import "tailwindcss"` (+ `tw-animate-css`) and an `@theme inline` token block, imported once from `Layout.astro`.

#### Scenario: Theme token available
- **WHEN** a component uses a brand token class (e.g. font-sans)
- **THEN** the built CSS includes the token values with no per-component stylesheet imports
