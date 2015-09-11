'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Link = ReactRouter.Link;

var HeaderSection = React.createClass({

	mixins : [ReactRouter.Navigation],

	handleClick: function(){
		console.log('handleClick');
        this.transitionTo('aboutus');
	},

	render: function() {
		return (
			<div className="container">
				<h1 id="brand">
					<Link to="home" title="Return to home">
						<em>Branding</em>
						<span className="hidden">Train schedules in Chicago</span>
					</Link>
				</h1>
				<Button id="infoButton" onClick={this.handleClick}>i</Button>
			</div>
		);
	}
});

module.exports = HeaderSection;
