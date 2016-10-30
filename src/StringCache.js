/**
 * Copyright (c) 2016, Felipe Thomé
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * String cache. The cache has a capacity that is defined in the moment of its
 * creation.
 */

function StringCache(capacity) {
  this._cache = {};
  this._capacity = capacity;
  this._size = 0;
}

StringCache.prototype.get = function (key) {
  return this._cache[key];
};

StringCache.prototype.set = function (key, value) {
  if (this._cache[key] !== undefined) {
    this._cache[key] = value;
  }
  else if (this._size < this._capacity) {
    this._size++;
    this._cache[key] = value;
  }
};

module.exports = StringCache;