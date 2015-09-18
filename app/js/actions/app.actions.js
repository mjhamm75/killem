import * as AppConstants from '../constants/app.constants.js';
var AppDispatcher = require('../dispatcher/app.dispatcher.js');

export function addToPlaylist(track) {
	AppDispatcher.handleViewAction({
		actionType: AppConstants.ADD_TO_PLAYLIST,
		track
	});
}

export function searchMusic(searchTerm) {
	AppDispatcher.handleViewAction({
		actionType: AppConstants.SEARCH_MUSIC,
		searchTerm
	});
}

export function getDetails(url) {
	AppDispatcher.handleViewAction({
		actionType: AppConstants.GET_DETAILS,
		url
	});
}

export function getMe() {
	AppDispatcher.handleViewAction({
		actionType: AppConstants.GET_ME
	});
}

export function getPlaylists() {
	AppDispatcher.handleViewAction({
		actionType: AppConstants.GET_PLAYLISTS
	});
}

export function createPlaylist() {
	AppDispatcher.handleViewAction({
		actionType: AppConstants.CREATE_PLAYLIST
	});
}

export function getTracks() {
	AppDispatcher.handleViewAction({
		actionType: AppConstants.GET_TRACKS
	});
}

export function login() {
	AppDispatcher.handleViewAction({
		actionType: AppConstants.LOGIN
	});
}

export function removeTrack(trackId, position) {
	AppDispatcher.handleViewAction({
		actionType: AppConstants.REMOVE_TRACK,
		trackId,
		position
	});
}