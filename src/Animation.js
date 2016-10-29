var _frameIds = {};

var _getKey = function () {
  var key;
  while (!key || _frameIds.hasOwnProperty(key)) {
    key = Math.floor(Math.random() * 1E9);
  }
  return key;
};

var requestNextFrame = function (callback) {
  var key = _getKey();

  _frameIds[key] = requestAnimationFrame(function () {
    _frameIds[key] = requestAnimationFrame(function (timestamp) {
      delete _frameIds[key];
      callback(timestamp);
    });
  });

  return key;
};

var cancelFrames = function (key) {
  if (Array.isArray(key)) {
    for (var i = 0; i < key.length; i++) {
      if (_frameIds[key[i]]) {
        cancelAnimationFrame(_frameIds[key[i]]);
      }
    }
  }
  else if (_frameIds[key]) {
    cancelAnimationFrame(_frameIds[key]);
    delete _frameIds[key];
  }
};

module.exports = {
  requestNextFrame: requestNextFrame,
  cancelFrames: cancelFrames,
};