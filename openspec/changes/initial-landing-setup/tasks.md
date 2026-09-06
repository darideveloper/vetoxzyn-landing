## 1. Foundation (deps, config, styles, portless)

- [ ] 1.1 Add deps (`@astrojs/react @tailwindcss/vite react react-dom tailwindcss tw-animate-css zustand zod`, `@astrojs/sitemap sharp`) + dev `@types/react{,-dom}`; set `packageManager pnpm@10.x`, `engines node>=22`; verify `pnpm install` + lockfile commit
- [ ] 1.2 Configure `astro.config.mjs` (site URL, `react()`, `sitemap()`, tailwind vite plugin, `inlineStylesheets:"always"`, `server.port` from `process.env.PORT ?? 4321`); extend `tsconfig.json` with `@/*` alias + `jsx:react-jsx`
- [ ] 1.3 Create `src/styles/global.css` (tailwind v4 imports + `@theme inline` tokens) and import once from Layout; create `src/lib/utils.ts` (`cn`)
- [ ] 1.4 Wire Portless: `dev` script → `portless vetoxzyn pnpm astro dev`, `.env` with `SITE_URL=https://vetoxzyn.localhost`, `env.d.ts` typing `PUBLIC_SITE_URL`; verify `pnpm run dev` serves named URL

## 2. Data layer (site-config, consts)

- [ ] 2.1 Create `src/data/site-config.ts` (PHONES, EMAIL, ADDRESS, SOCIAL_LINKS, GOOGLE_MAPS, BUSINESS_HOURS, BUSINESS_DATA with `as const`) populated with real business data
- [ ] 2.2 Create `src/consts.ts` (SITE_TITLE, SITE_DESCRIPTION); verify Header/Footer/Layout/BaseSEO import from data layer with zero hardcoded business strings

## 3. SEO + Layout shell + routes

- [ ] 3.1 Create simplified `BaseSEO.astro` (prop→const resolution, tagline, canonical from BUSINESS_DATA.url+pathname, OG/Twitter en_US, LocalBusiness JSON-LD, noindex off-prod) + thin `PageSEO.astro`
- [ ] 3.2 Create `Layout.astro` (`<slot name="seo"/>`, favicons, ClientRouter, Header/main/Footer shell, global.css import); add `src/pages/robots.txt.ts` + `public/` favicon/og set
- [ ] 3.3 Build SSG routes: `index.astro` landing skeleton, small content pages, `404.astro` with primary-section links; every page wraps Layout + PageSEO; verify `pnpm build` emits sitemap + robots + no 404s on assets

## 4. Store + vanilla islands + stub submit

- [ ] 4.1 Create `src/store/contact.ts` (contactSchema name/email/message, field map, setField/validateAll/reset, persist `vetoxzyn-contact-storage` with partialize) + `src/store/useField.ts` (mounted gate, initialState fallback, dotted paths)
- [ ] 4.2 Create vanilla atoms `Input.tsx`, `Textarea.tsx`, `Button.tsx` (injectable `useField`, acyclic imports, Tailwind + error slots); create `ContactForm.tsx` molecule (validateAll submit → isSubmitted stub → reset)
- [ ] 4.3 Mount `<ContactForm client:load />` on landing; verify keystroke errors, reload persistence, invalid-submit blocks, valid-submit shows success

## 5. Fetch scaffold + static deployment + validation

- [ ] 5.1 Scaffold `src/lib/api/client.ts` (FetchError, 30s timeout, retry network/timeout ×2 capped backoff) + `types.ts` + `constants.ts`; verify no raw `fetch()` in codebase, no endpoint modules yet
- [ ] 5.2 Create non-PWA `Dockerfile` (ARG/ENV per PUBLIC_*), `nginx.conf` (gzip, security headers, `/_astro` immutable, HTML no-cache, try_files 404), `.dockerignore`; verify `docker build --build-arg PUBLIC_SITE_URL=…` + `docker run -p 8080:80` serves `dist/`
- [ ] 5.3 Final validation: `pnpm build` clean, sitemap/robots/JSON-LD spot-check, contact island flows, `rg "^import" src` + component/page file lists reviewed for future `docs/component-dependencies.md` sync
