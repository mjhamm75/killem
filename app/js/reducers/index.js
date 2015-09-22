import { combineReducers } from 'redux';
import * from '../actions/app.actions.js';

function playlist(state = [], action) {
  switch (action.type) {
  case GET_TRACKS:
    return action.playlist;
  default:
    return state;
  }
}

function user(state = { }, action) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case LOGIN_SUCCESS:
    return Object.assign({}, state, {
      didValidate: true
    });
  case LOGIN_FAILURE:
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
