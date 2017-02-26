import * as types from './actionTypes';

export function proposeTerms() {
  return {
    type: [types.PROPOSE_TERMS_REQUEST, types.PROPOSE_TERMS_SUCCESS, types.PROPOSE_TERMS_ERROR]
  };
}
export function payment() {
  return {
    type: [types.PAYMENT_REQUEST, types.PAYMENT_SUCCESS, types.PAYMENT_ERROR]
  };
}

