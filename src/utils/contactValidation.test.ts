import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  enquiryForPackage,
  enquirySubject,
  isEnquiryPackage,
  isValidEmail,
  isValidName,
  isValidPhone,
  validateContact,
  validateField,
  type ContactValues,
} from './contactValidation.ts';

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

test('accepts real names with apostrophes, hyphens, non-Latin letters and one character', () => {
  for (const name of [
    "O'Brien",
    'Smith-Jones',
    'José',
    'Lê',
    'Wei',
    '李明',
    'Mary Ann',
    ' Jo ',
    '李',
    '이',
    'J',
    ' J ',
  ]) {
    assert.ok(isValidName(name), name);
  }
});

test('rejects empty and whitespace-only names', () => {
  for (const name of ['', '   ', '\t\n']) {
    assert.ok(!isValidName(name), JSON.stringify(name));
  }
});

test('accepts ordinary email addresses and rejects obvious mistakes', () => {
  for (const email of [
    'jo@example.com',
    'jo.smith+quote@mail.example.com.au',
    ' jo@example.com ',
  ]) {
    assert.ok(isValidEmail(email), email);
  }
  for (const email of ['', 'jo', 'jo@', 'jo@example', 'jo @example.com', 'jo@example.c']) {
    assert.ok(!isValidEmail(email), email);
  }
});

const valid: ContactValues = {
  firstName: 'Jo',
  lastName: 'Smith',
  email: 'jo@example.com',
  phone: '',
  enquiry: 'New website',
  message: 'I need a site for my bakery.',
};

test('a complete form has no errors', () => {
  assert.deepEqual(validateContact(valid), {});
});

test('reports every problem, in the order the fields appear', () => {
  const errors = validateContact({
    ...valid,
    firstName: '',
    email: 'jo@',
    enquiry: '',
    message: 'Hi',
  });
  assert.deepEqual(Object.keys(errors), ['firstName', 'email', 'enquiry', 'message']);
});

test('one-character names pass, and whitespace-only names are required errors', () => {
  assert.deepEqual(validateContact({ ...valid, firstName: '이', lastName: ' 李 ' }), {});
  assert.equal(validateField('lastName', '   '), 'Enter your last name.');
});

test('only the three enquiry types are accepted', () => {
  assert.equal(validateField('enquiry', 'App or integration'), '');
  assert.notEqual(validateField('enquiry', 'Starter'), '');
});

test('package links preselect the matching enquiry type', () => {
  assert.equal(enquiryForPackage.starter, 'New website');
  assert.equal(enquiryForPackage.professional, 'New website');
  assert.equal(enquiryForPackage.custom, 'App or integration');
  assert.ok(isEnquiryPackage('starter'));
  assert.ok(!isEnquiryPackage('toString'));
  assert.ok(!isEnquiryPackage(null));
});

test('the email subject names the enquiry type and any package', () => {
  assert.equal(
    enquirySubject('New website', 'starter'),
    'New website (Starter website) from the website'
  );
  assert.equal(enquirySubject('Something else'), 'Something else from the website');
  assert.equal(enquirySubject(''), 'Enquiry from the website');
});
