import 'whatwg-fetch';
import { Actions } from 'react-native-router-flux';

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
  console.log('checkStatus', response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    return Actions.Auth();
  }

  const error = new Error({message:response._bodyText});
  error.response = response;
  const body = response._bodyText ? JSON.parse(response._bodyText) : {};
  error.message = body.error || `Status: ${response.status}`;
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
  // const apiUrl = 'http://192.168.88.56:3000/api';
  const apiUrl = 'http://localhost:3000/api';
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
