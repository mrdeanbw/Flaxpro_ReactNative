import React, { Component } from 'react';
import {
  Alert,
  Animated,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';

import ImageProgress from 'react-native-image-progress';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SliderWithCounter from '../../../../Components/sliderWithCounter';
import ModalDropdown from 'react-native-modal-dropdown';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import RadioButton from '../../../../Components/radioButton';
import Toast from '../../../../Components/ToastComponent';
import UploadFromCameraRoll from '../../../../Components/imageUploader';
import InputCenter from '../../../../Components/inputCenter';
import FullScreenLoader from '../../../../Components/fullScreenLoader';
import DialogGoogleAutocomplete from '../../../../Components/dialogGoogleAutocomplete';
import * as profileActions  from '../../../actions';
import * as authActions  from '../../../../Auth/actions';

import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor,
} from '../../../../Components/commonConstant';

const background = require('../../../../Assets/images/background.png');
const avatarDefault = require('../../../../Assets/images/avatar.png');
const labelSex = ['Male', 'Female'];

const labelInsure = [{value:true, text:'Yes'}, {value: false, text:'No'}];
const labelOwn = ['Go to client', 'Own space', 'Both'];
const certificationsDefault = ['Certified personal trainer', 'Certified', 'No Certified'];

class EditProfile extends Component {

  constructor(props) {
    super(props);

    let user = {...props.profile.user};

    this.state = {
      ...user,
      price: this.priceToFloat(user.price),
      professional: true,
      own: user.toClient && user.ownSpace ? 'Both' : (user.toClient ? 'Go to client' : 'Own space'),
      address: user.location.originalAddress,
      updateRequest: false,
      showToast:false,
      toastMessage:''
    }

  }

  componentWillReceiveProps(nextProps) {
    const { profile: { error } } = nextProps;

    if (error) {
      Alert.alert(error);
    } else if (this.state.updateRequest) {
      this.setState({showToast:true, toastMessage:'Update Successful'});
      setTimeout(()=>{
        this.setState({showToast:false});
        this.onBack();
      }, 2000);
    }
    this.setState({updateRequest: false})
  }

  saveProfile() {
    const { updateProfile } = this.props;
    /**
     * 'price' to {number}
     */
    this.state.price = this.priceToInt(this.state.price);

    /**
     * 'profession' to {String} name
     */
    this.state.profession = this.state.profession && this.state.profession.name;

    if(this.state.own === 'Both') {
      this.state.toClient = true;
      this.state.ownSpace = true;
    }
    if(this.state.own === 'Go to client') {
      this.state.toClient = true;
      this.state.ownSpace = false;
    }
    if(this.state.own === 'Own space') {
      this.state.toClient = false;
      this.state.ownSpace = true;
    }

    this.setState({updateRequest: true}, () => updateProfile(this.state));
  }

  onBack() {
    Actions.pop();
  }

  get getShowNavBar() {
    return (
      <View style={ styles.navBarContainer }>
        <View style={ styles.navigateButtons }>
          <TouchableOpacity
            onPress={ () => this.onBack() }
            style={ styles.navButtonWrapper }
          >
            <EntypoIcons
              name="chevron-thin-left"  size={ 25 }
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={ [styles.fontStyles, styles.textTitle] }>PROFILE EDIT</Text>

          <TouchableOpacity
            onPress={ () => this.saveProfile() }
            style={ styles.navButtonWrapper }
          >
            <MaterialIcons
              name="check"  size={ 27 }
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>);
  }
  /**
   * Calls when user click on the add avatar button
   *
   * sets "this.state.user.avatar" before to empty string and then on new url
   * (need for changing avatar and showing activity indicator)
   *
   * @param uri {string} - url from uploaded avatar image
   */
  addAvatarUri = (uri) => {
    this.setState({  avatar: '' }, () => this.setState({ avatar: uri }));
  };
  onChangePhone(text) {
    text = this.checkForNumber(...text)
    this.setState({ phone: text })
  }
  checkForNumber(...value){
    const numbers = '0123456789';

    value = value.filter((e) => numbers.includes(e))
    return value.join('')
  }
  onFocusPrice() {
    const price = this.priceToInt(this.state.price);
    this.setState({ price })
  }
  onBlurPrice() {
    const price = this.priceToFloat(this.state.price);
    this.setState({ price })
  }
  priceToFloat(text) {
    text = ''+text;
    if(text.includes('.')) return text;
    return text+'.00';
  }
  priceToInt(text) {
    text = ''+text;
    if(!text.includes('.')) return text;
    return text.slice(0,-3);
  }
  onChangePrice(text) {
    text = this.checkForNumber(...text)
    this.setState({price: text})
  }
  onInsured(value) {
    this.setState({ insured: value });
  }
  onOwn(value) {
    this.setState({ own: value });
  }
  onSelectProfession(value) {
    const profession = this.props.explore.professions.filter((e)=>e.name===value)[0];
    this.setState({ profession });
  }
  onSelectCertification(value) {
    this.setState({ certification: value });
  }
  updateExperience(value) {
    let experience = this.state.experience + value;
    experience = experience < 0 ? 0 : experience;
    this.setState({ experience });
  }

