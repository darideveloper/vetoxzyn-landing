## ADDED Requirements

### Requirement: Shared GSAP module and wiring

The system SHALL provide an SSR-safe shared module `src/lib/gsap.ts` (plugin registration inside `typeof window !== "undefined"`, `ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })`, `gsap.defaults({ ease: "power4.out", duration: 1.2 })`, `load → ScrollTrigger.refresh()` plus `astro:page-load → ScrollTrigger.refresh()`), and every animated component SHALL import from it in its own `<script>` block (never globally in Layout, never `is:inline`).

#### Scenario: SSR import does not crash

- **WHEN** Astro server-renders a page importing `@/lib/gsap`
- **THEN** no `window` access runs at module top level and the build succeeds

#### Scenario: Scroll positions stay correct after late content and VT navigation

- **WHEN** images/fonts settle or a ClientRouter navigation completes
- **THEN** `ScrollTrigger.refresh()` runs via the `load` / `astro:page-load` handlers

### Requirement: View-Transition-safe lifecycle

Each animated component SHALL follow the canonical VT lifecycle: section-presence guard first, `mm?.revert()` before rebuild, `gsap.matchMedia()` branches, immediate `init()` for first paint, `astro:page-load` re-init, `astro:after-swap` cleanup, and `transition:animate="none"` on the animated section root. `gsap.context()` SHALL NOT be nested inside `matchMedia`.

#### Scenario: No duplicate triggers after navigation

- **WHEN** the user navigates between pages via ClientRouter and returns
- **THEN** stale tweens/triggers are reverted and only one active timeline per visible section exists

#### Scenario: No VT cross-fade flash

- **WHEN** a page with GSAP entrances loads via ClientRouter
- **THEN** animated sections carry `transition:animate="none"` and content does not flash at natural state before animating

### Requirement: SEO-safe reveal base and reduced-motion contract

The system SHALL ship the `.js-reveal` hiding rule plus `.no-js .js-reveal` visible override in `src/styles/global.css`, `<html class="no-js">` with an `is:inline` swap to `js` in `Layout.astro`, and per-section `gsap.matchMedia()` branches (`no-preference` full motion, `reduce` fade-only with no `x`/`y`/`scale` movement). Revealable elements SHALL carry `.js-reveal` (never `opacity-0` alone), and scripts SHALL run `gsap.set(reveals, { autoAlpha: 1 })` before building `.from()` tweens.

#### Scenario: No-JS content stays visible

- **WHEN** JavaScript is disabled in DevTools
- **THEN** all section content renders fully visible and static

#### Scenario: Reduced-motion users get fade-only reveals

- **WHEN** the OS requests reduced motion (or emulation is on)
- **THEN** sections fade in without positional/scale movement and parallax/marquee motion does not run

### Requirement: Token, palette, and motion-language compliance

GSAP markup and styles SHALL consume palette-token utilities only (no hex/`rgba()` literals, no raw neutral utilities, no `style=` color), reuse the shared `--duration-hover`/`--ease-hover` voice and `.lift`/`.link`/`.hover-subtle` classes instead of per-component hover inventions, keep `.hover-subtle` on containers (never glyphs/images), keep layout chrome motionless, honor cursor/focus/disabled contracts, and gate decorative motion with `motion-safe:` / reduced-motion parity. `pnpm run check:palette` SHALL report clean and the docs dependency map SHALL be updated.

#### Scenario: Palette and dependency map stay clean

- **WHEN** implementation finishes
- **THEN** `check:palette` passes, `astro build` is green, and `docs/component-dependencies.md` reflects the new imports
