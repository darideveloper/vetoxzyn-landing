## Why

Link audit found placeholder phone (`tel:+12345678901`), no WhatsApp channel, no Facebook link in the footer despite `SOCIAL_LINKS` data, a misleading "Ver ficha técnica" label with no ficha behind it, and instant anchor jumps with no smooth scrolling. Goal: every marketing CTA lands directly on the contact form (`#contacto-formulario`).

## What Changes

- Replace placeholder phone everywhere with the real company WhatsApp number `+52 1 461 574 7483`: display `+52 1 461 574 7483`, `tel:+5214615747483`, WhatsApp link `https://wa.me/5214615747483`. All visible phone links (header `PrimaryNav` via `ContactLinks`, footer `FooterMeta` via `ContactLinks`, `/contact` page) point to the WhatsApp `wa.me` URL per user decision ("replace all with WA"). Email stays `info@vetoxzyncomercial.mx` / `mailto:` unchanged.
- Keep Facebook (`https://www.facebook.com/vetoxzyn`), drop Instagram from all rendered surfaces and remove the `instagram` key from `SOCIAL_LINKS`. Add a Facebook logo link in the footer (`FooterMeta`) with `target="_blank" rel="noopener"`, accessible label, opening in a new tab.
- Rename both `ProductPanel` CTAs from "Ver ficha técnica" to "Más información" and retarget them to `#contacto-formulario` (no new ficha routes). Hero primary CTA "Cotiza para tu clínica" also targets `#contacto-formulario` — every marketing click lands directly on the form.
- Explicit exemption: hero secondary CTA "Ver línea Tópico" stays on `#productos` (the only path to the product lines besides manual scroll). Nav links (logo, About, Contact, 404) and external links (WhatsApp, email, Facebook) are excluded by nature — retargeting them would break navigation or is impossible for off-site destinations.
- Add global smooth scrolling for in-page anchors (`scroll-behavior: smooth` on `html`, honoring `prefers-reduced-motion`), keeping sticky-header offsets — including a new `scroll-mt` on the `#contacto-formulario` wrapper, which currently has none.
- Menu dummy-page check: `/`, `/about`, `/contact` routes already exist and every menu/404 `NavLink` resolves — no new dummy pages are created. (`/about` body copy stays a placeholder; out of scope.) Google Maps stays ignored (no embed/link in this change).

## Capabilities

### New Capabilities
- `contact-channels`: WhatsApp as the single phone channel (display, `tel:`, `wa.me`) rendered via `ContactLinks` in header/footer/contact page, plus Facebook logo link in the footer (new tab, dropped Instagram).
- `smooth-scrolling`: global smooth anchor scrolling with reduced-motion parity.

### Modified Capabilities
- `site-config-data`: `PHONES.main` becomes the real WhatsApp identity; `SOCIAL_LINKS` keeps facebook only (instagram removed); SEO `social` bundle follows.
- `products-section`: both `ProductPanel` CTA labels change to "Más información" and targets move to `#contacto-formulario` (supersedes the `section-anchors` "CTAs link to `#contacto`" rule for these CTAs).

## Impact

- `src/data/site-config.ts` (phone + socials), `src/components/atoms/NavLink.astro` (`target`/`rel` passthrough), `src/components/molecules/ContactLinks.astro`, `src/components/molecules/FooterMeta.astro`, `src/components/molecules/HeroActions.astro` (primary CTA target), `src/components/molecules/ProductPanel.astro` (label + target), `src/components/molecules/ContactForm.tsx` (`scroll-mt` on form wrapper), `src/styles/global.css` (smooth scroll + reduced-motion).
- No new routes, no API changes, no Google Maps work. `astro build` + `pnpm run check:palette` stay green.
