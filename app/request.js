import 'whatwg-fetch';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import * as authActions from './Auth/actions';
import { store } from './app';

const urlsForRepeat = [];
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Create error from server response
 *
 * @param  {object} response A response from a network request
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
  urlsForRepeat.shift();
  throw error;
}

/**
 * Refresh token and repeat last request
 * If no last request or no token redirect to login
 *
 * @param  {object} response A response from a network request
 *
 * @return {function} Returns function which throws an error(if no token before ao after refresh) or repeat last request
 *
 */
function refreshToken() {
  return store.dispatch(authActions.refreshToken())
}

function repeatRequests(response) {
  const _auth = JSON.parse(response._bodyText);

  if(!_auth.token){
    Actions.Auth();
    createError(response);
  } else {
    return Promise.all(urlsForRepeat.map(e => request(e.url, e.options, _auth)))
      .then( (err, res) => {
        store.dispatch(authActions.loginSuccess({ ...parseJSON(response) }))
    });
  }
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  console.log('checkStatus', response);
  switch (true) {
    case (response.status >= 200 && response.status < 300) :
      if(urlsForRepeat[0].url.includes('refresh')) {
        urlsForRepeat.shift();
        return repeatRequests(response);
      } else {
        urlsForRepeat.shift();
        return response;
      }
    case (response.status === 401) :
      return refreshToken(response);
    default:
      createError(response);
  };

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
  // const apiUrl = 'http://192.168.1.42:3000/api';
  const apiUrl = 'http://localhost:3000/api';
  AsyncStorage.setItem('apiUrl', apiUrl);
  urlsForRepeat.unshift({url, options});
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
    .then(checkStatus)
    .then(parseJSON);

  return result;
}

export function toQueryString(paramsObject) {
  return Object
    .keys(paramsObject)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
    .join('&');
}
