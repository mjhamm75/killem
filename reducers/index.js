import * as ActionTypes from '../actions';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';
import { GET_ME_SUCCESS, GET_TOKENS_SUCCESS } from './../constants/killem.constants.js';

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

const rootReducer = combineReducers({
  errorMessage,
  me,
  router,
  tokens
});

export default rootReducer;
