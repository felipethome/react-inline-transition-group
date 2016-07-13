const React = require('react');

const Button = React.createClass({
  displayName: 'Button',

  propTypes: {
    backgro: React.PropTypes.string,
    label: React.PropTypes.string,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    style: React.PropTypes.object,
  },

  getInitialState: function () {
    return {
      mouseDown: false,
    };
  },

  _handleMouseDown: function (event) {
    this.setState({
      mouseDown: true,
    });

    if (this.props.onMouseDown) this.props.onMouseDown(event);
  },

  _handleMouseUp: function (event) {
    this.setState({
      mouseDown: false,
    });

    if (this.props.onMouseUp) this.props.onMouseUp(event);
  },

  render: function () {
    const {
      label, // eslint-disable-line no-unused-vars
      onMouseDown, // eslint-disable-line no-unused-vars
      onMouseUp, // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
      ...others,
    } = this.props;

    const styles = {
      button: {
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        borderRadius: '2px',
        cursor: 'pointer',
        padding: '10px 15px',
        margin: '0 -4px 0 12px',
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
        {this.props.label}
      </button>
    );
  },

});

module.exports = Button;