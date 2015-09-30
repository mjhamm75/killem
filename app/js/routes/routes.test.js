import React from 'react';
import { Route } from 'react-router';
var LoginContainer = require('./../containers/LoginContainer.js');
var CreatePlaylist = require('./../components/create.js');
var Juking = require('./../components/juking.js');
var About = require('./../components/about.js');

function routes() {
	return (
		<Route path="/">
			<Route path="/" component={LoginContainer} />
			<Route path="/create" component={CreatePlaylist} />
			<Route path="/juking" component={Juking} />
			<Route path="/about" component={About} />
		</Route>
	)
}

export default routes();