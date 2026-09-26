---
title: 'Start here: replace this post'
description: 'A template for your first real post. Delete this file once you have written something better.'
pubDate: 2026-09-26
draft: false
tags:
  - meta
featured: true
---

This is a placeholder post that exists so the blog has something to render
before you have written anything. Delete `src/content/blog/hello-world.md` once
you publish your first real piece.

## How to publish

Create a Markdown file in `src/content/blog/`. The filename becomes the URL:

```
src/content/blog/why-i-moved-docs-to-as-code.md
  ->  /writing/why-i-moved-docs-to-ascode/
```

Wait — the slug is the filename verbatim, so keep filenames lowercase and
hyphenated.

## Frontmatter reference

```yaml
---
title: 'Your post title'
description: 'One or two sentences. Used on the index, in RSS, and as the meta description.'
pubDate: 2026-09-26        # ISO date
updatedDate: 2026-10-01    # optional
draft: false               # true keeps it off the live site
tags:
  - docs-as-code
  - ai
featured: false            # true highlights it on the writing index
---
```

## What the schema enforces

Astro validates frontmatter against a schema in `src/content.config.ts`. If you
get a build error, a required field is missing or mistyped — the error message
names the field.

## Things worth writing about

You are a senior technical writer building an AI stack on top of docs-as-code.
That is a genuinely interesting position, and the posts that will land are the
ones that report honestly:

- What you tried, and what broke
- What you measured, and what the number was
- Where the AI helped, and where it quietly made things worse
- What you would tell someone starting the same project on Monday

That last one is the format recruiters and clients remember.
