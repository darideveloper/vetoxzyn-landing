# Design

## Context

See `proposal.md` for the motivation. The gallery source filenames already encode every presentation volume, but their formats differ: atomizadores end in `ml`, while garrafas include the volume before the brand name. The gallery remains a presentational React island fed by the Astro wrapper.

## Goals / Non-Goals

**Goals:**

- Surface one concise, high-contrast volume label on every gallery slide.
- Keep the label synchronized with image-file names for future asset drops.
- Preserve the existing image alternative text and link behavior.

**Non-Goals:**

- Adding captions, product names, controls, or extra slide interaction.
- Changing Swiper breakpoints, autoplay, image delivery, or the existing palette.

## Decisions

- **Derive the label from the first numeric volume token (`ml` or `L`) in each filename.** This covers both suffix volumes such as `950ml` and embedded volumes such as `Garrafa_23L_Vetoxzyn`; a final-word-only match was rejected because it misses the latter.
- **Render a dark, pointer-free lower-left cintillo inside the existing product plate.** Existing palette tokens keep contrast against both gallery backgrounds. A new atom was rejected because the label only exists inside this gallery's slide composition.
- **Keep the cintillo `aria-hidden`.** The linked product image retains its filename-derived alternative text, so announcing the visual label separately would duplicate the volume for screen-reader users.

## Risks / Trade-offs

- [Risk] A future asset without a volume token renders without a cintillo. → Mitigation: filename convention remains the source of truth and the gallery still renders its accessible image.
- [Risk] An incorrectly named asset shows an incorrect volume. → Mitigation: review the generated label with the gallery asset before publishing.

## Migration Plan

Deploy with the existing gallery assets. Roll back by removing the presentation prop and decorative cintillo; no data migration or dependency change is needed.
