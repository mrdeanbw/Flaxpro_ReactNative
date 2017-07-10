import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';

import { createFancyTime } from '../../utils';
import { tabs } from '../../../Main/constants';
import * as statuses from '../../actionTypes';
import InboxListCell from './inboxListCell';
import ChatForm from './chatForm';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');
const edit = require('../../../Assets/images/edit.png');
const call = require('../../../Assets/images/inbox_call.png');
const remove = require('../../../Assets/images/inbox_delete.png');
import { Messages } from '../../../Components/dummyEntries';

export default class InboxForm extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1 !== r2 });
    
    this.state = {
      activeChat: {
        isActive: false,
        chatIndex: -1,
      },
    };
  }

  componentDidMount() {
    this.props.getChats();
  }

  componentWillUnmount() {
    console.log('__inbox will destroyed__');
  }

  renderInboxRow(rowData, sectionID, rowID) {

    const time = rowData.updatedAt ? 
      createFancyTime(new Date(rowData.updatedAt)) 
      : 
      createFancyTime(new Date(rowData.createdAt)),
      message = rowData.messages.length > 0 ? rowData.messages[0].text : '';

    return (
      <InboxListCell
        index={ Number(rowID) + 1 }
        name={ rowData.name }
        time={ time }
        message={ message }
        avatar={ rowData.avatar }
        read={ rowData.hasUnread }
        group={ rowData.group }
        onClick={ () => this.onCellPressed(rowID) }
      />
    );
  }

  componentWillUpdate(nextProps) {
    console.log('__inbox will update__', nextProps.inbox.status);
    switch(nextProps.inbox.status){
      case statuses.INBOX_SUCCESS:
        break;
      case statuses.CHAT_SUCCESS:
      case statuses.CHAT_CONCAT:
        if (this.state.activeChat.isActive) {
          const chatIndex = this.state.activeChat.chatIndex;
          this.updateMessagesScreen(chatIndex);
        }
        break;
      case statuses.CHAT_UNREAD_CHAT:
        if (this.props.selectedTab === tabs.INBOX && !this.state.activeChat.isActive) {
          this.props.getChats();
        }
        break;
      default:
        break;
    };
  }

  renderInboxHiddenRow(data, secId, rowId, rowMap) {
    return(
      <View style={ styles.cellActionContainer }>
        <TouchableOpacity
          onPress={ () => this.onCall(secId, rowId, rowMap) }         
        >
          <Image style={ styles.imageAction } source={ call }/>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={ () => this.onRemove(secId, rowId, rowMap) }         
        >        
          <Image style={ styles.imageAction } source={ remove }/>
        </TouchableOpacity>
      </View>
    );
  }

  onCall(secId, rowId, rowMap) {
 		rowMap[`${secId}${rowId}`].closeRow();
    alert( 'tapped onCall!');
  }

  onRemove(secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].closeRow();
 		const newData = [...this.state.dataSourceInbox];
		newData.splice(rowId, 1);
		this.setState({ dataSourceInbox: newData });
  }

  onCellPressed(index) {
    let messages;
    const arrayIndex = index;
    this.chatActivate(index);

    if (this.props.inbox.chats[index].messages) {
      messages = this.props.inbox.chats[index].messages;
    } else {
      messages = []; 
    }
    Actions.ChatForm({
      id: this.props.inbox.chats[index].id,
      userName: this.props.inbox.chats[index].name,
      messages: messages,
      loading: this.props.inbox.loading,
      auth: this.props.auth,
      actions: {
        getMessages: this.props.getMessages,
        sendMessage: this.props.sendMessage,
        getChats: this.props.getChats,
        deactivateChat: this.chatDeactivate.bind(this),
      }
    });
  }

  onEdit() {

  }

  chatActivate(chatIndex) {
    this.setState(
      {
        activeChat: {
          isActive: true,
          chatIndex,
        }
      }
    );
  }

  chatDeactivate() {
    this.setState(     
      {
        activeChat: {
          isActive: false,
          chatIndex: -1,
        }
      }
    );
  }

  updateMessagesScreen(chatIndex) {
    Actions.refresh({
      messages: this.props.inbox.chats[chatIndex].messages,
    });
  }

  get getShowNavBar() {
    return (
      <View style={ styles.navBarContainer }>        
        <View style={ styles.navButtonWrapper }/>
        <Text style={ styles.textTitle }>INBOX</Text>
        <TouchableOpacity
          onPress={ () => this.onEdit() }
          style={ styles.navButtonWrapper }
        >
          <Image source={ edit } style={ styles.imageEdit } resizeMode="cover"/>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { status } = this.props;
    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          { this.getShowNavBar }
          <View style={ styles.contentContainer }>
            <SwipeListView
              dataSource={ this.dataSource.cloneWithRows(this.props.inbox.chats) }
              renderRow={ this.renderInboxRow.bind(this) }
              contentContainerStyle={ styles.inboxListView}
              disableRightSwipe={ true }
              renderHiddenRow={ this.renderInboxHiddenRow.bind(this) }
   						leftOpenValue={ 75 }
  						rightOpenValue={ -150 }
              enableEmptySections={true}
            />
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  navBarContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  navButtonWrapper: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textTitle: {
    flex: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    paddingBottom: 10,
  },
  imageEdit: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    flex: 9.2,
    backgroundColor: '#fff',
  },
  inboxListView: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
  },
  cellActionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageAction: {
    width: 75,
    height: 75,
  },

});