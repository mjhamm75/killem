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
	return dispatch => {
		dispatch(createPlaylistRequest());
		return isoFetch('/test')
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

export function getTracks() {
	return {
		actionType: AppConstants.GET_TRACKS
	}
}

export function login() {
	return dispatch => {
		dispatch(loginRequest());
		return isoFetch('/login')
			.then(url => dispatch(loginSuccessful(url)))
	}
}

function loginRequest() {
	return {
		type: AppConstants.LOGIN_REQUEST
	}
}

function loginSuccessful(url) {
	// Where does this belong?
	location.replace(url.url)
	return {
		type: AppConstants.LOGIN_SUCCESS,
		url: url
	}
}

export function removeTrack(trackId, position) {
	return {
		actionType: AppConstants.REMOVE_TRACK,
		trackId,
		position
	}
}