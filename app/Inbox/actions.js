import * as types from './actionTypes';

export function inbox() {
  return {
    type: [types.INBOX_REQUEST, types.INBOX_SUCCESS, types.INBOX_ERROR]
  };
}

