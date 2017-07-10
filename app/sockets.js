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

    init() {
      if (this.socket.connected) {
        this.socket.off();
        this.socket.close();
      }
      this.socket.connect();

      this.subscribeSocket(this.socket);
      let unsubsribe = store.subscribe(() => {
        const { auth, inbox } = store.getState();
        this.user = auth.user.user;
        this.socket.emit('client:connect', this.user);
        unsubsribe();
      });
    }

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
        }
      });

      socket.on('server:unreadCount', function(data) {
        store.dispatch(actions.updateUnreadChats(data.count)); 
      });

      socket.on('disconnect', function() {
      });
    }


}

export default new SocketController();