import React from 'react';
import PropTypes from 'prop-types';

export default class Navbar extends React.Component {
  static displayName = 'Navbar';

  static propTypes = {
    actions: PropTypes.array,
  };

  render() {
    var styles = {
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
        background: '#01579B',
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
        background: '#01579B',
        boxShadow: '0 0px 8px rgba(0,0,0,.28)',
        height: '56px',
        width: '100%',
        margin: '0px',
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.banner}>
          <div style={styles.bannerProjectName}>
            React Inline Transition Group
          </div>
          <div style={styles.bannerDescription}>
            Control CSS transitions defined with inline style.
          </div>
        </div>
        <div style={styles.menu}>
          {this.props.actions}
        </div>
      </div>
    );
  }
}