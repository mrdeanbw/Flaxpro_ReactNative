import 'whatwg-fetch';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import * as authActions from './Auth/actions';
import { store } from './app';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response - A response from a network request,
 *                             or a parsed JSON from the request if was refreshToken request
 *
 * @return {object} The parsed JSON from the request,
 *                  or a response if was refreshToken request
 */
function parseJSON(response) {
  return response.json ? response.json() : response;
}

/**
 * Create error from server response
 *
 * @param  {object} response A response from a network request
 *
 * throws an Error
 *
 */
function createError(response) {
  const error = new Error({message: response._bodyText});
  error.response = response;
  error.message = `Status: ${response.status}`;
  if(response._bodyText && typeof response._bodyText === 'string') {
    try {
      const body = JSON.parse(response._bodyText) || {};
      error.message = body.error;
    } catch (error) {
      error.message = response._bodyText;
    }
  }
  throw error;
}

/**
 * Refresh token and return response from a network request for repeat request
 *
 * @param  {object} response A response from a network request
 *
 * @return  {object} response - A response from a network request for repeat request
 *
 */
function refreshToken(response) {
  return store.dispatch(authActions.refreshToken()).then(() => response)
}


/**
 * Repeat request after refresh token
 *
 * @param  {object} response A response from a network request
 * @param  {object} options The options for repeat request
 *
 * @return  {function|undefined} if refresh token success - repeat request
 *                           if refresh token failed -  throws an Error
 *
 */
function repeatRequests(response, options) {
  const _auth = store.getState().auth;

  if(_auth.token){
    const url = response.url.split('api')[1];
    return request(url, options, _auth);
  }
  Actions.Auth();
  createError(response);
}

/**
 * Checks if a network request status 401 return response for refresh token, and throws an response(as error) if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkAuthStatus(response) {
  if (response.status === 401) {
    return response;
  }
  throw response;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkSuccessStatus(response) {
  console.log('========', response)
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  createError(response);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options, authState) {
  // const apiUrl = 'http://192.168.88.226:3000/api';  // Dunice developing
  // const apiUrl = 'http://localhost:3000/api';     // Local testing/developing
  const apiUrl = 'http://13.59.22.166:3000/api';  // AWS common server
  AsyncStorage.setItem('apiUrl', apiUrl);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (authState && authState.token) {
    headers.Authorization = authState.token;
  }

  const requestOptions = {
    ...options,
    headers: { ...options.headers, ...headers },
  };

  const result = fetch(apiUrl + url, requestOptions)
    .then(checkAuthStatus)
    .then(refreshToken)
    .then((response) => repeatRequests(response, options))
    .catch(checkSuccessStatus)
    .then(parseJSON);

  return result;
}

export function toQueryString(paramsObject) {
  return Object
    .keys(paramsObject)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
    .join('&');
}
