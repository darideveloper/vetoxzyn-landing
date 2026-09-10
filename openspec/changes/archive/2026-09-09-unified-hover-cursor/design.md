## Context

Tailwind v4 changed `<button>` to `cursor: default` (v3 was `pointer`); the official restore is a base-layer rule. Hover in v4 only fires on `(hover: hover)`, so touch is safe by default. Current site state: `Button` hover-scale vs `FaqItem`/`Checkbox` color-wash vs `.tilt-float` 3D-tilt, each with its own duration/easing; `NavLink` (`NavLink.astro:9`) has zero hover; `Input`/`Textarea` have `focus:` only; `FaqItem details` owns `cursor-pointer` instead of `summary`; `ContactForm` straighten isn't reduced-motion gated. Constraints: vanilla-only atomic hierarchy (`docs/astro-atomic-components.md`), shared hover language must live in `global.css` + existing atoms, no new `ui/` layer; Definition of Done requires a `docs/component-dependencies.md` redraw of affected trees.

## Goals / Non-Goals

**Goals:**
- One duration + one easing token consumed by every hover transition (pressable lift, link underline, static subtle).
- Pointer cursor on every `a`/`button` affordance: single base rule PLUS explicit `cursor-pointer` on `NavLink` and the `Button` anchor branch as a guarantee (per explicit-everywhere decision).
- Keyboard (`focus-visible`), press (`active`), and `disabled` parity for all pressables (kept per trio decision).
- Keep the playful personality (tilt stays as the hero effect), just retimed to the shared tokens.
- Subtle hover voice on every display element (badges, cards, avatars, images, spec cells) WITHOUT pointer — delight without fake affordance.

**Non-Goals:**
- No new motion library, no `@utility` parameter system, no per-component animation variants.
- No label/`htmlFor` rewiring, no form validation changes, no route/SEO/data changes.

## Decisions

- **Tokens in `@theme`, not magic numbers.** `--duration-hover: 250ms` + `--ease-hover` (spring-lite cubic-bezier, settled during implementation by eyeballing tilt vs lift). Alternative: keep per-component durations — rejected, that's the current drift.
- **Cursor in `@layer base` PLUS explicit classes on links.** Base covers `button:not(:disabled), [role="button"]:not(:disabled), summary { cursor: pointer }` + `:disabled { cursor: not-allowed }`; `NavLink` and the `Button` anchor branch additionally carry explicit `cursor-pointer` per the explicit-everywhere decision (belt and suspenders over native `a[href]` pointer). `a[href]` base left native.
- **Three shared classes: `.lift` + `.link` + `.hover-subtle`.** `.lift` = translateY(-2px) + shadow deepen + token transition (buttons, product variant joins it); `.link` = color shift + underline-offset transition (all NavLinks including inline tel/mailto); `.hover-subtle` = whisper lift/shadow/brightness for display containers, token-timed, pointer-free. Container rule: subtle lives on containers (`Badge`, `Eyebrow`, `Card`, `Avatar`, `SpecItem`, `FeatureRow`, `DisclaimerNote`, `ContactMedia`, `DividerImage`) — never on `Icon` glyphs or inner `ResponsiveImage`, so nested parents never double-animate; layout chrome (`SectionHeader`, `FormulaStrip`, product articles, backdrops, nav chrome) stays motionless. Alternative: Tailwind `@utility` with parameters — deferred until a variant actually needs a parameter (YAGNI).
- **`tilt-float` retimed, not removed.** Keeps `perspective tilt + scale 1.02` personality but swaps its hardcoded `0.4s` for the token; `MediaWithTags` drops its competing `duration-500`. Ambient loops (`image-pan`, `blob-bg`, `float-slow`, `morph`) untouched.
- **Pointer moves `details` → `summary`.** Answer text stops showing a hand; `summary` also gains `focus-visible` ring + marker normalization (`list-none` + `::-webkit-details-marker`).
- **Reduced-motion parity.** `ContactForm hover:rotate-0` moves under `motion-safe:`; base layer adds a global reduce gate mirroring the existing tilt/blob/pan gates.

## Risks / Trade-offs

- [Risk] Token easing that flatters buttons may feel off on the 3D tilt → Mitigation: pick easing against the tilt first (most sensitive), verify lift inherits acceptably; adjust once, not per component.
- [Risk] Subtle hover on static content could suggest clickability → Mitigation: `.hover-subtle` is pointer-free, smaller amplitude than `.lift`, no underline/color-link semantics; verified side-by-side that pressables still read as pressable.
- [Risk] Nested doubles (icon inside an animating row) → Mitigation: container rule — glyphs and inner images never carry motion; closed by removing `.hover-subtle` from `Icon`.
- [Risk] Tilt-vs-subtle cascade is order-dependent on tilted cards → Mitigation: `ponytail:` order comment in `global.css` locks `.tilt-float` after `.hover-subtle`.
- [Risk] Global `:focus-visible` ring clashes with brand pills → Mitigation: single `outline-offset-2` brand-orange ring, reviewed on dark product panel + light hero in one pass.
- [Risk] `.lift` on dark `product` tone washes out shadow → Mitigation: shadow uses color-mixed black/brand alpha, checked on both tones.
- [Trade-off] One duration for all hovers sacrifices per-component tuning → Accepted: unity is the point; ambient loops keep their own clocks.

## Migration Plan

Single deploy, no flags: `global.css` first (tokens + base + classes, backward-compatible), then atom adoption in dependency order (Button → NavLink → Faq/Checkbox/Input/Textarea → ContactForm/MediaWithTags dedupe). Rollback = revert the change branch; no data migration. Verify with `pnpm build` + keyboard tab-through + reduced-motion emulation.
