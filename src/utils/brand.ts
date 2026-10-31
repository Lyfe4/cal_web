/**
 * The social cards, favicons and app icons, drawn as SVG and rendered to PNG at
 * build time, so they always use the current palette, fonts and copy.
 */
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import subsetFont from 'subset-font';
import { business, shortLocation, serviceAreas, siteUrl } from '../data/site.ts';

/** The hex values beside each token in src/styles/tokens.css (a test keeps them in step). */
export const brandColors = {
  bg: '#141210',
  rule: '#2E2B27',
  text: '#F0EDE8',
  text2: '#BEB8AF',
  text3: '#999288',
  accent: '#FF6B2C',
} as const;

export const ogSize = { width: 1200, height: 630 } as const;

// From the project root: the build bundles this module, so import.meta.url moves.
const fontsDir = join(process.cwd(), 'src/assets/fonts');

/**
 * resvg's native build only loads fonts from files, and it can't pick between
 * two instances of one variable family, so every card uses a single static
 * Geist instance at 500 (the project-name and button weight) plus Geist Mono.
 */
let fontFiles: Promise<string[]> | undefined;
const loadFonts = (): Promise<string[]> =>
  (fontFiles ??= (async () => {
    const dir = await mkdtemp(join(tmpdir(), 'crd-brand-'));
    const fonts = [
      { file: 'geist.woff2', axes: { wght: 500 } },
      { file: 'geist-mono.woff2', axes: undefined },
    ];
    return Promise.all(
      fonts.map(async ({ file, axes }) => {
        const woff2 = await readFile(join(fontsDir, file));
        // The subsets already hold only the characters the site uses, so keep them all.
        const glyphs = Array.from({ length: 0x2200 - 0x20 }, (_, i) =>
          String.fromCodePoint(0x20 + i)
        ).join('');
        const ttf = await subsetFont(woff2, glyphs, {
          targetFormat: 'truetype',
          ...(axes ? { variationAxes: axes } : {}),
        });
        const path = join(dir, file.replace('.woff2', '.ttf'));
        await writeFile(path, ttf);
        return path;
      })
    );
  })());

const resvg = async (svg: string, width?: number): Promise<Resvg> =>
  new Resvg(svg, {
    font: { loadSystemFonts: false, fontFiles: await loadFonts(), defaultFontFamily: 'Geist' },
    ...(width ? { fitTo: { mode: 'width', value: width } } : {}),
  });

export const renderPng = async (svg: string, width?: number): Promise<Buffer> =>
  (await resvg(svg, width)).render().asPng();

/** The SVG with its text turned into paths, so it renders the same without the fonts. */
export const outlineSvg = async (svg: string): Promise<string> => (await resvg(svg)).toString();

const escapeXml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- Icons ---------- */

/**
 * The favicon and app icons: "CR" from the wordmark, with the R in --text-3 as
 * "Development" is, on a square of the page background. No radius, as everywhere.
 * `scale` shrinks the letters into the maskable safe zone for the app icons.
 */
export const iconSvg = (size: number, scale = 1): string => {
  const fontSize = size * 0.56 * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${brandColors.bg}"/>
  <text x="${size / 2}" y="${size / 2 + fontSize * 0.36}" text-anchor="middle" font-family="Geist" font-weight="500"
    font-size="${fontSize}" letter-spacing="${-fontSize * 0.06}"><tspan fill="${brandColors.text}">C</tspan><tspan fill="${brandColors.text3}">R</tspan></text>
</svg>`;
};

/** A .ico holding PNG images, which every browser that still asks for /favicon.ico reads. */
export const toIco = (pngs: { size: number; data: Buffer }[]): Buffer => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...pngs.map(({ data }) => data)]);
};

/* ---------- Social cards ---------- */

const pad = 72;

/** The parts every card shares: wordmark and rule at the top, a mono row on a rule at the foot. */
const card = (body: string, footLeft: string, footRight: string): string => {
  const { width, height } = ogSize;
  const footY = height - pad;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${brandColors.bg}"/>
  <text x="${pad}" y="${pad + 26}" font-family="Geist" font-weight="500" font-size="34" letter-spacing="-0.5"><tspan fill="${brandColors.text}">Calvin R</tspan><tspan fill="${brandColors.text3}"> Development</tspan></text>
  <rect x="${pad}" y="${pad + 64}" width="${width - pad * 2}" height="1" fill="${brandColors.rule}"/>
  ${body}
  <rect x="${pad}" y="${footY - 50}" width="${width - pad * 2}" height="1" fill="${brandColors.rule}"/>
  <g font-family="Geist Mono" font-size="22" letter-spacing="0.9" fill="${brandColors.text3}">
    <text x="${pad}" y="${footY}">${footLeft}</text>
    <text x="${width - pad}" y="${footY}" text-anchor="end">${footRight}</text>
  </g>
</svg>`;
};

/** Lines of large type, set like the hero h1: tight leading and tracking. */
const display = (lines: string[], top: number, size: number, tracking: number): string =>
  `<text font-family="Geist" font-weight="500" font-size="${size}" letter-spacing="${size * tracking}" fill="${brandColors.text}">${lines
    .map(
      (line, i) =>
        `<tspan x="${pad}" y="${top + size * (0.78 + i * 1.04)}">${escapeXml(line)}</tspan>`
    )
    .join('')}</text>`;

const host = new URL(siteUrl).hostname;

/** The sitewide card: what I do, as the hero says it, and where. */
export const siteCardSvg = (): string =>
  card(
    display(['Websites and web apps', 'for businesses across', 'Australia.'], 196, 80, -0.045),
    escapeXml(`${shortLocation} · ${serviceAreas.remote}`.toUpperCase()),
    host
  );

export interface CaseCard {
  name: string;
  /** The mono kind line, e.g. "Client website · Guyra, NSW" */
  kind: string;
  status: 'live' | 'in progress';
  path: string;
}

/** One card per case study: the kind line, the name at the featured size, and its status. */
export const caseCardSvg = ({ name, kind, status, path }: CaseCard): string => {
  const inProgress = status === 'in progress';
  const dot = inProgress ? brandColors.accent : brandColors.text;
  const statusText = escapeXml(status.toUpperCase());
  // Status sits at the right of the foot row: a 10px dot, then the word in mono.
  const footRight = `<tspan fill="${inProgress ? brandColors.accent : brandColors.text3}">${statusText}</tspan>`;
  const statusWidth = statusText.length * 22 * 0.6 + 0.9 * statusText.length;
  return card(
    `<text x="${pad}" y="${pad + 128}" font-family="Geist Mono" font-size="22" letter-spacing="0.9" fill="${brandColors.text3}">${escapeXml(`Case study · ${kind}`.toUpperCase())}</text>
  ${display([name], 268, 150, -0.05)}
  <circle cx="${ogSize.width - pad - statusWidth - 16}" cy="${ogSize.height - pad - 7.5}" r="5" fill="${dot}"/>`,
    escapeXml(`${host}${path}`),
    footRight
  );
};

export const siteCardAlt = `${business.name}: websites and web apps for businesses across Australia.`;
