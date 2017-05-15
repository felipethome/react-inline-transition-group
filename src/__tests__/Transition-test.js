/* eslint-disable react/no-multi-comp, max-len, react/display-name */

var React;
var ReactDOM;
var createReactClass;
var Transition;
var installMockRAF;
var TransitionEvent;

describe('Transition', function () {
  var container;

  beforeEach(function () {
    jest.resetModuleRegistry();

    React = require('react');
    ReactDOM = require('react-dom');
    createReactClass = require('create-react-class');
    Transition = require('../Transition');
    TransitionEvent = require('./TransitionEvent');
    installMockRAF = require('./installMockRAF');

    installMockRAF();

    container = document.createElement('div');
  });

  it('should apply the base style in all children', function () {
    var Group = createReactClass({
      render: function () {
        var styles = {
          base: {
            background: 'red',
          },
        };

        return (
          <Transition
            childrenStyles={{
              base: styles.base,
            }}
          >
            <div>1</div>
            <div>2</div>
          </Transition>
        );
      },
    });

    var container = document.createElement('div');
    var instance = ReactDOM.render(<Group />, container);

    var children = ReactDOM.findDOMNode(instance).getElementsByTagName('div');

    for (var i = 0; i < children.length; i++) {
      expect(children[i].style.background).toBe('red');
    }
  });

  it('should overwrite the phase style with props.style', function () {
    var Group = createReactClass({
      render: function () {
        var styles = {
          base: {
            background: 'red',
          },

          custom: {
            background: 'black',
          },
        };

        return (
          <Transition
            childrenStyles={{
              base: styles.base,
            }}
          >
            <div style={styles.custom}>1</div>
          </Transition>
        );
      },
    });

    var container = document.createElement('div');
    var instance = ReactDOM.render(<Group />, container);

    var children = ReactDOM.findDOMNode(instance).getElementsByTagName('div');

    for (var i = 0; i < children.length; i++) {
      expect(children[i].style.background).toEqual('black');
    }
  });

  it('should call the onPhaseStart and onPhaseEnd callbacks in the appear phase', function (done) {
    var log = [];

    var handlePhaseEnd = function (phase) {
      if (phase === 'appear') {
        log.push('end');
        expect(log).toEqual(['start', 'end']);
        done();
      }
    };

    var handlePhaseStart = function (phase) {
      if (phase === 'appear') {
        log.push('start');
      }
    };

    var Group = createReactClass({
      render: function () {
        var styles = {
          base: {
            background: 'red',
          },

          appear: {
            background: 'black',
          },
        };

        return (
          <Transition
            childrenStyles={{
              base: styles.base,
              appear: styles.appear,
            }}
            onPhaseStart={handlePhaseStart}
            onPhaseEnd={handlePhaseEnd}
          >
            <div key={1}>1</div>
          </Transition>
        );
      },
    });

    ReactDOM.render(<Group />, container);
  });

  it('should call the onPhaseStart and onPhaseEnd callbacks in the enter phase', function (done) {
    var log = [];

    var handlePhaseEnd = function (phase) {
      if (phase === 'enter') {
        log.push('end');
      }
    };

    var handlePhaseStart = function (phase) {
      if (phase === 'enter') {
        log.push('start');
      }
    };

    var Group = createReactClass({
      getInitialState: function () {
        return {count: 1};
      },

      render: function () {
        var styles = {
          base: {
            background: 'red',
          },

          appear: {
            background: 'black',
          },
        };

        var elems = [];
        for (var i = 0; i < this.state.count; i++) {
          elems.push(<div key={i} id={i}>{i}</div>);
        }

        return (
          <Transition
            childrenStyles={{
              base: styles.base,
              appear: styles.appear,
            }}
            onPhaseStart={handlePhaseStart}
            onPhaseEnd={handlePhaseEnd}
          >
            {elems}
          </Transition>
        );
      },
    });

    var instance = ReactDOM.render(<Group />, container);

    instance.setState({count: 2}, function () {
      expect(log).toEqual(['start', 'end']);
      done();
    });
  });

  it('should call the onPhaseStart and onPhaseEnd callbacks in the leave phase', function (done) {
    var log = [];

    var handlePhaseEnd = function (phase) {
      if (phase === 'leave') {
        log.push('end');
      }
    };

    var handlePhaseStart = function (phase) {
      if (phase === 'leave') {
        log.push('start');
      }
    };

    var Group = createReactClass({
      getInitialState: function () {
        return {count: 1};
      },

      render: function () {
        var styles = {
          base: {
            background: 'red',
          },

          appear: {
            background: 'black',
          },
        };

        var elems = [];
        for (var i = 0; i < this.state.count; i++) {
          elems.push(<div key={i} id={i}>{i}</div>);
        }

        return (
          <Transition
            childrenStyles={{
              base: styles.base,
              appear: styles.appear,
            }}
            onPhaseStart={handlePhaseStart}
            onPhaseEnd={handlePhaseEnd}
          >
            {elems}
          </Transition>
        );
      },
    });

    var instance = ReactDOM.render(<Group />, container);

    instance.setState({count: 0}, function () {
      expect(log).toEqual(['start', 'end']);
      done();
    });
  });

  it('should apply different styles for appear and enter phases', function (done) {
    var Group = createReactClass({
      getInitialState: function () {
        return {count: 1};
      },

      render: function () {
        var styles = {
          base: {
            background: 'red',
          },

          appear: {
            background: 'black',
          },

          enter: {
            background: 'blue',
          },
        };

        var elems = [];
        for (var i = 0; i < this.state.count; i++) {
          elems.push(<div key={i} id={i}>{i}</div>);
        }

        return (
          <Transition
            childrenStyles={{
              base: styles.base,
              appear: styles.appear,
              enter: styles.enter,
            }}
          >
            {elems}
          </Transition>
        );
      },
    });

    var instance = ReactDOM.render(<Group />, container);

    instance.setState({count: 2}, function () {
      var children = ReactDOM.findDOMNode(instance).getElementsByTagName('div');

      expect(children[0].style.background).toBe('black');
      expect(children[1].style.background).toBe('blue');

      done();
    });
  });

  it('should handle correctly the transitionend event', function (done) {
    var handlePhaseEnd = function (phase) {
      if (phase === 'appear') {
        done();
      }
    };

    var Group = createReactClass({
      getInitialState: function () {
        return {count: 1};
      },

      render: function () {
        var styles = {
          base: {
            background: 'red',
          },

          appear: {
            background: 'black',
            transition: 'background 1s',
          },
        };

        var elems = [];
        for (var i = 0; i < this.state.count; i++) {
          elems.push(<div key={i} id={i}>{i}</div>);
        }

        return (
          <Transition
            childrenStyles={{
              base: styles.base,
              appear: styles.appear,
            }}
            onPhaseEnd={handlePhaseEnd}
          >
            {elems}
          </Transition>
        );
      },
    });

    var instance = ReactDOM.render(<Group />, container);
    var children = ReactDOM.findDOMNode(instance).getElementsByTagName('div');

    var event = new TransitionEvent('transitionend', {
      propertyName: 'background-color',
    });
    children[0].dispatchEvent(event);
  });

});
