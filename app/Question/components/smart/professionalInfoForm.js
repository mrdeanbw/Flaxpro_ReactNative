import React, { Component } from 'react';
import {
  Animated,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';

import Slider from 'react-native-slider';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import { Actions } from 'react-native-router-flux';
import localStorage from 'react-native-local-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width, height } = Dimensions.get('window');
const labelSex = ['Male', 'Female'];
const prices = [{item: '$', price: '$50-100'},{item: '$$', price: '$100-300'},{item: '$$$', price: '$300+'}]

import * as CommonConstant from '../../../Components/commonConstant';
import { allProfessions } from '../../../Components/tempDataUsers'
const background = require('../../../Assets/images/background.png');
const markIcon = require('../../../Assets/images/flaxpro_mark.png');
const avatar = require('../../../Assets/images/avatar.png');
const edit_avatar = require('../../../Assets/images/edit_avatar.png');
import RadioButton from '../../../Explore/components/smart/radioButton';

const professionalNames = allProfessions.map(item => item.name)
//auth redux store
import * as authActions from '../../../Auth/actions';

class ProfessionalInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      visibilityProfile : false,
      gender : labelSex[0],
      age : 20,
      phoneNumber : '',
      professional : true,
      // allergies : '',
      // injuries : '',
      signUpRequest: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { user } } = nextProps;

    if (user) {
      Actions.Main({ user_mode: CommonConstant.user_client });
    }
    this.setState({
      signUpRequest: false ,
      // visibility: false ,
    });
  }

  get getShowNavBar() {
    const { editable, auth } = this.props;

    return (
      // editable ?
      //   <View style={ styles.navBarContainer }>
      //     <TouchableOpacity
      //       onPress={ () => this.onSchdule() }
      //       style={ styles.navButtonWrapper }
      //     >
      //       <Image source={ schedule } style={ styles.imageSchedule } resizeMode="cover"/>
      //     </TouchableOpacity>
      //
      //     <Text style={ styles.textTitle }>{ auth.user.name.toUpperCase() }</Text>
      //
      //     <TouchableOpacity
      //       onPress={ () => this.onEdit() }
      //       style={ styles.navButtonWrapper }
      //     >
      //       <Image source={ edit } style={ styles.imageEdit } resizeMode="cover"/>
      //     </TouchableOpacity>
      //   </View>
      //   :
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
        <View style={ styles.navBarTitleContainer }>
          <Text style={ styles.textTitle }>CREATING YOUR PROFILE</Text>
          {/*<Text style={ styles.textSubTitle }>New good life, Fitness</Text>*/}
        </View>
        <View style={ styles.navButtonWrapper }/>
      </View>
    );
  }

  onContinue () {
    const { actions } = this.props;

    localStorage.get('userData')
      .then((data) => {
        actions.createUser({ ...data, ...this.state })
        localStorage.save('userData', null);
        this.setState({ signUpRequest: true });
        Actions.Main({ user_mode: CommonConstant.user_trainer });
      });
  }

  onBack() {
    Actions.pop();
  }
  onSex(value) {
    this.setState({ gender: value });
  }
  onSelectProfession(value) {
    this.setState({ profession: value });
  }
  onCheckPrice(value) {
    this.setState({ price: value });
  }

  render() {
    const { status } = this.props,
      { signUpRequest } = this.state;
    let scale = (width * 3/4 -75) / 72 ;
    return (
      <View style={ styles.container }>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={ false }
        >
          <Image source={ background } style={ styles.background } resizeMode="cover">
            { this.getShowNavBar }
            <View style={ styles.contentContainer }>
              <View style={ styles.avatarContainer }>
                <View style={ styles.avatarTopBackground }/>
                <View style={ styles.avatarBottomBackground }/>
                <View style={ styles.avatarWrapper }>
                  <Image source={ avatar } style={ styles.imageAvatar } resizeMode="cover"/>
                  <Image source={ edit_avatar } style={ styles.imageEditAvatar } resizeMode="cover"/>
                </View>
              </View>
              <View style={ styles.cellContainer }>
                <View style={ styles.viewInputCenter }>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={ false }
                    placeholder="Add your name here"
                    placeholderTextColor="#9e9e9e"
                    style={ styles.textInputCenter }
                    value={ this.state.name }
                    onChangeText={ (text) => this.setState({ name: text }) }
                  />
                </View>
              </View>
              <ScrollView>
                <View style={ styles.mainContainer }>
                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Phone Number</Text>
                    <View style={ styles.viewInput }>
                      <TextInput
                        autoCapitalize="none"
                        autoCorrect={ false }
                        placeholder="+1"
                        placeholderTextColor="#9e9e9e"
                        style={ styles.textInputCenter }
                        value={ this.state.phoneNumber }
                        keyboardType='numeric'
                        onChangeText={ (text) => this.setState({ phoneNumber: text }) }
                       />
                    </View>
                  </View>

                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Visibility profile</Text>
                    <Switch
                      onValueChange={(value) => this.setState({ visibilityProfile: value })}
                      value={ this.state.visibilityProfile } />
                  </View>

                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Gender</Text>
                    <View style={ styles.cellValueContainer }>
                      {
                        labelSex.map(value => {
                          return (
                            <RadioButton
                              style={ styles.paddingTwo }
                              key={ value }
                              label={ value }
                              color="#19b8ff"
                              iconStyle={ styles.iconButton }
                              labelStyle={ styles.textInput }
                              checked={ this.state.gender == value }
                              onPress={ () => this.onSex(value) }
                            />
                          );
                        })
                      }
                    </View>
                  </View>

                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Age</Text>
                    <View style={ styles.viewSlider }>
                      <Animated.View style={ [styles.animateContainer, {paddingLeft: (this.state.age -15) * scale}] }>
                        <Animated.View style={ styles.bubble }>
                          <Animated.Text style={ [styles.textAboveSlider, styles.priceButtonText] }>{ this.state.age }</Animated.Text>
                        </Animated.View>
                        <Animated.View style={ styles.arrowBorder } />
                        <Animated.View style={ styles.arrow } />
                      </Animated.View>
                      <Slider style={ styles.slider }
                              maximumTrackTintColor="#9be5ff"
                              minimumTrackTintColor="#10c7f9"
                              thumbStyle={ styles.thumbStyle }
                              minimumValue={ 15 }
                              maximumValue={ 85 }
                              step={ 1 }
                              value = { this.state.age }
                              onValueChange={ (value) => this.setState({ age: value }) }
                      />
                    </View>
                  </View>

                </View>
              </ScrollView>
              <View style={ styles.bottomButtonWrapper }>
                <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onContinue() }>
                  <View style={ styles.saveButton }>
                    <Text style={ styles.buttonTextSave }>NEXT</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Image>
        </KeyboardAwareScrollView>
        { signUpRequest ? <View
          style={styles.activityIndicatorContainer}>
            <ActivityIndicator
            style={styles.activityIndicator}
            color="#0000ff"
            size="large"
          />
        </View> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  activityIndicator: {
    flex: 1,
  },
  activityIndicatorContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#a3a4a7',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    opacity: 0.5,
    width,
    height
  },
  markWrap: {
    flex: 2,
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
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnActivityWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  oneColumn: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  rowWrapper: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'center',
  },
  bottomButtonWrapper: {
    marginHorizontal: 30,
    justifyContent: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#19b8ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    height: 40,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  priceButton: {
    backgroundColor: '#19b8ff',
    alignItems: 'center',
    borderRadius: 30,
    width: 70,
    marginLeft: 15,
  },
  priceButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  pricesBlock: {
    flexDirection: 'row',
  },
  inputWrap: {
    height: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  text: {
    height: 20,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    fontSize: 15,
  },
  input: {
    height: 20,
    color: '#fff',
    backgroundColor: 'transparent',
  },

  buttonTextSave: {
    fontFamily: 'Open Sans',
    color: '#fff',
    fontSize: 20,
  },
  viewSlider:{
    flex: 1,
    flexDirection: 'column',
    marginLeft: width/4,
  },
  navBarContainer: {
    flex: 0.7,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonWrapper: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  navBarTitleContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  },
  textSubTitle: {
    fontFamily: 'Open Sans',
    color: '#707070',
    fontSize: 10,
  },
  contentContainer: {
    // paddingBottom: 90,
    flex: 8.5,
    backgroundColor: '#f6f8f9',
  },
  cellValueContainer: {
    flexDirection: 'row',
  },
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  viewTwoText: {
    flexDirection: 'column',
  },
  textSectionTitle: {
    fontFamily: 'Open Sans',
    color: '#6b6b6b',
    fontSize: 12,
  },
  textCellTitle: {
    fontFamily: 'Open Sans',
    color: '#1e1e1e',
    fontSize: 14,
  },
  textCellValue: {
    fontFamily: 'Open Sans',
    color: '#707070',
    fontSize: 14,
  },
  avatarContainer: {
    position: 'relative',
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTopBackground: {
    width: width,
    height: 105,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarBottomBackground: {
    width: width,
    height: 105,
    backgroundColor: '#fff',
  },
  imageAvatar: {
    height: 160,
    width: 160,
    borderRadius: 80,
  },
  imageEditAvatar: {
    height: 41,
    width: 41,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  avatarWrapper: {
    backgroundColor: '#fff',
    position: 'absolute',
    left: width / 2 - 82,
    height: 164,
    width: 164,
    borderRadius: 82,
    top: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontFamily: 'Open Sans',
    color: '#6b6b6b',
  },
  textInputCenter: {
    fontFamily: 'Open Sans',
    flex: 1,
    color: '#1e1e1e',
    fontSize: 14,
    height: 20,
  },
  viewInputCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width/2 -100,
    borderBottomWidth: 1,
    borderBottomColor: '#9e9e9e',
  },
  viewInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginHorizontal: width/2 -85,
    borderBottomWidth: 1,
    borderBottomColor: '#9e9e9e',
  },
  paddingTwo: {
    marginRight: 10,
    paddingVertical: 0,
  },
  iconButton: {
    fontSize: 20,
    marginRight: 5,
    marginLeft: -5,
  },
  animateContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginRight: 6,
    marginLeft: -6,
  },
  bubble: {
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    flex: 0,
    alignSelf: 'flex-start',
    backgroundColor: '#19b8ff',
    borderRadius: 5,
    borderColor: '#19b8ff',
    borderWidth: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#19b8ff',
    alignSelf: 'center',
    marginTop: -12,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#19b8ff',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  slider: {
    marginRight: 15,
    alignItems: 'center',
    height: 20,
    marginBottom: -10,
  },
  textAboveSlider: {
    textAlign: 'center',
    height: 15,
    width: 20,
    color: '#6b6b6b',
    fontSize: 13,
  },
  thumbStyle:{
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderColor: '#10c7f9',
    borderWidth: 1
  },
  dropdownWrapper: {
    flexDirection: 'row',
    height: 25,
    borderWidth: 1,
    borderColor: '#10c7f9',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  dropdown: {
    width : width * 0.3,
  },

  dropdownStyle: {
    height: 100,
    width : width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',

  },
  dropDownText: {
    color: '#6b6b6b',
    fontSize: 14,
    fontFamily: 'Open Sans',
    textAlign: 'center',
  },
  textSelectedCellValue: {
    color: '#4dc7fd',
    fontSize: 14,
  },

  circleSelectNumberWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    backgroundColor: '#6b6b6b',
    marginRight: 10,
  },
  circleNumberWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    backgroundColor: 'transparent',
    marginRight: 10,
  },
});

export default connect(state => ({
    auth: state.auth
  }),
  (dispatch) => ({
      actions: bindActionCreators(authActions, dispatch)
    })
)(ProfessionalInfoForm);