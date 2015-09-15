var React = require('react');
var AppActions = require('./../actions/app.actions.js');

var Login = React.createClass({
	_handleClick: function() {
		AppActions.login();
	},

	render: function() {
		return (	
			<div className="row">
				<div className="col-md-2 col-md-offset-5 col-sm-2 col-sm-offset-5 col-xs-2 col-xs-offset-5 vertical-center">
					<form>
						<div className="form-group">
							<button type="button" className="btn btn-success" onClick={this._handleClick}>Log in to Spotify</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
});

module.exports = Login;