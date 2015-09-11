'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var HeaderSection = require('./header-section');
var FooterSection = require('./footer-section');


var Layout = React.createClass({

  render: function() {
    return (
        <div>
            <header id="header">
                <HeaderSection/>
            </header>
            <div id="mainContent" className="container">
                <RouteHandler/>
            </div>
            <footer id="footer">
                <FooterSection/>
            </footer>
        </div>
    );
  }
});

module.exports = Layout;
