/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
require('./stores/app.store.js');

var App = require('./components/login.js');
var CreatePlaylist = require('./components/create.js');
var Juking = require('./components/juking.js');

React.renderComponent(
	<Routes>
		<Route path="/" handler={App}></Route>
		<Route path="/create" handler={CreatePlaylist}></Route>
		<Route path="/juking" handler={Juking}></Route>
	</Routes>,
	document.getElementById('example')
);