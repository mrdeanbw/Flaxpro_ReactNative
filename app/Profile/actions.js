import * as types from './actionTypes';

export function clientProfile() {
  return {
    type: [types.CLIENT_PROFILE_REQUEST, types.CLIENT_PROFILE_SUCCESS, types.CLIENT_PROFILE_ERROR]
  };
}

export function trainerProfile() {
  return {
    type: [types.TRAINER_PROFILE_REQUEST, types.TRAINER_PROFILE_SUCCESS, types.TRAINER_PROFILE_ERROR]
  };
}
