import React, { Component } from 'react';

class Playlist extends Component {
	render() {
		var songs = this.props.songs;
		if(songs.length > 0) {
			var playlistDom = this.renderPlaylist(songs);
			return (
				<div>
					{playlistDom}
				</div>
			)
		} else {
			return <div>Playlist is empty</div>;
		}
	}

	renderPlaylist(songs) {
		return songs.map(song => {
				return <div key={song.id}>{song.track.name} - {song.track.artists[0].name}</div>
		});		
	}
}

export default Playlist;