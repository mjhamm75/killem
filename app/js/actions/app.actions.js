import * as AppConstants from '../constants/app.constants.js';	
import { isoFetch } from './../utils/fetch.utils.js';
var AppDispatcher = require('../dispatcher/app.dispatcher.js');

export function addToPlaylist(track) {
	return {
		actionType: AppConstants.ADD_TO_PLAYLIST,
		track
	}
}

export function searchMusic(searchTerm) {
	return {
		actionType: AppConstants.SEARCH_MUSIC,
		searchTerm
	}
}

export function getDetails(url) {
	return {
		actionType: AppConstants.GET_DETAILS,
		url
	}
}

export function getMe() {
	return {
		actionType: AppConstants.GET_ME
	}
}

export function getPlaylists() {
	return {
		actionType: AppConstants.GET_PLAYLISTS
	}
}

export function createPlaylist() {
	return {
		actionType: AppConstants.CREATE_PLAYLIST
	}
}

export function getTracks() {
	return {
		actionType: AppConstants.GET_TRACKS
	}
}

export function login() {
	return dispatch => {
		dispatch(loginRequest());
		return isoFetch('/login')
			.then(json => dispatch(loginSuccessful(json)))
	}
}

function loginRequest() {
	return {
		type: AppConstants.LOGIN_REQUEST
	}
}

function loginSuccessful(json) {
	return {
		type: AppConstants.LOGIN_SUCCESS,
		json: json
	}
}

export function removeTrack(trackId, position) {
	return {
		actionType: AppConstants.REMOVE_TRACK,
		trackId,
		position
	}
}