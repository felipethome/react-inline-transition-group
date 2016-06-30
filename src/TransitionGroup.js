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
    var enteringChildren = [];
    var leavingChildren = [];

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
        enteringChildren.push({
          key: key,
          index: i,
          instance: nextChildren[key],
        });
      }
    });

    Object.keys(currentChildren).forEach(function (key, i) {
      if (typeof nextChildren[key] === 'undefined') {
        leavingChildren.push({
          key: key,
          index: i,
        });
      }
    });

    enteringChildren.forEach(function (childInfo) {
      this._performEnter(childInfo);
    }, this);

    leavingChildren.forEach(function (childInfo) {
      if (!this._prevChildren || !this._prevChildren[childInfo.key]) {
        this._performLeave(childInfo);
      }
    }, this);

    // Since the child removal will be postponed we need this variable to
    // guarantee we are not trying to remove a child that is already in the
    // process of being removed
    this._prevChildren = currentChildren;
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

    var newChildren = this.state.children.slice();
    newChildren.splice(childInfo.index, 0, childInfo.instance);

    this.setState({
      children: newChildren,
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

    var children = this.state.children.map(function (child) {
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