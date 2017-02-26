import * as types from './actionTypes';

const initialState = {
  status: null,
};

export default function clients_coaches(state = initialState, action = {}) {
  switch (action.type) {
    case types.CLIENTS_REQUEST:
      return {
        ...state,
        status: 'ClientsRequest',
      };
    case types.CLIENTS_SUCCESS:
      return {
        ...state,
        status: 'ClientsSuccess',
      };
    case types.CLIENTS_ERROR:
      return {
        ...state,
        status: 'ClientsError',
      };
    case types.COACHES_REQUEST:
      return {
        ...state,
        status: 'CoachesRequest',
      };
    case types.COACHES_SUCCESS:
      return {
        ...state,
        status: 'CoachesSuccess',
      };
    case types.COACHES_ERROR:
      return {
        ...state,
        status: 'CoachesError',
      };
    default:
      return state;
  }
}
