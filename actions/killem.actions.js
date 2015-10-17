import * as AppConstants from './../constants/killem.constants.js';
import { isoFetch } from './../utils/fetch.utils.js';

export function login(history) {	
	return dispatch => {
		dispatch(loginRequest());
		return isoFetch('/log-in')
			.then(response => dispatch(loginSuccessful(history, response.url)))
	}
}

function loginRequest() {
	return {
		type: AppConstants.LOGIN_REQUEST
	}
}

function loginSuccessful(history, url) {
	location.replace(url);
	return {
		type: AppConstants.LOGIN_SUCCESS,
		url: url
	}
}

export function getMe() {
	return dispatch => {
		dispatch(getMeRequest());
		return isoFetch('/me').then(me => {
			dispatch(getMeSuccess(me))
		})		
	}
}

function getMeRequest() {
	return {
		type: AppConstants.GET_ME_REQUEST
	}
}

function getMeSuccess(me) {
	return {
		type: AppConstants.GET_ME_SUCCESS,
		me
	}
}
