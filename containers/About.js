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

	renderMe() {
		let { me } = this.props;
		if(me.body) {
			return (
				<div>
					<h1>{me.body.id}</h1>
					<h2>{me.body.url}</h2>
					<h3>{me.body.email}</h3>
				</div>
			)			
		} else {
			return null;
		}
	}

	render() {
		return (
			<div>
				<h1>About</h1>
				<button onClick={this.getMe}>Get Me</button>
				{this.renderMe()}
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