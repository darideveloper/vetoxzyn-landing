## Purpose

Single-source color governance: the `@theme` palette is the only color-source,
agents consume tokens exclusively, and an advisory command proves compliance.
## Requirements
### Requirement: Single-source token inventory
`src/styles/global.css` `@theme` SHALL be the sole color-source: every color utility used in `src/components/**`, `src/pages/**`, `src/layouts/**` SHALL resolve to a defined `--color-*` token (opacity modifiers allowed). The inventory SHALL contain no zero-usage color token; the banned sources SHALL be: hex literals (`#[…]`), `rgba()/rgb()/oklch()/hsl()` literals, raw neutral utilities (`white`, `black`, `gray-*`, `red-*`, `slate-*`, `zinc-*`, `neutral-*`), and `style=` color declarations. `transparent` and `currentColor` SHALL remain allowed.

#### Scenario: Token coverage audit
- **WHEN** an agent runs `pnpm run check:palette` after the migration
- **THEN** it reports zero banned-pattern matches in component/page/layout sources (excluding the accepted `Hero.astro` animation-delay `style=` line)

### Requirement: Token add-first rule
A new color SHALL NOT appear in any component before it exists as a `--color-*` token in `src/styles/global.css` with a documented where-used note in `docs/design-tokens.md`.

#### Scenario: New accent request
- **WHEN** a future change needs a color with no matching token
- **THEN** the agent adds the token plus its `design-tokens.md` row first, then consumes it — never an inline hex

### Requirement: Advisory check command
`package.json` SHALL expose `check:palette` (ripgrep-based, no new dependencies) that scans `src/components src/pages src/layouts` for the banned patterns and exits non-zero with file:line output on any match. It SHALL be advisory (manual/agent-invoked, never a commit hook or CI gate).

#### Scenario: Agent self-check
- **WHEN** an agent finishes a styling change and runs `pnpm run check:palette`
- **THEN** a clean tree prints no matches and a dirty tree lists every offending file:line

### Requirement: Agent-facing palette law
`AGENTS.md` SHALL contain a mandatory "Styling / palette" section (beside the vanilla-only rule) stating: sole source `src/styles/global.css`; token-utilities-only consumption; the banned list; add-token-first; and the verification step (`check:palette` + build) as part of Definition of Done. `docs/design-tokens.md` SHALL exist as the living token → hex → usage table.

#### Scenario: New agent session
- **WHEN** a future agent starts a styling task and reads `AGENTS.md`
- **THEN** it can name the sole color source, the banned patterns, and the verification command without reading any other doc
