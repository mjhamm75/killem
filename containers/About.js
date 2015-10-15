import React, { Component, PropTypes } from 'react';
import { getMe } from './../app/js/actions/app.actions.js';

class About extends Component {
	constructor(props) {
		super(props);
		this.getMe = this.getMe.bind(this);
	}

	getMe() {

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


export default About;