## Why

The project defines a central color palette in `src/styles/global.css` (`@theme`), but the atom layer — the most-reused components — bypasses it with hard-coded hexes (`bg-[#fd530a]`), raw neutrals (`white`, `black`, `gray-*`, `red-*`), and duplicated shadow values. Every future change risks inventing new one-off colors instead of reusing the brand system. This change makes the palette the single source of truth, prunes dead tokens, and gives agents an enforceable rule plus a local check command.

## What Changes

- Prune `src/styles/global.css` `@theme`: delete 5 zero-usage tokens (`--color-brand-500`, `--color-inverse-on-surface`, `--color-on-secondary-container`, `--color-on-tertiary-fixed`, `--color-on-tertiary-fixed-variant`); fold `--color-primary-fixed-dim` (single hero-blob usage) into `--color-secondary-fixed`; add one `--color-error` token replacing `red-500` error states; add two `--shadow-card-*` tokens replacing hard-coded black `rgba()` shadows.
- Full sweep of `src/components/**`, `src/pages/**`, `src/layouts/**`: every hex arbitrary value (`#[…]`), `rgba()/rgb()/oklch()/hsl()` literal, raw neutral utility (`white`, `black`, `gray-*`, `red-*`, `slate-*`, `zinc-*`, `neutral-*`), and gradient-with-hex becomes a palette-token utility. `white` maps to `on-primary` (pixel-identical), `black/80–90` to `inverse-surface`, hairline `gray-100` to `surface-container-highest`, muted light-bg text to `on-surface-variant`, muted dark-bg text to `on-primary` / `secondary-container` per context, glass whites to the existing `glass-border` token / `surface-ice` with opacity.
- Fix dead typography classes in `molecules/FaqAccordion.astro` (`font-headline-sm text-headline-sm` have no matching `@theme` tokens): remap to the existing type scale.
- Add advisory local guardrail `pnpm run check:palette` (ripgrep-based, zero new dependencies, non-blocking) that fails loudly on banned color patterns in component/page/layout sources.
- Add a mandatory "Styling / palette" section to `AGENTS.md` plus extend the Component Dependency Map Definition of Done; add `docs/design-tokens.md` as the living token reference (token → hex → allowed usage).
- No visual redesign: all swaps are value-identical except the `primary-fixed-dim` → `secondary-fixed` hero blob (blurred, 30% opacity — imperceptible) and the new error-token hex.

## Capabilities

### New Capabilities

- `central-palette`: Single-source color governance — token inventory rules (add-token-first, no new CSS color sources), the banned-pattern list, the advisory `check:palette` command contract, and the agent-facing palette law.

### Modified Capabilities

- `global-atoms`: Atom styling REQUIREMENTS change — atoms SHALL consume only palette-token utilities (plus `transparent`/`currentColor`/opacity modifiers) instead of hard-coded hex/neutral values. Token additions/removals listed above change the atom color contract.

## Impact

- Affected code: `src/styles/global.css`; all files under `src/components/**` using hard-coded colors (atoms `Button`, `Icon`, `Badge`, `Card`, `Eyebrow`, `Input`, `Textarea`, `Checkbox`, `SpecItem`; molecules `TestimonialCard`, `MediaWithTags`, `FormulaStrip`, `FaqItem`, `ProductPanel`, `ContactForm` islands; organisms `Testimonials`, `Challenges`; `src/pages/design-system.astro` and other pages; layouts as needed); `AGENTS.md`; `docs/component-dependencies.md` (DoD update touch); new `docs/design-tokens.md`; `package.json` scripts.
- No API, dependency, or deployment changes. No new runtime packages. No dark-mode support added (explicit non-goal — `@theme inline` stays).
