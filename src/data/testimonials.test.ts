import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitLead, testimonials } from './testimonials.ts';

test('splitting a quote for display never changes its words', () => {
  for (const { quote } of testimonials) {
    const { lead, rest } = splitLead(quote);
    assert.equal(rest ? `${lead} ${rest}` : lead, quote);
  }
});

test('takes the first sentence as the lead', () => {
  assert.deepEqual(splitLead('One. Two, three. Four!'), {
    lead: 'One.',
    rest: 'Two, three. Four!',
  });
});

test('keeps a single-sentence quote whole', () => {
  assert.deepEqual(splitLead('Just one sentence.'), { lead: 'Just one sentence.', rest: '' });
});

test('every testimonial links to where it was published', () => {
  for (const { source } of testimonials) {
    assert.match(source.href, /^https:\/\//);
  }
});
