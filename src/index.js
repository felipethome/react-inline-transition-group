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
    onComponentAppeared: React.PropTypes.func,
    onComponentEntered: React.PropTypes.func,
    onComponentLeft: React.PropTypes.func,
    onComponentStartAppear: React.PropTypes.func,
    onComponentStartEnter: React.PropTypes.func,
    onComponentStartLeave: React.PropTypes.func,
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
              onComponentAppeared={this.props.onComponentAppeared}
              onComponentEntered={this.props.onComponentEntered}
              onComponentLeft={this.props.onComponentLeft}
              onComponentStartAppear={this.props.onComponentStartAppear}
              onComponentStartEnter={this.props.onComponentStartEnter}
              onComponentStartLeave={this.props.onComponentStartLeave}
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