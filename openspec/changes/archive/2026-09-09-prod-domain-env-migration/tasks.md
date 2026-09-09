## 1. Env contract

- [x] 1.1 Add `readonly PUBLIC_SITE_URL: string` to `ImportMetaEnv` in `env.d.ts`
- [x] 1.2 Replace `.env` content with `PUBLIC_SITE_URL=https://vetoxzyn.localhost` (drop bare `SITE_URL`)

## 2. Prod host + email migration

- [x] 2.1 In `src/data/site-config.ts`, set `EMAIL` to `info@vetoxzyncomercial.mx` / `mailto:info@vetoxzyncomercial.mx` and `BUSINESS_DATA.url` to `import.meta.env.PUBLIC_SITE_URL ?? "https://vetoxzyncomercial.mx"`
- [x] 2.2 In `astro.config.mjs`, load `PUBLIC_SITE_URL` via Node 22 `process.loadEnvFile('.env')` (stdlib; CLI `process.env` wins over `.env` — Vite `loadEnv` rejected: `vite` is not a direct dep and pnpm won't resolve it) with fallback `site: … ?? 'https://vetoxzyncomercial.mx'`, and update the production-domain comment
- [x] 2.3 In `Dockerfile`, add the `ARG PUBLIC_SITE_URL` / `ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL` pair per `docs/astro-docker-deployment.md`

## 3. Verification

- [x] 3.1 Grep proves zero stale `vetoxzyn.mx` (excluding `vetoxzyncomercial.mx` and `openspec/changes/archive/**`): `rg "vetoxzyn\.mx" astro.config.mjs env.d.ts Dockerfile .env src`
- [x] 3.2 `pnpm build` (no env) emits prod host in `dist/index.html` canonical + JSON-LD, `dist/sitemap-index.xml`, `dist/robots.txt`; `PUBLIC_SITE_URL=https://vetoxzyn.localhost pnpm build` emits localhost in canonicals AND sitemap/robots (config and SEO agree in both builds)
- [x] 3.3 `docker build --build-arg PUBLIC_SITE_URL=https://vetoxzyncomercial.mx -t vetoxzyn:latest .` + `docker run` serves the new host with no 404s on favicon/og assets (verified on port 8081; 8080 was occupied)
