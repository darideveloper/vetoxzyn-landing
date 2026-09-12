## 1. Business data (site-config)

- [x] 1.1 Update `PHONES.main` to WhatsApp identity (`raw +5214615747483`, `formatted +52 1 461 574 7483`, `href tel:+5214615747483`, `wa https://wa.me/5214615747483`)
- [x] 1.2 Remove `instagram` from `SOCIAL_LINKS`, keep facebook URL unchanged

## 2. Contact channels UI

- [x] 2.1 Extend `NavLink.astro` with optional `target`/`rel` passthrough (defaults preserve current behavior)
- [x] 2.2 Point `ContactLinks.astro` phone link at `PHONES.main.wa` (`target=_blank rel=noopener`), email unchanged
- [x] 2.3 Add Facebook logo link in `FooterMeta.astro` (`target=_blank rel=noopener`, `aria-label`, token-only classes, no new CSS file)

## 3. Product CTA labels + form-depth retarget

- [x] 3.1 Rename both `ProductPanel.astro` CTAs to "Más información" and point them at `#contacto-formulario` (`SECTION_IDS.contactoFormulario`)
- [x] 3.2 Point `HeroActions.astro` primary CTA ("Cotiza para tu clínica") at `#contacto-formulario`; "Ver línea Tópico" stays on `#productos` (exemption)
- [x] 3.3 Add `scroll-mt-20` to the `#contacto-formulario` wrapper div in `ContactForm.tsx` (sticky-header offset for direct form jumps)

## 4. Smooth scrolling

- [x] 4.1 Add `scroll-behavior: smooth` on `html` + `prefers-reduced-motion` override in `src/styles/global.css` (tokens/shared classes untouched)

## 5. Verify (Definition of Done)

- [x] 5.1 `rg "12345678901|instagram|Ver ficha técnica" src/` returns empty; every marketing `Button href` resolves to `#contacto-formulario` except "Ver línea Tópico" (`#productos`); menu/404 links re-checked
- [x] 5.2 `pnpm run check:palette` clean + `astro build` green
- [x] 5.3 Update `docs/component-dependencies.md` per AGENTS.md (rg imports/files, redraw affected trees)
