import React from 'react';
import { Route } from 'react-router';
import App from './../containers/NewApp';
import UserPage from './../containers/UserPage';
import RepoPage from './../containers/RepoPage';
import About from './../components/About';

export default (
  <Route path="/" component={App}>
  	<Route path="/about" component={About} />
    <Route path="/:login/:name" component={RepoPage} />
    <Route path="/:login" component={UserPage} />
  </Route>
);
