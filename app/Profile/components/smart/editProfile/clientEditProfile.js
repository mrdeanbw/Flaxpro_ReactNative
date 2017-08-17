import React, { Component } from 'react';
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch
} from 'react-native';

import ImageProgress from 'react-native-image-progress';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from '../../../../Components/ToastComponent';
import RadioButton from '../../../../Components/radioButton';
import SliderWithCounter from '../../../../Components/sliderWithCounter';
import UploadFromCameraRoll from '../../../../Components/imageUploader';
import FullScreenLoader from '../../../../Components/fullScreenLoader';
import DialogGoogleAutocomplete from '../../../../Components/dialogGoogleAutocomplete';
import * as profileActions  from '../../../actions';
import * as authActions  from '../../../../Auth/actions';

import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor,
  PRICES as prices,
} from '../../../../Components/commonConstant';

const background = require('../../../../Assets/images/background.png');
const avatarDefault = require('../../../../Assets/images/avatar.png');
const labelSex = ['Male', 'Female'];

class EditProfile extends Component {

  constructor(props) {
    super(props);

    let {  explore: { professions } } = props;
    let user = {...props.profile.user};
    const defaultProfession = {
      profession: professions && professions[0] || {},
      price: prices[0],
    };

    if (!user.professions.length){
      user.professions = [{...defaultProfession}]
    } else {
      user.professions = [...user.professions.map((e)=>(
        {
          profession: professions.filter((item)=>item._id===e.profession)[0] || {},
          price: prices.filter((item)=>(item.level===e.priceLevel))[0] || {},
        })
      )
      ]
    }
    user.address= user.address.formattedAddress || user.address,

    this.state = {
      user,
      defaultProfession,
      showToast:false,
      toastMessage:'',
      lastPress: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { user }, profile: { error } } = nextProps;

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
    const { user } = this.state;
    const professions = user.professions.map((e) => ({profession: e.profession._id, priceLevel: e.price.level}));
    const data = {...user, professions};
    this.setState({updateRequest: true}, () => updateProfile(data));
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
    const { user } = this.state;
    this.setState({ user: {...user, avatar: '' }}, () => this.setState({ user: {...user, avatar: uri }}));
  };
  /**
   * Calls when user click on the profession in the dropdown list
   *
   * find profession by name and update it in "user.professions" array
   *
   * @param name {string} - name of profession
   * @param index {number} - index of block where user selected profession
   */
  onSelectProfession(name, index) {
    const { user } = this.state;
    const newProfession = this.props.explore.professions.filter((e) => e.name === name)[0];
    let professions = [...user.professions];
    professions[index].profession = newProfession;
    this.setState({ user: {...user, professions } });
  }
  /**
   * Calls when user click on the one of the prices buttons
   *
   * find price by level and update it in "user.professions" array
   *
   * @param price {string} - name of profession
   * @param index {number} - index of block where user selected profession
   */
  onSelectPrice(price, index) {
    const { user } = this.state;
    const newPrice = prices.filter((e) => e.level === price.level)[0];
    let professions = [...user.professions];
    professions[index].price = newPrice;
    this.setState({ user: {...user, professions } });
  }
  /**
   * Calls when user click on plus button for adding new "looking for" block
   *
   * find remaining professions(not added to "user.professions" array)
   * and add first remaining profession with price to "user.professions" array
   *
   */
  onAddProfession() {
    const { user } = this.state;
    const remainingProfessions = this.props.explore.professions.filter((e)=> {
      const data = user.professions.filter((item) => (item.profession._id === e._id))
      return !data.length
    });
    if(remainingProfessions[0]){
      const professions = [...user.professions, {profession: remainingProfessions[0], price: prices[0]}];
      this.setState({ user: {...user, professions } });
    }
  }
  /**
   * Calls when user click on cross button for remove some "looking for" block
   *
   * remove profession from "user.professions" array
   * if user removed last block, adding default profession with price
   *
   * @param index {number} - index of block which user want remove
   */
  onRemoveProfession(index) {
    const { user, defaultProfession } = this.state;
    user.professions.splice(index, 1);
    let professions = [...user.professions];
    if(!professions.length){
      professions = [{...defaultProfession}];
    }
    this.setState({ user: {...user, professions } });
  }
  /**
   * Calls when user open dropdown menu
   *
   * find remaining professions(not added to "user.professions" array)
   * and returned array from names of professions
   *
   */
  onModalOptions() {
    const { explore: { professions } } = this.props;
    const { user } = this.state;

    return professions.filter((e) => {
      const data = user.professions.filter((item) => (item.profession._id === e._id));
      return !data.length
    }).map((e) => e.name)
  }

