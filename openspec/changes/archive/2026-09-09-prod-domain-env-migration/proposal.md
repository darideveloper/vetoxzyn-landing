## Why

Production must serve under `https://vetoxzyncomercial.mx` (plus matching `info@vetoxzyncomercial.mx` contact email), not the placeholder `https://vetoxzyn.mx`. At the same time the site URL is hardcoded in two places today (`astro.config.mjs` `site` + `BUSINESS_DATA.url`), so every future domain move is a hunt-and-replace with dev/prod drift (dev canonicals currently emit the prod host).

## What Changes

- Migrate prod canonical host `https://vetoxzyn.mx` → `https://vetoxzyncomercial.mx` in `astro.config.mjs` (`site` + comment) and `src/data/site-config.ts` (`BUSINESS_DATA.url` fallback).
- Migrate contact email `info@vetoxzyn.mx` → `info@vetoxzyncomercial.mx` in `src/data/site-config.ts` (`EMAIL.address` + `href`).
- Introduce single build-time source `PUBLIC_SITE_URL`: dev reads `https://vetoxzyn.localhost` from `.env`, prod injects `https://vetoxzyncomercial.mx` via Docker `--build-arg`; `site-config.ts` reads it via `import.meta.env` and `astro.config.mjs` via Node 22 `process.loadEnvFile` (CLI env wins), both falling back to the new prod host when unset.
- Add `ARG/ENV PUBLIC_SITE_URL` plumbing to `Dockerfile` + typing in `env.d.ts`.
- No SEO component changes: `BaseSEO.astro`, `PageSEO.astro`, `robots.txt.ts`, and the sitemap integration inherit the new host automatically.

## Capabilities

### New Capabilities

- None — no new user-facing capability; this is a value migration + build-time configuration refactor.

### Modified Capabilities

- `site-config-data`: `BUSINESS_DATA.url` / `EMAIL` values change; single build-time `PUBLIC_SITE_URL` becomes the source with prod fallback; `env.d.ts` gains the typed declaration.
- `static-deployment`: `Dockerfile` gains one `ARG/ENV` pair for `PUBLIC_SITE_URL` plus the build-arg contract (first `PUBLIC_*` var on this repo).

## Impact

- Affected: `astro.config.mjs`, `src/data/site-config.ts`, `env.d.ts`, `.env`, `.env.example` (committed dev-value template), `Dockerfile` (plus `--build-arg` in the docker build command; no CI file exists in-repo). Generated output changes: canonicals, `og:url`/`og:image`, JSON-LD `url`/`@id`/`logo`, `sitemap-index.xml`, `robots.txt` Sitemap line.
- **BREAKING** (SEO): all absolute URLs move to the new host on next deploy — old-host backlinks need a redirect story (out of scope, noted as follow-up).
- Zero import-graph changes → `docs/component-dependencies.md` needs no update.
