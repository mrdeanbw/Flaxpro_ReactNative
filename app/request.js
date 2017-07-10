import 'whatwg-fetch';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import * as authActions from './Auth/actions';
import { store } from './app';

let urlsForRefresh = [];
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
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  console.log('checkStatus', response, urlsForRefresh);
  if (response.status >= 200 && response.status < 300) {
    urlsForRefresh.shift();
    return response;
  }
  if (response.status === 401) {
    if (urlsForRefresh.length){
      store.dispatch(authActions.refreshToken())
        .then(() => {
          const { auth } = store.getState();
          // urlsForRefresh.forEach( e => request(e.url, e.options, auth));
          urlsForRefresh = [];
          // return {};
        });
    } else {
      Actions.Auth();
      return {};
    }
  }

  const error = new Error({message:response._bodyText});
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
  urlsForRefresh.shift();
  throw error;
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
  // const apiUrl = 'http://13.59.22.166:3000/api';  // Dunice developing
  // const apiUrl = 'http://localhost:3000/api';     // Local testing/developing
  const apiUrl = 'http://13.59.22.166:3000/api';  // AWS common server
  AsyncStorage.setItem('apiUrl', apiUrl);
  urlsForRefresh.unshift({url, options});
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
