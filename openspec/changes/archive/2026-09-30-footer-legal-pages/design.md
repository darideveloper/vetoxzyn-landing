## Context

`FooterMeta.astro` renders two dead `<span>` texts and one working privacy `NavLink`; `/aviso-de-privacidad` is client-provided copy and stays frozen (its field list and cookie reference are untouched by design). The contact island (`ContactForm.tsx`) submits a whitelisted field set with no consent gate. Existing specs pin the old identity values (`site-config-data`: `info@` + 461 number; `contact-channels`: WhatsApp 461 channel), so those need delta specs. Constraints: Spanish-first copy, token-only palette, vanilla atomic hierarchy, `.link`/token-timed interaction voice, `docs/component-dependencies.md` as DoD.

## Goals / Non-Goals

**Goals:**

- Six working footer links in a responsive composition: centered mobile stack → `sm` row (`justify-between`), grouped separators, shared page container (`max-w-max-width`, `px-gutter`), token top border — all with existing tokens/classes, no new CSS, footer motionless per nav-chrome rule.
- Leave `/aviso-de-privacidad` byte-identical (client-provided, frozen).
- Two new static legal routes reusing the aviso page pattern (`data/*.md?raw` + `Markdown` + `PageSEO`, `lang="es"`), with contact data mirroring the aviso identity.
- Blocking consent in the contact island without leaking the consent flag to the lead endpoint.
- Single identity source: `site-config.ts` aligned to the aviso values.

**Non-Goals:**

- No cookie-consent banner (explicitly deferred by stakeholder).
- No terms for online sales (no checkout exists); `/terminos` is a light channel-use template.
- No backend/endpoint changes; processor wording stays generic.
- No legal-validity certification — counsel review assumed out of band.

## Decisions

- **Reuse `NavLink` for all footer links** over raw `<a>`: keeps the shared `.link` voice, focus ring, and cursor rules with zero new CSS. Same-tab navigation for internal pages; the phone link uses `target="_blank" rel="noopener"` per the `contact-channels` new-tab rule.
- **Mirror `aviso-de-privacidad.astro` for the two new pages** over a new layout: one section (`max-w-4xl`), `Markdown` content from `src/data/*.md?raw`, `PageSEO` with `currentPage` keys (`cookies`, `terms`). Alternatives (MDX pages, CMS) rejected as over-engineering for static legal text.
- **Widen `Checkbox` `label: string` → `React.ReactNode`** (backwards compatible) over building a bespoke consent row: the atom already binds to the store via `useField(field)` and carries the F2 pill styling; a node label allows inline links to `/aviso-de-privacidad` and `/politica-de-cookies`. New store field `aceptaAviso` with a `z.literal(true)`-style rule so `validateAll()` blocks submit automatically and the existing error UI surfaces it.
- **Strip `aceptaAviso` from the POST payload and from persist**: `handleSubmit` destructures an explicit allow-list (unchanged shape), and `partialize` omits consent so `localStorage` holds only lead data and returning visitors re-confirm.
- **Identity flows aviso → `site-config.ts`, not the reverse**: the aviso holds the verified legal identity (GRUPO HOCLIVA SAS, Minatitlán, gmail, 922); the config placeholders (`123 Main St`, `info@`, 461) are marked TODO-replace upstream. This flips `site-config-data`/`contact-channels` values, hence delta specs.

## Risks / Trade-offs

- [Risk] Changing `PHONES`/`EMAIL` breaks WhatsApp/Facebook expectations pinned in `contact-channels` → Mitigation: delta specs in this change; verify `wa.me`/`tel:`/`mailto:` shapes render and open correctly.
- [Risk] Consent checkbox desyncs from persisted store or blocks resubmission after `reset()` → Mitigation: `aceptaAviso: false` in `initialState`, excluded from persist, covered by `reset()`; scenario-tested.
- [Risk] Frozen aviso keeps its field-list mismatch and "si aplica" cookie wording (client copy) → Mitigation: accepted by stakeholder; new pages mirror the aviso identity but make no claims about the aviso; consent links to the aviso as-is.
- [Risk] New legal text still template-grade (processors generic, no counsel sign-off — stakeholder confirmed no lawyer review) → Mitigation: copy flagged as template-grade in `terms.md`/cookies front-matter note; `Última actualización` set at implementation time; Meta/GA worded as planned, never as active, until deployed.
- [Risk] Footer wraps awkwardly on mobile with six links → Mitigation: centered stack, grouped separators (never lead a line), `flex-wrap` + row gaps; 360px visual check deferred to stakeholder on dev server.
- [Risk] `GOOGLE_MAPS` (`0.0, 0.0`) and `BUSINESS_HOURS` placeholders keep feeding JSON-LD after identity alignment → Mitigation: out of scope for this change; flagged for a follow-up identity pass, and legal copy SHALL NOT cite coordinates or hours.
