## Why

`/` (`#section-5`) and `/contact` still render a bare unstyled `ContactForm` island (single column, no glass, no section composition), while the approved Stitch `05-contact-form` design defines the asymmetric bioseguridad closing section. Replicating it now completes the landing narrative (hero → challenges → products → contact) with maximum atom reuse and closes the last voted-design gap.

## What Changes

- New static `organisms/ContactSection.astro` shell replicating `05-contact-form` content: section-scoped blob background + giant `BIOSEGURIDAD` typography, in-flow header flattened from the Stitch `lg:absolute` overlay (gradient `bioseguridad` span), static 12-column grid in the standard `max-w-max-width` container (`px-gutter`, Products rhythm) — left column stacking FAQ + image + disclaimer, right column with the form at full height. Mild Stitch skew on all viewports instead of overlap (mobile base form `-1deg` / FAQ `+1deg` / image `-1deg`, stepping up at desktop to form `-2deg` + `hover:rotate-0` / FAQ `+3deg` / image `-3deg`); float animation disabled; no absolute positioning, no inter-card overlap (follow-up simplifications of the original asymmetric overlap: uncapped full-width experiment tried first, then reverted to the standard width).
- Restyle `molecules/ContactForm.tsx` island inside the shell: `glass-panel-heavy rounded-3xl` card with mild `lg:rotate-[-2deg]` skew (`hover:rotate-0`), `grid md:grid-cols-2` inputs, pill checkbox group, `Textarea rows=3`, `div flex justify-end` submit (`Button primary sm` + `arrow_forward` `span` child per B2 vote — B5-large from Stitch NOT replicated).
- Static FAQ accordion (`<details>`/`<summary>` ×3, Stitch ES copy verbatim) with `Icon circle pink lg filled info` header and `Icon bare orange add_circle` toggles (`group-open:rotate-180`); exclusive single-open via the Stitch toggle script (island-free).
- Image + disclaimer as separate left-column grid cells: local WebP via `astro:assets Image` at natural aspect ratio (`h-auto w-full`, no crop/stretch heights — verified 1.833 layout vs 1.835 natural) replacing the `googleusercontent` hotlink, disclaimer glass box with `Icon bare orange filled warning` + `Aviso Importante` caption; **stacked visible on mobile** (deliberate deviation from Stitch `lg-only` hide).
- Port `glass-panel-heavy`, `organic-blob-1/2`, `floating-element`, `deep-float-shadow`, `z-stack` tokens from Stitch `<style>` into `styles/global.css` with `prefers-reduced-motion` guard, plus `font-impact` / `text-massive` theme tokens; float animation left unused in favor of the mild skew; main-branch `max-w` token rule adopted (no `max-w-xs|sm|md|lg|xl` names — they compile to 4/12/24/48/80px — arbitrary values like `max-w-[28rem]` instead). No new atoms, no `Card C1` forcing (bespoke shells per hero/challenges/products precedent).
- Mount the organism on both `/` (`section#section-5`) and `/contact`; complete the ES copy pass (island success strings + page headings).
- Update `docs/component-dependencies.md` (+ `atoms-page-global-components.md` if affected) per Definition of Done.

## Capabilities

### New Capabilities

- `contact-section`: contact closing section — shell composition, background/typography, FAQ accordion content + behavior, image + disclaimer cells, responsive static grid (no overlap), local image, ES copy, atom-reuse contract (Input×4 / Checkbox×3 / Textarea / Button primary sm / Icon circle+bare).

### Modified Capabilities

- `contact-islands`: `ContactForm` shell restyle (glass card, 2-col grid, pill group, `rows=3`, right-aligned `primary sm` submit) — layout/styling requirement change, store logic untouched.

## Impact

- New: `src/components/organisms/ContactSection.astro`, `src/assets/contact/*.webp`, `glass-panel-heavy`/blob/float tokens in `global.css`.
- Modified: `src/components/molecules/ContactForm.tsx` (shell only), `src/pages/index.astro`, `src/pages/contact.astro`, `docs/component-dependencies.md`.
- No new atoms, no new dependencies, no API calls (submit stays local stub per existing `ponytail` note). Store: ES fallback strings only (`Valor inválido`), no schema/logic changes.
