// Builds the self-hosted font files from the full Geist variable fonts.
// Run: npm run fonts (only needed when the source fonts or the ranges change).
//
// Keeps Basic Latin, Latin-1 and the punctuation the copy uses (curly quotes,
// en dash, ellipsis, middle dot, arrows), and limits the weight axis to the
// weights in DESIGN_BRIEF.md 3.2: Geist 400-560, Geist Mono 400 only.
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import subsetFont from 'subset-font';

const SRC = new URL('../mockups/fonts/', import.meta.url);
const OUT = new URL('../src/assets/fonts/', import.meta.url);

const ranges = [
  [0x20, 0x7e],
  [0xa0, 0xff],
  [0x2010, 0x2014],
  [0x2018, 0x201f],
  [0x2022, 0x2022],
  [0x2026, 0x2026],
  [0x2032, 0x2033],
  [0x20ac, 0x20ac],
  [0x2122, 0x2122],
  [0x2190, 0x2193],
];
const text = ranges
  .flatMap(([from, to]) => Array.from({ length: to - from + 1 }, (_, i) => from + i))
  .map((cp) => String.fromCodePoint(cp))
  .join('');

const fonts = [
  { src: 'Geist-Variable.woff2', out: 'geist.woff2', wght: { min: 400, max: 560 } },
  { src: 'GeistMono-Variable.woff2', out: 'geist-mono.woff2', wght: 400 },
];

for (const font of fonts) {
  const input = await readFile(new URL(font.src, SRC));
  const output = await subsetFont(input, text, {
    targetFormat: 'woff2',
    variationAxes: { wght: font.wght },
  });
  await writeFile(new URL(font.out, OUT), output);
  console.log(`${font.out}: ${input.length} -> ${output.length} bytes`);
}

// The OFL travels with the fonts: beside the subsets and in the published site.
await copyFile(new URL('Geist-OFL.txt', SRC), new URL('OFL.txt', OUT));
await copyFile(new URL('Geist-OFL.txt', SRC), new URL('../public/fonts/OFL.txt', import.meta.url));
