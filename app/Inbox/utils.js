import * as constants from './constants';

export const mapChatResponseToState = (obj) => {

  const name = chooseChatName(obj),
        avatar = chooseAvatar(obj),
        group = createGroup(obj.users),
        messages = Object.keys(obj.message).length === 0 ? [] : [mapMessageResponseToState(obj.message)];

  const newChat = {
    id: obj._id,
    createdAt: new Date(obj.createdAt),
    updatedAt: obj.message.updatedAt ? new Date(obj.message.updatedAt) : null,
    hasUnread: !obj.hasUnread,
    name,
    messages,
    avatar,
    group,
  };
  return newChat;
};

export const mapMessageByType = (obj, messageId) => {
  switch(obj.type) {
    case 'notification':
      return mapNotificationResponseToState(obj, messageId);
    case 'chat':
      return mapMessageResponseToState(obj, messageId);
    default:
      return mapMessageResponseToState(obj, messageId);
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
    type: obj.type,
  };
}

const mapNotificationResponseToState = (obj, messageId, messageType = 'notification') => {
  let notification = mapMessageResponseToState(obj, messageId, 'notification');
  notification.link = obj.link;
  return notification;
}

/*
    Creates time as hh:mm in 12-hour format
*/
export const createFancyTime = (date) => {
  let hours = date.getHours(),
      minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  
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

