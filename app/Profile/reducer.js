import * as types from './actionTypes';

const initialState = {
  error: null,
  sessions: [],
  user: {},
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
        sessions: action.sessions || [...state.sessions],
        user: {...state.user, ...action.user},
      };
    default:
      return state;
  }
}