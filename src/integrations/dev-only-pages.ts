import type { AstroIntegration } from "astro";
import { existsSync, readdirSync } from "node:fs";

// Dev-only routes: every top-level *.astro in src/dev-pages/ is injected as
// /<basename> when `astro dev` runs, and never exists in builds (true 404 +
// clean sitemap by construction). `_*` files are co-located helpers.
// ponytail: flat readdirSync, no glob dep; folder→prefix mapping if nesting
// is ever needed.
export function devOnlyPages(): AstroIntegration {
  return {
    name: "dev-only-pages",
    hooks: {
      "astro:config:setup": ({ command, injectRoute, addWatchFile, logger }) => {
        if (command !== "dev") return;
        const dir = new URL("../dev-pages/", import.meta.url);
        if (!existsSync(dir)) return;
        addWatchFile(dir);
        for (const file of readdirSync(dir)) {
          if (!file.endsWith(".astro") || file.startsWith("_")) continue;
          const pattern = `/${file.slice(0, -".astro".length)}`;
          injectRoute({
            pattern,
            entrypoint: new URL(`../dev-pages/${file}`, import.meta.url),
          });
          logger.info(`dev-only route ${pattern}`);
        }
      },
    },
  };
}
