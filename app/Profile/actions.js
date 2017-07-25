import * as types from './actionTypes';
import request, { toQueryString } from '../request';

function updateProfileSuccess(data) {
  return { type: types.PROFILE_UPDATE, ...data };
}

function profileError(error) {
  return { type: types.PROFILE_ERROR, error };
}

export function profileRequest() {
  return { type: types.PROFILE_GET_REQUEST };
}

export const updateProfile = (userData) => async (dispatch, store) => {
  dispatch(profileRequest());
  const url = `/${userData.role.toLowerCase()}s/${userData._id}`;
  const { auth } = store();
  const options = {
    method: 'put',
    body: JSON.stringify(userData),
  };

  try {
    const response = await request(url, options, auth);
    const compositeData = response ? {...userData, ...response.user} : userData;
    dispatch(updateProfileSuccess({ user: compositeData }));
  } catch (error) {
    const error =
      `Profile Error: updateProfile(${userData.professional ? 'Professional' : 'Client'})
      Message: ${error.message}`;
    dispatch(profileError(error));
  }

};

export const getMySessions = (data) => async (dispatch, store) => {
  let url = '/sessions';
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
    dispatch(updateProfileSuccess({sessions: response}));
  } catch (error) {
    const error =
      `Profile Error: getMySessions()
      Message: ${error.message}`;
    dispatch(profileError(error));
  }

};

export const getScheduleById = (data) => async (dispatch, store) => {
  if (!data.user) return;
  dispatch(profileRequest());
  const { auth } = store();
  const url = `/schedules/${data.user.role.toLowerCase()}/${data.user._id}`;
  const options = {
    method: 'get',
  };

  try {
    const response = await request(url, options, auth);
    dispatch(updateProfileSuccess({schedule: response}));
  } catch (error) {
    const error =
      `Profile Error: getScheduleById()
      Message: ${error.message}`;
    dispatch(profileError(error));
  }

};

export const getFullProfile = (user) => async (dispatch, store) => {
  dispatch(profileRequest());
  const { auth } = store();
  const role = (user || auth.user).role.toLowerCase();
  const url = `/${role}s/${user ? user._id : auth.user._id}`;
  const options = {
    method: 'get',
  };

  try {
    const response = await request(url, options, auth);
    dispatch(updateProfileSuccess({ user: response.user }));
  } catch (error) {
    const error =
      `Profile Error: getFullProfile()
      Message: ${error.message}`;
    dispatch(profileError(error));
  }

};

export const getSchedule = () => async (dispatch, store) => {
  dispatch(profileRequest());
  const { auth } = store();
  const url = `/schedules/${auth.user.role.toLowerCase()}/${auth.user._id}`;
  const options = {
    method: 'get',
  };

  try {
    const response = await request(url, options, auth);
    dispatch(updateProfileSuccess({schedule: response}));
  } catch (error) {
    const error =
      `Profile Error: getSchedule()
      Message: ${error.message}`;
    dispatch(profileError(error));
  }

};

export const createSchedule = (data) => async (dispatch, store) => {
  dispatch(profileRequest());
  const { auth } = store();
  const url = '/schedules';
  const options = {
    method: 'put',
    body: JSON.stringify({schedules: data}),
  };

  try {
    await request(url, options, auth);
    getSchedule()(dispatch, store);
  } catch (error) {
    const error =
      `Profile Error: createSchedule()
      Message: ${error.message}`;
    dispatch(profileError(error));
  }

};