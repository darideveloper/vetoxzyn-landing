## Context

Prod ships `<html class="no-js">` with a classic inline script in `src/layouts/Layout.astro:17-20`
that unconditionally swaps it to `js`. The `.js-reveal` utility (`src/styles/global.css:156-164`)
hides all section content (`opacity: 0; visibility: hidden`) whenever the `js` class is present,
and only the six `type="module"` bundles unhide it via `gsap.set(autoAlpha: 1)`. Reproduced on
prod: with `/_astro/*.js` blocked, `<html>` is `js` while 23/23 reveal nodes stay hidden —
nav + footer on an otherwise blank page. The `js`/`no-js` classes have no other consumers
(CSS or JS), so gating the swap is side-effect-free. Constraints: vanilla-only components,
token-only styling, Spanish-first user copy (no copy changes here), `pnpm run check:palette`
+ `astro build` green at the end.

## Goals / Non-Goals

**Goals:**
- Module-incapable or module-blocked browsers render fully-visible static content (never blank).
- Modern browsers keep pixel-identical animated behavior, including no flash of hidden content.
- Section scripts never leave content hidden when init throws partway (storage-blocked contexts).

**Non-Goals:**
- WebP fallbacks, font self-hosting, viewport/`dvh`, `og:`/`http` meta fixes (separate changes).
- Restoring interactivity (forms, animations) on module-less browsers — static content only.
- New dependencies or build-target changes.

## Decisions

### 1. Gate the swap on module support with `noModule` detect (classic script, synchronous)

```html
<script is:inline>
  if ("noModule" in document.createElement("script")) {
    document.documentElement.classList.remove("no-js")
    document.documentElement.classList.add("js")
  }
</script>
```

Rationale: the `noModule` IDL property exists exactly in browsers that execute
`type="module"`. Keeping the script classic preserves synchronous execution at parse time,
so modern browsers hide reveal nodes before first paint (no flash of visible content).
Alternative considered: making the swap itself `type="module"` — simpler, but deferred
execution risks a flash where content paints visible under `no-js`, then hides, then
reveals. Rejected for that reason.

### 2. Guard all Web Storage access with fail-open helpers

- `Hero.astro`: wrap the `sessionStorage` once-per-session check in try/catch (fail-open =
  replay the entrance; never throw inside the `mm.add` callback).
- `src/store/contact.ts`: pass an explicit storage to zustand `persist` via
  `createJSONStorage` backed by a safe wrapper (try/catch around get/set/remove,
  in-memory Map fallback), so Safari private mode / Firefox strict ETP / Brave /
  restricted WebViews degrade to unpersisted form state instead of breaking the island.

### 3. Make reduced-motion branches unable to stick hidden

The four section scripts (`Challenges`, `Testimonials`, `Products`, `ContactSection`) hide
first (`autoAlpha: 0`) and reveal on `ScrollTrigger` enter. Harden each: reveal immediately
when the section is already in viewport on init (`ScrollTrigger.isInViewport`), otherwise
reveal on enter with `once: true`. Rationale: if the trigger start is already passed (short
page, tall viewport, restored scroll) `onEnter` may never fire and the section stays
invisible — the same blank-section symptom on capable browsers.

### 4. Verify with a module-blocked regression run, not a new test harness

The repo has no test runner; add no framework. Verification is a documented Playwright CLI
runbook (route-block `/_astro/*.js`, assert zero hidden `.js-reveal` nodes and readable H1)
plus the normal modern-browser load check (zero console errors, content revealed).

## Risks / Trade-offs

- [Risk] `noModule` detect misclassifies an exotic browser (modules supported but property
  missing, or vice versa) → Mitigation: property has been stable since modules shipped
  (2017–2018, all vendors); failure mode on misclassification is static content (safe side)
  for the common direction.
- [Risk] In-memory storage fallback loses contact-form draft persistence in private mode →
  Mitigation: acceptable and intended; form remains fully usable, just unpersisted.
- [Risk] Touching every section script risks reveal regressions → Mitigation: changes are
  additive guards around existing timelines; verify each section reveals on scroll in a
  modern browser after the change (`astro build` + manual scroll-through).

## Migration Plan

Static site: build, deploy, confirm. Rollback is a single revert of the Layout.astro hunk
(content returns to current behavior). No data migration, no flags.
