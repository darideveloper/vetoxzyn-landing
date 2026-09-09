## Context

`/` currently renders `Layout` → `Hero` (static organism, `Eyebrow` + `Icon circle pink md` + `Button`, local eager WebP) → placeholder "Why Vetoxzyn" → `ContactForm` island. The vanilla-only atomic hierarchy (`docs/astro-atomic-components.md`, approach 1) and standardized atoms (`docs/atoms-page-global-components.md`, vote 2026-09-07) are in place; `Icon` (GAP-A: `circle|bare`, `pink|orange|primary|green`, `md|lg`) and `Badge` (GAP-B: `feature|tag dark|primary|light`) already support everything `02-challanges` needs. `src/styles/global.css` carries only hero-ported tokens; `src/assets/` holds only `hero/`. The Stitch source (`design/stitch/02-challanges/code.html` + `screen.png`, note folder typo `challanges`) hotlinks a remote `aida-public` image that must not ship. User decisions from explore: download Stitch image → WebP; mount after Hero with `id="desafios"`; atoms-as-is (no pixel-faithful overrides, no new tokens).

## Goals / Non-Goals

**Goals:**
- Static `organisms/Challenges.astro` (`section#desafios`) faithful to the Stitch split: left content card + right overlapping rotated media card with 2 HUD badges.
- Reuse `Eyebrow` / `Icon` / `Badge` with zero atom edits; bespoke Stitch geometry stays in the organism.
- Local lazy WebP via `astro:assets Image`; mount after `<Hero />`; update `docs/component-dependencies.md`.

**Non-Goals:**
- No hero CTA rewiring (`#section-3`/`#section-5` stay dead; separate follow-up).
- No `Card C1` adoption for the bespoke media/left cards; no `Button`/form/store/island work.
- No new `global.css` tokens, no SEO/route/i18n changes, no `ContactForm` ES copy normalization.

## Decisions

- **Static Astro organism, not molecule trio or island.** 3 rows are hardcoded ES content with no interactivity; matches `Hero.astro` precedent (static, data array, no `client:` directive). Alternative (molecule `ChallengeRow` ×3 + section organism) rejected as over-abstraction for non-reused rows; island rejected (zero JS needed, keeps page static).
- **Atoms-as-is: `Icon tone="orange" size="lg"`.** Stitch circles are `w-12` (= our `lg`), while `atoms-page-global-components.md` says `md`. User chose atoms-as-is → `lg` wins, no per-instance overrides, doc corrected via implementation (code is source of truth, doc note updated). Alternative (pixel-faithful `md` + custom classes + new tokens) rejected: breaks standardization, adds CSS debt.
- **Badge mapping: `tag dark` (pulse dot, no icon) for CLINICAL GRADE; `tag light icon="verified"` for 99.9% PURE.** Direct match to `Badge.astro` GAP-B behavior (icon replaces dot). No new variants.
- **Eyebrow E2 verbatim** (`<Eyebrow>Dr. Resultados</Eyebrow>`, default `science` icon). Stitch pill matches E2; no restyle needed (unlike hero/testimonials E1→E2 cases).
- **Image: downloaded Stitch placeholder → `src/assets/challenges/challenges-clinica-<native>.webp` (e.g. `-512` if native ≥512, never upscale), `loading="lazy"`, responsive widths.** Mirrors hero pipeline (local WebP, `astro:assets`) but lazy since below fold. Alternative (reuse `hero-clinica-512.webp`) rejected per user choice; alternative (remote URL) rejected per `component-dependencies.md` no-hotlink rule.
- **Token mapping, no additions.** Stitch `surface-variant`/`background` map to closest existing (`surface-container-highest`/`surface-ice`); organism uses project utilities (`bg-surface-ice`, `text-on-surface`, `text-on-surface-variant`, `text-brand-orange`, `px-gutter`, `gap-md/lg`, `max-w-max-width`). Keeps `global.css` diff at zero.
- **Overlap kept, static tilt dropped (live-measured).** `lg:-ml-16` overlap stays; hover lift reuses existing `.tilt-float`/`.shadow-ambient` (same as Hero, `prefers-reduced-motion` already handled globally). Stitch's static `-rotate-3` was removed after Playwright measurement showed it swinging the bottom-right badge ~15px outward, clipping ~22px of the pill (into text) at 1024–1280px viewports. Badge overhangs are `-ml-6`/`-mr-6` (= `px-gutter`, so badges kiss the card edge without leaving the viewport; verified 0px overflow + 0px clip at 390/768/1024/1280/1440). Heading stays `h2` (page keeps single hero `h1`).

## Risks / Trade-offs

- [Risk] Downloaded `aida-public` placeholder is low-res / wrong license for production → Mitigation: ship as avowed placeholder (same as hero 512px), widths capped at native, note replacement in docs; swap when brand art lands.
- [Risk] `lg:-ml-16` overlap + badge overhang cause horizontal overflow on mid viewports → Mitigation: parent `overflow-hidden` section wrapper (like hero); RESOLVED via live Playwright check (0px overflow, 0px badge clip at 390/768/1024/1280/1440) after dropping static `-rotate-3` and sizing overhangs to `px-gutter` (`-ml-6`/`-mr-6`).
- [Risk] Doc says Icon `md`, code will ship `lg` → Mitigation: update `atoms-page-global-components.md` + `component-dependencies.md` notes in the same change so code/docs agree.
- [Risk] `id="desafios"` still leaves hero `#section-3/#section-5` dead → Mitigation: explicit non-goal + follow-up note; no partial rewiring inside this change.
- [Trade-off] Hardcoded ES copy in organism (like hero) vs `site-config` data → Chosen hardcoded: matches hero precedent, copy is section-specific, avoids premature abstraction.
