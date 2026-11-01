import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync } from 'node:zlib';
import type { AstroIntegration } from 'astro';
import {
  WEIGHT_SLOT,
  pageScripts,
  scriptClosure,
  thirdPartyScripts,
  weightSentence,
} from '../utils/pageWeight.ts';

/** Compressed size, as Netlify serves it (brotli) */
const compressed = (data: string): number => brotliCompressSync(data).length;

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => join(entry.parentPath, entry.name));

/**
 * Fills in each page's footer build log with that page's own weight, measured from the
 * built files: its HTML and every script it loads, compressed. Runs after the build,
 * because a page can't know its bundle sizes while it's being rendered.
 */
export const pageWeight = (): AstroIntegration => ({
  name: 'page-weight',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const root = fileURLToPath(dir);
      const read = (path: string) => readFileSync(join(root, path), 'utf8');
      let pages = 0;

      for (const file of htmlFiles(root)) {
        const html = readFileSync(file, 'utf8');
        if (!html.includes(WEIGHT_SLOT)) continue;

        const js = scriptClosure(pageScripts(html), read).reduce(
          (sum, path) => sum + compressed(read(path)),
          0
        );
        const thirdParty = thirdPartyScripts(html);
        const fill = (htmlBytes: number) =>
          html.replace(
            WEIGHT_SLOT,
            `<span data-page-weight>${weightSentence({ html: htmlBytes, js, thirdParty })}</span>`
          );
        // Measure the page with its sentence already in, so the HTML figure counts itself
        writeFileSync(file, fill(compressed(fill(compressed(html)))));
        pages++;
      }
      logger.info(`Measured ${pages} pages for the build log`);
    },
  },
});
