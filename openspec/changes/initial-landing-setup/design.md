## Context

Greenfield: `vetoxzyn` is Astro 7 basics with empty config and `src/{assets,components,layouts,pages}`. Target is a single-language static landing (home + few small pages + 404), SSG, one contact form, no backend yet. Governing docs live in `docs/` (`astro-react-islands`, `astro-atomic-components`, `astro-zustand-zod`, `astro-seo`, `astro-site-config`, `astro-portless`, `astro-docker-deployment`, `astro-fetch-wrapper`, `astro-client-side-page-transitions`). User decisions from explore: vanilla atoms only, single language, stub API submit, home + small pages + 404.

## Goals / Non-Goals

**Goals:**
- Minimal SSG foundation that satisfies every applicable doc rule with zero unused scaffolding.
- Contact form fully validated client-side (Zod) and persisted (Zustand+localStorage) so wiring a real endpoint later is a one-file addition.
- Single-language SEO correct by default (canonical, OG/Twitter, LocalBusiness JSON-LD, sitemap, robots, noindex off-prod).
- Reproducible dev (`https://vetoxzyn.localhost`) and prod (Docker+nginx static) workflows.

**Non-Goals:**
- No i18n system, no hreflang, no `LOCALE_MAP`, no `LangLink`, no `routes.ts` / `getLocalizedPath` (single language).
- No blog SEO chain (`BlogSEO`, `BlogPostSEO`), no RSS, no GTM/GA4 wiring (no IDs provided).
- No `ui/` primitives, no `Validated*` tier, no shadcn/Radix (vanilla decision is exclusive per atomic-components doc).
- No API endpoint modules, no SSR/hybrid output, no PWA (service worker, manifest, offline page).
- No GSAP/animation system, no content collections, no auth/session store.

## Decisions

**1. Vanilla self-bound atoms over UI library.**
`Input`/`Textarea`/`Button` bind `useField()` directly via injectable `useField` prop (default `src/store/useField.ts`). Alternative (shadcn `ui/` + `Validated*` wrappers) rejected: one form does not justify the dependency + wrapper tier, and docs forbid mixing both approaches in one project.

**2. Single Zustand `contact` store, not generic `form.ts` yet.**
Schema: `contactSchema = z.object({ name: min(1), email: email, message: min(10) })`. `buildFieldSchemaMap([contactSchema])` keeps the unique-field-name enforcement so future schemas compose without rework. `persist` name `vetoxzyn-contact-storage`, `partialize` strips `errors/isSubmitted/isLoading`. Alternative (multi-schema `FormValues` union now) rejected as speculative — YAGNI.

**3. Simplified single-lang `BaseSEO` (no i18n branches).**
Props: `currentPage, title?, description?, jsonType="LocalBusiness", extraJson={}, ogImage?`. Resolution: prop → `SITE_TITLE`/`SITE_DESCRIPTION` consts (no i18n lookup). Canonical: `${BUSINESS_DATA.url}${Astro.url.pathname}`. OG locale hardcoded `en_US`, `og:type` mapped from `jsonType`. `useTagLine` kept (appends `| BUSINESS_DATA.name` off-home). hreflang/alternate block deleted. Alternative (full i18n-capable BaseSEO) rejected: dead branches for a single-language site.

**4. Keep `<ClientRouter />` with default fallback.**
Multi-page site (home + small pages) gets SPA-like nav for free; no `transition:*` directives, no `astro:page-load` re-init logic needed (no carousels/maps/GSAP). Single-landing argument for skipping rejected because user confirmed multiple pages + 404. Zustand `persist` stores survive swaps (same JS runtime) — contact draft persists across page nav, which is desired.

**5. Scaffold `safeFetch` now, use later.**
`src/lib/api/client.ts` (FetchError network/timeout/http/parse/abort, retry transient only with capped exponential backoff, `AbortSignal.timeout` default 30s) + `types.ts` + `constants.ts` ship without endpoint callers. Submit handler today: `validateAll()` → set `isSubmitted` → `reset()` after success display. When API lands, add `src/lib/api/contact.ts` only. Alternative (skip fetch wrapper entirely) rejected: doc mandates all calls through `safeFetch`, scaffolding now is ~1 file and prevents a raw-`fetch` habit.

**6. Non-PWA nginx + static output.**
`output` stays default `static`. nginx: gzip, security headers, `/_astro/*` immutable 1y, HTML `no-cache`, `try_files $uri $uri/index.html =404`. PWA blocks (offline error_page, sw no-cache, manifest) deleted per doc instructions. `PUBLIC_*` inlined at build → passed as Docker `ARG/ENV` pairs (only `PUBLIC_SITE_URL` initially, extensible).

**7. Portless named `vetoxzyn`.**
`dev` script: `portless vetoxzyn pnpm astro dev`; `astro.config.mjs` reads `process.env.PORT ?? 4321`; `.env` holds `SITE_URL=https://vetoxzyn.localhost` (dev canonical base). Global `portless` install, not a dependency.

## Risks / Trade-offs

- [Risk] Placeholder business data (domain, phone, address, og-image) ships into SEO/JSON-LD → Mitigation: tasks mark `site-config.ts` population as blocking; build succeeds but canonical/JSON-LD wrong until real data lands.
- [Risk] `persist` keeps stale contact drafts across deploys → Mitigation: versioned storage key (`vetoxzyn-contact-storage`); `reset()` on successful submit.
- [Risk] React island ships JS on a mostly-static page → Mitigation: single `client:load` island scoped to the form only; all other content stays pure Astro HTML; `client:visible` considered but form is above-fold CTA so `load` is correct.
- [Risk] Future API shape unknown; Zod schema may drift from backend → Mitigation: Zod schema is the contract; endpoint module validates against same field names; `validateAll()` runs pre-submit so backend mismatch surfaces as field errors.
- [Trade-off] No `transition:persist` / per-element transitions: nav cross-fade default only; acceptable for content pages with no media continuity needs.
