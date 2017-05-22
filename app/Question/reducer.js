import * as types from './actionTypes';

const initialState = {
  error: null,
  firstForm: true,
};

export default function question(state = initialState, action = {}) {
  switch (action.type) {
    case types.QUESTION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case types.PROFESSIONALINFO_CHANGEFORM:
      return {
        ...state,
        error: null,
        firstForm: action.firstForm,
      };
    default:
      return state;
  }
}
