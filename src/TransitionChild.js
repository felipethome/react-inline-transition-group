var React = require('react');
var ReactDOM = require('react-dom');
var hyphenateStyleName = require('fbjs/lib/hyphenateStyleName');

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
  },

  componentWillMount: function () {
    this._callbackTimeout = null;
  },

  componentDidMount: function () {
    var node = ReactDOM.findDOMNode(this);
    if (!node) return;

    node.setAttribute('style', this._computeNewStyle());

    // Flush styles
    this.flush = node.offsetWidth;
  },

  componentWillUnmount: function () {
    clearTimeout(this._callbackTimeout);
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

    this._appeared = true;
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

  _computeNewStyle: function (phase) {
    var currentStyle;
    if (phase === 'appear') currentStyle = this.props.childrenAppearStyle;
    else if (phase === 'enter') currentStyle = this.props.childrenEnterStyle;
    else if (phase === 'leave') currentStyle = this.props.childrenLeaveStyle;
    else currentStyle = this.props.childrenBaseStyle;

    var mergedStyle = phase
      ? Object.assign({}, this.props.childrenBaseStyle, currentStyle)
      : currentStyle;

    var styleStr = '';
    Object.keys(mergedStyle).forEach(function (key) {
      styleStr += hyphenateStyleName(key) + ':' + mergedStyle[key] + ';';
    });

    return styleStr;
  },

  _transition: function (callback, phase) {
    if ((phase === 'appear' && !this.props.childrenAppearStyle) ||
        (phase === 'enter' && !this.props.childrenEnterStyle) ||
        (phase === 'leave' && !this.props.childrenLeaveStyle)) {
      callback();
    }
    else {
      this._executeTransition.call(this, callback, phase);
    }
  },

  _executeTransition: function (callback, phase) {
    this._lastCallback = callback;

    var node = ReactDOM.findDOMNode(this);
    if (!node) return;

    node.removeEventListener('transitionend', this._lastCallback);
    node.addEventListener('transitionend', callback);

    node.setAttribute('style', this._computeNewStyle(phase));

    // Flush styles
    this.flush = node.offsetWidth;
  },

  render: function () {
    return React.Children.only(this.props.children);
  },

});

module.exports = TransitionChild;