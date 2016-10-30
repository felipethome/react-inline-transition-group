/**
 * Copyright (c) 2016, Felipe Thomé
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Information about CSS properties that can be animated.
 *
 * See:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties
 */

var shorthandNames = {
  '-moz-outline-radius-bottomleft': '-moz-outline-radius',
  '-moz-outline-radius-bottomright': '-moz-outline-radius',
  '-moz-outline-radius-topleft': '-moz-outline-radius',
  '-moz-outline-radius-topright': '-moz-outline-radius',
  '-webkit-text-stroke-color': '-webkit-text-stroke',
  '-webkit-text-stroke-width': '-webkit-text-stroke',

  'background-color': 'background',
  'background-position': 'background',
  'background-size': 'background',

  'border-bottom-color': 'border border-bottom border-color',
  'border-bottom-left-radius': 'border-radius',
  'border-bottom-right-radius': 'border-radius',
  'border-bottom-width': 'border border-bottom border-width',

  'border-left-color': 'border border-left border-color',
  'border-left-width': 'border border-left border-width',

  'border-right-color': 'border border-right border-color',
  'border-right-width': 'border border-right border-width',

  'border-top-color': 'border border-top border-color',
  'border-top-left-radius': 'border-radius',
  'border-top-right-radius': 'border-radius',
  'border-top-width': 'border border-top border-width',

  'column-rule-color': 'column-rule',
  'column-rule-width': 'column-rule',

  'column-width': 'columns',
  'column-count': 'columns',

  'flex-basis': 'flex',
  'flex-grow': 'flex',
  'flex-shrink': 'flex',

  'font-size': 'font',
  'font-weight': 'font',

  'grid-column-gap': 'grid-gap',
  'grid-row-gap': 'grid-gap',

  'line-height': 'font',

  'margin-bottom': 'margin',
  'margin-left': 'margin',
  'margin-right': 'margin',
  'margin-top': 'margin',

  'mask-position': 'mask',
  'mask-size': 'mask',

  'outline-color': 'outline',
  'outline-width': 'outline',

  'padding-bottom': 'padding',
  'padding-left': 'padding',
  'padding-right': 'padding',
  'padding-top': 'padding',

  'text-emphasis-color': 'text-emphasis',
};

var getShorthandNames = function (property) {
  var shorthands = shorthandNames[property];

  if (shorthands) return shorthands.split(' ');

  return [];
};

module.exports = {
  getShorthandNames: getShorthandNames,
};