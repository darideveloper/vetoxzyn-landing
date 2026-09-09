## Context

Static SSG site (Astro default `static`, no SSR adapter), served by nginx from `dist/`. Prod host is hardcoded twice: `astro.config.mjs` `site: 'https://vetoxzyn.mx'` (drives `Astro.site`, `@astrojs/sitemap`, `robots.txt.ts` Sitemap line) and `src/data/site-config.ts` `BUSINESS_DATA.url` (drives `BaseSEO.astro` canonical, `og:url`, `og:image`, JSON-LD `url`/`@id`/`logo`/`image`). Contact email `info@vetoxzyn.mx` lives in the same file. Dev `.env` holds server-only `SITE_URL=https://vetoxzyn.localhost`, which no SEO code reads — dev builds emit prod canonicals today. `.env` is `.dockerignore`d, so prod never sees it. Active specs pin "zero `PUBLIC_*` vars" (`site-config-data`, `static-deployment`), so introducing one is a spec change, not a silent edit.

## Goals / Non-Goals

**Goals:**
- Single build-time source `PUBLIC_SITE_URL` for the site host across dev (`https://vetoxzyn.localhost`) and prod (`https://vetoxzyncomercial.mx`), with a prod fallback when unset.
- Migrate prod host + contact email to the `vetoxzyncomercial.mx` domain in one change.
- Fix dev/prod canonical drift as a side effect (dev emits localhost canonicals).
- Follow the repo's own documented `PUBLIC_*` + Docker `ARG/ENV` pattern (`docs/astro-docker-deployment.md`, `docs/astro-site-config.md`).

**Non-Goals:**
- Runtime-toggleable domain (impossible on static nginx without `sub_filter` hacks or an SSR adapter — explicitly rejected).
- Email derived from URL via string manipulation (kept as explicit literals for clarity).
- Redirects from old host, DNS, TLS, or search-console moves.
- Any `BaseSEO.astro` / `robots.txt.ts` / sitemap logic change (they inherit).
- Social handles (`facebook.com/vetoxzyn`, `instagram.com/vetoxzyn/`), `design/` mockups, and `openspec/changes/archive/**` history: brand/history strings, not the prod host — left untouched.

## Decisions

- **One NAME, two readers:** `PUBLIC_SITE_URL` read via `import.meta.env` in `site-config.ts` (build-inlined for `.astro`) and via Node 22 stdlib `process.loadEnvFile('.env')` in `astro.config.mjs` (Node context), with CLI-set `process.env` taking precedence over `.env`. Bare `process.env` alone cannot see `.env` values in config files (config is evaluated before `.env` loads — per Astro `guides/environment-variables`), which would split-brain dev builds (canonicals=localhost, sitemap/robots=prod). Implemented with the stdlib instead of Vite's `loadEnv` (same semantics, zero new dependencies — `vite` is not a direct dep and pnpm does not resolve it from the config). Alternative (server-only `SITE_URL` everywhere) rejected: it cannot reach client-bundled SEO output. Alternative (two different var names per context) rejected: one value, one name, fewer mistakes.
- **Fallback = new prod host in both files.** Rationale: a build without env (CI default, fresh clone) must still emit the correct prod SEO, matching today's hardcoded behavior. Alternative (no fallback, fail fast) rejected: breaks `pnpm build` zero-config baseline pinned in `project-foundation` spec.
- **Keep old `SITE_URL`? Drop it.** `.env` switches to `PUBLIC_SITE_URL=https://vetoxzyn.localhost`. No code reader of bare `SITE_URL` exists today (verified by grep); docs references (`astro-portless.md:70`, `astro-site-config.md:139`) go stale by one var name — acceptable, noted as follow-up. Alternative (keep both) rejected: two sources reintroduces the drift this change removes.
- **Dockerfile gains exactly one `ARG/ENV` pair** per the documented pattern; prod value travels as `--build-arg`, never as a committed file. `.dockerignore` already excludes `.env`, so no secret/host leak path is introduced.
- **`env.d.ts` gains `readonly PUBLIC_SITE_URL: string`** (declaration required, not optional) so a missing declaration fails typecheck rather than silently typing as `any`. The *value* may still be unset at build time — the `??` fallbacks in both readers are the runtime guard for that case.

## Risks / Trade-offs

- [Risk] Build without `--build-arg` in some pipeline silently falls back to prod host → staging/branch previews indexed as prod → Mitigation: fallback IS prod by design (safe default); the `BaseSEO.astro:77` `noindex` guard only covers non-`PROD` builds, so any `PROD`-mode preview MUST pass an explicit per-environment `PUBLIC_SITE_URL`; document the build-arg in change tasks + CI command.
- [Risk] `as const` literal-typing weakens if `url` becomes `string` from env → Mitigation: accept `string` for `url` only; keep `as const` elsewhere; SEO code only concatenates strings.
- [Risk] Old-host SEO equity loss (backlinks, indexed URLs) → Mitigation: out of scope by decision, but flagged as follow-up (redirect block / search-console change of address).
- [Risk] `loadEnv` mode / `.env`-vs-shell precedence confusion for future editors → Mitigation: one-line comment at each read site stating which context and why (`import.meta.env` inlined vs `loadEnv` + CLI precedence in config); tasks 3.2 asserts host agreement.
- Trade-off: every domain move still needs a rebuild (static limitation). Accepted — matches SSG + nginx architecture.

## Migration Plan

1. Land code + specs in one change; default (no env) already emits the new prod host.
2. Set `PUBLIC_SITE_URL=https://vetoxzyn.localhost` in local `.env`; verify dev canonicals flip to localhost.
3. Update prod build/CI to pass `--build-arg PUBLIC_SITE_URL=https://vetoxzyncomercial.mx` (external CI/runbook — no CI file exists in-repo; builds without the arg safely fall back to prod); deploy; verify canonical, JSON-LD, sitemap, robots.
4. Rollback: revert the 5 edited files (or rebuild with old `--build-arg`); no data migration involved.

## Follow-ups (decided)

- Update `docs/astro-portless.md:70` template var name in a docs follow-up, to keep this diff to 5 files + specs.
- Old → new host redirect + Search Console move: separate change.
