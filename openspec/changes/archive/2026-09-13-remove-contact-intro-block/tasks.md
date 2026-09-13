## 1. Page edit

- [x] 1.1 Replace the intro `<section>` content in `src/pages/contact.astro`: remove the unstyled `<h1>Contacto</h1>` + phone/email paragraph, render `<SectionHeader level="h1" title="Contáctanos" />` inside the existing section shell (shell classes unchanged); keep `<Layout>`, `<PageSEO currentPage="contact" title="Contacto" slot="seo" />`, and `<ContactSection />`
- [x] 1.2 Swap imports in `contact.astro`: drop `NavLink`, `PHONES`, `EMAIL`; add `SectionHeader` from `@/components/molecules/SectionHeader.astro`; verify with `rg "^import" src/pages/contact.astro` that only `Layout`, `PageSEO`, `ContactSection`, `SectionHeader` remain

## 2. Docs (Definition of Done)

- [x] 2.1 Update `docs/component-dependencies.md`: `contact.astro` per-page tree drops `NavLink` and the `PHONES`/`EMAIL` data edges, gains the `SectionHeader` molecule edge (re-run the three `rg` commands, redraw the affected tree; note first page-level `SectionHeader` use)

## 3. Verification

- [x] 3.1 Rendered `/contact` shows exactly one `h1` with text `Contáctanos` carrying the canonical core classes (Montserrat display, `text-on-surface` — no bespoke title sizing), followed by the organism H2
- [x] 3.2 Rendered `/contact` still contains phone (`wa.me/5214615747483` or `tel:+5214615747483`) and email (`mailto:`) links via shell `ContactLinks` (header + footer) — `contact-channels` clause holds with no spec edit
- [x] 3.3 `#contacto` / `#contacto-formulario` anchors still resolve inside the organism; the organism itself renders identically (only page chrome above it changed), checked at 390/1280
- [x] 3.4 `pnpm run check:palette` clean + `astro build` green + `openspec validate remove-contact-intro-block` passes

## 4. Slot projection follow-up (supersedes the separate-shell part of 1.1)

- [x] 4.1 Add optional `page-title` slot outlet to `organisms/ContactSection.astro` above the in-flow header (`Astro.slots.has` guard + organism-owned spacing wrapper; empty on `/`)
- [x] 4.2 Rewrite `src/pages/contact.astro`: delete the separate intro `<section>` shell, pass `<SectionHeader level="h1" title="Contáctanos" slot="page-title" />` into `<ContactSection />`; imports unchanged (`Layout`, `PageSEO`, `ContactSection`, `SectionHeader`)
- [x] 4.3 Update `docs/component-dependencies.md` contact tree: `SectionHeader` slotted into the organism (no separate shell); note the slot outlet on `ContactSection`
- [x] 4.4 Verify rendered `/contact`: exactly one `h1 Contáctanos` with canonical core classes **inside** `section#contacto` above the organism H2 (shared background ancestors); phone/email via shell; anchors intact; `/` has no `Contáctanos` and its organism region is unchanged
- [x] 4.5 `pnpm run check:palette` clean + `astro build` green + `openspec validate remove-contact-intro-block --strict` passes
