// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://calvinrdevelopment.com',
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
  integrations: [sitemap()],
  vite: {
    build: {
      // Never inline scripts into the HTML: the CSP only allows script files from 'self'.
      assetsInlineLimit: 0,
    },
  },
});
