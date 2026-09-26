// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` must match the GitHub Pages URL for canonical links, sitemap, and RSS
// to resolve correctly.
//   Project site: https://<user>.github.io/<repo>  (repo name is NOT the username)
//   User site:    https://<user>.github.io        (repo must be named <user>.github.io)
// This repo is `richard-salam/resume`, so the URL carries the `/resume` path.
export default defineConfig({
  site: 'https://richard-salam.github.io/resume',
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