  onClosePopupAutocomplete () {
    this.dialogGoogleAutocomplete.popupAutocomplete.closeDialog ();
  }
  onSetPopupAutocomplete (data, details) {
    this.setState({ user: {...this.state.user,  address: data.description || data.formatted_address }});
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
    const { user, updateRequest } = this.state;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          { this.getShowNavBar }
          <View style={ styles.contentContainer }>
            <KeyboardAwareScrollView extraScrollHeight={40} showsVerticalScrollIndicator={true}>
              <View style={ styles.avatarContainer }>
                <View style={ styles.avatarWrapper }>
                  { user.avatar ?
                    <ImageProgress source={ {uri: user.avatar} } indicator={ActivityIndicator} style={ styles.imageAvatar } resizeMode="cover"/>
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
                    style={ [styles.fontStyles, styles.textInputCenter] }
                    value={ user.name }
                    onChangeText={ (name) => this.setState({ user: {...user, name}}) }
                  />
                </View>
              </View>

              <View style={ [styles.cellContainer, styles.profileVisibility] }>
                <View style={ styles.profileVisibilityTitle }>
                  <Text style={ styles.fontStyles }>Profile visibility</Text>
                </View>
                <View style={ styles.profileVisibilitySwitch }>
                  <Switch
                    onValueChange={(visibility) => this.setState({ user: {...user, visibility }})}
                    value={ user.visibility } />
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
                          checked={ user.gender === value }
                          onPress={ () => this.setState({ user: {...user, gender: value }}) }
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
                    counter={user.age}
                    onSlidingComplete={ (value) => this.setState({ user: {...user, age: value }}) }
                  />
                </View>
              </View>

              {user.professions.map((item, index) => (
                <View key={index}>
                  <View style={ [styles.cellContainer, styles.withoutBorder] }>
                    <Text style={ [styles.fontStyles, styles.textCellTitle] }>Looking for</Text>
                    <View style={ styles.dropdownWrapper }>
                      <ModalDropdown
                        options={ this.onModalOptions() }
                        renderRow={(value)=>(<Text  numberOfLines={1} style={ [styles.fontStyles, styles.dropDownOptions] }>{value}</Text>)}
                        dropdownStyle={ styles.dropdownStyle }
                        onSelect={ (rowId, rowData) => this.onSelectProfession(rowData, index) }
                      >
                        <Text  numberOfLines={1} style={ [styles.fontStyles, styles.dropdown, styles.dropDownText] }>{item.profession.name}</Text>
                        <EvilIcons
                          style={ styles.iconDropDown }
                          name="chevron-down"
                          size={ 24 }
                          color="#10c7f9"
                        />
                      </ModalDropdown>
                    </View>
                    <View style={styles.iconClose}>
                      <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onRemoveProfession(index) }>
                        <EvilIcons
                          name="close"
                          size={ 24 }
                          color={"#10c7f9"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={ [styles.cellContainer, styles.withoutBorder] }>
                    <Text style={ [styles.fontStyles, styles.textCellTitle] }>Price</Text>
                    <View style={ styles.pricesBlock }>
                      {
                        prices.map((priceItem, priceIndex) =>(
                          <TouchableOpacity key={ priceIndex } activeOpacity={ .5 } onPress={ () => this.onSelectPrice(priceItem, index) }>
                            <View style={ [styles.viewTwoText, priceItem.level === item.price.level ? styles.priceButtonChecked : styles.priceButton] }>
                              <Text style={ [styles.fontStyles, styles.textSubTitle, priceItem.level === item.price.level ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ priceItem.item }</Text>
                              <Text style={ [styles.fontStyles, styles.textSubValue, priceItem.level === item.price.level ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ priceItem.price }</Text>
                            </View>
                          </TouchableOpacity>
                        ))
                      }
                    </View>
                  </View>
                  <View style={ [styles.cellContainer, styles.marginHorizontal20, styles.withoutPaddings] }/>
                </View>
              ))}

              <View style={ [styles.cellContainer, {justifyContent: 'center'}] }>
                <Text style={ [styles.fontStyles, styles.textSubValue] }>Are you looking for more professionals?</Text>
                <View style={ styles.pricesBlock }>
                  <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onAddProfession() }>
                    <View style={ [ styles.priceButton, {width:50, backgroundColor: '#fff'}] }>
                      <Text style={ [styles.fontStyles, styles.textSubTitle, styles.priceButtonText] }>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={ styles.cellContainer }>
                <Text style={ [styles.fontStyles, styles.textCellTitle] }>Location</Text>
                <TouchableOpacity
                  onPress={ () => this.onOpenPopupAutocomplete() }
                >
                  <View style={ styles.viewInput }>
                    <Text style={ styles.textInputRight } ellipsizeMode="tail">
                      { user.address }
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={ styles.cellDescriptionContainer }>
                <Text style={ [styles.fontStyles, styles.textCellTitle, styles.descLabel] }>About me</Text>
                <TextInput
                  multiline = {true}
                  numberOfLines = {4}
                  autoCapitalize="none"
                  autoCorrect={ false }
                  style={ [styles.fontStyles, styles.textInputDesc, styles.textCellTitle] }
                  value={ user.description }
                  onChangeText={ (text) => this.setState({ user: {...user, description: text } }) }
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

  textInputRight: {
    fontFamily: 'Open Sans',
    width: width*0.5,
    color: '#1e1e1e',
    fontSize: 14,
    height: 20,
    textAlign: 'right',
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
  viewInputCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    marginHorizontal: 70,
  },
  viewInput: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#10c7f9'
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
  withoutBorder:{
    borderWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  dropdownWrapper: {
    flexDirection: 'row',
    marginRight: 35,
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