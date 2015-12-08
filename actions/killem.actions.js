import * as AppConstants from './../constants/killem.constants.js';
import axios from 'axios';

export function login(history) {	
	return dispatch => {
		dispatch(loginRequest());
		return axios.get('/log-in')
			.then(response => {
				dispatch(loginSuccessful(history, response.data.url));
			})
	}
}

function loginRequest() {
	return {
		type: AppConstants.LOGIN_REQUEST
	}
}

function loginSuccessful(history, url) {
	location.replace(url);
	return {
		type: AppConstants.LOGIN_SUCCESS,
		url: url
	}
}

export function getMe() {
	return dispatch => {
		dispatch(getMeRequest());
		return axios.get('/me').then(response => {
			dispatch(getMeSuccess(response))
		})		
	}
}

function getMeRequest() {
	return {
		type: AppConstants.GET_ME_REQUEST
	}
}

function getMeSuccess(me) {
	return {
		type: AppConstants.GET_ME_SUCCESS,
		me
	}
}

export function getTokens() {
	return dispatch => {
		dispatch(getTokensRequest())
		return axios.get('/tokens')
			.then(tokens => {
				dispatch(getTokensSuccess(tokens))
			});
	}
}

function getTokensRequest() {
	return {
		type: AppConstants.GET_TOKENS_REQUEST
	}
}

function getTokensSuccess(tokens) {
	return {
		type: AppConstants.GET_TOKENS_SUCCESS,
		tokens
	}
}

export function createPlaylist(name) {
	return (dispatch, getState) => {
		dispatch(createPlaylistRequest());
		return axios.post(`/createPlaylist/${name}`)
			.then(playlist => {
				dispatch(createPlaylistSuccessful(playlist));
				dispatch(getPlaylists());
			});
	}
}

function createPlaylistRequest() {
	return {
		type: AppConstants.CREATE_PLAYLIST_REQUEST
	}
}

function createPlaylistSuccessful(playlist) {
	return {
		type: AppConstants.CREATE_PLAYLIST_SUCCESSFUL,
		playlist
	}
}

export function searchTracks(term) {
	return dispatch => {
		dispatch(searchTracksRequest());
		return axios.post('/search-tracks', {
			term
		}).then(function(tracks){
			dispatch(searchTrackSuccess(tracks));
		}).catch(err => console.log(err));
	}
}

function searchTracksRequest() {
	return {
		type: AppConstants.SEARCH_TRACKS_REQUEST
	}
}

function searchTrackSuccess(tracks) {
	return {
		type: AppConstants.SEARCH_TRACKS_SUCCESS,
		tracks
	}
}

function searchTracksFail() {
	return {
		type: AppConstants.SEARCH_TRACKS_FAIL
	}
}

export function addTrack(trackId) {
	return dispatch => {
		dispatch(addTrackRequest());
		axios.post('/add-track', {
			trackId: trackId
		}).then(function(res) {
			dispatch(addTrackSuccess(res));
			dispatch(updatePlaylist());
		})
	}
}

function addTrackRequest() {
	return {
		type: AppConstants.ADD_TRACK_REQUEST
	}
}

function addTrackSuccess() {
	return {
		type: AppConstants.ADD_TRACK_SUCCESS
	}
}

function addTrackFail() {
	return {
		type: AppConstants.ADD_TRACK_FAIL
	}
}

function updatePlaylist() {
	return dispatch => {
		dispatch(updatePlaylistRequest())
		axios.get('playlist')
			.then(res => {
				dispatch(updatePlaylistSuccess(res))
			})
			.catch(() => updatePlaylistFail())
	}
}

function updatePlaylistRequest() {
	return {
		type: AppConstants.UPDATE_PLAYLIST_REQUEST
	}
}

function updatePlaylistFail() {
	return {
		type: AppConstants.UPDATE_PLAYLIST_FAIL
	}
}

function updatePlaylistSuccess(playlist) {
	return {
		type: AppConstants.UPDATE_PLAYLIST_SUCCESS,
		playlist
	}
}

export function getPlaylists() {
	return dispatch => {
		dispatch(getPlaylistsRequest())
		axios.get('playlists')
			.then(res => {
				dispatch(getPlaylistsSuccess(res))
			});
	}
}

function getPlaylistsRequest() {
	return {
		type: AppConstants.GET_PLAYLISTS_REQUEST
	}
}

function getPlaylistsSuccess(playlists) {
	return {
		type: AppConstants.GET_PLAYLISTS_SUCCESS,
		playlists
	}
}