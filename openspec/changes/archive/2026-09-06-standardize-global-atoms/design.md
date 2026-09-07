## Context

Six Stitch exports (`design/stitch/01-hero-layout` … `05-contact-form`) each styled the same elements differently: 5 button looks, 3 eyebrow treatments, 3 badge families, 2 feature-icon containers, 2 card shells. A visual showcase (`/tmp/opencode/atoms-showcase.html`, since removed) was voted on 2026-09-07 — one winner per element — and the codebase was migrated to match. Current state: 8 atoms in `src/components/atoms/`, extended contact store, `/design-system` showcase page, two living docs. Vanilla-only project (no `ui/`, no `Validated*` per `docs/astro-atomic-components.md`); static SSG output; contact submit is a local-only stub.

## Goals / Non-Goals

**Goals:**
- One voted visual variant per element, encoded as atom props — no per-section re-styling.
- Every HUD pill, feature icon, CTA, and form control in the six designs maps to exactly one atom.
- Showcase page proves coverage; docs record decisions and per-design usage.

**Non-Goals:**
- No new molecules/organisms (feature rows, FAQ accordion, product panels come later).
- No contact API wiring (submit stays stubbed).
- No typography atom (design tokens already cover type); no changes to Header/Footer/SEO.

## Decisions

- **B2 orange pill as sole primary (B1 gradient dropped).** B2 already won 3-to-1 across designs (hero-bullet, products, contact); a flat color is cheaper to maintain and meets contrast with white text.
- **Secondary + product coexist with distinct roles** rather than forcing one button. Hero glass pill (B3) and product rectangular full-width (B4) serve disjoint contexts; unifying them would degrade one.
- **Submit reuses primary at `size="sm"`** instead of B5-large. One primary style site-wide (YAGNI); size prop handles the form context without a fourth variant.
- **`Icon` gets `bare` mode + tones instead of new atoms.** 14 of 37 symbol usages are bare (quotes, toggles, verified) or non-pink; a mode flag absorbs them with zero new files.
- **`Badge tag` gains tones instead of new variants.** dark/primary/light covers all three HUD pills; `icon` prop replaces the pulse dot for the PURE pill.
- **Linea interest as three booleans, not an array.** Matches the boolean `Checkbox` atom directly — no custom array-binding glue in the form.
- **Showcase binds a page-local demo store**, never `store/contact`, so visiting `/design-system` cannot pollute persisted contact drafts.

## Risks / Trade-offs

- [Risk] E1→E2 / E3→E2 / I2→I1 restyles deviate from Stitch pixel output → Mitigation: recorded as intentional in `atoms-page-global-components.md`; votes are the authority, not the exports.
- [Risk] `/design-system` ships in the sitemap and is crawlable in prod → Mitigation: `BaseSEO` noindexes non-prod; page carries explicit title/desc; acceptable as a public pattern library.
- [Risk] New contact fields persist under the existing storage key; old drafts merge cleanly (new keys fall back to `initialState`) → Mitigation: verified by `useField` fallback path; no migration needed.
- [Trade-off] `Icon bare` sizing via `class` passthrough is less typesafe than a prop — accepted to avoid a third size axis; circle sizes stay prop-driven.

## Migration Plan

Retroactive (already implemented): atoms restyled/created → store extended → `ContactForm` rewired → showcase + docs → `pnpm build` green (5 pages). Rollback: revert the atoms/store/form commits; no data migration involved (localStorage-only, additive keys).
