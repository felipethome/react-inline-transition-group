/**
 * Copyright (c) 2016, Felipe Thomé
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parse the property, duration and delay of CSS transitions in React style
 * objects. The timing function is not considered, because it is not important
 * for the purpose of ReactInlineTransitionGroup.
 *
 * Also, it is not responsability of this parser to make the match between
 * properties and their delays and duration values. This will be performed by
 * the TransitionInfo module.
 *
 * Specs: https://www.w3.org/TR/css3-transitions/
 */

var StringCache = require('./StringCache');

// Map a transition string with its processed values. If the string is a
// shorthand transition, the value will be an array of 3 positions, where each
// position is another array with the processed values of properties,
// durations and delays, respectively.
var cache = new StringCache(150);

var _parseNumericValues = function (valuesArray) {
  var ans = [];
  var re = /([0-9]*\.?[0-9]+)(m?s)/;

  for (var i = 0; i < valuesArray.length; i++) {
    var valuePieces = valuesArray[i].match(re);
    if (valuePieces) {
      if (valuePieces[2] === 's') ans.push(parseFloat(valuePieces[1] * 1000));
      else ans.push(parseFloat(valuePieces[1]));
    }
    else {
      throw new Error('Expected a time value instead of: ' + valuesArray[i]);
    }
  }

  return ans;
};

var _parseTransition = function (propertyStr, numeric) {
  var cachedValue = cache.get(propertyStr);
  if (cachedValue) return cachedValue;

  var values = propertyStr.toLowerCase().trim().split(/\s*,\s*/);

  if (numeric) {
    values = _parseNumericValues(values);
  }

  cache.set(propertyStr, values);

  return values;
};

var _parseShorthand = function (propertyStr) {
  var cachedValue = cache.get(propertyStr);
  if (cachedValue) return cachedValue;

  var propertyArray = [];
  var durationArray = [];
  var delayArray = [];
  var re = /^([0-9]*\.?[0-9]+)(m?s)$/;
  var transitions =
    propertyStr.toLowerCase().replace(/cubic\-bezier\(.*\)/, '').trim()
    .split(/\s*,\s*/);

  for (var i = 0; i < transitions.length; i++) {
    var transitionPieces = transitions[i].split(/\s+/);

    propertyArray.push(transitionPieces[0]);
    durationArray.push(transitionPieces[1] || '0s');
    if (transitionPieces[2] === undefined) {
      delayArray.push('0s');
    }
    else if (re.test(transitionPieces[2])) {
      delayArray.push(transitionPieces[2]);
    }
    else if (transitionPieces[3] === undefined) {
      delayArray.push('0s');
    }
    else {
      delayArray.push(transitionPieces[3]);
    }
  }

  durationArray = _parseNumericValues(durationArray);
  delayArray = _parseNumericValues(delayArray);

  cache.set(propertyStr, [propertyArray, durationArray, delayArray]);

  return [propertyArray, durationArray, delayArray];
};

var getTransitionValues = function (styleObj) {
  var ans = {};

  if (styleObj === undefined) return ans;

  var keys = Object.keys(styleObj);
  var propertyFound = false;
  var durationFound = false;
  var delayFound = false;

  // Not guaranteed by spec, but normally Object.keys() return the keys in
  // the order they were assigned. Since, further transition keys in the
  // object will have priority over previous keys, iterate in descending order.
  for (var i = keys.length - 1; i >= 0; i--) {
    switch (keys[i]) {
      case 'transition':
      case 'WebkitTransition':
      case 'MozTransition':
      case 'msTransition':
        var shorthandValues = _parseShorthand(styleObj[keys[i]]);
        if (!propertyFound) ans.transitionProperty = shorthandValues[0];
        if (!durationFound) ans.transitionDuration = shorthandValues[1];
        if (!delayFound) ans.transitionDelay = shorthandValues[2];
        propertyFound = true;
        durationFound = true;
        delayFound = true;
        break;
      case 'transitionProperty':
      case 'WebkitTransitionProperty':
      case 'MozTransitionProperty':
      case 'msTransitionProperty':
        ans.transitionProperty = _parseTransition(styleObj[keys[i]]);
        propertyFound = true;
        break;
      case 'transitionDuration':
      case 'WebkitTransitionDuration':
      case 'MozTransitionDuration':
      case 'msTransitionDuration':
        ans.transitionDuration = _parseTransition(styleObj[keys[i]], true);
        durationFound = true;
        break;
      case 'transitionDelay':
      case 'WebkitTransitionDelay':
      case 'MozTransitionDelay':
      case 'msTransitionDelay':
        ans.transitionDelay = _parseTransition(styleObj[keys[i]], true);
        delayFound = true;
        break;
    }

    if (propertyFound && durationFound && delayFound) break;
  }

  return ans;
};

module.exports = {
  getTransitionValues: getTransitionValues,
};