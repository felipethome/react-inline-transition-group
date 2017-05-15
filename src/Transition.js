/**
 * Copyright (c) 2016, Felipe Thomé
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');
var TransitionHooks = require('react-transition-hooks');
var TransitionChild = require('./TransitionChild');

var Transition = createReactClass({
  displayName: 'Transition',

  propTypes: {
    children: PropTypes.node,
    childrenStyles: PropTypes.shape({
      base: PropTypes.object,
      appear: PropTypes.object,
      enter: PropTypes.object,
      leave: PropTypes.object,
    }),
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    onPhaseEnd: PropTypes.func,
    onPhaseStart: PropTypes.func,
  },

  getDefaultProps: function () {
    return {
      childrenStyles: {},
      component: 'div',
    };
  },

  render: function () { // eslint-disable-line
    var {
      children,
      childrenStyles,
      component,
      onPhaseEnd,
      onPhaseStart,
      ...others
    } = this.props;

    return (
      <TransitionHooks component={component} {...others}>
        {React.Children.map(children, function (child) {
          return (
            <TransitionChild
              id={((child || {}).props || {}).id}
              childrenBaseStyle={childrenStyles.base}
              childrenAppearStyle={childrenStyles.appear}
              childrenEnterStyle={childrenStyles.enter}
              childrenLeaveStyle={childrenStyles.leave}
              onChildAppeared={onPhaseEnd}
              onChildEntered={onPhaseEnd}
              onChildLeft={onPhaseEnd}
              onChildStartAppear={onPhaseStart}
              onChildStartEnter={onPhaseStart}
              onChildStartLeave={onPhaseStart}
              style={((child || {}).props || {}).style}
            >
              {child}
            </TransitionChild>
          );
        }, this)}
      </TransitionHooks>
    );
  },

});

module.exports = Transition;
