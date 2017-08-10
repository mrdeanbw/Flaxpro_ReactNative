import * as types from './actionTypes';

const initialState = {
  loading: false,
  error: null,
  token: '',
  user: {},
  professions: [],
  professionalsClients: [],
  currentAddress: {},
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_ADDRESS_SUCCESS:
      return {
        ...state,
        error: null,
        currentAddress: action.address,
      };
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
        refreshToken: action.refreshToken,
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
        refreshToken: action.refreshToken,
      };
    case types.CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: {},
        error: action.error,
      };
    case types.LOGOUT:
      return {...state};
    default:
      return state;
  }
}