import React, { Component } from 'react';
import Track from './Track';
import Artists from './Artists';
import Tracks from './Tracks';
import Playlist from './Playlist';

class SearchResults extends Component {
	render() {
		var artists = [];
		var tracks = [];
		var playlist = [];
		var data = this.props.searchResults.data;
		if(data) {
			artists = data.data.artists.items;
			tracks = data.data.tracks.items;
			if(this.props.playlist.data) {
				playlist = this.props.playlist.data;
			}
		}
		return (
			<div>
				<h2>Playlist</h2>
					<Playlist playlist={playlist} />
				<h2>Artists</h2>
					<Artists artists={artists} />
				<h2>Tracks</h2>
					<Tracks tracks={tracks} addTrack={this.props.addTrack}/>
			</div>
		)
	}
}

export default SearchResults;