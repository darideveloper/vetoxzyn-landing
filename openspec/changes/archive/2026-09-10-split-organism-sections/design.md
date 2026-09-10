## Context

Vanilla-only project per `docs/astro-atomic-components.md` (no `ui/`, no `Validated*`; import rules `atoms←store/lib`, `molecules←atoms`, `organisms←molecules/atoms`). Current state: 7 organisms, 2 molecules, 8 atoms. Organism sizes: Products 150 lines, ContactSection 115, Challenges 84, Hero 76, Testimonials 46, Header 15, Footer 13. `docs/component-dependencies.md` documents per-page trees down to atom props. Explore decisions (locked): full split granularity, single `SectionHeader` molecule, single `ProductPanel` with `tone` prop, atomize all raw tags. Single `client:load` island (`ContactForm`) on `/` and `/contact`; Zustand `contact` store + injectable `useField`; no new dependencies.

## Goals / Non-Goals

**Goals:**
- Thin every organism to section composition (grid/section shell + molecule/atoms, no inline row/card markup).
- Deduplicate the 5× Eyebrow+h2+p heading pattern and the 2× mirrored Products panels behind single molecules.
- Bring all raw `<img>`/`<a>`/`<details>`/`<dl>` markup inside the atomic hierarchy.
- Move FAQ-exclusivity JS from organism inline `<script>` into the owning molecule.
- Update `docs/component-dependencies.md` fully (trees, catalogues, Notes) verified by rg sweeps.
- Pixel-identical output: same anchors, islands, store bindings, responsive behavior.

**Non-Goals:**
- No visual redesign, copy changes, new sections, or new routes.
- No store/data/SEO/deployment changes; no new dependencies or client islands.
- No `ui/` or `Validated*` tier; no atom-to-atom cycles; no touching `src/assets` files.
- No changes to `design-system.astro`/`_demos.tsx` (dev showcase) or `about.astro` (placeholder).
- No per-page heading variants beyond `align` — divergent styling stays out.

## Decisions

1. **Single `SectionHeader` molecule (not two variants, not inline).** Props: `eyebrow?`, `title` (string or slot), `subtitle?`, `align: "left"|"center"`. Heading level preserved via slot (`h1#hero-heading` in Hero, `h2` elsewhere); eyebrow optional (Products header has none). Rationale: 5 occurrences differ only in alignment/copy; one component kills the most duplication per line of new code. Alternative (two aligned variants) rejected — prop covers it.
2. **Single `ProductPanel tone="light"|"dark"` (not two molecules).** Panel structure is identical (backdrop → header → SpecGrid → CTA → vertical Badge); divergence (gradient, text color, accent-bar side, Button product tone) folds into the tone prop, mirroring the existing Button `product tone` precedent. Alternative (separate Light/Dark panels) rejected — would preserve the duplication this change exists to kill.
3. **`FaqAccordion` owns exclusivity behavior.** The `document.querySelectorAll("#section-5 details")` inline script moves into the molecule (Astro-scoped script or small React-free behavior), so ContactSection stays static. Alternative (keep inline script) rejected — leaves behavior in a composition layer.
4. **`ResponsiveImage` atom wraps `astro:assets Image` (local images only).** Centralizes the repeated `widths=[384,512] + sizes + loading/decoding` convention (Hero eager/high-priority vs rest lazy/async) behind `eager?: boolean` prop. `Avatar`/`DividerImage` stay plain `<img>` wrappers — avatars/dividers are external Unsplash/picsum URLs, which `astro:assets` cannot optimize without extra config. Alternative (leave 4 bespoke `<Image>` calls) rejected — convention drift risk.
5. **ContactForm decomposes to `FormRow` + `InterestPicker` + `FormSuccess`, stays one island.** Form shell/validation/submit logic untouched; only grouping/success markup extracts. Alternative (split into multiple islands) rejected — extra hydration cost for zero benefit.
6. **Nav atoms: `NavLink` + `ContactLinks`.** Header/Footer/`contact.astro` intro share phone/email link pairs; `PrimaryNav`/`FooterMeta` compose them; `NavLink` is also adopted by the `404.astro` sitemap nav so no raw page navs remain. Alternative (leave raw `<a>`) rejected — violates hierarchy for the most-copied markup.
7. **Docs update is part of Done, regenerated from rg sweeps** (`rg "^import"`, `rg --files src/components`, `rg --files src/pages`), not hand-waved. Per-page trees redrawn for index/contact/404 (ContactSection subtree changes most; 404 gains the NavLink import); Atom catalogue + Molecules/Organisms lists extended; Notes records the single-header, single-panel-tone, FAQ-ownership, ResponsiveImage-convention, plain-img-for-external-URLs, 404-NavLink, SpecItem-wide, and data-const-placement decisions.
8. **Single-use data consts live inside their new molecules.** The `bullets` (Hero), `features` (Challenges) arrays move into `HeroBullets`/`FeatureList` — no prop-drilling for data with one consumer. Exception: Testimonials `DIVIDERS` URLs stay in the organism and pass as `src` props (page content, not structure). `SpecItem` gains a `wide?` prop for the col-span-2 Presentaciones cell.

## Risks / Trade-offs

- [Risk] Prop sprawl on `SectionHeader`/`ProductPanel` (align/tone branches grow) → Mitigation: freeze props to the listed set; any new variant need opens a follow-up change.
- [Risk] Import-path churn breaks a page silently → Mitigation: per-organism thin-and-verify loop (build after each organism), plus 390/768/1280px spot-checks for Products/ContactSection.
- [Risk] `ResponsiveImage` over-abstracts (eager/lazy, sizes per breakpoint) → Mitigation: keep `eager?` + passthrough `sizes`/`alt`; no layout logic inside.
- [Risk] Docs drift (trees written from memory) → Mitigation: mandatory rg re-runs listed in tasks; reviewer checks trees against imports.
- Trade-off: more files (~26 new) for fewer lines per file — accepted; each unit maps to one screen region per atomic rules.
