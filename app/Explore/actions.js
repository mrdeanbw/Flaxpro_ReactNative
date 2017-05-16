import * as types from './actionTypes';
import request, { toQueryString } from '../request';

function clientsRequest() {
  return {
    type: types.EXPLORE_GET_CLIENTS
  };
}
function professionalsRequest() {
  return {
    type: types.EXPLORE_GET_PROFESSIONALS
  };
}

function professionalsSuccess(professionals) {
  return { type: types.EXPLORE_GET_PROFESSIONALS_SUCCESS, professionals };
}

function professionalsError(error) {
  return { type: types.EXPLORE_GET_PROFESSIONALS_ERROR, error };
}

function clientSuccess(clients) {
  return { type: types.EXPLORE_GET_CLIENTS_SUCCESS, clients };
}

function clientError(error) {
  return { type: types.EXPLORE_GET_CLIENTS_ERROR, error };
}

export const getProfessionals = () => async (dispatch, store) => {
  professionalsRequest();
  const url = '/professional/q';
  const {user, token} = store().auth;
  const options = {
    headers: {'Authorization': token},
    method: 'get',
    // body: JSON.stringify({...userData, user}),
  };

  try {
    const response = await request(url, options);
    dispatch(professionalsSuccess(response));
  } catch (error) {
    dispatch(professionalsError(error));
  }

};