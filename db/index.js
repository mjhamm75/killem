import axios from 'axios';
import { generateRandomString } from './../utils/random.utils.js';

export function searchTracks(term) {
	var url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=artist,track`;
	console.log(url);
	return axios.get(url);
}

export function login() {
	var stateKey = 'spotify_auth_state';
	var state = generateRandomString(16);
	res.cookie(stateKey, state);

	var scope = 'user-read-private user-read-email playlist-modify-public';
	var result = 'https://accounts.spotify.com/authorize?' +
	querystring.stringify({
		response_type: 'code',
		client_id: client_id,
		scope: scope,
		redirect_uri: redirect_uri,
		state: state
	});

	return result;
}