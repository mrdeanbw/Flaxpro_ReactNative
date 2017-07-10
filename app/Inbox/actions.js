import * as types from './actionTypes';
import request from '../request';

import {
  mapChatResponseToState,
  mapMessageByType,
  generateMessageId,
} from './utils';

export function inbox() {
  return {
    type: [types.INBOX_REQUEST, types.INBOX_SUCCESS, types.INBOX_ERROR]
  };
}

// Chat actions

export const updateChatsSuccess = (chats) => {
  return {
    type: types.INBOX_SUCCESS,
    chats,
  }
};

export const updateChatsStart = () => {
  return {
    type: types.INBOX_REQUEST,
  }
};

export const updateChatsError = () => {
  return {
    type: types.INBOX_ERROR,
  }
};

export const getChats = () => async (dispatch, store) => {
  dispatch(updateChatsStart());

  const { auth } = store();
  const url = '/chats';
  const options = {
    method: 'get',
  };

  try {
    const response = await request(url, options, auth);
    const chats = response.inbox.map(mapChatResponseToState);
    dispatch(updateChatsSuccess(chats));
  } catch (error) {
    console.log('error', error)
    dispatch(updateChatsError());
  }
};

// Messages actions

export const activateChat = (activeChat) => {
  return {
    type: types.CHAT_ACTIVATE,
    activeChat,
  };
};

export const deactivateChat = () => {
  return {
    type: types.CHAT_DEACTIVATE,
  };
};

export const updateMessagesRequest = () => {
  return {
    type: types.CHAT_REQUEST,
  };
};

export const updateMessagesSuccess = (chatId, messages) => {
  return {
    type: types.CHAT_SUCCESS,
    payload: {
      chatId,
      messages: messages,
    }
  };
};

export const updateMessagesError = () => {
  return {
    type: types.CHAT_ERROR,
  };
};

export const updateMessageAddRequest = () => {
  return {
    type: types.CHAT_POST_REQUEST,
  };
};

export const getMessages = (chatId) => async (dispatch, store) => {
  dispatch(updateMessagesRequest());
  const { auth } = store();
  const options = {
    method: 'get',
  };

  const url = '/chats/' + chatId;
  try {
    const response = await request(url, options, auth);
    const mappedMessages = response.messages.map(mapMessageByType);
    dispatch(updateMessagesSuccess(chatId, mappedMessages));
  } catch (error) {
    console.log('__get messages error__', error);
    dispatch(updateMessagesError());
  }

};

export const initMessages = (chatId) => (dispatch, store) => {
  dispatch({type: types.CHAT_INIT});
  dispatch(getMessages(chatId));
};

export const sendMessage = (chatId, text) => async (dispatch, store) => {
  dispatch(updateMessageAddRequest());
  const { auth } = store(),
    body = {
      chat: chatId,
      text: text,
    };
  
  const options = {
    method: 'post',
    body: JSON.stringify(body)
  };

  const url = '/chats/message';
  try {
    const response = await request(url, options, auth);
    // dispatch(saveMessageToStore(response.message));
  } catch (error) {
    console.log('error posting', error);
    dispatch(updateMessagesError());
  }
};

export const saveMessageToStore = (response) => {
  const id = generateMessageId(),
        message = mapMessageByType(response, id);
  return {
    type: types.CHAT_CONCAT,
    message
  };
};

export const updateUnreadChats = (unreadChats) => {
  let count = unreadChats;

  if (count < 0) {
    count = 0;
  }

  return {
    type: types.CHAT_UNREAD_CHAT,
    unreadChats: count,
  }
}