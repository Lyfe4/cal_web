/**
 * Measuring a built page for the footer's build log. Pure functions over HTML and JS
 * text, so the integration that reads dist/ stays thin and this stays testable.
 */

/** Where the build log's weight sentence goes; the integration fills it in after the build */
export const WEIGHT_SLOT = '<span data-page-weight></span>';

/** Same-origin module scripts and modulepreloads a page loads, as root-relative paths */
export const pageScripts = (html: string): string[] => {
  const found = new Set<string>();
  for (const [tag] of html.matchAll(/<script\b[^>]*>|<link\b[^>]*rel=["']?modulepreload[^>]*>/g)) {
    const src = tag.match(/\b(?:src|href)=["']?([^"' >]+)/)?.[1];
    if (src?.startsWith('/') && !src.startsWith('//')) found.add(src);
  }
  return [...found];
};

/** Third-party script hosts on the page (e.g. the analytics beacon), which aren't measured */
export const thirdPartyScripts = (html: string): string[] => {
  const hosts = new Set<string>();
  for (const [, src] of html.matchAll(/<script\b[^>]*\bsrc=["']?(https?:\/\/[^"' >]+)/g)) {
    if (src) hosts.add(new URL(src).hostname);
  }
  return [...hosts];
};

/**
 * Relative files a minified module imports statically (`import ... from "./x.js"`,
 * `import "./x.js"`, `export ... from "./x.js"`). Dynamic `import()` is left out: it
 * isn't loaded with the page.
 */
export const staticImports = (js: string): string[] => {
  const found = new Set<string>();
  for (const [, spec] of js.matchAll(
    /(?:^|[;}\n])\s*(?:import|export)\s*(?:[\w*{}\s,$]+?\s*from\s*)?["'](\.{1,2}\/[^"']+)["']/g
  )) {
    if (spec) found.add(spec);
  }
  return [...found];
};

/** Every script a page loads, following static imports, given a reader for built files */
export const scriptClosure = (entries: string[], read: (path: string) => string): string[] => {
  const seen = new Set<string>();
  const visit = (path: string) => {
    if (seen.has(path)) return;
    seen.add(path);
    for (const spec of staticImports(read(path))) {
      visit(new URL(spec, `https://site${path}`).pathname);
    }
  };
  entries.forEach(visit);
  return [...seen];
};

/** Bytes as KB with one decimal under 10 KB, whole numbers above */
export const formatKb = (bytes: number): string => {
  const kb = bytes / 1024;
  return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`;
};

const knownHosts: Record<string, string> = {
  'static.cloudflareinsights.com': "Cloudflare's analytics beacon",
};

/** "This page: 9.8 KB of HTML and 3.1 KB of JavaScript, compressed" */
export const weightSentence = ({
  html,
  js,
  thirdParty = [],
}: {
  html: number;
  js: number;
  thirdParty?: string[];
}): string => {
  const scripts = js > 0 ? `${formatKb(js)} of JavaScript` : 'no JavaScript';
  const extra = thirdParty.map((host) => knownHosts[host] ?? host);
  const plus = extra.length > 0 ? `, plus ${extra.join(' and ')}` : '';
  return `This page: ${formatKb(html)} of HTML and ${scripts}, compressed${plus}`;
};
