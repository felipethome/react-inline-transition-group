var React = require('react');
var ReactDOM = require('react-dom');
var Transition = require('../src');

var Demo = React.createClass({
  displayName: 'Demo',

  getInitialState: function () {
    return {
      callbackMsg: '',
      count: 1,
    };
  },

  _handleAdd: function () {
    this.setState(function (previousState) {
      return {count: Math.min(previousState.count + 1, 7)};
    });
  },

  _handleRemove: function () {
    this.setState(function (previousState) {
      return {count: Math.max(previousState.count - 1, 0)};
    });
  },

  _handleStartAppear: function (id) {
    this.setState({callbackMsg: id + ' start to appear'});
  },

  _handleStartEnter: function (id) {
    this.setState({callbackMsg: id + ' start to enter'});
  },

  _handleStartLeave: function (id) {
    this.setState({callbackMsg: id + ' start to leave'});
  },

  _handleAppeared: function (id) {
    this.setState({callbackMsg: id + ' appeared'});
  },

  _handleEntered: function (id) {
    this.setState({callbackMsg: id + ' entered'});
  },

  _handleLeft: function (id) {
    this.setState({callbackMsg: id + ' left'});
  },

  render: function () {
    var styles = {
      container: {
        height: '100%',
        width: '100%',
      },

      base: {
        background: '#FFF',
        borderRadius: '2px',
        boxSizing: 'border-box',
        height: '50px',
        marginBottom: '10px',
        padding: '10px',
      },

      appear: {
        background: '#81C784',
        transition: 'all 1000ms',
      },

      leave: {
        background: '#FFF',
        transition: 'all 500ms',
      },

      button: {
        cursor: 'pointer',
        border: 'none',
        borderRadius: '2px',
        backgroundColor: '#039BE5',
        padding: '10px 15px',
        color: '#FFF',
        fontFamily: '"Roboto", sans-serif',
        textDecoration: 'none',
        textTransform: 'uppercase',
        margin: '0px 15px 15px 0',
        outline: 'none',
      },

      callback: {
        height: '20px',
        backgroundColor: '#FFF',
        border: '1px solid #81C784',
        borderRadius: '2px',
        marginBottom: '15px',
        padding: '5px 5px 5px 5px',
      },
    };

    var elems = [];

    for (var i = 0; i < this.state.count; i++) {
      elems.push(
        <div key={i} id={i}>{'id: ' + i}</div>
      );
    }

    return (
      <div style={styles.container}>
        <div>
          <button style={styles.button} onClick={this._handleAdd}>
            Add
          </button>
          <button style={styles.button} onClick={this._handleRemove}>
            Remove
          </button>
        </div>
        <div style={styles.callback}>
          {'Callback: ' + this.state.callbackMsg}
        </div>
        <Transition
          childrenBaseStyle={styles.base}
          childrenAppearStyle={styles.appear}
          childrenEnterStyle={styles.appear}
          childrenLeaveStyle={styles.leave}
          onChildAppeared={this._handleAppeared}
          onChildEntered={this._handleEntered}
          onChildLeft={this._handleLeft}
          onChildStartAppear={this._handleStartAppear}
          onChildStartEnter={this._handleStartEnter}
          onChildStartLeave={this._handleStartLeave}
        >
          {elems}
        </Transition>
      </div>
    );
  },
});

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);