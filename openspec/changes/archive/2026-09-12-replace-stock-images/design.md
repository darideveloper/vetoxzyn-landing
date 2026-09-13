## Context

Working tree on `main` (`7610c16`) already carries the replacement: 10 low-res `-384`/`-512` variants + 4 `README` stubs deleted, 7 single AI masters added (verified sizes: hero `2560×3200`, challenges `2400×3000`, contact `3200×1800`, products `2× 4096×2304`, dividers `2× 1600×1600`), `ResponsiveImage`/`DividerImage` contracts changed, and all five image call-sites re-pointed. `Avatar.astro` and its 3 Unsplash URLs are untouched. This design records the approach behind that WIP so specs and tasks mirror the code, not a new direction. Proposal motivation in `proposal.md`.

Constraints: vanilla atomic hierarchy (`atoms → molecules → organisms`), token-only palette, shared interaction-feedback voice (`.hover-subtle` on containers, no motion inventions), `docs/component-dependencies.md` kept in sync, `astro build` + `check:palette` green.

## Goals / Non-Goals

**Goals:**

- One local master per image slot; no `-384`/`-512` variant sprawl, no `README` stubs.
- Per-slot responsive `widths` tuned to each layout cell; `astro:assets` generates the rest.
- Zero external hotlinks except the 3 kept Unsplash avatars.
- Backwards-compatible `ResponsiveImage` (optional `widths?`); contained **BREAKING** `DividerImage` `src` change (sole caller `Testimonials` updated).

**Non-Goals:**

- No new avatars, copy, alt-text, routing, store, or motion changes.
- No new atom variants, no palette tokens, no SEO/sitemap work.
- No re-export of larger-than-master widths (never upscale beyond native).

## Decisions

- **Single master per slot over versioned variants.** One import per slot (`hero-clinica.webp`, etc.); `astro:assets` emits the responsive set on demand. Alternative (keep `-384`/`-512`, add `-1024`+) rejected: import sprawl, stale files, easy mismatch.
- **Per-slot `widths` table, not one global list.**
  - Hero 4:5 card (cap ~448px): `[480, 800, 1024, 1280]` eager/high-priority.
  - Challenges 4:5 card: `[480, 800, 1024, 1200]` lazy.
  - Contact 16:9 (`[640, 1024, 1600]`) lazy; container fixed `aspect-[16/9]` + `object-cover` to match the `3200×1800` master and kill layout shift.
  - Products full-bleed 50vw panels: `[768, 1280, 1536, 2048]` lazy (capped at half the `4096` native — full 4096 never served).
  - Dividers (tiny strips): `[400, 800]` lazy via `DividerImage`.
  - Alternative (single `[384, 512]` or one wide list everywhere) rejected: under-serves products/hero retina, over-serves dividers.
- **`DividerImage` becomes `astro:assets` local-only.** `src: ImageMetadata`, `widths=[400,800]`, `sizes="80px"`. Alternative (plain `<img>` with local path) rejected: loses responsive generation and decoding/async parity with `ResponsiveImage`.
- **`ResponsiveImage` keeps `widths?` optional with layout-sensible defaults** (eager `[480,800,1024,1280]`, lazy `[480,800,1024,1200]`), so untouched call-sites still compile; explicit per-slot values override.
- **Avatars excluded.** `Avatar.astro` stays plain `<img>`; no local portrait masters were procured, and swapping likenesses is out of scope.
- **`sizes` tuned per slot** (`448px` hero, `450px` challenges/contact, `50vw` products, `80px` dividers) so the browser picks the smallest sufficient candidate.

## Risks / Trade-offs

- [Risk] Larger masters (~40–142KB source, products 120KB each) grow repo/build output → Mitigation: responsive `widths` + `sizes` keep served payloads slot-appropriate; verify with `astro build` output sizes.
- [Risk] Product `2048w` cap may still overserve small phones → Mitigation: `sizes="(max-width:1024px) 100vw, 50vw"` lets mobile pick `768w`; confirm via devtools network pass.
- [Risk] **BREAKING** `DividerImage.src: string → ImageMetadata` breaks any missed caller → Mitigation: repo has a single caller (`Testimonials`), verified via `rg "DividerImage"`; no other imports exist.
- [Risk] Contact `16/9` cover crops vs old natural aspect → Mitigation: master is natively `16:9`, so crop is nil at container ratio; alt/copy unchanged.
- [Risk] Retrospective spec drift (old specs say "widths capped at native 512", "natural aspect", "external divider stock") → Mitigation: delta specs in `specs/` update exactly those three requirements; hero/challenges/products filename/width bumps stay implementation detail.
