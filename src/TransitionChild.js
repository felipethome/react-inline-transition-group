var React = require('react');
var ReactDOM = require('react-dom');
var Animation = require('./Animation');
var TransitionInfo = require('./TransitionInfo');
var TransitionParser = require('./TransitionParser');

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
    style: React.PropTypes.object,
  },

  getInitialState: function () {
    return {
      style: this._computeNewStyle(),
    };
  },

  componentDidMount: function () {
    this._frameIds = [];
  },

  componentWillUnmount: function () {
    var node = ReactDOM.findDOMNode(this);
    if (!node) return;

    node.removeEventListener('transitionend', this._handleReference);

    Animation.cancelFrames(this._frameIds);
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

  _handleTransitionEnd: function (
    node, maxTimeProperty, propertyArray, callback, event
  ) {
    // Check if the element where the transitionend event occurred was the
    // node we are working with and not one of its children.
    if (node === event.target) {
      // TODO: Instead of this huge and ugly if statement expand the shorthand
      // properties and bind the expansion to the handler.
      if (maxTimeProperty === event.propertyName ||
          TransitionInfo.isShorthand(
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
    var nextStyle;

    if (phase === 'appear') nextStyle = this.props.childrenAppearStyle;
    else if (phase === 'enter') nextStyle = this.props.childrenEnterStyle;
    else if (phase === 'leave') nextStyle = this.props.childrenLeaveStyle;
    else nextStyle = this.props.childrenBaseStyle;

    return Object.assign(
      {}, this.props.childrenBaseStyle, nextStyle, this.props.style
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
      // To guarantee the transitionend handler of another phase will not
      // interfere with the handler of the current phase create a new one every
      // time.
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