import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canonicalPath } from './canonical.ts';

test('serves the home page at / in dev and in the build', () => {
  assert.equal(canonicalPath('/'), '/');
  assert.equal(canonicalPath('/index.html'), '/');
  assert.equal(canonicalPath('/index'), '/');
});

test('drops .html from built pages', () => {
  assert.equal(canonicalPath('/about.html'), '/about');
  assert.equal(canonicalPath('/work/lenbuild.html'), '/work/lenbuild');
  assert.equal(canonicalPath('/about'), '/about');
});

test('leaves pages that only end in "index" alone', () => {
  assert.equal(canonicalPath('/reindex.html'), '/reindex');
});
