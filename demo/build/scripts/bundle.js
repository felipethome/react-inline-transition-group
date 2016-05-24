(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/felipe/GitHub/react-inline-transition-group/demo/main.js":[function(require,module,exports){
var React = require('react');
var ReactDOM = require('react-dom');
var Transition = require('../src');

var Demo = React.createClass({
  displayName: 'Demo',

  getInitialState: function () {
    return {
      callbackMsg: '',
      count: 1
    };
  },

  _handleAdd: function () {
    this.setState(function (previousState) {
      return { count: Math.min(previousState.count + 1, 8) };
    });
  },

  _handleRemove: function () {
    this.setState(function (previousState) {
      return { count: Math.max(previousState.count - 1, 0) };
    });
  },

  _handleStartAppear: function (id) {
    this.setState({ callbackMsg: id + ' start to appear' });
  },

  _handleStartEnter: function (id) {
    this.setState({ callbackMsg: id + ' start to enter' });
  },

  _handleStartLeave: function (id) {
    this.setState({ callbackMsg: id + ' start to leave' });
  },

  _handleAppeared: function (id) {
    this.setState({ callbackMsg: id + ' appeared' });
  },

  _handleEntered: function (id) {
    this.setState({ callbackMsg: id + ' entered' });
  },

  _handleLeft: function (id) {
    this.setState({ callbackMsg: id + ' left' });
  },

  render: function () {
    var styles = {
      container: {
        height: '100%',
        width: '100%'
      },
      base: {
        background: '#FFF',
        borderRadius: '2px',
        width: '500px',
        height: '50px',
        marginBottom: '10px'
      },

      appear: {
        background: '#2196F3',
        transition: 'all 1000ms'
      },

      leave: {
        background: '#FFF',
        transition: 'all 500ms'
      },

      callback: {
        height: '20px',
        width: '500px',
        backgroundColor: '#FFF',
        padding: '5px 5px 5px 5px'
      }
    };

    var elems = [];

    for (var i = 0; i < this.state.count; i++) elems.push(React.createElement(
      'div',
      { key: i, id: i },
      i
    ));

    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(
        'div',
        { style: styles.callback },
        this.state.callbackMsg
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: this._handleAdd },
          'Add'
        ),
        React.createElement(
          'button',
          { onClick: this._handleRemove },
          'Remove'
        )
      ),
      React.createElement(
        Transition,
        {
          childrenBaseStyle: styles.base,
          childrenAppearStyle: styles.appear,
          childrenEnterStyle: styles.appear,
          childrenLeaveStyle: styles.leave,
          onChildAppeared: this._handleAppeared,
          onChildEntered: this._handleEntered,
          onChildLeft: this._handleLeft,
          onChildStartAppear: this._handleStartAppear,
          onChildStartEnter: this._handleStartEnter,
          onChildStartLeave: this._handleStartLeave
        },
        elems
      )
    );
  }
});

ReactDOM.render(React.createElement(Demo, null), document.getElementById('demo'));

},{"../src":"/Users/felipe/GitHub/react-inline-transition-group/src/index.js","react":"react","react-dom":"react-dom"}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/ExecutionEnvironment.js":[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;
},{}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/camelize.js":[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;
},{}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/camelizeStyleName.js":[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

'use strict';

var camelize = require('./camelize');

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;
},{"./camelize":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/camelize.js"}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/emptyFunction.js":[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/hyphenate.js":[function(require,module,exports){
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;
},{}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/hyphenateStyleName.js":[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

'use strict';

var hyphenate = require('./hyphenate');

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;
},{"./hyphenate":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/hyphenate.js"}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/memoizeStringOnly.js":[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks static-only
 */

'use strict';

/**
 * Memoizes the return value of a function that accepts one string argument.
 *
 * @param {function} callback
 * @return {function}
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

module.exports = memoizeStringOnly;
},{}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/warning.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  warning = function (condition, format) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };
}

module.exports = warning;
}).call(this,require('_process'))

},{"./emptyFunction":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/emptyFunction.js","_process":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/process/browser.js"}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/react/lib/CSSProperty.js":[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSProperty
 */

'use strict';

/**
 * CSS properties which accept numbers but are not in units of "px".
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

module.exports = CSSProperty;
},{}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/react/lib/CSSPropertyOperations.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSPropertyOperations
 */

'use strict';

var CSSProperty = require('./CSSProperty');
var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
var ReactPerf = require('./ReactPerf');

var camelizeStyleName = require('fbjs/lib/camelizeStyleName');
var dangerousStyleValue = require('./dangerousStyleValue');
var hyphenateStyleName = require('fbjs/lib/hyphenateStyleName');
var memoizeStringOnly = require('fbjs/lib/memoizeStringOnly');
var warning = require('fbjs/lib/warning');

var processStyleName = memoizeStringOnly(function (styleName) {
  return hyphenateStyleName(styleName);
});

var hasShorthandPropertyBug = false;
var styleFloatAccessor = 'cssFloat';
if (ExecutionEnvironment.canUseDOM) {
  var tempStyle = document.createElement('div').style;
  try {
    // IE8 throws "Invalid argument." if resetting shorthand style properties.
    tempStyle.font = '';
  } catch (e) {
    hasShorthandPropertyBug = true;
  }
  // IE8 only supports accessing cssFloat (standard) as styleFloat
  if (document.documentElement.style.cssFloat === undefined) {
    styleFloatAccessor = 'styleFloat';
  }
}

if (process.env.NODE_ENV !== 'production') {
  // 'msTransform' is correct, but the other prefixes should be capitalized
  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

  // style values shouldn't contain a semicolon
  var badStyleValueWithSemicolonPattern = /;\s*$/;

  var warnedStyleNames = {};
  var warnedStyleValues = {};
  var warnedForNaNValue = false;

  var warnHyphenatedStyleName = function (name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    process.env.NODE_ENV !== 'production' ? warning(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName(name), checkRenderMessage(owner)) : void 0;
  };

  var warnBadVendoredStyleName = function (name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    process.env.NODE_ENV !== 'production' ? warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner)) : void 0;
  };

  var warnStyleValueWithSemicolon = function (name, value, owner) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;
    process.env.NODE_ENV !== 'production' ? warning(false, 'Style property values shouldn\'t contain a semicolon.%s ' + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, '')) : void 0;
  };

  var warnStyleValueIsNaN = function (name, value, owner) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;
    process.env.NODE_ENV !== 'production' ? warning(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner)) : void 0;
  };

  var checkRenderMessage = function (owner) {
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  };

  /**
   * @param {string} name
   * @param {*} value
   * @param {ReactDOMComponent} component
   */
  var warnValidStyle = function (name, value, component) {
    var owner;
    if (component) {
      owner = component._currentElement._owner;
    }
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name, owner);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name, owner);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value, owner);
    }

    if (typeof value === 'number' && isNaN(value)) {
      warnStyleValueIsNaN(name, value, owner);
    }
  };
}

/**
 * Operations for dealing with CSS properties.
 */
var CSSPropertyOperations = {

  /**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @param {ReactDOMComponent} component
   * @return {?string}
   */
  createMarkupForStyles: function (styles, component) {
    var serialized = '';
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = styles[styleName];
      if (process.env.NODE_ENV !== 'production') {
        warnValidStyle(styleName, styleValue, component);
      }
      if (styleValue != null) {
        serialized += processStyleName(styleName) + ':';
        serialized += dangerousStyleValue(styleName, styleValue, component) + ';';
      }
    }
    return serialized || null;
  },

  /**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   * @param {ReactDOMComponent} component
   */
  setValueForStyles: function (node, styles, component) {
    var style = node.style;
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      if (process.env.NODE_ENV !== 'production') {
        warnValidStyle(styleName, styles[styleName], component);
      }
      var styleValue = dangerousStyleValue(styleName, styles[styleName], component);
      if (styleName === 'float' || styleName === 'cssFloat') {
        styleName = styleFloatAccessor;
      }
      if (styleValue) {
        style[styleName] = styleValue;
      } else {
        var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];
        if (expansion) {
          // Shorthand property that IE8 won't like unsetting, so unset each
          // component to placate it
          for (var individualStyleName in expansion) {
            style[individualStyleName] = '';
          }
        } else {
          style[styleName] = '';
        }
      }
    }
  }

};

ReactPerf.measureMethods(CSSPropertyOperations, 'CSSPropertyOperations', {
  setValueForStyles: 'setValueForStyles'
});

module.exports = CSSPropertyOperations;
}).call(this,require('_process'))

},{"./CSSProperty":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/react/lib/CSSProperty.js","./ReactPerf":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/react/lib/ReactPerf.js","./dangerousStyleValue":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/react/lib/dangerousStyleValue.js","_process":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/process/browser.js","fbjs/lib/ExecutionEnvironment":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/ExecutionEnvironment.js","fbjs/lib/camelizeStyleName":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/camelizeStyleName.js","fbjs/lib/hyphenateStyleName":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/hyphenateStyleName.js","fbjs/lib/memoizeStringOnly":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/memoizeStringOnly.js","fbjs/lib/warning":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/warning.js"}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/react/lib/ReactPerf.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPerf
 */

'use strict';

/**
 * ReactPerf is a general AOP system designed to measure performance. This
 * module only has the hooks: see ReactDefaultPerf for the analysis tool.
 */

var ReactPerf = {
  /**
   * Boolean to enable/disable measurement. Set to false by default to prevent
   * accidental logging and perf loss.
   */
  enableMeasure: false,

  /**
   * Holds onto the measure function in use. By default, don't measure
   * anything, but we'll override this if we inject a measure function.
   */
  storedMeasure: _noMeasure,

  /**
   * @param {object} object
   * @param {string} objectName
   * @param {object<string>} methodNames
   */
  measureMethods: function (object, objectName, methodNames) {
    if (process.env.NODE_ENV !== 'production') {
      for (var key in methodNames) {
        if (!methodNames.hasOwnProperty(key)) {
          continue;
        }
        object[key] = ReactPerf.measure(objectName, methodNames[key], object[key]);
      }
    }
  },

  /**
   * Use this to wrap methods you want to measure. Zero overhead in production.
   *
   * @param {string} objName
   * @param {string} fnName
   * @param {function} func
   * @return {function}
   */
  measure: function (objName, fnName, func) {
    if (process.env.NODE_ENV !== 'production') {
      var measuredFunc = null;
      var wrapper = function () {
        if (ReactPerf.enableMeasure) {
          if (!measuredFunc) {
            measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
          }
          return measuredFunc.apply(this, arguments);
        }
        return func.apply(this, arguments);
      };
      wrapper.displayName = objName + '_' + fnName;
      return wrapper;
    }
    return func;
  },

  injection: {
    /**
     * @param {function} measure
     */
    injectMeasure: function (measure) {
      ReactPerf.storedMeasure = measure;
    }
  }
};

/**
 * Simply passes through the measured function, without measuring it.
 *
 * @param {string} objName
 * @param {string} fnName
 * @param {function} func
 * @return {function}
 */
function _noMeasure(objName, fnName, func) {
  return func;
}

module.exports = ReactPerf;
}).call(this,require('_process'))

},{"_process":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/process/browser.js"}],"/Users/felipe/GitHub/react-inline-transition-group/node_modules/react/lib/dangerousStyleValue.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule dangerousStyleValue
 */

'use strict';

var CSSProperty = require('./CSSProperty');
var warning = require('fbjs/lib/warning');

var isUnitlessNumber = CSSProperty.isUnitlessNumber;
var styleWarnings = {};

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @param {ReactDOMComponent} component
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, component) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
    return '' + value; // cast to string
  }

  if (typeof value === 'string') {
    if (process.env.NODE_ENV !== 'production') {
      if (component) {
        var owner = component._currentElement._owner;
        var ownerName = owner ? owner.getName() : null;
        if (ownerName && !styleWarnings[ownerName]) {
          styleWarnings[ownerName] = {};
        }
        var warned = false;
        if (ownerName) {
          var warnings = styleWarnings[ownerName];
          warned = warnings[name];
          if (!warned) {
            warnings[name] = true;
          }
        }
        if (!warned) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
        }
      }
    }
    value = value.trim();
  }
  return value + 'px';
}

