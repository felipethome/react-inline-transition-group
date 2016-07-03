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
      // React.Children.toArray will return an array with the keys
      children: React.Children.toArray(this.props.children),
    };
  },

  componentWillMount: function () {
    this._callbacks = {};
    this._components = {};
  },

  componentDidMount: function () {
    this.state.children.forEach(function (child) {
      this._performAppear(child.key);
    }, this);
  },

  componentWillReceiveProps: function (nextProps) {
    var currentChildren = {};
    var nextChildren = {};
    var leavingChildren = {};

    this.state.children.forEach(function (prevChild) {
      currentChildren[prevChild.key] = prevChild;
    });

    React.Children.toArray(nextProps.children).forEach(function (nextChild) {
      nextChildren[nextChild.key] = nextChild;
    });

    Object.keys(nextChildren).forEach(function (key, i) {
      if (typeof currentChildren[key] === 'undefined') {
        // In case the child was leaving, but now is entering
        if (this._prevLeavingChildren && this._prevLeavingChildren[key]) {
          delete this._prevLeavingChildren;
        }

        this._performEnter(key, i, nextChildren[key]);
      }
    }, this);

    var currentChildrenKeys = Object.keys(currentChildren);
    for (var i = currentChildrenKeys.length - 1; i >= 0; i--) {
      var key = currentChildrenKeys[i];

      if (typeof nextChildren[key] === 'undefined') {
        if (!this._prevLeavingChildren || !this._prevLeavingChildren[key]) {
          this._performLeave(key, i);
        }

        leavingChildren[key] = true;
      }
    }

    // Since the child removal will be postponed we need this variable to
    // guarantee we are not trying to remove a child that is already in the
    // process of being removed
    this._prevLeavingChildren = leavingChildren;
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

  _performEnter: function (key, position, instance) {
    this._cancelCallback(key);

    this.setState(function (previousState) {
      var newChildren = previousState.children.slice();
      newChildren.splice(position, 0, instance);

      return {
        children: newChildren,
      };
    }, function () {
      var component = this._components[key];
      var callback = this._handleDoneEntering(key);

      if (component.componentWillEnter) {
        this._callbacks[key] = callback;
        component.componentWillEnter(callback);
      }
      else {
        callback();
      }
    });
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

  _performLeave: function (key, position) {
    this._cancelCallback(key);

    var component = this._components[key];
    var callback = this._handleDoneLeaving(key, position);

    if (component.componentWillLeave) {
      this._callbacks[key] = callback;
      component.componentWillLeave(callback);
    }
    else {
      callback();
    }
  },

  _handleDoneLeaving: function (key, position) {
    var component = this._components[key];

    var callback = function () {
      if (this._prevLeavingChildren && this._prevLeavingChildren[key]) {
        delete this._prevLeavingChildren[key];
      }
      this._cancelCallback(key);

      this.setState(function (previousState) {
        var newChildren = previousState.children.slice();
        newChildren.splice(position, 1);

        return {
          children: newChildren,
        };
      }, function () {
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
    var filteredProps = Object.assign({}, this.props);
    delete filteredProps.component;

    var children = this.state.children.map(function (child) {
      return React.cloneElement(
        child, {ref: this._storeComponent.bind(this, child.key)}
      );
    }, this);

    return React.createElement(
      this.props.component, filteredProps, children
    );
  },

});

module.exports = TransitionGroup;