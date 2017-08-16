import * as types from './actionTypes';
import {
  PRICES as prices,
  professional_filter_labels as professionalLabels,
  professional_filter_names as professionalStateNames,
} from '../Components/commonConstant';

const initialState = {
  loading: false,
  error: null,
  professionals: [],
  clients: [],
  professions: [],
  dataForProfessionalFilter: createData(professionalStateNames, professionalLabels)
};


export default function explore(state = initialState, action = {}) {
  switch (action.type) {
    case types.EXPLORE_GET_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case types.EXPLORE_SET_FILTERS:
      return {
        ...state,
        dataForProfessionalFilter: action.dataForProfessionalFilter,
      };
    case types.EXPLORE_GET_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case types.EXPLORE_GET_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        clients: action.clients || state.clients,
        professionals: action.professionals || state.professionals,
        professions: action.professions || state.professions,
      };
    case types.EXPLORE_SET_DEFAULT:
      return{
        ...state,
        error:null
      };
    default:
      return state;
  }
}


function getDefaultState(stateName, labels) {
  if (stateName === 'priceLevel') {
    return prices[0].level;
  };
  return labels[stateName][0];
}

function createData(list, labels){
  const data = {
    filters: {},
    isSelected: {},
  };
  list.map(stateName => {
    data.isSelected[stateName] = true;
    data.filters[stateName] = getDefaultState(stateName, labels);
  });
  return data;
}