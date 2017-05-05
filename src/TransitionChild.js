/**
 * Copyright (c) 2016, Felipe Thomé
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');
var Animation = require('./Animation');
var TransitionInfo = require('./TransitionInfo');
var TransitionParser = require('./TransitionParser');
var shallowEqual = require('./shallowEqual');

var TransitionChild = createReactClass({
  displayName: 'TransitionChild',

  propTypes: {
    children: PropTypes.any,
    childrenAppearStyle: PropTypes.object,
    childrenBaseStyle: PropTypes.object,
    childrenEnterStyle: PropTypes.object,
    childrenLeaveStyle: PropTypes.object,
    id: PropTypes.oneOfType(
      [PropTypes.string, PropTypes.number]
    ),
    onChildAppeared: PropTypes.func,
    onChildEntered: PropTypes.func,
    onChildLeft: PropTypes.func,
    onChildStartAppear: PropTypes.func,
    onChildStartEnter: PropTypes.func,
    onChildStartLeave: PropTypes.func,
    style: PropTypes.object,
  },

  getInitialState: function () {
    return {
      style: this._computeNewStyle(),
    };
  },

  componentDidMount: function () {
    this._frameIds = [];
  },

  componentWillReceiveProps: function (nextProps) {
    var oldBaseStyle = this.props.childrenBaseStyle;
    var newBaseStyle = nextProps.childrenBaseStyle;
    var oldPropsStyle = this.props.style;
    var newPropsStyle = nextProps.style;
    var oldPhaseStyle;
    var newPhaseStyle;

    switch(this._phase) {
      case 'appear':
        oldPhaseStyle = this.props.childrenAppearStyle;
        newPhaseStyle = nextProps.childrenAppearStyle;
        break;
      case 'enter':
        oldPhaseStyle = this.props.childrenEnterStyle;
        newPhaseStyle = nextProps.childrenEnterStyle;
        break;
      case 'leave':
        oldPhaseStyle = this.props.childrenLeaveStyle;
        newPhaseStyle = nextProps.childrenLeaveStyle;
        break;
    }

    if (!shallowEqual(oldBaseStyle, newBaseStyle) ||
        !shallowEqual(oldPropsStyle, newPropsStyle) ||
        !shallowEqual(oldPhaseStyle, newPhaseStyle)) {
      this.setState({
        style: Object.assign({}, newBaseStyle, newPhaseStyle, newPropsStyle),
      });
    }
  },

  componentWillUnmount: function () {
    var node = ReactDOM.findDOMNode(this);
    if (!node) return;

    node.removeEventListener('transitionend', this._handleReference);

    Animation.cancelFrames(this._frameIds);
  },

  componentWillAppear: function (callback) {
    if (this.props.onChildStartAppear) {
      this.props.onChildStartAppear('appear', this.props.id);
    }

    this._transition(callback, 'appear');
  },

  componentDidAppear: function () {
    if (this.props.onChildAppeared) {
      this.props.onChildAppeared('appear', this.props.id);
    }
  },

  componentWillEnter: function (callback) {
    if (this.props.onChildStartEnter) {
      this.props.onChildStartEnter('enter', this.props.id);
    }

    this._transition(callback, 'enter');
  },

  componentDidEnter: function () {
    if (this.props.onChildEntered) {
      this.props.onChildEntered('enter', this.props.id);
    }
  },

  componentWillLeave: function (callback) {
    if (this.props.onChildStartLeave) {
      this.props.onChildStartLeave('leave', this.props.id);
    }

    this._transition(callback, 'leave');
  },

  componentDidLeave: function () {
    if (this.props.onChildLeft) {
      this.props.onChildLeft('leave', this.props.id);
    }
  },

  _handleTransitionEnd: function (
    node, maxTimeProperty, propertyArray, callback, event
  ) {
    // Check if the element where the transitionend event occurred was the
    // node we are working with and not one of its children.
    if (node === event.target) {
      // TODO: Instead of this huge and ugly if statement expand the shorthand
      // properties and bind the expansion to the handler.
      if (maxTimeProperty === event.propertyName ||
          TransitionInfo.isShorthandEqualProperty(
            maxTimeProperty, event.propertyName, propertyArray
          ) ||
          maxTimeProperty === 'all' && !TransitionInfo.isInPropertyList(
            event.propertyName, propertyArray
          )) {
        node.removeEventListener('transitionend', this._handleReference);
        callback();
      }
    }
  },

  _computeNewStyle: function (phase) {
    var phaseStyle;

    if (phase === 'appear') phaseStyle = this.props.childrenAppearStyle;
    else if (phase === 'enter') phaseStyle = this.props.childrenEnterStyle;
    else if (phase === 'leave') phaseStyle = this.props.childrenLeaveStyle;

    return Object.assign(
      {}, this.props.childrenBaseStyle, phaseStyle, this.props.style
    );
  },

  _transition: function (callback, phase) {
    if ((phase === 'appear' && !this.props.childrenAppearStyle) ||
        (phase === 'enter' && !this.props.childrenEnterStyle) ||
        (phase === 'leave' && !this.props.childrenLeaveStyle)) {
      callback();
    }
    else {
      var frameId = Animation.requestNextFrame((function () {
        this._executeTransition(callback, phase);
      }).bind(this));
      this._frameIds.push(frameId);
    }
  },

  _executeTransition: function (callback, phase) {
    var node = ReactDOM.findDOMNode(this);
    if (!node) return;

    var nextStyle = this._computeNewStyle(phase);
    var transitionValues = TransitionParser.getTransitionValues(nextStyle);

    var maxTimeProperty = TransitionInfo.getMaximumTimeProperty(
      transitionValues
    );

    node.removeEventListener('transitionend', this._handleReference);

    if (maxTimeProperty) {
      // To guarantee the transitionend event of another phase will not
      // interfere with the handler of the current phase create a new one
      // every time.
      this._handleReference = this._handleTransitionEnd.bind(
        this,
        node,
        maxTimeProperty,
        transitionValues.transitionProperty,
        callback
      );
      node.addEventListener('transitionend', this._handleReference);
    }
    else {
      callback();
    }

    // Using setAttribute() or the functions in CSSPropertyOperations would
    // probably be faster, but stateless components are not working well with
    // this approach.
    this.setState({style: nextStyle});

    this._phase = phase;
  },

  render: function () {
    return React.Children.only(
      React.cloneElement(this.props.children, {
        style: this.state.style,
      })
    );
  },

});

module.exports = TransitionChild;
