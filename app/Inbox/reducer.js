import * as types from './actionTypes';

const initialState = {
  status: null,
  loading: false,
  chats: [],
  activeChat: null,
  unreadChats: 0,
}

export default function inbox(state = initialState, action = {}) {
  switch (action.type) {
    case types.INBOX_REQUEST:
      return {
        ...state,
        status: types.INBOX_REQUEST,
      };
    case types.INBOX_SUCCESS:
      return {
        ...state,
        status: types.INBOX_SUCCESS,
        chats: action.chats,
      };
    case types.INBOX_ERROR:
      return {
        ...state,
        status: types.INBOX_ERROR,
      };
    case types.CHAT_REQUEST: 
      return {
        ...state,
        loading: true,
        status: types.CHAT_REQUEST,
      };
    case types.CHAT_SUCCESS:
      return addMessagesToStore(state, action);
    case types.CHAT_ERROR: 
      return {
        ...state,
        loading: false,
        status: types.CHAT_ERROR
      };
    case types.CHAT_CONCAT:
      return addMessageToChat(state, action);
    case types.CHAT_UNREAD_CHAT:
      if (state.unreadChats === action.unreadChats) { return state };
      return {
        ...state,
        status: types.CHAT_UNREAD_CHAT,
        unreadChats: action.unreadChats,
      };
    case types.CHAT_POST_REQUEST:
      return {
        ...state,
        status: types.CHAT_POST_REQUEST,
      };
    default:
      return state;
  };
}

const addMessagesToStore = (state, action) => {
    const { chatId, messages } = action.payload;
    let [ ...chats ] = state.chats,
        chatIndex = chats.findIndex((chat) => chat.id === chatId);
    
    if (chatIndex === -1) { return state }
    chats[chatIndex].messages = messages;
    return {
      ...state,
      loading: false,
      status: types.CHAT_SUCCESS,
      chats,
    };
}

const addMessageToChat = (state, action) => {
    if (state.chats.length === 0) { return state }; 
    
    const { message } = action,
          chatId = message.chat;
    
    let [ ...chats ] = state.chats;
    const chatIndex = chats.findIndex((chat) => chat.id == chatId);
    
    if (chatIndex == -1) { return state };
    const newMessages = [message].concat(chats[chatIndex].messages);
    chats[chatIndex].messages = newMessages;
    
    return {
      ...state,
      status: types.CHAT_CONCAT,
      chats,
    }
};