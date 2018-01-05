import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  static displayName = 'Button';

  static propTypes = {
    children: PropTypes.any,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    style: PropTypes.object,
  };

  state = {
    mouseDown: false,
  };

  _handleMouseDown = (event) => {
    this.setState({
      mouseDown: true,
    });

    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };

  _handleMouseUp = (event) => {
    this.setState({
      mouseDown: false,
    });

    if (this.props.onMouseUp) this.props.onMouseUp(event);
  };

  render() {
    let {
      onMouseDown, // eslint-disable-line no-unused-vars
      onMouseUp, // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
      ...others, // eslint-disable-line comma-dangle
    } = this.props;

    const styles = {
      button: {
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        borderRadius: '2px',
        cursor: 'pointer',
        padding: '10px 15px',
        height: '36px',
        color: '#FFF',
        fontFamily: '"Roboto", sans-serif',
        fontSize: '0.9em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'ease-out box-shadow .2s',
      },

      buttonMouseDown: {
        boxShadow: '0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24)',
      },
    };

    const buttonStyle = Object.assign(
      {},
      styles.button,
      this.state.mouseDown && styles.buttonMouseDown,
      this.props.style
    );

    return (
      <button
        onMouseDown={this._handleMouseDown}
        onMouseUp={this._handleMouseUp}
        style={buttonStyle}
        {...others}
      >
        {this.props.children}
      </button>
    );
  }
}