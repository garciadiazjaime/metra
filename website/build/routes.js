var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var Layout = require('./components/layout');
var HomePanel = require('./components/home-panel');
var SchedulePanel = require('./components/schedule-panel');
var AboutusPanel = require('./components/aboutus-panel');

var routes = (
	React.createElement(Route, {path: "/", handler: Layout}, 
		React.createElement(DefaultRoute, {name: "home", handler: HomePanel}), 
		React.createElement(Route, {name: "schedule", path: "/schedule", handler: SchedulePanel}), 
		React.createElement(Route, {name: "aboutus", path: "/aboutus", handler: AboutusPanel})
	)
);

module.exports = routes;