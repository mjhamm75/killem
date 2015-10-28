import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchTracks } from './../actions/killem.actions.js';

class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.searchTracks = this.searchTracks.bind(this);
	}

	render() {
		return (
			<div>
				<h1>Search</h1>
				<input ref="searchTerm"/>
				<button onClick={this.searchTracks}>Search</button>
			</div>
		)
	}

	searchTracks(term) {
		this.props.dispatch(searchTracks(this.refs.searchTerm.value))
	}
}

function mapStateToProps(state) {
	return {
		router: state.router
	}
}

export default connect(mapStateToProps)(SearchPage);