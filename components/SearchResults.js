import React, { Component } from 'react';
import Track from './Track';
import Artists from './Artists';

class SearchResults extends Component {
	render() {
		var artists = [];
		var tracks = <div>No Tracks Found</div>;
		var playlist = <div>Playlist is empty</div>;
		var data = this.props.searchResults.data;
		if(data) {
			artists = data.data.artists.items;
			var tracks = this.renderTracks(data.data.tracks.items);
			if(this.props.playlist.data) {
				playlist = this.renderPlaylist(this.props.playlist.data);
			}
		}
		return (
			<div>
				<h2>Playlist</h2>
					{playlist}
				<h2>Artists</h2>
					<Artists artists={artists} />
				<h2>Tracks</h2>
					{tracks}
			</div>
		)
	}

	renderTracks(tracks) {
		if(tracks.length > 0) {
			return tracks.map(track => {
				return <Track key={track.id} track={track} addTrack={this.props.addTrack}/>
			});			
		} else {
			return <div>No Tracks Found</div>;
		}
	}

	renderPlaylist(playlist) {
		if(playlist.length > 0) {
			return playlist.map(track => {
				return <div key={track.id}>{track.track.name} - {track.track.artists[0].name}</div>
			})
		} else {
			return <div>Playlist is empty</div>;
		}
	}
}

export default SearchResults;