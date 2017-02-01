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
import Hr from 'react-native-hr';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const markIcon = require('../../../Assets/flaxpro_mark.png');
const userIcon = require('../../../Assets/user.png');
const lockIcon = require('../../../Assets/lock.png');

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
          <View style={ styles.wrapper }>
            <View style={ styles.inputWrap }>
              <View style={ styles.iconWrap }>
                <Image source={ lockIcon } style={ styles.icon } resizeMode="contain" />
              </View>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#FFF"
                color="#FFF"
                style={ styles.input }
              />
            </View>
            <View style={ styles.inputWrap }>
              <View style={ styles.iconWrap }>
                <Image source={ lockIcon } style={ styles.icon } resizeMode="contain" />
              </View>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#FFF"
                color="#FFF"
                secureTextEntry
                style={ styles.input }
              />
            </View>
            <TouchableOpacity activeOpacity={ .5 }>
              <View style={ styles.button }>
                <Text style={ styles.buttonText }>Log In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={ .5 }>
              <View>
                <Text style={ styles.forgotPasswordText }>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Hr lineColor="white" text="OR"/>
          <View style={ styles.container }>
            <View style={ styles.loginWrap }>
              <Text style={ styles.accountText }>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={.5}>
                <View>
                  <Text style={ styles.loginLinkText }>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
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
  wrapper: {
    paddingVertical:10,
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 40,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 30,
    width: 23,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#ffffff",
    borderStyle: 'solid',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    marginTop: 30,
    marginBottom:30,
    marginLeft: 40,
    marginRight: 40,
  },
  buttonText: {
    color: '#73d3fd',
    fontSize: 20,
  },
  forgotPasswordText: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    textDecorationLine : 'underline',
    fontSize:18,
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom:20,
  },
  loginWrap: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    color: '#272727',
  },
  loginLinkText: {
    color: '#37a1cf',
    marginLeft: 5,
  }
});