// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages serves a repo named `resume` from a SUBPATH, not the domain root:
//   https://richard-salam.github.io/resume/
//
// So `site` is the domain only, and `base` carries the subpath. Astro then
// reports correct URLs via `Astro.url` / `import.meta.env.BASE_URL`, and the
// sitemap picks it up automatically.
//
//   Project site (repo name !== username):  site = domain, base = '/<repo>'
//   User site (repo named <user>.github.io): site = domain, base = '/'
//
// Internal links must go through `withBase()` in src/lib/paths.ts — Astro does
// NOT rewrite hand-written hrefs, so a bare "/writing/" would 404.
export default defineConfig({
  site: 'https://richard-salam.github.io',
  base: '/resume',
  integrations: [sitemap()],
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
