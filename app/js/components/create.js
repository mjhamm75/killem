var React = require('react');
import { connect } from 'react-redux';
var AppActions = require('./../actions/app.actions.js');

var CreatePlaylist = React.createClass({
	getInitialState: function() {
		AppActions.getMe();
		return null;
	},
	_createPlaylist: function() {
		this.props.dispatch(AppActions.createPlaylist());
	},
	render: function() {
		return (
			<div className="flex-container-center">
				<button onClick={this._createPlaylist} type="button" className="btn btn-info">Create Party Playlists</button>
			</div>

		);
	}
});

function mapStateToProps() {
	return {
		user: []
	}
}

module.exports = connect(mapStateToProps)(CreatePlaylist);