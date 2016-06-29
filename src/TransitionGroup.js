var React = require('react');
var makeCancelable = require('./makeCancelable');

var TransitionGroup = React.createClass({
  displayName: 'TransitionGroup',

  propTypes: {
    children: React.PropTypes.node,
    component: React.PropTypes.string,
  },

  getDefaultProps: function () {
    return {
      component: 'div',
    };
  },

  getInitialState: function () {
    return {
      children: this.props.children,
    };
  },

  componentWillMount: function () {
    this._callbacks = {};
    this._components = {};
  },

  componentDidMount: function () {
    React.Children.forEach(this.state.children, function (child) {
      this._performAppear(child.props.componentKey);
    }, this);
  },

  componentWillReceiveProps: function (nextProps) {
    var prevChildrenKeys = [];
    var nextChildrenKeys = [];
    var enteringChildren = [];
    var leavingChildren = [];

    React.Children.forEach(this.props.children, function (prevChild) {
      prevChildrenKeys.push(prevChild.props.componentKey);
    });

    React.Children.forEach(nextProps.children, function (nextChild) {
      nextChildrenKeys.push(nextChild.props.componentKey);
    });

    nextChildrenKeys.forEach(function (nextKey) {
      if (typeof prevChildrenKeys[nextKey] === 'undefined') {
        enteringChildren.push(nextKey);
      }
    });

    prevChildrenKeys.forEach(function (prevKey) {
      if (typeof nextChildrenKeys[prevKey] === 'undefined') {
        leavingChildren.push(prevKey);
      }
    });

    enteringChildren.forEach(function (childKey) {
      this._performEnter(childKey);
    }, this);

    leavingChildren.forEach(function (childKey) {
      this._performLeave(childKey);
    }, this);
  },

  _cancelCallback: function (key) {
    if (this._callbacks[key]) {
      this._callbacks[key].cancel();
      delete this._callbacks[key];
    }
  },

  _performAppear: function (key) {
    this._cancelCallback(key);

    var component = this._components[key];
    var callback = this._handleDoneAppearing(key);

    if (component.componentWillAppear) {
      this._callbacks[key] = callback;
      component.componentWillAppear(callback);
    }
    else {
      callback();
    }
  },

  _handleDoneAppearing: function (key) {
    var component = this._components[key];

    var callback = function () {
      this._cancelCallback(key);
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }
    };

    return makeCancelable(callback, this);
  },

  _performEnter: function (key) {
    this._cancelCallback(key);

    var component = this._components[key];
    var callback = this._handleDoneEntering(key);

    if (component.componentWillEnter) {
      this._callbacks[key] = callback;
      component.componentWillEnter(callback);
    }
    else {
      callback();
    }
  },

  _handleDoneEntering: function (key) {
    var component = this._components[key];

    var callback = function () {
      this._cancelCallback(key);
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }
    };

    return makeCancelable(callback, this);
  },

  _performLeave: function (key) {
    this._cancelCallback(key);

    var component = this._components[key];
    var callback = this._handleDoneLeaving(key);

    if (component.componentWillLeave) {
      this._callbacks[key] = callback;
      component.componentWillAppear(callback);
    }
    else {
      callback();
    }
  },

  _handleDoneLeaving: function (key) {
    var component = this._components[key];

    var callback = function () {
      this.setState(function (previousState) {
        var newChildren = Object.assign({}, previousState.children);
        delete newChildren[key];

        return {
          children: newChildren,
        };
      }, function () {
        this._cancelCallback(key);
        if (component.componentDidLeave) {
          component.componentDidLeave();
        }
      });
    };

    return makeCancelable(callback, this);
  },

  _storeComponent: function (key, component) {
    if (component) {
      this._components[key] = component;
    }
    else {
      delete this._components[key];
    }
  },

  render: function () {
    var props = Object.assign({}, this.props);
    delete props.childrenAppearStyle;
    delete props.childrenBaseStyle;
    delete props.childrenEnterStyle;
    delete props.childrenLeaveStyle;
    delete props.component;
    delete props.onChildAppeared;
    delete props.onChildEntered;
    delete props.onChildLeft;
    delete props.onChildStartAppear;
    delete props.onChildStartEnter;
    delete props.onChildStartLeave;

    var children = React.Children.map(this.state.children, function (child) {
      return React.cloneElement(
        child, {ref: this._storeComponent.bind(this, child.props.componentKey)}
      );
    }, this);

    return React.createElement(
      this.props.component, props, children
    );
  },

});

module.exports = TransitionGroup;