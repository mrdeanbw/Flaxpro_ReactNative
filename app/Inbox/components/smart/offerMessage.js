import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native'
import { MessageContainer } from 'react-native-gifted-chat';
import { Actions } from 'react-native-router-flux';
import { textMessageStyles } from './chatForm';

export default class OfferMessage extends Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    const formType = this.props.currentMessage.formType,
          contractId = this.props.currentMessage.link;
    this.props.actions.getContractForAccept(contractId);
    Actions.SummaryAcceptForm({
      formType: formType,
      contractId,
    });
  }

  render() {
    if (this.props.currentMessage.type === 'notification') {
      const buttonText = this.props.currentMessage.buttonName,
            notificationText = this.props.currentMessage.text,
            textStyles = this.props.position === 'left' ? styles.offerTextLeft : styles.offerTextRight,
            textHeadStyles = this.props.position === 'left' ? styles.offerHeadTextLeft : styles.offerHeadTextRight,
            username = this.props.currentMessage.user.name;
      
      return (
        <View
          style={ styles.offerView }
        >
          <Text
            style={ textHeadStyles }
          >
            { `You received a proposal from ${username}` }
          </Text>
          <Text
            style={ textStyles }
          >
            { notificationText }
          </Text>
          <TouchableHighlight
            style={ styles.offerButton }
            onPress={ this.onClick.bind(this) }
            activeOpacity={ 50 }
            underlayColor = { '#000' }
          >
            <Text
              style={ styles.buttonText }
            >
            { buttonText.toUpperCase() }
            </Text>
          </TouchableHighlight>
        </View>
      )
    }
    return null;
  }
  
}

const styles = StyleSheet.create({
  offerView: {
    margin: 5,
    marginBottom: 0,
    padding: 7,
  },
  offerButton: {
    padding: 6,
    margin: 7,
    marginBottom: 0,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#4ac4fb',
  },
  offerTextLeft: {
    fontSize: 14,
    color: 'white',
  },
  offerHeadTextLeft: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  offerTextRight: {
    fontSize: 14,
    color: 'black',
  },
  offerHeadTextRight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});