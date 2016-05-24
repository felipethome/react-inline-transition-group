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
    style: React.PropTypes.object,
  },

  getDefaultProps: function () {
    return {
      component: 'div',
    };
  },

  render: function () {
    return (
      <ReactTransitionGroup
        component={this.props.component}
        style={this.props.style}
      >
        {React.Children.map(this.props.children, function (child, i) {
          return (
            <TransitionContainer
              key={i}
              id={((child || {}).props || {}).id}
              childrenBaseStyle={this.props.childrenBaseStyle}
              childrenAppearStyle={this.props.childrenAppearStyle}
              childrenEnterStyle={this.props.childrenEnterStyle}
              childrenLeaveStyle={this.props.childrenLeaveStyle}
              onChildAppeared={this.props.onChildAppeared}
              onChildEntered={this.props.onChildEntered}
              onChildLeft={this.props.onChildLeft}
              onChildStartAppear={this.props.onChildStartAppear}
              onChildStartEnter={this.props.onChildStartEnter}
              onChildStartLeave={this.props.onChildStartLeave}
            >
              {child}
            </TransitionContainer>
          );
        }, this)}
      </ReactTransitionGroup>
    );
  },

});

module.exports = Transition;