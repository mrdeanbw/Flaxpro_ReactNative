import socketio from 'socket.io-client';

import { store } from './app';
import * as actions from './Inbox/actions';

class SocketController {
    constructor() {
        const url = 'ws://192.168.88.226:3000';
        this.socket = new socketio(url, {
          jsonp: false,
          autoConnect: false,
        });
        this.user;
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
      const that = this;

      socket.on('connect', function() {
        if (that.user) {
          this.emit('client:connect', that.user);
        }
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

      socket.on('disconnect', function() {
      });
    };


}

export default new SocketController();