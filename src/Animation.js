function Animation() {
  this._frameIds = {};
}

Animation.prototype._getKey = function (){
  var key;
  while (!key || this._frameIds.hasOwnProperty(key)){
    key = Math.floor(Math.random() * 1E9);
  }
  return key;
};

Animation.prototype.requestNextFrame = function (callback) {
  var instance = this;
  var key = instance._getKey();

  instance._frameIds[key] = requestAnimationFrame(function() {
    instance._frameIds[key] = requestAnimationFrame(function(timestamp) {
      delete instance._frameIds[key];
      callback(timestamp);
    });
  });

  return key;
};

Animation.prototype.cancelFrame = function (key) {
  if (this._frameIds[key]) {
    cancelAnimationFrame(this._frameIds[key]);
    delete this._frameIds[key];
  }
};

Animation.prototype.cancelAllFrames = function () {
  for (var key in this._frameIds) {
    if (this._frameIds.hasOwnProperty(key)) {
      cancelAnimationFrame(this._frameIds[key]);
    }
  }

  this._frameIds = {};
};

module.exports = Animation;

// var Animation = (function(){
//   var frameIds = {};

//   var _getKey = function (){
//     var key;
//     while (!key || frameIds.hasOwnProperty(key)){
//       key = Math.floor(Math.random() * 1E9);
//     }
//     return key;
//   };

//   var requestNextFrame = function (callback) {
//     var key = _getKey();

//     frameIds[key] = requestAnimationFrame(function() {
//       frameIds[key] = requestAnimationFrame(function(timestamp) {
//         delete frameIds[key];
//         callback(timestamp);
//       });
//     });

//     return key;
//   };

//   var cancelFrame = function (key) {
//     if (frameIds[key]) {
//       cancelAnimationFrame(frameIds[key]);
//       delete frameIds[key];
//     }
//   };

//   var cancelAllFrames = function () {
//     Object.keys(frameIds).forEach(function (key) {
//       cancelAnimationFrame(frameIds[key]);
//     });

//     frameIds = {};
//   };

//   return {
//     requestNextFrame: requestNextFrame,
//     cancelFrame: cancelFrame,
//     cancelAllFrames: cancelAllFrames,
//   };

// })();