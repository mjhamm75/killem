import axios from 'axios';
import { Observable } from 'rx';
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

function getCreatePlaylistConfig(userName, accessToken, playlist) {
    return {
        url: 'https://api.spotify.com/v1/users/' + userName + '/playlists',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(playlist)
    }
}

export function createPlaylist(name, userId) {
    var playlist = {
        name: name,
        public: true
    };

    return Observable
        .fromPromise(knex('users').where({id: userId}).select('user_name', 'access_token'))
        .flatMap(res => res)
        .map(res => getCreatePlaylistConfig(res.user_name, res.access_token, playlist))
        .concatMap(axios)
        .concatMap(res => knex('playlists').insert({ playlist_id: res.data.id, playlist_name: name, active_playlist: true, user_id: userId }))
        .toPromise();
}

function getPlaylistsConfig(userName, playlistId, accessToken) {
    return {
        url: `https://api.spotify.com/v1/users/${userName}/playlists/${playlistId}/tracks`,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'            
        }
    }
}

export function getPlaylist(userId) {
    return Observable
        .fromPromise(knex('users').where({id: userId}).select('user_name', 'playlist_id', 'access_token'))
        .flatMap(res => res)
        .map(res => getPlaylistsConfig(res.user_name, res.playlist_id), res.access_token)
        .concatMap(axios)
        .toPromise();
}

export function getPlaylists(userId) {
    return knex('playlists').where({user_id: userId}).select('playlist_name', 'playlist_id');
}

function addTrackConfig(userName, playlistId, trackId, accessToken) {
    return {
        url: `https://api.spotify.com/v1/users/${userName}/playlists/${playlistId}/tracks?uris=spotify:track:${trackId}`,
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    }
}

export function addTrack(trackId, userId) {
    return Observable
        .fromPromise(knex('users').where({id: userId}).select('user_name', 'playlist_id', 'access_token'))
        .flatMap(res => res)
        .map(res => addTrackConfig(res.user_name, res.playlist_id, trackId, res.access_token))
        .concatMap(axios)
        .toPromise();
}

function getCallbackConfig(code) {
    return {
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
}

import request from 'request';
export function callback(code, cb) {
    request.post(getCallbackConfig(code), (error, response, body) => {
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

function getRefreshTokenConfig(refreshToken) {
    return {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        },
        json: true
    };
}

export function refreshToken(userId, cb) {
    
    knex('users').where({ id: userId }).select('refresh_token').then(result => {
        let refresh_token = result[0].refresh_token

        request.post(getRefreshTokenConfig(refresh_token), (error, response, body) => {
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