import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Login from './../components/login.js';

class LoginContainer extends React.Component {
  constructor() {
    super();
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleLogin() {
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

function mapStateToProps(state) {
  return {
    stuff: []
  }
}


export default connect(mapStateToProps)(LoginContainer);