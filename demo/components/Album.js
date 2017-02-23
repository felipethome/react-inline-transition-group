import React from 'react';
import Button from './Button';
import Transition from '../../src/Transition';
import CSSTransition from 'react-addons-css-transition-group';

export default class Album extends React.Component {
  static displayName = 'Album';

  static propTypes = {
    images: React.PropTypes.array,
  };

  state = {
    component: '',
    count: 1,
    show: false,
  };

  componentDidMount() {
    const promises = this.props.images.map(function (src) {
      return new Promise((resolve) => {
        var img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    });

    Promise.all(promises).then(() => {
      this.setState({
        show: true,
      });
    });
  }

  _handleAdd = () => {
    this.setState((previousState) => {
      return {count: previousState.count + 1};
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
        position: 'absolute',
        top: '200px',
        left: '0px',
        right: '0px',
        margin: '0 auto 30px auto',
        padding: '30px',
        height: '360px',
        width: '500px',
        backgroundColor: '#FFF',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14),' +
          '0 1px 10px 0 rgba(0, 0, 0, 0.12),' +
          '0 2px 4px -1px rgba(0, 0, 0, 0.4)',
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
        transition: 'all 1000ms ease-in',
      },

      leave: {
        opacity: '0',
        transition: 'all 1000ms ease-in',
      },

      button: {
        backgroundColor: '#0277BD',
        margin: '0px 15px 15px 0',
      },

      optionsContainer: {
        padding: '10px 10px 0px 10px',
        border: '1px solid #333',
        borderRadius: '2px',
        marginBottom: '20px',
        textAlign: 'center',
      },

      option: {
        marginBottom: '10px',
      },

      description: {
        marginBottom: '20px',
      },
    };

    let album;
    const elems = [];
    if (this.state.show) {
      if (this.state.count % 2) {
        elems.push(
          <img
            id={0}
            key={this.state.count}
            src="img/1.jpg"
            className={this.state.component === 'react-addons' ? 'album' : ''}
          />
        );
      }
      else {
        elems.push(
          <img
            id={1}
            key={this.state.count}
            src="img/2.jpg"
            className={this.state.component === 'react-addons' ? 'album' : ''}
          />
        );
      }

      if (this.state.component === 'react-addons') {
        album = (
          <CSSTransition
            component="div"
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
        album = (
          <Transition
            childrenStyles={{
              base: styles.base,
              appear: styles.appear,
              enter: styles.appear,
              leave: styles.leave,
            }}
            style={{position: 'relative'}}
          >
            {elems}
          </Transition>
        );
      }
    }

    return (
      <div style={styles.container}>
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
        <div style={styles.description}>
          Press the Switch Image button before the transition finishes to see
          the difference between the components.
        </div>
        <div>
          <Button onClick={this._handleAdd} style={styles.button}>
            Switch Image
          </Button>
        </div>
        {album}
      </div>
    );
  }
}

module.exports = Album;