module.exports = dangerousStyleValue;
}).call(this,require('_process'))

},{"./CSSProperty":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/react/lib/CSSProperty.js","_process":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/process/browser.js","fbjs/lib/warning":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/fbjs/lib/warning.js"}],"/Users/felipe/GitHub/react-inline-transition-group/src/index.js":[function(require,module,exports){
var React = require('react');
var ReactTransitionGroup = require('react-addons-transition-group');
var TransitionContainer = require('./transition-container');

var Transition = React.createClass({
  displayName: 'Transition',

  propTypes: {
    children: React.PropTypes.node,
    childrenAppearStyle: React.PropTypes.object,
    childrenBaseStyle: React.PropTypes.object,
    childrenEnterStyle: React.PropTypes.object,
    childrenLeaveStyle: React.PropTypes.object,
    component: React.PropTypes.string,
    onChildAppeared: React.PropTypes.func,
    onChildEntered: React.PropTypes.func,
    onChildLeft: React.PropTypes.func,
    onChildStartAppear: React.PropTypes.func,
    onChildStartEnter: React.PropTypes.func,
    onChildStartLeave: React.PropTypes.func,
    style: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      component: 'div'
    };
  },

  render: function () {
    return React.createElement(
      ReactTransitionGroup,
      {
        component: this.props.component,
        style: this.props.style
      },
      React.Children.map(this.props.children, function (child, i) {
        return React.createElement(
          TransitionContainer,
          {
            key: i,
            id: ((child || {}).props || {}).id,
            childrenBaseStyle: this.props.childrenBaseStyle,
            childrenAppearStyle: this.props.childrenAppearStyle,
            childrenEnterStyle: this.props.childrenEnterStyle,
            childrenLeaveStyle: this.props.childrenLeaveStyle,
            onChildAppeared: this.props.onChildAppeared,
            onChildEntered: this.props.onChildEntered,
            onChildLeft: this.props.onChildLeft,
            onChildStartAppear: this.props.onChildStartAppear,
            onChildStartEnter: this.props.onChildStartEnter,
            onChildStartLeave: this.props.onChildStartLeave
          },
          child
        );
      }, this)
    );
  }

});

module.exports = Transition;

},{"./transition-container":"/Users/felipe/GitHub/react-inline-transition-group/src/transition-container.js","react":"react","react-addons-transition-group":"react-addons-transition-group"}],"/Users/felipe/GitHub/react-inline-transition-group/src/transition-container.js":[function(require,module,exports){
var React = require('react');
var ReactDOM = require('react-dom');
var CSSPropertyOperations = require('react/lib/CSSPropertyOperations');
var merge = require('./utils/merge');

var TransitionContainer = React.createClass({
  displayName: 'TransitionContainer',

  propTypes: {
    children: React.PropTypes.node,
    childrenAppearStyle: React.PropTypes.object,
    childrenBaseStyle: React.PropTypes.object,
    childrenEnterStyle: React.PropTypes.object,
    childrenLeaveStyle: React.PropTypes.object,
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    onChildAppeared: React.PropTypes.func,
    onChildEntered: React.PropTypes.func,
    onChildLeft: React.PropTypes.func,
    onChildStartAppear: React.PropTypes.func,
    onChildStartEnter: React.PropTypes.func,
    onChildStartLeave: React.PropTypes.func
  },

  componentWillMount: function () {
    this._dispatchTimeout = null;
    this._callbackTimeout = null;
    this._tick = 17;
  },

  componentWillUnmount: function () {
    clearTimeout(this._dispatchTimeout);
    clearTimeout(this._callbackTimeout);
  },

  componentWillAppear: function (callback) {
    this._transition(callback, 'appear');

    if (this.props.onChildStartAppear) {
      this.props.onChildStartAppear(this.props.id);
    }
  },

  componentDidAppear: function () {
    if (this.props.onChildAppeared) {
      this.props.onChildAppeared(this.props.id);
    }

    this._appeared = true;
  },

  componentWillEnter: function (callback) {
    this._transition(callback, 'enter');

    if (this.props.onChildStartEnter) {
      this.props.onChildStartEnter(this.props.id);
    }
  },

  componentDidEnter: function () {
    if (this.props.onChildEntered) {
      this.props.onChildEntered(this.props.id);
    }
  },

  componentWillLeave: function (callback) {
    this._transition(callback, 'leave');

    if (this.props.onChildStartLeave) {
      this.props.onChildStartLeave(this.props.id);
    }
  },

  componentDidLeave: function () {
    if (this.props.onChildLeft) this.props.onChildLeft(this.props.id);
  },

  _getTransitionProperties: function (computedStyle) {
    var properties = {};

    properties.transitionDuration = computedStyle.transitionDuration || computedStyle.WebkitTransitionDuration || computedStyle.MozTransitionDuration || computedStyle.msTransitionDuration;

    properties.transitionDelay = computedStyle.transitionDelay || computedStyle.WebkitTransitionDelay || computedStyle.MozTransitionDelay || computedStyle.msTransitionDelay;

    properties.transitionProperty = computedStyle.transitionProperty || computedStyle.WebkitTransitionProperty || computedStyle.msTransitionProperty || computedStyle.MozTransitionProperty;

    return properties;
  },

  // Specs: https://www.w3.org/TR/css3-transitions/
  // A lot of assumptions could be made here, like that probably the duration
  // and delay lists are already truncated by the size of the property list
  // or that values will be returned by window.getComputedStyle in seconds,
  // but I prefer to make this function less vulnerable to changes.
  _getTransitionMaximumTime: function (property, duration, delay) {
    var durationArray = duration.split(',');
    var delayArray = delay.split(',');
    var propertyArray = property.split(',');
    var longestTime = 0;
    var re = /([0-9]*\.?[0-9]+)(m?s)/;
    var durationFactor;
    var delayFactor;
    var durationGroups;
    var delayGroups;

    for (var i = 0; i < propertyArray.length; i++) {
      durationGroups = durationArray[i].match(re);
      if (durationGroups[2] === 's') durationFactor = 1000;else durationFactor = 1;

      delayGroups = delayArray[i].match(re);
      if (delayGroups[2] === 's') delayFactor = 1000;else delayFactor = 1;

      longestTime = Math.max(parseFloat(durationGroups[1] * durationFactor + delayGroups[1] * delayFactor), longestTime);
    }

    return longestTime;
  },

  _computeNewStyle: function (phase) {
    var currentStyle;
    if (phase === 'appear') currentStyle = this.props.childrenAppearStyle;else if (phase === 'enter') currentStyle = this.props.childrenEnterStyle;else currentStyle = this.props.childrenLeaveStyle;

    return merge(this.props.childrenBaseStyle, currentStyle);
  },

  _registerCallbackTimeout: function (callback, maxTransitionTime) {
    this._callbackTimeout = setTimeout(function () {
      callback();
    }, maxTransitionTime);
  },

  _transition: function (callback, phase) {
    if (phase === 'appear' && !this.props.childrenAppearStyle || phase === 'enter' && !this.props.childrenEnterStyle || phase === 'leave' && !this.props.childrenLeaveStyle) {
      callback();
    } else {
      this._dispatchTimeout = setTimeout(this._executeTransition.bind(this, callback, phase), this._tick);
    }
  },

  _executeTransition: function (callback, phase) {
    var node = ReactDOM.findDOMNode(this);

    if (!node) return;

    CSSPropertyOperations.setValueForStyles(node, this._computeNewStyle(phase));
    var properties = this._getTransitionProperties(getComputedStyle(node));

    var maxTransitionTime = this._getTransitionMaximumTime(properties.transitionProperty, properties.transitionDuration, properties.transitionDelay);

    this._registerCallbackTimeout(callback, maxTransitionTime);
  },

  render: function () {
    var props = { style: this.props.childrenBaseStyle };

    return React.cloneElement(this.props.children, props);
  }

});

module.exports = TransitionContainer;

},{"./utils/merge":"/Users/felipe/GitHub/react-inline-transition-group/src/utils/merge.js","react":"react","react-dom":"react-dom","react/lib/CSSPropertyOperations":"/Users/felipe/GitHub/react-inline-transition-group/node_modules/react/lib/CSSPropertyOperations.js"}],"/Users/felipe/GitHub/react-inline-transition-group/src/utils/merge.js":[function(require,module,exports){
var merge = function () {
  var res = {};

  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      Object.assign(res, arguments[i]);
    }
  }

  return res;
};

