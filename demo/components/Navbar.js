const React = require('react');

const Navbar = React.createClass({
  displayName: 'Navbar',

  propTypes: {
    actions: React.PropTypes.array,
  },

  render: function () {
    const styles = {
      container: {
        position: 'fixed',
        left: '0px',
        top: '0px',
        zIndex: '1',
        width: '100%',
      },

      banner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(45deg, #2980b9, #2c3e50)',
        height: '100px',
        width: '100%',
      },

      bannerProjectName: {
        fontSize: '2.5em',
        color: '#FFF',
      },

      bannerDescription: {
        color: '#CCC',
        marginTop: '5px',
      },

      menu: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #2980b9, #2c3e50)',
        boxShadow: '0 0px 8px rgba(0,0,0,.28)',
        height: '56px',
        width: '100%',
        margin: '0',
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.banner}>
          <div style={styles.bannerProjectName}>
            React Inline Transition Group
          </div>
          <div style={styles.bannerDescription}>
            Control CSS transitions defined using inline style.
          </div>
        </div>
        <div style={styles.menu}>
          {this.props.actions}
        </div>
      </div>
    );
  },

});

module.exports = Navbar;