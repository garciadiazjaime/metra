'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var HeaderSection = require('./header-section');
var FooterSection = require('./footer-section');


var Layout = React.createClass({displayName: "Layout",

  render: function() {
    return (
        React.createElement("div", null, 
            React.createElement("header", {id: "header"}, 
                React.createElement(HeaderSection, null)
            ), 
            React.createElement("div", {id: "mainContent", className: "container"}, 
                React.createElement(RouteHandler, null)
            ), 
            React.createElement("footer", {id: "footer"}, 
                React.createElement(FooterSection, null)
            )
        )
    );
  }
});

module.exports = Layout;
