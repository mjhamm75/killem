import axios from 'axios';
import { generateRandomString } from './../utils/random.utils.js';

export function searchTracks(term) {
	var url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=artist,track`;
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

export function createPlaylist(name, me) {
    var playlist = {
        name: name,
        public: true
    };

    return axios({
        url: 'https://api.spotify.com/v1/users/' + me.id + '/playlists',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokens.access_token,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(playlist)
    })
}

export function getPlaylist(tokens) {
    var url = `https://api.spotify.com/v1/users/${me.id}/playlists/${localPlaylist.data.id}/tracks`;
    return axios({
        url: url,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokens.access_token,
            'Content-Type': 'application/json'            
        }
    })
}

export function addTrack() {
    var url = `https://api.spotify.com/v1/users/${me.id}/playlists/${localPlaylist.data.id}/tracks?uris=spotify:track:${trackId}`;
    return axios({
        url: url,
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokens.access_token,
            'Content-Type': 'application/json'
        }
    })
}


var knex = require('knex')({
    client: 'pg',
    connection: 'postgres://killem:killem@localhost/killem'
});
import request from 'request';
var client_id = '3a40b9387b3c41b6847eefb37660f269';
var client_secret = 'ad92eee0fb2743ea8b5974ae2ab93db1';
var redirect_uri = 'http://localhost:8888/callback';
export function callback(code, tokens, cb) {
    // var state = req.query.state || null;
    // var storedState = req.cookies ? req.cookies[stateKey] : null;

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    console.log('post request')
    request.post(authOptions, (error, response, body) => {
        console.log('post response')
        tokens.access_token = body.access_token;
        tokens.refresh_token = body.refresh_token;

        getMe(tokens).then(me => {
            console.log('get repsonse')
            knex('users').insert({user_name: me.data.id, access_token: tokens.access_token, refresh_token: tokens.refresh_token}).then(result => {
                console.log('db reuslt')
                cb();
            })
        })
    });
}