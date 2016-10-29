var AnimatedProperties = require('./AnimatedProperties');

var getMaximumTimeProperty = function (transitions) {
  var longestTime = 0;
  var longestTimeProperty = '';
  var duration = -1;
  var delay = -1;

  if (transitions.transitionProperty) {
    var propertyArray = transitions.transitionProperty;
    var durationArray = transitions.transitionDuration;
    var delayArray = transitions.transitionDelay;

    for (var i = 0; i < propertyArray.length; i++) {
      duration = durationArray[i % durationArray.length];
      delay = delayArray[i % durationArray.length];

      if (duration + delay >= longestTime) {
        longestTime = duration + delay;
        longestTimeProperty = propertyArray[i];
      }
    }
  }

  if (longestTime === 0) return '';

  return longestTimeProperty;
};

var isInPropertyList = function (propertyName, propertyArray) {
  var shorthandArray = AnimatedProperties.getShorthandNames(propertyName);
  shorthandArray.push(propertyName);

  for (var i = 0; i < shorthandArray.length; i++) {
    if (propertyArray.indexOf(shorthandArray[i]) >= 0) return true;
  }

  return false;
};

var isShorthand = function (shorthand, property, propertyArray) {
  var shorthandArray = AnimatedProperties.getShorthandNames(property);
  var idx = shorthandArray.indexOf(shorthand);

  if (idx === -1) return false;

  for (var i = idx + 1; i < shorthandArray.length; i++) {
    if (isInPropertyList(shorthandArray[i], propertyArray)) return false;
  }

  return true;
};

module.exports = {
  getMaximumTimeProperty: getMaximumTimeProperty,
  isInPropertyList: isInPropertyList,
  isShorthand: isShorthand,
};