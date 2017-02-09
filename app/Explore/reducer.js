import * as types from './actionTypes';

const initialState = {
  status: null,
};

export default function explore(state = initialState, action = {}) {
  switch (action.type) {
    case types.EXPLORE_REQUEST:
      return {
        ...state,
        status: 'explore_reqeust',
      };
    case types.EXPLORE_SUCCESS:
      return {
        ...state,
        status: 'explore_success',
      };
    case types.EXPLORE_ERROR:
      return {
        ...state,
        status: 'explore_error',
      };
    default:
      return state;
  }
}
