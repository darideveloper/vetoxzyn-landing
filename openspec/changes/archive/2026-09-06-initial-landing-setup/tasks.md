## 1. Foundation (deps, config, styles, portless)

- [x] 1.1 Add deps (`@astrojs/react @tailwindcss/vite react react-dom tailwindcss tw-animate-css zustand zod`, `@astrojs/sitemap sharp`) + dev `@types/react{,-dom}`; set `packageManager pnpm@10.x`, `engines node>=22`; verify `pnpm install` + lockfile commit
- [x] 1.2 Configure `astro.config.mjs` (site URL, `react()`, `sitemap()`, tailwind vite plugin, `inlineStylesheets:"always"`, `server.port` from `process.env.PORT ?? 4321` with `strictPort:true`, no explicit `output` key); extend `tsconfig.json` with `@/*` alias + `jsx:react-jsx` + `jsxImportSource:react`
- [x] 1.3 Create `src/styles/global.css` (tailwind v4 imports + `@theme inline` tokens) and import once from Layout; create `src/lib/utils.ts` (`cn`)
- [x] 1.4 Wire Portless: `dev` script → `portless vetoxzyn pnpm astro dev`, `.env` with server-only `SITE_URL=https://vetoxzyn.localhost`, `env.d.ts` with `ImportMetaEnv` pattern only (zero concrete `PUBLIC_*` vars); verify `pnpm run dev` serves named URL

## 2. Data layer (site-config, consts)

- [x] 2.1 Create `src/data/site-config.ts` (PHONES, EMAIL, ADDRESS, SOCIAL_LINKS, GOOGLE_MAPS, BUSINESS_HOURS, BUSINESS_DATA with `as const`) populated with real business data
- [x] 2.2 Create `src/consts.ts` (SITE_TITLE, SITE_DESCRIPTION); verify Header/Footer/Layout/BaseSEO import from data layer with zero hardcoded business strings

## 3. SEO + Layout shell + routes

- [x] 3.1 Create simplified `BaseSEO.astro` (prop→const resolution, tagline, canonical from BUSINESS_DATA.url+pathname, OG/Twitter en_US, LocalBusiness JSON-LD, noindex off-prod) + thin `PageSEO.astro`
- [x] 3.2 Create `Layout.astro` (`<slot name="seo"/>`, favicons, ClientRouter, Header/main/Footer shell, global.css import); add `src/pages/robots.txt.ts` + `public/` favicon/og set
- [x] 3.3 Build SSG routes: `index.astro` landing skeleton, small content pages, `404.astro` with primary-section links; every page wraps Layout + PageSEO with exactly one H1, unskipped heading order, and `aria-label`s on icon-only controls; images via `astro:assets Image` (AVIF, widths+sizes, eager hero / lazy rest); verify `pnpm build` emits sitemap + robots + no 404s on assets

## 4. Store + vanilla islands + stub submit

- [x] 4.1 Create `src/store/contact.ts` (contactSchema name/email/message, field map, setField/validateAll/reset, persist `vetoxzyn-contact-storage` with partialize) + `src/store/useField.ts` (mounted gate, initialState fallback, dotted paths)
- [x] 4.2 Create vanilla atoms `Input.tsx`, `Textarea.tsx`, `Button.tsx` (injectable `useField`, acyclic imports, Tailwind + error slots; conventions: `export function`, `import * as React`, no semicolons, double quotes, no `"use client"`, `@/` aliases); create `ContactForm.tsx` molecule (client-side `onSubmit`+`preventDefault`, validateAll → isSubmitted stub → reset, never native form navigation)
- [x] 4.3 Mount `<ContactForm client:load />` on landing; verify keystroke errors, reload persistence, invalid-submit blocks, valid-submit shows success

## 5. Fetch scaffold + static deployment + validation

- [x] 5.1 Scaffold `src/lib/api/client.ts` (FetchError, 30s timeout, retry network/timeout ×2 capped backoff) + `types.ts` + `constants.ts`; verify no raw `fetch()` in codebase, no endpoint modules yet
- [x] 5.2 Create non-PWA `Dockerfile` (copy `package.json` + `pnpm-lock.yaml` + `pnpm-workspace.yaml` before frozen install; zero `ARG/ENV` pairs — none exist yet), `nginx.conf` (gzip, security headers, `/_astro` immutable, HTML no-cache, try_files 404), `.dockerignore`; verify `docker build -t vetoxzyn:latest .` + `docker run -p 8080:80` serves `dist/`
- [x] 5.3 Final validation: `pnpm build` clean, sitemap/robots/JSON-LD/Image spot-check, contact island flows, then create `docs/component-dependencies.md` from `rg "^import" src`, `rg --files src/components|src/pages` per `docs/component-dependencies-guide.md` (per-page trees + shared shell + leaf layer + orphan notes)
