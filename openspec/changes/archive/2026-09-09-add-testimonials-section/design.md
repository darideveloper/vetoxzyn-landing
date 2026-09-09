## Context

`index.astro` currently renders `Hero` + a placeholder "Why Vetoxzyn" benefits block + `ContactForm`. The next Stitch section in page order is `design/stitch/03-testimonials` ("Lo que dicen los veterinarios"): centered header (pink-outline E3 eyebrow in Stitch, H2, subhead) over a fluid wash + blobs, with a 3-col grid of glass testimonial cards (left accent bar, bare `format_quote` icon, italic quote, bordered footer with name/clinic).

Global atom map (`docs/atoms-page-global-components.md`) prescribes for this design: `Card` C1 ×3, `Eyebrow` E2 restyle (E3 dropped), `Icon` bare quotes ×3. Current atoms already support this: `Card.astro` (C1 glass shell), `Eyebrow.astro` (E2, `icon` prop defaults to `science`), `Icon.astro` (bare variant, tones pink/orange/primary/green). Hero (`organisms/Hero.astro`) is the composition precedent: static `.astro` organism, atoms imported directly, decorative blobs hidden from AT, page wires the organism in. Explore decisions locked: content in `src/data/testimonials.ts` + map; `molecules/TestimonialCard.astro` + `organisms/Testimonials.astro` split; standard E2 eyebrow; `id="section-3"` + full Stitch background.

## Goals / Non-Goals

**Goals:**
- Render the testimonials section on `/` at `id="section-3"` (making Hero's secondary CTA target live) with Stitch content/layout fidelity using unchanged global atoms.
- Establish `src/data/testimonials.ts` as the single content source mapped to cards.
- Keep vanilla tier rules: organism → molecule/atoms, molecule → atoms only; fully static (no React island, no store).

**Non-Goals:**
- No atom API changes (no new variants/tones/props on Card, Eyebrow, Icon).
- No CMS, filtering, carousel, or interactivity; no new images (no `astro:assets` work).
- No Hero CTA label fix (secondary "Ver línea Tópico" → `#section-3` stays; relabels when products/`section-4` lands).
- No site-wide background/token refactor; section-scoped decor only.

## Decisions

- **D1 — Content lives in `src/data/testimonials.ts` (`as const` array: quote, name, role, accent `orange|pink|green`), mapped in the organism.** Rationale: matches `data/site-config.ts` const pattern, reusable/testable, CMS-ready. Alternative (hardcode in organism like Hero bullets) rejected: cheaper by one file but duplicates copy if quotes reappear and is harder to verify verbatim.
- **D2 — Split `molecules/TestimonialCard.astro` (card composition) + `organisms/Testimonials.astro` (section shell + header + grid).** Rationale: card = Card + Icon + footer is a genuine reusable unit; organism stays a thin grid/header wrapper per atomic hierarchy. Alternative (organism-only inline cards) rejected by user: saves a file but bloats the organism and prevents reuse.
- **D3 — Reuse atoms untouched: `Eyebrow` E2 default, `Card` C1 default, `Icon variant="bare" filled` with tone per accent (orange→brand-orange bar, pink→brand-pink bar, green→`tertiary-fixed-dim` bar).** Rationale: global map restyle rule (E3 dropped); green tone `#a0d66a` already equals the Stitch third-bar color so no new token. Accent bar (`absolute left-0 w-1 h-full`), `tilt-float`, footer border stay in the molecule — `Card` remains the pure C1 shell. Alternative (pink-outline Eyebrow override for pixel-match) rejected: one-off exception against the voted standard.
- **D4 — Section owns `id="section-3"`** (wired into `index.astro` after the placeholder benefits block, before contact; placeholder stays until `02-challenges` replaces it), centered header (`Eyebrow` + H2 + sub), responsive grid (`grid-cols-1 md:grid-cols-3 gap-gutter`), and full Stitch bg (fluid wash + 2 blurred blobs, `-z-10`, `aria-hidden`).** Rationale: unblocks the dead Hero anchor; bg decor is section-specific, never an atom concern. `bg-fluid-shape`/`tilt-float` ship as section-scoped `<style>` if absent from `global.css` (no global CSS change).
- **D5 — Copy verbatim from Stitch (ES quotes, names/clinics, header strings); single H2 for the section (page H1 stays in Hero).** Rationale: design is the copy source of truth; heading order and `vetoxzyn®` spelling rules carry over from hero-spec conventions.

## Risks / Trade-offs

- [Risk] Hero secondary label ("Ver línea Tópico") now scrolls to testimonials instead of products → Mitigation: documented out-of-scope follow-up; relabel/retarget when `04-products` (`section-4`) lands.
- [Risk] Third-accent green relies on existing Icon `green` tone matching Stitch `tertiary-fixed-dim` → Mitigation: verified equal (`#a0d66a`); visual check at 3 viewports in tasks.
- [Risk] `tilt-float` hover transform + grid could cause overflow on narrow screens → Mitigation: `overflow-hidden` on section, verify no horizontal scroll at 390px.
- [Trade-off] Extra molecule file for 3 static cards (YAGNI pressure) → Accepted per user choice for reuse and thin organism.
