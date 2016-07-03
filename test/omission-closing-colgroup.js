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
var u = require('unist-builder');
var to = require('..');

/* Tests. */
test('`colgroup` (closing)', function (t) {
  t.deepEqual(
    to(h('colgroup'), {omitOptionalTags: true}),
    '<colgroup>',
    'should not omit tag without children'
  );

  t.deepEqual(
    to(h('colgroup', h('col', {span: 2})), {omitOptionalTags: true}),
    '<col span="2">',
    'should omit tag if head is `col`'
  );

  t.deepEqual(
    to(h('colgroup', [u('comment', 'alpha')]), {omitOptionalTags: true}),
    '<colgroup><!--alpha-->',
    'should not omit tag if head is not `col`'
  );

  t.deepEqual(
    to(h('table', [
      h('colgroup', [h('col', {span: 2})]),
      h('colgroup', [h('col', {span: 3})])
    ]), {omitOptionalTags: true}),
    '<table><col span="2"><colgroup><col span="3"></table>',
    'should not omit tag if previous is `colgroup` whose ' +
    'closing tag is omitted'
  );

  t.end();
});