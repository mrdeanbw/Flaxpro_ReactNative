import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  Slider,
  Alert,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const markIcon = require('../../../Assets/flaxpro_mark.png');


export default class ClientInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      birthday : '',
      gender : '',
      phoneNumber : '',
      weight : '',
      height : '',
      fitnessLevel : '',
      allergies : '',
      injuries : '',
    };
  }

  onVeryActive () {

    Alert.alert('Clicked onVeryActive');
  }

  onImportHealthKitData () {

    Alert.alert('Clicked onImportHealthKitData');
  }

  onContinue () {

    Actions.Main();
  }

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.markWrap }>
            <Image source={ markIcon } style={ styles.mark } resizeMode="contain" />
          </View>
          <View style={ styles.columnWrapper }>
            <View style={ styles.oneColumn }>
              <Text style={ styles.text }> Date of Birth </Text>
              <View style={ styles.inputWrap }>
                <DatePicker
                    date={ this.state.birthday }
                    mode="date"
                    placeholder="10/10/1990"
                    format="MM/DD/YYYY"
                    minDate="01/01/1900"
                    maxDate="12/31/2100"
                    confirmBtnText="Done"
                    cancelBtnText="Cancel"
                    showIcon={ false }
                    customStyles={{
                      dateInput: {
                        height: 20,
                        borderColor: "transparent",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        marginBottom: 20,
                      },
                      dateText: {
                        color: "#fff",
                      },
                      placeholderText: {
                        color: "#a2e2fe",
                      },
                    }}
                    onDateChange={ (date) => { this.setState({ birthday: date }) } }
                />
              </View>
            </View>
            <View style={ styles.oneColumn }>
              <Text style={ styles.text }> Gender </Text>
              <View style={ styles.inputWrap }>
                <ModalDropdown options={['Male', 'Female']}
                               defaultValue="Male"
                               style={ styles.dropdown }
                               textStyle ={ styles.text }
                               dropdownStyle={ styles.dropdownStyle }
                />
              </View>
            </View>
          </View>
          <View style={ styles.rowWrapper }>
            <Text style={ styles.text }> Phone Number </Text>
            <View style={ styles.inputWrap }>
              <TextInput
                placeholder="+1"
                placeholderTextColor="#fff"
                color="#fff"
                style={ styles.input }
                value={ this.state.phoneNumber }
                onChangeText={ (text) => this.setState({ phoneNumber: text }) }
              />
            </View>
          </View>
          <View style={ styles.columnWrapper }>
            <View style={ styles.oneColumn }>
              <Text style={ styles.text }> Current Weight </Text>
              <View style={ styles.inputWrap }>
                <TextInput
                  placeholder="lbs"
                  placeholderTextColor="#fff"
                  color="#fff"
                  style={ styles.input }
                  value={ this.state.weight }
                  onChangeText={ (text) => this.setState({ weight: text }) }
                />
              </View>
            </View>
            <View style={ styles.oneColumn }>
              <Text style={ styles.text }> Height </Text>
              <View style={ styles.inputWrap }>
                <TextInput
                  placeholder="ft"
                  placeholderTextColor="#fff"
                  color="#fff"
                  style={ styles.input }
                  value={ this.state.height }
                  onChangeText={ (text) => this.setState({ height: text }) }
                />
              </View>
            </View>
          </View>
          <View style={ styles.rowWrapper }>
            <View style={ styles.columnActivityWrapper }>
              <Text style={ styles.text }> Activity/Fitness Level </Text>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onVeryActive() }>
                <View style={ styles.veryActiveButton }>
                  <Text style={ styles.buttonActiveText }>Very Active</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Slider style={ styles.slider }
              minimumTrackTintColor={ 'white' }
              maximumTrackTintColor={ 'white' }
              minimumValue={0}
              maximumValue={10}
              step={1}
              onValueChange={ (value) => this.setState({ fitnessLevel: value }) }
            />
          </View>
          <View style={ styles.rowWrapper }>
            <Text style={ styles.text }> Known Allergies </Text>
            <View style={ styles.inputWrap }>
              <TextInput
                placeholder="None Listed"
                placeholderTextColor="#fff"
                color="#fff"
                style={ styles.input }
                value={ this.state.allergies }
                onChangeText={ (text) => this.setState({ allergies: text }) }
              />
            </View>
          </View>
          <View style={ styles.rowWrapper }>
            <Text style={ styles.text }> Previous/Current Injuries </Text>
            <View style={ styles.inputWrap }>
              <TextInput
                placeholder="None Listed"
                placeholderTextColor="#fff"
                color="#fff"
                style={ styles.input }
                value={ this.state.injuries }
                onChangeText={ (text) => this.setState({ injuries: text }) }
              />
            </View>
          </View>
          <View style={ styles.rowWrapper }>
            <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onImportHealthKitData() }>
              <View style={ styles.healthKitButton }>
                <Text style={ styles.buttonTextHealthKit }>Import Health Kit Data</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={ styles.rowWrapper }>
            <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onContinue() }>
              <View style={ styles.continueButton }>
                <Text style={ styles.buttonTextContinue }>Continue</Text>
              </View>
            </TouchableOpacity>
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
  veryActiveButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    height : 20,
    padding: 5,
  },
  buttonActiveText: {
    color: '#19b8ff',
    fontSize: 14,
  },
  healthKitButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    borderStyle: 'solid',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    marginHorizontal: 20,
  },
  buttonTextHealthKit: {
    color: '#19b8ff',
    fontSize: 20,
  },
  continueButton: {
    backgroundColor: 'transparent',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    marginHorizontal: 20,
  },
  buttonTextContinue: {
    color: '#fff',
    fontSize: 20,
  },
  slider: {
      flex: 1,
      alignItems: 'center',
      marginTop: 10,
  },
  dropdown: {
    width : 100,
  },
  dropdownStyle: {
    height: 70,
  },
});