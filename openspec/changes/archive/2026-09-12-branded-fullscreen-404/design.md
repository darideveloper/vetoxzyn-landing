## Context

`src/pages/404.astro` (18 lines) is plumbing-correct: file-router `404.html`, nginx `try_files … =404`, shared `Layout` (Header/main/Footer, `ClientRouter`, `.page-bg` blobs), `PageSEO currentPage="404"`, 3× `NavLink` sitemap. But content is an unstyled English stub (`max-w-5xl py-16`, top-aligned), `Layout lang` defaults to `en`, and `body`/`main` have no flex shell — short pages leave the footer floating mid-viewport.

Brand reference is `Hero.astro`: `SectionHeader` (Eyebrow E2 orange-tint pill + Montserrat display + `on-surface-variant` subtitle) + `HeroActions` (Button primary B2 orange pill + secondary B3 ghost) over `blob-bg` washes. Tokens live in `src/styles/global.css` `@theme inline`; motion contract in `openspec/specs/interaction-feedback/spec.md` (`.lift`/`.link`/`.hover-subtle`, token-timed, reduced-motion gated). Vanilla-only hierarchy (`docs/astro-atomic-components.md`, approach 1): pages may import molecules/atoms/store/lib; no `ui/`, no `Validated*`.

## Goals / Non-Goals

**Goals:**
- Spanish branded 404 reusing existing atoms/molecules only, zero new components/CSS/deps.
- True fullscreen centering in `100dvh − header − footer` via flex-shell (Alternative A), footer pinned on short pages.
- Single `h1`, `aria-labelledby`, keyboard/motion parity via existing atoms.

**Non-Goals:**
- No search box (doc reserves it for larger sites; 4 routes here).
- No `noindex`/SEO-chain changes (`BaseSEO` already `noindex` in non-prod; sitemap excludes 404).
- No per-page `calc(100vh − Npx)` chrome arithmetic; no new keyframes/easings; no organism for a single-use section.
- No site-wide copy audit — only the 404 page strings change; other pages keep their current copy.

## Decisions

### D1: Flex-shell on Layout + flex-1 center on 404 (Alternative A over magic calc / fixed 90vh)
- **What:** `body class="flex min-h-dvh flex-col"`, `main class="flex flex-1 flex-col"`; 404 `<section class="flex flex-1 items-center justify-center …">` with inner centered block (`mx-auto w-full max-w-… text-center`, vertical rhythm via `py-xl`/gap tokens).
- **Why:** `flex-1` (`1 1 0%`) distributes leftover space from zero basis — header/footer (`grow: 0`) keep natural height, `main` absorbs exactly the remainder regardless of nav wrap or footer length. `min-h-dvh` tracks the dynamic mobile viewport; `min-` (not `h-`) lets tall content grow normally.
- **Alternatives rejected:** B magic `calc(100vh − 240px)` — rots on every header/footer change, mobile wrap breaks it; C fixed `min-h-[90vh]` (Hero precedent) — overshoots by header+footer, scrolls instead of centering.

### D2: Compose from SectionHeader + Button + NavLink only (over bespoke markup / new molecule)
- **What:** `SectionHeader align="center" level="h1" eyebrow="Error 404" title="Página no encontrada" subtitle="…"` (Spanish), aria-hidden `404` numeral above it (`text-massive` token + token gradient `bg-gradient-to-br from-brand-pink to-primary` + `bg-clip-text text-transparent`), `Button variant="primary" href="/"` ("Volver al inicio") + `variant="secondary" href="/contact"` ("Contacto"), `NavLink` sitemap row with Spanish labels ("Inicio" / "Nosotros" / "Contacto").
- **Why:** Reuses the exact hero voice (Eyebrow E2, B2/B3 CTAs, `.lift`/`.link` motion, focus ring) with zero new API surface; page→molecule→atom edges stay acyclic per hierarchy rules. numeral reuses `@theme` `text-massive` (12vw/900) — no new type token.
- **Alternatives rejected:** new `NotFoundHero` molecule/organism — single-use, violates YAGNI; raw `<a>`/`<button>` markup — bypasses B2/B3 and motion contract.

### D3: All visible 404 strings in Spanish + `lang="es"` on this page (over site-wide i18n / English retention)
- **What:** `<Layout lang="es">`, `PageSEO title="Página no encontrada" description="…"` (Spanish), and every rendered string in Spanish: Eyebrow "Error 404" ("Error" is valid Spanish), `h1` "Página no encontrada", neutral-Spanish subtitle, primary CTA "Volver al inicio", secondary CTA "Contacto", sitemap labels "Inicio" / "Nosotros" / "Contacto". Decorative `404` numeral is `aria-hidden` so it is never read as language content.
- **Why:** Landing (`index.astro`) is already `lang="es"`; the 404 is currently the only English page (`Page not found`, `Home/About/Contact`). No i18n infra exists — per-page props + literal Spanish strings are the established pattern (`contact.astro` uses Spanish title).

### D4: Spanish-first language rule in AGENTS.md (small, mandatory)
- **What:** Append a short `## Language` section to `AGENTS.md`: all user-visible website copy SHALL be written in Spanish (page content, headings, buttons, links, aria-labels, SEO titles/descriptions); code identifiers, docs, and specs stay in English.
- **Why:** No language rule exists today — that is how the English 404 stub shipped unnoticed on an otherwise Spanish landing. A 3-line mandatory rule makes future violations reviewable. Small enough to be uncontroversial; explicitly out of scope is retrofitting other pages' copy.

## Risks / Trade-offs

- [Risk] Layout class change is global → Mitigation: flex-column + `flex-1` main is a no-op for tall content (default `justify-start`); verify `/`, `/about`, `/contact`, `/404` visually + `astro build` green.
- [Risk] `text-massive` (12vw) numeral overflows tiny screens → Mitigation: `text-center leading-none break-words` + `max-w` container; spot-check 360px.
- [Risk] Button is a React island (hydration) on a static error page → Mitigation: precedent already set by `HeroActions`; island is tiny and static (no store). Accept.
- [Trade-off] Gradient-clipped numeral uses `transparent` + `bg-clip-text` — legal per palette rules (`transparent` exempt); the gradient MUST come from token stops (`from-brand-pink to-primary`) via longhand `background-image` (Tailwind `bg-gradient-to-br`), never the shared `.gradient-primary` `background` shorthand, which resets `background-clip` to `border-box` and kills the text clip (observed in dev + prod cascade).
