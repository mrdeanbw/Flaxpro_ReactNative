import * as types from './actionTypes';

export function account() {
  return {
    type: [types.ACCOUNT_REQUEST, types.ACCOUNT_SUCCESS, types.ACCOUNT_ERROR]
  };
}

