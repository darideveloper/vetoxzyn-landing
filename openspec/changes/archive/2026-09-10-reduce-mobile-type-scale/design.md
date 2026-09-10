## Context

`src/styles/global.css` defines the type system via Tailwind v4 `@theme inline` tokens. Display headings already split mobile/desktop (`text-display-lg-mobile` 32px base, `md:text-display-lg` 64px), but body (`text-body-lg` 18px, `text-body-md` 16px), small text (`text-caption` 12px, `text-label-bold` 14px), and raw Tailwind-scale text (`text-xs`…`text-4xl`) render one size at every viewport. Page text feels oversized on phones; tablet/desktop sizes are settled. Constraints: `@theme inline` bakes values into utilities (runtime `:root` redefinition would not apply), and custom tokens are `px` while Tailwind defaults are `rem`, so a single `html { font-size }` trick cannot move both uniformly.

## Goals / Non-Goals

**Goals:**
- Shrink mobile (`<768px`) type: headings −20%, body/small-text/icons −10%.
- Keep tablet/desktop (`md+`, ≥768px) pixel-identical.
- One-file change in `src/styles/global.css`; zero component edits.

**Non-Goals:**
- Backdrop `text-massive` (`12vw`), line-heights, and spacing are explicitly untouched.
- No new tokens, no responsive `md:` prefix rewrites across components, no `!important`.

## Decisions

- **Per-class `font-size` overrides in one mobile media query, over root `font-size` scaling.** A root rule (`html { font-size: 90% }`) would also shrink every `rem`-based spacing utility (`p-4`, `gap-5`, `mt-4`…) — layout, not just type — while leaving `px` tokens (including all custom `--text-*` and `--spacing-*`) untouched, producing an inconsistent half-scaled result. Per-class overrides touch text only. Trade-off accepted: future text classes need a line added to the block.
- **Unlayered CSS block appended at end of `global.css`.** Tailwind v4 emits utilities in `@layer utilities`; unlayered author CSS wins the cascade, so the overrides apply without `!important`. The query uses `max-width: 767px`, the exact complement of Tailwind's `md` (`min-width: 768px`) — no overlap, no gap. (LightningCSS normalizes it to `(width<=767px)` in the build; equivalent.)
- **Heading list kept narrow: `.text-display-lg-mobile` + `.text-xl`.** `.text-2xl`/`.text-3xl`/`.text-4xl` in this codebase are icon glyphs (`Icon.astro`, quote marks, arrows), so they follow the body −10% rate to stay proportional. `.text-xl` usages (`FeatureRow` h4, `ProductPanel` ORP values) are textual emphasis and take the heading −20%.
- **Inputs scale with body (18px → 16.2px).** Stays above the iOS 16px focus-zoom threshold; exempting them would leave form text visually disconnected from surrounding copy.

## Risks / Trade-offs

- [Risk] New text classes added later won't auto-scale → Mitigation: the block carries a comment stating the rates; eyeball check on device covers regressions.
- [Risk] `caption` at 10.8px approaches readability floor → Mitigation: accepted per scope decision (tiny text follows body); line-heights kept at full px so rhythm stays airy.
- [Risk] `ProductPanel` tagline (`text-body-lg` bold) may still feel loud next to the 25.6px title → Mitigation: flagged as first candidate to reclassify to heading scale if device check says so.
