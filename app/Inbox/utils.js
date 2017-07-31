import * as constants from './constants';
import { randomString } from '../Utils';
import { SUMMARY_FORM_TYPES } from '../Hire/constants';

export const mapChatResponseToState = (obj) => {

  const name = chooseChatName(obj),
        avatar = chooseAvatar(obj),
        group = createGroup(obj.users),
        message = Object.keys(obj.message).length === 0 ? null : mapMessageByType(obj.message);

  const newChat = {
    id: obj._id,
    createdAt: new Date(obj.createdAt),
    updatedAt: obj.message.updatedAt ? new Date(obj.message.updatedAt) : null,
    hasUnread: !obj.hasUnread,
    name,
    message,
    avatar,
    group,
  };
  return newChat;
};

export const mapNewChatToState = (obj, username) => {
  return {
    id: obj.chatId,
    createdAt: new Date(),
    updatedAt: null,
    hasUnread: false,
    name: username,
    messages: [],
    avatar: null,
    group: [],
  }
}

export const mapMessageByType = (obj) => {
  const _id = randomString(32);
  switch(obj.type) {
    case 'notification':
      return mapNotificationResponseToState(obj, _id);
    case 'chat':
      return mapMessageResponseToState(obj, _id);
    default:
      return mapMessageResponseToState(obj, _id);
  }
}

const mapMessageResponseToState = (obj, messageId, messageType = 'chat') => {
  return {
    chat: obj.chat,
    _id: messageId,
    createdAt: obj.createdAt,
    text: obj.text,
    user: {
      _id: obj.user._id,
      name: obj.user.name,
      avatar: obj.user.avatar, 
    },
    chatId: obj.chat,
    type: obj.type,
    isMe: obj.user.isMe,
  };
}

const mapNotificationResponseToState = (obj, messageId, messageType = 'notification') => {
  let notification = mapMessageResponseToState(obj, messageId, 'notification');
  
  notification.object = obj.object;
  notification.buttonName = obj.buttonName;
  
  let isConfirmable = chooseConfirmable(notification.object, notification.isMe);

  notification.formType = isConfirmable ? SUMMARY_FORM_TYPES.ACCEPT : SUMMARY_FORM_TYPES.VIEW;
  notification.link = obj.link;
  return notification;
}

/*
    Creates time as hh:mm in 12-hour format
*/
export const createFancyTime = (date) => {
  let hours = date.getHours(),
      minutes = date.getMinutes(),
      ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? '0'+hours : hours;
  minutes = minutes < 10 ? '0'+minutes : minutes;

  const strTime = hours + ':' + minutes + ampm;
  return strTime;
}

export const generateMessageId = () => {
  return Math.floor(Math.random() * 100000);
}

const chooseChatName = (obj) => {
  let name;
  if (obj.name) {
    name = obj.name;
  } else {
    name = constants.DEFAULT_CHAT_NAME;
  };

  return name;
};

const chooseAvatar = (obj) => {
  if (obj.users.length === 1) {
    if (obj.users[0].avatar) {
      return createAvatar(obj.users[0].avatar);
    }
    return {};
  } else {
    return {};
  };
};

const createAvatar = (url) => {
  return {
    uri: url,
  };
};

const chooseConfirmable = (type, isMe) => {
  let isConfirmable;
  
  if (type === 'contract') {
    isConfirmable = false;
  } else if (type === 'transaction') {
    isConfirmable = true;
  } else {
    isConfirmable = false;
  };

  if (!isMe) {
    isConfirmable = !isConfirmable;
  };

  return isConfirmable;
};

const createGroupObject = (user) => {
  let avatar = user.avatar ? createAvatar(user.avatar) : {};

  return {
    name: user.name,
    avatar: avatar,
    id: user._id,
  };
};

const createGroup = (users) => {
  if (users.length > 1) {
    return users.map(createGroupObject);
  }   
  return [];
};

