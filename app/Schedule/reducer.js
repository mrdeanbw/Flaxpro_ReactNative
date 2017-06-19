import * as types from './actionTypes';

const initialState = {
  error: null,
  sessions: [],
};

export default function schedule(state = initialState, action = {}) {
  switch (action.type) {
    case types.SCHEDULE_GET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case types.SCHEDULE_GET_SUCCESS:
      return {
        ...state,
        error: null,
        sessions: action.sessions || [...state.sessions],
      };
    default:
      return state;
  }
}