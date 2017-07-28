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
import { GiftedChat, MessageText, Bubble } from 'react-native-gifted-chat';
import OfferMessage from './offerMessage';
import FullScreenLoader from '../../../Components/fullScreenLoader';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');


export default class ChatForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getMessages(this.props.id);
  }

  componentWillUnmount() {
    if (this.props.unmountCallback) {
      this.props.unmountCallback();
    }
  }

  onSend(messages) {
    this.props.sendMessage(this.props.id, messages[0].text);
  }

  onBack() {
    Actions.pop();
  }

  get getShowNavBar() {
    const { username } = this.props;

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

        <Text style={ styles.textTitle }>{ username }</Text>

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

  renderMessageText(props) {

    switch (props.currentMessage.type) {
      case 'chat': {
        if (props.currentMessage.text) {
          const {containerStyle, wrapperStyle, ...messageTextProps} = props;
          return <MessageText
            {...messageTextProps}
            textStyle={
              textMessageStyles.textStyle
            }
          />;
        }
        return null;
      }
      case 'notification': 
        return null;
      default: 
        return null;
    }
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={ bubbleStyles.wrapperStyle }
        textStyle={ bubbleStyles.textStyle }
      /> 
    );
  }

  renderSend(data) {
    const text = data.text.trim();
    let buttonDisabled = true,
        buttonStyle = styles.sendButtonBlocked;
    
    if (text) {
      buttonDisabled = false;
      buttonStyle = styles.sendButton;
    }

    return (
      <TouchableOpacity
        style={ styles.sendButtonWrapper }
        onPress={ () => {
          data.onSend({text: data.text.trim()}, true);
        }}
        disabled={ buttonDisabled }
      >
        <Image 
          source={require('../../../Assets/images/send_message.png')}
          style={ buttonStyle }
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { user } = this.props.auth.user;
    return this.props.loadingMessages ?
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
                actions={ 
                  { getContractForAccept: this.props.getContractForAccept }
                }
                onSend={ this.onSend.bind(this) }
                user={{
                  _id: user,
                }}
                renderCustomView={ this.renderCustomView }
                renderSend={ this.renderSend }
                renderMessageText={ this.renderMessageText }
                renderBubble={ this.renderBubble }
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
    backgroundColor: '#f4f4f4',
  },
  sendButton: {
    width: 30,
    height: 30,
  },
  sendButtonBlocked: {
    width: 30,
    height: 30,
    opacity: 0.3,
  },
  sendButtonWrapper: {
    alignSelf: 'center',
  },
});

const bubbleStyles = {
  wrapperStyle: {
    left: {
      backgroundColor: '#4ac4fb',
    },
    right: {
      backgroundColor: '#e5e5e5'
    }
  },
  textStyle: {
    left: {
      color: 'white',
    },
    right: {
      color: 'black',
    },
  }
};

export const textMessageStyles = {
  textStyle: {
    left: {
      color: 'white',
      fontSize: 14,
    },
    right: {
      color: 'black',
      fontSize: 14,
    },
  },
}