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
  Alert,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const markIcon = require('../../../Assets/flaxpro_mark.png');
const userIcon = require('../../../Assets/user.png');
const lockIcon = require('../../../Assets/lock.png');
const facebookIcon = require('../../../Assets/facebook.png');
const twitterIcon = require('../../../Assets/twitter.png');
const googleIcon = require('../../../Assets/google.png');
const linkedinIcon = require('../../../Assets/linkedin.png');


export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName : '',
      password : '',
    };
  }

  onLogIn () {

    if (this.state.userName == '') {
      Alert.alert('Please enter user name.');
      return;
    }

    if (this.state.password == '') {
      Alert.alert('Please enter password.');
      return;
    }

    this.props.login(this.state.userName, this.state.password);
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'loginingIn') {

    } else if (newProps.status == 'loggedIn') {

    } else if (newProps.status == 'logIn failed') {

    }
  }

  onSignUp() {
    Alert.alert('Clicked onSignUp');
  }

  onForgotPassword() {
    Alert.alert('Clicked onForgotPassword');
  }

  onFacebook() {
    Alert.alert('Clicked onFacebook');
  }

  onTwitter() {
    Alert.alert('Clicked onTwitter');
  }

  onGoogle() {
    Alert.alert('Clicked onGoogle');
  }

  onLinkedIn () {
    Alert.alert('Clicked onLinkedIn');
  }

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.markWrap }>
            <Image source={ markIcon } style={ styles.mark } resizeMode="contain" />
          </View>
          <View style={ styles.inputWrap }>
            <View style={ styles.iconWrap }>
              <Image source={ userIcon } style={ styles.icon } resizeMode="contain" />
            </View>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#FFF"
              color="#FFF"
              style={ styles.input }
              value={ this.state.userName }
              onChangeText={ (text) => this.setState({ userName: text }) }
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
              value={ this.state.password }
              onChangeText={ (text) => this.setState({ password: text }) }
            />
          </View>
          <View style={ styles.buttonWrapper }>
            <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onLogIn() }>
              <View style={ styles.loginButton }>
                <Text style={ styles.buttonText }>Log In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={ styles.buttonWrapper }>
            <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onForgotPassword() }>
              <View>
                <Text style={ styles.forgotPasswordText }>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={ styles.lineWarp }>
            <View style={ styles.lineLeft }></View>
            <Text style={ styles.lineOR }>OR</Text>
            <View style={ styles.lineRight }></View>
          </View>
          <View style={ styles.socialWrap }>
            <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onFacebook() }>
              <View style={ styles.socialButton }>
                <Image source={ facebookIcon } style={ styles.socialIcon } resizeMode="contain" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onTwitter() }>
              <View style={ styles.socialButton }>
                <Image source={ twitterIcon } style={ styles.socialIcon } resizeMode="contain" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onGoogle() }>
              <View style={ styles.socialButton }>
                <Image source={ googleIcon } style={ styles.socialIcon } resizeMode="contain" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onLinkedIn() }>
              <View style={ styles.socialButton }>
                <Image source={ linkedinIcon } style={ styles.socialIcon } resizeMode="contain" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={ styles.signupWrap }>
            <Text style={ styles.accountText }>Don't have an account?</Text>
            <TouchableOpacity activeOpacity={.5} onPress={ () => this.onSignUp() }>
              <View>
                <Text style={ styles.signupLinkText }>Sign Up</Text>
              </View>
            </TouchableOpacity>
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
    flex: 2,
    paddingTop: 50,
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
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 40,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 23,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    borderStyle: 'solid',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    marginVertical: 10,
    marginHorizontal: 40,
    height: 50,
  },
  buttonText: {
    color: '#73d3fd',
    fontSize: 20,
  },
  forgotPasswordText: {
    color: '#fff',
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
    fontSize: 16,
    textAlign: 'center',
  },
  lineWarp: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  lineLeft:{
    width: width * 0.4,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  lineRight:{
    width: width * 0.4,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  lineOR :{
    textAlign:'center',
    backgroundColor: 'transparent',
    color:'#fff',
    fontSize:12,
  },
  socialWrap: {
    flex: 1,
    justifyContent:'space-around',
    alignItems: 'center',
    flexDirection:'row',
    marginHorizontal: 30,
    paddingVertical: 10,
  },
  socialButton: {
    backgroundColor: 'transparent',
  },
  socialIcon: {
    height:50,
    width:50,
  },
  signupWrap: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  accountText: {
    color: '#272727',
  },
  signupLinkText: {
    color: '#37a1cf',
    marginLeft: 5,
  },
});