import * as types from './actionTypes';

const initialState = {
  loading: false,
  error: null,
  professionals: [],
  clients: []
};

export default function explore(state = initialState, action = {}) {
  switch (action.type) {
    case types.EXPLORE_GET_PROFESSIONALS:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case types.EXPLORE_GET_PROFESSIONALS_SUCCESS:
      console.log('=========EXPLORE_GET_PROFESSIONALS_SUCCESS=', action)
      return {
        ...state,
        error: null,
        loading: false,
        professionals: action.professionals,
      };
    case types.EXPLORE_GET_PROFESSIONALS_ERROR:
      console.log('=========EXPLORE_GET_PROFESSIONALS_ERROR=', action)
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case types.EXPLORE_GET_CLIENTS_SUCCESS:
      console.log('=========EXPLORE_GET_CLIENTS_SUCCESS=', action)
      return {
        ...state,
        error: null,
        loading: false,
        clients: action.clients,
      };
    case types.EXPLORE_GET_CLIENTS_ERROR:
      console.log('=========EXPLORE_GET_CLIENTS_ERROR=', action)
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
