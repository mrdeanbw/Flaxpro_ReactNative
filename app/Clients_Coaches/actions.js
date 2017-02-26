import * as types from './actionTypes';

export function clients() {
  return {
    type: [types.CLIENTS_REQUEST, types.CLIENTS_SUCCESS, types.CLIENTS_ERROR]
  };
}

export function coaches() {
  return {
    type: [types.COACHES_REQUEST, types.COACHES_SUCCESS, types.COACHES_ERROR]
  };
}
