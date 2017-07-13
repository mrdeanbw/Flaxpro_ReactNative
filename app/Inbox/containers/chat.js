'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ChatForm from '../components/smart/chatForm';
import * as inboxActions from '../actions';
import { connect } from 'react-redux';
import Loader from '../../Components/fullScreenLoader'

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    console.log('chats props', newProps)
  }

  componentWillUnmount() {
    // console.log('chat unmount props', this.props);
    const chatId = this.props.inbox.activeChat.id;
    this.props.actions.deactivateChat(chatId);
    // this.props.actions.getChats(chatId);
  }

  render() {
    const { actions, inbox, auth } = this.props,
          { messages, id } = inbox.activeChat;
    return inbox.loadingChat ? 
      (<Loader />)
      :
      (
        <ChatForm 
          { ...actions }
          auth={ auth }
          messages={ messages }
          id={ id }
          loadingMessages={ inbox.loadingMessages }
          username={ inbox.activeChat.name }
        />
      );
  }
}

export default connect(state => ({
    inbox: state.inbox,
    auth: state.auth,
  }),
  (dispatch) => ({
    actions: bindActionCreators(inboxActions, dispatch)
  })
)(Chat);
