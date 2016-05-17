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
    id: React.PropTypes.string || React.PropTypes.number,
    onComponentAppear: React.PropTypes.func,
    onComponentEnter: React.PropTypes.func,
    onComponentLeave: React.PropTypes.func,
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
              onComponentAppear={this.props.onComponentAppear}
              onComponentEnter={this.props.onComponentEnter}
              onComponentLeave={this.props.onComponentLeave}
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