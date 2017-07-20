import * as types from './actionTypes';

const initialState = {
  loadingInbox: false,
  loadingChat: false,
  loadingMessages: false,
  chats: [],
  unreadChats: 0,
  activeChat: {},
}

export default function inbox(state = initialState, action = {}) {
  switch (action.type) {
    case types.INBOX_REQUEST:
      return {
        ...state,
        loadingInbox: true,
      };
    case types.INBOX_SUCCESS:
      return {
        ...state,
        loadingInbox: false,
        chats: action.chats,
      };
    case types.INBOX_ERROR:
      return {
        ...state,
        loadingInbox: false,
      };
    case types.INBOX_ADD:
      return addChatToStore(state, action);
    case types.INBOX_ACTIVATE_CHAT_REQUEST: 
      return {
        ...state,
        loadingChat: true,
      };
    case types.INBOX_ACTIVATE_CHAT_SUCCESS:
      return {
        ...state,
        activeChat: {...action.chat},
        loadingChat: false,
      };
    case types.INBOX_ACTIVATE_CHAT_ERROR: 
      return {
        ...state,
        loadingChat: false,
      }
    case types.INBOX_DEACTIVATE_CHAT: 
      return {
        ...state,
        activeChat: {},
      }
    case types.INBOX_UPDATE_WITH_NEW_MESSAGE: 
      return addNewMessage(state, action);
    case types.MESSAGES_REQUEST:
      return {
        ...state,
        loadingMessages: true,
      };
    case types.MESSAGES_SUCCESS: 
      let activeChat = {...state.activeChat, messages: action.messages};
      return {
        ...state,
        activeChat,
        loadingMessages: false,
      };
    case types.MESSAGES_UNREAD_EVENT:
      if (state.unreadChats === action.unreadChats) { return state; };
      return {
        ...state,
        unreadChats: action.unreadChats,
      };
    case types.MESSAGES_ADD_NEW:
      if (Object.keys(state.activeChat).length === 0) { return state; }
      if (action.message.chatId !== state.activeChat.id) { return state; }
      const messages = [action.message].concat(state.activeChat.messages);
      return {
        ...state,
        activeChat: { ...state.activeChat, messages }
      };
    default: 
      return state;
  }
}


const addNewMessage = (state, action) => {
  const { message } = action;

  const chatId = message.chatId,
        chat = state.chats.find((chat) => chat.id === chatId);

  if (chat) {
    const newChat = updateChat(chat, message);
    let newChats = state.chats.filter((chat) => chat.id !== newChat.id);
    return {
      ...state,
      chats: [newChat].concat(newChats),
    }
  } else {
    return state;
  }
};

const updateChat = (chat, message) => {
  let newChat = { ...chat };
  newChat.message = message;
  newChat.hasUnread = false;
  return newChat;
};

const addChatToStore = (state, action) => {
  const { chat } = action;
  const { id } = chat;

  let [ ...chats ] = state.chats,
      chatIndex = chats.findIndex((chat) => chat.id === id);

  if (chatIndex === -1) {
    return {
      ...state,
      loading: false,
      chats: [chat].concat(chats),
    };
  } else {
    return {...state, loading: false, };
  }
};