module.exports = function () {
  global.requestAnimationFrame = function (cb) {
    cb();
  };

  global.cancelAnimationFrame = function () {};
};