import * as ActionTypes from './ActionTypes'

export const showProgress = () => {
  return {
    type: ActionTypes.SHOW_PROGRESS,
  };
};

export const hideProgress = () => {
  return {
    type: ActionTypes.HIDE_PROGRESS,
  };
};
