## Context

`src/styles/global.css` holds a Tailwind v4 `@theme inline` palette (~22 color tokens, verbatim Stitch hexes plus spacing/type scales) and is the only stylesheet in the project (single import in `Layout.astro`). Organisms and molecules mostly consume token utilities (`bg-surface-ice`, `text-on-surface`, `bg-brand-orange`); the atom layer (`Button`, `Icon`, `Badge`, `Card`, `Eyebrow`, `Input`, `Textarea`, `Checkbox`, `SpecItem`) bypasses it with arbitrary hexes (`bg-[#fd530a]`), raw neutrals (`white`, `black`, `gray-*`, `red-*`), and inline `rgba()` shadows. A usage census (ripgrep over `src/components`, `src/pages`, `src/layouts`) showed: 5 tokens with zero usages, 1 token with a single decorative usage, core tokens (`primary`, `secondary`, `on-primary`) with zero *direct* uses (consumed only as hexes/`white`), one undefined-utility bug (`font-headline-sm text-headline-sm` in `FaqAccordion.astro` has no matching `@theme` tokens), and one untokenized one-off (`#f3f3f7` in `Testimonials.astro`). No dark mode exists and none is wanted, so `@theme inline` (baked values, no runtime `var()` switching) stays. Enforcement today is prose-only; Tailwind v4 cannot reject arbitrary values at build time, so the guardrail must be a lint-style check plus agent law.

## Goals / Non-Goals

**Goals:**
- One token inventory (~17 colors) where every token has at least one consumer and every component color resolves to a token.
- Pixel-identical UI after migration, except two declared deltas: the `primary-fixed-dim` hero blob fold and the new error-token hex.
- Future-proofing: a local advisory command plus `AGENTS.md` law so agents default to tokens without CI friction.

**Non-Goals:**
- No visual redesign, no new color roles, no semantic-alias layer (`action-*`, `danger-*` — deferred as YAGNI).
- No dark mode, no `@theme inline` → `@theme` migration, no `var(--*)` consumption pattern.
- No CI gate / blocking hook — advisory only, per explicit decision.
- No changes to spacing/typography scales except remapping the two dead `headline-sm` classes.

## Decisions

**D1 — Prune 5 dead tokens, fold 1, add 2 net-new (17 total).**
Delete `brand-500` (orphan oklch), `inverse-on-surface`, `on-secondary-container`, `on-tertiary-fixed`, `on-tertiary-fixed-variant` (all zero usages — safe by construction). Fold `primary-fixed-dim` (one blurred 30%-opacity hero blob) into `secondary-fixed`; at that blur/opacity the hue delta is imperceptible and the neighboring blob already uses `secondary-fixed`. Add `--color-error: #b3261e` (Material error red, accessible on light surfaces) for the six `red-500` error states — reusing `primary` would conflate brand with error semantics. Add `--shadow-card` (`0 20px 50px rgba(0,0,0,0.08)`) and `--shadow-media` (`0 30px 60px rgba(0,0,0,0.15)`) verbatim from the two hard-coded black shadows so no `rgba()` remains in components. Alternative (keep dead tokens "just in case") rejected: dead tokens invite speculative use and defeat the single-source goal; re-adding a token later is a one-line change.

**D2 — Neutral mapping: `on-primary` for white, `inverse-surface` for black.**
`white` → `on-primary` (`#ffffff`, pixel-identical, no rebrand hiding in a migration); `bg-black/80–90` → `bg-inverse-surface/80–90`; hairline `border-gray-100` → `border-surface-container-highest`; muted light-bg text (`black/50–70`, `gray-300/400/600` on light) → `on-surface-variant`; dark-bg muted text (`gray-200`, `white` emphasis) → `inverse-on-surface` is deleted, so `on-primary` / `secondary-container` per context; glass whites (`white/30–60` borders/fills) → existing `glass-border` token / `surface-ice` with opacity. Alternative (`surface-ice` for white) rejected: it would warm-shift every white surface — a design decision disguised as cleanup.

**D3 — Keep `@theme inline`, single `global.css`.**
No dark mode means no runtime token switching, so `inline`'s baked values are fine and avoid churn. One stylesheet stays the rule: no per-component color `<style>` blocks, no `style=` colors. The `Icon.astro`/`Badge.astro` font-variation `<style>` blocks are typography, not color, and stay.

**D4 — Guardrail: ripgrep script, advisory, `package.json`-only.**
`pnpm run check:palette` runs a single `rg` invocation with banned patterns (`#[hex]`, `rgba(/rgb(/oklch(/hsl(`, `(bg|text|border|ring|from|via|to)-(white|black|gray-|red-|slate|zinc|neutral)`, `style=` with color) scoped to `src/components src/pages src/layouts`. Zero new dependencies (ponytail: `rg` already the project's search tool). Advisory = non-zero exit with file:line output, run manually/by agents, never a commit hook or CI gate. Alternative (eslint tailwind plugin) rejected: new dependency + config for what a one-liner checks.

**D5 — Enforcement layering: tokens (easy) + command (visible) + `AGENTS.md` law + DoD (binding).**
`AGENTS.md` gets a "Styling / palette" mandatory section beside the vanilla-only rule (agents read it every session); the Component Dependency Map DoD gains a palette-verification step; `docs/design-tokens.md` becomes the human-readable token table so agents don't re-derive mappings. `design-system.astro` stays the visual contract and is included in the sweep (no dev-page carve-out — a simpler rule is a stronger rule).

**D6 — Fix `headline-sm` in passing.**
`FaqAccordion.astro:29` references undefined utilities (silent no-op today). Remap to `font-body-lg text-body-lg font-bold` (closest existing scale for a section heading inside a glass panel). Alternative (add new `headline-sm` tokens) rejected: inventing type scale for one heading contradicts the prune-everything-unused thrust.

**D7 — Sweep order: tokens → atoms → molecules/organisms/pages → governance.**
Token edits land first so consumers have targets; atoms next (highest reuse, smallest files, easiest review); then the long tail; governance artifacts last, packaging the verification as `check:palette`. Phases 1–3 verify with the raw banned-pattern `rg` invocation + `astro build`; phase 4 re-verifies through the packaged command.

## Risks / Trade-offs

- [Risk] White→`on-primary` and glass remaps shift pixels in overlay/blur contexts where stacked translucency is non-obvious → Mitigation: build + viewport spot-checks (390/768/1280) on hero, product panels, contact section; the two declared deltas (blob fold, error hex) get explicit eyeball approval.
- [Risk] `rg` pattern false positives (e.g. `style=` for non-color animation-delay in `Hero.astro`, `transparent` keyword) → Mitigation: allowlist `transparent`/`currentColor`; scope `style=` flag to color properties or accept-list the single known animation-delay line.
- [Risk] Agents ignore advisory output → Mitigation: acceptance is layered — `AGENTS.md` law + DoD checklist carry the weight; the command is evidence, not the lock. Accepted residual risk per explicit "advisory" decision.
- [Risk] Future Stitch imports reintroduce verbatim hexes → Mitigation: token-doc rule "new color → token first with where-used note", enforced at review via the same command.
