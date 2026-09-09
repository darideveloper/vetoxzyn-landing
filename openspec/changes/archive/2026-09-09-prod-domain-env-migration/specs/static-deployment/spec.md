## MODIFIED Requirements

### Requirement: Non-PWA Docker static serving
The system SHALL ship a two-stage `Dockerfile` (node:lts-alpine + corepack pnpm build → nginx:alpine serving `/app/dist`), non-PWA `nginx.conf` (gzip, security headers, `/_astro/*` immutable 1y, HTML no-cache, `try_files $uri $uri/index.html =404`), and `.dockerignore`; the dependency-install layer SHALL copy `package.json`, `pnpm-lock.yaml`, AND `pnpm-workspace.yaml` before `pnpm install --frozen-lockfile` (this repo uses pnpm workspaces). The Dockerfile SHALL ship exactly one `ARG/ENV` pair for `PUBLIC_SITE_URL`, and each additional future `PUBLIC_*` var SHALL add one `ARG/ENV` pair plus a Docker build-arg.

#### Scenario: Reproducible image build
- **WHEN** CI runs `docker build --build-arg PUBLIC_SITE_URL=https://vetoxzyncomercial.mx -t vetoxzyn:latest .` then `docker run -d -p 8080:80 vetoxzyn:latest`
- **THEN** the container serves the static site on port 80 with immutable caching on hashed assets and no-cache HTML, and canonical/sitemap/robots URLs emit `https://vetoxzyncomercial.mx`
