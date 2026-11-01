// @ts-check
import { execFileSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { pageWeight } from './src/integrations/pageWeight.ts';

const site = 'https://calvinrdevelopment.com';

/**
 * The files whose content a page shows, so its sitemap lastmod is when that
 * content last changed rather than when the site was built. Shared chrome
 * (header, footer, styles) is left out on purpose.
 * @param {string} pathname
 */
const pageSources = (pathname) => {
  if (pathname === '/')
    return ['src/pages/index.astro', 'src/components/home', 'src/content/projects'];
  const work = pathname.match(/^\/work\/([a-z0-9-]+)$/);
  if (work) return ['src/pages/work/[slug].astro', `src/content/projects/${work[1]}.md`];
  return [`src/pages${pathname}.astro`];
};

/**
 * Date of the last commit touching any of the files, or undefined without git history.
 * @param {string[]} files
 */
const lastCommitDate = (files) => {
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], {
      encoding: 'utf8',
    }).trim();
    return date || undefined;
  } catch {
    return undefined;
  }
};

export default defineConfig({
  site,
  // about.html rather than about/index.html, so /about, /services and /contact
  // keep serving at the same URLs as the old SPA, with no trailing-slash redirect.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // All CSS is small, so inline it and save a render-blocking request per page.
    inlineStylesheets: 'always',
  },
  // Astro 7 defaults to 'jsx', which drops whitespace between inline elements.
  compressHTML: true,
  integrations: [
    sitemap({
      serialize: (item) => {
        const lastmod = lastCommitDate(pageSources(new URL(item.url).pathname));
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    pageWeight(),
  ],
  vite: {
    build: {
      // Never inline scripts into the HTML: the CSP only allows script files from 'self'.
      assetsInlineLimit: 0,
    },
  },
});
