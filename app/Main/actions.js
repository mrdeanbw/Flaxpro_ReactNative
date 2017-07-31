import * as exploreTypes from '../Explore/actionTypes';
import * as actionTypes from './actionTypes';
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

export const updateTab = (selectedTab) => {
  return {
    type: actionTypes.MAIN_UPDATE_TAB,
    selectedTab,
  }
}