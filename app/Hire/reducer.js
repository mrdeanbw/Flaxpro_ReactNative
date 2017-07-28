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
  paymentForm: false,
  payment: null,
  loadingForm: false,
};

export default function hire(state = initialState, action = {}) {
  switch (action.type) {

    case types.CONTRACT_REQUEST:
      return {
        ...state,
        loadingForm: true,
      };
    case types.CONTRACT_CHANGEFORM:
      return {
        ...state,
        error: null,
        firstForm: action.firstForm,
        secondForm: action.secondForm,
        paymentForm: action.paymentForm,
        summaryForm: action.summaryForm,
        numberOfSessions: action.numberOfSessions,
        numberOfPeople: action.numberOfPeople,
        selectedDates: action.selectedDates,
        selectedTimes: action.selectedTimes,
        offerPrice: action.offerPrice,
        payment: action.payment,
        loadingForm: action.loadingForm,
        status: action.status,
      };
    case types.CONTRACT_CHOOSE_SCREEN: 
      return {
        ...state,
        firstForm: action.firstForm,
        secondForm: action.secondForm,
        paymentForm: action.paymentForm,
        summaryForm: action.summaryForm,
      };
    case types.HIRE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        schedule: action.schedule,
      };
    case types.HIRE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
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
        error: null,
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
        loading: false,
        error: null
      };
    case types.HIRE_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
