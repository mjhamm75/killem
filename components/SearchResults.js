import React, { Component } from 'react';

class Tracks extends Component {
	render() {
		var artists = null;
		var tracks = null;
		var data = this.props.searchResults.data;
		if(data) {
			var artists = this.renderArtists(data.artists);
			var tracks = this.renderTracks(data.tracks);
		}
		return (
			<div>
				<h2>Artists</h2>
					{artists}
				<h2>Tracks</h2>
					{tracks}
			</div>
		)
	}

	renderArtists(artists) {
		return artists.map(artist => {
			return <div>{artist.name}</div>
		});
	}

	renderTracks(tracks) {
		return tracks.map(track => {
			return <div>{track.name}</div>
		});
	}
}

export default Tracks;