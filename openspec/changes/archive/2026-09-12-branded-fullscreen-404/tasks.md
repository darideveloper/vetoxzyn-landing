## 1. Flex-shell (Layout)

- [x] 1.1 Set `body class="flex min-h-dvh flex-col"` and `main class="flex flex-1 flex-col"` in `src/layouts/Layout.astro` (keep `.page-bg`, Header/main/Footer order, `ClientRouter` untouched).
- [x] 1.2 Smoke-check `/`, `/about`, `/contact` still top-aligned with footer at/below viewport bottom (tall content grows normally).

## 2. Branded 404 page

- [x] 2.1 Rewrite `src/pages/404.astro`: `Layout lang="es"`, Spanish `PageSEO` title/description, section `flex flex-1 items-center justify-center` + `aria-labelledby`, centered inner block.
- [x] 2.2 Compose content reusing atoms/molecules only: aria-hidden `404` numeral (`text-massive` + token gradient `bg-gradient-to-br from-brand-pink to-primary` + `bg-clip-text text-transparent` — longhand `background-image` so the text clip survives the cascade), `SectionHeader align="center" level="h1"` (Spanish Eyebrow + `h1` + subtitle), primary `Button href="/"` ("Volver al inicio") + secondary `Button href="/contact"` ("Contacto"), `NavLink` sitemap row relabeled to Spanish ("Inicio" / "Nosotros" / "Contacto"); every visible string Spanish, zero English; token utilities only, no new CSS/components.
- [x] 2.3 Verify a11y/motion: exactly one `h1`, unskipped order, focus-visible ring on CTAs/links, `motion-safe:` on decorative motion (reduced-motion parity via base layer).
- [x] 2.4 Append Spanish-first language rule to `AGENTS.md` (new mandatory `## Language` section: user-visible copy in Spanish; code/docs/specs in English).

## 3. Verification + docs

- [x] 3.1 Run `pnpm run check:palette` (must report clean) and `pnpm run build` (green, `404.html` emitted, no asset 404s).
- [x] 3.2 Redraw `docs/component-dependencies.md` 404 tree (`rg "^import" src`, `rg --files src/components|src/pages`) and record flex-shell decision in Notes.
