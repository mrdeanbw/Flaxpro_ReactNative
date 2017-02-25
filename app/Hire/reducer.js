import * as types from './actionTypes';

const initialState = {
  status: null,
};

export default function hire(state = initialState, action = {}) {
  switch (action.type) {
    case types.PROPOSE_TERMS_REQUEST:
      return {
        ...state,
        status: 'ProposeTermsRequest',
      };
    case types.PROPOSE_TERMS_SUCCESS:
      return {
        ...state,
        status: 'ProposeTermsSuccess',
      };
    case types.PROPOSE_TERMS_ERROR:
      return {
        ...state,
        status: 'ProposeTermsError',
      };
    default:
      return state;
  }
}
