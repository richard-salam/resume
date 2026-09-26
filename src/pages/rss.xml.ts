import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import resume from '../data/resume.json';
import { withBase } from '../lib/paths';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: `${resume.basics.name} — Writing`,
    description: `Essays and field notes on documentation, docs-as-code, and AI in the content workflow.`,
    // `context.site` is the domain root only; the feed's channel <link> has to
    // include the Pages subpath, so re-attach it here. Item links below are
    // already base-prefixed and resolve against the domain root correctly.
    site: new URL(withBase('/'), context.site!),
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: withBase(`/writing/${post.id}/`),
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
