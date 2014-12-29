var React = require('react');
var AppActions = require('../actions/app.actions.js');
var AppStore = require('./../stores/app.store.js');

function getSearchResults() {
	return {results: AppStore.getResults()};
}

var SearchResults = React.createClass({
	getInitialState: function() {
		return getSearchResults();
	},
	componentWillMount: function() {
		 AppStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getSearchResults());
	},
	_handleClick: function(url) {
		AppActions.getDetails(url);
	},
	render: function() {
		var that = this;
		if(this.state.results) {
			var results = this.state.results.map(function(result) {
				return (<li key={result.id}><a href="#" onClick={that._handleClick.bind(that, result.href)}>{result.name}</a></li>);
			});
			return (	<ul className="list-unstyled">{results}</ul>);
		} else {
			return <div>No Current Results</div>;
		}
	}
});

module.exports = SearchResults;