var React = require('react');
var Transition = require('../../src/Transition');
var CSSTransition = require('react-addons-css-transition-group');

var Album = React.createClass({
  displayName: 'Album',

  propTypes: {
    images: React.PropTypes.array,
    type: React.PropTypes.string,
  },

  getInitialState: function () {
    return {
      callbackMsg: '',
      count: 1,
      show: false,
    };
  },

  componentDidMount: function () {
    var component = this;

    var promises = this.props.images.map(function (src) {
      return new Promise(function (resolve) {
        var img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    });

    Promise.all(promises).then(function () {
      component.setState({
        show: true,
      });
    });
  },

  _handleAdd: function () {
    this.setState(function (previousState) {
      return {count: previousState.count + 1};
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
        width: '500px',
        height: '220px',
        backgroundColor: '#FFF',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14),' +
          '0 1px 10px 0 rgba(0, 0, 0, 0.12),' +
          '0 2px 4px -1px rgba(0, 0, 0, 0.4)',
        padding: '30px',
      },

      actionsContainer: {
        display: 'flex',
        width: '100%',
      },

      base: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '500px',
        height: 'auto',
        background: '#FFF',
        borderRadius: '2px',
        boxSizing: 'border-box',
        marginBottom: '10px',
        opacity: '0',
      },

      appear: {
        opacity: '1',
        transition: 'all 1000ms',
      },

      leave: {
        opacity: '0',
        transition: 'all 1000ms',
      },

      button: {
        cursor: 'pointer',
        boxSizing: 'border-box',
        border: 'none',
        borderRadius: '2px',
        padding: '10px 15px',
        backgroundColor: '#2980b9',
        height: '36px',
        color: '#FFF',
        fontFamily: '"Roboto", sans-serif',
        textDecoration: 'none',
        textTransform: 'uppercase',
        margin: '0px 15px 15px 0',
        outline: 'none',
      },

      callback: {
        display: 'flex',
        flex: 2,
        alignItems: 'center',
        height: '36px',
        backgroundColor: '#FFF',
        boxSizing: 'border-box',
        border: '1px solid #81C784',
        borderRadius: '2px',
        padding: '5px 5px 5px 5px',
      },
    };

    var album;
    var callback;
    var elems = [];
    if (this.state.show) {
      if (this.state.count % 2) {
        elems.push(
          <img
            id={0}
            key={this.state.count}
            src="img/1.jpg"
            className={this.props.type === 'react-addons' ? 'album' : ''}
          />
        );
      }
      else {
        elems.push(
          <img
            id={1}
            key={this.state.count}
            src="img/2.jpg"
            className={this.props.type === 'react-addons' ? 'album' : ''}
          />
        );
      }

      if (this.props.type === 'react-addons') {
        album = (
          <CSSTransition
            component={'div'}
            transitionName="album"
            transitionAppear
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            style={{position: 'relative'}}
          >
            {elems}
          </CSSTransition>
        );
      }
      else {
        callback = (
          <div style={styles.callback}>
            {'Callback: ' + this.state.callbackMsg}
          </div>
        );

        album = (
          <Transition
            component={'div'}
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
            style={{position: 'relative'}}
          >
            {elems}
          </Transition>
        );
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.actionsContainer}>
          <button style={styles.button} onClick={this._handleAdd}>
            Switch Image
          </button>
          {callback}
        </div>
       {album}
      </div>
    );
  },
});

module.exports = Album;