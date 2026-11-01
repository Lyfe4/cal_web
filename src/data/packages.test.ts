import { test } from 'node:test';
import assert from 'node:assert/strict';
import { websitePackages } from './packages.ts';

// /services lines the two packages up row for row on desktop, list rows included, with a
// grid of six list rows (services.astro). A longer list needs that grid updated too.
test('gives both website packages six list items', () => {
  for (const pkg of websitePackages) assert.equal(pkg.includes.length, 6, pkg.name);
});

test('labels both lists, so the label row lines up', () => {
  for (const pkg of websitePackages) assert.ok(pkg.intro.length > 0, pkg.name);
});
