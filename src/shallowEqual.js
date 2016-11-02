/**
 * Based on the shallowEqual.js code in fbjs.
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * Copyright (c) 2016, Felipe Thomé
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

function is(val1, val2) {
  // In this project, it's not important the distinction between -0 and +0.
  return val1 === val2 || (val1 !== val1 && val2 !== val2);
}

module.exports = function (o1, o2) {
  if (o1 === o2) {
    return true;
  }

  if (o1 === undefined || o1 === null || o2 === undefined || o2 === null) {
    return false;
  }

  var k1 = Object.keys(o1);
  var k2 = Object.keys(o2);

  if (k1.length !== k2.length) {
    return false;
  }

  for (var i = 0; i < k1.length; i++) {
    if (!hasOwnProperty.call(o2, k1[i]) || !is(o1[k1[i]], o2[k1[i]])) {
      return false;
    }
  }

  return true;
};