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
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { GiftedChat } from 'react-native-gifted-chat';
import OfferMessage from './offerMessage';
import FullScreenLoader from '../../../Components/fullScreenLoader';


const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');


export default class ChatForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
  }

  componentWillMount() {
    this.props.actions.getMessages(this.props.id);
  }

  componentWillUnmount() {
    this.props.actions.getChats();
    this.props.actions.deactivateChat();
  }

  onSend(messages = []) {
    this.props.actions.sendMessage(this.props.id, messages[0].text);
  }

  onBack() {
    Actions.pop();
  }

  get getShowNavBar() {
    const { userName } = this.props;

    return (
      <View style={ styles.navBarContainer }>
        <TouchableOpacity
          onPress={ () => this.onBack() }
          style={ styles.navButtonWrapper }
        >
          <EntypoIcons
            name="chevron-thin-left"  size={ 25 }
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={ styles.textTitle }>{ userName }</Text>

        <View style={ styles.navButtonWrapper }/>
      </View>
    );
  }

  renderCustomView(props) {
    return (
      <OfferMessage
        {...props}
      /> 
    );
  }

  render() {
    const { user } = this.props.auth.user;
    return this.props.loading ?
      (
        <FullScreenLoader />
      )
      :
      ( 
        <View style={ styles.container }>
          <Image source={ background } style={ styles.background } resizeMode="cover">
            { this.getShowNavBar }
            <View style={ styles.contentContainer }>
              <GiftedChat
                messages={ this.props.messages }
                onSend={ (messages = []) => this.onSend(messages) }
                user={{
                  _id: user,
                }}
                renderCustomView={this.renderCustomView}
              />
            </View>
          </Image>
        </View>
      )
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
  contentContainer: {
    flex: 9.2,
    backgroundColor: '#fff',
  },
});