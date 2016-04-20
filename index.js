var React = require('react');
var ReactTransitionGroup = require('react-addons-transition-group');
var TransitionContainer = require('./transition-container');

var Transition = React.createClass({
  displayName: 'Transition',

  propTypes: {
    afterStyles: React.PropTypes.object.isRequired,
    beforeStyles: React.PropTypes.object.isRequired,
    children: React.PropTypes.node,
    component: React.PropTypes.string,
    onComponentAppear: React.PropTypes.func,
    onComponentEnter: React.PropTypes.func,
    onComponentLeave: React.PropTypes.func,
    transitionAppearDelay: React.PropTypes.number,
    transitionAppearFunction: React.PropTypes.string,
    transitionAppearTimeout: React.PropTypes.number,
    transitionEnterDelay: React.PropTypes.number,
    transitionEnterFunction: React.PropTypes.string,
    transitionEnterTimeout: React.PropTypes.number,
    transitionLeaveDelay: React.PropTypes.number,
    transitionLeaveFunction: React.PropTypes.string,
    transitionLeaveTimeout: React.PropTypes.number,
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
              afterStyles={this.props.afterStyles}
              beforeStyles={this.props.beforeStyles}
              component={this.props.component}
              onComponentAppear={this.props.onComponentAppear}
              onComponentEnter={this.props.onComponentEnter}
              onComponentLeave={this.props.onComponentLeave}
              transitionAppearDelay={this.props.transitionAppearDelay}
              transitionAppearFunction={this.props.transitionAppearFunction}
              transitionAppearTimeout={this.props.transitionAppearTimeout}
              transitionEnterDelay={this.props.transitionEnterDelay}
              transitionEnterFunction={this.props.transitionEnterFunction}
              transitionEnterTimeout={this.props.transitionEnterTimeout}
              transitionLeaveDelay={this.props.transitionLeaveDelay}
              transitionLeaveFunction={this.props.transitionLeaveFunction}
              transitionLeaveTimeout={this.props.transitionLeaveTimeout}
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