var React = require('react');
var AppActions = require('./../actions/app.actions.js');

var Login = React.createClass({
	_handleClick: function() {
		var auth = {
			username: this.refs.username.getDOMNode().value,
			pw: this.refs.password.getDOMNode().value
		};
		AppActions.login(auth);
	},

	render: function() {
		return (	<div>
					<input ref="username" placeholder="Username"/>
					<input ref="password" placeholder="Password"/>
					<button type="button" className="btn btn-success" onClick={this._handleClick}>Log in to Spotify</button>
				</div>);
	}
});

module.exports = Login;