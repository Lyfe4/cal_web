import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitCaseSections } from './caseSections.ts';

const headings = [
  { depth: 2, slug: 'the-brief', text: 'The brief' },
  { depth: 2, slug: 'how-its-built', text: 'How it’s built' },
  { depth: 3, slug: 'for-developers', text: 'For developers' },
];

const html = [
  '<h2 id="the-brief">The brief</h2>',
  '<p>One.</p>',
  '<h2 id="how-its-built">How it&#x27;s built</h2>',
  '<p>Two.</p>',
  '<h3 id="for-developers">For developers</h3>',
  '<p>Three.</p>',
].join('\n');

test('splits on each second-level heading and drops the heading itself', () => {
  const sections = splitCaseSections(html, headings);
  assert.deepEqual(
    sections.map((s) => s.id),
    ['the-brief', 'how-its-built']
  );
  assert.equal(sections[0]?.html, '<p>One.</p>');
  assert.equal(sections[0]?.html.includes('<h2'), false);
});

test('takes titles from the heading metadata, not the escaped HTML', () => {
  assert.equal(splitCaseSections(html, headings)[1]?.title, 'How it’s built');
});

test('keeps third-level headings inside their section', () => {
  const body = splitCaseSections(html, headings)[1]?.html ?? '';
  assert.match(body, /<h3 id="for-developers">/);
  assert.match(body, /Three\./);
});

test('refuses text before the first section', () => {
  assert.throws(() => splitCaseSections(`<p>Stray.</p>\n${html}`, headings), /must start/);
});

test('refuses headings and sections that do not line up', () => {
  assert.throws(() => splitCaseSections(html, headings.slice(1)), /Found 2 sections/);
});
