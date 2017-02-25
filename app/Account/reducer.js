import * as types from './actionTypes';

const initialState = {
  status: null,
};

export default function accountInfo(state = initialState, action = {}) {
  switch (action.type) {
    case types.ACCOUNT_REQUEST:
      return {
        ...state,
        status: 'AccountRequest',
      };
    case types.ACCOUNT_SUCCESS:
      return {
        ...state,
        status: 'AccountSuccess',
      };
    case types.ACCOUNT_ERROR:
      return {
        ...state,
        status: 'AccountError',
      };
    default:
      return state;
  }
}
