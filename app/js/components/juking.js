var React = require('react');
var AppActions = require('./../actions/app.actions.js');
var Playlist = require('./playlist.js');
var SearchMusic = require('./search.music.js');
var SearchResult = require('./search.results.js');

var Juking = React.createClass({
	_addTrack: function() {
		AppActions.addTrack();
	},
	render: function() {
		return (	<div className="row">
					<div className="col-sm-6">
						<SearchMusic />
						<SearchResult />
					</div>
					<div className="col-sm-6">
						<h2>Playlist</h2>
						<Playlist />
					</div>
				</div>);
	}
});

function mapStateToProps() {
	return {
		user: []
	}
}

module.exports = connect(mapStateToProps)(Juking);