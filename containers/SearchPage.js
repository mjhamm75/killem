import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchTracks, addTrack } from './../actions/killem.actions.js';
import SearchResults from './../components/SearchResults';

class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.searchTracks = this.searchTracks.bind(this);
		this.addTrack = this.addTrack.bind(this);
	}

	render() {
		return (
			<div>
				<h1>Search</h1>
				<input ref="searchTerm"/>
				<button onClick={this.searchTracks}>Search</button>
				<SearchResults searchResults={this.props.searchResults} addTrack={this.addTrack} playlist={this.props.playlist}/>
			</div>
		)
	}

	addTrack(trackId) {
		this.props.dispatch(addTrack(trackId));
	}

	searchTracks(term) {
		this.props.dispatch(searchTracks(this.refs.searchTerm.value))
	}
}

function mapStateToProps(state) {
	return {
		playlist: state.playlist,
		router: state.router,
		searchResults: state.searchResults
	}
}

export default connect(mapStateToProps)(SearchPage);