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

import ModalDropdown from 'react-native-modal-dropdown';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width, height } = Dimensions.get('window');
const labelInsure = ['Yes', 'No'];
const labelOwn = ['Go to client', 'Own space', 'Both'];
const professions = ['Manager', 'Fitness Trainer', 'Doctor'];
const certifications = ['No', 'Certified personal trainer'];



import * as CommonConstant from '../../../Components/commonConstant';
const background = require('../../../Assets/images/background.png');
const avatar = require('../../../Assets/images/avatar.png');
const edit_avatar = require('../../../Assets/images/edit_avatar.png');
import RadioButton from '../../../Explore/components/smart/radioButton';

//auth redux store
import * as authActions from '../../../Auth/actions';

class ProfessionalInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: this.priceToString(200),
      insured: 'Yes',
      profession: 'Fitness Trainer',
      certification: 'Certified personal trainer',
      location: 'Rostov region, Taganrog',
      own: 'Both',
      experience: 5
    };
  }
  /*
   price: Number,
   insured: Boolean,
   profession: String,
   certification: String,
   experience: Number,
   toClient: Boolean,
   ownSpace: Boolean,
   decsription: String,

   location: {lon, lat, city, country} OR
   address: String address*/

  componentWillReceiveProps(nextProps) {
    const { auth: { user } } = nextProps;

    if (user) {
      Actions.Main({ user_mode: CommonConstant.user_trainer });
    }
    this.setState({
      signUpRequest: false ,
    });
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
    const { actions, createRole } = this.props;
    /**
     * fake request
     */
    localStorage.get('userData')
      .then((data) => {
        actions.createUser({ ...data, ...this.state })
        localStorage.save('userData', null);
        this.setState({ signUpRequest: true });
      });
    /**
     * request to server
     */
    createRole(this.state)
  }

  onBack() {
    const { changeProfessionalForm } = this.props;
    changeProfessionalForm({firstForm: true})
  }
  onInsured(value) {
    this.setState({ insured: value });
  }
  onOwn(value) {
    this.setState({ own: value });
  }
  onSelectProfession(value) {
    this.setState({ profession: value });
  }
  onSelectCertification(value) {
    this.setState({ certification: value });
  }
  udateExperience(value) {
    var newExperience = this.state.experience + value
    newExperience = newExperience < 0 ? 0 : newExperience
    this.setState({ experience: newExperience });
  }

  onFocusPrice() {
    this.setState({price: this.priceToInt(this.state.price)})
  }
  onBlurPrice() {
    this.setState({price: this.priceToString(this.state.price)})
  }
  priceToString(text) {
    return text+'.00';
  }
  priceToInt(text) {
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

  render() {
    return (
      <View style={ styles.container }>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={ false }
        >
          <Image source={ background } style={ styles.background } resizeMode="cover">
            { this.getShowNavBar }
            <View style={ styles.contentContainer }>
              <ScrollView>
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
                        onFocus={ () => this.onFocusPrice()}
                        onBlur={ () => this.onBlurPrice()}
                      />
                      <Text style={ [styles.textPrice, styles.textLabelPrice] }>/per session</Text>
                    </View>
                  </View>
                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Insured</Text>
                    <View style={ styles.cellValueContainer }>
                      {
                        labelInsure.map(value => {
                          return (
                            <RadioButton
                              style={ styles.paddingTwo }
                              key={ value }
                              label={ value }
                              color="#19b8ff"
                              iconStyle={ styles.iconButton }
                              labelStyle={ styles.textInput }
                              checked={ this.state.insured == value }
                              onPress={ () => this.onInsured(value) }
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
                        options={ professions }
                        defaultValue={ this.state.profession }
                        style={ styles.dropdown }
                        textStyle ={ styles.dropDownText }
                        dropdownStyle={ styles.dropdownStyle }
                        onSelect={ (rowId, rowData) => this.onSelectProfession(rowData) }
                      />
                      <EvilIcons
                        name="chevron-down"
                        size={ 20 }
                        color="#10c7f9"
                      />
                    </View>
                  </View>
                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Certification</Text>
                    <View style={ styles.dropdownWrapper }>
                      <ModalDropdown
                        options={ certifications }
                        defaultValue={ this.state.certification }
                        style={ styles.dropdown }
                        textStyle ={ styles.dropDownText }
                        dropdownStyle={ styles.dropdownStyle }
                        onSelect={ (rowId, rowData) => this.onSelectCertification(rowData) }
                      />
                      <EvilIcons
                        name="chevron-down"
                        size={ 20 }
                        color="#10c7f9"
                      />
                    </View>
                  </View>
                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Years of experience</Text>
                    <View style={ [styles.dropdownWrapper, styles.experienceView] }>
                      <FontAwesome
                        name="minus"
                        size={ 12 }
                        color="#10c7f9"
                        onPress={ () => this.udateExperience(-1) }
                      />
                      <Text style={ [styles.dropDownText, styles.experienceText] }>{this.state.experience} years</Text>
                      <FontAwesome
                        name="plus"
                        size={ 12 }
                        color="#10c7f9"
                        onPress={ () => this.udateExperience(1) }
                      />
                    </View>
                  </View>
                  <View style={ styles.cellContainer }>
                    <Text style={ styles.textCellTitle }>Location</Text>
                    <View style={ styles.viewInput }>
                      <TextInput
                        autoCapitalize="none"
                        autoCorrect={ false }
                        placeholder="Location"
                        placeholderTextColor="#9e9e9e"
                        style={ styles.textInputCenter }
                        value={ this.state.location }
                        onChangeText={ (text) => this.setState({ location: text }) }
                       />
                    </View>
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
                              checked={ this.state.own == value }
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
  experienceView: {
    paddingHorizontal: 10
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
  textInputCenter: {
    fontFamily: 'Open Sans',
    flex: 1,
    color: '#1e1e1e',
    fontSize: 14,
    height: 20,
    textAlign: 'right'
  },
  viewInput: {
    flexDirection: 'row',
    textAlign: 'right',
    alignItems: 'center',
    marginHorizontal: width/2 -125,
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
    marginLeft: -5,
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
  }
});

export default connect(state => ({
    auth: state.auth
  }),
  (dispatch) => ({
      actions: bindActionCreators(authActions, dispatch)
    })
)(ProfessionalInfoForm);