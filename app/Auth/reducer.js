import * as types from './actionTypes';

const initialState = {
  user: null,
  professions: [],
  coachesClients: []
};

export default function auth(state = initialState, action = {}) {
  const { user, professions, coachesClients } = action;
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        user,
        professions,
        coachesClients
      };
    case types.CREATE_USER:
      return {
        ...state,
        user,
        professions,
        coachesClients
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}