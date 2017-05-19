import * as types from './actionTypes';

const initialState = {
  loading: false,
  error: null,
  professionals: [],
  clients: [],
  professions: [],
};

export default function explore(state = initialState, action = {}) {
  switch (action.type) {
    case types.EXPLORE_GET_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case types.EXPLORE_GET_ERROR:
      console.error(action.error)
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case types.EXPLORE_GET_SUCCESS:
      return {
        error: null,
        loading: false,
        clients: action.clients || state.clients,
        professionals: action.professionals || state.professionals,
        professions: action.professions || state.professions,
      };
    default:
      return state;
  }
}
