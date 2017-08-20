import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { connect } from 'react-redux';
import ImageProgress from 'react-native-image-progress';

import SliderWithCounter from '../../../Components/sliderWithCounter';
import UploadFromCameraRoll from '../../../Components/imageUploader';
import FullScreenLoader from '../../../Components/fullScreenLoader';
import RadioButton from '../../../Components/radioButton';
import DialogGoogleAutocomplete from '../../../Components/dialogGoogleAutocomplete';
import Prompt from 'react-native-prompt'

import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor,
  PRICES as prices,
  user_client,
} from '../../../Components/commonConstant';

const background = require('../../../Assets/images/background.png');
const avatarDefault = require('../../../Assets/images/avatar.png');
const labelSex = ['Male', 'Female'];

class ClientInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ' ',
      visibility: false,
      phone: '111-111-1111',
      gender: labelSex[0],
      age: 28,
      address: props.auth.currentAddress.formattedAddress || '',
      profession: props.explore && props.explore.professions && props.explore.professions[0] || {},
      priceLevel: prices[0].level,
      signUpRequest: false,
      description: ' ',
      otherProfession: '',
      promptVisible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { user, currentAddress }, question: { error } } = nextProps;

    if (error) {
      Alert.alert(error);
      this.setState({ signUpRequest: false })
      return;
    }
    if (user && this.state.signUpRequest) {
      Actions.Main({ user_mode: user_client });
    }
    if (currentAddress && currentAddress.formattedAddress) {
      this.setState({ address: currentAddress.formattedAddress });
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
    this.state.professions= [{profession: this.state.profession._id, priceLevel: parseInt(this.state.priceLevel)}];

    this.setState({ signUpRequest: true }, () => createRole(this.state));
  }

  onBack() {
    Actions.pop();
  }
  onSex(value) {
    this.setState({ gender: value });
  }
  onSelectProfession(value) {
    if(value !== 'other') {
       let profession = this.props.explore.professions.filter(e => e.name === value)[0];
       this.setState({ profession });
    }
    else {
      this.setState({promptVisible:true});
    }
    
  }

  onYes = (value) =>{
    let profession = {_id: '0', name: value, color: "#000000", icon: "../../Assets/images/sport.png"};
    this.setState({promptVisible:false, profession});
  }

  onCheckPrice(value) {
    this.setState({ priceLevel: value });
  }
  addAvatarUri = (uri) => {
    this.setState({ avatar: '' }, () => this.setState({ avatar: uri }));
  };

  onClosePopupAutocomplete () {
    this.dialogGoogleAutocomplete.popupAutocomplete.closeDialog ();
  }
  onSetPopupAutocomplete (data, details) {
    this.setState({ address: data.description || data.formatted_address });
    this.dialogGoogleAutocomplete.popupAutocomplete.closeDialog ();
  }
  onOpenPopupAutocomplete () {
    this.dialogGoogleAutocomplete.popupAutocomplete.openDialog ();
  }

  get dialogAutocomplete () {
    return (
      <DialogGoogleAutocomplete
        currentAddress={this.props.auth.currentAddress}
        onClosePopupAutocomplete={() => this.onClosePopupAutocomplete() }
        onSetPopupAutocomplete={(data, details) => this.onSetPopupAutocomplete(data, details) }
        ref={ (dialogGoogleAutocomplete) => { this.dialogGoogleAutocomplete = dialogGoogleAutocomplete; } }
      />
    );
  }

  render() {
    const { signUpRequest, avatar } = this.state;
    const { explore: { professions } } = this.props;
    let proList = professions.map((e)=>e.name);
    proList.push("other");
    return (
      <View style={ styles.container }>
        <Prompt
          title="Please input custom profession"
          visible={this.state.promptVisible}
          onCancel={()=>this.setState({promptVisible:false})}
          onSubmit={(value)=>this.onYes(value)}
        />
        <KeyboardAwareScrollView>
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

                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Looking for</Text>
                    <View style={ styles.dropdownWrapper }>
                      <ModalDropdown
                        options={ proList }
                        dropdownStyle={ styles.dropdownStyle }
                        onSelect={ (rowId, rowData) => this.onSelectProfession(rowData) }
                      >
                        <Text numberOfLines={1} style={ [styles.dropdown, styles.dropDownText] }>{this.state.profession.name}</Text>
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
                    <TouchableOpacity
                      onPress={ () => this.onOpenPopupAutocomplete() }
                    >
                      <View style={ styles.viewInput }>
                        <Text style={ styles.textInputRight } ellipsizeMode="tail">
                          { this.state.address }
                        </Text>
                      </View>
                    </TouchableOpacity>
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
        { this.dialogAutocomplete }
        { signUpRequest ? <FullScreenLoader/> : null }
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
    paddingHorizontal: 15,
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
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTopBackground: {
    width: width,
    height: 80,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarBottomBackground: {
    width: width,
    height: 80,
    backgroundColor: '#fff',
  },
  imageAvatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  avatarWrapper: {
    backgroundColor: '#fff',
    position: 'absolute',
    left: width / 2 - 62,
    height: 124,
    width: 124,
    borderRadius: 62,
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
    marginLeft: 15,
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