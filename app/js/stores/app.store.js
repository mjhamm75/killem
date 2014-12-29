var AppDispatcher = require('../dispatcher/app.dispatcher.js');
var AppConstants = require('../constants/app.constants.js');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var request = require('superagent');

var CHANGE_EVENT = "change";

var _catalog = [
	{id: 1, title: 'Widget #1', cost: 1},
	{id: 2, title: 'Widget #2', cost: 2},
	{id: 3, title: 'Widget #3', cost: 3},
	{id: 4, title: 'Widget #4', cost: 4}
];

var _cartItems = [];

var results = [];

function _increaseItem(index) {
	_cartItems[index].qty++;
}

function _decreaseItem(index) {
	if(_cartItems[index].qty > 1) {
		_cartItems[index].qty--;
	} else {
		_removeItem(index);
	}
}

function _addItem(item) {
	if(!item.inCart) {
		item.qty =1;
		item.inCart = true;
		_cartItems.push(item);
	} else {
		_cartItems.forEach(function(cartItem, i) {
			if(cartItem.id === item.id) {
				_increaseItem(i);
			}
		});
	}
}

function _getDetails(url, callback){
	request.get(url)
			.end(function(res) {
				callback(res);
			});
}

function _login(auth, callback) {
	request.get('/login')
		.end(function(res) {
			debugger;
			callback(res);
		});
}

function _removeItem(index) {
	_cartItems[index].inCart = false;
	_cartItems.splice(index, 1);
}

function _searchMusic(searchTerm, callback) {
	request.get('https://api.spotify.com/v1/search')
		.query({q: searchTerm})
		.query({type: 'artist'})
		.end(function(res) {
			callback(res);
		});
}

var AppStore = merge(EventEmitter.prototype, {
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getCart: function() {
		return _cartItems;
	},

	getCatalog: function() {
		return _catalog;
	},

	getResults: function() {
		return results;
	},

	dispatcherIndex:AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.actionType) {
			case AppConstants.ADD_ITEM:
				_addItem(payload.action.item);
				break;

			case AppConstants.REMOVE_ITEM:
				_removeItem(payload.action.index);
				break;

			case AppConstants.INCREASE_ITEM:
				_increaseItem(payload.action.index);
				break;

			case AppConstants.DECREASE_ITEM:
				_decreaseItem(payload.action.index);
				break;

			case AppConstants.SEARCH_MUSIC:
				_searchMusic(payload.action.searchTerm, function(res) {
					results = res.body.artists.items;
					AppStore.emitChange();
				});
				break;
			case AppConstants.GET_DETAILS:
				_getDetails(payload.action.url, function(res) {
					console.log(res);
				});
				break;
			case AppConstants.LOGIN:
				_login(payload.action.auth, function(res) {
					debugger;
					console.log(res);
				});
				break;
		}

		AppStore.emitChange();

		return true;
	})
});

module.exports = AppStore;