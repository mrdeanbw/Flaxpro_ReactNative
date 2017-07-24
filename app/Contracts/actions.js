import request, { toQueryString } from '../request';

import * as types from './actionTypes';
import * as hireTypes from '../Hire/actionTypes';

import { 
  chooseForm,
  updateHireError,
  updateHireSuccess,
} from '../Hire/actions';
import { FORM_NAMES } from '../Hire/constants';

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
  let url = `/users/${role}s`;
  const { auth } = store();
  const options = {
    method: 'get',
  };
  data ? data.group=true : data = {group: true};
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
  const url = `/contracts/${contractId}/status`;
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

export const getContractForAccept = (contractId) => async (dispatch, store) => {
  dispatch({type: hireTypes.HIRE_RESET});
  dispatch({type: hireTypes.CONTRACT_REQUEST});
  const url = `/contracts/${contractId}`;
  const { auth } = store();
  const options = {
    method: 'get',
  };

  try {
    const response  = await request(url, options, auth);
    const contract = {
      firstForm: false,
      secondForm: false,
      paymentForm: false,
      summaryForm: true,
      numberOfSessions: response.sessions.length,
      numberOfPeople: response.numberOfPeople,
      selectedDates: null,
      selectedTimes: response.sessions,
      offerPrice: response.rate,
      payment: response.paymentMethod,
      loadingForm: false,
      status: response.status,
    };

    dispatch({
      type: hireTypes.CONTRACT_CHANGEFORM,
      ...contract,
    });
  } catch (error) {
    console.log('get contract err', error);
  }
};

export const replyToContract = (contractId, accept, paymentMethod, cb) => async (dispatch, store) => {
  dispatch({type: hireTypes.PAYMENT_LOADING});
  
  const url = `/contracts/${contractId}`;
  const { auth } = store();
  
  let body = {
    accept: accept
  };

  if (paymentMethod) {
    body.paymentMethod = paymentMethod;
  }

  const options = {
    method: 'post',
    body: JSON.stringify(body),
  };

  try {
    const contract  = await request(url, options, auth);
    dispatch(updateHireSuccess({}));
    cb();
  } catch (error) {
    console.log('reply to contract error', error);
    dispatch(updateHireError(error));
  }
}