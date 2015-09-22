import { combineReducers } from 'redux';
import * as AppConstants from './../actions/app.actions.js';

function playlist(state = [], action) {
  switch (action.type) {
  case AppConstants.GET_TRACKS:
    return action.playlist;
  default:
    return state;
  }
}

function user(state = { }, action) {
  switch (action.type) {
  case AppConstants.LOGIN_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case AppConstants.LOGIN_SUCCESS:
    return Object.assign({}, state, {
      didValidate: true
    });
  case AppConstants.LOGIN_FAILURE:
    return Object.assign({}, state, {
      didValidate: false
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  user,
  playlist
});

export default rootReducer;
