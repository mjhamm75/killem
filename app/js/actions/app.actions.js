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

export function getPlaylists() {
	return {
		actionType: AppConstants.GET_PLAYLISTS
	}
}

export function getTracks() {
	return {
		actionType: AppConstants.GET_TRACKS
	}
}

export function removeTrack(trackId, position) {
	return {
		actionType: AppConstants.REMOVE_TRACK,
		trackId,
		position
	}
}