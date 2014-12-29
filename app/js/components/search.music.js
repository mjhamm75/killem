var React = require('react');
var AppActions = require('../actions/app.actions.js');
require('./../stores/app.store.js');

var SearchMusic = React.createClass({
	render: function() {
		return (	<div>
					<input ref="searchTerm"></input>
					<button type="button" className="btn btn-primary" onClick={this._handleClick}>Search</button>
				</div>);
	},
	_handleClick: function() {
		AppActions.searchMusic(this.refs.searchTerm.getDOMNode().value);
	}
});

module.exports = SearchMusic;