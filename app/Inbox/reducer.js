import * as types from './actionTypes';

const initialState = {
  status: null,
};

export default function inbox(state = initialState, action = {}) {
  switch (action.type) {
    case types.INBOX_REQUEST:
      return {
        ...state,
        status: 'InboxRequest',
      };
    case types.INBOX_SUCCESS:
      return {
        ...state,
        status: 'InboxSuccess',
      };
    case types.INBOX_ERROR:
      return {
        ...state,
        status: 'InboxError',
      };

    default:
      return state;
  }
}
