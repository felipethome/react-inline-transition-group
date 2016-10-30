var React = require('react');
var Button = require('./Button');
var Transition = require('../../src/Transition');

var List = React.createClass({
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

  _handlePhaseStart: function (phase, id) {
    switch (phase) {
      case 'appear':
        this._handleStartAppear(id);
        break;
      case 'enter':
        this._handleStartEnter(id);
        break;
      case 'leave':
        this._handleStartLeave(id);
        break;
    }
  },

  _handlePhaseEnd: function (phase, id) {
    switch (phase) {
      case 'appear':
        this._handleAppeared(id);
        break;
      case 'enter':
        this._handleEntered(id);
        break;
      case 'leave':
        this._handleLeft(id);
        break;
    }
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

    var elems = [];

    for (var i = 0; i < this.state.count; i++) {
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
          childrenStyles={{
            base: styles.base,
            appear: styles.appear,
            enter: styles.appear,
            leave: styles.leave,
          }}
          onPhaseEnd={this._handlePhaseEnd}
          onPhaseStart={this._handlePhaseStart}
        >
          {elems}
        </Transition>
      </div>
    );
  },

});

module.exports = List;