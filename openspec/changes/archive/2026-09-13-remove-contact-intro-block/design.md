## Context

`src/pages/contact.astro` (20 lines) composes `<Layout>` + `<PageSEO currentPage="contact" title="Contacto">` + a page-level intro `<section>` (unstyled `<h1>Contacto</h1>`, `<p>` with `NavLink` phone/email) + `<ContactSection />`. The only spec pinning the intro is `contact-section/spec.md` "Contact page reuse": "the same `ContactSection` organism renders below the existing direct phone/email intro block". `contact-channels/spec.md` requires the WhatsApp number to render on `/contact` — satisfied independently by shell `ContactLinks` in header `PrimaryNav` and footer `FooterMeta`, which render on all pages including `/contact`. The project owns a canonical heading API — `molecules/SectionHeader.astro` with locked `SECTION_TITLE_CORE` (Montserrat display, `text-on-surface`) and `level="h1"` string-title support, already used for the Hero `h1`. A separate page-level shell would split backgrounds (plain page area above the organism tint/backdrop); projecting the H1 into the organism via a slot keeps one continuous background. No spec forbids organism slots (`organism-decomposition` constrains molecule edges, not Astro projection). The organism owns its H2, anchor targets (`#contacto`, `#contacto-formulario`), and all conversion copy.

## Goals / Non-Goals

**Goals:**
- `/contact` opens with a single branded H1 (`Contáctanos`) in canonical `SectionHeader` style, rendered **inside** the `ContactSection` over its shared tint/backdrop background — no redundant phone/email paragraph, no split plain shell.
- Phone/email remain reachable on `/contact` via header + footer `ContactLinks` (no channel loss).
- `/` output byte-identical (slot empty there).
- Spec and code agree after the change (scenario rewritten, not silently violated).

**Non-Goals:**
- No `ContactSection` composition/copy/anchor/atom changes — the only organism edit is the optional slot outlet.
- No `SectionHeader` molecule edits — consume the existing `level="h1"` string-title API as-is.
- No `ContactLinks` / `PrimaryNav` / `FooterMeta` / `site-config` edits.
- No landing (`/`) changes; no new components, tokens, or dependencies.
- No SEO copy changes (`PageSEO` title/meta stay); no section-shell class changes (`about.astro` wrapper precedent kept).

## Decisions

### 1. Branded H1 via `SectionHeader level="h1" title="Contáctanos"` (plain string, no slot)
`<SectionHeader level="h1" title="Contáctanos" />` renders the locked `SECTION_TITLE_CORE` (Montserrat display scale, `text-on-surface` token) with zero bespoke classes — exactly the `section-heading-typography` contract (string titles get canonical style; the `title` slot is reserved for inline markup, which a single plain word does not need). Alternatives rejected: bare `<h1>` with hand-copied classes (duplicates the core, violates single-source-of-truth, reintroduces the unstyled-`h1` problem); `title` slot with gradient span (unjustified decoration on a page-label heading — the organism H2 already carries the gradient voice); new organism wrapper for one heading (overkill per ponytail).

### 2. H1 projected via `page-title` slot (not a prop, not a separate shell)
The organism gains an optional outlet above its in-flow header, rendered only when provided (`Astro.slots.has("page-title")` guard with an organism-owned spacing wrapper) — page owns heading content, organism owns background and placement, standard Astro projection keeps them decoupled. The page drops its separate `<section>` shell entirely and passes `<SectionHeader level="h1" title="Contáctanos" slot="page-title" />`. Alternatives rejected: `pageTitle` string prop on the organism (locks heading implementation inside the organism, less flexible for zero gain); keeping the separate page-level shell (splits backgrounds — plain page area above the tint/backdrop — the exact problem this follow-up removes).

### 3. Swap page imports: drop `NavLink` / `PHONES` / `EMAIL`, keep `SectionHeader`
After the replacement nothing references the old imports; leaving dead imports fails the `rg "^import"` cleanliness bar. Kept imports: `Layout`, `PageSEO`, `ContactSection`, `SectionHeader` (instantiated by the page, projected into the organism). First page→molecule import in the repo — permitted (tier rules constrain component inter-imports; pages compose) and recorded in the dependency map.

### 4. Spec delta is MODIFIED, not REMOVED
The "Contact page reuse" scenario survives — `/contact` must still render the organism with identical composition and a single `ContactForm` island, now with the branded H1 projected inside it via the `page-title` slot (slot empty on `/`). A `REMOVED Requirements` delta would wrongly imply `/contact` no longer has a contact section. No `section-heading-typography` delta: the change is a covered API use, not a new style.

### 5. `contact-channels` spec needs no delta
Its `/contact`-page clause is satisfied by shell `ContactLinks` (header + footer render on `/contact` through `<Layout>`). The removed paragraph is not a `ContactLinks` instance (raw `NavLink`s in `contact.astro`), so no spec-pinned instance is deleted. The apply task includes a verification step (phone/email links still present in rendered `/contact` HTML via shell) rather than a spec edit. If verification fails, the change blocks and this decision is revisited.

### 6. Component-dependencies update is part of the change, not follow-up
Per project Definition of Done, the `contact.astro` per-page tree drops `NavLink` + `PHONES`/`EMAIL` data edges and records `SectionHeader` slotted into the organism (`ContactSection` gains the `page-title` slot outlet) in the same change — the map must never describe imports that no longer exist, nor miss new edges.
