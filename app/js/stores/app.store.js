var AppDispatcher = require('../dispatcher/app.dispatcher.js');
var AppConstants = require('../constants/app.constants.js');
var EventEmitter = require('events').EventEmitter;
var request = require('superagent');
var _ = require('lodash');

var CHANGE_EVENT = "change";

var results = [];

var tokens = {
	access_token: {},
	refresh_token: {}
};

var me = {};
var playlist = [];
var playlists = {};
var playlistId = {};

function _getDetails(url, callback){
	request.get(url)
			.end(function(res) {
				callback(res);
			});
}

function _getMe(callback) {
	if(_.isEmpty(me)) {
		request.get('/tokens')
			.end(function(res) {
				tokens = res.body;

				request.get('https://api.spotify.com/v1/me')
					.set('Authorization', 'Bearer ' + tokens.access_token)
					.end(function(res) {
						me = res.body;
						callback(res.body);
					});
			});
	}
}

function _getSongsFromPlaylist(callback) {
	request.get('https://api.spotify.com/v1/users/' + me.id + '/playlists/' + playlistId + '/tracks')
		.set('Authorization', 'Bearer ' + tokens.access_token)
		.end(function(res) {
			// playlist = res.body;
			callback(res.body);
		});
}

function _getPlaylists(callback) {
	request.get('https://api.spotify.com/v1/users/' + me.id + '/playlists')
		.set('Authorization', 'Bearer ' + tokens.access_token)
		.end(function(res) {
			playlists = res.body;
			callback(res.body);
		});
}

function _createPlaylist(callback) {
	var playlist = {
		name: 'CrackList',
		public: true
	};
	request.post('https://api.spotify.com/v1/users/' + me.id + '/playlists')
		.set('Authorization', 'Bearer ' + tokens.access_token)
		.set('Content-Type', 'application/json')
		.send(playlist)
		.end(function(res) {
			playlists = res.body;
			playlistId = res.body.id;
			callback(res.body);
			location.hash = '/juking';
		});
}

function _getTracks(callback) {
	request.get('https://api.spotify.com/v1/users/' + me.id + '/playlists/' + playlistId + '/tracks')
		.set('Authorization', 'Bearer ' + tokens.access_token)
		.end(function(res) {
			callback(res.body);
		});
}

function _addTrack(track, callback) {
	var uris = 'spotify:track:' + track.id;
	request.post('https://api.spotify.com/v1/users/' + me.id + '/playlists/' + playlistId + '/tracks')
		.set('Authorization', 'Bearer ' + tokens.access_token)
		.set('Content-Type', 'application/json')
		.query({ uris: uris})
		.end(function(res) {
			var song = {
				id: track.id,
				artist: track.artists[0].name,
				name: track.name
			};
			playlist.push(song);
			callback(res.body);
		});
}

function _removeTrack(trackId, position, callback) {
	var trackToBeRemoved = {
		tracks: [{
			uri: 'spotify:track:' + trackId,
			positions: [position]
		}]
	};
	request.del('https://api.spotify.com/v1/users/' + me.id + '/playlists/' + playlistId + '/tracks')
		.set('Authorization', 'Bearer ' + tokens.access_token)
		.set('Content-Type', 'application/json')
		.send(trackToBeRemoved)
		.end(function(res) {
			playlist = playlist.filter(function(song){
				return song.id !== trackId;
			});
			callback(res.body);
		});
}

function _login(callback) {
	request.get('/login')
		.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
		.end(function(res) {
			location.replace(res.text);
		});
}

function _removeItem(index) {
	_cartItems[index].inCart = false;
	_cartItems.splice(index, 1);
}

function _searchMusic(searchTerm, callback) {
	request.get('https://api.spotify.com/v1/search')
		.query({q: searchTerm})
		.query({type: 'track'})
		.end(function(res) {
			callback(res);
		});
}

var AppStore = _.extend(EventEmitter.prototype, {
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

	getSongsFromPlaylist: function() {
		// _getSongsFromPlaylist(function(res) {
		// 	return res;
		// });
		return playlist;
	},

	dispatcherIndex:AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.actionType) {
			case AppConstants.ADD_TO_PLAYLIST:
				_addTrack(payload.action.track, function(res) {
					AppStore.emitChange();
				});
				break;
			case AppConstants.SEARCH_MUSIC:
				_searchMusic(payload.action.searchTerm, function(res) {
					results = res.body.tracks.items;
					AppStore.emitChange();
				});
				break;
			case AppConstants.GET_DETAILS:
				_getDetails(payload.action.url, function(res) {
					console.log(res);
				});
				break;
			case AppConstants.LOGIN:
				_login(function(res) {
					console.log(res);
				});
				break;
			case AppConstants.GET_ME:
				_getMe(function(res) {
					console.log(res);
				});
				break;
			case AppConstants.GET_PLAYLISTS:
				_getPlaylists(function(res) {
					console.log(res);
				});
				break;
			case AppConstants.CREATE_PLAYLIST:
				_createPlaylist(function(res) {
					console.log(res);
				});
				break;
			case AppConstants.GET_TRACKS:
				_getTracks(function(res) {
					console.log(res);
				});
				break;
			case AppConstants.REMOVE_TRACK:
				_removeTrack(payload.action.trackId, payload.action.position, function() {
					AppStore.emitChange();
				});
		}

		AppStore.emitChange();

		return true;
	})
});

module.exports = AppStore;