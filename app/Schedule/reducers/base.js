import * as ActionTypes from '../actions/ActionTypes'

export default function base(state = {}, action){
  switch(action.type) {
    case ActionTypes.SHOW_PROGRESS:
      {
        return Object.assign({}, state, {
          isShowProgress: true
        })
      }
    case ActionTypes.HIDE_PROGRESS:
      {
        return Object.assign({}, state, {
          isShowProgress: false
        })
      }
    default:
      return state;
  }
}
