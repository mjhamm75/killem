import React from 'react';
import { Router, Route } from 'react-router';

require('./stores/app.store.js');

var App = require('./components/login.js');
var CreatePlaylist = require('./components/create.js');
var Juking = require('./components/juking.js');
var About = require('./components/about.js');

React.render(
	<Router>
		<Route path="/" component={App} />
		<Route path="/create" component={CreatePlaylist} />
		<Route path="/juking" component={Juking} />
		<Route path="/about" component={About} />
	</Router>,
	document.getElementById('example')
);