import * as types from './actionTypes';
import { tabs } from './constants';

const initialState = {
  status: null,
  selectedTab: tabs.EXPLORE,
};

export default function main(state = initialState, action = {}) {
  switch (action.type) {
    case types.MAIN_UPDATE_TAB:
      return {
        ...state,
        selectedTab: action.selectedTab,
        status: types.MAIN_UPDATE_TAB,
      }
    default:
      return state;
  }
}
