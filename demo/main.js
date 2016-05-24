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
      return {count: Math.min(previousState.count + 1, 8)};
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
        width: '500px',
        height: '50px',
        marginBottom: '10px',
      },

      appear: {
        background: '#2196F3',
        transition: 'all 1000ms',
      },

      leave: {
        background: '#FFF',
        transition: 'all 500ms',
      },

      callback: {
        height: '20px',
        width: '500px',
        backgroundColor: '#FFF',
        padding: '5px 5px 5px 5px',
      },
    };

    var elems = [];

    for (var i = 0; i < this.state.count; i++)
      elems.push(<div key={i} id={i}>{i}</div>);

    return (
      <div style={styles.container}>
        <div style={styles.callback}>{this.state.callbackMsg}</div>
        <div>
          <button onClick={this._handleAdd}>Add</button>
          <button onClick={this._handleRemove}>Remove</button>
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