import * as types from './actionTypes';
import * as authTypes from '../Auth/actionTypes';
import request, { toQueryString } from '../request';

function updateProfileSuccess(data) {
  return { type: authTypes.UPDATE_USER, ...data };
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
    const response = await request(url, options, auth);
    dispatch(updateProfileSuccess({...auth, user: userData}));
  } catch (error) {
    const error =
      `Profile Error: updateProfile(${userData.professional ? 'Professional' : 'Client'})
      Message: ${error.message}`;
    dispatch(profileError(error));
  }

};
