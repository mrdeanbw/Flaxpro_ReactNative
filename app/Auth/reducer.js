import * as types from './actionTypes';

const initialState = {
  status: null,
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        status: 'loggedin',
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        status: 'failed',
      };
    default:
      return state;
  }
}
