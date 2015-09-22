require('./../sass/app.scss');

import React from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from './stores/redux.store.js';

var App = require('./components/login.js');
var CreatePlaylist = require('./components/create.js');
var Juking = require('./components/juking.js');
var About = require('./components/about.js');

const store = configureStore();

function login() {
	console.log('login');
	debugger;
}

React.render(
	<Provider store={store}>
		{() =>
			<Router>
				<Route path="/" component={App} />
				<Route path="/create" component={CreatePlaylist} />
				<Route path="/juking" component={Juking} />
				<Route path="/about" component={About} />
			</Router>
		}
	</Provider>,
	document.getElementById('example')
);