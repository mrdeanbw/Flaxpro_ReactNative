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

function professionalsSuccess({professionals}) {
  return { type: types.EXPLORE_GET_PROFESSIONALS_SUCCESS, professionals };
}

function professionalsError(error) {
  return { type: types.EXPLORE_GET_PROFESSIONALS_ERROR, error };
}

function clientsSuccess({clients}) {
  return { type: types.EXPLORE_GET_CLIENTS_SUCCESS, clients };
}

function clientsError(error) {
  return { type: types.EXPLORE_GET_CLIENTS_ERROR, error };
}

export const getProfessionals = (data) => async (dispatch, store) => {
  professionalsRequest();
  let url = '/professional/q';
  const { token } = store().auth;
  const options = {
    headers: {'Authorization': token},
    method: 'get',
  };
  if(data){
    const queryString = toQueryString(data);
    url += '?' + queryString;
  }

  try {
    const response = await request(url, options);
    dispatch(professionalsSuccess(response));
  } catch (error) {
    dispatch(professionalsError(error.message));
  }

};

export const getClients = (data) => async (dispatch, store) => {
  clientsRequest();
  let url = '/client/q';
  const { token } = store().auth;
  const options = {
    headers: {'Authorization': token},
    method: 'get',
  };
  if(data){
    const queryString = toQueryString(data);
    url += '?' + queryString;
  }

  try {
    const response = await request(url, options);
    dispatch(clientsSuccess(response));
  } catch (error) {
    dispatch(clientsError(error.message));
  }

};