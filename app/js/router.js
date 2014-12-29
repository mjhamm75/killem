/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
require('./stores/app.store.js');

var App = require('./components/login.js');

React.renderComponent(
	<Routes>
		<Route path="/" handler={App}></Route>
	</Routes>,
	document.getElementById('example')
);