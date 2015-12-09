import React, { Component } from 'react';
import Track from './Track.js';

class Tracks extends Component {
	render() {
		var tracks = this.props.tracks;
		if(tracks.length > 0) {
			var tracksDom = this.renderTracks(tracks);
			return (
				<div>
					{tracksDom}
				</div>
			)
		} else {
			return <div>No Tracks Found</div>;
		}
	}

	renderTracks(tracks) {
		return tracks.map(track => {
				return <Track key={track.id} track={track} addTrack={this.props.addTrack}/>
		});
	}
}

export default Tracks;