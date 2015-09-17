var React = require('react');
var AppActions = require('./../actions/app.actions.js');

var Login = React.createClass({
	_handleClick: function() {
		AppActions.login();
	},

	render: function() {
		return (	
			<div className="flex-container">
				<form>
					<div className="form-group">
						<button type="button" className="btn btn-success" onClick={this._handleClick}>Log in to Spotify</button>
					</div>
				</form>
			</div>
		);
	}
});

module.exports = Login;