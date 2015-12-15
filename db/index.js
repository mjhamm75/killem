import axios from 'axios';
import { Observable } from 'rx';
import { generateRandomString } from './../utils/random.utils.js';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPE, knexInit } from './../config';

var querystring = require('querystring');
var knex = knexInit();

export function activatePlaylist(playlistId, userId) {
    console.log(playlistId);
    return Observable.fromPromise(knex('playlists').where({ user_id: userId }).update({ active_playlist: false }))
        .concatMap(knex('playlists').where({ user_id: userId, playlist_id: playlistId }).update({ active_playlist: true }))
        .concatMap(knex.from('users').innerJoin('playlists', 'users.id', 'playlists.user_id').where({"users.id": userId}))
        .toPromise();
}

export function searchTracks(term) {
    var url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=artist,track`;
    return axios.get(url);
}


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

function getMe(accessToken) {
    return Observable.fromPromise(axios({
        url: 'https://api.spotify.com/v1/me',
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken },
        json: true
    }));
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
        .fromPromise(knex.from('users').innerJoin('playlists', 'users.id', 'playlists.user_id').where({"users.id": userId}))
        .flatMap(res => res)
        .map(res => getPlaylistsConfig(res.user_name, res.playlist_id, res.access_token))
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

export function addTrack(trackId, userId, playlistId) {
    return Observable
        .fromPromise(knex.from('users').innerJoin('playlists', 'users.id', 'playlists.user_id').where({"users.id": userId}))
        .flatMap(res => res)
        .map(res => addTrackConfig(res.user_name, res.playlist_id, trackId, res.access_token))
        .concatMap(axios)
        .toPromise();
}

function getCallbackConfig(code) {
    return {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        }),
        json: true
    };
}

export function callback(code, cb) {
    var config = getCallbackConfig(code);
    return Observable.fromPromise(axios(config))
        .map(res => {
            return {
                accessToken: res.data.access_token,
                refreshToken: res.data.refresh_token                
            }
        })
        .flatMap(res => {
            return getMe(res.accessToken).map(me => {
                res.me = me.data;
                return res;
            })
        })
        .concatMap(res => knex('users').insert({user_name: res.me.id, access_token: res.accessToken, refresh_token: res.refreshToken}))
        .toPromise();
}

function getRefreshTokenConfig(refreshToken) {
    return {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }),
        json: true
    };
}

export function refreshToken(userId, cb) {
    return Observable.fromPromise(knex('users').where({ id: userId }).select('refresh_token'))
        .flatMap(res => res)
        .map(res => getRefreshTokenConfig(res.refresh_token))
        .concatMap(axios)
        .map(res => res.data.access_token)
        .concatMap(res => knex('users').where('id', '=', userId).update({ access_token: res }))
        .toPromise();
}

export function getTokens() {
    return knex('users').where({ id: 1 }).select('access_token', 'refresh_token');
}