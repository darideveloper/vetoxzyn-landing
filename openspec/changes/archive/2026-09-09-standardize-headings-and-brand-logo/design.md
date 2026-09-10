## Context

Section titles render through `molecules/SectionHeader.astro`, but all five callers (Hero, Challenges, Testimonials, Products, ContactSection) bypass its `title`/`titleClass`/`level` props via the `title` slot, each with hand-written classes. Result: Testimonials hardcodes `text-[32px] md:text-[48px]`, Challenges uses the Tailwind scale (`text-4xl md:text-5xl` = 36/48px, not the 32/64px theme), Contact omits the `font-*` family entirely (falls back to system sans instead of Montserrat). The theme itself (`global.css` `--text-display-lg/mobile`, Montserrat 700) is correct — Stitch 01 + 05 agree on the `display-lg-mobile → display-lg` responsive pattern; only Stitch 02 used a never-ported `font-headline-md` token.

Separately, header/footer show a text wordmark (`PrimaryNav` `NavLink "Vetoxzyn"`, `FooterMeta` `© Vetoxzyn`), `BUSINESS_DATA.logo` points at nonexistent `/assets/img/logo.png` (JSON-LD 404 for crawlers), and the real artwork (`logo.webp`, 600×244 RGBA, ~19KB, dark-on-transparent, light-safe) lives outside the repo.

Constraints: vanilla-only tiers (`AGENTS.md`, `docs/astro-atomic-components.md` — no `ui/`, no `Validated*`); `docs/component-dependencies.md` is a living doc and part of DoD; favicon out of scope per user.

## Goals / Non-Goals

**Goals:**
- One canonical section-title style owned by `SectionHeader` (h1 hero + h2 sections, identical visuals).
- Real logo in header (`h-10`, eager) and footer (`h-8`, lazy), replacing text wordmarks; resolvable JSON-LD `logo`.

**Non-Goals:**
- No theme token redesign (no fluid `clamp()`, no new sizes — the 32/64px scale stays).
- Card-level headings (e.g. `FeatureRow` h4) unchanged.
- No favicon work; no `text-massive` 900-weight fix (known faux-bold, separate change).
- No `astro:assets` pipeline for the logo (already WebP; JSON-LD needs a stable URL).

## Decisions

**D1 — Canonical core string, level switches tag only.**
`SectionHeader` gains a locked core: `font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface` for both `level="h1"` and `level="h2"` (user decision: identical size, tag differs). `titleClass` becomes extras-only and is merged after the core (`mt-*`, `max-w-*`, `leading-tight`), so callers can space but never re-family or re-size. Alternative (full `titleClass` override) rejected — it re-opens the drift this change closes. Alternative (fluid `clamp()` token) rejected — redesign cost for unasked gain.

**D2 — `id` prop + restricted slot.**
New optional `id?: string` rendered on string titles, letting Hero (`hero-heading`) and sections drop slots while keeping anchors and a11y (`aria-labelledby`). The `title` slot stays allowed for exactly one case: inline markup the string path can't express (contact gradient span). Slot content MUST reuse the canonical core (imported const, D3). Alternative (keep all slots, lint by review) rejected — unenforceable. Alternative (kill slots entirely, gradient via prop) rejected — prop API for one gradient is abstraction for one caller.

**D3 — Single source for the core string.**
The core string is defined once as an exported const from `SectionHeader.astro` frontmatter; the contact slot imports it. Zero new files. Fallback if frontmatter-export import proves awkward in implementation: duplicate the spec-pinned string with a comment pointer (one duplication, reviewer-checked).

**D4 — Logo via `public/brand/`, plain `<img>` atom (option P).**
Copy `logo.webp` → `public/brand/logo.webp` (no re-encode). New `atoms/BrandLogo.astro` renders `<img src="/brand/logo.webp" width=600 height=244 alt="Vetoxzyn" class="h-* w-auto">` with `loading`/`fetchpriority` props. Rejected: `src/assets/` + `astro:assets` — hashed output URL diverges from the stable URL JSON-LD needs, forcing two copies; and `ResponsiveImage`'s `widths=[384,512]` is wrong for a 120–160px header mark. 19KB static + `w-auto` ratio lock needs no optimizer.

**D5 — Adoption shape.**
`PrimaryNav`: `NavLink href="/"` wraps `<BrandLogo class="h-10 w-auto" loading="eager" fetchpriority="high">` (logo links home, preserves current nav behavior). `FooterMeta`: bare `<BrandLogo class="h-8 w-auto" loading="lazy">` next to the existing `©` line. `BUSINESS_DATA.logo` → `"/brand/logo.webp"`. Tier check: `atoms/BrandLogo` ← `molecules/PrimaryNav, FooterMeta` ← `organisms/Header, Footer` — acyclic, vanilla-legal.

## Risks / Trade-offs

- [Risk] Contact slot duplicates core styling → Mitigation: imports the D3 const; spec scenario pins it; reviewer checks one line.
- [Risk] `h-10` logo grows header height vs text wordmark → Mitigation: verify build + 390/768/1280 spot-check, no horizontal overflow (standard section-QA precedent).
- [Risk] Exported const from `.astro` frontmatter is unusual → Mitigation: D3 fallback (comment-pointed duplication) pre-approved, no redesign needed.
- [Trade-off] Static logo skips hashed caching/optimizer → accepted: 19KB, far below LCP concern; stable SEO URL wins.
- [Trade-off] JSON-LD logo disagrees with the stock Astro favicon until a favicon change lands → accepted, favicon out of scope.

## Migration Plan

Single change, static site: implement → `pnpm build` → visual spot-check (headings 390/768/1280, header/footer logo) → update `docs/component-dependencies.md` per-page trees → merge. Rollback = revert commit. No data, no flags.
