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
import localStorage from 'react-native-local-storage';
import { SwipeListView } from 'react-native-swipe-list-view';

import InboxListCell from './inboxListCell';
import * as CommonConstant from '../../../Components/commonConstant';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const edit = require('../../../Assets/edit.png');
const call = require('../../../Assets/inbox_call.png');
const remove = require('../../../Assets/inbox_delete.png');


import { Messages } from '../../../Components/dummyEntries';


export default class InboxForm extends Component {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSourceInbox: Messages,
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'InboxRequest') {

    } else if (newProps.status == 'InboxSuccess') {

    } else if (newProps.status == 'InboxError') {

    }
  }

  renderInboxRow(rowData, sectionID, rowID) {
    return (
      <InboxListCell
        index={ Number(rowID) + 1 }
        name={ rowData.name }
        time={ rowData.time }
        message= { rowData.message }
        avatar={ rowData.avatar }
        read={ rowData.read }
        group={ rowData.group }
        onClick={ () => this.onCellPressed(rowID) }
      />
    );
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
    
    this.setState ((state) => {
      state.dataSourceInbox[index].read = true;
      return state;
    });

    Actions.ChatForm({ userName: this.state.dataSourceInbox[index].name });
  }

  onEdit() {

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
              dataSource={ this.dataSource.cloneWithRows(this.state.dataSourceInbox) }
              renderRow={ this.renderInboxRow.bind(this) }
              contentContainerStyle={ styles.inboxListView}
              disableRightSwipe={ true }
              renderHiddenRow={ this.renderInboxHiddenRow.bind(this) }
   						leftOpenValue={ 75 }
  						rightOpenValue={ -150 }
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