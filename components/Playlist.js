import React, { Component } from 'react';

class Playlist extends Component {
	render() {
		var playlist = this.props.playlist;
		if(playlist.length > 0) {
			var playlistDom = this.renderPlaylist(playlist);
			return (
				<div>
					{playlistDom}
				</div>
			)
		} else {
			return <div>Playlist is empty</div>;
		}
	}

	renderPlaylist(playlist) {
		return playlist.map(track => {
				return <div key={track.id}>{track.track.name} - {track.track.artists[0].name}</div>
		});		
	}
}

export default Playlist;