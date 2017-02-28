import * as types from './actionTypes';

export function clientProfile() {
  return {
    type: [types.CLIENT_PROFILE_REQUEST, types.CLIENT_PROFILE_SUCCESSC, types.CLIENT_PROFILE_ERROR]
  };
}

