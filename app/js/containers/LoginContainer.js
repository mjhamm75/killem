import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Login from './../components/login.js';

export default class LoginContainer extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {

  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleLogin() {
    const router = this.context.router;
    this.props.dispatch(Actions.login(null, null, this.context.router));
  }

  render() {
    return (
      <Login
        auth={this.props}
        handleLogin={this.handleLogin}
       />
    );
  }
}
