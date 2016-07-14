var React = require('react');
var TransitionHooks = require('react-transition-hooks');
var TransitionChild = require('./TransitionChild');

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
    propertyName: React.PropTypes.string,
  },

  getDefaultProps: function () {
    return {
      component: 'div',
    };
  },

  render: function () {
    var {
      children,
      childrenAppearStyle,
      childrenBaseStyle,
      childrenEnterStyle,
      childrenLeaveStyle,
      component,
      onChildAppeared,
      onChildEntered,
      onChildLeft,
      onChildStartAppear,
      onChildStartEnter,
      onChildStartLeave,
      propertyName,
      ...others,
    } = this.props;

    return (
      <TransitionHooks component={component} {...others}>
        {React.Children.map(children, function (child, i) {
          return (
            <TransitionChild
              key={i}
              id={((child || {}).props || {}).id}
              childrenBaseStyle={childrenBaseStyle}
              childrenAppearStyle={childrenAppearStyle}
              childrenEnterStyle={childrenEnterStyle}
              childrenLeaveStyle={childrenLeaveStyle}
              onChildAppeared={onChildAppeared}
              onChildEntered={onChildEntered}
              onChildLeft={onChildLeft}
              onChildStartAppear={onChildStartAppear}
              onChildStartEnter={onChildStartEnter}
              onChildStartLeave={onChildStartLeave}
              propertyName={propertyName}
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