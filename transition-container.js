var React = require('react');
var ReactDOM = require('react-dom');
var hyphenateStyleName = require('fbjs/lib/hyphenateStyleName');
var merge = require('../utils/merge');

var TransitionContainer = React.createClass({
  displayName: 'TransitionContainer',

  propTypes: {
    children: React.PropTypes.node,
    childrenAppearStyle: React.PropTypes.object,
    childrenBaseStyle: React.PropTypes.object,
    childrenEnterStyle: React.PropTypes.object,
    id: React.PropTypes.string || React.PropTypes.number,
    leaveStyle: React.PropTypes.object,
    onComponentAppear: React.PropTypes.func,
    onComponentEnter: React.PropTypes.func,
    onComponentLeave: React.PropTypes.func,
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
  },

  componentDidAppear: function () {
    if (this.props.onComponentAppear) {
      this.props.onComponentAppear(this.props.id);
    }

    this._appeared = true;
  },

  componentWillEnter: function (callback) {
    this._transition(callback, 'enter');
  },

  componentDidEnter: function () {
    if (this.props.onComponentEnter) {
      this.props.onComponentEnter(this.props.id);
    }
  },

  componentWillLeave: function (callback) {
    this._transition(callback, 'leave');
  },

  componentDidLeave: function () {
    if (this.props.onComponentLeave) this.props.onComponentLeave(this.props.id);
  },

  _computeNewStyle: function (phase) {
    var currentStyle;
    if (phase === 'appear') currentStyle = this.props.childrenAppearStyle;
    else if (phase === 'enter') currentStyle = this.props.childrenEnterStyle;
    else currentStyle = this.props.leaveStyle;

    var mergedStyle = merge(this.props.childrenBaseStyle, currentStyle);

    var styleStr = '';
    Object.keys(mergedStyle).forEach(function (key) {
      styleStr += hyphenateStyleName(key) + ':' + mergedStyle[key] + ';';
    });

    return styleStr;
  },

  _getTimeInMilliseconds: function (transitionPropValue) {
    var timeArray = transitionPropValue.split(',');
    var longestTime = 0;
    var factor;
    var re = /([0-9]*\.?[0-9]+)(m?s)/;
    var groups;

    for (var i = 0; i < timeArray.length; i++) {
      groups = timeArray[i].match(re);
      if (groups[2] === 's') factor = 1000;
      else factor = 1;
      longestTime = Math.max(parseFloat(groups[1]) * factor, longestTime);
    }

    return longestTime;
  },

  _getTransitionMaximumTime: function (transitionDuration, transitionDelay) {
    var maxDuration = this._getTimeInMilliseconds(transitionDuration);
    var maxDelay = this._getTimeInMilliseconds(transitionDelay);

    return maxDuration + maxDelay;
  },

  _registerCallbackTimeout: function (callback, maxTransitionTime) {
    this._callbackTimeout = setTimeout(function () {
      callback();
    }, maxTransitionTime);
  },

  _transition: function (callback, phase) {
    if ((phase === 'appear' && !this.props.childrenAppearStyle) ||
        (phase === 'enter' && !this.props.childrenEnterStyle) ||
        (phase === 'leave' && !this.props.leaveStyle)) {
      callback();
    }
    else {
      this._dispatchTimeout = setTimeout(
        this._executeTransition.bind(this, callback, phase),
        this._tick
      );
    }
  },

  _executeTransition: function (callback, phase) {
    var node = ReactDOM.findDOMNode(this);

    if (!node) return;

    node.setAttribute('style', this._computeNewStyle(phase));

    var maxTransitionTime = this._getTransitionMaximumTime(
      getComputedStyle(node).transitionDuration,
      getComputedStyle(node).transitionDelay
    );

    this._registerCallbackTimeout(callback, maxTransitionTime);
  },

  render: function () {
    var props = {style: this.props.childrenBaseStyle};
    return (

      React.cloneElement(this.props.children, props)
    );
  },

});

module.exports = TransitionContainer;