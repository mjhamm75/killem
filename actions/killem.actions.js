import * as AppConstants from './../constants/killem.constants.js';
import { isoFetch } from './../utils/fetch.utils.js';

export function login(history) {	
	return dispatch => {
		dispatch(loginRequest());
		return isoFetch('/log-in')
			.then(response => {
				dispatch(loginSuccessful(history, response.url));
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
		return isoFetch('/me').then(response => {
			dispatch(getMeSuccess(response.body))
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
		return isoFetch('/tokens')
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

export function createPlaylist() {
	return (dispatch, getState) => {
		var playlist = {
			name: 'CrackList',
			public: true
		};
		dispatch(createPlaylistRequest());
		return isoFetch('https://api.spotify.com/v1/users/' + getState().me.id + '/playlists', {
			method: 'post',
			headers: {
				'Authorization': 'Bearer ' + getState().tokens.access_token,
				'Content-Type': 'application/json'	
			},
			body: JSON.stringify(playlist)
		})
		.then(playlist => dispatch(createPlaylistSuccessful(playlist)));
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