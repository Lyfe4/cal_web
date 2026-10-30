import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildJsonLd, businessId, personId } from './schema.ts';

type Doc = { '@graph': Record<string, unknown>[] };
const parse = (json: string): Doc => JSON.parse(json) as Doc;

test('always includes the business and its founder', () => {
  const graph = parse(buildJsonLd())['@graph'];
  const business = graph.find((n) => n['@id'] === businessId);
  const person = graph.find((n) => n['@id'] === personId);
  assert.equal(business?.['@type'], 'ProfessionalService');
  assert.deepEqual(business?.founder, { '@id': personId });
  assert.equal(person?.name, 'Calvin Reinke');
  assert.equal('openingHoursSpecification' in (business ?? {}), false);
});

test('adds page schema alongside the sitewide nodes', () => {
  const graph = parse(buildJsonLd({ '@type': 'ContactPage', name: 'Contact' }))['@graph'];
  assert.equal(graph.length, 3);
  assert.ok(graph.some((n) => n['@type'] === 'ContactPage'));
});

test('merges a page node that shares an @id instead of replacing it', () => {
  const graph = parse(
    buildJsonLd({ '@type': 'Person', '@id': personId, description: 'About page' })
  )['@graph'];
  const person = graph.filter((n) => n['@id'] === personId);
  assert.equal(person.length, 1);
  assert.equal(person[0]?.name, 'Calvin Reinke');
  assert.equal(person[0]?.description, 'About page');
});

test('cannot break out of the script element', () => {
  const json = buildJsonLd({ '@type': 'Thing', name: '</script><script>alert(1)</script>' });
  assert.equal(json.includes('</script>'), false);
  assert.equal(parse(json)['@graph'].at(-1)?.name, '</script><script>alert(1)</script>');
});
