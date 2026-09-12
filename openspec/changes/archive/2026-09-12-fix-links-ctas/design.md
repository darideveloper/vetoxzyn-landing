## Context

Link audit (2026-09-12) inventoried every link/CTA/button: header/footer `ContactLinks` still render placeholder `tel:+12345678901`; `SOCIAL_LINKS` (facebook + instagram) and `GOOGLE_MAPS` exist in `site-config.ts` but render nowhere; `ProductPanel` CTAs say "Ver ficha técnica" with no ficha behind them; anchor jumps are instant (no `scroll-behavior`). User decisions: WhatsApp `+52 1 461 574 7483` replaces the phone everywhere (`wa.me` link), email unchanged, keep facebook-only + footer logo (new tab), ignore maps, rename to "Más información" retargeted to `#contacto-formulario`, no dummy pages (menu routes `/`, `/about`, `/contact` verified to exist).

Constraints from repo docs: Vanilla-only atomic hierarchy (`AGENTS.md`), token-only palette (`docs/design-tokens.md`, `pnpm run check:palette` clean), interaction-feedback tokens/classes (`openspec/specs/interaction-feedback/spec.md`), single-source `site-config.ts` / `section-ids.ts`, `docs/component-dependencies.md` update as Definition of Done.

## Goals / Non-Goals

**Goals:**
- Real WhatsApp channel on every phone surface; zero placeholder phone strings.
- Facebook reachable from footer (logo, new tab); Instagram gone from code and SEO bundle.
- Honest product CTA labels ("Más información" → `#contacto-formulario`).
- Global smooth anchor scrolling with reduced-motion parity.

**Non-Goals:**
- No new routes or dummy pages; `/about` copy placeholder stays.
- No Google Maps embed/link; no WhatsApp floating widget; no form-backend work; no `instagram` replacement.

## Decisions

- **WhatsApp link as the visible phone `href` (not `tel:`).** User chose "replace all with WA". `ContactLinks` renders `NavLink href={PHONES.main.wa}` with display `+52 1 461 574 7483`; `PHONES.main.href` (`tel:+5214615747483`) stays as the programmatic fallback. Alternative (tel: primary + separate WA icon) rejected — more chrome, against explicit user choice.
- **Delete `SOCIAL_LINKS.instagram`, keep facebook literal.** Alternative (leave key unused) rejected — dead data re-invites accidental rendering; SEO `sameAs` follows automatically via `BUSINESS_DATA.social`.
- **Footer Facebook as inline SVG mark + `NavLink`-consistent `.link` styling, `target="_blank" rel="noopener"` + `aria-label`.** Alternative (Icon atom `material-symbol`) rejected — no brand glyph in the symbol font; inline SVG keeps token-only fill (`currentColor`) with no new CSS file.
- **`scroll-behavior: smooth` on `html` + `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }`** in `global.css`. Alternative (JS scroll lib) rejected — YAGNI; CSS covers all `#` anchors including future ones.
- **Label + retarget, no new routes.** The product CTA change is label text plus `href` retarget to the existing `#contacto-formulario` anchor — no new ids, routes, or atoms; avoids ficha-page scope creep the user declined.
- **CTAs target `#contacto-formulario`, not the section top.** The form wrapper (`ContactForm.tsx`) owns the `contacto-formulario` id from `SECTION_IDS`; pointing the hero primary + both product CTAs at it lands visitors directly on the form. This supersedes the `section-anchors` base-spec rule ("CTAs link to `#contacto`") for these three CTAs — the delta specs in this change win. "Ver línea Tópico" stays on `#productos` as the explicit user-approved exemption.
- **`scroll-mt-20` on the form wrapper.** Only the `#contacto` section carries a sticky-header offset today; the form wrapper div has none, so a direct `#contacto-formulario` jump would slide the form under the sticky header. Adding the same `scroll-mt-20` class to the wrapper fixes it with zero new CSS. Alternative (extra `scroll-padding-top` on `html`) rejected — per-target `scroll-mt` matches the existing pattern.
- **Extend `NavLink` with optional `target`/`rel` passthrough.** `NavLink.astro` currently accepts only `href`/`class`, but the WhatsApp + Facebook links must open in a new tab per user decision. Extending the atom keeps the shared `.link` class guarantee in one place. Alternative (raw `<a class="link">` at each call site) accepted as fallback where passthrough is impractical.

## Risks / Trade-offs

- [Risk] `wa.me` links require a new tab to avoid kicking mobile users out of the site → Mitigation: `target="_blank" rel="noopener"` on all `wa.me` + FB links.
- [Risk] Removing `instagram` breaks any unknown importer → Mitigation: `rg instagram src/` must be empty except archive; build verifies.
- [Risk] Smooth scroll can annoy keyboard/reduced-motion users → Mitigation: reduced-motion override + keep `scroll-mt-20` offsets so targets never hide under the sticky header.
- [Risk] "Más información" → `#contacto-formulario` may still feel vague without a real ficha → Mitigation: accepted explicitly by user; ficha pages remain a future change.

## Migration Plan

Single deploy, no migration: edit `site-config.ts`, `NavLink.astro`, `ContactLinks.astro`, `FooterMeta.astro`, `HeroActions.astro` (primary CTA → `#contacto-formulario`), `ProductPanel.astro` (label + target), `ContactForm.tsx` (`scroll-mt-20` on form wrapper), `global.css`; verify `rg "12345678901|instagram|Ver ficha técnica" src/` empty, every marketing `Button href` resolves to `#contacto-formulario` (only "Ver línea Tópico" keeps `#productos`), `pnpm run check:palette` clean, `astro build` green; rollback = revert one commit.
