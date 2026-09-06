## Why

The `vetoxzyn` repo is a bare Astro 7 basics template (empty config, no React, no styling, no SEO, no deployment). To ship a fast static landing page (home + a few small pages + 404, single language, SSG, contact form only) we need the minimal foundation prescribed by `docs/` — without carrying i18n, blog, PWA, or backend weight that this project does not need yet.

## What Changes

- Add React 19 islands + Tailwind CSS v4 (Vite plugin) + `tw-animate-css`; configure `astro.config.mjs` (site, sitemap, react, inlineStylesheets, PORT-aware server) and `@/*` path aliases.
- Add vanilla-only atomic structure (`atoms/`, `molecules/`, `organisms/` for the Header/Footer layout shell; no `ui/`, no `Validated*` tier) with store-bound `Input`, `Textarea`, `Button` and a `ContactForm` molecule mounted via `client:load`.
- Add single Zustand contact store with Zod field-level validation + `persist` (partialize strips transient state) and injectable `useField` hook with SSR hydration safety; submit path stubs success locally until a real API exists.
- Add centralized data layer: `src/data/site-config.ts` (PHONES, EMAIL, ADDRESS, SOCIAL_LINKS, BUSINESS_DATA), `src/consts.ts` (SITE_TITLE, SITE_DESCRIPTION), typed `env.d.ts` for `PUBLIC_*`.
- Add simplified single-language SEO: `BaseSEO.astro` (title/desc resolution, canonical, OG/Twitter, single LocalBusiness JSON-LD, noindex off-prod) + thin `PageSEO.astro`, `Layout.astro` with `<slot name="seo"/>` + `<ClientRouter/>`, `robots.txt.ts`, `@astrojs/sitemap`, favicon/og set in `public/`.
- Add Portless dev workflow (`portless vetoxzyn pnpm astro dev`, `SITE_URL=https://vetoxzyn.localhost`) and non-PWA Docker deployment (`Dockerfile` pnpm multi-stage + `nginx.conf` static + `.dockerignore`).
- Add SSG pages: `index.astro` (landing), small content pages, `404.astro`; all static HTML except the contact island; rely on Astro default static output (no explicit key, no SSR adapter).
- Scaffold `safeFetch` client (`FetchError`, retry on network/timeout only) + shared api types/constants with NO endpoint modules yet — consumed only when the future contact API lands.

## Capabilities

### New Capabilities
- `project-foundation`: dependencies, astro config, Tailwind global CSS, TS aliases, Portless env, SSG output.
- `site-config-data`: single-source-of-truth business data, consts, typed env.
- `seo-basics`: single-language metadata hierarchy, Layout slot pattern, sitemap/robots/favicons, noindex off-prod.
- `contact-islands`: vanilla atoms, ContactForm molecule, Zustand+Zod store with persist, stub submit.
- `static-deployment`: Dockerized nginx static serving, page routing (home + small pages + 404), ClientRouter shell.

### Modified Capabilities
- None (greenfield; no existing specs in `openspec/specs/`).

## Impact

- `package.json` / `pnpm-lock.yaml`: adds react, tailwind, zustand, zod, sitemap, sharp; `packageManager: pnpm@10.x`, `engines: node>=22`.
- `astro.config.mjs`, `tsconfig.json`, `env.d.ts`, `.env`: config surface changes; server-only `SITE_URL` via `process.env`; no `PUBLIC_*` vars yet (future ones inlined at build and passed as Docker build args).
- `src/`: new `data/`, `store/`, `lib/api/`, `lib/utils.ts`, `styles/`, `components/{atoms,molecules,organisms,seo}/`, `layouts/`, `pages/` structure.
- Dev workflow: `pnpm run dev` now goes through Portless (`https://vetoxzyn.localhost`); prod serves `dist/` via nginx:alpine on port 80, no Node runtime.
