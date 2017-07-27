import socketio from 'socket.io-client';

import { store } from './app';
import * as actions from './Inbox/actions';

class SocketController {
    constructor() {
        const url = 'ws://13.59.22.166:3000'; //AWS server
        // const url = 'ws://192.168.88.226:3000'; //Dunice server 
        this.socket = new socketio(url, {
          jsonp: false,
          autoConnect: false,
        });
    }

    init(userId) {
      if (this.socket.connected) {
        this.socket.off();
        this.socket.close();
      }
      this.socket.connect();

      this.subscribeSocket(this.socket);
      this.socket.emit('client:connect', userId);
    };

    close() {
      if (this.socket.connected) {
        this.socket.off();
        this.socket.close();
      };
    };

    subscribeSocket(socket, auth, inbox) {
      socket.on('connect', function() {
      });

      socket.on('message', function(data) {
        if (data.type === 'message') {
          store.dispatch(actions.saveMessageToStore(data.message));
          store.dispatch(actions.updateChatsWithMessage(data.message));
        }
      });

      socket.on('server:unreadCount', function(data) {
        store.dispatch(actions.updateUnreadChats(data.count)); 
      });

      socket.on('server:newChat', function(data) {
        const newChat = data;
        store.dispatch(actions.addNewChatResponse(newChat));
      });

      socket.on('disconnect', function() {
      });
    };


}

export default new SocketController();