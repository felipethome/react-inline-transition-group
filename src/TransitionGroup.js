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
      this._performAppear(child.props.componentKey);
    }, this);
  },

  componentWillReceiveProps: function (nextProps) {
    var currentChildren = {};
    var nextChildren = {};
    var leavingChildren = {};

    this.state.children.forEach(function (prevChild) {
      currentChildren[prevChild.props.componentKey] = prevChild;
    });

    React.Children.toArray(nextProps.children).forEach(function (nextChild) {
      nextChildren[nextChild.props.componentKey] = nextChild;
    });

    // Assuming that Object.keys() return the properties in the oder they were
    // inserted
    Object.keys(nextChildren).forEach(function (key, i) {
      if (typeof currentChildren[key] === 'undefined') {
        // In case the child was leaving, but now is entering
        if (this._prevLeavingChildren[key]) {
          delete this._prevLeavingChildren;
        }

        this._performEnter({
          key: key,
          index: i,
          instance: nextChildren[key],
        });
      }
    }, this);

    var currentChildrenKeys = Object.keys(currentChildren);
    for (var i = currentChildrenKeys.length - 1; i >= 0; i--) {
      var key = currentChildrenKeys[i];

      if (typeof nextChildren[key] === 'undefined') {
        if (!this._prevLeavingChildren || !this._prevLeavingChildren[key]) {
          this._performLeave({
            key: key,
            index: i,
          });
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

  _performEnter: function (childInfo) {
    this._cancelCallback(childInfo.key);

    this.setState(function (previousState) {
      var newChildren = previousState.children.slice();
      newChildren.splice(childInfo.index, 0, childInfo.instance);

      return {
        children: newChildren,
      };
    }, function () {
      var component = this._components[childInfo.key];
      var callback = this._handleDoneEntering(childInfo.key);

      if (component.componentWillEnter) {
        this._callbacks[childInfo.key] = callback;
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

  _performLeave: function (childInfo) {
    this._cancelCallback(childInfo.key);

    var component = this._components[childInfo.key];
    var callback = this._handleDoneLeaving(childInfo);

    if (component.componentWillLeave) {
      this._callbacks[childInfo.key] = callback;
      component.componentWillLeave(callback);
    }
    else {
      callback();
    }
  },

  _handleDoneLeaving: function (childInfo) {
    var component = this._components[childInfo.key];

    var callback = function () {
      delete this._prevLeavingChildren[childInfo.key];
      this._cancelCallback(childInfo.key);

      this.setState(function (previousState) {
        var newChildren = previousState.children.slice();
        newChildren.splice(childInfo.index, 1);

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
        child, {ref: this._storeComponent.bind(this, child.props.componentKey)}
      );
    }, this);

    return React.createElement(
      this.props.component, filteredProps, children
    );
  },

});

module.exports = TransitionGroup;