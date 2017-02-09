import * as types from './actionTypes';

export function explore() {
  return {
    type: [types.EXPLORE_REQUEST, types.EXPLORE_SUCCESS, types.EXPLORE_ERROR]
  };
}

