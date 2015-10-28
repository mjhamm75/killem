import * as AppConstants from './../constants/killem.constants.js';
import { isoFetch } from './../utils/fetch.utils.js';
import axios from 'axios';

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
		dispatch(createPlaylistRequest());
		return axios.post('/createPlaylist/Cracklist')
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

export function searchTracks(term) {
	return (dispatch) => {
		dispatch(searchTracksRequest());
		return axios.post('/search-tracks', {
			term
		})
		.then(tracks => dispatch(searchTracksSuccess(tracks)))
		.catch(err => dispatch(searchTracksFail()));
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