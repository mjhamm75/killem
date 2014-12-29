var AppConstants = require('../constants/app.constants.js');
var AppDispatcher = require('../dispatcher/app.dispatcher.js');

var AppActions = {
	addItem: function(item) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.ADD_ITEM,
			item: item
		});
	},

	removeItem: function(index) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.REMOVE_ITEM,
			index: index
		});
	},

	increaseItem: function(index) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.INCREASE_ITEM,
			index: index
		});
	},

	decreaseItem: function(index) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.DECREASE_ITEM,
			index: index
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

	login: function(auth) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.LOGIN,
			auth: auth
		});
	}
};

module.exports = AppActions;