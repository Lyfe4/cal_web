import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isValidPhone, isValidName } from './contactValidation.ts';

test('accepts Australian mobiles and landlines in common formats', () => {
  for (const phone of [
    '0412 345 678',
    '0412345678',
    '+61 412 345 678',
    '+61412345678',
    '+61 447 576 460',
    '+61 (0)412 345 678',
    '(02) 6772 1234',
    '02 6772 1234',
    '02-6772-1234',
    '+61 2 6772 1234',
    '1300 123 456',
    '1800 123 456',
    '  0412 345 678  ',
  ]) {
    assert.ok(isValidPhone(phone), phone);
  }
});

test('phone is optional', () => {
  assert.ok(isValidPhone(''));
  assert.ok(isValidPhone('   '));
});

test('rejects numbers that are not Australian phone numbers', () => {
  for (const phone of [
    '555-123-4567', // North American
    '0412 345 67', // too short
    '0412 345 6789', // too long
    '0512 345 678', // no such prefix
    '+44 20 7946 0958',
    'call me',
  ]) {
    assert.ok(!isValidPhone(phone), phone);
  }
});

test('accepts real names with apostrophes, hyphens and non-Latin letters', () => {
  for (const name of ["O'Brien", 'Smith-Jones', 'José', 'Lê', 'Wei', '李明', 'Mary Ann', ' Jo ']) {
    assert.ok(isValidName(name), name);
  }
});

test('rejects empty and one-character names', () => {
  for (const name of ['', '   ', 'J', ' J ']) {
    assert.ok(!isValidName(name), JSON.stringify(name));
  }
});
