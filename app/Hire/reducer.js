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
    case types.PAMENT_REQUEST:
      return {
        ...state,
        status: 'PaymentRequest',
      };
    case types.PAYMENT_SUCCESS:
      return {
        ...state,
        status: 'PaymentSuccess',
      };
    case types.PAYMENT_ERROR:
      return {
        ...state,
        status: 'PaymentError',
      };

    default:
      return state;
  }
}
