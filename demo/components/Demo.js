import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Navbar from './Navbar';
import Button from './Button';
import Square from './Square';
import Album from './Album';
import List from './List';

const supportsHistory = 'pushState' in window.history;

export default class Demo extends React.Component {
  static displayName = 'Demo';

  render() {
    const styles = {
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'padding-box',
        height: '100%',
        width: '100%',
      },

      button: {
        backgroundColor: '#0277BD',
      },

      link: {
        margin: '0 -4px 0 12px',
      },
    };

    const basename = (sessionStorage || {}).basename;

    const navbarActions = [
      <a
        key="github"
        href="https://github.com/felipethome/react-inline-transition-group"
        style={styles.link}
      >
        <Button style={styles.button}>Github</Button>
      </a>,
      <Link key="/demo1" to="/demo1" style={styles.link}>
        <Button style={styles.button}>Demo 1</Button>
      </Link>,
      <Link key="/demo2" to="/demo2" style={styles.link}>
        <Button style={styles.button}>Demo 2</Button>
      </Link>,
      <Link key="/demo3" to="/demo3" style={styles.link}>
        <Button style={styles.button}>Demo 3</Button>
      </Link>,
    ];

    return (
      <Router
        basename={basename}
        forceRefresh={!supportsHistory}
      >
        <div style={styles.container}>
          <Navbar actions={navbarActions} />
          <Route exact path="/" component={Square}/>
          <Route path="/demo1" component={Square}/>
          <Route
            path="/demo2"
            render={() => <Album images={['img/1.jpg', 'img/2.jpg']} />}
          />
          <Route path="/demo3" component={List}/>
        </div>
      </Router>
    );
  }
}