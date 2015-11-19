import axios from 'axios';
import { generateRandomString } from './../utils/random.utils.js';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPE, knexInit } from './../config';

var knex = knexInit();

export function searchTracks(term) {
	var url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=artist,track`;
	return axios.get(url);
}

var querystring = require('querystring');

export function login(state) {
    var result = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: SCOPE,
            redirect_uri: REDIRECT_URI,
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

export function createPlaylist(name, userId) {
    var playlist = {
        name: name,
        public: true
    };

    return knex('users').where({id: userId}).select('user_name', 'access_token').then(res => {
        return axios({
            url: 'https://api.spotify.com/v1/users/' + res[0].user_name + '/playlists',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + res[0].access_token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(playlist)
        }).then(res => {
            return knex('users').where('id', '=', userId).update({ playlist_id: res.data.id })
        });
    });

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

export function addTrack(trackId) {
    return knex('users').where({id: userId}).select('user_name', 'playlist_id', 'access_token').then(res => {
        var url = `https://api.spotify.com/v1/users/${res[0].user_name}/playlists/${res[0].playlist_id}/tracks?uris=spotify:track:${trackId}`;
        return axios({
            url: url,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + res[0].access_token,
                'Content-Type': 'application/json'
            }
        })
    });
}

import request from 'request';
export function callback(code, cb) {
    // var state = req.query.state || null;
    // var storedState = req.cookies ? req.cookies[stateKey] : null;

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        var tokens = {
            access_token: body.access_token,
            refresh_token: body.refresh_token
        }

        getMe(tokens).then(me => {
            knex('users').insert({user_name: me.data.id, access_token: body.access_token, refresh_token: body.refresh_token}).then(result => {
                cb();
            })
        })
    });
}

export function refreshToken(userId, cb) {
    
    knex('users').where({ id: userId }).select('refresh_token').then(result => {
        let refresh_token = result[0].refresh_token

        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            json: true
        };

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token;
                
                knex('users').where('id', '=', userId).update({ access_token: access_token }).then(result => {
                    cb({
                        updated: true
                    })
                })
            }
        });
    })
}

export function getTokens() {
    return knex('users').where({ id: 1 }).select('access_token', 'refresh_token');
}