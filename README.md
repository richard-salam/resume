# Resume + blog

Astro site that does double duty: a one-page resume on `/` and a blog on
`/writing/`. Static output, deployed to GitHub Pages by GitHub Actions.

The whole resume lives in **one JSON file** — `src/data/resume.json`. Nothing in
the markup needs touching to update a role, a bullet point, or a skill.

---

## Prerequisites

- **Node 22.12.0 or newer** (Astro 7 hard requirement)

```bash
node --version   # must be >= v22.12.0
```

Using nvm:

```bash
nvm install --lts
nvm alias default "$(nvm version)"
```

If `node --version` reports something older in an already-open terminal, that
terminal inherited a stale `PATH`. Run `nvm use <version>` or open a new one.

---

## Local development

```bash
npm install
npm run dev          # http://localhost:4321/resume/
```

| Command           | Does                                              |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                        |
| `npm run build`   | Production build into `dist/`                     |
| `npm run preview` | Serve the built `dist/` locally                   |
| `npm run check`   | Type-check `.astro` and `.ts` files (runs in CI)  |

### The `/resume/` subpath

This repo is named `resume`, not `richard-salam.github.io`, so GitHub Pages
serves it from a **subpath**: `https://richard-salam.github.io/resume/`.

That is handled by two settings in `astro.config.mjs`:

```js
site: 'https://richard-salam.github.io',  // domain root
base: '/resume',                          // Pages subpath
```

Astro does **not** rewrite hand-written hrefs, so a bare `href="/writing/"`
would 404. Every internal link goes through `withBase()` from
`src/lib/paths.ts`:

```astro
---
import { withBase } from '../lib/paths';
---
<a href={withBase('/writing/')}>Writing</a>
```

If you ever rename the repo, update `base` in `astro.config.mjs` and the
`Sitemap:` line in `public/robots.txt`. If you switch to a user site
(repo named `richard-salam.github.io`), set `base: '/'` and `withBase()`
becomes a no-op.

---

## Editing content

### The resume

`src/data/resume.json` — the single source of truth. Sections on the home page
map to top-level keys:

| Key              | Renders as                                        |
| ---------------- | ------------------------------------------------- |
| `basics`         | Hero, contact block, footer, page title            |
| `aiStack`        | The "Currently building" panel + recent-post feed  |
| `experience`     | Experience timeline                               |
| `caseStudies`    | Case study cards                                  |
| `writingSamples` | Selected writing list                             |
| `skills`         | Skills & tools grid                               |
| `education`      | Education list                                    |

Dates are `YYYY-MM`; the literal string `present` renders as "Present". Duration
labels are computed automatically.

Delete the `$comment` key and every `TODO` marker before you publish.

### The blog

One Markdown file per post in `src/content/blog/`. The filename becomes the URL:

```
src/content/blog/docs-as-code-retrospective.md  ->  /writing/docs-as-code-retrospective/
```

Frontmatter is validated against the schema in `src/content.config.ts`, so a
mistyped field fails the build with a message naming the field.

```yaml
---
title: 'Your post title'
description: 'One or two sentences. Used in the index, RSS, and meta description.'
pubDate: 2026-09-26
updatedDate: 2026-10-01   # optional
draft: false              # true keeps it off the live site
tags: [docs-as-code, ai]
featured: false           # true highlights it on the writing index
---
```

`src/content/blog/hello-world.md` is a template. Delete it once you have
something real.

---

## Deploying to GitHub Pages

This project is already wired to `git@github.com:richard-salam/resume.git` on
branch `main`. The `deploy.yml` workflow type-checks, builds, and publishes on
every push.

### First-time setup

1. **Enable Pages** — repo → **Settings** → **Pages** → **Build and
   deployment** → **Source**: **GitHub Actions**.
   (Doing this *before* the first push avoids a failed workflow run.)
2. **Push** — the first push to `main` triggers the deploy automatically.
3. Watch it under the **Actions** tab, then visit
   <https://richard-salam.github.io/resume/>.

### Pushing later

```bash
git add -A
git commit -m "Update experience at Acme"
git push
```

### Adding a custom domain later

1. Add a `public/CNAME` file containing just your domain.
2. Point a CNAME record at `richard-salam.github.io`.
3. In **Settings** → **Pages**, set the custom domain and wait for the
   TLS certificate to issue.
4. Set `site` in `astro.config.mjs` to your domain and set `base: '/'`, then
   redeploy.

Enforce HTTPS once the certificate is live.

---

## Exporting a PDF resume

`Cmd/Ctrl + P` on the home page produces a clean single-column PDF: navigation
and buttons are hidden, colours flatten to black on white, and link URLs are
printed inline. That is your ATS-friendly PDF — no separate export step.

---

## Customising

**Colours and type** — the token block at the top of `src/styles/global.css`.
Each mode defines `--paper`, `--ink`, `--ink-muted`, `--ink-faint`, `--line`,
`--accent`, and `--accent-wash`. Change `--accent` and the whole site follows.
Dark values are defined twice: once for `:root[data-theme='dark']` and once
inside the `prefers-color-scheme` block, so update both.

**Fonts** — `--font-sans` and `--font-serif` in the same file. Both are system
font stacks, so there is no webfont request and no layout shift. To self-host a
font, drop the files in `public/fonts/` and add an `@font-face` block.

**Accent hue** — the site currently uses a muted teal (`#0f766e` light,
`#2dd4bf` dark).

---

## Accessibility and SEO

- Skip link, labelled landmarks, visible focus rings, `prefers-reduced-motion`
  respected, and colour contrast checked in both themes
- Light/dark follows the OS until the reader picks a theme, then their choice
  persists in `localStorage`
- Semantic `Person` JSON-LD on the home page
- Per-page `<title>`, description, canonical, and Open Graph tags
- Auto-generated sitemap and RSS feed at `/rss.xml`
- System fonts only — no CLS, no third-party requests, no cookie banner

---

## Project layout

```
.github/workflows/deploy.yml   Build + deploy to Pages
astro.config.mjs               Site URL, sitemap, Shiki config
public/                        favicon, robots.txt, .nojekyll
src/
  components/                  Section components
  content/blog/                Blog posts (Markdown)
  content.config.ts            Frontmatter schema
  data/resume.json             ← the resume
  layouts/Base.astro           HTML shell, meta, theme init
  lib/format.ts                Date and duration formatting
  lib/paths.ts                 withBase() for the /resume subpath
  pages/                       Routes
  styles/global.css            Design tokens, base styles, print styles
```
