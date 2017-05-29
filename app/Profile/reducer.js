import * as types from './actionTypes';

const initialState = {
  error: null,
};

export default function question(state = initialState, action = {}) {
  switch (action.type) {
    case types.PROFILE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}