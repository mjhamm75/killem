import React, { Component } from 'react';

class Artists extends Component {
	render() {
		var artists = this.props.artists;
		if(artists.length > 0) {
			var artistsDom = this.renderArtists(artists);
			return (
				<div>
					{artistsDom}
				</div>
			)
		} else {
			return <div>No Artists Found</div>;
		}
	}

	renderArtists(artists) {
		return artists.map(artist => {
			return <div key={artist.id}>{artist.name}</div>
		});						
	}
}

export default Artists;