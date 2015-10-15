import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMe } from './../app/js/actions/app.actions.js';

class About extends Component {
	constructor(props) {
		super(props);
		this.getMe = this.getMe.bind(this);
	}

	getMe() {
		this.props.getMe();
	}

	render() {
		return (
			<div>
				<h1>About</h1>
				<button onClick={this.getMe}>Get Me</button>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
  	me: state.me
  };
}

export default connect(mapStateToProps, {
  getMe
})(About);