import * as types from './actionTypes';

const initialState = {
  loading: false,
  error: null,
  token: '',
  user: {},
  professions: [],
  professionalsClients: []
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_USER:
      return {
        ...state,
        error: null,
        user: {...state.user, ...action.user},
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        user: action.user,
        token: action.token,
        professions: action.professions,
        professionalsClients: action.professionalsClients,
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.user,
        token: action.token,
        professions: action.professions,
        professionalsClients: action.professionalsClients,
      };
    case types.CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: {},
        error: action.error,
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}