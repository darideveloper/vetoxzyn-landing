## Context

Home page (`src/pages/index.astro`) composes five organisms in fixed order: `Hero` (no section `id`), `Challenges` (`#desafios`), `Testimonials` (`#section-3`), `Products` (`#section-4`), `ContactSection` (`#section-5`). Heading ids (`hero-heading`, `challenges-heading`, `testimonials-heading`, `products-heading`, `contact-heading`) already feed `aria-labelledby` correctly and stay untouched. `ProductPanel` derives `headingId` (`products-topico-title` / `products-instalaciones-title`) — keep as-is.

Anchor consumers are `HeroActions` (`#section-5`, `#section-4`) and `ProductPanel` CTA (`#section-5`). `PrimaryNav` has no anchor links. `ContactSection` renders on both `/` and `/contact` (separate documents, same ids — legal). Form atoms (`Input`, `Textarea`, `Checkbox`) accept a `field` prop for the Zustand store but render no `id`, so `<label>` is unassociated. `FaqAccordion` root has no id; its open-exclusivity script is scoped via `data-faq` (keep that pattern — no ids for JS hooks).

Constraints: vanilla-only atomic hierarchy (`AGENTS.md` — atoms import only `atoms/*`, `store/*`, `lib/*`); token-only palette (no new colors here); `docs/component-dependencies.md` is living DoD and names `#section-3/4/5` in trees + notes; `pnpm run check:palette` + `astro build` must stay green.

## Goals / Non-Goals

**Goals:**
- Every home section has a stable, semantic, ES anchor id; old numbered ids disappear.
- All in-repo `href="#..."` point at the new ids; deep links work on `/` and `/contact`.
- Form controls are label-associated via deterministic `contacto-<field>` ids without breaking the injectable `useField` mock used by `dev-pages/_demos.tsx`.
- Contact sub-regions (`formulario`, `faq`) are directly addressable.

**Non-Goals:**
- No new nav menu / header redesign (adding anchor links to `PrimaryNav` is a separate change).
- No `id` on non-addressable elements (bullets, badges, cards, blobs, dividers).
- No `data-testid` / analytics hooks; no i18n of slugs; no redirects for old anchors.
- No changes to `about.astro` / `contact.astro` intro sections (stay id-less) or dev-only `design-system` ids.

## Decisions

### 1. Slug table (ES, kebab-case) — chosen over numbered ids and over EN slugs
| Section | Before | After |
|---|---|---|
| Hero | ∅ | `inicio` |
| Challenges | `desafios` | `desafios` (unchanged) |
| Testimonials | `section-3` | `testimonios` |
| Products | `section-4` | `productos` |
| Contact | `section-5` | `contacto` |
| Contact form wrapper | ∅ | `contacto-formulario` |
| Contact FAQ root | ∅ | `contacto-faq` |

Rationale: ES matches visible copy and the one existing good id (`desafios`); semantic slugs survive reorder (the failure mode that produced `section-3/4/5` drift). Alternative EN slugs (`hero`, `testimonials`) rejected — user chose ES. Alternative: keep numbers and only add `inicio` — rejected, leaves opaque shareable URLs.

### 2. Single source of truth `src/data/section-ids.ts` (`as const`) — chosen over string literals
Organisms and CTA molecules import ids instead of hardcoding. Mirrors `site-config.ts` precedent. Keeps the rename to one file next time. Alternative (literals everywhere, as today) rejected — that is how drift happened.

### 3. Form `id` strategy: optional `idPrefix` prop + kebab-case derivation
Atoms (`Input`, `Textarea`, `Checkbox`) accept an optional `idPrefix` prop (default `""`). The rendered DOM `id` is derived as `idPrefix` + kebab-case(`field`) (e.g. `field="lineaTopico"` + `idPrefix="contacto-"` → `id="contacto-linea-topico"`), wired to `<label htmlFor>` / `<input id>`. `ContactForm` / `InterestPicker` pass `idPrefix="contacto-"`; store keys stay unprefixed (`name`, `email`, `lineaTopico`, …), so `store/contact.ts` schema is untouched — hence `contacto-name` / `contacto-message` keep the EN fragment (store keys are out of scope). Alternative (call sites passing prefixed `field` strings) rejected — it would change store keys. Alternative (atoms hardcoding `contacto-`) rejected — it would leak page context into shared atoms reused by `_demos.tsx`. Must preserve the injectable `useField` signature so `_demos.tsx` keeps working (demos render unprefixed ids, which is fine — separate document, no collisions).

### 4. `scroll-mt-*` on anchored sections — chosen over JS scroll handling
Sticky header would cover anchor targets; a Tailwind `scroll-mt` utility on each `<section>` fixes it with zero JS. Alternative (scroll-behavior JS / `:target` CSS) rejected — YAGNI.

### 5. Heading ids and `aria-labelledby` untouched; `data-faq` untouched
They already work. No churn.

## Risks / Trade-offs

- [Risk] External references (QR, social, docs) to `#section-3/4/5` break silently → Mitigation: confirmed with user (propose phase) that no external links exist; in-repo search shows only 3 consumers. No redirect mechanism on static build.
- [Risk] `ContactSection` id duplication if ever rendered twice on one page → Mitigation: current usage is once per page (`/` and `/contact` are separate documents); note the constraint in spec, do not add runtime guards (YAGNI).
- [Risk] React island `id` derivation breaks `_demos.tsx` mock → Mitigation: keep `useField(field)` signature; demo store uses same `field` strings; verify dev-only page still renders.
- [Risk] `docs/component-dependencies.md` drift → Mitigation: update per-page trees + notes in the same change (DoD step in tasks).
