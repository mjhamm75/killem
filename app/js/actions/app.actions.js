import * as AppConstants from '../constants/app.constants.js';	
import { isoFetch } from './../utils/fetch.utils.js';

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

export function getMe() {
	return dispatch => {
		dispatch(getMeRequest());
		return isoFetch('/me').then(me => {
			dispatch(getMeSuccess(me))
		})		
	}
}

export function getPlaylists() {
	return {
		actionType: AppConstants.GET_PLAYLISTS
	}
}

export function createPlaylist() {
	var playlist = {
		name: 'CrackList',
		public: true
	};

	return dispatch => {
		dispatch(createPlaylistRequest());
		return isoFetch('https://api.spotify.com/v1/users/' + me.id + '/playlists', {
			method: 'post',
			headers: {
				'Authorization': 'Bearer ' + tokens.access_token,
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

export function getTracks() {
	return {
		actionType: AppConstants.GET_TRACKS
	}
}

export function login(history) {	
	return dispatch => {
		dispatch(loginRequest());
		return isoFetch('/log-in')
			.then(response => dispatch(loginSuccessful(history, response.url)))
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

export function removeTrack(trackId, position) {
	return {
		actionType: AppConstants.REMOVE_TRACK,
		trackId,
		position
	}
}