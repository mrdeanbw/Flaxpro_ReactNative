import React, { Component } from 'react';
import {
  AsyncStorage,
  Animated,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import ImageProgress from 'react-native-image-progress';

const { width, height } = Dimensions.get('window');
const labelSex = ['Male', 'Female'];

import SliderWithCounter from '../../../Components/sliderWithCounter';
import UploadFromCameraRoll from '../../../Components/imageUploader';
const background = require('../../../Assets/images/background.png');
const avatarDefault = require('../../../Assets/images/avatar.png');
import RadioButton from '../../../Components/radioButton';

class ProfessionalInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      visibility : false,
      gender : labelSex[0],
      age : 20,
      phone : '',
      professional: true,
    };
  }

  componentDidMount() {
    this.loadInitialState().done();
  }

  loadInitialState = async () => {
    try {
      const value = await AsyncStorage.getItem('professionalFirstForm');
      if (value !== null){
        this.setState({ ...JSON.parse(value)});
      }
    } catch (error) {
      Alert.alert('AsyncStorage error: ' + error.message);
    }
  };

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
    const { changeProfessionalForm } = this.props;
    AsyncStorage.setItem('professionalFirstForm', JSON.stringify(this.state));
    changeProfessionalForm({firstForm: false})

  }
  addAvatarUri = (uri) => {
    this.setState({ avatar: '' }, () => this.setState({ avatar: uri }));
  }
  onChangePhone(text) {
    if(text.length > 12) return;
    if(text.length === 3 && this.state.phone.length<3) text = text + "-";
    if(text.length === 7 && this.state.phone.length<7) text = text + "-";
    text = this.checkForNumber(...text)
    this.setState({ phone: text })
  }
  checkForNumber(...value){
    const numbers = '0123456789-';

    value = value.filter((e) => numbers.includes(e))
    return value.join('')
  }
  onBack() {
    Actions.pop();
  }
  onSex(value) {
    this.setState({ gender: value });
  }

  render() {
    const { avatar } = this.state;
    const sliderWidth = width * 1/4;
    const ageInitialValue = 15;
    const numberDivisions = 72;
    const allPaddingsMargings = 75;
    let scale = (width - sliderWidth - allPaddingsMargings) / numberDivisions ;
    const paddingLeft =(this.state.age - ageInitialValue) * scale;
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
                    <Text style={ styles.textCellTitle }>Phone Number</Text>
                    <View style={ styles.viewInput }>
                      <TextInput
                        autoCapitalize="none"
                        autoCorrect={ false }
                        placeholder="+1"
                        placeholderTextColor="#9e9e9e"
                        style={ styles.textInputCenter }
                        value={ this.state.phone }
                        keyboardType='numeric'
                        onChangeText={ (text) => this.onChangePhone(text) }
                       />
                    </View>
                  </View>

                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Visibility profile</Text>
                    <Switch
                      onValueChange={ ( value) => this.setState({ visibility: value }) }
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
                              checked={ this.state.gender === value }
                              onPress={ () => this.onSex(value) }
                            />
                          );
                        })
                      }
                    </View>
                  </View>

                  <View style={ [styles.cellContainer, {paddingRight:10}] }>
                    <Text style={ styles.textCellTitle }>Age</Text>
                    <View style={ styles.viewSlider }>
                      <SliderWithCounter
                        counter={this.state.age}
                        additionalOffset={-3}
                        onSlidingComplete={ (value) => this.setState({ age: value }) }
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
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
    paddingHorizontal: 15,
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
    marginHorizontal: 70,
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
    marginLeft: 15,
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
)(ProfessionalInfoForm);