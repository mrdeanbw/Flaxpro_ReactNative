import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Switch
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';

import { SegmentedControls } from 'react-native-radio-buttons';
import EntypoIcons from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');

//const variable
const constants = {
  BASIC_INFO: 'BASIC_INFO',
  CALENDAR: 'CALENDAR'
};

class EditProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: props.auth.user,
      selectedOption: constants.BASIC_INFO,
      yourTitle: '',
      profileVisibility: true
    };

    //binds
  }

  saveProfile() {
    alert( 'save profile!');
  }

  onBack() {
    Actions.pop();
  }

  onChangeOptions(option) {
    const { selectedOption } = this.state,
      { auth: { user } } = this.props;


    if (selectedOption != option) {
      this.setState({selectedOption: option})
    }
  }

  get getShowNavBar() {
    const { selectedOption } = this.state;

    return <View style={ styles.navBarContainer }>
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

              <Text style={ styles.textTitle }>PROFILE EDIT</Text>

              <TouchableOpacity
                onPress={ () => this.saveProfile() }
                style={ styles.navButtonWrapper }
              >
                <EntypoIcons
                  name="check"  size={ 25 }
                  color="#fff"
                />
              </TouchableOpacity>
          </View>
          <SegmentedControls
            tint={ "#fff" }
            selectedTint= { "#41c3fd" }
            backTint= { "#41c3fd" }
            options={ [constants.BASIC_INFO, constants.CALENDAR] }
            onSelection={ (option) => this.onChangeOptions(option) }
            selectedOption={ selectedOption }
            allowFontScaling={ true }
            optionStyle={{
              fontSize: 12,
              height: 25,
            }}
            containerStyle= {{
              height: 30,
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginHorizontal: 10,
              marginVertical: 5,
            }}
          />
        </View>;
  }

  render() {
    const { auth: { user }} = this.props,
      { yourTitle, profileVisibility } = this.state;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          { this.getShowNavBar }
          <View style={ styles.contentContainer }>
            <View style={ styles.avatarContainer }>
              <View style={ styles.avatarWrapper }>
                <Image
                  source={ user.avatar }
                  style={ styles.imageAvatar }
                  resizeMode="cover"/>
              </View>
            </View>
            <View style={ styles.inputWrap }>
              <TextInput
                autoCapitalize="none"
                autoCorrect={ false }
                placeholder="Add your title here"
                placeholderTextColor="#9e9e9e"
                color="#000"
                style={ styles.textInput }
                value={ yourTitle }
                onChangeText={ (yourTitle) => this.setState({ yourTitle }) }
              />
            </View>
            <View style={ [styles.profileVisibility, styles.mHProfileField] }>
              <View style={ [styles.profileVisibilityTitle, styles.mHProfileField] }>
                <Text style={ styles.profileVisibilityText }>Profile visibility</Text>
              </View>
              <View style={ [styles.profileVisibilitySwitch, styles.mHProfileField] }>
                <Switch
                  // onTintColor="#fff"
                  thumbTintColor="#0000ff"
                  tintColor="#e3e3e3"
                  onValueChange={(profileVisibility) => this.setState({ profileVisibility })}
                  value={ profileVisibility } />
              </View>
            </View>
            <View style={ styles.gender }>

            </View>
            <View style={ styles.age }>

            </View>
            <View style={ styles.seekingProfessional }>

            </View>
            <View style={ styles.addProfession }>

            </View>
            <View style={ styles.aboutMe }>

            </View>
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
  background: {
    width,
    height,
  },
  navBarContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingVertical: 10,
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
    paddingBottom: 10,
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
  textSectionTitle: {
    paddingLeft: 5,
    textAlign: 'center',
    color: '#565656',
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
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    // flex: 1,
    // paddingVertical: 5,
    // paddingHorizontal: 15,
    backgroundColor: '#fff',
    // position: 'absolute',
    height: 130,
    width: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAvatar: {
    height: 128,
    width: 128,
    borderRadius: 64,
  },
  //end avatar
  //inputWrap
  inputWrap: {
    // height: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e3e3e3',
    marginHorizontal: 80,
    marginVertical: 10
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  //end inputWrap
  mHProfileField: {
    marginHorizontal: 10
  },
  profileVisibility: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#e3e3e3',
    flexDirection: 'row'
  },
  profileVisibilityTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  profileVisibilityText: {
    fontSize: 20
  },
  profileVisibilitySwitch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  gender: {
    flex: 1,
    borderTopWidth: 2,
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
  }
});


export default connect(state => ({
    auth: state.auth
  }),
    (dispatch) => ({})
)(EditProfile);