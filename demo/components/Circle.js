import React from 'react';
import Transition from '../../src/Transition';
import CSSTransition from 'react-addons-css-transition-group';

export default class Circle extends React.Component {
  static displayName = 'Circle';

  static propTypes = {
    active: React.PropTypes.bool,
    left: React.PropTypes.number,
    top: React.PropTypes.number,
  };

  state = {
    component: '',
    left: 0,
    top: 0,
  };

  componentWillMount() {
    this.count = 0;
  }

  _handleMouseMove = (event) => {
    this.setState({
      top: event.clientY,
      left: event.clientX,
    });
  };

  _handleTouchMove = (event) => {
    this.setState({
      top: event.touches[0].pageY,
      left: event.touches[0].pageX,
    });
  };

  _handleComponentChange = (component) => {
    this.setState({
      component: component,
    });
  };

  render() {
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
        margin: '0 auto 0px auto',
        padding: '10px 10px 0px 10px',
        color: '#FFF',
        textAlign: 'center',
        border: '1px solid #333',
        borderRadius: '2px',
      },

      option: {
        marginBottom: '10px',
      },

      description: {
        position: 'absolute',
        top: '300px',
        width: '100%',
        textAlign: 'center',
        color: '#FFF',
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
      />
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
          childrenStyles={{
            base: styles.circle,
            appear: styles.appear,
            enter: styles.appear,
            leave: styles.leave,
          }}
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
        <div style={styles.description}>Move your cursor across the screen</div>
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
  }
}