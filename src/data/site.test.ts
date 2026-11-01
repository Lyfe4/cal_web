import { test } from 'node:test';
import assert from 'node:assert/strict';
import { business, formatPrice, formattedAddress, pricing } from './site.ts';

test('formats prices as whole Australian dollars', () => {
  assert.equal(formatPrice(pricing.starter.from), '$600');
  assert.equal(formatPrice(pricing.professional.from), '$1,125');
});

test('formats the address in Australia Post style', () => {
  assert.equal(formattedAddress, 'Armidale NSW 2350');
});

test('keeps the displayed phone and the tel: link the same number', () => {
  const digits = business.phone.display.replace(/\s/g, '');
  assert.equal(business.phone.href, `tel:${digits}`);
});
