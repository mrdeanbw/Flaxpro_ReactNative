import * as types from './actionTypes';

const initialState = {
  status: null,
};

export default function question(state = initialState, action = {}) {
  switch (action.type) {
    case types.CLIENTINFO_REQUEST:
      return {
        ...state,
        status: 'clientinfo saving',
      };
    case types.CLIENTINFO_SUCCESS:
      return {
        ...state,
        status: 'clientinfo saved',
      };
    case types.CLIENTINFO_ERROR:
      return {
        ...state,
        status: 'clientinfo failed',
      };
    default:
      return state;
  }
}
