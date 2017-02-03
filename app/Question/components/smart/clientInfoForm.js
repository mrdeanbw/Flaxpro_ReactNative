import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const markIcon = require('../../../Assets/flaxpro_mark.png');


export default class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.markWrap }>
            <Image source={ markIcon } style={ styles.mark } resizeMode="contain" />
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
  markWrap: {
    flex: 1,
    paddingTop: 40,
  },
  mark: {
    flex: 1,
    width: 160,
    height: 50,
    alignSelf: 'center',
  },
  background: {
    width,
    height,
  },
});