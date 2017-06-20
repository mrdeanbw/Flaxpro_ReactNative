import * as types from './actionTypes';
import request, { toQueryString } from '../request';

export function mainRequest() {
  return { type: types.SCHEDULE_GET_REQUEST };
}

function scheduleError(error) {
  return { type: types.SCHEDULE_GET_ERROR, error };
}

function scheduleSuccess(data) {
  return { type: types.SCHEDULE_GET_SUCCESS, ...data };
}

export const getMyClients = (data) => async (dispatch, store) => {
  dispatch(mainRequest());
  const role = 'client';
  await getMyClientsProfessionals({role, data})(dispatch, store)
};
export const getMyProfessionals = (data) => async (dispatch, store) => {
  dispatch(mainRequest());
  const role = 'professional';
  await getMyClientsProfessionals({role, data})(dispatch, store)
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
    const sessions  = await request(url, options, auth);
    dispatch(scheduleSuccess({sessions}));
  } catch (error) {
    const error =
      `Schedule Error: getMyClientsProfessionals(${role})
      Message: ${error.message}`;
    dispatch(scheduleError(error));
  }

};
