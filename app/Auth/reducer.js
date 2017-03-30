import * as types from './actionTypes';

const initialState = {
  user: null
};

export default function auth(state = initialState, action = {}) {
  const { user } = action;
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        user
      };
    case types.CREATE_USER:
      return {
        ...state,
        user
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}