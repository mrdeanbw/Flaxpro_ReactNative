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

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');


export default class ChatForm extends Component {
  constructor(props) {
    super(props);
     
    this.state = {
      messages: [],
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'ChatRequest') {

    } else if (newProps.status == 'ChatSuccess') {

    } else if (newProps.status == 'ChatError') {

    }
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'This is the greatest fitness app on earth and your avatar looks amazing',
          createdAt: new Date(Date.UTC(2017, 2, 14, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState( (previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
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

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          { this.getShowNavBar }
          <View style={ styles.contentContainer }>
            
            <GiftedChat
              messages={ this.state.messages }
              onSend={ (messages = []) => this.onSend(messages) }
              user={{
                _id: 1,
              }}
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
  contentContainer: {
    flex: 9.2,
    backgroundColor: '#fff',
  },
});