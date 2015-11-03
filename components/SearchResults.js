import React, { Component } from 'react';

class Tracks extends Component {
	render() {
		var artists = <div>No Artists Found</div>;
		var tracks = <div>No Tracks Found</div>;
		var data = this.props.searchResults.data;
		if(data) {
			var artists = this.renderArtists(data.data.artists.items);
			var tracks = this.renderTracks(data.data.tracks.items);
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
		if(artists.length > 0) {
			return artists.map(artist => {
				return <div>{artist.name}</div>
			});			
		} else {
			return <div>No Artists Found</div>;
		}
	}

	renderTracks(tracks) {
		if(tracks.length > 0) {
			return tracks.map(track => {
				return <div>{track.name}</div>
			});			
		} else {
			return <div>No Tracks Found</div>;
		}
	}
}

export default Tracks;