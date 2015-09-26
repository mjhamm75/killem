var React = require('react');
import * as Actions from './../actions/app.actions.js';
import { connect } from 'react-redux';

var Login = React.createClass({
	render: function() {
		return (	
			<div className="flex-container-center">
				<form>
					<div className="form-group">
						<button type="button" className="btn btn-success" onClick={this.login}>Log in to Spotify</button>
					</div>
				</form>
			</div>
		);
	}
});

module.exports = Login;