// require('./../sass/app.scss');

import {
  ReduxRouter,
  reduxReactRouter,
  routerStateReducer
} from 'redux-router';

import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import createHistory from 'history/lib/createMemoryHistory';
import { Link, Route } from 'react-router';

var LoginContainer = require('./containers/LoginContainer.js');
var CreatePlaylist = require('./components/create.js');
var Juking = require('./components/juking.js');
var About = require('./components/about.js');

import rootReducer from './reducers';

// const store = configureStore();
const history = createHistory()
const store = reduxReactRouter({
      history
    })(createStore)(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<ReduxRouter>
			<Route path="/">
				<Route path="/" component={LoginContainer} />
				<Route path="/create" component={CreatePlaylist} />
				<Route path="/juking" component={Juking} />
				<Route path="/about" component={About} />
			</Route>
		</ReduxRouter>
	</Provider>,
	document.getElementById('example')
);