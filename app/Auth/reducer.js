import * as types from './actionTypes';

const initialState = {
  user: null,
  professions: [],
  professionalsClients: []
};

export default function auth(state = initialState, action = {}) {
  const { user, professions, professionalsClients } = action;
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        user,
        professions,
        professionalsClients
      };
    case types.CREATE_USER:
      return {
        ...state,
        user,
        professions,
        professionalsClients
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}