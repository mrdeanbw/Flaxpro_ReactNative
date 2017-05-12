import * as types from './actionTypes';

const initialState = {
  status: null,
};

export default function clients_professionals(state = initialState, action = {}) {
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
    case types.PROFESSIONALS_REQUEST:
      return {
        ...state,
        status: 'ProfessionalsRequest',
      };
    case types.PROFESSIONALS_SUCCESS:
      return {
        ...state,
        status: 'ProfessionalsSuccess',
      };
    case types.PROFESSIONALS_ERROR:
      return {
        ...state,
        status: 'ProfessionalsError',
      };
    default:
      return state;
  }
}
