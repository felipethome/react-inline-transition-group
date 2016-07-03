/* eslint-disable react/no-multi-comp, react/prop-types */

var React = require('react');
var ReactDOM = require('react-dom');
var TransitionGroup = require('../TransitionGroup');

jest.unmock('../TransitionGroup');

describe('TransitionGroup', function () {

  it('should handle appear/leave/enter correctly', function () {
    var log = [];

    var Child = React.createClass({
      componentDidMount: function () {
        log.push('didMount');
      },
      componentWillUnmount: function () {
        log.push('willUnmount');
      },
      componentWillAppear: function (cb) {
        log.push('willAppear');
        cb();
      },
      componentDidAppear: function () {
        log.push('didAppear');
      },
      componentWillEnter: function (cb) {
        log.push('willEnter');
        cb();
      },
      componentDidEnter: function () {
        log.push('didEnter');
      },
      componentWillLeave: function (cb) {
        log.push('willLeave');
        cb();
      },
      componentDidLeave: function () {
        log.push('didLeave');
      },
      render: function () {
        return <span />;
      },
    });

    var Component = React.createClass({
      getInitialState: function () {
        return {count: 1};
      },
      render: function () {
        var children = [];
        for (var i = 0; i < this.state.count; i++) {
          children.push(<Child key={i} />);
        }
        return <TransitionGroup>{children}</TransitionGroup>;
      },
    });

    var container = document.createElement('div');
    var instance = ReactDOM.render(<Component />, container);

    expect(log).toEqual(['didMount', 'willAppear', 'didAppear']);

    log = [];
    instance.setState({count: 0});
    expect(log).toEqual(['willLeave', 'willUnmount', 'didLeave']);

    log = [];
    instance.setState({count: 1});
    expect(log).toEqual(['didMount', 'willEnter', 'didEnter']);
  });

  it('should handle appear/enter/leave correctly', function () {
    var log = [];

    var Child = React.createClass({
      componentDidMount: function () {
        log.push('didMount');
      },
      componentWillUnmount: function () {
        log.push('willUnmount');
      },
      componentWillAppear: function (cb) {
        log.push('willAppear');
        cb();
      },
      componentDidAppear: function () {
        log.push('didAppear');
      },
      componentWillEnter: function (cb) {
        log.push('willEnter');
        cb();
      },
      componentDidEnter: function () {
        log.push('didEnter');
      },
      componentWillLeave: function (cb) {
        log.push('willLeave');
        cb();
      },
      componentDidLeave: function () {
        log.push('didLeave');
      },
      render: function () {
        return <span />;
      },
    });

    var Component = React.createClass({
      getInitialState: function () {
        return {count: 1};
      },
      render: function () {
        var children = [];
        for (var i = 0; i < this.state.count; i++) {
          children.push(<Child key={i} />);
        }
        return <TransitionGroup>{children}</TransitionGroup>;
      },
    });

    var container = document.createElement('div');
    var instance = ReactDOM.render(<Component />, container);

    expect(log).toEqual(['didMount', 'willAppear', 'didAppear']);

    log = [];
    instance.setState({count: 2});
    expect(log).toEqual(['didMount', 'willEnter', 'didEnter']);

    log = [];
    instance.setState({count: 1});
    expect(log).toEqual(['willLeave', 'willUnmount', 'didLeave']);
  });

  it('should handle enter/leave/enter/leave correctly', function () {
    var log = [];
    var willEnterCb;

    var Child = React.createClass({
      componentDidMount: function () {
        log.push('didMount');
      },
      componentWillUnmount: function () {
        log.push('willUnmount');
      },
      componentWillEnter: function (cb) {
        log.push('willEnter');
        willEnterCb = cb;
      },
      componentDidEnter: function () {
        log.push('didEnter');
      },
      componentWillLeave: function (cb) {
        log.push('willLeave');
        cb();
      },
      componentDidLeave: function () {
        log.push('didLeave');
      },
      render: function () {
        return <span />;
      },
    });

    var Component = React.createClass({
      getInitialState: function () {
        return {count: 1};
      },
      render: function () {
        var children = [];
        for (var i = 0; i < this.state.count; i++) {
          children.push(<Child key={i} />);
        }
        return <TransitionGroup>{children}</TransitionGroup>;
      },
    });

    var container = document.createElement('div');
    var instance = ReactDOM.render(<Component />, container);

    expect(log).toEqual(['didMount']);
    instance.setState({count: 2});
    expect(log).toEqual(['didMount', 'didMount', 'willEnter']);

    // Animations must not be blocked
    log = [];
    instance.setState({count: 1});
    expect(log).toEqual(['willLeave', 'willUnmount', 'didLeave']);

    // This callback must be canceled and therefore not produce any effect
    willEnterCb();
    expect(log).toEqual(['willLeave', 'willUnmount', 'didLeave']);

  });

  it('should handle enter/leave/enter correctly', function () {
    var log = [];
    var willEnterCb;

    var Child = React.createClass({
      componentDidMount: function () {
        log.push('didMount');
      },
      componentWillUnmount: function () {
        log.push('willUnmount');
      },
      componentWillEnter: function (cb) {
        log.push('willEnter');
        willEnterCb = cb;
      },
      componentDidEnter: function () {
        log.push('didEnter');
      },
      componentWillLeave: function (cb) {
        log.push('willLeave');
        cb();
      },
      componentDidLeave: function () {
        log.push('didLeave');
      },
      render: function () {
        return <span />;
      },
    });

    var Component = React.createClass({
      getInitialState: function () {
        return {count: 1};
      },
      render: function () {
        var children = [];
        for (var i = 0; i < this.state.count; i++) {
          children.push(<Child key={i} />);
        }
        return <TransitionGroup>{children}</TransitionGroup>;
      },
    });

    var container = document.createElement('div');
    var instance = ReactDOM.render(<Component />, container);

    expect(log).toEqual(['didMount']);

    instance.setState({count: 2});
    expect(log).toEqual(['didMount', 'didMount', 'willEnter']);

    log = [];
    instance.setState({count: 1});
    expect(log).toEqual(['willLeave', 'willUnmount', 'didLeave']);

    log = [];
    instance.setState({count: 2});
    willEnterCb();
    expect(log).toEqual(['didMount', 'willEnter', 'didEnter']);
  });

  it('should handle entering/leaving several elements at once', function () {
    var log = [];

    var Child = React.createClass({
      componentDidMount: function () {
        log.push('didMount' + this.props.id);
      },
      componentWillUnmount: function () {
        log.push('willUnmount' + this.props.id);
      },
      componentWillEnter: function (cb) {
        log.push('willEnter' + this.props.id);
        cb();
      },
      componentDidEnter: function () {
        log.push('didEnter' + this.props.id);
      },
      componentWillLeave: function (cb) {
        log.push('willLeave' + this.props.id);
        cb();
      },
      componentDidLeave: function () {
        log.push('didLeave' + this.props.id);
      },
      render: function () {
        return <span />;
      },
    });

    var Component = React.createClass({
      getInitialState: function () {
        return {count: 1};
      },
      render: function () {
        var children = [];
        for (var i = 0; i < this.state.count; i++) {
          children.push(<Child key={i} id={i} />);
        }
        return <TransitionGroup>{children}</TransitionGroup>;
      },
    });

    var container = document.createElement('div');
    var instance = ReactDOM.render(<Component />, container);

    expect(log).toEqual(['didMount0']);

    log = [];
    instance.setState({count: 3});
    expect(log).toEqual([
      'didMount1', 'didMount2',
      'willEnter1', 'didEnter1',
      'willEnter2', 'didEnter2',
    ]);

    log = [];
    instance.setState({count: 0});
    expect(log).toEqual([
      'willLeave2', 'willLeave1', 'willLeave0',
      'willUnmount0', 'willUnmount1', 'willUnmount2',
      'didLeave2', 'didLeave1', 'didLeave0',
    ]);
  });

});