## Purpose

Guarantee that page content stays fully visible when ES module scripts cannot execute or Web Storage throws: module-less browsers get static content instead of a blank screen, and storage-blocked contexts degrade open without hiding content or crashing islands.

## Requirements

### Requirement: Static fallback when modules cannot run

The page SHALL keep all content fully visible when ES module scripts do not execute (old browsers without module support, blocked or failed `/_astro/*.js` bundles), presenting static unanimated content instead of a blank screen.

#### Scenario: Module-less browser shows full content

- **WHEN** the home page loads in a browser that runs classic scripts but not modules
- **THEN** `<html>` keeps the `no-js` class, the `.no-js .js-reveal` override applies, and every section (hero, challenges, testimonials, products, contact) is readable without any module script executing

#### Scenario: Blocked bundles do not blank the page

- **WHEN** all `/_astro/*.js` requests fail (content filter, adblocker, network fault) in an otherwise modern browser
- **THEN** the hero heading and all sections remain visible as static content and the browser console shows no fatal error attributable to the reveal system

### Requirement: Storage failures degrade open, never hidden

Web Storage access in page scripts SHALL fail open: when `sessionStorage`/`localStorage` throws (private mode, strict tracking protection, restricted WebViews), animations may replay and form drafts may go unpersisted, but content MUST NOT remain hidden and islands MUST NOT crash.

#### Scenario: Private-mode load reveals everything

- **WHEN** the home page loads with storage access throwing on every call
- **THEN** the hero entrance completes (or replays), every section reveals on scroll, and the contact form island hydrates and accepts input
