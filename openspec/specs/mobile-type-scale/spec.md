## Purpose

Mobile-only type scale below the md breakpoint: reduced font sizes under 768px, tablet/desktop rendering unchanged.

## Requirements

### Requirement: Mobile-only type scale below md breakpoint

The system SHALL render reduced font sizes on viewports below 768px via a single `@media (max-width: 767px)` block in `src/styles/global.css`, leaving tablet/desktop (`md+`) rendering identical: headings at −20% (`text-display-lg-mobile` 32px → 25.6px, `text-xl` 20px → 16px) and body, small UI text, and icon glyphs at −10% (`text-body-lg` 18px → 16.2px, `text-body-md` 16px → 14.4px, `text-caption` 12px → 10.8px, `text-label-bold` 14px → 12.6px, `text-xs`/`text-sm`/`text-base`/`text-lg`, `text-2xl`/`text-3xl`/`text-4xl`, `text-[16px]`).

#### Scenario: Mobile body copy is smaller
- **WHEN** a page renders below 768px width
- **THEN** `text-body-lg` computes to 16.2px and `text-body-md` to 14.4px

#### Scenario: Mobile headings shrink more than body
- **WHEN** a page renders below 768px width
- **THEN** `text-display-lg-mobile` computes to 25.6px and `text-xl` to 16px

#### Scenario: Mobile small UI text follows body rate
- **WHEN** a page renders below 768px width
- **THEN** `text-caption` computes to 10.8px, `text-label-bold` to 12.6px, and `text-xs`/`text-sm` likewise

#### Scenario: Mobile icon glyphs follow body rate
- **WHEN** a page renders below 768px width
- **THEN** `text-2xl`/`text-3xl`/`text-4xl` and `text-[16px]` compute to their −10% sizes (21.6px, 27px, 32.4px, 14.4px)

#### Scenario: Desktop rendering is unchanged
- **WHEN** a page renders at 768px width or wider
- **THEN** every text utility computes to its pre-change size (e.g. `md:text-display-lg` 64px, `text-body-lg` 18px)

### Requirement: Mobile scale scope boundaries

The system SHALL exclude the decorative backdrop, line-heights, and spacing from the mobile scale: `text-massive` stays `12vw`, all `--text-*--line-height` values stay at their current px/unitless values, and no spacing utility changes.

#### Scenario: Backdrop unaffected on mobile
- **WHEN** the contact backdrop renders below 768px width
- **THEN** the `BIOSEGURIDAD` text still computes from `12vw`

#### Scenario: Inputs stay above iOS zoom threshold
- **WHEN** form inputs render below 768px width
- **THEN** their text computes to 16.2px (at or above 16px, no iOS focus zoom)
