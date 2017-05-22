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
  const { user={}, professions=[], professionalsClients=[], error=null, token } = action;
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        // user,
        // token,
        error,
        professions,
        professionalsClients,
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        user,
        token,
        professions,
        professionalsClients,
        error,
        loading: false,
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: 'Неверный логин или пароль',
      };

    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        token,
        user,
        error,
        professions,
        professionalsClients,
      };
    case types.CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        user,
        error,
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}