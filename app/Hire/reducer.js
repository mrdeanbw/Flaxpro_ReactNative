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
  addCardForm: false,
  loading: false,
  creditCardsList: [],
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
    case types.PAYMENT_CHANGEFORM:
      return {
        ...state,
        addCardForm: action.addCardForm,
      };
    case types.PAYMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.GET_CARDS_SUCCESS:
      return {
        ...state,
        creditCardsList: action.data,
        error: null
      };
    default:
      return state;
  }
}
