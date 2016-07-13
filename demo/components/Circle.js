const React = require('react');
const Transition = require('../../src/Transition');
const CSSTransition = require('react-addons-css-transition-group');

const Circle = React.createClass({
  displayName: 'Circle',

  propTypes: {
    active: React.PropTypes.bool,
    left: React.PropTypes.number,
    top: React.PropTypes.number,
  },

  getInitialState: function () {
    return {
      component: '',
      left: 0,
      top: 0,
    };
  },

  componentWillMount: function () {
    this.count = 0;
  },

  _handleMouseMove: function (event) {
    this.setState({
      top: event.clientY,
      left: event.clientX,
    });
  },

  _handleTouchMove: function (event) {
    this.setState({
      top: event.touches[0].pageY,
      left: event.touches[0].pageX,
    });
  },

  _handleComponentChange: function (component) {
    this.setState({
      component: component,
    });
  },

  render: function () {
    const styles = {
      container: {
        position: 'relative',
        background: '#000',
        height: '100%',
        width: '100%',
      },

      circle: {
        position: 'absolute',
        top: (this.state.top - 50) + 'px',
        left: (this.state.left - 50) + 'px',
        borderRadius: '50%',
        border: '2px solid #448AFF',
        height: '100px',
        width: '100px',
        opacity: '0.5',
      },

      appear: {
        transition: 'all 600ms',
        opacity: '1',
        height: '100px',
        width: '100px',
      },

      leave: {
        transition: 'all 600ms',
        opacity: '0',
      },

      optionsContainer: {
        position: 'absolute',
        top: '200px',
        left: '0px',
        right: '0px',
        width: '450px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '30px',
        padding: '10px 10px 0px 10px',
        color: '#FFF',
        textAlign: 'center',
        boxShadow: '0 4px 5px 0 rgba(255, 255, 255, 0.14),' +
          '0 1px 10px 0 rgba(255, 255, 255, 0.12),' +
          '0 2px 4px -1px rgba(255, 255, 255, 0.4)',
      },

      option: {
        marginBottom: '10px',
      },
    };

    let circleStyle;
    if (this.state.component === 'react-addons') {
      circleStyle = {
        top: (this.state.top - 50) + 'px',
        left: (this.state.left - 50) + 'px',
      };
    }

    const circles = [];
    circles.pop();
    circles.push(
      <div
        key={this.count++}
        style={circleStyle}
        className={this.state.component === 'react-addons' ? 'circle' : ''}
      >
      </div>
    );

    let transitionComponent;
    if (this.state.component === 'react-addons') {
      transitionComponent = (
        <CSSTransition
          component="div"
          transitionName="circle"
          transitionAppear
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
        >
          {circles}
        </CSSTransition>
      );
    }
    else {
      transitionComponent = (
        <Transition
          component="div"
          childrenBaseStyle={styles.circle}
          childrenAppearStyle={styles.appear}
          childrenEnterStyle={styles.appear}
          childrenLeaveStyle={styles.leave}
        >
          {circles}
        </Transition>
      );
    }

    return (
      <div
        style={styles.container}
        onMouseMove={this._handleMouseMove}
        onTouchMove={this._handleTouchMove}
      >
        {transitionComponent}
        <div style={styles.optionsContainer}>
          <div style={styles.option}>
            <input
              defaultChecked
              name="component"
              type="radio"
              onChange={this._handleComponentChange.bind(this, '')}
            />
            ReactInlineTransitionGroup + ReactTransitionHooks
          </div>
          <div style={styles.option}>
            <input
              name="component"
              type="radio"
              onChange={this._handleComponentChange.bind(this, 'react-addons')}
            />
            ReactCSSTransitionGroup + ReactTransitionGroup
          </div>
        </div>
      </div>
    );
  },

});

module.exports = Circle;