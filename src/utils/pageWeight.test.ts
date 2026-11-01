import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatKb,
  pageScripts,
  scriptClosure,
  staticImports,
  thirdPartyScripts,
  weightSentence,
} from './pageWeight.ts';

test('finds same-origin module scripts and modulepreloads, once each', () => {
  const html = `
    <link rel="modulepreload" href="/_astro/shared.js">
    <script type="module" src="/_astro/page.js"></script>
    <script type="module" src="/_astro/page.js"></script>
    <script defer src="https://static.cloudflareinsights.com/beacon.min.js"></script>
    <script type="application/ld+json">{}</script>`;
  assert.deepEqual(pageScripts(html), ['/_astro/shared.js', '/_astro/page.js']);
});

test('names third-party script hosts separately', () => {
  const html = '<script defer src="https://static.cloudflareinsights.com/beacon.min.js"></script>';
  assert.deepEqual(thirdPartyScripts(html), ['static.cloudflareinsights.com']);
  assert.deepEqual(thirdPartyScripts('<script src="/_astro/a.js"></script>'), []);
});

test('follows static imports in minified modules but not dynamic import()', () => {
  const js =
    'import{a as b}from"./chunk.Ab1.js";import"./side.js";export{c}from"../x.js";const l=()=>import("./lazy.js");';
  assert.deepEqual(staticImports(js), ['./chunk.Ab1.js', './side.js', '../x.js']);
});

test('collects the whole import graph once, even with cycles', () => {
  const files: Record<string, string> = {
    '/_astro/page.js': 'import"./a.js";import"./b.js";',
    '/_astro/a.js': 'import"./b.js";',
    '/_astro/b.js': 'import"./a.js";',
  };
  const read = (path: string) => files[path] ?? '';
  assert.deepEqual(scriptClosure(['/_astro/page.js'], read), [
    '/_astro/page.js',
    '/_astro/a.js',
    '/_astro/b.js',
  ]);
});

test('formats KB with a decimal only when small', () => {
  assert.equal(formatKb(3174), '3.1 KB');
  assert.equal(formatKb(20480), '20 KB');
});

test('writes the sentence, naming analytics rather than measuring it', () => {
  assert.equal(
    weightSentence({ html: 10035, js: 3174 }),
    'This page: 9.8 KB of HTML and 3.1 KB of JavaScript, compressed'
  );
  assert.equal(
    weightSentence({ html: 10035, js: 0, thirdParty: ['static.cloudflareinsights.com'] }),
    "This page: 9.8 KB of HTML and no JavaScript, compressed, plus Cloudflare's analytics beacon"
  );
});
