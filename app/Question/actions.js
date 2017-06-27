import * as types from './actionTypes';
import * as authTypes from '../Auth/actionTypes';
import request, { toQueryString } from '../request';

function createRoleSuccess({user}) {
  return { type: authTypes.UPDATE_USER, user };
}

function questionError(error) {
  return { type: types.QUESTION_ERROR, error };
}

export const createRole = (userData) => async (dispatch, store) => {
  const url = userData.professional ? '/professionals' : '/clients';
  const { auth } = store();
  const options = {
    method: 'post',
    body: JSON.stringify(userData),
  };

  try {
    const response = await request(url, options, auth);
    dispatch(createRoleSuccess(response));
  } catch (error) {
    const error =
      `Question Error: createRole(${userData.professional ? 'Professional' : 'Client'})
      Message: ${error.message}`;
    dispatch(questionError(error));
  }

};

export function changeProfessionalForm({ firstForm }) {
  return { type: types.PROFESSIONALINFO_CHANGEFORM, firstForm };
}
