## ADDED Requirements

### Requirement: Typed fetch client scaffold
The system SHALL provide `src/lib/api/client.ts` (`FetchError` with `network|timeout|http|parse|abort`, `AbortSignal.timeout` default 30s, retry ONLY network/timeout with capped exponential backoff, max 2 retries) plus `src/lib/api/types.ts` and `src/lib/api/constants.ts`; no endpoint modules SHALL ship in this change and no component SHALL call raw `fetch()`.

#### Scenario: Transient retry, typed failure
- **WHEN** an API call fails with a network error then succeeds
- **THEN** `safeFetch` retries and resolves typed `T`; WHEN the server returns 4xx/5xx THEN it throws `FetchError{type:"http",status}` immediately with no retry

### Requirement: Static pages and routing
The system SHALL ship SSG prod routes: `/` (landing with contact island), small content pages, and a `404.astro` linking primary sections; dev-only routes from `src/dev-pages/` SHALL NOT emit to `dist/` and SHALL resolve to nginx 404 in production; every prod page SHALL wrap the shared `Layout` (Header/main/Footer, `<ClientRouter />` in head). No SSR adapter SHALL be configured.

#### Scenario: Full static navigation
- **WHEN** a user clicks internal links between home, small pages, and a bad URL
- **THEN** navigation is client-side animated via View Transitions (full-load fallback in unsupported browsers) and the bad URL renders the 404 page with links back to primary sections

#### Scenario: Dev-only path is a true 404 in prod
- **WHEN** a production build is served and any client requests `/design-system`
- **THEN** nginx returns 404 with no dev HTML served

### Requirement: Non-PWA Docker static serving
The system SHALL ship a two-stage `Dockerfile` (node:lts-alpine + corepack pnpm build → nginx:alpine serving `/app/dist`), non-PWA `nginx.conf` (gzip, security headers, `/_astro/*` immutable 1y, HTML no-cache, `try_files $uri $uri/index.html =404`), and `.dockerignore`; the dependency-install layer SHALL copy `package.json`, `pnpm-lock.yaml`, AND `pnpm-workspace.yaml` before `pnpm install --frozen-lockfile` (this repo uses pnpm workspaces). The Dockerfile SHALL ship exactly one `ARG/ENV` pair for `SITE_URL` (server-only; **BREAKING** rename from `PUBLIC_SITE_URL`), and each additional future `PUBLIC_*` var SHALL add one `ARG/ENV` pair plus a Docker build-arg.

#### Scenario: Reproducible image build
- **WHEN** CI runs `docker build --build-arg SITE_URL=https://vetoxzyncomercial.mx -t vetoxzyn:latest .` then `docker run -d -p 8080:80 vetoxzyn:latest`
- **THEN** the container serves the static site on port 80 with immutable caching on hashed assets and no-cache HTML, and canonical/sitemap/robots URLs emit `https://vetoxzyncomercial.mx`
