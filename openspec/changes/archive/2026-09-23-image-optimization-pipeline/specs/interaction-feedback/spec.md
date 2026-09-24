## MODIFIED Requirements

### Requirement: Static content gets subtle hover without pointer

`Badge`, `Eyebrow`, `Card`, `Avatar`, `SpecItem`, `FeatureRow`, `DisclaimerNote`, `ContactMedia`, and `DividerImage` SHALL adopt the token-timed `.hover-subtle` voice and SHALL have no `cursor-pointer`, no underline, and no link-color semantics. Container rule: `.hover-subtle` lives on container-level display components only — never on `Icon` glyphs or inner `ResponsiveImage`, so nested parents never double-animate. `Avatar` SHALL carry `.hover-subtle` on its wrapper element, never on its inner `<img>`. Layout chrome stays motionless: `SectionHeader`, `FormulaStrip`, `ProductPanel` articles, `ContactBackdrop`/decorative backdrops, and nav chrome (`PrimaryNav`, `ContactLinks`, `FooterMeta`, `FormRow`, `InterestPicker`).

#### Scenario: Delight without fake affordances

- **WHEN** a user hovers a badge, card, avatar, spec cell, feature row, disclaimer note, contact media, or divider image
- **THEN** it responds with a subtle motion whisper that never suggests clickability (tilt-float delight on hero/challenge/testimonial media is the loudest allowed voice, still without pointer; tilt wins over subtle by source order where both match)

#### Scenario: Avatar hover lives on wrapper

- **WHEN** `Avatar.astro` renders (`Image` for `ImageMetadata`, plain `<img>` for string fallback)
- **THEN** the wrapper element owns the outer `cls` (caller positioning) plus `.hover-subtle`, and the `<img>` itself keeps only its intrinsic classes with no `.hover-subtle`
