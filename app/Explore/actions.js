import * as types from './actionTypes';
import request, { toQueryString } from '../request';

export function exploreRequest() {
  return { type: types.EXPLORE_GET_REQUEST };
}

function exploreError(error) {
  return { type: types.EXPLORE_GET_ERROR, error };
}

function exploreSuccess(data) {
  return { type: types.EXPLORE_GET_SUCCESS, ...data };
}

export const getExploreClient = () => async (dispatch, store) => {
  dispatch(exploreRequest());
  const professionsUrl = '/professions';
  const professionalsUrl = '/professionals?locationType=nearby';
  const { auth } = store();
  const options = {
    method: 'get',
  };
  try {
    const [{ professions }, { professionals }] = await Promise.all([request(professionsUrl, options, auth), request(professionalsUrl, options, auth)]);
    dispatch(exploreSuccess({professions, professionals}));
  } catch (error) {
    const error =
      `Explore Error: getExploreClient 
      Message: ${error.message}`;
    dispatch(exploreError(error));
  }
};

export const getProfessionals = (data) => async (dispatch, store) => {
  dispatch(exploreRequest());
  let url = '/professionals';
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
    dispatch(exploreSuccess(response));
  } catch (error) {
    const error =
      `Explore Error: getProfessionals 
      Message: ${error.message}`;
    dispatch(exploreError(error));
  }

};

export const getClients = (data) => async (dispatch, store) => {
  dispatch(exploreRequest());
  let url = '/clients';
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
    dispatch(exploreSuccess(response));
  } catch (error) {
    const error =
      `Explore Error: getClients 
      Message: ${error.message}`;
    dispatch(exploreError(error));
  }

};

export const getProfessions = (data) => async (dispatch, store) => {
  dispatch(exploreRequest());
  let url = '/professions';
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
    dispatch(exploreSuccess(response));
  } catch (error) {
    const error =
      `Explore Error: getProfessions 
      Message: ${error.message}`;
    dispatch(exploreError(error));
  }

};
