var React = require('react');
var AppActions = require('./../actions/app.actions.js');
import { login } from './../actions/app.actions.js';

var Login = React.createClass({
	login: function() {
		this.dispatch();
	},

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