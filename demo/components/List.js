import React from 'react';
import Button from './Button';
import Transition from '../../src/Transition';

export default class List extends React.Component {
  static displayName = 'List'

  state = {
    callbackMsg: '',
    count: 1,
  };

  _handleAdd = () => {
    this.setState(function (previousState) {
      return {count: Math.min(previousState.count + 1, 4)};
    });
  };

  _handleRemove = () => {
    this.setState(function (previousState) {
      return {count: Math.max(previousState.count - 1, 0)};
    });
  };

  _handlePhaseStart = (phase, id) => {
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
  };

  _handlePhaseEnd = (phase, id) => {
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
  };

  _handleStartAppear = (id) => {
    this.setState({callbackMsg: id + ' start to appear'});
  };

  _handleStartEnter = (id) => {
    this.setState({callbackMsg: id + ' start to enter'});
  };

  _handleStartLeave = (id) => {
    this.setState({callbackMsg: id + ' start to leave'});
  };

  _handleAppeared = (id) => {
    this.setState({callbackMsg: id + ' appeared'});
  };

  _handleEntered = (id) => {
    this.setState({callbackMsg: id + ' entered'});
  };

  _handleLeft = (id) => {
    this.setState({callbackMsg: id + ' left'});
  };

  render() {
    var styles = {
      container: {
        position: 'absolute',
        top: '200px',
        left: '0px',
        right: '0px',
        margin: '0 auto 30px auto',
        padding: '30px',
        height: '300px',
        width: '500px',
        background: '#FFF',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14),' +
          '0 1px 10px 0 rgba(0, 0, 0, 0.12),' +
          '0 2px 4px -1px rgba(0, 0, 0, 0.4)',
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
        backgroundColor: '#0277BD',
        margin: '0px 15px 15px 0',
      },

      callback: {
        height: '20px',
        backgroundColor: '#FFF',
        border: '1px solid #333',
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
          <Button onClick={this._handleAdd} style={styles.button}>
            Add
          </Button>
          <Button onClick={this._handleRemove} style={styles.button}>
            Remove
          </Button>
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
  }
}