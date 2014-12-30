var React = require('react');
var AppActions = require('./../actions/app.actions.js');
var SearchMusic = require('./search.music.js');
var SearchResults = require('./search.results.js');

var CreatePlaylist = React.createClass({
	getInitialState: function() {
		AppActions.getMe();
		return null;
	},
	_createPlaylist: function() {
		AppActions.createPlaylist();
	},
	render: function() {
		return (
			<div className="col-md-2 col-md-offset-5 col-sm-2 col-sm-offset-5 col-xs-2 col-xs-offset-5 vertical-center">
				<button onClick={this._createPlaylist} type="button" className="btn btn-info">Create Party Playlists</button>
			</div>

		);
	}
});

module.exports = CreatePlaylist;