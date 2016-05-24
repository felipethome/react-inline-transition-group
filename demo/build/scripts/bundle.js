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
      return { count: Math.min(previousState.count + 1, 7) };
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
        boxSizing: 'border-box',
        height: '50px',
        marginBottom: '10px',
        padding: '10px'
      },

      appear: {
        background: '#81C784',
        transition: 'all 1000ms'
      },

      leave: {
        background: '#FFF',
        transition: 'all 500ms'
      },

      button: {
        cursor: 'pointer',
        border: 'none',
        borderRadius: '2px',
        backgroundColor: '#039BE5',
        padding: '10px 15px',
        color: '#FFF',
        fontFamily: '"Roboto", sans-serif',
        textDecoration: 'none',
        textTransform: 'uppercase',
        margin: '0px 15px 15px 0',
        outline: 'none'
      },

      callback: {
        height: '20px',
        backgroundColor: '#FFF',
        border: '1px solid #81C784',
        borderRadius: '2px',
        marginBottom: '15px',
        padding: '5px 5px 5px 5px'
      }
    };

    var elems = [];

    for (var i = 0; i < this.state.count; i++) {
      elems.push(React.createElement(
        'div',
        { key: i, id: i },
        'id: ' + i
      ));
    }

    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { style: styles.button, onClick: this._handleAdd },
          'Add'
        ),
        React.createElement(
          'button',
          { style: styles.button, onClick: this._handleRemove },
          'Remove'
        )
      ),
      React.createElement(
        'div',
        { style: styles.callback },
        'Callback: ' + this.state.callbackMsg
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL21haW4uanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvY2FtZWxpemUuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvY2FtZWxpemVTdHlsZU5hbWUuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9oeXBoZW5hdGUuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvaHlwaGVuYXRlU3R5bGVOYW1lLmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL21lbW9pemVTdHJpbmdPbmx5LmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL3dhcm5pbmcuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9DU1NQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvQ1NTUHJvcGVydHlPcGVyYXRpb25zLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFBlcmYuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2Rhbmdlcm91c1N0eWxlVmFsdWUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvdHJhbnNpdGlvbi1jb250YWluZXIuanMiLCJzcmMvdXRpbHMvbWVyZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVo7QUFDQSxJQUFJLFdBQVcsUUFBUSxXQUFSLENBQWY7QUFDQSxJQUFJLGFBQWEsUUFBUSxRQUFSLENBQWpCOztBQUVBLElBQUksT0FBTyxNQUFNLFdBQU4sQ0FBa0I7QUFDM0IsZUFBYSxNQURjOztBQUczQixtQkFBaUIsWUFBWTtBQUMzQixXQUFPO0FBQ0wsbUJBQWEsRUFE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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUM1TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFFQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksVUFBVSxNQUE5QixFQUFzQyxHQUF0QyxFQUEyQztBQUN6QyxRQUFJLFVBQVUsQ0FBVixDQUFKLEVBQWtCO0FBQ2hCLGFBQU8sTUFBUCxDQUFjLEdBQWQsRUFBbUIsVUFBVSxDQUFWLENBQW5CO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPLEdBQVA7QUFDRCxDQVZEOztBQVlBLE9BQU8sT0FBUCxHQUFpQixLQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4uL3NyYycpO1xuXG52YXIgRGVtbyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZGlzcGxheU5hbWU6ICdEZW1vJyxcblxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2FsbGJhY2tNc2c6ICcnLFxuICAgICAgY291bnQ6IDEsXG4gICAgfTtcbiAgfSxcblxuICBfaGFuZGxlQWRkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAocHJldmlvdXNTdGF0ZSkge1xuICAgICAgcmV0dXJuIHtjb3VudDogTWF0aC5taW4ocHJldmlvdXNTdGF0ZS5jb3VudCArIDEsIDcpfTtcbiAgICB9KTtcbiAgfSxcblxuICBfaGFuZGxlUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAocHJldmlvdXNTdGF0ZSkge1xuICAgICAgcmV0dXJuIHtjb3VudDogTWF0aC5tYXgocHJldmlvdXNTdGF0ZS5jb3VudCAtIDEsIDApfTtcbiAgICB9KTtcbiAgfSxcblxuICBfaGFuZGxlU3RhcnRBcHBlYXI6IGZ1bmN0aW9uIChpZCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2NhbGxiYWNrTXNnOiBpZCArICcgc3RhcnQgdG8gYXBwZWFyJ30pO1xuICB9LFxuXG4gIF9oYW5kbGVTdGFydEVudGVyOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtjYWxsYmFja01zZzogaWQgKyAnIHN0YXJ0IHRvIGVudGVyJ30pO1xuICB9LFxuXG4gIF9oYW5kbGVTdGFydExlYXZlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtjYWxsYmFja01zZzogaWQgKyAnIHN0YXJ0IHRvIGxlYXZlJ30pO1xuICB9LFxuXG4gIF9oYW5kbGVBcHBlYXJlZDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2FsbGJhY2tNc2c6IGlkICsgJyBhcHBlYXJlZCd9KTtcbiAgfSxcblxuICBfaGFuZGxlRW50ZXJlZDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2FsbGJhY2tNc2c6IGlkICsgJyBlbnRlcmVkJ30pO1xuICB9LFxuXG4gIF9oYW5kbGVMZWZ0OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtjYWxsYmFja01zZzogaWQgKyAnIGxlZnQnfSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0eWxlcyA9IHtcbiAgICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIH0sXG5cbiAgICAgIGJhc2U6IHtcbiAgICAgICAgYmFja2dyb3VuZDogJyNGRkYnLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnLFxuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgaGVpZ2h0OiAnNTBweCcsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxuICAgICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICB9LFxuXG4gICAgICBhcHBlYXI6IHtcbiAgICAgICAgYmFja2dyb3VuZDogJyM4MUM3ODQnLFxuICAgICAgICB0cmFuc2l0aW9uOiAnYWxsIDEwMDBtcycsXG4gICAgICB9LFxuXG4gICAgICBsZWF2ZToge1xuICAgICAgICBiYWNrZ3JvdW5kOiAnI0ZGRicsXG4gICAgICAgIHRyYW5zaXRpb246ICdhbGwgNTAwbXMnLFxuICAgICAgfSxcblxuICAgICAgYnV0dG9uOiB7XG4gICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAzOUJFNScsXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4IDE1cHgnLFxuICAgICAgICBjb2xvcjogJyNGRkYnLFxuICAgICAgICBmb250RmFtaWx5OiAnXCJSb2JvdG9cIiwgc2Fucy1zZXJpZicsXG4gICAgICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gICAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLFxuICAgICAgICBtYXJnaW46ICcwcHggMTVweCAxNXB4IDAnLFxuICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICB9LFxuXG4gICAgICBjYWxsYmFjazoge1xuICAgICAgICBoZWlnaHQ6ICcyMHB4JyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0ZGRicsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjODFDNzg0JyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAnMTVweCcsXG4gICAgICAgIHBhZGRpbmc6ICc1cHggNXB4IDVweCA1cHgnLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgdmFyIGVsZW1zID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUuY291bnQ7IGkrKykge1xuICAgICAgZWxlbXMucHVzaChcbiAgICAgICAgPGRpdiBrZXk9e2l9IGlkPXtpfT57J2lkOiAnICsgaX08L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IG9uQ2xpY2s9e3RoaXMuX2hhbmRsZUFkZH0+XG4gICAgICAgICAgICBBZGRcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBvbkNsaWNrPXt0aGlzLl9oYW5kbGVSZW1vdmV9PlxuICAgICAgICAgICAgUmVtb3ZlXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuY2FsbGJhY2t9PlxuICAgICAgICAgIHsnQ2FsbGJhY2s6ICcgKyB0aGlzLnN0YXRlLmNhbGxiYWNrTXNnfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFRyYW5zaXRpb25cbiAgICAgICAgICBjaGlsZHJlbkJhc2VTdHlsZT17c3R5bGVzLmJhc2V9XG4gICAgICAgICAgY2hpbGRyZW5BcHBlYXJTdHlsZT17c3R5bGVzLmFwcGVhcn1cbiAgICAgICAgICBjaGlsZHJlbkVudGVyU3R5bGU9e3N0eWxlcy5hcHBlYXJ9XG4gICAgICAgICAgY2hpbGRyZW5MZWF2ZVN0eWxlPXtzdHlsZXMubGVhdmV9XG4gICAgICAgICAgb25DaGlsZEFwcGVhcmVkPXt0aGlzLl9oYW5kbGVBcHBlYXJlZH1cbiAgICAgICAgICBvbkNoaWxkRW50ZXJlZD17dGhpcy5faGFuZGxlRW50ZXJlZH1cbiAgICAgICAgICBvbkNoaWxkTGVmdD17dGhpcy5faGFuZGxlTGVmdH1cbiAgICAgICAgICBvbkNoaWxkU3RhcnRBcHBlYXI9e3RoaXMuX2hhbmRsZVN0YXJ0QXBwZWFyfVxuICAgICAgICAgIG9uQ2hpbGRTdGFydEVudGVyPXt0aGlzLl9oYW5kbGVTdGFydEVudGVyfVxuICAgICAgICAgIG9uQ2hpbGRTdGFydExlYXZlPXt0aGlzLl9oYW5kbGVTdGFydExlYXZlfVxuICAgICAgICA+XG4gICAgICAgICAge2VsZW1zfVxuICAgICAgICA8L1RyYW5zaXRpb24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxufSk7XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgPERlbW8gLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vJylcbik7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG4vKipcbiAqIFNpbXBsZSwgbGlnaHR3ZWlnaHQgbW9kdWxlIGFzc2lzdGluZyB3aXRoIHRoZSBkZXRlY3Rpb24gYW5kIGNvbnRleHQgb2ZcbiAqIFdvcmtlci4gSGVscHMgYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzIGFuZCBhbGxvd3MgY29kZSB0byByZWFzb24gYWJvdXRcbiAqIHdoZXRoZXIgb3Igbm90IHRoZXkgYXJlIGluIGEgV29ya2VyLCBldmVuIGlmIHRoZXkgbmV2ZXIgaW5jbHVkZSB0aGUgbWFpblxuICogYFJlYWN0V29ya2VyYCBkZXBlbmRlbmN5LlxuICovXG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSB7XG5cbiAgY2FuVXNlRE9NOiBjYW5Vc2VET00sXG5cbiAgY2FuVXNlV29ya2VyczogdHlwZW9mIFdvcmtlciAhPT0gJ3VuZGVmaW5lZCcsXG5cbiAgY2FuVXNlRXZlbnRMaXN0ZW5lcnM6IGNhblVzZURPTSAmJiAhISh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciB8fCB3aW5kb3cuYXR0YWNoRXZlbnQpLFxuXG4gIGNhblVzZVZpZXdwb3J0OiBjYW5Vc2VET00gJiYgISF3aW5kb3cuc2NyZWVuLFxuXG4gIGlzSW5Xb3JrZXI6ICFjYW5Vc2VET00gLy8gRm9yIG5vdywgdGhpcyBpcyB0cnVlIC0gbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmUuXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXhlY3V0aW9uRW52aXJvbm1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbnZhciBfaHlwaGVuUGF0dGVybiA9IC8tKC4pL2c7XG5cbi8qKlxuICogQ2FtZWxjYXNlcyBhIGh5cGhlbmF0ZWQgc3RyaW5nLCBmb3IgZXhhbXBsZTpcbiAqXG4gKiAgID4gY2FtZWxpemUoJ2JhY2tncm91bmQtY29sb3InKVxuICogICA8IFwiYmFja2dyb3VuZENvbG9yXCJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGNhbWVsaXplKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX2h5cGhlblBhdHRlcm4sIGZ1bmN0aW9uIChfLCBjaGFyYWN0ZXIpIHtcbiAgICByZXR1cm4gY2hhcmFjdGVyLnRvVXBwZXJDYXNlKCk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbWVsaXplOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhbWVsaXplID0gcmVxdWlyZSgnLi9jYW1lbGl6ZScpO1xuXG52YXIgbXNQYXR0ZXJuID0gL14tbXMtLztcblxuLyoqXG4gKiBDYW1lbGNhc2VzIGEgaHlwaGVuYXRlZCBDU1MgcHJvcGVydHkgbmFtZSwgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGNhbWVsaXplU3R5bGVOYW1lKCdiYWNrZ3JvdW5kLWNvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmRDb2xvclwiXG4gKiAgID4gY2FtZWxpemVTdHlsZU5hbWUoJy1tb3otdHJhbnNpdGlvbicpXG4gKiAgIDwgXCJNb3pUcmFuc2l0aW9uXCJcbiAqICAgPiBjYW1lbGl6ZVN0eWxlTmFtZSgnLW1zLXRyYW5zaXRpb24nKVxuICogICA8IFwibXNUcmFuc2l0aW9uXCJcbiAqXG4gKiBBcyBBbmRpIFNtaXRoIHN1Z2dlc3RzXG4gKiAoaHR0cDovL3d3dy5hbmRpc21pdGguY29tL2Jsb2cvMjAxMi8wMi9tb2Rlcm5penItcHJlZml4ZWQvKSwgYW4gYC1tc2AgcHJlZml4XG4gKiBpcyBjb252ZXJ0ZWQgdG8gbG93ZXJjYXNlIGBtc2AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjYW1lbGl6ZVN0eWxlTmFtZShzdHJpbmcpIHtcbiAgcmV0dXJuIGNhbWVsaXplKHN0cmluZy5yZXBsYWNlKG1zUGF0dGVybiwgJ21zLScpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW1lbGl6ZVN0eWxlTmFtZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xuZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbnZhciBfdXBwZXJjYXNlUGF0dGVybiA9IC8oW0EtWl0pL2c7XG5cbi8qKlxuICogSHlwaGVuYXRlcyBhIGNhbWVsY2FzZWQgc3RyaW5nLCBmb3IgZXhhbXBsZTpcbiAqXG4gKiAgID4gaHlwaGVuYXRlKCdiYWNrZ3JvdW5kQ29sb3InKVxuICogICA8IFwiYmFja2dyb3VuZC1jb2xvclwiXG4gKlxuICogRm9yIENTUyBzdHlsZSBuYW1lcywgdXNlIGBoeXBoZW5hdGVTdHlsZU5hbWVgIGluc3RlYWQgd2hpY2ggd29ya3MgcHJvcGVybHlcbiAqIHdpdGggYWxsIHZlbmRvciBwcmVmaXhlcywgaW5jbHVkaW5nIGBtc2AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBoeXBoZW5hdGUoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShfdXBwZXJjYXNlUGF0dGVybiwgJy0kMScpLnRvTG93ZXJDYXNlKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHlwaGVuYXRlOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGh5cGhlbmF0ZSA9IHJlcXVpcmUoJy4vaHlwaGVuYXRlJyk7XG5cbnZhciBtc1BhdHRlcm4gPSAvXm1zLS87XG5cbi8qKlxuICogSHlwaGVuYXRlcyBhIGNhbWVsY2FzZWQgQ1NTIHByb3BlcnR5IG5hbWUsIGZvciBleGFtcGxlOlxuICpcbiAqICAgPiBoeXBoZW5hdGVTdHlsZU5hbWUoJ2JhY2tncm91bmRDb2xvcicpXG4gKiAgIDwgXCJiYWNrZ3JvdW5kLWNvbG9yXCJcbiAqICAgPiBoeXBoZW5hdGVTdHlsZU5hbWUoJ01velRyYW5zaXRpb24nKVxuICogICA8IFwiLW1vei10cmFuc2l0aW9uXCJcbiAqICAgPiBoeXBoZW5hdGVTdHlsZU5hbWUoJ21zVHJhbnNpdGlvbicpXG4gKiAgIDwgXCItbXMtdHJhbnNpdGlvblwiXG4gKlxuICogQXMgTW9kZXJuaXpyIHN1Z2dlc3RzIChodHRwOi8vbW9kZXJuaXpyLmNvbS9kb2NzLyNwcmVmaXhlZCksIGFuIGBtc2AgcHJlZml4XG4gKiBpcyBjb252ZXJ0ZWQgdG8gYC1tcy1gLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gaHlwaGVuYXRlU3R5bGVOYW1lKHN0cmluZykge1xuICByZXR1cm4gaHlwaGVuYXRlKHN0cmluZykucmVwbGFjZShtc1BhdHRlcm4sICctbXMtJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHlwaGVuYXRlU3R5bGVOYW1lOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZW1vaXplcyB0aGUgcmV0dXJuIHZhbHVlIG9mIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIG9uZSBzdHJpbmcgYXJndW1lbnQuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5cbmZ1bmN0aW9uIG1lbW9pemVTdHJpbmdPbmx5KGNhbGxiYWNrKSB7XG4gIHZhciBjYWNoZSA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuICAgIGlmICghY2FjaGUuaGFzT3duUHJvcGVydHkoc3RyaW5nKSkge1xuICAgICAgY2FjaGVbc3RyaW5nXSA9IGNhbGxiYWNrLmNhbGwodGhpcywgc3RyaW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlW3N0cmluZ107XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZVN0cmluZ09ubHk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB3YXJuaW5nID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZzsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBDU1NQcm9wZXJ0eVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDU1MgcHJvcGVydGllcyB3aGljaCBhY2NlcHQgbnVtYmVycyBidXQgYXJlIG5vdCBpbiB1bml0cyBvZiBcInB4XCIuXG4gKi9cblxudmFyIGlzVW5pdGxlc3NOdW1iZXIgPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiB0cnVlLFxuICBib3JkZXJJbWFnZU91dHNldDogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VTbGljZTogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VXaWR0aDogdHJ1ZSxcbiAgYm94RmxleDogdHJ1ZSxcbiAgYm94RmxleEdyb3VwOiB0cnVlLFxuICBib3hPcmRpbmFsR3JvdXA6IHRydWUsXG4gIGNvbHVtbkNvdW50OiB0cnVlLFxuICBmbGV4OiB0cnVlLFxuICBmbGV4R3JvdzogdHJ1ZSxcbiAgZmxleFBvc2l0aXZlOiB0cnVlLFxuICBmbGV4U2hyaW5rOiB0cnVlLFxuICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gIGZsZXhPcmRlcjogdHJ1ZSxcbiAgZ3JpZFJvdzogdHJ1ZSxcbiAgZ3JpZENvbHVtbjogdHJ1ZSxcbiAgZm9udFdlaWdodDogdHJ1ZSxcbiAgbGluZUNsYW1wOiB0cnVlLFxuICBsaW5lSGVpZ2h0OiB0cnVlLFxuICBvcGFjaXR5OiB0cnVlLFxuICBvcmRlcjogdHJ1ZSxcbiAgb3JwaGFuczogdHJ1ZSxcbiAgdGFiU2l6ZTogdHJ1ZSxcbiAgd2lkb3dzOiB0cnVlLFxuICB6SW5kZXg6IHRydWUsXG4gIHpvb206IHRydWUsXG5cbiAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgZmxvb2RPcGFjaXR5OiB0cnVlLFxuICBzdG9wT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlRGFzaGFycmF5OiB0cnVlLFxuICBzdHJva2VEYXNob2Zmc2V0OiB0cnVlLFxuICBzdHJva2VNaXRlcmxpbWl0OiB0cnVlLFxuICBzdHJva2VPcGFjaXR5OiB0cnVlLFxuICBzdHJva2VXaWR0aDogdHJ1ZVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IHZlbmRvci1zcGVjaWZpYyBwcmVmaXgsIGVnOiBXZWJraXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgc3R5bGUgbmFtZSwgZWc6IHRyYW5zaXRpb25EdXJhdGlvblxuICogQHJldHVybiB7c3RyaW5nfSBzdHlsZSBuYW1lIHByZWZpeGVkIHdpdGggYHByZWZpeGAsIHByb3Blcmx5IGNhbWVsQ2FzZWQsIGVnOlxuICogV2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHByZWZpeEtleShwcmVmaXgsIGtleSkge1xuICByZXR1cm4gcHJlZml4ICsga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxKTtcbn1cblxuLyoqXG4gKiBTdXBwb3J0IHN0eWxlIG5hbWVzIHRoYXQgbWF5IGNvbWUgcGFzc2VkIGluIHByZWZpeGVkIGJ5IGFkZGluZyBwZXJtdXRhdGlvbnNcbiAqIG9mIHZlbmRvciBwcmVmaXhlcy5cbiAqL1xudmFyIHByZWZpeGVzID0gWydXZWJraXQnLCAnbXMnLCAnTW96JywgJ08nXTtcblxuLy8gVXNpbmcgT2JqZWN0LmtleXMgaGVyZSwgb3IgZWxzZSB0aGUgdmFuaWxsYSBmb3ItaW4gbG9vcCBtYWtlcyBJRTggZ28gaW50byBhblxuLy8gaW5maW5pdGUgbG9vcCwgYmVjYXVzZSBpdCBpdGVyYXRlcyBvdmVyIHRoZSBuZXdseSBhZGRlZCBwcm9wcyB0b28uXG5PYmplY3Qua2V5cyhpc1VuaXRsZXNzTnVtYmVyKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gIHByZWZpeGVzLmZvckVhY2goZnVuY3Rpb24gKHByZWZpeCkge1xuICAgIGlzVW5pdGxlc3NOdW1iZXJbcHJlZml4S2V5KHByZWZpeCwgcHJvcCldID0gaXNVbml0bGVzc051bWJlcltwcm9wXTtcbiAgfSk7XG59KTtcblxuLyoqXG4gKiBNb3N0IHN0eWxlIHByb3BlcnRpZXMgY2FuIGJlIHVuc2V0IGJ5IGRvaW5nIC5zdHlsZVtwcm9wXSA9ICcnIGJ1dCBJRThcbiAqIGRvZXNuJ3QgbGlrZSBkb2luZyB0aGF0IHdpdGggc2hvcnRoYW5kIHByb3BlcnRpZXMgc28gZm9yIHRoZSBwcm9wZXJ0aWVzIHRoYXRcbiAqIElFOCBicmVha3Mgb24sIHdoaWNoIGFyZSBsaXN0ZWQgaGVyZSwgd2UgaW5zdGVhZCB1bnNldCBlYWNoIG9mIHRoZVxuICogaW5kaXZpZHVhbCBwcm9wZXJ0aWVzLiBTZWUgaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTIzODUuXG4gKiBUaGUgNC12YWx1ZSAnY2xvY2snIHByb3BlcnRpZXMgbGlrZSBtYXJnaW4sIHBhZGRpbmcsIGJvcmRlci13aWR0aCBzZWVtIHRvXG4gKiBiZWhhdmUgd2l0aG91dCBhbnkgcHJvYmxlbXMuIEN1cmlvdXNseSwgbGlzdC1zdHlsZSB3b3JrcyB0b28gd2l0aG91dCBhbnlcbiAqIHNwZWNpYWwgcHJvZGRpbmcuXG4gKi9cbnZhciBzaG9ydGhhbmRQcm9wZXJ0eUV4cGFuc2lvbnMgPSB7XG4gIGJhY2tncm91bmQ6IHtcbiAgICBiYWNrZ3JvdW5kQXR0YWNobWVudDogdHJ1ZSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHRydWUsXG4gICAgYmFja2dyb3VuZEltYWdlOiB0cnVlLFxuICAgIGJhY2tncm91bmRQb3NpdGlvblg6IHRydWUsXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uWTogdHJ1ZSxcbiAgICBiYWNrZ3JvdW5kUmVwZWF0OiB0cnVlXG4gIH0sXG4gIGJhY2tncm91bmRQb3NpdGlvbjoge1xuICAgIGJhY2tncm91bmRQb3NpdGlvblg6IHRydWUsXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uWTogdHJ1ZVxuICB9LFxuICBib3JkZXI6IHtcbiAgICBib3JkZXJXaWR0aDogdHJ1ZSxcbiAgICBib3JkZXJTdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJDb2xvcjogdHJ1ZVxuICB9LFxuICBib3JkZXJCb3R0b206IHtcbiAgICBib3JkZXJCb3R0b21XaWR0aDogdHJ1ZSxcbiAgICBib3JkZXJCb3R0b21TdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJCb3R0b21Db2xvcjogdHJ1ZVxuICB9LFxuICBib3JkZXJMZWZ0OiB7XG4gICAgYm9yZGVyTGVmdFdpZHRoOiB0cnVlLFxuICAgIGJvcmRlckxlZnRTdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJMZWZ0Q29sb3I6IHRydWVcbiAgfSxcbiAgYm9yZGVyUmlnaHQ6IHtcbiAgICBib3JkZXJSaWdodFdpZHRoOiB0cnVlLFxuICAgIGJvcmRlclJpZ2h0U3R5bGU6IHRydWUsXG4gICAgYm9yZGVyUmlnaHRDb2xvcjogdHJ1ZVxuICB9LFxuICBib3JkZXJUb3A6IHtcbiAgICBib3JkZXJUb3BXaWR0aDogdHJ1ZSxcbiAgICBib3JkZXJUb3BTdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJUb3BDb2xvcjogdHJ1ZVxuICB9LFxuICBmb250OiB7XG4gICAgZm9udFN0eWxlOiB0cnVlLFxuICAgIGZvbnRWYXJpYW50OiB0cnVlLFxuICAgIGZvbnRXZWlnaHQ6IHRydWUsXG4gICAgZm9udFNpemU6IHRydWUsXG4gICAgbGluZUhlaWdodDogdHJ1ZSxcbiAgICBmb250RmFtaWx5OiB0cnVlXG4gIH0sXG4gIG91dGxpbmU6IHtcbiAgICBvdXRsaW5lV2lkdGg6IHRydWUsXG4gICAgb3V0bGluZVN0eWxlOiB0cnVlLFxuICAgIG91dGxpbmVDb2xvcjogdHJ1ZVxuICB9XG59O1xuXG52YXIgQ1NTUHJvcGVydHkgPSB7XG4gIGlzVW5pdGxlc3NOdW1iZXI6IGlzVW5pdGxlc3NOdW1iZXIsXG4gIHNob3J0aGFuZFByb3BlcnR5RXhwYW5zaW9uczogc2hvcnRoYW5kUHJvcGVydHlFeHBhbnNpb25zXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENTU1Byb3BlcnR5OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBDU1NQcm9wZXJ0eU9wZXJhdGlvbnNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDU1NQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vQ1NTUHJvcGVydHknKTtcbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHJlcXVpcmUoJ2ZianMvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50Jyk7XG52YXIgUmVhY3RQZXJmID0gcmVxdWlyZSgnLi9SZWFjdFBlcmYnKTtcblxudmFyIGNhbWVsaXplU3R5bGVOYW1lID0gcmVxdWlyZSgnZmJqcy9saWIvY2FtZWxpemVTdHlsZU5hbWUnKTtcbnZhciBkYW5nZXJvdXNTdHlsZVZhbHVlID0gcmVxdWlyZSgnLi9kYW5nZXJvdXNTdHlsZVZhbHVlJyk7XG52YXIgaHlwaGVuYXRlU3R5bGVOYW1lID0gcmVxdWlyZSgnZmJqcy9saWIvaHlwaGVuYXRlU3R5bGVOYW1lJyk7XG52YXIgbWVtb2l6ZVN0cmluZ09ubHkgPSByZXF1aXJlKCdmYmpzL2xpYi9tZW1vaXplU3RyaW5nT25seScpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBwcm9jZXNzU3R5bGVOYW1lID0gbWVtb2l6ZVN0cmluZ09ubHkoZnVuY3Rpb24gKHN0eWxlTmFtZSkge1xuICByZXR1cm4gaHlwaGVuYXRlU3R5bGVOYW1lKHN0eWxlTmFtZSk7XG59KTtcblxudmFyIGhhc1Nob3J0aGFuZFByb3BlcnR5QnVnID0gZmFsc2U7XG52YXIgc3R5bGVGbG9hdEFjY2Vzc29yID0gJ2Nzc0Zsb2F0JztcbmlmIChFeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcbiAgdmFyIHRlbXBTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlO1xuICB0cnkge1xuICAgIC8vIElFOCB0aHJvd3MgXCJJbnZhbGlkIGFyZ3VtZW50LlwiIGlmIHJlc2V0dGluZyBzaG9ydGhhbmQgc3R5bGUgcHJvcGVydGllcy5cbiAgICB0ZW1wU3R5bGUuZm9udCA9ICcnO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaGFzU2hvcnRoYW5kUHJvcGVydHlCdWcgPSB0cnVlO1xuICB9XG4gIC8vIElFOCBvbmx5IHN1cHBvcnRzIGFjY2Vzc2luZyBjc3NGbG9hdCAoc3RhbmRhcmQpIGFzIHN0eWxlRmxvYXRcbiAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3R5bGVGbG9hdEFjY2Vzc29yID0gJ3N0eWxlRmxvYXQnO1xuICB9XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIC8vICdtc1RyYW5zZm9ybScgaXMgY29ycmVjdCwgYnV0IHRoZSBvdGhlciBwcmVmaXhlcyBzaG91bGQgYmUgY2FwaXRhbGl6ZWRcbiAgdmFyIGJhZFZlbmRvcmVkU3R5bGVOYW1lUGF0dGVybiA9IC9eKD86d2Via2l0fG1venxvKVtBLVpdLztcblxuICAvLyBzdHlsZSB2YWx1ZXMgc2hvdWxkbid0IGNvbnRhaW4gYSBzZW1pY29sb25cbiAgdmFyIGJhZFN0eWxlVmFsdWVXaXRoU2VtaWNvbG9uUGF0dGVybiA9IC87XFxzKiQvO1xuXG4gIHZhciB3YXJuZWRTdHlsZU5hbWVzID0ge307XG4gIHZhciB3YXJuZWRTdHlsZVZhbHVlcyA9IHt9O1xuICB2YXIgd2FybmVkRm9yTmFOVmFsdWUgPSBmYWxzZTtcblxuICB2YXIgd2Fybkh5cGhlbmF0ZWRTdHlsZU5hbWUgPSBmdW5jdGlvbiAobmFtZSwgb3duZXIpIHtcbiAgICBpZiAod2FybmVkU3R5bGVOYW1lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiB3YXJuZWRTdHlsZU5hbWVzW25hbWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2FybmVkU3R5bGVOYW1lc1tuYW1lXSA9IHRydWU7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdVbnN1cHBvcnRlZCBzdHlsZSBwcm9wZXJ0eSAlcy4gRGlkIHlvdSBtZWFuICVzPyVzJywgbmFtZSwgY2FtZWxpemVTdHlsZU5hbWUobmFtZSksIGNoZWNrUmVuZGVyTWVzc2FnZShvd25lcikpIDogdm9pZCAwO1xuICB9O1xuXG4gIHZhciB3YXJuQmFkVmVuZG9yZWRTdHlsZU5hbWUgPSBmdW5jdGlvbiAobmFtZSwgb3duZXIpIHtcbiAgICBpZiAod2FybmVkU3R5bGVOYW1lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiB3YXJuZWRTdHlsZU5hbWVzW25hbWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2FybmVkU3R5bGVOYW1lc1tuYW1lXSA9IHRydWU7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdVbnN1cHBvcnRlZCB2ZW5kb3ItcHJlZml4ZWQgc3R5bGUgcHJvcGVydHkgJXMuIERpZCB5b3UgbWVhbiAlcz8lcycsIG5hbWUsIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpLCBjaGVja1JlbmRlck1lc3NhZ2Uob3duZXIpKSA6IHZvaWQgMDtcbiAgfTtcblxuICB2YXIgd2FyblN0eWxlVmFsdWVXaXRoU2VtaWNvbG9uID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBvd25lcikge1xuICAgIGlmICh3YXJuZWRTdHlsZVZhbHVlcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkgJiYgd2FybmVkU3R5bGVWYWx1ZXNbdmFsdWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2FybmVkU3R5bGVWYWx1ZXNbdmFsdWVdID0gdHJ1ZTtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ1N0eWxlIHByb3BlcnR5IHZhbHVlcyBzaG91bGRuXFwndCBjb250YWluIGEgc2VtaWNvbG9uLiVzICcgKyAnVHJ5IFwiJXM6ICVzXCIgaW5zdGVhZC4nLCBjaGVja1JlbmRlck1lc3NhZ2Uob3duZXIpLCBuYW1lLCB2YWx1ZS5yZXBsYWNlKGJhZFN0eWxlVmFsdWVXaXRoU2VtaWNvbG9uUGF0dGVybiwgJycpKSA6IHZvaWQgMDtcbiAgfTtcblxuICB2YXIgd2FyblN0eWxlVmFsdWVJc05hTiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgb3duZXIpIHtcbiAgICBpZiAod2FybmVkRm9yTmFOVmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3YXJuZWRGb3JOYU5WYWx1ZSA9IHRydWU7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdgTmFOYCBpcyBhbiBpbnZhbGlkIHZhbHVlIGZvciB0aGUgYCVzYCBjc3Mgc3R5bGUgcHJvcGVydHkuJXMnLCBuYW1lLCBjaGVja1JlbmRlck1lc3NhZ2Uob3duZXIpKSA6IHZvaWQgMDtcbiAgfTtcblxuICB2YXIgY2hlY2tSZW5kZXJNZXNzYWdlID0gZnVuY3Rpb24gKG93bmVyKSB7XG4gICAgaWYgKG93bmVyKSB7XG4gICAgICB2YXIgbmFtZSA9IG93bmVyLmdldE5hbWUoKTtcbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfTtcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1JlYWN0RE9NQ29tcG9uZW50fSBjb21wb25lbnRcbiAgICovXG4gIHZhciB3YXJuVmFsaWRTdHlsZSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgY29tcG9uZW50KSB7XG4gICAgdmFyIG93bmVyO1xuICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgIG93bmVyID0gY29tcG9uZW50Ll9jdXJyZW50RWxlbWVudC5fb3duZXI7XG4gICAgfVxuICAgIGlmIChuYW1lLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICB3YXJuSHlwaGVuYXRlZFN0eWxlTmFtZShuYW1lLCBvd25lcik7XG4gICAgfSBlbHNlIGlmIChiYWRWZW5kb3JlZFN0eWxlTmFtZVBhdHRlcm4udGVzdChuYW1lKSkge1xuICAgICAgd2FybkJhZFZlbmRvcmVkU3R5bGVOYW1lKG5hbWUsIG93bmVyKTtcbiAgICB9IGVsc2UgaWYgKGJhZFN0eWxlVmFsdWVXaXRoU2VtaWNvbG9uUGF0dGVybi50ZXN0KHZhbHVlKSkge1xuICAgICAgd2FyblN0eWxlVmFsdWVXaXRoU2VtaWNvbG9uKG5hbWUsIHZhbHVlLCBvd25lcik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsdWUpKSB7XG4gICAgICB3YXJuU3R5bGVWYWx1ZUlzTmFOKG5hbWUsIHZhbHVlLCBvd25lcik7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIE9wZXJhdGlvbnMgZm9yIGRlYWxpbmcgd2l0aCBDU1MgcHJvcGVydGllcy5cbiAqL1xudmFyIENTU1Byb3BlcnR5T3BlcmF0aW9ucyA9IHtcblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIG1hcHBpbmcgb2Ygc3R5bGUgcHJvcGVydGllcyBmb3IgdXNlIGFzIGlubGluZSBzdHlsZXM6XG4gICAqXG4gICAqICAgPiBjcmVhdGVNYXJrdXBGb3JTdHlsZXMoe3dpZHRoOiAnMjAwcHgnLCBoZWlnaHQ6IDB9KVxuICAgKiAgIFwid2lkdGg6MjAwcHg7aGVpZ2h0OjA7XCJcbiAgICpcbiAgICogVW5kZWZpbmVkIHZhbHVlcyBhcmUgaWdub3JlZCBzbyB0aGF0IGRlY2xhcmF0aXZlIHByb2dyYW1taW5nIGlzIGVhc2llci5cbiAgICogVGhlIHJlc3VsdCBzaG91bGQgYmUgSFRNTC1lc2NhcGVkIGJlZm9yZSBpbnNlcnRpb24gaW50byB0aGUgRE9NLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3R5bGVzXG4gICAqIEBwYXJhbSB7UmVhY3RET01Db21wb25lbnR9IGNvbXBvbmVudFxuICAgKiBAcmV0dXJuIHs/c3RyaW5nfVxuICAgKi9cbiAgY3JlYXRlTWFya3VwRm9yU3R5bGVzOiBmdW5jdGlvbiAoc3R5bGVzLCBjb21wb25lbnQpIHtcbiAgICB2YXIgc2VyaWFsaXplZCA9ICcnO1xuICAgIGZvciAodmFyIHN0eWxlTmFtZSBpbiBzdHlsZXMpIHtcbiAgICAgIGlmICghc3R5bGVzLmhhc093blByb3BlcnR5KHN0eWxlTmFtZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgc3R5bGVWYWx1ZSA9IHN0eWxlc1tzdHlsZU5hbWVdO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgd2FyblZhbGlkU3R5bGUoc3R5bGVOYW1lLCBzdHlsZVZhbHVlLCBjb21wb25lbnQpO1xuICAgICAgfVxuICAgICAgaWYgKHN0eWxlVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBzZXJpYWxpemVkICs9IHByb2Nlc3NTdHlsZU5hbWUoc3R5bGVOYW1lKSArICc6JztcbiAgICAgICAgc2VyaWFsaXplZCArPSBkYW5nZXJvdXNTdHlsZVZhbHVlKHN0eWxlTmFtZSwgc3R5bGVWYWx1ZSwgY29tcG9uZW50KSArICc7JztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlcmlhbGl6ZWQgfHwgbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgZm9yIG11bHRpcGxlIHN0eWxlcyBvbiBhIG5vZGUuICBJZiBhIHZhbHVlIGlzIHNwZWNpZmllZCBhc1xuICAgKiAnJyAoZW1wdHkgc3RyaW5nKSwgdGhlIGNvcnJlc3BvbmRpbmcgc3R5bGUgcHJvcGVydHkgd2lsbCBiZSB1bnNldC5cbiAgICpcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBub2RlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdHlsZXNcbiAgICogQHBhcmFtIHtSZWFjdERPTUNvbXBvbmVudH0gY29tcG9uZW50XG4gICAqL1xuICBzZXRWYWx1ZUZvclN0eWxlczogZnVuY3Rpb24gKG5vZGUsIHN0eWxlcywgY29tcG9uZW50KSB7XG4gICAgdmFyIHN0eWxlID0gbm9kZS5zdHlsZTtcbiAgICBmb3IgKHZhciBzdHlsZU5hbWUgaW4gc3R5bGVzKSB7XG4gICAgICBpZiAoIXN0eWxlcy5oYXNPd25Qcm9wZXJ0eShzdHlsZU5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgd2FyblZhbGlkU3R5bGUoc3R5bGVOYW1lLCBzdHlsZXNbc3R5bGVOYW1lXSwgY29tcG9uZW50KTtcbiAgICAgIH1cbiAgICAgIHZhciBzdHlsZVZhbHVlID0gZGFuZ2Vyb3VzU3R5bGVWYWx1ZShzdHlsZU5hbWUsIHN0eWxlc1tzdHlsZU5hbWVdLCBjb21wb25lbnQpO1xuICAgICAgaWYgKHN0eWxlTmFtZSA9PT0gJ2Zsb2F0JyB8fCBzdHlsZU5hbWUgPT09ICdjc3NGbG9hdCcpIHtcbiAgICAgICAgc3R5bGVOYW1lID0gc3R5bGVGbG9hdEFjY2Vzc29yO1xuICAgICAgfVxuICAgICAgaWYgKHN0eWxlVmFsdWUpIHtcbiAgICAgICAgc3R5bGVbc3R5bGVOYW1lXSA9IHN0eWxlVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZXhwYW5zaW9uID0gaGFzU2hvcnRoYW5kUHJvcGVydHlCdWcgJiYgQ1NTUHJvcGVydHkuc2hvcnRoYW5kUHJvcGVydHlFeHBhbnNpb25zW3N0eWxlTmFtZV07XG4gICAgICAgIGlmIChleHBhbnNpb24pIHtcbiAgICAgICAgICAvLyBTaG9ydGhhbmQgcHJvcGVydHkgdGhhdCBJRTggd29uJ3QgbGlrZSB1bnNldHRpbmcsIHNvIHVuc2V0IGVhY2hcbiAgICAgICAgICAvLyBjb21wb25lbnQgdG8gcGxhY2F0ZSBpdFxuICAgICAgICAgIGZvciAodmFyIGluZGl2aWR1YWxTdHlsZU5hbWUgaW4gZXhwYW5zaW9uKSB7XG4gICAgICAgICAgICBzdHlsZVtpbmRpdmlkdWFsU3R5bGVOYW1lXSA9ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZVtzdHlsZU5hbWVdID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxufTtcblxuUmVhY3RQZXJmLm1lYXN1cmVNZXRob2RzKENTU1Byb3BlcnR5T3BlcmF0aW9ucywgJ0NTU1Byb3BlcnR5T3BlcmF0aW9ucycsIHtcbiAgc2V0VmFsdWVGb3JTdHlsZXM6ICdzZXRWYWx1ZUZvclN0eWxlcydcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENTU1Byb3BlcnR5T3BlcmF0aW9uczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQZXJmXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlYWN0UGVyZiBpcyBhIGdlbmVyYWwgQU9QIHN5c3RlbSBkZXNpZ25lZCB0byBtZWFzdXJlIHBlcmZvcm1hbmNlLiBUaGlzXG4gKiBtb2R1bGUgb25seSBoYXMgdGhlIGhvb2tzOiBzZWUgUmVhY3REZWZhdWx0UGVyZiBmb3IgdGhlIGFuYWx5c2lzIHRvb2wuXG4gKi9cblxudmFyIFJlYWN0UGVyZiA9IHtcbiAgLyoqXG4gICAqIEJvb2xlYW4gdG8gZW5hYmxlL2Rpc2FibGUgbWVhc3VyZW1lbnQuIFNldCB0byBmYWxzZSBieSBkZWZhdWx0IHRvIHByZXZlbnRcbiAgICogYWNjaWRlbnRhbCBsb2dnaW5nIGFuZCBwZXJmIGxvc3MuXG4gICAqL1xuICBlbmFibGVNZWFzdXJlOiBmYWxzZSxcblxuICAvKipcbiAgICogSG9sZHMgb250byB0aGUgbWVhc3VyZSBmdW5jdGlvbiBpbiB1c2UuIEJ5IGRlZmF1bHQsIGRvbid0IG1lYXN1cmVcbiAgICogYW55dGhpbmcsIGJ1dCB3ZSdsbCBvdmVycmlkZSB0aGlzIGlmIHdlIGluamVjdCBhIG1lYXN1cmUgZnVuY3Rpb24uXG4gICAqL1xuICBzdG9yZWRNZWFzdXJlOiBfbm9NZWFzdXJlLFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvYmplY3ROYW1lXG4gICAqIEBwYXJhbSB7b2JqZWN0PHN0cmluZz59IG1ldGhvZE5hbWVzXG4gICAqL1xuICBtZWFzdXJlTWV0aG9kczogZnVuY3Rpb24gKG9iamVjdCwgb2JqZWN0TmFtZSwgbWV0aG9kTmFtZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgZm9yICh2YXIga2V5IGluIG1ldGhvZE5hbWVzKSB7XG4gICAgICAgIGlmICghbWV0aG9kTmFtZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIG9iamVjdFtrZXldID0gUmVhY3RQZXJmLm1lYXN1cmUob2JqZWN0TmFtZSwgbWV0aG9kTmFtZXNba2V5XSwgb2JqZWN0W2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogVXNlIHRoaXMgdG8gd3JhcCBtZXRob2RzIHlvdSB3YW50IHRvIG1lYXN1cmUuIFplcm8gb3ZlcmhlYWQgaW4gcHJvZHVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9iak5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZuTmFtZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICAgKi9cbiAgbWVhc3VyZTogZnVuY3Rpb24gKG9iak5hbWUsIGZuTmFtZSwgZnVuYykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWVhc3VyZWRGdW5jID0gbnVsbDtcbiAgICAgIHZhciB3cmFwcGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoUmVhY3RQZXJmLmVuYWJsZU1lYXN1cmUpIHtcbiAgICAgICAgICBpZiAoIW1lYXN1cmVkRnVuYykge1xuICAgICAgICAgICAgbWVhc3VyZWRGdW5jID0gUmVhY3RQZXJmLnN0b3JlZE1lYXN1cmUob2JqTmFtZSwgZm5OYW1lLCBmdW5jKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1lYXN1cmVkRnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgd3JhcHBlci5kaXNwbGF5TmFtZSA9IG9iak5hbWUgKyAnXycgKyBmbk5hbWU7XG4gICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH0sXG5cbiAgaW5qZWN0aW9uOiB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWVhc3VyZVxuICAgICAqL1xuICAgIGluamVjdE1lYXN1cmU6IGZ1bmN0aW9uIChtZWFzdXJlKSB7XG4gICAgICBSZWFjdFBlcmYuc3RvcmVkTWVhc3VyZSA9IG1lYXN1cmU7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFNpbXBseSBwYXNzZXMgdGhyb3VnaCB0aGUgbWVhc3VyZWQgZnVuY3Rpb24sIHdpdGhvdXQgbWVhc3VyaW5nIGl0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvYmpOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gZm5OYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gX25vTWVhc3VyZShvYmpOYW1lLCBmbk5hbWUsIGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQZXJmOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBkYW5nZXJvdXNTdHlsZVZhbHVlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ1NTUHJvcGVydHkgPSByZXF1aXJlKCcuL0NTU1Byb3BlcnR5Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIGlzVW5pdGxlc3NOdW1iZXIgPSBDU1NQcm9wZXJ0eS5pc1VuaXRsZXNzTnVtYmVyO1xudmFyIHN0eWxlV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgdmFsdWUgaW50byB0aGUgcHJvcGVyIGNzcyB3cml0YWJsZSB2YWx1ZS4gVGhlIHN0eWxlIG5hbWUgYG5hbWVgXG4gKiBzaG91bGQgYmUgbG9naWNhbCAobm8gaHlwaGVucyksIGFzIHNwZWNpZmllZFxuICogaW4gYENTU1Byb3BlcnR5LmlzVW5pdGxlc3NOdW1iZXJgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIENTUyBwcm9wZXJ0eSBuYW1lIHN1Y2ggYXMgYHRvcE1hcmdpbmAuXG4gKiBAcGFyYW0geyp9IHZhbHVlIENTUyBwcm9wZXJ0eSB2YWx1ZSBzdWNoIGFzIGAxMHB4YC5cbiAqIEBwYXJhbSB7UmVhY3RET01Db21wb25lbnR9IGNvbXBvbmVudFxuICogQHJldHVybiB7c3RyaW5nfSBOb3JtYWxpemVkIHN0eWxlIHZhbHVlIHdpdGggZGltZW5zaW9ucyBhcHBsaWVkLlxuICovXG5mdW5jdGlvbiBkYW5nZXJvdXNTdHlsZVZhbHVlKG5hbWUsIHZhbHVlLCBjb21wb25lbnQpIHtcbiAgLy8gTm90ZSB0aGF0IHdlJ3ZlIHJlbW92ZWQgZXNjYXBlVGV4dEZvckJyb3dzZXIoKSBjYWxscyBoZXJlIHNpbmNlIHRoZVxuICAvLyB3aG9sZSBzdHJpbmcgd2lsbCBiZSBlc2NhcGVkIHdoZW4gdGhlIGF0dHJpYnV0ZSBpcyBpbmplY3RlZCBpbnRvXG4gIC8vIHRoZSBtYXJrdXAuIElmIHlvdSBwcm92aWRlIHVuc2FmZSB1c2VyIGRhdGEgaGVyZSB0aGV5IGNhbiBpbmplY3RcbiAgLy8gYXJiaXRyYXJ5IENTUyB3aGljaCBtYXkgYmUgcHJvYmxlbWF0aWMgKEkgY291bGRuJ3QgcmVwcm8gdGhpcyk6XG4gIC8vIGh0dHBzOi8vd3d3Lm93YXNwLm9yZy9pbmRleC5waHAvWFNTX0ZpbHRlcl9FdmFzaW9uX0NoZWF0X1NoZWV0XG4gIC8vIGh0dHA6Ly93d3cudGhlc3Bhbm5lci5jby51ay8yMDA3LzExLzI2L3VsdGltYXRlLXhzcy1jc3MtaW5qZWN0aW9uL1xuICAvLyBUaGlzIGlzIG5vdCBhbiBYU1MgaG9sZSBidXQgaW5zdGVhZCBhIHBvdGVudGlhbCBDU1MgaW5qZWN0aW9uIGlzc3VlXG4gIC8vIHdoaWNoIGhhcyBsZWFkIHRvIGEgZ3JlYXRlciBkaXNjdXNzaW9uIGFib3V0IGhvdyB3ZSdyZSBnb2luZyB0b1xuICAvLyB0cnVzdCBVUkxzIG1vdmluZyBmb3J3YXJkLiBTZWUgIzIxMTU5MDFcblxuICB2YXIgaXNFbXB0eSA9IHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgfHwgdmFsdWUgPT09ICcnO1xuICBpZiAoaXNFbXB0eSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHZhciBpc05vbk51bWVyaWMgPSBpc05hTih2YWx1ZSk7XG4gIGlmIChpc05vbk51bWVyaWMgfHwgdmFsdWUgPT09IDAgfHwgaXNVbml0bGVzc051bWJlci5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiBpc1VuaXRsZXNzTnVtYmVyW25hbWVdKSB7XG4gICAgcmV0dXJuICcnICsgdmFsdWU7IC8vIGNhc3QgdG8gc3RyaW5nXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgIHZhciBvd25lciA9IGNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQuX293bmVyO1xuICAgICAgICB2YXIgb3duZXJOYW1lID0gb3duZXIgPyBvd25lci5nZXROYW1lKCkgOiBudWxsO1xuICAgICAgICBpZiAob3duZXJOYW1lICYmICFzdHlsZVdhcm5pbmdzW293bmVyTmFtZV0pIHtcbiAgICAgICAgICBzdHlsZVdhcm5pbmdzW293bmVyTmFtZV0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2FybmVkID0gZmFsc2U7XG4gICAgICAgIGlmIChvd25lck5hbWUpIHtcbiAgICAgICAgICB2YXIgd2FybmluZ3MgPSBzdHlsZVdhcm5pbmdzW293bmVyTmFtZV07XG4gICAgICAgICAgd2FybmVkID0gd2FybmluZ3NbbmFtZV07XG4gICAgICAgICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgICAgICAgIHdhcm5pbmdzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2EgYCVzYCB0YWcgKG93bmVyOiBgJXNgKSB3YXMgcGFzc2VkIGEgbnVtZXJpYyBzdHJpbmcgdmFsdWUgJyArICdmb3IgQ1NTIHByb3BlcnR5IGAlc2AgKHZhbHVlOiBgJXNgKSB3aGljaCB3aWxsIGJlIHRyZWF0ZWQgJyArICdhcyBhIHVuaXRsZXNzIG51bWJlciBpbiBhIGZ1dHVyZSB2ZXJzaW9uIG9mIFJlYWN0LicsIGNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQudHlwZSwgb3duZXJOYW1lIHx8ICd1bmtub3duJywgbmFtZSwgdmFsdWUpIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHZhbHVlID0gdmFsdWUudHJpbSgpO1xuICB9XG4gIHJldHVybiB2YWx1ZSArICdweCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGFuZ2Vyb3VzU3R5bGVWYWx1ZTsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0VHJhbnNpdGlvbkdyb3VwID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXRyYW5zaXRpb24tZ3JvdXAnKTtcbnZhciBUcmFuc2l0aW9uQ29udGFpbmVyID0gcmVxdWlyZSgnLi90cmFuc2l0aW9uLWNvbnRhaW5lcicpO1xuXG52YXIgVHJhbnNpdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZGlzcGxheU5hbWU6ICdUcmFuc2l0aW9uJyxcblxuICBwcm9wVHlwZXM6IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgY2hpbGRyZW5BcHBlYXJTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjaGlsZHJlbkJhc2VTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjaGlsZHJlbkVudGVyU3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgY2hpbGRyZW5MZWF2ZVN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNoaWxkQXBwZWFyZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRFbnRlcmVkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkTGVmdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZFN0YXJ0QXBwZWFyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkU3RhcnRFbnRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZFN0YXJ0TGVhdmU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICB9LFxuXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgIH07XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdFRyYW5zaXRpb25Hcm91cFxuICAgICAgICBjb21wb25lbnQ9e3RoaXMucHJvcHMuY29tcG9uZW50fVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX1cbiAgICAgID5cbiAgICAgICAge1JlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQsIGkpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRyYW5zaXRpb25Db250YWluZXJcbiAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICBpZD17KChjaGlsZCB8fCB7fSkucHJvcHMgfHwge30pLmlkfVxuICAgICAgICAgICAgICBjaGlsZHJlbkJhc2VTdHlsZT17dGhpcy5wcm9wcy5jaGlsZHJlbkJhc2VTdHlsZX1cbiAgICAgICAgICAgICAgY2hpbGRyZW5BcHBlYXJTdHlsZT17dGhpcy5wcm9wcy5jaGlsZHJlbkFwcGVhclN0eWxlfVxuICAgICAgICAgICAgICBjaGlsZHJlbkVudGVyU3R5bGU9e3RoaXMucHJvcHMuY2hpbGRyZW5FbnRlclN0eWxlfVxuICAgICAgICAgICAgICBjaGlsZHJlbkxlYXZlU3R5bGU9e3RoaXMucHJvcHMuY2hpbGRyZW5MZWF2ZVN0eWxlfVxuICAgICAgICAgICAgICBvbkNoaWxkQXBwZWFyZWQ9e3RoaXMucHJvcHMub25DaGlsZEFwcGVhcmVkfVxuICAgICAgICAgICAgICBvbkNoaWxkRW50ZXJlZD17dGhpcy5wcm9wcy5vbkNoaWxkRW50ZXJlZH1cbiAgICAgICAgICAgICAgb25DaGlsZExlZnQ9e3RoaXMucHJvcHMub25DaGlsZExlZnR9XG4gICAgICAgICAgICAgIG9uQ2hpbGRTdGFydEFwcGVhcj17dGhpcy5wcm9wcy5vbkNoaWxkU3RhcnRBcHBlYXJ9XG4gICAgICAgICAgICAgIG9uQ2hpbGRTdGFydEVudGVyPXt0aGlzLnByb3BzLm9uQ2hpbGRTdGFydEVudGVyfVxuICAgICAgICAgICAgICBvbkNoaWxkU3RhcnRMZWF2ZT17dGhpcy5wcm9wcy5vbkNoaWxkU3RhcnRMZWF2ZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NoaWxkfVxuICAgICAgICAgICAgPC9UcmFuc2l0aW9uQ29udGFpbmVyPlxuICAgICAgICAgICk7XG4gICAgICAgIH0sIHRoaXMpfVxuICAgICAgPC9SZWFjdFRyYW5zaXRpb25Hcm91cD5cbiAgICApO1xuICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2l0aW9uOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbnZhciBDU1NQcm9wZXJ0eU9wZXJhdGlvbnMgPSByZXF1aXJlKCdyZWFjdC9saWIvQ1NTUHJvcGVydHlPcGVyYXRpb25zJyk7XG52YXIgbWVyZ2UgPSByZXF1aXJlKCcuL3V0aWxzL21lcmdlJyk7XG5cbnZhciBUcmFuc2l0aW9uQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ1RyYW5zaXRpb25Db250YWluZXInLFxuXG4gIHByb3BUeXBlczoge1xuICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICBjaGlsZHJlbkFwcGVhclN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNoaWxkcmVuQmFzZVN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIGNoaWxkcmVuRW50ZXJTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjaGlsZHJlbkxlYXZlU3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoXG4gICAgICBbUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgUmVhY3QuUHJvcFR5cGVzLm51bWJlcl1cbiAgICApLFxuICAgIG9uQ2hpbGRBcHBlYXJlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGlsZEVudGVyZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRMZWZ0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkU3RhcnRBcHBlYXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hpbGRTdGFydEVudGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoaWxkU3RhcnRMZWF2ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fZGlzcGF0Y2hUaW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLl9jYWxsYmFja1RpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMuX3RpY2sgPSAxNztcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl9kaXNwYXRjaFRpbWVvdXQpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl9jYWxsYmFja1RpbWVvdXQpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxBcHBlYXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuX3RyYW5zaXRpb24oY2FsbGJhY2ssICdhcHBlYXInKTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hpbGRTdGFydEFwcGVhcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoaWxkU3RhcnRBcHBlYXIodGhpcy5wcm9wcy5pZCk7XG4gICAgfVxuICB9LFxuXG4gIGNvbXBvbmVudERpZEFwcGVhcjogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hpbGRBcHBlYXJlZCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoaWxkQXBwZWFyZWQodGhpcy5wcm9wcy5pZCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXBwZWFyZWQgPSB0cnVlO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxFbnRlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fdHJhbnNpdGlvbihjYWxsYmFjaywgJ2VudGVyJyk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoaWxkU3RhcnRFbnRlcikge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoaWxkU3RhcnRFbnRlcih0aGlzLnByb3BzLmlkKTtcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkRW50ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoaWxkRW50ZXJlZCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoaWxkRW50ZXJlZCh0aGlzLnByb3BzLmlkKTtcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbExlYXZlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uKGNhbGxiYWNrLCAnbGVhdmUnKTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hpbGRTdGFydExlYXZlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hpbGRTdGFydExlYXZlKHRoaXMucHJvcHMuaWQpO1xuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnREaWRMZWF2ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hpbGRMZWZ0KSB0aGlzLnByb3BzLm9uQ2hpbGRMZWZ0KHRoaXMucHJvcHMuaWQpO1xuICB9LFxuXG4gIF9nZXRUcmFuc2l0aW9uUHJvcGVydGllczogZnVuY3Rpb24gKGNvbXB1dGVkU3R5bGUpIHtcbiAgICB2YXIgcHJvcGVydGllcyA9IHt9O1xuXG4gICAgcHJvcGVydGllcy50cmFuc2l0aW9uRHVyYXRpb24gPSBjb21wdXRlZFN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiB8fFxuICAgICAgY29tcHV0ZWRTdHlsZS5XZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gfHxcbiAgICAgIGNvbXB1dGVkU3R5bGUuTW96VHJhbnNpdGlvbkR1cmF0aW9uIHx8XG4gICAgICBjb21wdXRlZFN0eWxlLm1zVHJhbnNpdGlvbkR1cmF0aW9uO1xuXG4gICAgcHJvcGVydGllcy50cmFuc2l0aW9uRGVsYXkgPSBjb21wdXRlZFN0eWxlLnRyYW5zaXRpb25EZWxheSB8fFxuICAgICAgY29tcHV0ZWRTdHlsZS5XZWJraXRUcmFuc2l0aW9uRGVsYXkgfHxcbiAgICAgIGNvbXB1dGVkU3R5bGUuTW96VHJhbnNpdGlvbkRlbGF5IHx8XG4gICAgICBjb21wdXRlZFN0eWxlLm1zVHJhbnNpdGlvbkRlbGF5O1xuXG4gICAgcHJvcGVydGllcy50cmFuc2l0aW9uUHJvcGVydHkgPSBjb21wdXRlZFN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSB8fFxuICAgICAgY29tcHV0ZWRTdHlsZS5XZWJraXRUcmFuc2l0aW9uUHJvcGVydHkgfHxcbiAgICAgIGNvbXB1dGVkU3R5bGUubXNUcmFuc2l0aW9uUHJvcGVydHkgfHxcbiAgICAgIGNvbXB1dGVkU3R5bGUuTW96VHJhbnNpdGlvblByb3BlcnR5O1xuXG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gIH0sXG5cbiAgLy8gU3BlY3M6IGh0dHBzOi8vd3d3LnczLm9yZy9UUi9jc3MzLXRyYW5zaXRpb25zL1xuICAvLyBBIGxvdCBvZiBhc3N1bXB0aW9ucyBjb3VsZCBiZSBtYWRlIGhlcmUsIGxpa2UgdGhhdCBwcm9iYWJseSB0aGUgZHVyYXRpb25cbiAgLy8gYW5kIGRlbGF5IGxpc3RzIGFyZSBhbHJlYWR5IHRydW5jYXRlZCBieSB0aGUgc2l6ZSBvZiB0aGUgcHJvcGVydHkgbGlzdFxuICAvLyBvciB0aGF0IHZhbHVlcyB3aWxsIGJlIHJldHVybmVkIGJ5IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIGluIHNlY29uZHMsXG4gIC8vIGJ1dCBJIHByZWZlciB0byBtYWtlIHRoaXMgZnVuY3Rpb24gbGVzcyB2dWxuZXJhYmxlIHRvIGNoYW5nZXMuXG4gIF9nZXRUcmFuc2l0aW9uTWF4aW11bVRpbWU6IGZ1bmN0aW9uIChwcm9wZXJ0eSwgZHVyYXRpb24sIGRlbGF5KSB7XG4gICAgdmFyIGR1cmF0aW9uQXJyYXkgPSBkdXJhdGlvbi5zcGxpdCgnLCcpO1xuICAgIHZhciBkZWxheUFycmF5ID0gZGVsYXkuc3BsaXQoJywnKTtcbiAgICB2YXIgcHJvcGVydHlBcnJheSA9IHByb3BlcnR5LnNwbGl0KCcsJyk7XG4gICAgdmFyIGxvbmdlc3RUaW1lID0gMDtcbiAgICB2YXIgcmUgPSAvKFswLTldKlxcLj9bMC05XSspKG0/cykvO1xuICAgIHZhciBkdXJhdGlvbkZhY3RvcjtcbiAgICB2YXIgZGVsYXlGYWN0b3I7XG4gICAgdmFyIGR1cmF0aW9uR3JvdXBzO1xuICAgIHZhciBkZWxheUdyb3VwcztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcGVydHlBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgZHVyYXRpb25Hcm91cHMgPSBkdXJhdGlvbkFycmF5W2ldLm1hdGNoKHJlKTtcbiAgICAgIGlmIChkdXJhdGlvbkdyb3Vwc1syXSA9PT0gJ3MnKSBkdXJhdGlvbkZhY3RvciA9IDEwMDA7XG4gICAgICBlbHNlIGR1cmF0aW9uRmFjdG9yID0gMTtcblxuICAgICAgZGVsYXlHcm91cHMgPSBkZWxheUFycmF5W2ldLm1hdGNoKHJlKTtcbiAgICAgIGlmIChkZWxheUdyb3Vwc1syXSA9PT0gJ3MnKSBkZWxheUZhY3RvciA9IDEwMDA7XG4gICAgICBlbHNlIGRlbGF5RmFjdG9yID0gMTtcblxuICAgICAgbG9uZ2VzdFRpbWUgPSBNYXRoLm1heChcbiAgICAgICAgcGFyc2VGbG9hdChcbiAgICAgICAgICAoZHVyYXRpb25Hcm91cHNbMV0gKiBkdXJhdGlvbkZhY3RvcikgKyAoZGVsYXlHcm91cHNbMV0gKiBkZWxheUZhY3RvcilcbiAgICAgICAgKSxcbiAgICAgICAgbG9uZ2VzdFRpbWVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvbmdlc3RUaW1lO1xuICB9LFxuXG4gIF9jb21wdXRlTmV3U3R5bGU6IGZ1bmN0aW9uIChwaGFzZSkge1xuICAgIHZhciBjdXJyZW50U3R5bGU7XG4gICAgaWYgKHBoYXNlID09PSAnYXBwZWFyJykgY3VycmVudFN0eWxlID0gdGhpcy5wcm9wcy5jaGlsZHJlbkFwcGVhclN0eWxlO1xuICAgIGVsc2UgaWYgKHBoYXNlID09PSAnZW50ZXInKSBjdXJyZW50U3R5bGUgPSB0aGlzLnByb3BzLmNoaWxkcmVuRW50ZXJTdHlsZTtcbiAgICBlbHNlIGN1cnJlbnRTdHlsZSA9IHRoaXMucHJvcHMuY2hpbGRyZW5MZWF2ZVN0eWxlO1xuXG4gICAgcmV0dXJuIG1lcmdlKHRoaXMucHJvcHMuY2hpbGRyZW5CYXNlU3R5bGUsIGN1cnJlbnRTdHlsZSk7XG4gIH0sXG5cbiAgX3JlZ2lzdGVyQ2FsbGJhY2tUaW1lb3V0OiBmdW5jdGlvbiAoY2FsbGJhY2ssIG1heFRyYW5zaXRpb25UaW1lKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0sIG1heFRyYW5zaXRpb25UaW1lKTtcbiAgfSxcblxuICBfdHJhbnNpdGlvbjogZnVuY3Rpb24gKGNhbGxiYWNrLCBwaGFzZSkge1xuICAgIGlmICgocGhhc2UgPT09ICdhcHBlYXInICYmICF0aGlzLnByb3BzLmNoaWxkcmVuQXBwZWFyU3R5bGUpIHx8XG4gICAgICAgIChwaGFzZSA9PT0gJ2VudGVyJyAmJiAhdGhpcy5wcm9wcy5jaGlsZHJlbkVudGVyU3R5bGUpIHx8XG4gICAgICAgIChwaGFzZSA9PT0gJ2xlYXZlJyAmJiAhdGhpcy5wcm9wcy5jaGlsZHJlbkxlYXZlU3R5bGUpKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoVGltZW91dCA9IHNldFRpbWVvdXQoXG4gICAgICAgIHRoaXMuX2V4ZWN1dGVUcmFuc2l0aW9uLmJpbmQodGhpcywgY2FsbGJhY2ssIHBoYXNlKSxcbiAgICAgICAgdGhpcy5fdGlja1xuICAgICAgKTtcbiAgICB9XG4gIH0sXG5cbiAgX2V4ZWN1dGVUcmFuc2l0aW9uOiBmdW5jdGlvbiAoY2FsbGJhY2ssIHBoYXNlKSB7XG4gICAgdmFyIG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcblxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xuXG4gICAgQ1NTUHJvcGVydHlPcGVyYXRpb25zLnNldFZhbHVlRm9yU3R5bGVzKG5vZGUsIHRoaXMuX2NvbXB1dGVOZXdTdHlsZShwaGFzZSkpO1xuICAgIHZhciBwcm9wZXJ0aWVzID0gdGhpcy5fZ2V0VHJhbnNpdGlvblByb3BlcnRpZXMoZ2V0Q29tcHV0ZWRTdHlsZShub2RlKSk7XG5cbiAgICB2YXIgbWF4VHJhbnNpdGlvblRpbWUgPSB0aGlzLl9nZXRUcmFuc2l0aW9uTWF4aW11bVRpbWUoXG4gICAgICBwcm9wZXJ0aWVzLnRyYW5zaXRpb25Qcm9wZXJ0eSxcbiAgICAgIHByb3BlcnRpZXMudHJhbnNpdGlvbkR1cmF0aW9uLFxuICAgICAgcHJvcGVydGllcy50cmFuc2l0aW9uRGVsYXlcbiAgICApO1xuXG4gICAgdGhpcy5fcmVnaXN0ZXJDYWxsYmFja1RpbWVvdXQoY2FsbGJhY2ssIG1heFRyYW5zaXRpb25UaW1lKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvcHMgPSB7c3R5bGU6IHRoaXMucHJvcHMuY2hpbGRyZW5CYXNlU3R5bGV9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuLCBwcm9wcylcbiAgICApO1xuICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2l0aW9uQ29udGFpbmVyOyIsInZhciBtZXJnZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlcyA9IHt9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFyZ3VtZW50c1tpXSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihyZXMsIGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbWVyZ2U7Il19
