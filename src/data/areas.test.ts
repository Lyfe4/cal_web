import { test } from 'node:test';
import assert from 'node:assert/strict';
import { areaLinks, localPageSchema, localPages } from './areas.ts';
import { businessId, businessSchema } from './schema.ts';
import { newEnglandTowns, siteUrl } from './site.ts';

const areaServed = businessSchema.areaServed as { '@type': string; name: string }[];

test('the business serves every place a local page is about', () => {
  for (const page of Object.values(localPages)) {
    assert.ok(
      areaServed.some((a) => a['@type'] === page.place.type && a.name === page.place.name),
      `${page.place.name} is missing from areaServed`
    );
  }
});

test('the business serves every New England town the site lists', () => {
  for (const town of newEnglandTowns) {
    assert.ok(
      areaServed.some((a) => a['@type'] === 'City' && a.name === town),
      town
    );
  }
});

test('a local page is a WebPage about the sitewide business, not a second business', () => {
  const node = localPageSchema(localPages.armidale);
  assert.equal(node['@type'], 'WebPage');
  assert.equal(node.url, `${siteUrl}/web-design-armidale`);
  assert.equal(node['@id'], `${siteUrl}/web-design-armidale#webpage`);
  assert.deepEqual(node.about, { '@id': businessId });
});

test('every local page has a short description and no em dashes', () => {
  for (const page of Object.values(localPages)) {
    assert.ok(page.description.length <= 160, `${page.href}: ${page.description.length} chars`);
    for (const text of [page.heading, page.title, page.description]) {
      assert.equal(text.includes('—'), false, text);
    }
  }
});

test('the footer links every local page once', () => {
  assert.equal(new Set(areaLinks.map((p) => p.href)).size, Object.keys(localPages).length);
});
