## 1. Identity source of truth

- [x] 1.1 Align `src/data/site-config.ts` to the aviso identity (GRUPO HOCLIVA SAS, Minatitlán address, `grupohocliva@gmail.com`, `922 223 1006` with `tel:`/`wa` shapes, `legalName`), keeping the server-only URL chain and `https://vetoxzyncomercial.mx` fallback
- [x] 1.2 Sweep `src/`, `astro.config.mjs`, `env.d.ts`, `.env`, `.env.example`, `Dockerfile` for stale `info@vetoxzyncomercial.mx` / `4615747483` / `123 Main St` strings

## 2. New legal pages

- [x] 2.1 Add `src/data/cookies-policy.md` (necessary + Fonts active / Meta+GA as planned; opt-out, contact, date; Spanish; template-grade, no counsel review)
- [x] 2.2 Add `src/data/terms.md` (light channel-use template: purpose, acceptable use, IP, liability + professional-criterion referral, contact, changes, date; Spanish)
- [x] 2.3 Add `src/pages/politica-de-cookies.astro` mirroring `aviso-de-privacidad.astro` (`Layout lang="es"`, `PageSEO currentPage="cookies"`, `Markdown`, `max-w-4xl`)
- [x] 2.4 Add `src/pages/terminos.astro` with the same pattern (`PageSEO currentPage="terms"`)

> `src/data/privacy-notice.md` (`/aviso-de-privacidad`) is client-provided and frozen — no task touches it.

## 3. Footer links

- [x] 3.1 Convert `Contacto`/`Canal comercial` spans to `NavLink href="/contact"` and add `Política de Cookies`/`Términos` `NavLink`s in `FooterMeta.astro`, reusing the `·` separator row (no new CSS)
- [x] 3.2 Render the company line as the first footer `NavLink` (`PHONES.main.wa`, `target="_blank" rel="noopener"`, display `PHONES.main.formatted`)
- [x] 3.3 Refine footer responsive composition (`impeccable`): centered mobile stack → `sm` row, grouped `·` separators, `py-1` targets, semibold phone, Montserrat wordmark, page container, token border — same copy/links, no motion

## 4. Form consent gate

- [x] 4.1 Add `aceptaAviso` (`z.literal(true)`-style, Spanish message) to `store/contact.ts`, exclude from persist `partialize`, default `false` in `initialState`/`reset()`
- [x] 4.2 Widen `Checkbox` `label` to `React.ReactNode` (backwards compatible) and render the consent checkbox with inline aviso/cookie links in `ContactForm.tsx`, keeping the payload allow-list unchanged

## 5. Verification and docs

- [x] 5.1 Run `pnpm run check:palette` (clean) and `astro build` (green)
- [x] 5.2 Manually verify footer navigation from `/`, `/about`, `/contact`, `/aviso-de-privacidad`, both new pages; blocked-submit and consented-submit flows; 360px footer wrap
- [x] 5.3 Update `docs/component-dependencies.md` per the living-doc method (import re-run, per-page trees, orphans)
