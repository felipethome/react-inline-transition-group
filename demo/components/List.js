const React = require('react');
const Button = require('./Button');
const Transition = require('../../src/Transition');

const List = React.createClass({
  displayName: 'List',

  getInitialState: function () {
    return {
      callbackMsg: '',
      count: 1,
    };
  },

  _handleAdd: function () {
    this.setState(function (previousState) {
      return {count: Math.min(previousState.count + 1, 4)};
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
    const styles = {
      container: {
        background: '#FFF',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14),' +
          '0 1px 10px 0 rgba(0, 0, 0, 0.12),' +
          '0 2px 4px -1px rgba(0, 0, 0, 0.4)',
        padding: '30px',
        height: '300px',
        width: '500px',
      },

      base: {
        background: '#FFF',
        borderRadius: '2px',
        boxSizing: 'border-box',
        height: '50px',
        marginBottom: '5px',
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
        backgroundColor: '#2980b9',
        margin: '0px 15px 15px 0',
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

    const elems = [];

    for (let i = 0; i < this.state.count; i++) {
      elems.push(
        <div key={i} id={i}>{'id: ' + i}</div>
      );
    }

    return (
      <div style={styles.container}>
        <div>
          <Button
            label="Add"
            style={styles.button}
            onClick={this._handleAdd}
          />
          <Button
            label="Remove"
            style={styles.button}
            onClick={this._handleRemove}
          />
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

module.exports = List;