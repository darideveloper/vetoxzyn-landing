## Why

Hover, focus, and cursor feedback is scattered across three dialects (scale / color-wash / 3D-tilt) with different durations and easings, while `NavLink` has no hover at all and Tailwind v4 renders `<button>` with `cursor: default`. The site feels un-unified and keyboard/touch users get no interaction equivalent. Decided direction: keep the playful personality, fix cursor via a base layer.

## What Changes

- Add motion tokens (`--duration-hover`, `--ease-hover`) to `src/styles/global.css` `@theme` and re-time all hover transitions to them (buttons, FAQ, checkbox, tilt-float, product image, contact panel).
- Add one `@layer base` block in `global.css`: `cursor: pointer` restore for `button:not(:disabled)`, `[role="button"]`, and `summary`; `cursor: not-allowed` for `:disabled`; shared `:focus-visible` ring; `details summary` marker normalization. Per your explicit-everywhere decision, `NavLink` and the `Button` anchor branch ALSO carry an explicit `cursor-pointer` class (redundant with native `a[href]` pointer, kept as a guarantee).
- Add three shared hover classes in `global.css`: `.lift` (pressables: buttons — translate + shadow), `.link` (NavLink: color + underline-offset transition), and `.hover-subtle` (display containers: `Badge`, `Eyebrow`, `Card`, `Avatar`, `SpecItem`, `FeatureRow`, `DisclaimerNote`, `ContactMedia`, `DividerImage` — token-timed whisper, never pointer; container rule keeps `Icon` glyphs and inner images motionless so parents never double-animate; layout chrome stays still). Atoms adopt them instead of copy-pasted utilities.
- Move `cursor-pointer` off `FaqItem` `<details>` onto `<summary>`; add `hover:border-*` to `Input`/`Textarea`; add `active:scale` + `disabled:` states to `Button`; add `hover:underline` affordance to inline `tel:`/`mailto:` links via `.link`.
- Gate `ContactForm` `hover:rotate-0` under `motion-safe:` / `prefers-reduced-motion` parity with the existing tilt/blob/image-pan gates.
- Pointer only on clickables (`Button` button+a, `NavLink` a, `summary`, checkbox label+input); every other element gets the subtle hover voice with NO pointer, so delight never fakes clickability.

## Capabilities

### New Capabilities
- `interaction-feedback`: motion tokens, base-layer cursor/focus/disabled rules, and the shared `.lift` / `.link` / `.hover-subtle` hover language in `global.css` — the single source of motion truth all atoms consume.

### Modified Capabilities
- `global-atoms`: Button gains pointer/active/focus/disabled + token-timed hover (product variant joins the lift language, anchor branch gains explicit `cursor-pointer`); NavLink gains the `.link` hover/focus contract plus explicit `cursor-pointer`; Input/Textarea gain hover-border + focus-ring parity; Checkbox input gains pointer; FaqItem summary owns pointer/focus (details loses pointer); display atoms (`Badge`, `Eyebrow`, `Card`, `Avatar`, `SpecItem`) plus display molecules (`FeatureRow`, `DisclaimerNote`, `ContactMedia`, `DividerImage`) adopt pointer-free `.hover-subtle` (`Icon` deliberately motionless per container rule).

## Impact

- Touched: `src/styles/global.css` (tokens, base, 3 classes), `src/components/atoms/Button.tsx`, `src/components/atoms/NavLink.astro`, `src/components/atoms/Input.tsx`, `src/components/atoms/Textarea.tsx`, `src/components/atoms/Checkbox.tsx`, `src/components/molecules/FaqItem.astro`, `src/components/molecules/ContactForm.tsx`, `src/components/molecules/MediaWithTags.astro` (transition dedupe), display adopters of `.hover-subtle` (`Badge`, `Eyebrow`, `Card`, `Avatar`, `SpecItem`, `FeatureRow`, `DisclaimerNote`, `ContactMedia`, `DividerImage`).
- No new dependencies, no new component layer (vanilla-only preserved), no route or data changes.
- Visual: hover becomes consistent (one duration/easing across pressable lift, link underline, and static subtle voices); every `a`/`button` shows pointer (native + explicit guarantee); keyboard users gain visible focus; reduced-motion users lose the panel straighten.
