var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var Layout = require('./components/Layout.react');
var Home = require('./components/Home.react');
var Aboutus = require('./components/Aboutus.react');
var Schedule = require('./components/widgets/Schedule.react');


var routes = (
	<Route path="/" handler={Layout}>
		<DefaultRoute name="home" handler={Home} />
		<Route name="schedule" path="/schedule"  handler={Schedule} />
		<Route name="aboutus" path="/aboutus" handler={Aboutus} />
	</Route>
);

module.exports = routes;