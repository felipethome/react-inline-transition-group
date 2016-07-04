var React = require('react');
var Album = require('./Album');

var Demo = React.createClass({
  displayName: 'Demo',

  render: function () {
    var styles = {
      container: {},

      albumContainer: {
        marginTop: '30px',
      },

      albumTitle: {
        color: '#000',
        fontSize: '1.2em',
        textAlign: 'center',
        marginBottom: '15px',
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.albumContainer}>
          <div style={styles.albumTitle}>
            ReactTransitionHooks and ReactInlineTransitionGroup
          </div>
          <Album
            images={['img/1.jpg', 'img/2.jpg']}
          />
        </div>
        <div style={styles.albumContainer}>
          <div style={styles.albumTitle}>
            ReactTransitionGroup and ReactCSSTransitionGroup
          </div>
          <Album
            images={['img/1.jpg', 'img/2.jpg']}
            type="react-addons"
          />
        </div>
      </div>
    );
  },
});

module.exports = Demo;