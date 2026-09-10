## Purpose

Single source of motion truth: shared hover tokens, base-layer cursor/focus/disabled contract, and the unified `.lift` / `.link` / `.hover-subtle` hover language in `src/styles/global.css`.
## Requirements
### Requirement: Shared motion tokens and hover language
`src/styles/global.css` SHALL define `--duration-hover` and `--ease-hover` in `@theme` and provide shared `.lift` (pressables: translate + shadow deepen), `.link` (links: color + underline-offset), and `.hover-subtle` (non-clickable display elements: whisper lift/shadow/brightness, pointer-free) hover classes, all transitions timed to the tokens.

#### Scenario: Single source of motion truth
- **WHEN** any pressable, link, or display element hovers
- **THEN** its transition runs on the shared duration and easing rather than a per-component value

### Requirement: Base-layer cursor plus explicit link guarantee, focus, and disabled contract
`src/styles/global.css` `@layer base` SHALL restore `cursor: pointer` for `button:not(:disabled)`, `[role="button"]:not(:disabled)`, and `summary`; SHALL set `cursor: not-allowed` for `:disabled`; SHALL provide a shared `:focus-visible` ring; and SHALL gate motion under `prefers-reduced-motion` including the contact-panel straighten. `NavLink` and the `Button` anchor branch SHALL additionally carry explicit `cursor-pointer` classes as a guarantee over the native `a[href]` pointer.

#### Scenario: Automatic pointer and keyboard parity
- **WHEN** a button, role-button, link, or FAQ summary receives hover, focus, or disabled state
- **THEN** it shows pointer (or not-allowed when disabled) and a visible focus ring, via base layer plus explicit link classes

### Requirement: Static content gets subtle hover without pointer
`Badge`, `Eyebrow`, `Card`, `Avatar`, `SpecItem`, `FeatureRow`, `DisclaimerNote`, `ContactMedia`, and `DividerImage` SHALL adopt the token-timed `.hover-subtle` voice and SHALL have no `cursor-pointer`, no underline, and no link-color semantics. Container rule: `.hover-subtle` lives on container-level display components only — never on `Icon` glyphs or inner `ResponsiveImage`, so nested parents never double-animate. Layout chrome stays motionless: `SectionHeader`, `FormulaStrip`, `ProductPanel` articles, `ContactBackdrop`/decorative backdrops, and nav chrome (`PrimaryNav`, `ContactLinks`, `FooterMeta`, `FormRow`, `InterestPicker`).

#### Scenario: Delight without fake affordances
- **WHEN** a user hovers a badge, card, avatar, spec cell, feature row, disclaimer note, contact media, or divider image
- **THEN** it responds with a subtle motion whisper that never suggests clickability (tilt-float delight on hero/challenge/testimonial media is the loudest allowed voice, still without pointer; tilt wins over subtle by source order where both match)
