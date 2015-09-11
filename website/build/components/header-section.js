'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Link = ReactRouter.Link;

var HeaderSection = React.createClass({displayName: "HeaderSection",

	mixins : [ReactRouter.Navigation],

	handleClick: function(){
		console.log('handleClick');
        this.transitionTo('aboutus');
	},

	render: function() {
		return (
			React.createElement("div", {className: "container"}, 
				React.createElement("h1", {id: "brand"}, 
					React.createElement(Link, {to: "home", title: "Return to home"}, 
						React.createElement("em", null, "Branding"), 
						React.createElement("span", {className: "hidden"}, "Train schedules in Chicago")
					)
				), 
				React.createElement(Button, {id: "infoButton", onClick: this.handleClick}, "i")
			)
		);
	}
});

module.exports = HeaderSection;
