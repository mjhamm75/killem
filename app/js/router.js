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

function redirectOnEnter(pathname) {
  return (routerState, replaceState) => replaceState(null, pathname);
}

const routes = (
  <Route path="/" component={LoginContainer} >
  </Route>
);

const reducer = combineReducers({
  router: routerStateReducer
});

const history = createHistory();
const store = reduxReactRouter({
  history
})(createStore)(reducer);

React.render(
	<Provider store={store}>
		<ReduxRouter>
			{routes}
		</ReduxRouter>
	</Provider>,
	document.getElementById('example')
);