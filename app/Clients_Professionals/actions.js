import * as types from './actionTypes';

export function clients() {
  return {
    type: [types.CLIENTS_REQUEST, types.CLIENTS_SUCCESS, types.CLIENTS_ERROR]
  };
}

export function professionals() {
  return {
    type: [types.PROFESSIONALS_REQUEST, types.PROFESSIONALS_SUCCESS, types.PROFESSIONALS_ERROR]
  };
}
