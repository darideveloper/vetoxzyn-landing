## Context

`/` and `/contact` embed `molecules/ContactForm.tsx` as a bare `client:load` island (single-column, `max-w-lg`, no section chrome). The Stitch `05-contact-form/code.html` source defines a full asymmetric closing section: fixed blob background + giant rotated `BIOSEGURIDAD` massive type, top-left header with gradient `bioseguridad` span, and a 3-layer overlapping stack (glass form `-rotate-2`, FAQ `+3deg` float, image + disclaimer). All form atoms already exist and are store-wired (Input F1, Checkbox F2, Textarea F3, Button B2-primary, Icon circle+bare — GAP-A/B closed, GAP-4 store booleans wired). Precedent organisms (Hero, Challenges, Products) use bespoke shells, never `Card C1`. Final implemented shape (after chat follow-ups, see Decision 7): static 12-column grid in the standard `max-w-max-width` container — left column FAQ + image + disclaimer, right column form at full height — with mild skew on all viewports and float disabled. Standing explore-phase decisions (2026-09-09): both pages share the organism; submit stays voted `primary sm`; disclaimer stacks on mobile (deviation from Stitch `lg-only`); FAQ keeps exclusive single-open script.

## Goals / Non-Goals

**Goals:**
- One static `organisms/ContactSection.astro` shell composing background, header, `ContactForm` island, static FAQ, and image + disclaimer — reused verbatim on `/` (`section#section-5`) and `/contact`.
- Zero atom edits: every control maps to an existing voted variant.
- Stitch fidelity for layout/copy where voted; documented deviations only where voted or decided in explore (submit size, disclaimer visibility).
- No horizontal overflow at 390/768/1024/1280/1440 (Challenges lesson: verify live, drop static tilts that clip).

**Non-Goals:**
- No submit backend — `ContactForm` keeps the local `setSubmitted(true)` stub (`ponytail` note stands; API lands in a later change).
- No `Card C1` adoption, no second store, no i18n, no CMS-driven FAQ.
- No new animation system — port Stitch keyframes verbatim with reduced-motion guard only.

## Decisions

### 1. Static Astro shell + single React island (not 2–3 islands)
FAQ (`<details>`/`<summary>`) and disclaimer render as static Astro HTML; only the form hydrates (`client:load`). Alternative (FAQ as React accordion island) rejected: native `<details>` gives keyboard/AT behavior free, zero bundle cost, and the exclusive-open script is 10 lines. Matches islands convention (one instance per page, static surroundings).

### 2. Restyle `ContactForm.tsx` in place (not a new molecule)
The island keeps its store logic/validation untouched; only its shell gains `glass-panel-heavy rounded-3xl`, `grid md:grid-cols-2` inputs, pill group, `rows=3`, `flex justify-end` submit, plus the Stitch skew (`rotate-[-1deg]` base + `hover:rotate-0`, `lg:rotate-[-2deg]` at desktop). Alternative (new `ContactCardForm` molecule) rejected per ponytail: one form exists, one shell change suffices; avoids duplicate field wiring.

### 3. Bespoke glass shells, not `Card C1`
Stitch cards are `rounded-3xl` + `blur(40px)` heavy glass with rotation; `Card C1` is `rounded-xl` light-only ambient. Overriding C1 per-instance would be a larger diff than bespoke classes. Precedent: Hero/Challenges/Products shells are all bespoke. `atoms-page-global-components.md` already records FAQ/disclaimer as "may adopt Card later" — this design defers that.

### 4. Port Stitch effect tokens into `global.css`
`glass-panel-heavy`, `organic-blob-1/2` (+`morph`), `floating-element` (+`float-slow`), `deep-float-shadow`, `z-stack-1/2/3` copied verbatim from `code.html <style>`, plus existing `prefers-reduced-motion` guard extended to the new keyframes. Alternative (page-scoped `<style>`) rejected: tokens are section-grade effects reused across both pages; global keeps organism markup clean, consistent with `tilt-float`/`hud-panel` precedent.

