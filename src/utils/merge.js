var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

var merge = function () {
  var res = {};

  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      _extends(res, arguments[i]);
    }
  }

  return res;
};

module.exports = merge;