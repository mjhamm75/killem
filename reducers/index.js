import * as ActionTypes from '../actions';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';
import { GET_ME_SUCCESS, GET_PLAYLISTS_SUCCESS, GET_TOKENS_SUCCESS, SEARCH_TRACKS_SUCCESS, UPDATE_PLAYLIST_SUCCESS } from './../constants/killem.constants.js';

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

function me(state = {}, action) {
  switch(action.type) {
    case GET_ME_SUCCESS:
     return action.me;
    default:
      return state;
  }
}

function tokens(state = {}, action) {
  switch(action.type) {
    case GET_TOKENS_SUCCESS:
      return action.tokens;
    default:
      return state;
  }
}

function searchResults(state = {}, action) {
  switch(action.type) {
    case SEARCH_TRACKS_SUCCESS:
      return action.tracks;
    default:
      return state;
  }
}

function playlist(state = [], action) {
  switch(action.type) {
    case UPDATE_PLAYLIST_SUCCESS:
      return action.playlist;
    default:
      return state;
  }
}

function playlists(state = [], action) {
  switch(action.type) {
    case GET_PLAYLISTS_SUCCESS:
      return action.playlists;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  errorMessage,
  me: me,
  playlist,
  playlists,
  router,
  searchResults,
  tokens
});

export default rootReducer;
