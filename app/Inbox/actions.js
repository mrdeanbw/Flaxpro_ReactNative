import * as types from './actionTypes';
import request from '../request';
import {
  mapChatResponseToState,
  mapNewChatToState,
  mapMessageByType,
  generateMessageId,
} from './utils';


//inbox pure actions

const updateChatsStart = () => {
  return {
    type: types.INBOX_REQUEST,
  };
};

const updateChatsError = () => {
  return {
    type: types.INBOX_ERROR,
  };
};

const updateChatsSuccess = (chats) => {
  return {
    type: types.INBOX_SUCCESS,
    chats,
  };
};

const addNewChat = (chat) => {
  return {
    type: types.INBOX_ADD,
    chat,
  }
};

export const addNewChatResponse = (response) => {
  const newChat = mapChatResponseToState(response.chat);
  return addNewChat(newChat);
};

export const updateChatsWithMessage = (response) => {
  const message = mapMessageByType(response);
  return {
    type: types.INBOX_UPDATE_WITH_NEW_MESSAGE,
    message,
  };
};

export const updateUnreadChats = (unreadChats) => {
  let count = unreadChats;

  if (count < 0) {
    count = 0;
  }

  return {
    type: types.MESSAGES_UNREAD_EVENT,
    unreadChats: count,
  };
};

// messages, pure actions

const updateMessagesRequest = () => {
  return {
    type: types.MESSAGES_REQUEST,
  };
};

const updateMessagesSuccess = (chatId, messages) => {
  return {
    type: types.MESSAGES_SUCCESS,
    messages,
  };
};

const updateMessagesError = () => {
  return {
    type: types.MESSAGES_ERROR,
  };
};

export const saveMessageToStore = (response) => {
  const id = generateMessageId(),
        message = mapMessageByType(response, id);
  return {
    type: types.MESSAGES_ADD_NEW,
    message,
  };
};

// Open/close chat actions, pure

const activateChatRequest = () => {
  return {
    type: types.INBOX_ACTIVATE_CHAT_REQUEST,
  };
};

const activateChatSuccess = (chat) => {
  return {
    type: types.INBOX_ACTIVATE_CHAT_SUCCESS,
    chat,
  };
};

const activateChatError = (chat) => {
  return {
    type: types.INBOX_ACTIVATE_CHAT_ERROR,
  };
};

const removeActiveChat = () => {
  return {
    type: types.INBOX_DEACTIVATE_CHAT,
  };
};

// Open/close chat actions, not pure

export const activateChatByChatId = (chatId) => async (dispatch, store) => {
  dispatch(activateChatRequest());
  const { inbox } = store();
  const chatIndex = inbox.chats.findIndex((chat) => chat.id === chatId);

  if (chatIndex === -1) {  dispatch(activateChatError()) };
  const chat = inbox.chats[chatIndex];
  dispatch(activateChatSuccess(chat));
};

export const activateChatByUserId = (userId, username = "") => async (dispatch, store) => {
  dispatch(activateChatRequest());
  const { auth } = store(),
        url = '/chats';

  const body = {
    user: userId,
  },
  options = {
    method: 'post',
    body: JSON.stringify(body),
  };

  
  try {
    const response = await request(url, options, auth);
    const chat = mapNewChatToState(response, username);
    dispatch(activateChatSuccess(chat));
  } catch (error) {
    console.log('chat creating error', error);
    dispatch(activateChatError());
  }
};

export const deactivateChat = (chatId) => async (dispatch, store) => {
  const { auth } = store();
  const url = `/chats/read/${chatId}`,
        options = {
          method: 'post',
          body: "",
        };
  
  try {
    const response = await request(url, options, auth);
    dispatch(getChats());
  } catch (error) {
    console.log('deactivate chat error', error);
    dispatch(updateChatsError);
  };
};

// Inbox, not pure actions

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

// chat, not pure actions 

export const getChatByUser = (userId) => async (dispatch, store) => {
  dispatch(updateChatsStart());
  const { auth } = store();
  const url = '/chats',
    body = {
      user: userId,
    },
    options = {
      method: 'post',
      body: JSON.stringify(body),
  };

  try {
    const response = await request(url, options, auth);
    const chat = mapChatResponseToState(response);
    dispatch(addNewChat(chat));
  } catch (error) {
    console.log('get chat by user error:', error);
    dispatch(updateChatsError());
  }
};

export const createChat = (userId) => async (dispatch, store) => {
  dispatch(updateChatsStart());
  const { auth } = store(),
        url = '/chats';

  const body = {
    user: userId,
  },
  options = {
    method: 'post',
    body: JSON.stringify(body),
  };

  try {
    const response = await request(url, options, auth),
          chat = mapChatResponseToState(response);
  } catch (error) {
    console.log('chat creating error', error);
    dispatch(updateChatsError());
  }
};

export const removeChat = (chatId) => async (dispatch, store) => {
  dispatch(updateChatsStart());
  
  const { auth } = store(),
        url = `/chats/${chatId}`;
  
  const options = {
    method: 'delete',
  };

  try {
    const response = await request(url, options, auth);
    let [...chats] = store().inbox.chats;
    chats = chats.filter((chat) => chat.id !== chatId);
    
    dispatch(updateChatsSuccess(chats));

  } catch (error) {
    console.log('chat removing error', error);
    dispatch(updateChatsError());
  };
};

// messages, not pure actions

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

export const sendMessage = (chatId, text) => async (dispatch, store) => {
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
  } catch (error) {
    console.log('error posting', error);
    dispatch(updateMessagesError());
  }
};

