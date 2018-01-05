/* eslint-disable react/no-multi-comp, max-len, react/display-name */

let React;
let ReactDOM;
let Transition;
let installMockRAF;
let TransitionEvent;

describe('Transition', function () {
  let container;

  beforeEach(function () {
    jest.resetModuleRegistry();
    jest.useRealTimers();

    installMockRAF = require('./installMockRAF');
    installMockRAF();

    React = require('react');
    ReactDOM = require('react-dom');
    Transition = require('../Transition');
    TransitionEvent = require('./TransitionEvent');

    container = document.createElement('div');
  });

  it('should apply the base style in all children', function () {
    class Group extends React.Component {
      render() {
        const styles = {
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
      }
    }

    const container = document.createElement('div');
    const instance = ReactDOM.render(<Group />, container);

    const children = ReactDOM.findDOMNode(instance).getElementsByTagName('div');

    for (let i = 0; i < children.length; i++) {
      expect(children[i].style.background).toBe('red');
    }
  });

  it('should overwrite the phase style with props.style', function () {
    class Group extends React.Component {
      render() {
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
      }
    }

    const container = document.createElement('div');
    const instance = ReactDOM.render(<Group />, container);

    const children = ReactDOM.findDOMNode(instance).getElementsByTagName('div');

    for (let i = 0; i < children.length; i++) {
      expect(children[i].style.background).toEqual('black');
    }
  });

  it('should call the onPhaseStart and onPhaseEnd callbacks in the appear phase', function (done) {
    const log = [];

    const handlePhaseEnd = function (phase) {
      if (phase === 'appear') {
        log.push('end');
        expect(log).toEqual(['start', 'end']);
        done();
      }
    };

    const handlePhaseStart = function (phase) {
      if (phase === 'appear') {
        log.push('start');
      }
    };

    class Group extends React.Component {
      render() {
        const styles = {
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
      }
    }

    ReactDOM.render(<Group />, container);
  });

  it('should call the onPhaseStart and onPhaseEnd callbacks in the enter phase', function (done) {
    const log = [];

    const handlePhaseEnd = function (phase) {
      if (phase === 'enter') {
        log.push('end');
      }
    };

    const handlePhaseStart = function (phase) {
      if (phase === 'enter') {
        log.push('start');
      }
    };

    class Group extends React.Component {
      state = {count: 1};

      render() {
        const styles = {
          base: {
            background: 'red',
          },

          appear: {
            background: 'black',
          },
        };

        const elems = [];
        for (let i = 0; i < this.state.count; i++) {
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
      }
    }

    const instance = ReactDOM.render(<Group />, container);

    instance.setState({count: 2}, function () {
      expect(log).toEqual(['start', 'end']);
      done();
    });
  });

  it('should call the onPhaseStart and onPhaseEnd callbacks in the leave phase', function (done) {
    const log = [];

    const terminateTest = function () {
      expect(log).toEqual(['start', 'end']);
      done();
    };

    const handlePhaseEnd = function (phase) {
      if (phase === 'leave') {
        log.push('end');
        terminateTest();
      }
    };

    const handlePhaseStart = function (phase) {
      if (phase === 'leave') {
        log.push('start');
      }
    };

    class Group extends React.Component {
      state = {count: 1};

      render() {
        const styles = {
          base: {
            background: 'red',
          },

          appear: {
            background: 'black',
          },
        };

        const elems = [];
        for (let i = 0; i < this.state.count; i++) {
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
      }
    }

    const instance = ReactDOM.render(<Group />, container);

    instance.setState({count: 0});
  });

  it('should apply different styles for appear and enter phases', function (done) {
    let instance;
    let children;
    const log = [];

    const terminateTest = function () {
      children = ReactDOM.findDOMNode(instance).getElementsByTagName('div');

      log.push(children[0].style.background);
      log.push(children[1].style.background);
      expect(log).toEqual(['black', 'blue']);

      done();
    };

    const handlePhaseEnd = function (phase) {
      if (phase === 'leave') {
        terminateTest();
      }
    };

    class Group extends React.Component {
      state = {count: 1};

      render() {
        const styles = {
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

        const elems = [];
        for (let i = 0; i < this.state.count; i++) {
          elems.push(<div key={i} id={i}>{i}</div>);
        }

        return (
          <Transition
            childrenStyles={{
              base: styles.base,
              appear: styles.appear,
              enter: styles.enter,
            }}
            onPhaseEnd={handlePhaseEnd}
          >
            {elems}
          </Transition>
        );
      }
    }

    instance = ReactDOM.render(<Group />, container);
    instance.setState({count: 3});
    instance.setState({count: 2});
  });

  it('should handle correctly the transitionend event', function (done) {
    const handlePhaseEnd = function (phase) {
      if (phase === 'appear') {
        done();
      }
    };

    class Group extends React.Component {
      state = {count: 1};

      render() {
        const styles = {
          base: {
            background: 'red',
          },

          appear: {
            background: 'black',
            transition: 'background 1s',
          },
        };

        const elems = [];
        for (let i = 0; i < this.state.count; i++) {
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
      }
    }

    const instance = ReactDOM.render(<Group />, container);
    const children = ReactDOM.findDOMNode(instance).getElementsByTagName('div');

    var event = new TransitionEvent('transitionend', {
      propertyName: 'background-color',
    });
    children[0].dispatchEvent(event);
  });
});
