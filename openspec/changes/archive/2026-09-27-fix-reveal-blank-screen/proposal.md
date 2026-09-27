## Why

Prod renders a blank white/black screen (nav + footer only, all section content invisible) on browsers where classic scripts run but ES modules fail: old/in-app Android WebViews, UC Browser, Opera Mini, and any client blocking `/_astro/*.js`. Reproduced on prod: with module bundles blocked, `<html>` carries `class="js"` while 23/23 `.js-reveal` nodes stay `visibility: hidden`. The `.no-js` CSS safety net is bypassed exactly in the failure case, because the swap script is classic and runs everywhere while the unhide scripts are modules-only.

## What Changes

- Gate the `no-js` → `js` class swap on module support (`noModule` detect, stays classic/synchronous) so module-incapable browsers keep `no-js` and render fully-visible static content (no animations, no blank page).
- Harden the reveal/hide window in section scripts: never leave content hidden if init throws mid-way (guard `sessionStorage` access in Hero; guard zustand `persist` storage in the contact store). Kept in scope because both produce the same invisible-content symptom class and are cheap additive guards.
- Add a module-blocked regression run (Playwright runbook, no new harness) verifying reveal nodes stay visible and the page has readable content.

## Capabilities

### New Capabilities

- `no-module-fallback`: page content SHALL remain fully visible when ES module scripts cannot execute (old browsers, blocked bundles), degrading to static content instead of a blank screen.

### Modified Capabilities

- `scroll-reveals`: hiding via `.js-reveal` SHALL only apply when module JS is confirmed running; the unhide-before-`.from()` guarantee extends to a never-hide guarantee when modules are absent. Needs a delta spec file.

## Impact

- `src/layouts/Layout.astro` (swap script gated on module support via `noModule` detect, stays classic/synchronous per design Decision 1).
- `src/components/organisms/Hero.astro` (guarded `sessionStorage`), `src/store/contact.ts` (storage-safe `persist`).
- No visual change for modern browsers; no new dependencies; no API changes.
