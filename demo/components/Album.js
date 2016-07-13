const React = require('react');
const Button = require('./Button');
const Transition = require('../../src/Transition');
const CSSTransition = require('react-addons-css-transition-group');

const Album = React.createClass({
  displayName: 'Album',

  propTypes: {
    images: React.PropTypes.array,
  },

  getInitialState: function () {
    return {
      component: '',
      count: 1,
      show: false,
    };
  },

  componentDidMount: function () {
    const component = this;

    const promises = this.props.images.map(function (src) {
      return new Promise(function (resolve) {
        const img = new Image();
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

  _handleComponentChange: function (component) {
    this.setState({
      component: component,
    });
  },

  render: function () {
    const styles = {
      container: {
        backgroundColor: '#FFF',
        height: '300px',
        width: '500px',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14),' +
          '0 1px 10px 0 rgba(0, 0, 0, 0.12),' +
          '0 2px 4px -1px rgba(0, 0, 0, 0.4)',
        padding: '30px',
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
        backgroundColor: '#2980b9',
        margin: '0px 15px 15px 0',
      },

      optionsContainer: {
        marginBottom: '30px',
      },

      option: {
        marginBottom: '10px',
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
            component={'div'}
            childrenBaseStyle={styles.base}
            childrenAppearStyle={styles.appear}
            childrenEnterStyle={styles.appear}
            childrenLeaveStyle={styles.leave}
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
        <div>
          <Button
            label="Switch Image"
            onClick={this._handleAdd}
            style={styles.button}
          />
        </div>
       {album}
      </div>
    );
  },
});

module.exports = Album;