  onClosePopupAutocomplete () {
    this.dialogGoogleAutocomplete.popupAutocomplete.closeDialog ();
  }
  onSetPopupAutocomplete (data, details) {
    this.setState({ address: data.description || data.formatted_address });
    this.dialogGoogleAutocomplete.popupAutocomplete.closeDialog ();
  }
  onOpenPopupAutocomplete () {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      this.props.getCurrentAddress(location);
    },
      (error) => {
        console.log('navigator.geolocation.getCurrentPosition: Error: ', error);
      });
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
    const { updateRequest } = this.state;
    const { explore: { professions } } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          { this.getShowNavBar }
          <View style={ styles.contentContainer }>
            <KeyboardAwareScrollView extraScrollHeight={40}>
              <View style={ styles.avatarContainer }>
                <View style={ styles.avatarWrapper }>
                  { this.state.avatar ?
                    <ImageProgress source={ {uri: this.state.avatar} } indicator={ActivityIndicator} style={ styles.imageAvatar } resizeMode="cover"/>
                    :
                    <Image source={ avatarDefault } style={ styles.imageAvatar } resizeMode="cover"/>
                  }
                  <UploadFromCameraRoll directlyUpload={true} addAvatarUri={this.addAvatarUri}/>
                </View>
              </View>

              <View style={ styles.cellContainer }>
                <InputCenter value={ this.state.name } onChangeText={ (name) => this.setState({ name }) }/>
              </View>

              <View style={ styles.cellContainer }>
                <Text style={ styles.fontStyles }>Phone Number</Text>
                <View style={ [styles.viewInput, styles.halfWidth] }>
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

              <View style={ [styles.cellContainer, styles.profileVisibility] }>
                <View style={ styles.profileVisibilityTitle }>
                  <Text style={ styles.fontStyles }>Profile visibility</Text>
                </View>
                <View style={ styles.profileVisibilitySwitch }>
                  <Switch
                    onValueChange={(visibility) => this.setState({ visibility })}
                    value={ this.state.visibility } />
                </View>
              </View>

              <View style={ styles.cellContainer }>
                <Text style={ [styles.fontStyles, styles.textCellTitle] }>Gender</Text>
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
                          labelStyle={ [styles.fontStyles, styles.textCellValue] }
                          checked={ this.state.gender === value }
                          onPress={ () => this.setState({ gender: value }) }
                        />
                      );
                    })
                  }
                </View>
              </View>

              <View style={ styles.cellContainer }>
                <Text style={ [styles.fontStyles, styles.textCellTitle] }>Age</Text>
                <View style={ styles.viewSlider }>
                  <SliderWithCounter
                    counter={this.state.age}
                    onSlidingComplete={ (value) => this.setState({ age: value }) }
                  />
                </View>
              </View>

              <View style={ styles.cellContainer }>
                <Text style={ [styles.fontStyles, styles.textCellTitle] }>My price</Text>
                <View style={ [styles.priceWrapper, styles.halfWidth] }>
                  <Text style={ styles.textPrice }>$</Text>
                  <TextInput
                    autoCapitalize="none"
                    style={ styles.priceInput }
                    autoCorrect={ false }
                    placeholder="0.00"
                    placeholderTextColor="#9e9e9e"
                    value={ this.state.price }
                    keyboardType='numeric'
                    onChangeText={ (text) => this.onChangePrice(text) }
                    onFocus={ () => this.onFocusPrice() }
                    onBlur={ () => this.onBlurPrice() }
                  />
                  <Text style={ [styles.textPrice, styles.textLabelPrice] }>/per session</Text>
                </View>
              </View>

              <View style={ styles.cellContainer }>
                <Text style={ [styles.fontStyles, styles.textCellTitle] }>Insured</Text>
                <View style={ styles.cellValueContainer }>
                  {
                    labelInsure.map(item => {
                      return (
                        <RadioButton
                          style={ styles.paddingTwo }
                          key={ item.text }
                          label={ item.text }
                          color="#19b8ff"
                          iconStyle={ styles.iconButton }
                          labelStyle={ [styles.fontStyles, styles.textCellValue] }
                          checked={ this.state.insured == item.value }
                          onPress={ () => this.onInsured(item.value) }
                        />
                      );
                    })
                  }
                </View>
              </View>
              <View style={ styles.cellContainer }>
                <Text style={ [styles.fontStyles,styles.textCellTitle] }>Profession</Text>
                <View style={ [styles.dropdownWrapper, styles.halfWidth] }>
                  <ModalDropdown
                    options={ professions.map((e)=>e.name) }
                    dropdownStyle={ [styles.dropdownStyle, styles.halfWidth] }
                    renderRow={(value)=>(<Text  numberOfLines={1} style={ [styles.fontStyles, styles.dropDownOptions] }>{value}</Text>)}
                    onSelect={ (rowId, rowData) => this.onSelectProfession(rowData) }
                  >
                    <Text numberOfLines={1} style={ [styles.fontStyles, styles.dropdown, styles.dropDownText, styles.halfWidth] }>{this.state.profession.name}</Text>
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
                <Text style={ [styles.fontStyles, styles.textCellTitle] }>Certification</Text>
                <View style={ [styles.dropdownWrapper, styles.halfWidth] }>
                  <ModalDropdown
                    options={ this.state.profession.certification && this.state.profession.certification.length ? this.state.profession.certification : certificationsDefault }
                    dropdownStyle={ [styles.dropdownStyle, styles.halfWidth] }
                    renderRow={(value)=>(<Text  numberOfLines={1} style={ [styles.fontStyles, styles.dropDownOptions] }>{value}</Text>)}
                    onSelect={ (rowId, rowData) => this.onSelectCertification(rowData) }
                  >
                    <Text numberOfLines={1} style={ [styles.fontStyles, styles.dropdown, styles.dropDownText, styles.halfWidth] }>{this.state.certification}</Text>
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
                <Text style={ [styles.fontStyles, styles.textCellTitle] }>Years of experience</Text>
                <View style={ [styles.dropdownWrapper, styles.experienceView] }>
                  <FontAwesome
                    name="minus"
                    size={ 12 }
                    color="#10c7f9"
                    onPress={ () => this.updateExperience(-1) }
                  />
                  <Text style={ [styles.fontStyles, styles.dropDownText, styles.experienceText] }>{this.state.experience} years</Text>
                  <FontAwesome
                    name="plus"
                    size={ 12 }
                    color="#10c7f9"
                    onPress={ () => this.updateExperience(1) }
                  />
                </View>
              </View>
              <View style={ styles.cellContainer }>
                <Text style={ [styles.fontStyles, styles.textCellTitle] }>Location</Text>
                <TouchableOpacity
                  onPress={ () => this.onOpenPopupAutocomplete() }
                >
                  <View style={ styles.viewInput }>
                    <Text style={ styles.textInputRight } >
                      { this.state.address }
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={ styles.cellContainer }>
                <View style={ styles.cellValueContainer }>
                  {
                    labelOwn.map(value => {
                      return (
                        <RadioButton
                          style={ styles.paddingTwo }
                          key={ value }
                          label={ value }
                          color="#19b8ff"
                          iconStyle={ styles.iconButton }
                          labelStyle={ [styles.fontStyles, styles.textCellValue] }
                          checked={ this.state.own == value }
                          onPress={ () => this.onOwn(value) }
                        />
                      );
                    })
                  }
                </View>
              </View>

              <View style={ styles.cellDescriptionContainer }>
                <Text style={ [styles.fontStyles, styles.textCellTitle, styles.descLabel] }>Description</Text>
                <TextInput
                  multiline = {true}
                  numberOfLines = {4}
                  autoCapitalize="none"
                  autoCorrect={ false }
                  style={ [styles.fontStyles, styles.textInputDesc, styles.textCellTitle] }
                  value={ this.state.description }
                  onChangeText={ (text) => this.setState({ description: text }) }
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </Image>
        { this.dialogAutocomplete }
        { updateRequest ? <FullScreenLoader/> : null }
        {
          this.state.showToast &&
          <Toast message={this.state.toastMessage} />  
        }
        
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
    flex: 0.5,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  navigateButtons: {
    alignItems: 'flex-end',
    flexDirection: 'row'
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
    paddingBottom: 5,
  },
  contentContainer: {
    flex: 6.4,
    backgroundColor: '#fff',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#d9d9d9',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  timeMainContainer: {
    flex: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  scheduleButton: {
    width: width - 100,
    backgroundColor: '#14c2f7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#14c2f7',
    borderStyle: 'solid',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    paddingVertical: 15,
    paddingHorizontal: 40,
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  calendarTime: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    borderStyle: 'solid',
  },
  timeRowContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  textTimeTo: {
    paddingHorizontal: 20,
    textAlign: 'center',
    color: '#565656',
  },
  //avatar
  avatarContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAvatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  //end avatar
  //inputWrap
  inputWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    marginHorizontal: 80,
    marginVertical: 10
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  //end inputWrap
  marginHorizontal20: {
    marginHorizontal: 20
  },
  withoutPaddings: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  profileVisibility: {
    flex: 1,
    flexDirection: 'row'
  },
  profileVisibilityTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  profileVisibilitySwitch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  textInputRight: {
    fontFamily: 'Open Sans',
    width: width*0.5,
    color: '#1e1e1e',
    fontSize: 14,
    height: 20,
    textAlign: 'right'
  },
  gender: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
  },
  age: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#e3e3e3',
  },
  seekingProfessional: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#e3e3e3',
  },
  addProfession: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#e3e3e3',
  },
  aboutMe: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#e3e3e3',
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

  viewInput: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#10c7f9',
    height: 32,

  },
  textInputCenter: {
    paddingHorizontal:10,
    flex: 1,
    color: '#1e1e1e',
    // fontSize: 18,
    height: 32,
  },
  viewTwoText: {
    flexDirection: 'column',
  },
  textCellTitle: {
    color: '#1e1e1e',
  },

  textCellValue: {
    color: '#707070',
    fontSize: 16,
  },
  cellValueContainer: {
    flexDirection: 'row',
  },
  paddingTwo: {
    marginRight: 10,
    paddingVertical: 0,
  },
  iconButton: {
    fontSize: 25,
    marginRight: 5,
    marginLeft: 20,
  },

  viewSlider:{
    flex: 1,
    flexDirection: 'column',
    marginLeft: width/4,
  },
  dropdownWrapper: {
    flexDirection: 'row',
    // marginRight: 35,
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
    height: 200,
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
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  dropDownOptions: {
    color: '#6b6b6b',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  iconDropDown: {
    position: 'absolute',
    right: 4,
    top: 5
  },
  iconClose: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    position:'absolute',
    right: 0,
    top: -1,
    borderTopColor: '#f0f0f0',
    borderTopWidth:1,
  },

  priceButtonChecked: {
    borderWidth: 1,
    borderColor: '#19b8ff',
    backgroundColor: '#19b8ff',
    alignItems: 'center',
    borderRadius: 30,
    width: 80,
    paddingVertical:2,
    marginLeft: 10,
    overflow:'hidden',
  },
  priceButton: {
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderRadius: 30,
    width: 80,
    paddingVertical:2,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#19b8ff',
    overflow:'hidden',
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
  textSubTitle: {
    paddingTop: 2,
    color: '#707070',
    fontSize: 12,
  },

  textSubValue: {
    paddingBottom:2,
    color: '#707070',
    fontSize: 13,
  },

  cellDescriptionContainer: {
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  textInputDesc: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    height: 100,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize:16,
  },
  descLabel: {
    marginBottom: 10
  },
  segmentedControlsOptions: {
    fontSize: 12,
    height: 20,
    paddingTop:3,
  },
  segmentedControlsContainer:{
    borderRadius:10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },

  fontStyles: {
    fontFamily: 'Open Sans',
    fontSize: 18,
  },
  textPrice: {
    color: '#10c7f9'
  },
  textLabelPrice: {
    fontSize: 12,
    color: '#10c7f9'
  },
  priceInput: {
    fontSize: 16,
    width: width * 0.2,
    height: 15,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    textAlign: 'center',
  },
  halfWidth:{
    width: width * 0.5,
  },
  priceWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#10c7f9',
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
});


export default connect(state => ({
    auth: state.auth,
    profile: state.profile,
    explore: state.explore,
  }),
    (dispatch) => ({
      updateProfile: (data) => dispatch(profileActions .updateProfile(data)),
      getCurrentAddress: (data) => dispatch(authActions.getCurrentAddress(data)),
    })
)(EditProfile);