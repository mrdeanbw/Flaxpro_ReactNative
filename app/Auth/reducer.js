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
    default:
      return state;
  }
}
