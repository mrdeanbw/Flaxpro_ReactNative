import * as types from './actionTypes';

const initialState = {
  error: null,
  sessions: [],
  loading: false,
};

export default function schedule(state = initialState, action = {}) {
  switch (action.type) {
    case types.SCHEDULE_GET_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case types.SCHEDULE_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.SCHEDULE_GET_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        sessions: action.sessions || [...state.sessions],
      };
    default:
      return state;
  }
}