import * as types from './actionTypes';

const initialState = {
  status: null,
  error: null,
  firstForm: true,
  secondForm: false,
  summaryForm: false,
  numberOfSessions: 1,
  numberOfPeople: 1,
  selectedDates: [],
  selectedTimes: [],
  schedule: [],
};

export default function hire(state = initialState, action = {}) {
  switch (action.type) {
    case types.CONTRACT_CHANGEFORM:
      return {
        ...state,
        error: null,
        firstForm: action.firstForm,
        secondForm: action.secondForm,
        summaryForm: action.summaryForm,
        numberOfSessions: action.numberOfSessions,
        numberOfPeople: action.numberOfPeople,
        selectedDates: action.selectedDates,
        selectedTimes: action.selectedTimes,
      };
    case types.HIRE_SUCCESS:
      return {
        ...state,
        error: null,
        schedule: action.schedule,
      };
    case types.HIRE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
