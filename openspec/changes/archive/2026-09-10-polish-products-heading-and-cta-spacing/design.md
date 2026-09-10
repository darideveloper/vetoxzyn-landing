## Context

`organisms/Products.astro` (static, `id="section-4"`) renders two HUD spec panels, each ending in a `Button variant="product"` CTA (`tone="light"` Tópico / `tone="dark"` Instalaciones, both `href="#section-5"`). Three polish defects: the Instalaciones `h3` contains a hardcoded `Instala-<br/>ciones` break (spec text already says `Instalaciones`); each CTA sits flush under its spec `<dl>`; the B4 `product` variant has no horizontal padding. Vanilla-only project: atoms self-contained, no `ui/`, per `docs/astro-atomic-components.md`. Spacing tokens in `src/styles/global.css` (`--spacing-md: 24px` → `mt-md`, etc.).

## Goals / Non-Goals

**Goals:**
- Single-word `Instalaciones` title matching spec copy.
- 24px separation between each HUD spec grid and its CTA.
- 16px horizontal inset inside both product CTAs with unchanged button height.

**Non-Goals:**
- No anchor/copy/imagery/responsive-structure changes; no new atoms, variants, or dependencies.
- No fix for the stale `id="section-3"` in `products-section/spec.md` (implementation uses `section-4` since Testimonials took `section-3`) — recorded as out of scope in the proposal.

## Decisions

- **`mt-md` via `className` on the two CTA instances, not in the atom.** Separation is a Products-layout concern, not part of the reusable B4 definition; `Button.tsx` merges `className` via `cn()`, so no atom change needed. Token `mt-md` reuses `--spacing-md` (24px), consistent with existing `mb-md`/`p-md` usage in the same file.
- **`px-4` in the `product` variant definition, not per-instance.** Horizontal-only padding leaves height untouched (`py-3` + text unchanged); defining it once in `Button.tsx:29` covers both cards and the `design-system` showcase with a one-line diff. Alternative (per-instance `className="px-4"`) duplicated the same value twice — rejected.
- **No `whitespace-nowrap` on the title.** Removing the forced break is enough; natural wrapping still applies on narrow viewports and the responsive spec (no overflow at 390px) stays valid. Forcing no-wrap would risk overflow on small screens.

## Risks / Trade-offs

- [Risk] `Instalaciones` (13 chars) wraps naturally on very narrow viewports → accepted: wrapping is normal text flow, no overflow; explicitly preferred over `nowrap`.
- [Risk] `px-4` also affects the `design-system` showcase rendering of `product` buttons → intended: showcase reflects the canonical B4 definition.
- [Risk] `mt-md` + `px-4` shift HUD card internals by px amounts only → no layout-structure impact; verified by `pnpm run build`.
