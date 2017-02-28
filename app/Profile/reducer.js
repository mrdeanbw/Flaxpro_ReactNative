import * as types from './actionTypes';

const initialState = {
  status: null,
};

export default function profile(state = initialState, action = {}) {
  switch (action.type) {
    case types.CLIENT_PROFILE_REQUEST:
      return {
        ...state,
        status: 'ClientProfileRequest',
      };
    case types.CLIENT_PROFILE_SUCCESS:
      return {
        ...state,
        status: 'ClientProfileSuccess',
      };
    case types.CLIENT_PROFILE_ERROR:
      return {
        ...state,
        status: 'ClientProfileError',
      };
    default:
      return state;
  }
}
