import * as types from './actionTypes';
import request, { toQueryString } from '../request';

function saveClientInfo() {
  return {
    type: types.CLIENTINFO_REQUEST
  };
}
function saveProfessionalInfo() {
  return {
    type: types.PROFESSIONALINFO_REQUEST
  };
}

function createProfessionalSuccess(user) {
  return { type: types.PROFESSIONALINFO_SUCCESS, user };
}

function createProfessionalError(error) {
  return { type: types.PROFESSIONALINFO_ERROR, error };
}

function createClientSuccess(user) {
  return { type: types.CLIENTINFO_SUCCESS, user };
}

function createClientError(error) {
  return { type: types.CLIENTINFO_ERROR, error };
}

export const createRole = (userData) => async (dispatch, store) => {
  const url = userData.professional ? '/professional/new' : '/client/new';
  const { auth } = store();
  const createRoleSuccess = userData.professional ? createProfessionalSuccess : createClientSuccess;
  const createRoleError = userData.professional ? createProfessionalError : createClientError;
  const options = {
    method: 'post',
    body: JSON.stringify({...userData, user: auth.user}),
  };

  try {
    const response = await request(url, options, auth);
    dispatch(createRoleSuccess(response));
  } catch (error) {
    dispatch(createRoleError(error));
  }

};

export function changeProfessionalForm({ firstForm }) {
  return { type: types.PROFESSIONALINFO_CHANGEFORM, firstForm };
}
