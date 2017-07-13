import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native'
import { MessageContainer } from 'react-native-gifted-chat';
import { Actions } from 'react-native-router-flux';

export default class OfferMessage extends Component {
  constructor(props) {
    super(props);

  }

  onClick() {
    alert('onClickWorks!');
  }

  render() {
    if (this.props.currentMessage.type === 'notification') {
      return (
          <TouchableHighlight
            style={ styles.offerButton }
            onPress={ this.onClick.bind(this) }
            activeOpacity={ 50 }
            underlayColor = { '#000' }
          >
            <Text
              style={ styles.offerText }
            >
              SUMMARY
            </Text>
          </TouchableHighlight>
      )
    }
    return null;
  }
  
}

const styles = StyleSheet.create({
  offerView: {
    borderRadius: 20,
  },
  offerButton: {
    margin: 7,
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'green',
  },
  offerText: {
    color: '#94daf2',
    fontSize: 12,
    textAlign: 'center',
  },
});