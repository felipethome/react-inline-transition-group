var React = require('react');
var merge = require('../utils/merge');

var FadeContainer = React.createClass({
  displayName: 'FadeContainer',

  propTypes: {
    afterStyles: React.PropTypes.object.isRequired,
    beforeStyles: React.PropTypes.object.isRequired,
    children: React.PropTypes.node,
    fadeOut: React.PropTypes.bool,
    id: React.PropTypes.string || React.PropTypes.number,
    onComponentAppear: React.PropTypes.func,
    onComponentEnter: React.PropTypes.func,
    onComponentLeave: React.PropTypes.func,
    style: React.PropTypes.object,
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
      transitionAppearDelay: 0,
      transitionAppearFunction: 'ease-out',
      transitionAppearTimeout: 0,
      transitionEnterDelay: 0,
      transitionEnterFunction: 'ease-out',
      transitionEnterTimeout: 0,
      transitionLeaveDelay: 0,
      transitionLeaveFunction: 'ease-out',
      transitionLeaveTimeout: 0,
    };
  },

  getInitialState: function () {
    return {
      phase: false,
    };
  },

  componentWillMount: function () {
    this._dispatchTimeout = null;
    this._lastTransition = null;
    this._timeoutStack = [];
    this._tick = 17;
  },

  componentWillUnmount: function () {
    clearTimeout(this._dispatchTimeout);

    this._timeoutStack.forEach(function (timeoutId) {
      clearTimeout(timeoutId);
    });
  },

  componentWillEnter: function (callback) {
    this._transition(
      callback,
      true,
      this.props.transitionEnterTimeout + this.props.transitionEnterDelay
    );
  },

  componentDidEnter: function () {
    if (this.props.onComponentEnter) {
      this.props.onComponentEnter(this.props.id);
    }
  },

  componentWillAppear: function (callback) {
    this._transition(
      callback,
      true,
      this.props.transitionAppearTimeout + this.props.transitionAppearDelay
    );
  },

  componentDidAppear: function () {
    if (this.props.onComponentAppear) {
      this.props.onComponentAppear(this.props.id);
    }

    this._appeared = true;
  },

  componentWillLeave: function (callback) {
    this._transition(
      callback,
      false,
      this.props.transitionLeaveTimeout + this.props.transitionLeaveDelay
    );
  },

  componentDidLeave: function () {
    if (this.props.onComponentLeave) this.props.onComponentLeave(this.props.id);
  },

  _transition: function (callback, phase, time) {
    var timeoutId = null;

    var timeOver = function () {
      clearTimeout(timeoutId);
      callback();
    };

    this._queueTransition(phase);

    if (time) {
      timeoutId = setTimeout(timeOver, time);
      this._timeoutStack.push(timeoutId);
    }
    else {
      callback();
    }
  },

  _queueTransition: function (value) {
    this._lastTransition = value;

    if (!this._dispatchTimeout) {
      this._dispatchTimeout = setTimeout(
        this._executeTransition,
        this._tick
      );
    }
  },

  _executeTransition: function () {
    this.setState({
      phase: this._lastTransition,
    }, function () {
      this._dispatchTimeout = null;
    });
  },

  _getTransitionParameters: function () {
    var transition = {};

    if (this.state.phase) {
      if (this._appeared) {
        transition.func = this.props.transitionEnterFunction;
        transition.duration = this.props.transitionEnterTimeout;
        transition.delay = this.props.transitionEnterDelay;
      }
      else {
        transition.func = this.props.transitionAppearFunction;
        transition.duration = this.props.transitionAppearTimeout;
        transition.delay = this.props.transitionAppearDelay;
      }
    }
    else {
      transition.func = this.props.transitionLeaveFunction;
      transition.duration = this.props.transitionLeaveTimeout;
      transition.delay = this.props.transitionLeaveDelay;
    }

    return transition;
  },

  _getCSSTransitionString: function () {
    var transition = this._getTransitionParameters();
    var transitionStr = '';

    if (transition.duration) {
      transitionStr = ((transition.delay) ? transition.delay + 'ms ' : '') +
        'all ' + transition.duration + 'ms ' + transition.func;
    }

    return transitionStr;
  },

  render: function () {
    var styles = {
      transition: {
        transition: this._getCSSTransitionString(),
      },
    };

    return (
      <div
        style={
          merge(
            styles.transition,
            this.props.beforeStyles,
            this.state.phase && this.props.afterStyles
          )
        }
      >
        {this.props.children}
      </div>
    );
  },

});

module.exports = FadeContainer;