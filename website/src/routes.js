var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var Layout = require('./components/layout');
var HomePanel = require('./components/home-panel');
var SchedulePanel = require('./components/schedule-panel');
var AboutusPanel = require('./components/aboutus-panel');

var routes = (
	<Route path="/" handler={Layout}>
		<DefaultRoute name="home" handler={HomePanel}/>
		<Route name="schedule" path="/schedule"  handler={SchedulePanel} />
		<Route name="aboutus" path="/aboutus" handler={AboutusPanel} />
	</Route>
);

module.exports = routes;