import * as types from './actionTypes';
import * as authTypes from '../Auth/actionTypes';
import request, { toQueryString } from '../request';

function updateUserSuccess(data) {
  return { type: authTypes.UPDATE_USER, ...data };
}

function updateSessionsSuccess(data) {
  return { type: types.PROFILE_UPDATE, ...data };
}

function profileError(error) {
  return { type: types.PROFILE_ERROR, error };
}

export const updateProfile = (userData) => async (dispatch, store) => {
  const url = userData.professional ? '/professional/'+userData._id : '/client/'+userData._id;
  const { auth } = store();
  const options = {
    method: 'put',
    body: JSON.stringify(userData),
  };

  try {
    await request(url, options, auth);
    dispatch(updateUserSuccess({...auth, user: userData}));
  } catch (error) {
    const error =
      `Profile Error: updateProfile(${userData.professional ? 'Professional' : 'Client'})
      Message: ${error.message}`;
    dispatch(profileError(error));
  }

};

export const getSessions = (data) => async (dispatch, store) => {
  let url = '/session/getMy';
  const { auth } = store();
  const options = {
    method: 'get',
  };
  if(data){
    const queryString = toQueryString(data);
    url += '?' + queryString;
  }

  try {
    const response = await request(url, options, auth);
    dispatch(updateSessionsSuccess({sessions: response}));
  } catch (error) {
    const error =
      `Profile Error: getSessions()
      Message: ${error.message}`;
    dispatch(profileError(error));
  }

};
