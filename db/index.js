import axios from 'axios';
import { generateRandomString } from './../utils/random.utils.js';

export function searchTracks(term) {
	var url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=artist,track`;
	console.log(url);
	return axios.get(url);
}

var client_id = '3a40b9387b3c41b6847eefb37660f269';
var client_secret = 'ad92eee0fb2743ea8b5974ae2ab93db1';
var redirect_uri = 'http://localhost:8888/callback';
var querystring = require('querystring');
export function login(state) {
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

export function getMe(tokens) {
    return axios({
        url: 'https://api.spotify.com/v1/me',
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + tokens.access_token },
        json: true
    });
}