import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Actions } from 'react-native-router-flux';
import localStorage from 'react-native-local-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CommonConstant from '../../../Components/commonConstant';

//const variable
const { width, height } = Dimensions.get('window');
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//const image
const background = require('../../../Assets/background_auth.png');
const userIcon = require('../../../Assets/user.png');
const lockIcon = require('../../../Assets/lock.png');
const facebookIcon = require('../../../Assets/facebook.png');
const twitterIcon = require('../../../Assets/twitter.png');
const googleIcon = require('../../../Assets/google.png');
const linkedinIcon = require('../../../Assets/linkedin.png');
const arrow = require('../../../Assets/right_arrow.png');
const triangle = require('../../../Assets/triangle.png');

//auth redux store
import * as authActions from '../../actions';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email : 'client@mail.com', //TODO: for testing
      password : 'password', //TODO: for testing
      confirmPassword: '',
      selectedButton: 2,
      loginRequest: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { user } } = nextProps;

    if (user) {
      Actions.Main({user_mode: user.professional ? CommonConstant.user_trainer : CommonConstant.user_client});
    }
    this.setState({ loginRequest: false });
  }

  onShowLogIn() {
    this.setState({ selectedButton: 2 });
    this.setState({ email : '' });
    this.setState({ password : '' });
    this.setState({ confirmPassword : '' });
  }

  onShowSignUp() {
    this.setState({ selectedButton: 1 });
    this.setState({ email : '' });
    this.setState({ password : '' });
    this.setState({ confirmPassword : '' });
  }

  //validate email
  validateEmail(email) {
    return emailPattern.test(email);
  }

  onLogIn () {
    const { email, password } = this.state;
    const { actions } = this.props;

    if (!this.validateEmail(email)) {
      Alert.alert('Not a valid e-mail address.');
      return;
    }

    if (password == '') {
      Alert.alert('Password can\'t be empty.');
      return;
    }

    // this.props.login(this.state.email, this.state.password);

    this.setState({ loginRequest: true });
    actions.login(email, password);

    // localStorage.get(CommonConstant.user_mode)
    //   .then((data) => {
    //     const isClient = data == CommonConstant.user_client,
    //       isProfessional = data == CommonConstant.user_trainer
    //     if (isClient || isProfessional) {
    //       // console.log('actions', actions, this.props);
    //       actions.login(email, password);
    //       Actions.Main({ user_mode: data });
    //       return;
    //     }
    //
    //     Actions.WhoAreYou();
    //   });
  }

  onSignUp() {

    if (this.state.email == '') {
      Alert.alert('Please enter email address.');
      return;
    }

    if (this.state.password == '') {
      Alert.alert('Please enter password.');
      return;
    }

    if (this.state.confirmPassword == '') {
      Alert.alert('Please enter confirm password.');
      return;
    }

    if (this.state.password != this.state.confirmPassword) {
      Alert.alert('The password is not matched.');
      this.setState({ password: '' });
      this.setState({ confirmPassword: '' });
      return;
    }

    Actions.WhoAreYou();
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

  get showSignUp () {

    return (
      <View style={ styles.mainContentContainer }>
        <View style={ styles.inputWrap }>
          <View style={ styles.iconWrap }>
            <Image source={ userIcon } style={ styles.icon } resizeMode="contain" />
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={ false }
            placeholder="Enter your Email"
            placeholderTextColor="#9e9e9e"
            color="#000"
            style={ styles.textInput }
            value={ this.state.email }
            keyboardType='email-address'
            onChangeText={ (text) => this.setState({ email: text }) }
          />
        </View>
        <View style={ styles.inputWrap }>
          <View style={ styles.iconWrap }>
            <Image source={ lockIcon } style={ styles.icon } resizeMode="contain" />
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={ false }
            placeholder="Password"
            placeholderTextColor="#9e9e9e"
            color="#000"
            style={ styles.textInput }
            secureTextEntry
            value={ this.state.password }
            onChangeText={ (text) => this.setState({ password: text }) }
          />
        </View>
        <View style={ styles.inputWrap }>
          <View style={ styles.iconWrap }>
            <Image source={ lockIcon } style={ styles.icon } resizeMode="contain" />
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={ false }
            placeholder="Repeat Password"
            placeholderTextColor="#9e9e9e"
            color="#000"
            style={ styles.textInput }
            secureTextEntry
            value={ this.state.confirmPassword }
            onChangeText={ (text) => this.setState({ confirmPassword: text }) }
          />
        </View>
        <View style={ styles.arrowButtonContainer }>
          <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onSignUp() }>
            <View style={ styles.arrowButton }>
              <Image source={ arrow } style={ styles.imageArrow } />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  get showLogin () {
    const { loginRequest } = this.state;

    return (
      <View style={ styles.mainContentContainer }>
        <View style={ styles.inputWrap }>
          <View style={ styles.iconWrap }>
            <Image source={ userIcon } style={ styles.icon } resizeMode="contain" />
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={ false }
            placeholder="Enter your Email"
            placeholderTextColor="#9e9e9e"
            color="#000"
            style={ styles.textInput }
            value={ this.state.email }
            keyboardType='email-address'
            onChangeText={ (text) => this.setState({ email: text }) }
          />
        </View>
        <View style={ styles.inputWrap }>
          <View style={ styles.iconWrap }>
            <Image source={ lockIcon } style={ styles.icon } resizeMode="contain" />
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={ false }
            placeholder="Password"
            placeholderTextColor="#9e9e9e"
            color="#000"
            style={ styles.textInput }
            secureTextEntry
            value={ this.state.password }
            onChangeText={ (text) => this.setState({ password: text }) }
          />

          <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onForgotPassword() }>
            <Text style={ styles.forgotPasswordText }>Forgot?</Text>
          </TouchableOpacity>

        </View>
        <View style={ styles.arrowButtonContainer }>
          <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onLogIn() }>
            <View style={ styles.arrowButton }>
              {loginRequest ? <ActivityIndicator
                style={[styles.centering, styles.gray]}
                color="#0000ff"
                size="large"
              /> : <Image source={ arrow } style={ styles.imageArrow } />}
            </View>
          </TouchableOpacity>
        </View>
        <Text style={ styles.lineOR }>OR</Text>

        <View style={ styles.socialContainer }>
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
      </View>
    );
  }


  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={ false }
        >
          <View style={ styles.topContainer }>
            <Image source={ background } style={ styles.background } resizeMode="cover">
              <View style={ styles.authContainer }>
                <View style={ styles.authButtonContainer }>
                  <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onShowSignUp() }>
                    <View style={ styles.authButton }>
                      <Text style={ styles.buttonText }>SIGNUP</Text>
                      {
                        this.state.selectedButton == 1 ?
                          <Image source={ triangle } style={ styles.imageTriangle } />
                          :
                          <View style={ styles.buttonPaddingView } />
                      }
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={ styles.authButtonContainer }>
                  <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onShowLogIn() }>
                    <View style={ styles.authButton }>
                      <Text style={ styles.buttonText }>LOGIN</Text>
                      {
                        this.state.selectedButton == 2 ?
                          <Image source={ triangle } style={ styles.imageTriangle } />
                          :
                          <View style={ styles.buttonPaddingView } />
                      }
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
          </Image>
          </View>
          <View style={ styles.bottomContainer }>

            {
              this.state.selectedButton == 1 ?
                this.showSignUp
                :
                this.showLogin
            }

          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1.743,
  },
  bottomContainer: {
    flex: 1,
  },
  background: {
    width,
    height: height * 0.635,
  },
  authContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  authButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  authButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 50,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    paddingBottom: 5,
  },
  buttonPaddingView:{
    paddingBottom: 12,
  },
  imageTriangle: {
    width: 24,
    height: 12,
  },
  mainContentContainer: {
    flex: 1,
    marginVertical: 10,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 23,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  imageArrow: {
    width: 30,
    height: 24,
  },
  arrowButtonContainer: {
    flex: 1.5,
    justifyContent: 'center',
  },
  arrowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 50,
  },
  lineOR :{
    flex: 0.5,
    textAlign:'center',
    backgroundColor: 'transparent',
    color:'#4e4f4f',
    fontSize:12,
  },
  socialContainer: {
    flex: 1,
    justifyContent:'space-around',
    alignItems: 'center',
    flexDirection:'row',
    marginHorizontal: 50,
    paddingVertical: 10,
  },
  socialButton: {
    backgroundColor: 'transparent',
  },
  socialIcon: {
    height:40,
    width:40,
  },
  forgotPasswordText: {
    color: '#7cd5fd',
    backgroundColor: 'transparent',
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 24
  },
  gray: {
    backgroundColor: '#fff',
  },
});

export default connect(state => {
    console.log('state', state);
    return ({
      auth: state.auth
    })
  },
  (dispatch) => {
    console.log('authActions', authActions);
    return ({
      actions: bindActionCreators(authActions, dispatch)
    })
  }
)(AuthForm);
