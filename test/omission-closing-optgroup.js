/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast-util-to-html
 * @fileoverview Test suite for `hast-util-to-html`.
 */

'use strict';

/* eslint-env node */

/* Dependencies. */
var test = require('tape');
var h = require('hastscript');
var to = require('..');

/* Tests. */
test('`optgroup` (closing)', function (t) {
  t.deepEqual(
    to(h('optgroup'), {omitOptionalTags: true}),
    '<optgroup>',
    'should omit tag without parent'
  );

  t.deepEqual(
    to(h('select', h('optgroup')), {omitOptionalTags: true}),
    '<select><optgroup></select>',
    'should omit tag without following'
  );

  t.deepEqual(
    to(h('select', [h('optgroup'), h('optgroup')]), {omitOptionalTags: true}),
    '<select><optgroup><optgroup></select>',
    'should omit tag followed by `optgroup`'
  );

  t.deepEqual(
    to(h('select', [h('optgroup'), h('p')]), {omitOptionalTags: true}),
    '<select><optgroup></optgroup><p></select>',
    'should not omit tag followed by others'
  );

  t.end();
});