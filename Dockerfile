# syntax=docker/dockerfile:1.7

# === Stage 1: Build ===
FROM node:lts-alpine AS build
RUN corepack enable && corepack prepare pnpm@10.18.3 --activate
WORKDIR /app

# Build-time environment variables — one ARG/ENV pair per server-side var.
ARG SITE_URL
ENV SITE_URL=$SITE_URL

# Install dependencies (cached layer — only invalidates on lockfile change)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Build the static site
COPY . .
RUN pnpm build

# === Stage 2: Serve ===
FROM nginx:alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
