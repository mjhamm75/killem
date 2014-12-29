var React = require('react');
var AppActions = require('../actions/app.actions.js');
var SearchMusic = require('./search.music.js');
var SearchResults = require('./search.results.js');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Search Music</h1>
				<SearchMusic />
				<SearchResults />
			</div>
		);
	}
});

module.exports = App;