module.exports = merge;

},{}]},{},["/Users/felipe/GitHub/react-inline-transition-group/demo/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL21haW4uanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvY2FtZWxpemUuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvY2FtZWxpemVTdHlsZU5hbWUuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9oeXBoZW5hdGUuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvaHlwaGVuYXRlU3R5bGVOYW1lLmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL21lbW9pemVTdHJpbmdPbmx5LmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL3dhcm5pbmcuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9DU1NQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvQ1NTUHJvcGVydHlPcGVyYXRpb25zLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFBlcmYuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2Rhbmdlcm91c1N0eWxlVmFsdWUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvdHJhbnNpdGlvbi1jb250YWluZXIuanMiLCJzcmMvdXRpbHMvbWVyZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVo7QUFDQSxJQUFJLFdBQVcsUUFBUSxXQUFSLENBQWY7QUFDQSxJQUFJLGFBQWEsUUFBUSxRQUFSLENBQWpCOztBQUVBLElBQUksT0FBTyxNQUFNLFdBQU4sQ0FBa0I7QUFDM0IsZUFBYSxNQURjOztBQUczQixtQkFBaUIsWUFBWTtBQUMzQixXQUFPO0FBQ0wsbUJBQWEsRUFE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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNuSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDNU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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RUFBb0IsS0FBcEIsRUFBMkI7QUFDN0MsUUFBSSxPQUFPLFNBQVMsV0FBVCxDQUFxQixJQUFyQixDQUFYOztBQUVBLFFBQUksQ0FBQyxJQUFMLEVBQVc7O0FBRVgsMEJBQXNCLGlCQUF0QixDQUF3QyxJQUF4QyxFQUE4QyxLQUFLLGdCQUFMLENBQXNCLEtBQXRCLENBQTlDO0FBQ0EsUUFBSSxhQUFhLEtBQUssd0JBQUwsQ0FBOEIsaUJBQWlCLElBQWpCLENBQTlCLENBQWpCOztBQUVBLFFBQUksb0JBQW9CLEtBQUsseUJBQUwsQ0FDdEIsV0FBVyxrQkFEVyxFQUV0QixXQUFXLGtCQUZXLEVBR3RCLFdBQVcsZUFIVyxDQUF4Qjs7QUFNQSxTQUFLLHdCQUFMLENBQThCLFFBQTlCLEVBQXdDLGlCQUF4QztBQUNELEdBOUt5Qzs7QUFnTDFDLFVBQVEsWUFBWTtBQUNsQixRQUFJLFFBQVEsRUFBQyxPQUFPLEtBQUssS0FBTCxDQUFXLGlCQUFuQixFQUFaOztBQUVBLFdBQ0UsTUFBTSxZQUFOLENBQW1CLEtBQUssS0FBTCxDQUFXLFFBQTlCLEVBQXdDLEtBQXhDLENBREY7QUFHRDs7QUF0THlDLENBQWxCLENBQTFCOztBQTBMQSxPQUFPLE9BQVAsR0FBaUIsbUJBQWpCOzs7QUMvTEEsSUFBSSxRQUFRLFlBQVk7QUFDdEIsTUFBSSxNQUFNLEVBQVY7O0FBRUEsT0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFVBQVUsTUFBOUIsRUFBc0MsR0FBdEMsRUFBMkM7QUFDekMsUUFBSSxVQUFVLENBQVYsQ0FBSixFQUFrQjtBQUNoQixhQUFPLE1BQVAsQ0FBYyxHQUFkLEVBQW1CLFVBQVUsQ0FBVixDQUFuQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBTyxHQUFQO0FBQ0QsQ0FWRDs7QUFZQSxPQUFPLE9BQVAsR0FBaUIsS0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIFRyYW5zaXRpb24gPSByZXF1aXJlKCcuLi9zcmMnKTtcblxudmFyIERlbW8gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnRGVtbycsXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbGxiYWNrTXNnOiAnJyxcbiAgICAgIGNvdW50OiAxLFxuICAgIH07XG4gIH0sXG5cbiAgX2hhbmRsZUFkZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24gKHByZXZpb3VzU3RhdGUpIHtcbiAgICAgIHJldHVybiB7Y291bnQ6IE1hdGgubWluKHByZXZpb3VzU3RhdGUuY291bnQgKyAxLCA4KX07XG4gICAgfSk7XG4gIH0sXG5cbiAgX2hhbmRsZVJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24gKHByZXZpb3VzU3RhdGUpIHtcbiAgICAgIHJldHVybiB7Y291bnQ6IE1hdGgubWF4KHByZXZpb3VzU3RhdGUuY291bnQgLSAxLCAwKX07XG4gICAgfSk7XG4gIH0sXG5cbiAgX2hhbmRsZVN0YXJ0QXBwZWFyOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtjYWxsYmFja01zZzogaWQgKyAnIHN0YXJ0IHRvIGFwcGVhcid9KTtcbiAgfSxcblxuICBfaGFuZGxlU3RhcnRFbnRlcjogZnVuY3Rpb24gKGlkKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2FsbGJhY2tNc2c6IGlkICsgJyBzdGFydCB0byBlbnRlcid9KTtcbiAgfSxcblxuICBfaGFuZGxlU3RhcnRMZWF2ZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2FsbGJhY2tNc2c6IGlkICsgJyBzdGFydCB0byBsZWF2ZSd9KTtcbiAgfSxcblxuICBfaGFuZGxlQXBwZWFyZWQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2NhbGxiYWNrTXNnOiBpZCArICcgYXBwZWFyZWQnfSk7XG4gIH0sXG5cbiAgX2hhbmRsZUVudGVyZWQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2NhbGxiYWNrTXNnOiBpZCArICcgZW50ZXJlZCd9KTtcbiAgfSxcblxuICBfaGFuZGxlTGVmdDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2FsbGJhY2tNc2c6IGlkICsgJyBsZWZ0J30pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHlsZXMgPSB7XG4gICAgICBjb250YWluZXI6IHtcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICB9LFxuICAgICAgYmFzZToge1xuICAgICAgICBiYWNrZ3JvdW5kOiAnI0ZGRicsXG4gICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICBoZWlnaHQ6ICc1MHB4JyxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAnMTBweCcsXG4gICAgICB9LFxuXG4gICAgICBhcHBlYXI6IHtcbiAgICAgICAgYmFja2dyb3VuZDogJyMyMTk2RjMnLFxuICAgICAgICB0cmFuc2l0aW9uOiAnYWxsIDEwMDBtcycsXG4gICAgICB9LFxuXG4gICAgICBsZWF2ZToge1xuICAgICAgICBiYWNrZ3JvdW5kOiAnI0ZGRicsXG4gICAgICAgIHRyYW5zaXRpb246ICdhbGwgNTAwbXMnLFxuICAgICAgfSxcblxuICAgICAgY2FsbGJhY2s6IHtcbiAgICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICAgIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGJyxcbiAgICAgICAgcGFkZGluZzogJzVweCA1cHggNXB4IDVweCcsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICB2YXIgZWxlbXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5jb3VudDsgaSsrKVxuICAgICAgZWxlbXMucHVzaCg8ZGl2IGtleT17aX0gaWQ9e2l9PntpfTwvZGl2Pik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5jYWxsYmFja30+e3RoaXMuc3RhdGUuY2FsbGJhY2tNc2d9PC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLl9oYW5kbGVBZGR9PkFkZDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5faGFuZGxlUmVtb3ZlfT5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxUcmFuc2l0aW9uXG4gICAgICAgICAgY2hpbGRyZW5CYXNlU3R5bGU9e3N0eWxlcy5iYXNlfVxuICAgICAgICAgIGNoaWxkcmVuQXBwZWFyU3R5bGU9e3N0eWxlcy5hcHBlYXJ9XG4gICAgICAgICAgY2hpbGRyZW5FbnRlclN0eWxlPXtzdHlsZXMuYXBwZWFyfVxuICAgICAgICAgIGNoaWxkcmVuTGVhdmVTdHlsZT17c3R5bGVzLmxlYXZlfVxuICAgICAgICAgIG9uQ2hpbGRBcHBlYXJlZD17dGhpcy5faGFuZGxlQXBwZWFyZWR9XG4gICAgICAgICAgb25DaGlsZEVudGVyZWQ9e3RoaXMuX2hhbmRsZUVudGVyZWR9XG4gICAgICAgICAgb25DaGlsZExlZnQ9e3RoaXMuX2hhbmRsZUxlZnR9XG4gICAgICAgICAgb25DaGlsZFN0YXJ0QXBwZWFyPXt0aGlzLl9oYW5kbGVTdGFydEFwcGVhcn1cbiAgICAgICAgICBvbkNoaWxkU3RhcnRFbnRlcj17dGhpcy5faGFuZGxlU3RhcnRFbnRlcn1cbiAgICAgICAgICBvbkNoaWxkU3RhcnRMZWF2ZT17dGhpcy5faGFuZGxlU3RhcnRMZWF2ZX1cbiAgICAgICAgPlxuICAgICAgICAgIHtlbGVtc31cbiAgICAgICAgPC9UcmFuc2l0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbn0pO1xuXG5SZWFjdERPTS5yZW5kZXIoXG4gIDxEZW1vIC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtbycpXG4pOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxuLyoqXG4gKiBTaW1wbGUsIGxpZ2h0d2VpZ2h0IG1vZHVsZSBhc3Npc3Rpbmcgd2l0aCB0aGUgZGV0ZWN0aW9uIGFuZCBjb250ZXh0IG9mXG4gKiBXb3JrZXIuIEhlbHBzIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY2llcyBhbmQgYWxsb3dzIGNvZGUgdG8gcmVhc29uIGFib3V0XG4gKiB3aGV0aGVyIG9yIG5vdCB0aGV5IGFyZSBpbiBhIFdvcmtlciwgZXZlbiBpZiB0aGV5IG5ldmVyIGluY2x1ZGUgdGhlIG1haW5cbiAqIGBSZWFjdFdvcmtlcmAgZGVwZW5kZW5jeS5cbiAqL1xudmFyIEV4ZWN1dGlvbkVudmlyb25tZW50ID0ge1xuXG4gIGNhblVzZURPTTogY2FuVXNlRE9NLFxuXG4gIGNhblVzZVdvcmtlcnM6IHR5cGVvZiBXb3JrZXIgIT09ICd1bmRlZmluZWQnLFxuXG4gIGNhblVzZUV2ZW50TGlzdGVuZXJzOiBjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuICBjYW5Vc2VWaWV3cG9ydDogY2FuVXNlRE9NICYmICEhd2luZG93LnNjcmVlbixcblxuICBpc0luV29ya2VyOiAhY2FuVXNlRE9NIC8vIEZvciBub3csIHRoaXMgaXMgdHJ1ZSAtIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHR5cGVjaGVja3NcbiAqL1xuXG52YXIgX2h5cGhlblBhdHRlcm4gPSAvLSguKS9nO1xuXG4vKipcbiAqIENhbWVsY2FzZXMgYSBoeXBoZW5hdGVkIHN0cmluZywgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGNhbWVsaXplKCdiYWNrZ3JvdW5kLWNvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmRDb2xvclwiXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjYW1lbGl6ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9oeXBoZW5QYXR0ZXJuLCBmdW5jdGlvbiAoXywgY2hhcmFjdGVyKSB7XG4gICAgcmV0dXJuIGNoYXJhY3Rlci50b1VwcGVyQ2FzZSgpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW1lbGl6ZTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHR5cGVjaGVja3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYW1lbGl6ZSA9IHJlcXVpcmUoJy4vY2FtZWxpemUnKTtcblxudmFyIG1zUGF0dGVybiA9IC9eLW1zLS87XG5cbi8qKlxuICogQ2FtZWxjYXNlcyBhIGh5cGhlbmF0ZWQgQ1NTIHByb3BlcnR5IG5hbWUsIGZvciBleGFtcGxlOlxuICpcbiAqICAgPiBjYW1lbGl6ZVN0eWxlTmFtZSgnYmFja2dyb3VuZC1jb2xvcicpXG4gKiAgIDwgXCJiYWNrZ3JvdW5kQ29sb3JcIlxuICogICA+IGNhbWVsaXplU3R5bGVOYW1lKCctbW96LXRyYW5zaXRpb24nKVxuICogICA8IFwiTW96VHJhbnNpdGlvblwiXG4gKiAgID4gY2FtZWxpemVTdHlsZU5hbWUoJy1tcy10cmFuc2l0aW9uJylcbiAqICAgPCBcIm1zVHJhbnNpdGlvblwiXG4gKlxuICogQXMgQW5kaSBTbWl0aCBzdWdnZXN0c1xuICogKGh0dHA6Ly93d3cuYW5kaXNtaXRoLmNvbS9ibG9nLzIwMTIvMDIvbW9kZXJuaXpyLXByZWZpeGVkLyksIGFuIGAtbXNgIHByZWZpeFxuICogaXMgY29udmVydGVkIHRvIGxvd2VyY2FzZSBgbXNgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY2FtZWxpemVTdHlsZU5hbWUoc3RyaW5nKSB7XG4gIHJldHVybiBjYW1lbGl6ZShzdHJpbmcucmVwbGFjZShtc1BhdHRlcm4sICdtcy0nKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FtZWxpemVTdHlsZU5hbWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fVxuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHR5cGVjaGVja3NcbiAqL1xuXG52YXIgX3VwcGVyY2FzZVBhdHRlcm4gPSAvKFtBLVpdKS9nO1xuXG4vKipcbiAqIEh5cGhlbmF0ZXMgYSBjYW1lbGNhc2VkIHN0cmluZywgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGh5cGhlbmF0ZSgnYmFja2dyb3VuZENvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmQtY29sb3JcIlxuICpcbiAqIEZvciBDU1Mgc3R5bGUgbmFtZXMsIHVzZSBgaHlwaGVuYXRlU3R5bGVOYW1lYCBpbnN0ZWFkIHdoaWNoIHdvcmtzIHByb3Blcmx5XG4gKiB3aXRoIGFsbCB2ZW5kb3IgcHJlZml4ZXMsIGluY2x1ZGluZyBgbXNgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gaHlwaGVuYXRlKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3VwcGVyY2FzZVBhdHRlcm4sICctJDEnKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGh5cGhlbmF0ZTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHR5cGVjaGVja3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoeXBoZW5hdGUgPSByZXF1aXJlKCcuL2h5cGhlbmF0ZScpO1xuXG52YXIgbXNQYXR0ZXJuID0gL15tcy0vO1xuXG4vKipcbiAqIEh5cGhlbmF0ZXMgYSBjYW1lbGNhc2VkIENTUyBwcm9wZXJ0eSBuYW1lLCBmb3IgZXhhbXBsZTpcbiAqXG4gKiAgID4gaHlwaGVuYXRlU3R5bGVOYW1lKCdiYWNrZ3JvdW5kQ29sb3InKVxuICogICA8IFwiYmFja2dyb3VuZC1jb2xvclwiXG4gKiAgID4gaHlwaGVuYXRlU3R5bGVOYW1lKCdNb3pUcmFuc2l0aW9uJylcbiAqICAgPCBcIi1tb3otdHJhbnNpdGlvblwiXG4gKiAgID4gaHlwaGVuYXRlU3R5bGVOYW1lKCdtc1RyYW5zaXRpb24nKVxuICogICA8IFwiLW1zLXRyYW5zaXRpb25cIlxuICpcbiAqIEFzIE1vZGVybml6ciBzdWdnZXN0cyAoaHR0cDovL21vZGVybml6ci5jb20vZG9jcy8jcHJlZml4ZWQpLCBhbiBgbXNgIHByZWZpeFxuICogaXMgY29udmVydGVkIHRvIGAtbXMtYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGh5cGhlbmF0ZVN0eWxlTmFtZShzdHJpbmcpIHtcbiAgcmV0dXJuIGh5cGhlbmF0ZShzdHJpbmcpLnJlcGxhY2UobXNQYXR0ZXJuLCAnLW1zLScpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGh5cGhlbmF0ZVN0eWxlTmFtZTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHR5cGVjaGVja3Mgc3RhdGljLW9ubHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVtb2l6ZXMgdGhlIHJldHVybiB2YWx1ZSBvZiBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBvbmUgc3RyaW5nIGFyZ3VtZW50LlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuXG5mdW5jdGlvbiBtZW1vaXplU3RyaW5nT25seShjYWxsYmFjaykge1xuICB2YXIgY2FjaGUgPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICBpZiAoIWNhY2hlLmhhc093blByb3BlcnR5KHN0cmluZykpIHtcbiAgICAgIGNhY2hlW3N0cmluZ10gPSBjYWxsYmFjay5jYWxsKHRoaXMsIHN0cmluZyk7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZVtzdHJpbmddO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbW9pemVTdHJpbmdPbmx5OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgQ1NTUHJvcGVydHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ1NTIHByb3BlcnRpZXMgd2hpY2ggYWNjZXB0IG51bWJlcnMgYnV0IGFyZSBub3QgaW4gdW5pdHMgb2YgXCJweFwiLlxuICovXG5cbnZhciBpc1VuaXRsZXNzTnVtYmVyID0ge1xuICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VPdXRzZXQ6IHRydWUsXG4gIGJvcmRlckltYWdlU2xpY2U6IHRydWUsXG4gIGJvcmRlckltYWdlV2lkdGg6IHRydWUsXG4gIGJveEZsZXg6IHRydWUsXG4gIGJveEZsZXhHcm91cDogdHJ1ZSxcbiAgYm94T3JkaW5hbEdyb3VwOiB0cnVlLFxuICBjb2x1bW5Db3VudDogdHJ1ZSxcbiAgZmxleDogdHJ1ZSxcbiAgZmxleEdyb3c6IHRydWUsXG4gIGZsZXhQb3NpdGl2ZTogdHJ1ZSxcbiAgZmxleFNocmluazogdHJ1ZSxcbiAgZmxleE5lZ2F0aXZlOiB0cnVlLFxuICBmbGV4T3JkZXI6IHRydWUsXG4gIGdyaWRSb3c6IHRydWUsXG4gIGdyaWRDb2x1bW46IHRydWUsXG4gIGZvbnRXZWlnaHQ6IHRydWUsXG4gIGxpbmVDbGFtcDogdHJ1ZSxcbiAgbGluZUhlaWdodDogdHJ1ZSxcbiAgb3BhY2l0eTogdHJ1ZSxcbiAgb3JkZXI6IHRydWUsXG4gIG9ycGhhbnM6IHRydWUsXG4gIHRhYlNpemU6IHRydWUsXG4gIHdpZG93czogdHJ1ZSxcbiAgekluZGV4OiB0cnVlLFxuICB6b29tOiB0cnVlLFxuXG4gIC8vIFNWRy1yZWxhdGVkIHByb3BlcnRpZXNcbiAgZmlsbE9wYWNpdHk6IHRydWUsXG4gIGZsb29kT3BhY2l0eTogdHJ1ZSxcbiAgc3RvcE9wYWNpdHk6IHRydWUsXG4gIHN0cm9rZURhc2hhcnJheTogdHJ1ZSxcbiAgc3Ryb2tlRGFzaG9mZnNldDogdHJ1ZSxcbiAgc3Ryb2tlTWl0ZXJsaW1pdDogdHJ1ZSxcbiAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlV2lkdGg6IHRydWVcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCB2ZW5kb3Itc3BlY2lmaWMgcHJlZml4LCBlZzogV2Via2l0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHN0eWxlIG5hbWUsIGVnOiB0cmFuc2l0aW9uRHVyYXRpb25cbiAqIEByZXR1cm4ge3N0cmluZ30gc3R5bGUgbmFtZSBwcmVmaXhlZCB3aXRoIGBwcmVmaXhgLCBwcm9wZXJseSBjYW1lbENhc2VkLCBlZzpcbiAqIFdlYmtpdFRyYW5zaXRpb25EdXJhdGlvblxuICovXG5mdW5jdGlvbiBwcmVmaXhLZXkocHJlZml4LCBrZXkpIHtcbiAgcmV0dXJuIHByZWZpeCArIGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zdWJzdHJpbmcoMSk7XG59XG5cbi8qKlxuICogU3VwcG9ydCBzdHlsZSBuYW1lcyB0aGF0IG1heSBjb21lIHBhc3NlZCBpbiBwcmVmaXhlZCBieSBhZGRpbmcgcGVybXV0YXRpb25zXG4gKiBvZiB2ZW5kb3IgcHJlZml4ZXMuXG4gKi9cbnZhciBwcmVmaXhlcyA9IFsnV2Via2l0JywgJ21zJywgJ01veicsICdPJ107XG5cbi8vIFVzaW5nIE9iamVjdC5rZXlzIGhlcmUsIG9yIGVsc2UgdGhlIHZhbmlsbGEgZm9yLWluIGxvb3AgbWFrZXMgSUU4IGdvIGludG8gYW5cbi8vIGluZmluaXRlIGxvb3AsIGJlY2F1c2UgaXQgaXRlcmF0ZXMgb3ZlciB0aGUgbmV3bHkgYWRkZWQgcHJvcHMgdG9vLlxuT2JqZWN0LmtleXMoaXNVbml0bGVzc051bWJlcikuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICBwcmVmaXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICBpc1VuaXRsZXNzTnVtYmVyW3ByZWZpeEtleShwcmVmaXgsIHByb3ApXSA9IGlzVW5pdGxlc3NOdW1iZXJbcHJvcF07XG4gIH0pO1xufSk7XG5cbi8qKlxuICogTW9zdCBzdHlsZSBwcm9wZXJ0aWVzIGNhbiBiZSB1bnNldCBieSBkb2luZyAuc3R5bGVbcHJvcF0gPSAnJyBidXQgSUU4XG4gKiBkb2Vzbid0IGxpa2UgZG9pbmcgdGhhdCB3aXRoIHNob3J0aGFuZCBwcm9wZXJ0aWVzIHNvIGZvciB0aGUgcHJvcGVydGllcyB0aGF0XG4gKiBJRTggYnJlYWtzIG9uLCB3aGljaCBhcmUgbGlzdGVkIGhlcmUsIHdlIGluc3RlYWQgdW5zZXQgZWFjaCBvZiB0aGVcbiAqIGluZGl2aWR1YWwgcHJvcGVydGllcy4gU2VlIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMzg1LlxuICogVGhlIDQtdmFsdWUgJ2Nsb2NrJyBwcm9wZXJ0aWVzIGxpa2UgbWFyZ2luLCBwYWRkaW5nLCBib3JkZXItd2lkdGggc2VlbSB0b1xuICogYmVoYXZlIHdpdGhvdXQgYW55IHByb2JsZW1zLiBDdXJpb3VzbHksIGxpc3Qtc3R5bGUgd29ya3MgdG9vIHdpdGhvdXQgYW55XG4gKiBzcGVjaWFsIHByb2RkaW5nLlxuICovXG52YXIgc2hvcnRoYW5kUHJvcGVydHlFeHBhbnNpb25zID0ge1xuICBiYWNrZ3JvdW5kOiB7XG4gICAgYmFja2dyb3VuZEF0dGFjaG1lbnQ6IHRydWUsXG4gICAgYmFja2dyb3VuZENvbG9yOiB0cnVlLFxuICAgIGJhY2tncm91bmRJbWFnZTogdHJ1ZSxcbiAgICBiYWNrZ3JvdW5kUG9zaXRpb25YOiB0cnVlLFxuICAgIGJhY2tncm91bmRQb3NpdGlvblk6IHRydWUsXG4gICAgYmFja2dyb3VuZFJlcGVhdDogdHJ1ZVxuICB9LFxuICBiYWNrZ3JvdW5kUG9zaXRpb246IHtcbiAgICBiYWNrZ3JvdW5kUG9zaXRpb25YOiB0cnVlLFxuICAgIGJhY2tncm91bmRQb3NpdGlvblk6IHRydWVcbiAgfSxcbiAgYm9yZGVyOiB7XG4gICAgYm9yZGVyV2lkdGg6IHRydWUsXG4gICAgYm9yZGVyU3R5bGU6IHRydWUsXG4gICAgYm9yZGVyQ29sb3I6IHRydWVcbiAgfSxcbiAgYm9yZGVyQm90dG9tOiB7XG4gICAgYm9yZGVyQm90dG9tV2lkdGg6IHRydWUsXG4gICAgYm9yZGVyQm90dG9tU3R5bGU6IHRydWUsXG4gICAgYm9yZGVyQm90dG9tQ29sb3I6IHRydWVcbiAgfSxcbiAgYm9yZGVyTGVmdDoge1xuICAgIGJvcmRlckxlZnRXaWR0aDogdHJ1ZSxcbiAgICBib3JkZXJMZWZ0U3R5bGU6IHRydWUsXG4gICAgYm9yZGVyTGVmdENvbG9yOiB0cnVlXG4gIH0sXG4gIGJvcmRlclJpZ2h0OiB7XG4gICAgYm9yZGVyUmlnaHRXaWR0aDogdHJ1ZSxcbiAgICBib3JkZXJSaWdodFN0eWxlOiB0cnVlLFxuICAgIGJvcmRlclJpZ2h0Q29sb3I6IHRydWVcbiAgfSxcbiAgYm9yZGVyVG9wOiB7XG4gICAgYm9yZGVyVG9wV2lkdGg6IHRydWUsXG4gICAgYm9yZGVyVG9wU3R5bGU6IHRydWUsXG4gICAgYm9yZGVyVG9wQ29sb3I6IHRydWVcbiAgfSxcbiAgZm9udDoge1xuICAgIGZvbnRTdHlsZTogdHJ1ZSxcbiAgICBmb250VmFyaWFudDogdHJ1ZSxcbiAgICBmb250V2VpZ2h0OiB0cnVlLFxuICAgIGZvbnRTaXplOiB0cnVlLFxuICAgIGxpbmVIZWlnaHQ6IHRydWUsXG4gICAgZm9udEZhbWlseTogdHJ1ZVxuICB9LFxuICBvdXRsaW5lOiB7XG4gICAgb3V0bGluZVdpZHRoOiB0cnVlLFxuICAgIG91dGxpbmVTdHlsZTogdHJ1ZSxcbiAgICBvdXRsaW5lQ29sb3I6IHRydWVcbiAgfVxufTtcblxudmFyIENTU1Byb3BlcnR5ID0ge1xuICBpc1VuaXRsZXNzTnVtYmVyOiBpc1VuaXRsZXNzTnVtYmVyLFxuICBzaG9ydGhhbmRQcm9wZXJ0eUV4cGFuc2lvbnM6IHNob3J0aGFuZFByb3BlcnR5RXhwYW5zaW9uc1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDU1NQcm9wZXJ0eTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgQ1NTUHJvcGVydHlPcGVyYXRpb25zXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ1NTUHJvcGVydHkgPSByZXF1aXJlKCcuL0NTU1Byb3BlcnR5Jyk7XG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJy4vUmVhY3RQZXJmJyk7XG5cbnZhciBjYW1lbGl6ZVN0eWxlTmFtZSA9IHJlcXVpcmUoJ2ZianMvbGliL2NhbWVsaXplU3R5bGVOYW1lJyk7XG52YXIgZGFuZ2Vyb3VzU3R5bGVWYWx1ZSA9IHJlcXVpcmUoJy4vZGFuZ2Vyb3VzU3R5bGVWYWx1ZScpO1xudmFyIGh5cGhlbmF0ZVN0eWxlTmFtZSA9IHJlcXVpcmUoJ2ZianMvbGliL2h5cGhlbmF0ZVN0eWxlTmFtZScpO1xudmFyIG1lbW9pemVTdHJpbmdPbmx5ID0gcmVxdWlyZSgnZmJqcy9saWIvbWVtb2l6ZVN0cmluZ09ubHknKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgcHJvY2Vzc1N0eWxlTmFtZSA9IG1lbW9pemVTdHJpbmdPbmx5KGZ1bmN0aW9uIChzdHlsZU5hbWUpIHtcbiAgcmV0dXJuIGh5cGhlbmF0ZVN0eWxlTmFtZShzdHlsZU5hbWUpO1xufSk7XG5cbnZhciBoYXNTaG9ydGhhbmRQcm9wZXJ0eUJ1ZyA9IGZhbHNlO1xudmFyIHN0eWxlRmxvYXRBY2Nlc3NvciA9ICdjc3NGbG9hdCc7XG5pZiAoRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NKSB7XG4gIHZhciB0ZW1wU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5zdHlsZTtcbiAgdHJ5IHtcbiAgICAvLyBJRTggdGhyb3dzIFwiSW52YWxpZCBhcmd1bWVudC5cIiBpZiByZXNldHRpbmcgc2hvcnRoYW5kIHN0eWxlIHByb3BlcnRpZXMuXG4gICAgdGVtcFN0eWxlLmZvbnQgPSAnJztcbiAgfSBjYXRjaCAoZSkge1xuICAgIGhhc1Nob3J0aGFuZFByb3BlcnR5QnVnID0gdHJ1ZTtcbiAgfVxuICAvLyBJRTggb25seSBzdXBwb3J0cyBhY2Nlc3NpbmcgY3NzRmxvYXQgKHN0YW5kYXJkKSBhcyBzdHlsZUZsb2F0XG4gIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0eWxlRmxvYXRBY2Nlc3NvciA9ICdzdHlsZUZsb2F0JztcbiAgfVxufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAvLyAnbXNUcmFuc2Zvcm0nIGlzIGNvcnJlY3QsIGJ1dCB0aGUgb3RoZXIgcHJlZml4ZXMgc2hvdWxkIGJlIGNhcGl0YWxpemVkXG4gIHZhciBiYWRWZW5kb3JlZFN0eWxlTmFtZVBhdHRlcm4gPSAvXig/OndlYmtpdHxtb3p8bylbQS1aXS87XG5cbiAgLy8gc3R5bGUgdmFsdWVzIHNob3VsZG4ndCBjb250YWluIGEgc2VtaWNvbG9uXG4gIHZhciBiYWRTdHlsZVZhbHVlV2l0aFNlbWljb2xvblBhdHRlcm4gPSAvO1xccyokLztcblxuICB2YXIgd2FybmVkU3R5bGVOYW1lcyA9IHt9O1xuICB2YXIgd2FybmVkU3R5bGVWYWx1ZXMgPSB7fTtcbiAgdmFyIHdhcm5lZEZvck5hTlZhbHVlID0gZmFsc2U7XG5cbiAgdmFyIHdhcm5IeXBoZW5hdGVkU3R5bGVOYW1lID0gZnVuY3Rpb24gKG5hbWUsIG93bmVyKSB7XG4gICAgaWYgKHdhcm5lZFN0eWxlTmFtZXMuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgd2FybmVkU3R5bGVOYW1lc1tuYW1lXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZFN0eWxlTmFtZXNbbmFtZV0gPSB0cnVlO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnVW5zdXBwb3J0ZWQgc3R5bGUgcHJvcGVydHkgJXMuIERpZCB5b3UgbWVhbiAlcz8lcycsIG5hbWUsIGNhbWVsaXplU3R5bGVOYW1lKG5hbWUpLCBjaGVja1JlbmRlck1lc3NhZ2Uob3duZXIpKSA6IHZvaWQgMDtcbiAgfTtcblxuICB2YXIgd2FybkJhZFZlbmRvcmVkU3R5bGVOYW1lID0gZnVuY3Rpb24gKG5hbWUsIG93bmVyKSB7XG4gICAgaWYgKHdhcm5lZFN0eWxlTmFtZXMuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgd2FybmVkU3R5bGVOYW1lc1tuYW1lXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZFN0eWxlTmFtZXNbbmFtZV0gPSB0cnVlO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnVW5zdXBwb3J0ZWQgdmVuZG9yLXByZWZpeGVkIHN0eWxlIHByb3BlcnR5ICVzLiBEaWQgeW91IG1lYW4gJXM/JXMnLCBuYW1lLCBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSwgY2hlY2tSZW5kZXJNZXNzYWdlKG93bmVyKSkgOiB2b2lkIDA7XG4gIH07XG5cbiAgdmFyIHdhcm5TdHlsZVZhbHVlV2l0aFNlbWljb2xvbiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgb3duZXIpIHtcbiAgICBpZiAod2FybmVkU3R5bGVWYWx1ZXMuaGFzT3duUHJvcGVydHkodmFsdWUpICYmIHdhcm5lZFN0eWxlVmFsdWVzW3ZhbHVlXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZFN0eWxlVmFsdWVzW3ZhbHVlXSA9IHRydWU7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdTdHlsZSBwcm9wZXJ0eSB2YWx1ZXMgc2hvdWxkblxcJ3QgY29udGFpbiBhIHNlbWljb2xvbi4lcyAnICsgJ1RyeSBcIiVzOiAlc1wiIGluc3RlYWQuJywgY2hlY2tSZW5kZXJNZXNzYWdlKG93bmVyKSwgbmFtZSwgdmFsdWUucmVwbGFjZShiYWRTdHlsZVZhbHVlV2l0aFNlbWljb2xvblBhdHRlcm4sICcnKSkgOiB2b2lkIDA7XG4gIH07XG5cbiAgdmFyIHdhcm5TdHlsZVZhbHVlSXNOYU4gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIG93bmVyKSB7XG4gICAgaWYgKHdhcm5lZEZvck5hTlZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2FybmVkRm9yTmFOVmFsdWUgPSB0cnVlO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYE5hTmAgaXMgYW4gaW52YWxpZCB2YWx1ZSBmb3IgdGhlIGAlc2AgY3NzIHN0eWxlIHByb3BlcnR5LiVzJywgbmFtZSwgY2hlY2tSZW5kZXJNZXNzYWdlKG93bmVyKSkgOiB2b2lkIDA7XG4gIH07XG5cbiAgdmFyIGNoZWNrUmVuZGVyTWVzc2FnZSA9IGZ1bmN0aW9uIChvd25lcikge1xuICAgIGlmIChvd25lcikge1xuICAgICAgdmFyIG5hbWUgPSBvd25lci5nZXROYW1lKCk7XG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICByZXR1cm4gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtSZWFjdERPTUNvbXBvbmVudH0gY29tcG9uZW50XG4gICAqL1xuICB2YXIgd2FyblZhbGlkU3R5bGUgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGNvbXBvbmVudCkge1xuICAgIHZhciBvd25lcjtcbiAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICBvd25lciA9IGNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQuX293bmVyO1xuICAgIH1cbiAgICBpZiAobmFtZS5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgd2Fybkh5cGhlbmF0ZWRTdHlsZU5hbWUobmFtZSwgb3duZXIpO1xuICAgIH0gZWxzZSBpZiAoYmFkVmVuZG9yZWRTdHlsZU5hbWVQYXR0ZXJuLnRlc3QobmFtZSkpIHtcbiAgICAgIHdhcm5CYWRWZW5kb3JlZFN0eWxlTmFtZShuYW1lLCBvd25lcik7XG4gICAgfSBlbHNlIGlmIChiYWRTdHlsZVZhbHVlV2l0aFNlbWljb2xvblBhdHRlcm4udGVzdCh2YWx1ZSkpIHtcbiAgICAgIHdhcm5TdHlsZVZhbHVlV2l0aFNlbWljb2xvbihuYW1lLCB2YWx1ZSwgb3duZXIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGlzTmFOKHZhbHVlKSkge1xuICAgICAgd2FyblN0eWxlVmFsdWVJc05hTihuYW1lLCB2YWx1ZSwgb3duZXIpO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBPcGVyYXRpb25zIGZvciBkZWFsaW5nIHdpdGggQ1NTIHByb3BlcnRpZXMuXG4gKi9cbnZhciBDU1NQcm9wZXJ0eU9wZXJhdGlvbnMgPSB7XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZXMgYSBtYXBwaW5nIG9mIHN0eWxlIHByb3BlcnRpZXMgZm9yIHVzZSBhcyBpbmxpbmUgc3R5bGVzOlxuICAgKlxuICAgKiAgID4gY3JlYXRlTWFya3VwRm9yU3R5bGVzKHt3aWR0aDogJzIwMHB4JywgaGVpZ2h0OiAwfSlcbiAgICogICBcIndpZHRoOjIwMHB4O2hlaWdodDowO1wiXG4gICAqXG4gICAqIFVuZGVmaW5lZCB2YWx1ZXMgYXJlIGlnbm9yZWQgc28gdGhhdCBkZWNsYXJhdGl2ZSBwcm9ncmFtbWluZyBpcyBlYXNpZXIuXG4gICAqIFRoZSByZXN1bHQgc2hvdWxkIGJlIEhUTUwtZXNjYXBlZCBiZWZvcmUgaW5zZXJ0aW9uIGludG8gdGhlIERPTS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0eWxlc1xuICAgKiBAcGFyYW0ge1JlYWN0RE9NQ29tcG9uZW50fSBjb21wb25lbnRcbiAgICogQHJldHVybiB7P3N0cmluZ31cbiAgICovXG4gIGNyZWF0ZU1hcmt1cEZvclN0eWxlczogZnVuY3Rpb24gKHN0eWxlcywgY29tcG9uZW50KSB7XG4gICAgdmFyIHNlcmlhbGl6ZWQgPSAnJztcbiAgICBmb3IgKHZhciBzdHlsZU5hbWUgaW4gc3R5bGVzKSB7XG4gICAgICBpZiAoIXN0eWxlcy5oYXNPd25Qcm9wZXJ0eShzdHlsZU5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIHN0eWxlVmFsdWUgPSBzdHlsZXNbc3R5bGVOYW1lXTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHdhcm5WYWxpZFN0eWxlKHN0eWxlTmFtZSwgc3R5bGVWYWx1ZSwgY29tcG9uZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHlsZVZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgc2VyaWFsaXplZCArPSBwcm9jZXNzU3R5bGVOYW1lKHN0eWxlTmFtZSkgKyAnOic7XG4gICAgICAgIHNlcmlhbGl6ZWQgKz0gZGFuZ2Vyb3VzU3R5bGVWYWx1ZShzdHlsZU5hbWUsIHN0eWxlVmFsdWUsIGNvbXBvbmVudCkgKyAnOyc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzZXJpYWxpemVkIHx8IG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIGZvciBtdWx0aXBsZSBzdHlsZXMgb24gYSBub2RlLiAgSWYgYSB2YWx1ZSBpcyBzcGVjaWZpZWQgYXNcbiAgICogJycgKGVtcHR5IHN0cmluZyksIHRoZSBjb3JyZXNwb25kaW5nIHN0eWxlIHByb3BlcnR5IHdpbGwgYmUgdW5zZXQuXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gbm9kZVxuICAgKiBAcGFyYW0ge29iamVjdH0gc3R5bGVzXG4gICAqIEBwYXJhbSB7UmVhY3RET01Db21wb25lbnR9IGNvbXBvbmVudFxuICAgKi9cbiAgc2V0VmFsdWVGb3JTdHlsZXM6IGZ1bmN0aW9uIChub2RlLCBzdHlsZXMsIGNvbXBvbmVudCkge1xuICAgIHZhciBzdHlsZSA9IG5vZGUuc3R5bGU7XG4gICAgZm9yICh2YXIgc3R5bGVOYW1lIGluIHN0eWxlcykge1xuICAgICAgaWYgKCFzdHlsZXMuaGFzT3duUHJvcGVydHkoc3R5bGVOYW1lKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHdhcm5WYWxpZFN0eWxlKHN0eWxlTmFtZSwgc3R5bGVzW3N0eWxlTmFtZV0sIGNvbXBvbmVudCk7XG4gICAgICB9XG4gICAgICB2YXIgc3R5bGVWYWx1ZSA9IGRhbmdlcm91c1N0eWxlVmFsdWUoc3R5bGVOYW1lLCBzdHlsZXNbc3R5bGVOYW1lXSwgY29tcG9uZW50KTtcbiAgICAgIGlmIChzdHlsZU5hbWUgPT09ICdmbG9hdCcgfHwgc3R5bGVOYW1lID09PSAnY3NzRmxvYXQnKSB7XG4gICAgICAgIHN0eWxlTmFtZSA9IHN0eWxlRmxvYXRBY2Nlc3NvcjtcbiAgICAgIH1cbiAgICAgIGlmIChzdHlsZVZhbHVlKSB7XG4gICAgICAgIHN0eWxlW3N0eWxlTmFtZV0gPSBzdHlsZVZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGV4cGFuc2lvbiA9IGhhc1Nob3J0aGFuZFByb3BlcnR5QnVnICYmIENTU1Byb3BlcnR5LnNob3J0aGFuZFByb3BlcnR5RXhwYW5zaW9uc1tzdHlsZU5hbWVdO1xuICAgICAgICBpZiAoZXhwYW5zaW9uKSB7XG4gICAgICAgICAgLy8gU2hvcnRoYW5kIHByb3BlcnR5IHRoYXQgSUU4IHdvbid0IGxpa2UgdW5zZXR0aW5nLCBzbyB1bnNldCBlYWNoXG4gICAgICAgICAgLy8gY29tcG9uZW50IHRvIHBsYWNhdGUgaXRcbiAgICAgICAgICBmb3IgKHZhciBpbmRpdmlkdWFsU3R5bGVOYW1lIGluIGV4cGFuc2lvbikge1xuICAgICAgICAgICAgc3R5bGVbaW5kaXZpZHVhbFN0eWxlTmFtZV0gPSAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGVbc3R5bGVOYW1lXSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn07XG5cblJlYWN0UGVyZi5tZWFzdXJlTWV0aG9kcyhDU1NQcm9wZXJ0eU9wZXJhdGlvbnMsICdDU1NQcm9wZXJ0eU9wZXJhdGlvbnMnLCB7XG4gIHNldFZhbHVlRm9yU3R5bGVzOiAnc2V0VmFsdWVGb3JTdHlsZXMnXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDU1NQcm9wZXJ0eU9wZXJhdGlvbnM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UGVyZlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZWFjdFBlcmYgaXMgYSBnZW5lcmFsIEFPUCBzeXN0ZW0gZGVzaWduZWQgdG8gbWVhc3VyZSBwZXJmb3JtYW5jZS4gVGhpc1xuICogbW9kdWxlIG9ubHkgaGFzIHRoZSBob29rczogc2VlIFJlYWN0RGVmYXVsdFBlcmYgZm9yIHRoZSBhbmFseXNpcyB0b29sLlxuICovXG5cbnZhciBSZWFjdFBlcmYgPSB7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRvIGVuYWJsZS9kaXNhYmxlIG1lYXN1cmVtZW50LiBTZXQgdG8gZmFsc2UgYnkgZGVmYXVsdCB0byBwcmV2ZW50XG4gICAqIGFjY2lkZW50YWwgbG9nZ2luZyBhbmQgcGVyZiBsb3NzLlxuICAgKi9cbiAgZW5hYmxlTWVhc3VyZTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEhvbGRzIG9udG8gdGhlIG1lYXN1cmUgZnVuY3Rpb24gaW4gdXNlLiBCeSBkZWZhdWx0LCBkb24ndCBtZWFzdXJlXG4gICAqIGFueXRoaW5nLCBidXQgd2UnbGwgb3ZlcnJpZGUgdGhpcyBpZiB3ZSBpbmplY3QgYSBtZWFzdXJlIGZ1bmN0aW9uLlxuICAgKi9cbiAgc3RvcmVkTWVhc3VyZTogX25vTWVhc3VyZSxcblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqZWN0TmFtZVxuICAgKiBAcGFyYW0ge29iamVjdDxzdHJpbmc+fSBtZXRob2ROYW1lc1xuICAgKi9cbiAgbWVhc3VyZU1ldGhvZHM6IGZ1bmN0aW9uIChvYmplY3QsIG9iamVjdE5hbWUsIG1ldGhvZE5hbWVzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBtZXRob2ROYW1lcykge1xuICAgICAgICBpZiAoIW1ldGhvZE5hbWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBvYmplY3Rba2V5XSA9IFJlYWN0UGVyZi5tZWFzdXJlKG9iamVjdE5hbWUsIG1ldGhvZE5hbWVzW2tleV0sIG9iamVjdFtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIHRvIHdyYXAgbWV0aG9kcyB5b3Ugd2FudCB0byBtZWFzdXJlLiBaZXJvIG92ZXJoZWFkIGluIHByb2R1Y3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvYmpOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmbk5hbWVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAgICovXG4gIG1lYXN1cmU6IGZ1bmN0aW9uIChvYmpOYW1lLCBmbk5hbWUsIGZ1bmMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1lYXN1cmVkRnVuYyA9IG51bGw7XG4gICAgICB2YXIgd3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKFJlYWN0UGVyZi5lbmFibGVNZWFzdXJlKSB7XG4gICAgICAgICAgaWYgKCFtZWFzdXJlZEZ1bmMpIHtcbiAgICAgICAgICAgIG1lYXN1cmVkRnVuYyA9IFJlYWN0UGVyZi5zdG9yZWRNZWFzdXJlKG9iak5hbWUsIGZuTmFtZSwgZnVuYyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtZWFzdXJlZEZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIHdyYXBwZXIuZGlzcGxheU5hbWUgPSBvYmpOYW1lICsgJ18nICsgZm5OYW1lO1xuICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuICAgIHJldHVybiBmdW5jO1xuICB9LFxuXG4gIGluamVjdGlvbjoge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1lYXN1cmVcbiAgICAgKi9cbiAgICBpbmplY3RNZWFzdXJlOiBmdW5jdGlvbiAobWVhc3VyZSkge1xuICAgICAgUmVhY3RQZXJmLnN0b3JlZE1lYXN1cmUgPSBtZWFzdXJlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBTaW1wbHkgcGFzc2VzIHRocm91Z2ggdGhlIG1lYXN1cmVkIGZ1bmN0aW9uLCB3aXRob3V0IG1lYXN1cmluZyBpdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb2JqTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGZuTmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIF9ub01lYXN1cmUob2JqTmFtZSwgZm5OYW1lLCBmdW5jKSB7XG4gIHJldHVybiBmdW5jO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UGVyZjsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZGFuZ2Vyb3VzU3R5bGVWYWx1ZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENTU1Byb3BlcnR5ID0gcmVxdWlyZSgnLi9DU1NQcm9wZXJ0eScpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBpc1VuaXRsZXNzTnVtYmVyID0gQ1NTUHJvcGVydHkuaXNVbml0bGVzc051bWJlcjtcbnZhciBzdHlsZVdhcm5pbmdzID0ge307XG5cbi8qKlxuICogQ29udmVydCBhIHZhbHVlIGludG8gdGhlIHByb3BlciBjc3Mgd3JpdGFibGUgdmFsdWUuIFRoZSBzdHlsZSBuYW1lIGBuYW1lYFxuICogc2hvdWxkIGJlIGxvZ2ljYWwgKG5vIGh5cGhlbnMpLCBhcyBzcGVjaWZpZWRcbiAqIGluIGBDU1NQcm9wZXJ0eS5pc1VuaXRsZXNzTnVtYmVyYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBDU1MgcHJvcGVydHkgbmFtZSBzdWNoIGFzIGB0b3BNYXJnaW5gLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBDU1MgcHJvcGVydHkgdmFsdWUgc3VjaCBhcyBgMTBweGAuXG4gKiBAcGFyYW0ge1JlYWN0RE9NQ29tcG9uZW50fSBjb21wb25lbnRcbiAqIEByZXR1cm4ge3N0cmluZ30gTm9ybWFsaXplZCBzdHlsZSB2YWx1ZSB3aXRoIGRpbWVuc2lvbnMgYXBwbGllZC5cbiAqL1xuZnVuY3Rpb24gZGFuZ2Vyb3VzU3R5bGVWYWx1ZShuYW1lLCB2YWx1ZSwgY29tcG9uZW50KSB7XG4gIC8vIE5vdGUgdGhhdCB3ZSd2ZSByZW1vdmVkIGVzY2FwZVRleHRGb3JCcm93c2VyKCkgY2FsbHMgaGVyZSBzaW5jZSB0aGVcbiAgLy8gd2hvbGUgc3RyaW5nIHdpbGwgYmUgZXNjYXBlZCB3aGVuIHRoZSBhdHRyaWJ1dGUgaXMgaW5qZWN0ZWQgaW50b1xuICAvLyB0aGUgbWFya3VwLiBJZiB5b3UgcHJvdmlkZSB1bnNhZmUgdXNlciBkYXRhIGhlcmUgdGhleSBjYW4gaW5qZWN0XG4gIC8vIGFyYml0cmFyeSBDU1Mgd2hpY2ggbWF5IGJlIHByb2JsZW1hdGljIChJIGNvdWxkbid0IHJlcHJvIHRoaXMpOlxuICAvLyBodHRwczovL3d3dy5vd2FzcC5vcmcvaW5kZXgucGhwL1hTU19GaWx0ZXJfRXZhc2lvbl9DaGVhdF9TaGVldFxuICAvLyBodHRwOi8vd3d3LnRoZXNwYW5uZXIuY28udWsvMjAwNy8xMS8yNi91bHRpbWF0ZS14c3MtY3NzLWluamVjdGlvbi9cbiAgLy8gVGhpcyBpcyBub3QgYW4gWFNTIGhvbGUgYnV0IGluc3RlYWQgYSBwb3RlbnRpYWwgQ1NTIGluamVjdGlvbiBpc3N1ZVxuICAvLyB3aGljaCBoYXMgbGVhZCB0byBhIGdyZWF0ZXIgZGlzY3Vzc2lvbiBhYm91dCBob3cgd2UncmUgZ29pbmcgdG9cbiAgLy8gdHJ1c3QgVVJMcyBtb3ZpbmcgZm9yd2FyZC4gU2VlICMyMTE1OTAxXG5cbiAgdmFyIGlzRW1wdHkgPSB2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nIHx8IHZhbHVlID09PSAnJztcbiAgaWYgKGlzRW1wdHkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB2YXIgaXNOb25OdW1lcmljID0gaXNOYU4odmFsdWUpO1xuICBpZiAoaXNOb25OdW1lcmljIHx8IHZhbHVlID09PSAwIHx8IGlzVW5pdGxlc3NOdW1iZXIuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgaXNVbml0bGVzc051bWJlcltuYW1lXSkge1xuICAgIHJldHVybiAnJyArIHZhbHVlOyAvLyBjYXN0IHRvIHN0cmluZ1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICB2YXIgb3duZXIgPSBjb21wb25lbnQuX2N1cnJlbnRFbGVtZW50Ll9vd25lcjtcbiAgICAgICAgdmFyIG93bmVyTmFtZSA9IG93bmVyID8gb3duZXIuZ2V0TmFtZSgpIDogbnVsbDtcbiAgICAgICAgaWYgKG93bmVyTmFtZSAmJiAhc3R5bGVXYXJuaW5nc1tvd25lck5hbWVdKSB7XG4gICAgICAgICAgc3R5bGVXYXJuaW5nc1tvd25lck5hbWVdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICAgICAgICBpZiAob3duZXJOYW1lKSB7XG4gICAgICAgICAgdmFyIHdhcm5pbmdzID0gc3R5bGVXYXJuaW5nc1tvd25lck5hbWVdO1xuICAgICAgICAgIHdhcm5lZCA9IHdhcm5pbmdzW25hbWVdO1xuICAgICAgICAgIGlmICghd2FybmVkKSB7XG4gICAgICAgICAgICB3YXJuaW5nc1tuYW1lXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghd2FybmVkKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdhIGAlc2AgdGFnIChvd25lcjogYCVzYCkgd2FzIHBhc3NlZCBhIG51bWVyaWMgc3RyaW5nIHZhbHVlICcgKyAnZm9yIENTUyBwcm9wZXJ0eSBgJXNgICh2YWx1ZTogYCVzYCkgd2hpY2ggd2lsbCBiZSB0cmVhdGVkICcgKyAnYXMgYSB1bml0bGVzcyBudW1iZXIgaW4gYSBmdXR1cmUgdmVyc2lvbiBvZiBSZWFjdC4nLCBjb21wb25lbnQuX2N1cnJlbnRFbGVtZW50LnR5cGUsIG93bmVyTmFtZSB8fCAndW5rbm93bicsIG5hbWUsIHZhbHVlKSA6IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcbiAgfVxuICByZXR1cm4gdmFsdWUgKyAncHgnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhbmdlcm91c1N0eWxlVmFsdWU7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdFRyYW5zaXRpb25Hcm91cCA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy10cmFuc2l0aW9uLWdyb3VwJyk7XG52YXIgVHJhbnNpdGlvbkNvbnRhaW5lciA9IHJlcXVpcmUoJy4vdHJhbnNpdGlvbi1jb250YWluZXInKTtcblxudmFyIFRyYW5zaXRpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnVHJhbnNpdGlvbicsXG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgIGNoaWxkcmVuQXBwZWFyU3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2hpbGRyZW5CYXNlU3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2hpbGRyZW5FbnRlclN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNoaWxkcmVuTGVhdmVTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DaGlsZEFwcGVhcmVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkRW50ZXJlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZExlZnQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRTdGFydEFwcGVhcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZFN0YXJ0RW50ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRTdGFydExlYXZlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICB9O1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3RUcmFuc2l0aW9uR3JvdXBcbiAgICAgICAgY29tcG9uZW50PXt0aGlzLnByb3BzLmNvbXBvbmVudH1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtSZWFjdC5DaGlsZHJlbi5tYXAodGhpcy5wcm9wcy5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkLCBpKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUcmFuc2l0aW9uQ29udGFpbmVyXG4gICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgaWQ9eygoY2hpbGQgfHwge30pLnByb3BzIHx8IHt9KS5pZH1cbiAgICAgICAgICAgICAgY2hpbGRyZW5CYXNlU3R5bGU9e3RoaXMucHJvcHMuY2hpbGRyZW5CYXNlU3R5bGV9XG4gICAgICAgICAgICAgIGNoaWxkcmVuQXBwZWFyU3R5bGU9e3RoaXMucHJvcHMuY2hpbGRyZW5BcHBlYXJTdHlsZX1cbiAgICAgICAgICAgICAgY2hpbGRyZW5FbnRlclN0eWxlPXt0aGlzLnByb3BzLmNoaWxkcmVuRW50ZXJTdHlsZX1cbiAgICAgICAgICAgICAgY2hpbGRyZW5MZWF2ZVN0eWxlPXt0aGlzLnByb3BzLmNoaWxkcmVuTGVhdmVTdHlsZX1cbiAgICAgICAgICAgICAgb25DaGlsZEFwcGVhcmVkPXt0aGlzLnByb3BzLm9uQ2hpbGRBcHBlYXJlZH1cbiAgICAgICAgICAgICAgb25DaGlsZEVudGVyZWQ9e3RoaXMucHJvcHMub25DaGlsZEVudGVyZWR9XG4gICAgICAgICAgICAgIG9uQ2hpbGRMZWZ0PXt0aGlzLnByb3BzLm9uQ2hpbGRMZWZ0fVxuICAgICAgICAgICAgICBvbkNoaWxkU3RhcnRBcHBlYXI9e3RoaXMucHJvcHMub25DaGlsZFN0YXJ0QXBwZWFyfVxuICAgICAgICAgICAgICBvbkNoaWxkU3RhcnRFbnRlcj17dGhpcy5wcm9wcy5vbkNoaWxkU3RhcnRFbnRlcn1cbiAgICAgICAgICAgICAgb25DaGlsZFN0YXJ0TGVhdmU9e3RoaXMucHJvcHMub25DaGlsZFN0YXJ0TGVhdmV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjaGlsZH1cbiAgICAgICAgICAgIDwvVHJhbnNpdGlvbkNvbnRhaW5lcj5cbiAgICAgICAgICApO1xuICAgICAgICB9LCB0aGlzKX1cbiAgICAgIDwvUmVhY3RUcmFuc2l0aW9uR3JvdXA+XG4gICAgKTtcbiAgfSxcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbjsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgQ1NTUHJvcGVydHlPcGVyYXRpb25zID0gcmVxdWlyZSgncmVhY3QvbGliL0NTU1Byb3BlcnR5T3BlcmF0aW9ucycpO1xudmFyIG1lcmdlID0gcmVxdWlyZSgnLi91dGlscy9tZXJnZScpO1xuXG52YXIgVHJhbnNpdGlvbkNvbnRhaW5lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZGlzcGxheU5hbWU6ICdUcmFuc2l0aW9uQ29udGFpbmVyJyxcblxuICBwcm9wVHlwZXM6IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgY2hpbGRyZW5BcHBlYXJTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjaGlsZHJlbkJhc2VTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjaGlsZHJlbkVudGVyU3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2hpbGRyZW5MZWF2ZVN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFxuICAgICAgW1JlYWN0LlByb3BUeXBlcy5zdHJpbmcsIFJlYWN0LlByb3BUeXBlcy5udW1iZXJdXG4gICAgKSxcbiAgICBvbkNoaWxkQXBwZWFyZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRFbnRlcmVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkTGVmdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZFN0YXJ0QXBwZWFyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkU3RhcnRFbnRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZFN0YXJ0TGVhdmU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2Rpc3BhdGNoVGltZW91dCA9IG51bGw7XG4gICAgdGhpcy5fY2FsbGJhY2tUaW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLl90aWNrID0gMTc7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fZGlzcGF0Y2hUaW1lb3V0KTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fY2FsbGJhY2tUaW1lb3V0KTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsQXBwZWFyOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uKGNhbGxiYWNrLCAnYXBwZWFyJyk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoaWxkU3RhcnRBcHBlYXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGlsZFN0YXJ0QXBwZWFyKHRoaXMucHJvcHMuaWQpO1xuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnREaWRBcHBlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoaWxkQXBwZWFyZWQpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGlsZEFwcGVhcmVkKHRoaXMucHJvcHMuaWQpO1xuICAgIH1cblxuICAgIHRoaXMuX2FwcGVhcmVkID0gdHJ1ZTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsRW50ZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuX3RyYW5zaXRpb24oY2FsbGJhY2ssICdlbnRlcicpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMub25DaGlsZFN0YXJ0RW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGlsZFN0YXJ0RW50ZXIodGhpcy5wcm9wcy5pZCk7XG4gICAgfVxuICB9LFxuXG4gIGNvbXBvbmVudERpZEVudGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DaGlsZEVudGVyZWQpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGlsZEVudGVyZWQodGhpcy5wcm9wcy5pZCk7XG4gICAgfVxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxMZWF2ZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fdHJhbnNpdGlvbihjYWxsYmFjaywgJ2xlYXZlJyk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoaWxkU3RhcnRMZWF2ZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoaWxkU3RhcnRMZWF2ZSh0aGlzLnByb3BzLmlkKTtcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTGVhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoaWxkTGVmdCkgdGhpcy5wcm9wcy5vbkNoaWxkTGVmdCh0aGlzLnByb3BzLmlkKTtcbiAgfSxcblxuICBfZ2V0VHJhbnNpdGlvblByb3BlcnRpZXM6IGZ1bmN0aW9uIChjb21wdXRlZFN0eWxlKSB7XG4gICAgdmFyIHByb3BlcnRpZXMgPSB7fTtcblxuICAgIHByb3BlcnRpZXMudHJhbnNpdGlvbkR1cmF0aW9uID0gY29tcHV0ZWRTdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gfHxcbiAgICAgIGNvbXB1dGVkU3R5bGUuV2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uIHx8XG4gICAgICBjb21wdXRlZFN0eWxlLk1velRyYW5zaXRpb25EdXJhdGlvbiB8fFxuICAgICAgY29tcHV0ZWRTdHlsZS5tc1RyYW5zaXRpb25EdXJhdGlvbjtcblxuICAgIHByb3BlcnRpZXMudHJhbnNpdGlvbkRlbGF5ID0gY29tcHV0ZWRTdHlsZS50cmFuc2l0aW9uRGVsYXkgfHxcbiAgICAgIGNvbXB1dGVkU3R5bGUuV2Via2l0VHJhbnNpdGlvbkRlbGF5IHx8XG4gICAgICBjb21wdXRlZFN0eWxlLk1velRyYW5zaXRpb25EZWxheSB8fFxuICAgICAgY29tcHV0ZWRTdHlsZS5tc1RyYW5zaXRpb25EZWxheTtcblxuICAgIHByb3BlcnRpZXMudHJhbnNpdGlvblByb3BlcnR5ID0gY29tcHV0ZWRTdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgfHxcbiAgICAgIGNvbXB1dGVkU3R5bGUuV2Via2l0VHJhbnNpdGlvblByb3BlcnR5IHx8XG4gICAgICBjb21wdXRlZFN0eWxlLm1zVHJhbnNpdGlvblByb3BlcnR5IHx8XG4gICAgICBjb21wdXRlZFN0eWxlLk1velRyYW5zaXRpb25Qcm9wZXJ0eTtcblxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICB9LFxuXG4gIC8vIFNwZWNzOiBodHRwczovL3d3dy53My5vcmcvVFIvY3NzMy10cmFuc2l0aW9ucy9cbiAgLy8gQSBsb3Qgb2YgYXNzdW1wdGlvbnMgY291bGQgYmUgbWFkZSBoZXJlLCBsaWtlIHRoYXQgcHJvYmFibHkgdGhlIGR1cmF0aW9uXG4gIC8vIGFuZCBkZWxheSBsaXN0cyBhcmUgYWxyZWFkeSB0cnVuY2F0ZWQgYnkgdGhlIHNpemUgb2YgdGhlIHByb3BlcnR5IGxpc3RcbiAgLy8gb3IgdGhhdCB2YWx1ZXMgd2lsbCBiZSByZXR1cm5lZCBieSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSBpbiBzZWNvbmRzLFxuICAvLyBidXQgSSBwcmVmZXIgdG8gbWFrZSB0aGlzIGZ1bmN0aW9uIGxlc3MgdnVsbmVyYWJsZSB0byBjaGFuZ2VzLlxuICBfZ2V0VHJhbnNpdGlvbk1heGltdW1UaW1lOiBmdW5jdGlvbiAocHJvcGVydHksIGR1cmF0aW9uLCBkZWxheSkge1xuICAgIHZhciBkdXJhdGlvbkFycmF5ID0gZHVyYXRpb24uc3BsaXQoJywnKTtcbiAgICB2YXIgZGVsYXlBcnJheSA9IGRlbGF5LnNwbGl0KCcsJyk7XG4gICAgdmFyIHByb3BlcnR5QXJyYXkgPSBwcm9wZXJ0eS5zcGxpdCgnLCcpO1xuICAgIHZhciBsb25nZXN0VGltZSA9IDA7XG4gICAgdmFyIHJlID0gLyhbMC05XSpcXC4/WzAtOV0rKShtP3MpLztcbiAgICB2YXIgZHVyYXRpb25GYWN0b3I7XG4gICAgdmFyIGRlbGF5RmFjdG9yO1xuICAgIHZhciBkdXJhdGlvbkdyb3VwcztcbiAgICB2YXIgZGVsYXlHcm91cHM7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnR5QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGR1cmF0aW9uR3JvdXBzID0gZHVyYXRpb25BcnJheVtpXS5tYXRjaChyZSk7XG4gICAgICBpZiAoZHVyYXRpb25Hcm91cHNbMl0gPT09ICdzJykgZHVyYXRpb25GYWN0b3IgPSAxMDAwO1xuICAgICAgZWxzZSBkdXJhdGlvbkZhY3RvciA9IDE7XG5cbiAgICAgIGRlbGF5R3JvdXBzID0gZGVsYXlBcnJheVtpXS5tYXRjaChyZSk7XG4gICAgICBpZiAoZGVsYXlHcm91cHNbMl0gPT09ICdzJykgZGVsYXlGYWN0b3IgPSAxMDAwO1xuICAgICAgZWxzZSBkZWxheUZhY3RvciA9IDE7XG5cbiAgICAgIGxvbmdlc3RUaW1lID0gTWF0aC5tYXgoXG4gICAgICAgIHBhcnNlRmxvYXQoXG4gICAgICAgICAgKGR1cmF0aW9uR3JvdXBzWzFdICogZHVyYXRpb25GYWN0b3IpICsgKGRlbGF5R3JvdXBzWzFdICogZGVsYXlGYWN0b3IpXG4gICAgICAgICksXG4gICAgICAgIGxvbmdlc3RUaW1lXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBsb25nZXN0VGltZTtcbiAgfSxcblxuICBfY29tcHV0ZU5ld1N0eWxlOiBmdW5jdGlvbiAocGhhc2UpIHtcbiAgICB2YXIgY3VycmVudFN0eWxlO1xuICAgIGlmIChwaGFzZSA9PT0gJ2FwcGVhcicpIGN1cnJlbnRTdHlsZSA9IHRoaXMucHJvcHMuY2hpbGRyZW5BcHBlYXJTdHlsZTtcbiAgICBlbHNlIGlmIChwaGFzZSA9PT0gJ2VudGVyJykgY3VycmVudFN0eWxlID0gdGhpcy5wcm9wcy5jaGlsZHJlbkVudGVyU3R5bGU7XG4gICAgZWxzZSBjdXJyZW50U3R5bGUgPSB0aGlzLnByb3BzLmNoaWxkcmVuTGVhdmVTdHlsZTtcblxuICAgIHJldHVybiBtZXJnZSh0aGlzLnByb3BzLmNoaWxkcmVuQmFzZVN0eWxlLCBjdXJyZW50U3R5bGUpO1xuICB9LFxuXG4gIF9yZWdpc3RlckNhbGxiYWNrVGltZW91dDogZnVuY3Rpb24gKGNhbGxiYWNrLCBtYXhUcmFuc2l0aW9uVGltZSkge1xuICAgIHRoaXMuX2NhbGxiYWNrVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9LCBtYXhUcmFuc2l0aW9uVGltZSk7XG4gIH0sXG5cbiAgX3RyYW5zaXRpb246IGZ1bmN0aW9uIChjYWxsYmFjaywgcGhhc2UpIHtcbiAgICBpZiAoKHBoYXNlID09PSAnYXBwZWFyJyAmJiAhdGhpcy5wcm9wcy5jaGlsZHJlbkFwcGVhclN0eWxlKSB8fFxuICAgICAgICAocGhhc2UgPT09ICdlbnRlcicgJiYgIXRoaXMucHJvcHMuY2hpbGRyZW5FbnRlclN0eWxlKSB8fFxuICAgICAgICAocGhhc2UgPT09ICdsZWF2ZScgJiYgIXRoaXMucHJvcHMuY2hpbGRyZW5MZWF2ZVN0eWxlKSkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9kaXNwYXRjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KFxuICAgICAgICB0aGlzLl9leGVjdXRlVHJhbnNpdGlvbi5iaW5kKHRoaXMsIGNhbGxiYWNrLCBwaGFzZSksXG4gICAgICAgIHRoaXMuX3RpY2tcbiAgICAgICk7XG4gICAgfVxuICB9LFxuXG4gIF9leGVjdXRlVHJhbnNpdGlvbjogZnVuY3Rpb24gKGNhbGxiYWNrLCBwaGFzZSkge1xuICAgIHZhciBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG5cbiAgICBpZiAoIW5vZGUpIHJldHVybjtcblxuICAgIENTU1Byb3BlcnR5T3BlcmF0aW9ucy5zZXRWYWx1ZUZvclN0eWxlcyhub2RlLCB0aGlzLl9jb21wdXRlTmV3U3R5bGUocGhhc2UpKTtcbiAgICB2YXIgcHJvcGVydGllcyA9IHRoaXMuX2dldFRyYW5zaXRpb25Qcm9wZXJ0aWVzKGdldENvbXB1dGVkU3R5bGUobm9kZSkpO1xuXG4gICAgdmFyIG1heFRyYW5zaXRpb25UaW1lID0gdGhpcy5fZ2V0VHJhbnNpdGlvbk1heGltdW1UaW1lKFxuICAgICAgcHJvcGVydGllcy50cmFuc2l0aW9uUHJvcGVydHksXG4gICAgICBwcm9wZXJ0aWVzLnRyYW5zaXRpb25EdXJhdGlvbixcbiAgICAgIHByb3BlcnRpZXMudHJhbnNpdGlvbkRlbGF5XG4gICAgKTtcblxuICAgIHRoaXMuX3JlZ2lzdGVyQ2FsbGJhY2tUaW1lb3V0KGNhbGxiYWNrLCBtYXhUcmFuc2l0aW9uVGltZSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb3BzID0ge3N0eWxlOiB0aGlzLnByb3BzLmNoaWxkcmVuQmFzZVN0eWxlfTtcblxuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbiwgcHJvcHMpXG4gICAgKTtcbiAgfSxcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbkNvbnRhaW5lcjsiLCJ2YXIgbWVyZ2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciByZXMgPSB7fTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcmd1bWVudHNbaV0pIHtcbiAgICAgIE9iamVjdC5hc3NpZ24ocmVzLCBhcmd1bWVudHNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlOyJdfQ==
