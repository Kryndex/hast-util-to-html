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
test('`omitOptionalTags` mode', function (t) {
  t.deepEqual(
    to(h('html'), {omitOptionalTags: true}),
    '',
    'should omit opening and closing tags'
  );

  t.deepEqual(
    to(h('html', {lang: 'en'}), {omitOptionalTags: true}),
    '<html lang="en">',
    'should not omit opening tags with attributes'
  );

  t.deepEqual(
    to(h('ol', [h('li', 'alpha'), h('li', 'bravo')]), {omitOptionalTags: true}),
    '<ol><li>alpha<li>bravo</ol>',
    'should ignore white-space when determining whether ' +
    'tags can be omitted (#1)'
  );

  t.deepEqual(
    to(h('ol', [h('li', 'alpha'), ' ', h('li', 'bravo'), '\t']), {omitOptionalTags: true}),
    '<ol><li>alpha <li>bravo\t</ol>',
    'should ignore white-space when determining whether ' +
    'tags can be omitted (#2)'
  );

  t.end();
});