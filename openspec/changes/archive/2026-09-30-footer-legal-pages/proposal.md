## Why

The footer contains two dead texts (`Contacto`, `Canal comercial` render as plain `<span>` with no destination), there is no cookie policy or terms page despite Meta/GA tracking, and the contact island collects leads with no consent gate. (`/aviso-de-privacidad` is client-provided and stays frozen.) For a lead-capture sales channel this erodes trust and leaves consent handling inconsistent.

## What Changes

- `FooterMeta`: convert `Contacto` and `Canal comercial` spans to `NavLink href="/contact"`; add `NavLink`s to `/politica-de-cookies` and `/terminos`; render the company line as a `NavLink` to `wa.me` (`target="_blank" rel="noopener"`); keep `Aviso de Privacidad → /aviso-de-privacidad`. Responsive refinement: centered mobile stack → `sm` row, grouped `·` separators (never lead a wrapped line), `py-1` touch targets, semibold phone, Montserrat wordmark, page container alignment, token top border.
- `/aviso-de-privacidad` stays byte-identical (client-provided copy, frozen — no rewrite, no date change).
- New route `/politica-de-cookies` (necessary + Google Fonts active; Meta/GA worded as planned/upcoming; localStorage/sessionStorage keys; opt-out; contact) following the existing aviso page pattern (`data/*.md` + `Markdown` + `PageSEO`). Publishes without counsel review (template-grade).
- New route `/terminos` (light template for a non-transactional channel: purpose, acceptable use, IP, liability + professional-criterion referral, contact, changes, date).
- `ContactForm` island: blocking privacy-consent checkbox with links to aviso/cookies; submit blocked by validation until accepted (button `disabled` only while loading, unchanged).
- Align `src/data/site-config.ts` contact block (phones, email, address) with the aviso identity so JSON-LD/SEO stop contradicting the legal text.

## Capabilities

### New Capabilities

- `legal-pages`: content, routes, and SEO for `/politica-de-cookies` and `/terminos` (contact data mirrors the frozen aviso identity). `/aviso-de-privacidad` is explicitly out of scope (client-provided, unchanged).
- `footer-legal-links`: footer composition with six working links (WhatsApp channel, contact, commercial channel, privacy, cookies, terms).
- `form-privacy-consent`: blocking consent checkbox in the contact island with links to the legal pages.

### Modified Capabilities

- `site-config-data`: business identity (phones, email, address) aligns with the aviso identity instead of the current operational values.
- `contact-channels`: footer channel composition changes (contact links become `/contact` NavLinks alongside WhatsApp/Facebook requirements).

## Impact

- Files: `src/components/molecules/FooterMeta.astro`, new `src/data/cookies-policy.md` + `src/data/terms.md`, new `src/pages/politica-de-cookies.astro` + `src/pages/terminos.astro`, `src/components/molecules/ContactForm.tsx`, `src/components/atoms/Checkbox.tsx` (label widening), `src/store/contact.ts` (consent field + schema), `src/data/site-config.ts`, `docs/component-dependencies.md`.
- No new dependencies; no API changes (lead endpoint untouched, generic processor wording).
- **BREAKING**: form submit now requires consent acceptance; `site-config-data` identity values change (phone/email/address), affecting JSON-LD and any consumer of those tokens.
