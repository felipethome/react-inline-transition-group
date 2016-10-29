var React = require('react');
var Navbar = require('./Navbar');
var Button = require('./Button');
var Circle = require('./Circle');
var Album = require('./Album');
var List = require('./List');

var Demo = React.createClass({
  displayName: 'Demo',

  getInitialState: function () {
    return {
      page: 'Demo 1',
    };
  },

  _getPage: function () {
    var page;

    switch (this.state.page) {
      case 'Demo 1':
        page = (<Circle />);
        break;
      case 'Demo 2':
        page = (<Album images={['img/1.jpg', 'img/2.jpg']} />);
        break;
      case 'Demo 3':
        page = (<List />);
        break;
      case 'Github':
        document.location.href =
          'https://github.com/felipethome/react-inline-transition-group';
        break;
    }

    return page;
  },

  _handleButtonClick: function (page) {
    this.setState({
      page: page,
    });
  },

  render: function () {
    var styles = {
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F5F5F5',
        boxSizing: 'padding-box',
        height: '100%',
        width: '100%',
      },
    };

    var navbarActions = [];
    navbarActions.push(
      <Button
        key="Github"
        label="Github"
        onClick={this._handleButtonClick.bind(this, 'Github')}
      />
    );
    navbarActions.push(
      <Button
        key="Demo 1"
        label="Demo 1"
        onClick={this._handleButtonClick.bind(this, 'Demo 1')}
      />
    );
    navbarActions.push(
      <Button
        key="Demo 2"
        label="Demo 2"
        onClick={this._handleButtonClick.bind(this, 'Demo 2')}
      />
    );
    navbarActions.push(
      <Button
        key="Demo 3"
        label="Demo 3"
        onClick={this._handleButtonClick.bind(this, 'Demo 3')}
      />
    );

    var page = this._getPage();

    return (
      <div style={styles.container}>
        <Navbar actions={navbarActions} />
        {page}
      </div>
    );
  },
});

module.exports = Demo;