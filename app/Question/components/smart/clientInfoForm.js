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
import ModalDropdown from 'react-native-modal-dropdown';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { connect } from 'react-redux';
import ImageProgress from 'react-native-image-progress';
// import ProgressBar from 'react-native-progress/Bar';

const { width, height } = Dimensions.get('window');
const labelSex = ['Male', 'Female'];
const prices = [
  {item: '$', price: '$50-100', level: 1},
  {item: '$$', price: '$100-300', level: 2},
  {item: '$$$', price: '$300+', level: 3}
  ];

import * as CommonConstant from '../../../Components/commonConstant';
import UploadFromCameraRoll from '../../../Components/imageUploader';
import { allProfessions } from '../../../Components/tempDataUsers'
const background = require('../../../Assets/images/background.png');
const avatarDefault = require('../../../Assets/images/avatar.png');
import RadioButton from '../../../Explore/components/smart/radioButton';

class ClientInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      visibility : false,
      gender : labelSex[0],
      age : 28,
      address: '4 York st, Toronto',
      profession : props.explore && props.explore.professions && props.explore.professions[0] || {},
      priceLevel : prices[0].level,
      signUpRequest: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { user }, question: { error } } = nextProps;

    if (error) {
      Alert.alert(error);
      this.setState({ signUpRequest: false })
      return;
    }
    if (user && this.state.signUpRequest) {
      Actions.Main({ user_mode: CommonConstant.user_client });
    }
    this.setState({ signUpRequest: false });
  }

  get getShowNavBar() {
    return (
      <View style={ styles.navBarContainer }>
        <TouchableOpacity
          onPress={ () => this.onBack() }
          style={ styles.navButtonWrapper }
        >
          <EntypoIcons
            name="chevron-thin-left"
            size={ 25 }
            color="#fff"
          />
        </TouchableOpacity>
        <View style={ styles.navBarTitleContainer }>
          <Text style={ styles.textTitle }>CREATING YOUR PROFILE</Text>
        </View>
        <View style={ styles.navButtonWrapper }/>
      </View>
    );
  }

  onContinue () {
    const { createRole } = this.props;
    this.state.professions= [{profession: this.state.profession._id, priceLevel: this.state.priceLevel}];

    this.setState({ signUpRequest: true }, () => createRole(this.state));
  }

  onBack() {
    Actions.pop();
  }
  onSex(value) {
    this.setState({ gender: value });
  }
  onSelectProfession(value) {
    const profession = this.props.explore.professions.filter((e)=>e.name===value)[0];
    this.setState({ profession });
  }
  onCheckPrice(value) {
    this.setState({ priceLevel: value });
  }
  addAvatarUri = (uri) => {
    this.setState({ avatar: '' }, () => this.setState({ avatar: uri }));
  }

  render() {
    const { signUpRequest, avatar } = this.state;
    const { explore: { professions } } = this.props;
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
                  { avatar ?
                    <ImageProgress source={ {uri: avatar} } indicator={ActivityIndicator} style={ styles.imageAvatar } resizeMode="cover"/>
                    :
                    <Image source={ avatarDefault } style={ styles.imageAvatar } resizeMode="cover"/>
                  }
                  <UploadFromCameraRoll directlyUpload={true} addAvatarUri={this.addAvatarUri}/>
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
                    <View style={ styles.viewTwoText }>
                      <Text style={ styles.textCellTitle }>Visibility</Text>
                      <Text style={ styles.textSubTitle }>Enable professionals find your profile</Text>
                    </View>
                    <Switch
                      onValueChange={(value) => this.setState({ visibility: value })}
                      value={ this.state.visibility } />
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
                              trackStyle= {{backgroundColor: 'rgba(173, 230, 254, 0.5);'}}
                              thumbTouchSize={{width: 40, height: 60}}
                              thumbStyle={ styles.thumbStyle }
                              minimumValue={ 15 }
                              maximumValue={ 85 }
                              step={ 1 }
                              value = { this.state.age }
                              onValueChange={ (value) => this.setState({ age: value }) }
                      />
                    </View>
                  </View>

                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Looking for</Text>
                    <View style={ styles.dropdownWrapper }>
                      <ModalDropdown
                        options={ professions.map((e)=>e.name) }
                        dropdownStyle={ styles.dropdownStyle }
                        onSelect={ (rowId, rowData) => this.onSelectProfession(rowData) }
                      >
                        <Text  numberOfLines={1} style={ [styles.dropdown, styles.dropDownText] }>{this.state.profession.name}</Text>
                        <EvilIcons
                          style={ styles.iconDropDown }
                          name="chevron-down"
                          size={ 20 }
                          color="#10c7f9"
                        />
                      </ModalDropdown>
                    </View>
                  </View>

                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Price</Text>
                    <View style={ styles.pricesBlock }>
                    {
                      prices.map((item, index) =>(
                        <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onCheckPrice(item.level) }>
                          <View style={ [styles.viewTwoText, item.level === this.state.priceLevel ? styles.priceButtonChecked : styles.priceButton] }>
                            <Text style={ [styles.textCellValue, item.level === this.state.priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.item }</Text>
                            <Text style={ [styles.textSubTitle, item.level === this.state.priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.price }</Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    }

                    </View>
                  </View>
                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Main Address</Text>
                    <View style={ styles.viewInput }>
                      <TextInput
                        autoCapitalize="none"
                        autoCorrect={ false }
                        placeholder="Main Address"
                        placeholderTextColor="#9e9e9e"
                        style={ styles.textInputRight }
                        value={ this.state.address }
                        onChangeText={ (text) => this.setState({ address: text }) }
                      />
                    </View>
                  </View>

                </View>
              </ScrollView>
              <View style={ styles.bottomButtonWrapper }>
                <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onContinue() }>
                  <View style={ styles.saveButton }>
                    <Text style={ styles.buttonTextSave }>SAVE</Text>
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
    position: 'relative'
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
  priceButtonChecked: {
    borderWidth: 1,
    borderColor: '#19b8ff',
    backgroundColor: '#19b8ff',
    alignItems: 'center',
    borderRadius: 30,
    width: 70,
    marginLeft: 15,
  },
  priceButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 30,
    width: 70,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#19b8ff',
  },
  priceButtonTextChecked: {
    color: '#fff',
    textAlign: 'center',
  },
  priceButtonText: {
    color: '#6b6b6b',
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
    paddingVertical: 11,
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
    fontSize: 10,
  },
  avatarContainer: {
    position: 'relative',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTopBackground: {
    width: width,
    height: 100,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarBottomBackground: {
    width: width,
    height: 100,
    backgroundColor: '#fff',
  },
  imageAvatar: {
    height: 160,
    width: 160,
    borderRadius: 80,
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
    marginHorizontal: 70,
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
    marginTop: -15,
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
    height: 20,
    marginBottom: -8,
  },
  textAboveSlider: {
    textAlign: 'center',
    height: 15,
    width: 20,
    color: '#6b6b6b',
    fontSize: 13,
  },
  thumbStyle:{
    top:11,
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
    overflow:'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width : width * 0.4,
  },
  dropdown: {
    width : width * 0.4,
  },
  dropdownStyle: {
    height: 100,
    width : width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:  15,
    borderWidth: 1,
    borderColor: '#6ad0fd',
    marginTop: 1,
    overflow: 'hidden',
  },
  dropDownText: {
    color: '#6b6b6b',
    fontSize: 14,
    fontFamily: 'Open Sans',
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 20
  },
  iconDropDown: {
    position: 'absolute',
    right: 4,
    top: 1
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
  textInputRight: {
    fontFamily: 'Open Sans',
    width: width*0.6,
    color: '#1e1e1e',
    fontSize: 14,
    height: 20,
    textAlign: 'right'
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#10c7f9'
  },
});

export default connect(state => ({
  auth: state.auth,
  question: state.question,
  explore: state.explore,
  }),
)(ClientInfoForm);