import React from 'react';
import { Route } from 'react-router';
import App from './../containers/App';
import About from './../containers/About';
import Create from './../containers/Create';
import Login from './../containers/LoginPage';

export default (
  <Route path="/" component={App}>
  	<Route path="/login" component={Login} />
  	<Route path="/about" component={About} />
  	<Route path="/create" component={Create} />
  </Route>
);
