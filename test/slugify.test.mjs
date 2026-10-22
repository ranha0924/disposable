import test from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from '../src/slugify.mjs';

test('영문은 소문자로, 공백·기호 덩어리는 하이픈 하나로', () => {
  assert.equal(slugify('Hello, World!'), 'hello-world');
  assert.equal(slugify('  2026 Q4 -- Plan '), '2026-q4-plan');
  assert.equal(slugify('a_b.c/d'), 'a-b-c-d');
  assert.equal(slugify('already-a-slug'), 'already-a-slug');
});

test('영문 소문자와 숫자가 아닌 글자는 남기지 않는다', () => {
  assert.equal(slugify('Café 메모 2'), 'caf-2');
  assert.equal(slugify('Kelvin'), 'elvin');
});

test('앞뒤 하이픈은 없앤다', () => {
  assert.equal(slugify('--Plan--'), 'plan');
  assert.equal(slugify('\tnew\nline\t'), 'new-line');
});

test('결과가 비면 untitled', () => {
  assert.equal(slugify('!!!'), 'untitled');
  assert.equal(slugify(''), 'untitled');
  assert.equal(slugify('   '), 'untitled');
  assert.equal(slugify('한글 제목'), 'untitled');
});

test('문자열이 아니면 TypeError', () => {
  for (const value of [undefined, null, 42, ['a'], { toString: () => 'a' }, new String('a')]) {
    assert.throws(() => slugify(value), TypeError);
  }
});
