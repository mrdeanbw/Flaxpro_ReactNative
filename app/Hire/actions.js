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
      `Profile Error: getMySessions()
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

  console.log('===========', options)
  try {
    const response = await request(url, options, auth);
    // dispatch(updateHireSuccess({schedule: response}));
    console.log('===========', response)
  } catch (error) {
    const error =
      `Profile Error: createContract()
      Message: ${error.message}`;
    dispatch(updateHireError(error));
  }

};

export function changeContractForm(data) {
  return { type: types.CONTRACT_CHANGEFORM, ...data };
}