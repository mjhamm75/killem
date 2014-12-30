var AppConstants = require('../constants/app.constants.js');
var AppDispatcher = require('../dispatcher/app.dispatcher.js');

var AppActions = {
	addToPlaylist: function(track) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.ADD_TO_PLAYLIST,
			track: track
		});
	},

	searchMusic: function(searchTerm) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SEARCH_MUSIC,
			searchTerm: searchTerm
		});
	},

	getDetails: function(url, type) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.GET_DETAILS,
			url: url
		});
	},

	getMe: function() {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.GET_ME
		});
	},

	getPlaylists: function() {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.GET_PLAYLISTS
		});
	},

	createPlaylist: function() {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.CREATE_PLAYLIST
		});
	},

	getTracks: function() {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.GET_TRACKS
		});
	},

	login: function() {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.LOGIN
		});
	},

	removeTrack: function(trackId, position) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.REMOVE_TRACK,
			trackId: trackId,
			position: position
		});
	}
};

module.exports = AppActions;