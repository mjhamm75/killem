import React, { Component, PropTypes } from 'react';
import Login from './../components/Login';
import { login } from './../app/js/actions/app.actions.js';
import { connect } from 'react-redux';

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
	}

	login() {
		debugger;
		this.props.login();
	}

	render() {
		return (
			<div>
				<h1>Login</h1>
				<Login login={this.login}/>
			</div>
		)
	}
}

function mapStateToProps() {
	return {
	}
}

export default connect(mapStateToProps, {
	login
})(LoginPage);