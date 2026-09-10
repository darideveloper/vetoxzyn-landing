# Contact images (placeholder)

Source: temporary reuse of `src/assets/products/topico-*.webp`
(Stitch product placeholder) so the `05-contact-form` disclaimer layer builds
and ships with zero external hotlinks.

- `contact-clinica-512.webp` / `contact-clinica-384.webp` → disclaimer layer visual

Status: placeholder. TODO(replace) with real brand contact art when it lands
(then re-export at 1024+ widths and update `organisms/ContactSection.astro`
widths+sizes). Original Stitch `05-contact-form` art was a `googleusercontent`
hotlink — do NOT reintroduce it; keep all imagery local via
`astro:assets Image`.
