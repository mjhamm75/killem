var React = require('react');
var AppActions = require('./../actions/app.actions.js');
var AppStore = require('./../stores/app.store.js');

function getPlaylist() {
	return {playlist: AppStore.getSongsFromPlaylist() };
}

var Playlist = React.createClass({
	getInitialState: function() {
		return getPlaylist();
	},

	componentWillMount: function() {
		 AppStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getPlaylist());
	},

	_removeTrack: function(trackId, position) {
		AppActions.removeTrack(trackId, position);
	},

	render: function() {
		var that = this;
		var songs;
		if(this.state.playlist) {
			songs = this.state.playlist.map(function(song, i) {
				return <li key={song.id}>{song.artist} - {song.name}<button type="button" className="btn btn-warning btn-circle" onClick={that._removeTrack.bind(that, song.id, i)}><i className="glyphicon glyphicon-remove"></i></button></li>;
			});
		}
		return songs ? <ul className="list-unstyled search-results">{songs}</ul>: <div>No songs in list</div>;
	}
});

module.exports = Playlist;