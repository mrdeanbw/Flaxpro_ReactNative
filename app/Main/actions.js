import * as exploreTypes from '../Explore/actionTypes';
import request, { toQueryString } from '../request';

export function mainRequest() {
  return { type: exploreTypes.EXPLORE_GET_REQUEST };
}

function mainError(error) {
  return { type: exploreTypes.EXPLORE_GET_ERROR, error };
}

function mainSuccess(data) {
  return { type: exploreTypes.EXPLORE_GET_SUCCESS, ...data };
}

export const getExploreClient = () => async (dispatch, store) => {
  dispatch(mainRequest());
  const professionsUrl = '/profession';
  const professionalsUrl = '/professional/q';
  const { auth } = store();
  const options = {
    method: 'get',
  };

  try {
    const [{ professions }, { professionals }] = await Promise.all([request(professionsUrl, options, auth), request(professionalsUrl, options, auth)]);
    dispatch(mainSuccess({professions, professionals}));
  } catch (error) {
    const error =
      `Explore Error: getExploreClient 
      Message: ${error.message}`;
    dispatch(mainError(error));
  }

};