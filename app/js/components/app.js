var React = require('react');
var AppActions = require('../actions/app.actions.js');
var SearchMusic = require('./search.music.js');
var SearchResults = require('./search.results.js');

var App = React.createClass({
	render: function() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
});

module.exports = App;