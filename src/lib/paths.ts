/**
 * Prefixes an internal path with Astro's `base`.
 *
 * GitHub Pages serves this repo from a subpath (`/resume/`), but Astro does not
 * rewrite hand-written hrefs — a bare `href="/writing/"` would resolve to the
 * domain root and 404. Every internal link in this project goes through here.
 *
 *   withBase('/writing/')   -> '/resume/writing/'
 *   withBase('/')           -> '/resume/'
 *   withBase('https://x')   -> 'https://x'   (external links pass through)
 */
export function withBase(path: string): string {
  // Absolute URL, protocol-relative, mailto:, tel: — leave alone.
  if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;

  // Astro guarantees BASE_URL; strip its trailing slash so we join predictably.
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

  if (!path.startsWith('/')) return `${base}/${path}`;

  const joined = `${base}${path}`;
  return joined === '' ? '/' : joined;
}

/**
 * Full absolute URL for a path, for canonical tags, Open Graph, and RSS.
 * `Astro.site` is the domain root; `Astro.url.pathname` already includes base.
 */
export function absoluteUrl(pathname: string, site: URL | undefined): string {
  const origin = site ?? new URL('https://example.invalid');
  return new URL(withBase(pathname), origin).toString();
}
