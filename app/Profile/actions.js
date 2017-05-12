import * as types from './actionTypes';

export function clientProfile() {
  return {
    type: [types.CLIENT_PROFILE_REQUEST, types.CLIENT_PROFILE_SUCCESS, types.CLIENT_PROFILE_ERROR]
  };
}

export function professionalProfile() {
  return {
    type: [types.PROFESSIONAL_PROFILE_REQUEST, types.PROFESSIONAL_PROFILE_SUCCESS, types.PROFESSIONAL_PROFILE_ERROR]
  };
}
