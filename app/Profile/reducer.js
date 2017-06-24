import * as types from './actionTypes';

const initialState = {
  error: null,
  loading: false,
  sessions: [],
  schedule: [],
  user: {},
};

export default function question(state = initialState, action = {}) {
  switch (action.type) {
    case types.PROFILE_GET_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case types.PROFILE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case types.PROFILE_UPDATE:
      return {
        ...state,
        loading: false,
        error: null,
        schedule: action.schedule || [...state.schedule],
        sessions: action.sessions || [...state.sessions],
        user: {...state.user, ...action.user},
      };
    default:
      return state;
  }
}