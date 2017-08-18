import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import R from 'ramda';

import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor,
  user_professional,
} from '../../../Components/commonConstant';

const labelInsure = [{value:true, text:'Yes'}, {value: false, text:'No'}];
const labelOwn = ['Go to client', 'Own space', 'Both'];
const certificationsDefault = ['Certified personal trainer', 'Certified', 'No Certified'];

import FullScreenLoader from '../../../Components/fullScreenLoader';
import DialogGoogleAutocomplete from '../../../Components/dialogGoogleAutocomplete';
const background = require('../../../Assets/images/background.png');
const avatar = require('../../../Assets/images/avatar.png');
const edit_avatar = require('../../../Assets/images/edit_avatar.png');
import RadioButton from '../../../Components/radioButton';

class ProfessionalInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpRequest:false,
      price: this.priceToFloat(200),
      insured: true,
      profession:
            props.explore &&
            props.explore.professions &&
            !R.isEmpty(props.explore.professions) &&
            props.explore.professions[0] || {},
      certification:
            props.explore &&
            !R.isEmpty(props.explore.professions) &&
            !R.isEmpty(props.explore.professions[0].certification) &&
            props.explore.professions[0].certification[0] || certificationsDefault[0],
      address: props.auth.currentAddress.formattedAddress || '4 York st, Toronto',
      own: 'Both',
      experience: 5,
      description:' '
    };
  }

  componentDidMount() {
    this.loadInitialState().done();
  }

  loadInitialState = async () => {
    try {
      const value = await AsyncStorage.getItem('professionalSecondForm');
      if (value !== null){
        this.setState({ ...JSON.parse(value),signUpRequest:false, price: this.priceToFloat(JSON.parse(value).price)});
      }
    } catch (error) {
      Alert.alert('AsyncStorage error: ' + error.message);
    }
  };

  componentWillReceiveProps(nextProps) {
    const { auth: { user, currentAddress }, question: { error } } = nextProps;
    if (error) {
      Alert.alert(error);
      this.setState({ signUpRequest: false })
      return;
    }
    if (user && this.state.signUpRequest) {
      AsyncStorage.multiRemove(['professionalFirstForm', 'professionalSecondForm']);
      Actions.Main({ user_mode: user_professional });
    }
    if (currentAddress && currentAddress.formattedAddress) {
      this.setState({ address: currentAddress.formattedAddress });
    }
    this.setState({ signUpRequest: false, price: this.priceToFloat(200)});
  }

  get getShowNavBar() {
    return (
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
        </View>
        <View style={ styles.navButtonWrapper }/>
      </View>
    );
  }

  onContinue () {
    const { createRole } = this.props;
    /**
     * 'price' to {number}
     */
    this.state.price = this.priceToInt(this.state.price);

    /**
     * 'profession' to {String} name
     */
    this.state.profession = this.state.profession && this.state.profession.name || {};

    if(this.state.own === 'Both') {
      this.state.toClient = true;
      this.state.ownSpace = true;
    }
    if(this.state.own === 'Go to client') {
      this.state.toClient = true;
    }
    if(this.state.own === 'Own space') {
      this.state.ownSpace = true;
    }

    /**
     * request to server
     */
    AsyncStorage.getItem('professionalFirstForm')
      .then((data) => {
        console.log(data);
        this.setState({ signUpRequest: true }, () => createRole({ ...JSON.parse(data), ...this.state }) );
      })
  }

  onBack() {
    const { changeProfessionalForm } = this.props;
    AsyncStorage.setItem('professionalSecondForm', JSON.stringify(this.state));
    changeProfessionalForm({firstForm: true})
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
  checkForNumber(...value){
    const numbers = '0123456789';

    value = value.filter((e) => numbers.includes(e))
    return value.join('')
  }

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
    const { signUpRequest } = this.state;
    const { explore: { professions } } = this.props;

    return (
      <View style={ styles.container }>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={ false }
        >
          <Image source={ background } style={ styles.background } resizeMode="cover">
            { this.getShowNavBar }
            <View style={ styles.contentContainer }>
              <View style={ styles.mainContainer }>

                <View style={ styles.cellContainer }>
                  <Text style={ styles.textCellTitle }>My price</Text>
                  <View style={ styles.priceWrapper }>
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
                  <Text style={ styles.textCellTitle }>Insured</Text>
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
                            labelStyle={ styles.textInput }
                            checked={ this.state.insured == item.value }
                            onPress={ () => this.onInsured(item.value) }
                          />
                        );
                      })
                    }
                  </View>
                </View>
                <View style={ styles.cellContainer }>
                  <Text style={ styles.textCellTitle }>Profession</Text>
                  <View style={ styles.dropdownWrapper }>
                    <ModalDropdown
                      options={ professions.map((e)=>e.name) }
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
                  <Text style={ styles.textCellTitle }>Certification</Text>
                  <View style={ styles.dropdownWrapper }>
                    <ModalDropdown
                      options={ this.state.profession.certification && this.state.profession.certification.length ? this.state.profession.certification : certificationsDefault }
                      dropdownStyle={ styles.dropdownStyle }
                      onSelect={ (rowId, rowData) => this.onSelectCertification(rowData) }
                    >
                    <Text numberOfLines={1} style={ [styles.dropdown, styles.dropDownText] }>{this.state.certification}</Text>
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
                  <Text style={ styles.textCellTitle }>Years of experience</Text>
                  <View style={ [styles.dropdownWrapper, styles.experienceView] }>
                    <FontAwesome
                      name="minus"
                      size={ 12 }
                      color="#10c7f9"
                      onPress={ () => this.updateExperience(-1) }
                    />
                    <Text style={ [styles.dropDownText, styles.experienceText] }>{this.state.experience} years</Text>
                    <FontAwesome
                      name="plus"
                      size={ 12 }
                      color="#10c7f9"
                      onPress={ () => this.updateExperience(1) }
                    />
                  </View>
                </View>
                <View style={ styles.cellContainer }>
                  <Text style={ styles.textCellTitle }>Location</Text>
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
                            labelStyle={ styles.textInput }
                            checked={ this.state.own === value }
                            onPress={ () => this.onOwn(value) }
                          />
                        );
                      })
                    }
                  </View>
                </View>
                <View style={ styles.cellDescriptionContainer }>
                  <Text style={ [styles.textCellTitle, styles.descLabel] }>Description</Text>
                  <TextInput
                    multiline = {true}
                    numberOfLines = {4}
                    autoCapitalize="none"
                    autoCorrect={ false }
                    placeholder="Description"
                    placeholderTextColor="#9e9e9e"
                    style={ [styles.textInputDesc, styles.textCellTitle] }
                    value={ this.state.description }
                    onChangeText={ (text) => this.setState({ description: text }) }
                  />
                </View>
              </View>
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
        { this.dialogAutocomplete }
        { signUpRequest ? <FullScreenLoader/> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconDropDown: {
    position: 'absolute',
    right: 4,
    top: 1
  },
  experienceView: {
    paddingHorizontal: 10,
    width: width*0.4,
  },
  experienceText: {
    width: width * 0.28
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
    paddingHorizontal: 10
  },
  descLabel: {
    marginBottom: 10
  },
  textPrice: {
    color: '#10c7f9'
  },
  textLabelPrice: {
    fontSize: 9,
    color: '#10c7f9'
  },
  priceInput: {
    width : width * 0.15,
    fontSize: 14,
    textAlign: 'center'
  },
  priceWrapper: {
    flexDirection: 'row',
    height: 25,
    width: width*0.4,
    borderWidth: 1,
    borderColor: '#10c7f9',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  container: {
    flex: 1,
    position: 'relative'
  },
  background: {
    width,
    height,
  },
  bottomButtonWrapper: {
    marginHorizontal: 30,
    flex:1,
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
  buttonTextSave: {
    fontFamily: 'Open Sans',
    color: '#fff',
    fontSize: 20,
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
  textCellTitle: {
    fontFamily: 'Open Sans',
    color: '#1e1e1e',
    fontSize: 14,
  },
  textInput: {
    fontFamily: 'Open Sans',
    color: '#6b6b6b',
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
    marginTop: 3,
    overflow:'hidden',

  },
  dropDownText: {
    color: '#6b6b6b',
    fontSize: 12,
    fontFamily: 'Open Sans',
    textAlign: 'center',
    paddingHorizontal: 20
  },
});

export default connect(state => ({
    auth: state.auth,
    question: state.question,
    explore: state.explore,
  }),
)(ProfessionalInfoForm);