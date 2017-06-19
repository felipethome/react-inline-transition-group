import React from 'react';
import Transition from '../../src/Transition';
import CSSTransition from 'react-addons-css-transition-group';

export default class square extends React.Component {
  static displayName = 'square';

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

      square: {
        position: 'absolute',
        top: (this.state.top - 25) + 'px',
        left: (this.state.left - 40) + 'px',
        border: '2px solid #448AFF',
        height: '50px',
        width: '81px',
        opacity: '0.5',
        transform: 'scale(0) rotate(0deg)',
      },

      appear: {
        transition: 'all 600ms',
        opacity: '1',
      },

      leave: {
        transition: 'all 600ms',
        opacity: '0',
        transform: 'scale(2) rotate(135deg)',
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

    let squareStyle;
    if (this.state.component === 'react-addons') {
      squareStyle = {
        top: (this.state.top - 25) + 'px',
        left: (this.state.left - 40) + 'px',
      };
    }

    const squares = [];
    squares.push(
      <div
        key={this.count++}
        style={squareStyle}
        className={this.state.component === 'react-addons' ? 'square' : ''}
      />
    );

    let transitionComponent;
    if (this.state.component === 'react-addons') {
      transitionComponent = (
        <CSSTransition
          component="div"
          transitionName="square"
          transitionAppear
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
        >
          {squares}
        </CSSTransition>
      );
    }
    else {
      transitionComponent = (
        <Transition
          childrenStyles={{
            base: styles.square,
            appear: styles.appear,
            enter: styles.appear,
            leave: styles.leave,
          }}
        >
          {squares}
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