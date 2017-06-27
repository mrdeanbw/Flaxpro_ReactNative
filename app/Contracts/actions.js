import * as types from './actionTypes';
import request, { toQueryString } from '../request';

export function contractsRequest() {
  return { type: types.CONTRACTS_GET_REQUEST };
}

function contractsError(error) {
  return { type: types.CONTRACTS_GET_ERROR, error };
}

function contractsSuccess(data) {
  return { type: types.CONTRACTS_GET_SUCCESS, ...data };
}

export const getMyClients = (data) => async (dispatch, store) => {
  dispatch(contractsRequest());
  const role = 'client';
  await getMyClientsProfessionals({role, data})(dispatch, store);
};
export const getMyProfessionals = (data) => async (dispatch, store) => {
  dispatch(contractsRequest());
  const role = 'professional';
  await getMyClientsProfessionals({role, data})(dispatch, store);
};

export const getMyClientsProfessionals = ({ role, data }) => async (dispatch, store) => {
  let url = `/${role}/my`;
  const { auth } = store();
  const options = {
    method: 'get',
  };
  if(data){
    const queryString = toQueryString(data);
    url += '?' + queryString;
  }

  try {
    const contracts  = await request(url, options, auth);
    dispatch(contractsSuccess({contracts}));
  } catch (error) {
    const error =
      `Schedule Error: getMyClientsProfessionals(get ${role}s)
      Message: ${error.message}`;
    dispatch(contractsError(error));
  }

};

export const cancelContract = (contractId) => async (dispatch, store) => {
  dispatch(contractsRequest());
  const url = '/contract/cancel/'+contractId;
  const { auth } = store();
  const options = {
    method: 'post',
  };

  try {
    const contract  = await request(url, options, auth);
    dispatch(contractsSuccess({contract}));
  } catch (error) {
    const error =
      `Schedule Error: cancelContract()
      Message: ${error.message}`;
    dispatch(contractsError(error));
  }

};
