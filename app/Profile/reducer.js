import * as types from './actionTypes';

const initialState = {
  error: null,
  sessions: [],
};

export default function question(state = initialState, action = {}) {
  switch (action.type) {
    case types.PROFILE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case types.PROFILE_UPDATE:
      return {
        ...state,
        error: null,
        sessions: action.sessions,
      };
    default:
      return state;
  }
}