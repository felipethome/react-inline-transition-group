var React = require('react');
var ReactDOM = require('react-dom');
var CSSPropertyOperations = require('react/lib/CSSPropertyOperations');
var Animation = require('./Animation');

var TransitionChild = React.createClass({
  displayName: 'TransitionChild',

  propTypes: {
    children: React.PropTypes.any,
    childrenAppearStyle: React.PropTypes.object,
    childrenBaseStyle: React.PropTypes.object,
    childrenEnterStyle: React.PropTypes.object,
    childrenLeaveStyle: React.PropTypes.object,
    id: React.PropTypes.oneOfType(
      [React.PropTypes.string, React.PropTypes.number]
    ),
    onChildAppeared: React.PropTypes.func,
    onChildEntered: React.PropTypes.func,
    onChildLeft: React.PropTypes.func,
    onChildStartAppear: React.PropTypes.func,
    onChildStartEnter: React.PropTypes.func,
    onChildStartLeave: React.PropTypes.func,
    propertyName: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  componentWillMount: function () {
    this._Animation = new Animation();
  },

  componentDidMount: function () {
    var node = ReactDOM.findDOMNode(this);
    if (!node) return;

    node.setAttribute('style', this._computeNewStyle());
  },

  componentWillUnmount: function () {
    this._Animation.cancelAllFrames();
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

    properties.transitionDuration = computedStyle.transitionDuration ||
      computedStyle.WebkitTransitionDuration ||
      computedStyle.MozTransitionDuration ||
      computedStyle.msTransitionDuration;

    properties.transitionDelay = computedStyle.transitionDelay ||
      computedStyle.WebkitTransitionDelay ||
      computedStyle.MozTransitionDelay ||
      computedStyle.msTransitionDelay;

    properties.transitionProperty = computedStyle.transitionProperty ||
      computedStyle.WebkitTransitionProperty ||
      computedStyle.msTransitionProperty ||
      computedStyle.MozTransitionProperty;

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
      durationGroups = (durationArray[i] || '0s').match(re);
      if (durationGroups[2] === 's') durationFactor = 1000;
      else durationFactor = 1;

      delayGroups = (delayArray[i] || '0s').match(re);
      if (delayGroups[2] === 's') delayFactor = 1000;
      else delayFactor = 1;

      longestTime = Math.max(
        parseFloat(
          (durationGroups[1] * durationFactor) + (delayGroups[1] * delayFactor)
        ),
        longestTime
      );
    }

    return longestTime;
  },

  _handleTransitionEnd: function (node, maxTime, callback, event) {
    if (maxTime && maxTime >= event.elapsedTime * 1000) {
      node.removeEventListener('transitionend', this.handleRef);
      callback();
    }
    else if (this.props.propertyName === event.propertyName) {
      node.removeEventListener('transitionend', this.handleRef);
      callback();
    }
  },

  _computeNewStyle: function (phase) {
    var currentStyle;
    if (phase === 'appear') currentStyle = this.props.childrenAppearStyle;
    else if (phase === 'enter') currentStyle = this.props.childrenEnterStyle;
    else if (phase === 'leave') currentStyle = this.props.childrenLeaveStyle;
    else currentStyle = this.props.childrenBaseStyle;

    var mergedStyle = Object.assign(
      {}, this.props.style, this.props.childrenBaseStyle, currentStyle
    );

    return CSSPropertyOperations.createMarkupForStyles(mergedStyle);
  },

  _transition: function (callback, phase) {
    if ((phase === 'appear' && !this.props.childrenAppearStyle) ||
        (phase === 'enter' && !this.props.childrenEnterStyle) ||
        (phase === 'leave' && !this.props.childrenLeaveStyle)) {
      callback();
    }
    else {
      var component = this;
      this._Animation.requestNextFrame(function () {
        component._executeTransition(callback, phase);
      });
    }
  },

  _executeTransition: function (callback, phase) {
    var node = ReactDOM.findDOMNode(this);
    if (!node) return;

    node.setAttribute('style', this._computeNewStyle(phase));

    var properties;
    var maxTransitionTime;
    if (this.props.propertyName === undefined) {
      // This block will make the styles calculation synchronous
      properties = this._getTransitionProperties(getComputedStyle(node));
      maxTransitionTime = this._getTransitionMaximumTime(
        properties.transitionProperty,
        properties.transitionDuration,
        properties.transitionDelay
      );
    }

    node.removeEventListener('transitionend', this.handleRef);
    this.handleRef = this._handleTransitionEnd.bind(
      this, node, maxTransitionTime, callback
    );
    node.addEventListener('transitionend', this.handleRef);
  },

  render: function () {
    return React.Children.only(this.props.children);
  },

});

module.exports = TransitionChild;