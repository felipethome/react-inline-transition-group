var React = require('react');
var ReactTransitionGroup = require('react-addons-transition-group');
var TransitionContainer = require('./transition-container');

var Transition = React.createClass({
  displayName: 'Transition',

  propTypes: {
    appearStyle: React.PropTypes.object,
    baseStyle: React.PropTypes.object,
    children: React.PropTypes.node,
    component: React.PropTypes.string,
    enterStyle: React.PropTypes.object,
    leaveStyle: React.PropTypes.object,
    id: React.PropTypes.string || React.PropTypes.number,
    onComponentAppear: React.PropTypes.func,
    onComponentEnter: React.PropTypes.func,
    onComponentLeave: React.PropTypes.func,
  },

  getDefaultProps: function () {
    return {
      component: 'div',
    };
  },

  render: function () {
    return (
      <ReactTransitionGroup component={this.props.component}>
        {React.Children.map(this.props.children, function (child, i) {
          return (
            <TransitionContainer
              key={i}
              id={((child || {}).props || {}).id}
              baseStyle={this.props.baseStyle}
              appearStyle={this.props.appearStyle}
              enterStyle={this.props.enterStyle}
              leaveStyle={this.props.leaveStyle}
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