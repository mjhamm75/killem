import React, { Component } from 'react';
import Track from './Track';

class SearchResults extends Component {
	render() {
		var artists = <div>No Artists Found</div>;
		var tracks = <div>No Tracks Found</div>;
		var playlist = <div>Playlist is empty</div>;
		var data = this.props.searchResults.data;
		if(data) {
			var artists = this.renderArtists(data.data.artists.items);
			var tracks = this.renderTracks(data.data.tracks.items);
			var playlist = this.renderPlaylist(data.data.playlist.tracks);
		}
		return (
			<div>
				<h2>Playlist</h2>
					{playlist}
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
				return <Track track={track} addTrack={this.props.addTrack}/>
			});			
		} else {
			return <div>No Tracks Found</div>;
		}
	}

	renderPlaylist(playlist) {
		if(playlist.length > 0) {
			return playlist.map(track => {
				<div>{track.name}</div>
			})
		} else {
			return <div>Playlist is empty</div>;
		}
	}
}

export default SearchResults;