### 5. Submit = voted `primary sm` (B5-large dropped)
Stitch submit is `px-10 py-5 text-headline-sm` (the dropped B5 variant). The 2026-09-07 vote standardizes submit on B2 `primary sm` + `arrow_forward`. Explore decision confirms the vote wins. Rationale: cross-form consistency beats one-off fidelity; the deep-float shadow still carries the CTA weight.

### 6. Local image via `astro:assets`, stacked disclaimer on mobile
Remote `googleusercontent` URL is replaced by a local WebP in `src/assets/contact/` (widths 384/512, lazy, `decoding="async"`), same pipeline as hero/products placeholders. Disclaimer `hidden lg:flex` becomes stacked-visible: rationale — the `Aviso Importante` (non-medicamento) is compliance copy and must not disappear on the majority viewport; stacking costs one block, no overlap math.

### 7. Static grid at standard width, mild skew, left-column stack (simplification follow-ups)
The Stitch absolute overlap was replaced with a static `lg:grid-cols-12` grid inside the standard `max-w-max-width` container (`px-gutter`, same rhythm as Products): left column (cols 1–5) stacking FAQ + image + disclaimer, right column (cols 6–12) with the form spanning full height. Float animation is disabled; instead the Stitch skew returns on all viewports — base tilt on mobile (form `-1deg`, FAQ `+1deg`, image `-1deg`) stepping up at desktop (form `-2deg` + `hover:rotate-0`, FAQ `+3deg`, image `-3deg`) — with `gap-10` gutters plus the section `overflow-x-clip` so tilted corners never clip. Glass shells, copy, and atoms are unchanged.
Mobile = single-column stack (header → form → FAQ → image/disclaimer), desktop = Stitch absolute overlap for the stack (`-rotate-2` form, `+3deg -translate-x-12` FAQ). The Stitch `lg:absolute top-left` header is flattened to in-flow (per Products `04-products` header-flattening precedent: avoids absolute-overlay clip math, keeps `#section-5` anchor target stable).
Mobile = single-column stack (header → form → FAQ → image/disclaimer), desktop = Stitch absolute overlap (`-rotate-2` form, `+3deg -translate-x-12` FAQ). Rotation/translation utilities apply at `lg:` so small viewports never clip (Challenges `~22px badge clip` lesson). Container gets `overflow-x-clip` guard; verify 0px overflow at 390/768/1024/1280/1440 before merge.

## Risks / Trade-offs

- [Risk] Absolute overlap reintroduces Challenges-style clipping at 1024–1280px → Mitigation: `lg:`-gated transforms, gutter-derived offsets (`-ml-6`/`-mr-6` = `px-gutter`), live overflow check at 5 widths, `hover:rotate-0` kept (no static tilt removal unless measurement demands it).
- [Risk] Heavy `blur(40px)` over large panels costs paint on low-end mobile → Mitigation: panels are static (no per-frame blur animation; only `translateY` float animates, which is compositor-cheap); reduced-motion guard disables float.
- [Risk] Single-open `<details>` script fights Astro ClientRouter swaps → Mitigation: script is inline per-section with `querySelectorAll('details')` scoped to the section root; no global listeners; idempotent on swap.
- [Risk] Placeholder contact image ships as brand art → Mitigation: marked `TODO(replace)` in code + asset README pattern (hero/products precedent); file swap needs no markup change.
- [Trade-off] Stitch fidelity vs vote: submit size + disclaimer visibility deviate — accepted explicitly in explore; recorded in spec scenarios so verification checks the deviation, not the Stitch original.

## Migration Plan

1. Land organism + island restyle + tokens + asset behind no flag (static section, no API). Rollback = revert 5 files (`ContactSection.astro`, `ContactForm.tsx`, `global.css`, `index.astro`, `contact.astro`).
2. No data migration (store schema untouched), no env changes, no adapter changes (static output).
3. Docs (`component-dependencies.md`) updated in the same change before merge (Definition of Done).

## Open Questions

- Contact image source: reuse an existing `products/` placeholder crop or add a dedicated `src/assets/contact/` file? (Default: dedicated file, hero-reuse fallback if no art available.)
- `/contact` page keeps its direct phone/email links above the organism? (Default: yes — organism appended below existing intro block.)
