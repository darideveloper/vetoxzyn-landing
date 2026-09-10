## 1. Token inventory finalization (`src/styles/global.css`)

- [x] 1.1 Delete 5 dead tokens (`--color-brand-500`, `--color-inverse-on-surface`, `--color-on-secondary-container`, `--color-on-tertiary-fixed`, `--color-on-tertiary-fixed-variant`) and verify no references remain via `rg`
- [x] 1.2 Fold `--color-primary-fixed-dim` into `--color-secondary-fixed` (Hero blob usage) and add `--color-error: #b3261e` plus `--shadow-card` / `--shadow-media` tokens verbatim from existing hard-coded shadows
- [x] 1.3 Run `astro build` to confirm the token edit compiles before any consumer changes

## 2. Atoms sweep (highest reuse first)

- [x] 2.1 Migrate `atoms/Button.tsx` to tokens (`bg-brand-orange`, `text-primary`, `border-primary`, `bg-secondary`, `text-on-primary`, `shadow-ambient`; product tones via `secondary`/`on-primary`)
- [x] 2.2 Migrate `atoms/Icon.astro` tones to tokens (`text-brand-pink`, `bg-secondary-fixed/40`, `text-brand-orange`, `text-primary`, `text-tertiary-fixed-dim`)
- [x] 2.3 Migrate `atoms/Badge.astro`, `atoms/Card.astro`, `atoms/Eyebrow.astro` to tokens (`surface-ice`, `glass-border`, `inverse-surface`, `on-primary`, `surface-container-highest`, `shadow-ambient`)
- [x] 2.4 Migrate `atoms/Input.tsx`, `atoms/Textarea.tsx`, `atoms/Checkbox.tsx` to tokens (labels/borders → `on-surface`/`on-surface-variant`, focus/accent → `brand-orange`, errors → `error`, glass fills → `surface-ice`/`glass-border`)
- [x] 2.5 Migrate remaining atoms (`SpecItem.astro`, `Avatar.astro` border, any other `white`/`gray` stragglers) and build

## 3. Molecules / organisms / pages sweep

- [x] 3.1 Migrate molecules (`TestimonialCard` green bar → `tertiary-fixed-dim`; `MediaWithTags` card/shadow/overlay; `FormulaStrip` black/gray → `inverse-surface`/`on-primary`/`on-surface-variant`; `ProductPanel` whites/grays/gradients; `FaqItem`, form islands, others)
- [x] 3.2 Remap dead `font-headline-sm text-headline-sm` in `FaqAccordion.astro` to `font-body-lg text-body-lg font-bold`
- [x] 3.3 Migrate organisms and pages (`Testimonials` `#f3f3f7` → `surface-container-highest/50`; `Challenges` card/shadow; `ContactSection` subtree leftovers; `design-system.astro` demo grays/blacks; `about`/`contact`/`404` as needed)
- [x] 3.4 Full verification: raw banned-pattern `rg` over `src/components src/pages src/layouts` reports zero matches (excluding accepted `Hero.astro` animation-delay line), `astro build` green, viewport spot-checks at 390/768/1280 with explicit eyeball on hero blob fold and error-token states

## 4. Governance: command, agent law, living docs

- [x] 4.1 Add `check:palette` script to `package.json` (single `rg` invocation over `src/components src/pages src/layouts` with banned patterns; non-zero exit + file:line output; document the `Hero.astro` animation-delay exception)
- [x] 4.2 Add mandatory "Styling / palette" section to `AGENTS.md` (sole source, token-only consumption, banned list, add-token-first, verification step) and extend the Component Dependency Map DoD in `AGENTS.md` + `docs/component-dependencies.md` Notes
- [x] 4.3 Create `docs/design-tokens.md` (token → hex → allowed-usage table, final ~17 colors + 2 shadow tokens) and update `docs/component-dependencies.md` per DoD (re-run the three `rg` commands, redraw affected trees)
- [x] 4.4 Final gate: `check:palette` clean, `astro build` green, dependency map in sync — then ready for `/opsx-apply` review
