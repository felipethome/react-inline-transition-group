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