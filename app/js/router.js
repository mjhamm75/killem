// require('./../sass/app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from './stores/redux.store.js';

var LoginContainer = require('./containers/LoginContainer.js');
var CreatePlaylist = require('./components/create.js');
var Juking = require('./components/juking.js');
var About = require('./components/about.js');

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={LoginContainer} />
			<Route path="/create" component={CreatePlaylist} />
			<Route path="/juking" component={Juking} />
			<Route path="/about" component={About} />
		</Router>
	</Provider>,
	document.getElementById('example')
);