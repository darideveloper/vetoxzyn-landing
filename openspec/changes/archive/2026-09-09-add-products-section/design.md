## Context

Landing (`src/pages/index.astro`) currently renders `Hero` → placeholder benefits block → `ContactForm`. The next Stitch section in reading order is `design/stitch/04-products/code.html` (cinematic split-screen: Tópico light / Instalaciones dark, HUD spec panels, vertical pills, formula banner). Project is locked to vanilla-only atomic hierarchy (`docs/astro-atomic-components.md`: `organisms → molecules|atoms|store|lib`, no `ui/`, no `Validated*`). `Hero.astro` is the precedent: static Astro organism, frontmatter const data, `Button` + `Badge` + `Icon` atoms, `astro:assets Image`, tokens ported into `src/styles/global.css`. Global atom votes (`docs/atoms-page-global-components.md`, `docs/atoms-usage.md`) already standardize the only two atoms this section needs: `Button product light|dark` (B4) and `Badge feature` in a vertical wrapper (P3 dropped).

## Goals / Non-Goals

**Goals:**
- Render the full 04-products section on `/` as `id="section-3"`, fulfilling the dead Hero secondary-CTA anchor.
- Reuse voted atoms with zero new atoms/molecules/store; all section-specific styling stays bespoke inside the organism.
- Local, optimized imagery (no external hotlinks) and accessible static markup.

**Non-Goals:**
- No real ficha-técnica pages/PDFs — both CTAs point to `#section-5` until fichas exist.
- No new `ProductPanel` molecule (2 instances only — YAGNI).
- No `Card C1` adoption for HUD panels; no CMS/data-file abstraction for specs.
- No changes to Hero, Header/Footer, ContactForm, or global atoms.

## Decisions

1. **Single static `organisms/Products.astro` (over organism + molecule split).** Two panels share a skeleton but differ in theme/alignment/accent side; a parametrized molecule saves ~40 lines at the cost of a new file + prop API for exactly 2 call sites. Single file with a frontmatter `products` const (mirroring `Hero.astro` bullets) is the shortest diff that holds. Revisit if a third line ever appears.
2. **Reuse `Button product` + `Badge feature`, bespoke everything else.** `Button.tsx` already implements B4 rectangular w-full uppercase with `tone` (orange/black-hover vs burdeos/white-hover) — direct match for both CTAs including the `arrow_forward` child glyph. `Badge feature` with `icon="water_drop"|"cleaning_services"` covers both vertical pills inside a `writing-vertical` absolute wrapper (P3 stays dropped per vote). Intentional restyle, approved: Stitch draws these pills solid orange/pink; the voted rule mandates glass `feature` pills instead, so the section ships glass-on-image (vote wins over pixel fidelity). HUD panels (`hud-panel` / `hud-panel-dark`, accent `w-1` bar, 2-col spec grid) are bespoke: `Card C1` is light-glass-only and cannot express the dark panel without overrides that fight the atom. Section header, titles, spec labels/values, formula banner are plain static markup (no eyebrow in 04-products per usage map).
3. **Flatten the intro overlay into a normal section header (approved over Stitch overlay).** Design positions `h2+p` as `absolute … mix-blend-difference` over both images — fragile contrast, pointer-events-none, and a second visual H2 competing with panel H3s. Render it as a static centered in-flow header above the split (`h2` + `p`, `max-w` constrained). Preserves copy, fixes a11y, costs nothing visually.
4. **Anchor `id="section-3"` on the section; CTAs `href="#section-5"`; add missing `id="section-5"`.** Claims the Hero secondary-CTA target with zero Hero changes. Verified: the contact section in `index.astro` has no `id` today, so this change tags it `id="section-5"` — otherwise both the Hero primary CTA and the new ficha buttons point at a dead anchor. Ficha buttons become honest contact anchors instead of dead `<button>`s — real ficha URLs swap in later with a one-line href change each.
5. **Port 04-products tokens + panel CSS into `global.css`.** Missing today: `inverse-surface`, `secondary-container`, `on-secondary-container`, `tertiary-fixed` family, plus `hud-panel`, `hud-panel-dark`, `writing-vertical`, `image-pan`. Port verbatim hexes like the Hero pass did; extend the existing `prefers-reduced-motion` guard to `image-pan` (30s pan animation must not run for reduced-motion users).
6. **Two local images via `astro:assets`, lazy.** New `src/assets/products/` (WebP, responsive widths+sizes, `loading="lazy"` — below fold, unlike hero eager). Source art TBD at implementation (brand art or approved crop); hard rule: zero `googleusercontent` URLs in shipped code.

## Risks / Trade-offs

- [Risk] Brand product art missing at build time → Mitigation: implement against clearly-named placeholder WebPs in `src/assets/products/` + README note; swap files later with no markup change.
- [Risk] `100vh`-per-panel + absolute pills cause mobile overflow → Mitigation: stack `flex-col lg:flex-row`, content-first order, pills `hidden sm:flex` or inset-safe on 390px; verify 390/768/1280px with no horizontal scroll.
- [Risk] Dark-panel contrast (grey-400 labels on dark glass) fails → Mitigation: keep design's `text-white` values + `gray-300+` labels, verify contrast; adjust label color inside organism only, never the atoms.
- [Risk] `writing-vertical` pill overlaps HUD on narrow screens → Mitigation: edge-absolute positioning with panel padding reserve; pills decorative-adjacent — keep text in DOM, `aria-hidden` only if duplicated elsewhere (it isn't — keep readable).
- [Risk] Glass feature pills over busy imagery lose contrast (restyle consequence) → Mitigation: keep pill text semibold + icon filled; verify legibility on both panels at 390px; adjust organism-level pill wrapper (bg opacity/padding) only, never the atom.
- [Trade-off] Single-file organism duplicates ~2× spec-grid markup → Accepted: 2 instances don't justify an abstraction; duplication is local and visible.

## Open Questions

- Final source for the two panel images (new brand shoot vs approved reuse)?
- Are spec values final (100ppm/>850mV/30–950ml vs 500ppm/>900mV/1·4·20L, Grado 0, pH 6.0–7.5)?
- Real ficha-técnica destinations and timeline (to replace the `#section-5` stopgap)?
