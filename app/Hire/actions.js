import * as types from './actionTypes';
import request, { toQueryString } from '../request';

export function updateHireSuccess(data) {
  return {
    type: types.HIRE_SUCCESS, ...data
  };
}
export function updateHireError() {
  return {
    type: types.HIRE_ERROR
  };
}

export const getScheduleById = (data) => async (dispatch, store) => {
  if (!data.user) return;
  const { auth } = store();
  let url = `/schedule/${data.user.role.toLowerCase()}/${data.user._id}`;
  const options = {
    method: 'get',
  };
  if(data.options){
    const queryString = toQueryString(data.options);
    url += '?' + queryString;
  }

  try {
    const response = await request(url, options, auth);
    dispatch(updateHireSuccess({schedule: response}));
  } catch (error) {
    const error =
      `Hire Error: getMySessions()
      Message: ${error.message}`;
    dispatch(updateHireError(error));
  }

};

export const createContract = (data) => async (dispatch, store) => {
  const { auth } = store();
  const url = '/contract/new';
  const options = {
    method: 'post',
    body: JSON.stringify(data),
  };

  try {
    const response = await request(url, options, auth);
    dispatch(updateHireSuccess({schedule: response}));
  } catch (error) {
    const error =
      `Hire Error: createContract()
      Message: ${error.message}`;
    dispatch(updateHireError(error));
  }

};

export function changeContractForm(data) {
  return { type: types.CONTRACT_CHANGEFORM, ...data };
}

export function changePaymentForm(data) {
  return { type: types.PAYMENT_CHANGEFORM, ...data };
}

export const addCard = (data) => async (dispatch, store) => {
  dispatch({type: types.PAYMENT_LOADING});
  const { auth } = store();
  const url = '/payment/setPaymentClient';
  const options = {
    method: 'post',
    body: JSON.stringify(data),
  };

  try {
    const response = await request(url, options, auth);
    return dispatch({type: types.PAYMENT_SUCCESS, response});
  } catch (error) {
    const error =
      `Hire Error: addCard()
      Message: ${error.message}`;
    return dispatch({type: types.PAYMENT_ERROR, error});
  }
};

export const getCards = () => async (dispatch, store) => {
  const { auth } = store();
  const url = '/payment/cards';
  const options = { method: 'get' };

  try {
    const response = await request(url, options, auth);
    return dispatch({type: types.GET_CARDS_SUCCESS, data: response});
  } catch (error) {
    const error =
      `Hire Error: getCards()
      Message: ${error.message}`;
    return dispatch({type: types.GET_CARDS_ERROR, error});
  }
};