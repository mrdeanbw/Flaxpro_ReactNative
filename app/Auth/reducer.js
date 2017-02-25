import * as types from './actionTypes';

const initialState = {
  status: null,
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        status: 'loginingIn',
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        status: 'loggedIn',
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        status: 'logIn failed',
      };
    case types.SIGNUP_REQUEST:
      return {
        ...state,
        status: 'signup_request',
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        status: 'signup_success',
      };
    case types.SIGNUP_ERROR:
      return {
        ...state,
        status: 'signup_error',
      };

    default:
      return state;
  }
}
