import axios from 'axios';

export function searchTracks(term) {
	var url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=artist,track`;
	console.log(url);
	return axios.get(url);
}