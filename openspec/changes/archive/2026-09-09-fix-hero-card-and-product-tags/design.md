## Context

The Stitch mockups were ported verbatim into `src/styles/global.css`, including a spacing scale (`--spacing-xs/sm/md/lg/xl` = 4/12/24/48/80px) used pervasively as `gap-md`, `p-sm`, `mt-lg`, etc. In Tailwind v4 that scale also resolves `max-w-xs/sm/md/lg/xl`, so six call sites silently compiled to pixel caps (`max-w-md` → 24px). The hero card collapsed to 24×30px; the Products header copy and both HUD cards were capped the same way. Separately, the Products vertical pills were absolutely centered on the full-height `article`, leaving a ~2px gap to the HUD card and overlapping the title text at stacked tablet widths. Constraints: vanilla-only atoms, no new dependencies, class-level fixes preferred.

## Goals / Non-Goals

**Goals:**
- Hero visual card renders at its designed 28rem cap, image filling it, at all viewports.
- Vertical pills sit bottom-aligned beside their HUD card with a clear gap, never overlapping title text, at every size where they are visible (≥640px).
- A standing guardrail so the token collision cannot recur.

**Non-Goals:**
- New brand imagery (the 512px Stitch placeholder stays; retina softness is accepted until brand art lands).
- Renaming the Stitch spacing scale (dozens of valid usages depend on it).
- Any atom API change (`Badge`, `Button` untouched).

## Decisions

- **Explicit arbitrary widths over theme-level repair.** Adding `--container-xs…xl` (Tailwind defaults) was tried first and verified ineffective: Tailwind 4.3.3 still resolves `max-w-md` from `--spacing-md` (build output kept `max-width:24px`, the new vars tree-shaken). Renaming `--spacing-*` would churn every `gap-/p-/m-` usage. Seven call-site swaps to `max-w-[24/28/32rem]` are the smallest correct diff.
- **`sm:ml-md` / `sm:mr-md` on the HUD cards, no `lg:` reset.** The 2px near-touch exists on desktop halves too (identical geometry), so scoping to `max-lg` would preserve the bug on desktop with a larger diff. `sm:` scoping leaves phones (pills hidden) untouched.
- **Reparent pills into the content column + `bottom-lg`.** First attempt (`bottom-lg` on the `article`) landed the pill 228px below the card in the flex-centering void. The content column is `relative`, so anchoring there puts the pill bottom 24px under the card's bottom edge, alongside the card's lower half and 174px+ clear of the title.
- **Comment, not config, as guardrail.** A warning on the spacing scale (`never use bare max-w-xs/sm/md/lg/xl`) — a lint rule or token rename is heavier than the risk warrants.

## Risks / Trade-offs

- [Bare `max-w-*` reuse] → Mitigation: warning comment at the token definition; build-output grep (`max-width:24px|12px|48px`) catches regressions.
- [Placeholder softness on retina persists] → Accepted; tracked for the brand-art swap (then re-export at 1024+ widths).
- [Pill position is viewport-geometry dependent] → Verified by measurement at 390/768/1280px; any future panel-height change should re-measure.
