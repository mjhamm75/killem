import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from './../actions/app.actions.js';
import Login from './../components/login.js';

class LoginContainer extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}

	handleLogin() {
		this.props.login();
	}

	render() {
		return <Login handleLogin={this.handleLogin.bind(this)}/>
	}
}

function mapPropsFromState(state) {
	return {
		login
	}
}

export default connect(mapPropsFromState)(LoginContainer);