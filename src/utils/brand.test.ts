import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { brandColors, caseCardSvg, iconSvg, renderPng, toIco } from './brand.ts';

test('uses the same hex values as the tokens', async () => {
  const tokens = (await readFile('src/styles/tokens.css', 'utf8')).toUpperCase();
  for (const hex of Object.values(brandColors)) {
    assert.ok(tokens.includes(hex), `${hex} is not in tokens.css`);
  }
});

test('renders icons at the size asked for', async () => {
  const png = await renderPng(iconSvg(32));
  assert.equal(png.readUInt32BE(16), 32);
  assert.equal(png.readUInt32BE(20), 32);
});

test('packs PNGs into a valid .ico directory', () => {
  const pngs = [16, 256].map((size) => ({ size, data: Buffer.alloc(size) }));
  const ico = toIco(pngs);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 2);
  // 256px is stored as 0, and each image starts where the last one ended
  assert.equal(ico.readUInt8(6), 16);
  assert.equal(ico.readUInt8(22), 0);
  assert.equal(ico.readUInt32LE(18), 6 + 2 * 16);
  assert.equal(ico.readUInt32LE(34), 6 + 2 * 16 + 16);
  assert.equal(ico.length, 6 + 2 * 16 + 16 + 256);
});

test('only marks in-progress work with the accent', () => {
  const card = { name: 'X', kind: 'Web app', path: '/work/x' };
  assert.ok(caseCardSvg({ ...card, status: 'in progress' }).includes(brandColors.accent));
  assert.ok(!caseCardSvg({ ...card, status: 'live' }).includes(brandColors.accent));
});

test('escapes text that would break the SVG', () => {
  const svg = caseCardSvg({ name: 'A & B', kind: 'c & d', status: 'live', path: '/' });
  assert.ok(svg.includes('A &amp; B'));
  assert.ok(svg.includes('C &amp; D'), 'the kind line is uppercased before escaping');
});
