import * as types from './actionTypes';

const initialState = {
  status: null,
  firstForm: true,
};

export default function question(state = initialState, action = {}) {
  switch (action.type) {
    case types.CLIENTINFO_REQUEST:
      return {
        ...state,
        status: '-----clientinfo saving',
      };
    case types.CLIENTINFO_SUCCESS:
      return {
        ...state,
        status: '-----clientinfo saved',
      };
    case types.CLIENTINFO_ERROR:
      return {
        ...state,
        status: '-----clientinfo failed',
      };
    case types.PROFESSIONALINFO_REQUEST:
      return {
        ...state,
        status: '-----professionalinfo saving',
      };
    case types.PROFESSIONALINFO_SUCCESS:
      return {
        ...state,
        status: '-----professionalinfo saved',
      };
    case types.PROFESSIONALINFO_ERROR:
      return {
        ...state,
        status: '-----professionalinfo failed',
      };
    case types.PROFESSIONALINFO_CHANGEFORM:
      return {
        ...state,
        firstForm: action.firstForm,
      };
    default:
      return state;
  }
}
