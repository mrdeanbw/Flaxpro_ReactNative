import * as types from './actionTypes';

export function saveClientInfo() {
  return {
    type: [types.CLIENTINFO_REQUEST, types.CLIENTINFO_SUCCESS, types.CLIENTINFO_ERROR]
  };
}

