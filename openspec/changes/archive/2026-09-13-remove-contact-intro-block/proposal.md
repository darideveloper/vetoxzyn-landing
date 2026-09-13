## Why

`/contact` renders a page-level intro block (unstyled `<h1>Contacto</h1>` + "¿Prefieres contactarnos directamente?" phone/email paragraph) above the `ContactSection` organism. The paragraph is redundant: the same phone (`PHONES.main`) and email (`EMAIL.address`) already render in the layout shell on every page via `ContactLinks` (header `PrimaryNav` + footer `FooterMeta`). But the page still needs a proper branded heading — the current bare `<h1>` carries none of the project heading styles. The fix: drop the paragraph, keep a single page-level `<h1>Contáctanos</h1>` rendered through the canonical `SectionHeader` API (`level="h1"` string title) — projected **inside** the `ContactSection` via a `page-title` slot, so the heading sits over the same section tint/backdrop background instead of a split plain shell above it.

## What Changes

- In `src/pages/contact.astro`, delete the intro `<section>` shell (unstyled `<h1>Contacto</h1>` + phone/email paragraph gone with it) and pass `<SectionHeader level="h1" title="Contáctanos" slot="page-title" />` into `<ContactSection />`, so the page is `<Layout>` + `<PageSEO currentPage="contact">` + a single organism. `<ContactSection />` stays the only section on the page.
- In `organisms/ContactSection.astro`, add an optional `<slot name="page-title" />` outlet above the in-flow header (rendered only when the slot is provided — `/` output byte-identical).
- Swap page imports: drop `NavLink`, `PHONES`, `EMAIL`; add `SectionHeader` (first page-level `SectionHeader` use — tier rules constrain component inter-imports, pages compose).
- Spec delta: rewrite the `contact-section` "Contact page reuse" scenario — the organism renders below the branded page-level H1; the organism-on-`/contact` requirement stands.
- Update `docs/component-dependencies.md` (`contact.astro` per-page tree) per Definition of Done.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `contact-section`: "Contact page reuse" scenario — `ContactSection` renders on `/contact` with the branded page-level H1 (`Contáctanos`, canonical `SectionHeader` `h1` style) projected inside it via the `page-title` slot (shared section background) with identical composition and a single `ContactForm` island instance. Slot outlet added to the organism (empty on `/`, landing output unchanged). Organism composition, anchors, copy, and atom contract otherwise unchanged.

### Unchanged (explicit)

- `contact-channels`: WhatsApp/email channels still render on `/contact` via shell `ContactLinks` (header + footer); channel URLs, targets, and single-channel rule untouched.
- `section-heading-typography`: no delta — the change consumes the existing `level="h1"` string-title API; no new title styles, no hardcoded sizes.
- `seo-basics`: `PageSEO currentPage="contact"` (document title/meta) untouched.
- `section-anchors`: `#contacto` / `#contacto-formulario` targets live inside the organism; unaffected.

## Impact

- Modified: `src/pages/contact.astro` (delete intro shell ~8 lines, pass slotted `SectionHeader`; imports: drop `NavLink`/`PHONES`/`EMAIL`, keep `SectionHeader`), `src/components/organisms/ContactSection.astro` (optional `page-title` slot outlet, ~4 lines), `openspec/specs/contact-section/spec.md` (scenario rewrite on archive), `docs/component-dependencies.md` (contact page tree: drop `NavLink`/`PHONES`/`EMAIL` edges, `SectionHeader` now slotted into the organism).
- No atom, store, token, or landing (`/`) changes. No new dependencies.
