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
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { RadioButtons } from 'react-native-radio-buttons'
import RadioButton from './radioButton';
import ModalDropdown from 'react-native-modal-dropdown';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');

const labelSex = ['Male', 'Female'];
const labelAge = ['16', '17', '18', '19', '20', '21'];
const labelVerified = ['Yes', 'No'];
const labelAffiliation = ['Gym', 'Independent', 'All'];
const labelYearOfExprience = ['2004', '2005', '2006'];
const labelCertification = ['Certified Personal Professional1', 'Certified Personal Professional2', 'Certified Personal Professional3'];
const labelLocation = ['Near by', 'City', 'Countary', 'Km'];

export default class FilterForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedSex: labelSex[0],
      selectedAge: labelAge[4],
      selectedVerified: labelVerified[0],
      selectedAffiliation: labelAffiliation[0],
      selectedYourOfExperience: labelYearOfExprience[0],
      selectedCertification: labelCertification[0],
      selectedLocation: labelLocation[0],
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'explore_request') {

    } else if (newProps.status == 'explore_success') {

    } else if (newProps.status == 'explore_error') {

    }
  }

  onClose() {
    Actions.pop();
  }

  onDone () {
    Actions.pop();
  }

  onSex(value) {
    this.setState({ selectedSex: value });
  }

  onAge(value) {
    this.setState({ selectedAge: value });
  }

  onVerified(value) {
    this.setState({ selectedVerified: value });
  }

  onAffiliation(value) {
    this.setState({ selectedAffiliation: value });
  }

  onYearOfExperience(value) {
    this.setState({ selectedYearOfExperience: value });
  }

  onCertification(value) {
    this.setState({ selectedCetification: value });
  }

  onLocation(value) {
    this.setState({ selectedLocation: value });
  }


  renderOption(option, selected, onSelect, index){
    const styleText = selected ? styles.textSelectedCellValue : styles.textCellValue;
    const styleView = selected ? styles.circleSelectNumberWrapper : styles.circleNumberWrapper;

    return (
      <TouchableWithoutFeedback onPress={ onSelect } key={ index }>
        <View style={ styleView }>
          <Text style={ styleText }>{ option }</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderContainer(optionNodes){
    return <View style={ styles.cellValueContainer }>{ optionNodes }</View>
  }

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">

          <View style={ styles.navBarContainer }>
            <View style={ styles.closeButtonWrapper } />

            <Text style={ styles.textTitle }>FILTER</Text>

            <TouchableOpacity
              onPress={ () => this.onClose() }
              style={ styles.closeButtonWrapper }
            >
              <EvilIcons
                name="close"  size={ 35 }
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View style={ styles.mainContainer }>

            <View style={ styles.cellContainer }>
              <Text style={ styles.textCellTitle }>Sex</Text>
              <View style={ styles.cellValueContainer }>
                {
                  labelSex.map(value => {
                    return (
                      <RadioButton
                        style={ styles.paddingTwo }
                        key={ value }
                        label={ value }
                        checked={ this.state.selectedSex == value }
                        onPress={ () => this.onSex(value) }
                      />
                    );
                  })
                }
              </View>
            </View>

            <View style={ styles.cellContainer }>
              <Text style={ styles.textCellTitle }>Age</Text>
              <RadioButtons
                options={ labelAge }
                onSelection={ this.onAge.bind(this) }
                selectedOption={ this.state.selectedAge }
                renderOption={ this.renderOption }
                renderContainer={ this.renderContainer }
              />
            </View>

            <View style={ styles.cellContainer }>
              <Text style={ styles.textCellTitle }>Verified</Text>
              <View style={ styles.cellValueContainer }>
                {
                  labelVerified.map(value => {
                    return (
                      <RadioButton
                        style={ styles.paddingTwo }
                        key={ value }
                        label={ value }
                        checked={ this.state.selectedVerified == value }
                        onPress={ () => this.onVerified(value) }
                      />
                    );
                  })
                }
              </View>
            </View>

            <View style={ styles.cellContainer }>
              <Text style={ styles.textCellTitle }>Affiliation</Text>
              <View style={ styles.cellValueContainer }>
                {
                  labelAffiliation.map(value => {
                    return (
                      <RadioButton
                        style={ styles.paddingThree }
                        key={ value }
                        label={ value }
                        checked={ this.state.selectedAffiliation == value }
                        onPress={ () => this.onAffiliation(value) }
                      />
                    );
                  })
                }
              </View>
            </View>

            <View style={ styles.cellContainer }>
              <Text style={ styles.textCellTitle }>Year of Experience</Text>
              <View style={ styles.dropdownWrapper }>
                <ModalDropdown
                  options={ labelYearOfExprience }
                  defaultValue={ this.state.selectedYourOfExperience }
                  style={ styles.dropdown }
                  textStyle ={ styles.dropDownText }
                  dropdownStyle={ styles.dropdownStyle }
                  onSelect={ (rowId, rowData) => this.onYearOfExperience(rowData) }
                />
                <EvilIcons
                  name="chevron-down"  size={ 30 }
                  color="#fff"
                />
              </View>
            </View>

            <View style={ styles.cellContainer }>
              <Text style={ styles.textCellTitle }>Certification</Text>
              <View style={ styles.dropdownWrapper }>
                <ModalDropdown
                  options={ labelCertification }
                  defaultValue={ this.state.selectedCertification }
                  style={ styles.dropdown }
                  textStyle ={ styles.dropDownText }
                  dropdownStyle={ styles.dropdownStyle }
                  onSelect={ (rowId, rowData) => this.onCertification(rowData) }
                />
                <EvilIcons
                  name="chevron-down"  size={ 30 }
                  color="#fff"
                />
              </View>
            </View>

            <View style={ styles.cellContainer }>
              <Text style={ styles.textCellTitle }>Location</Text>
              <View style={ styles.cellValueContainer }>
                {
                  labelLocation.map(value => {
                    return (
                      <RadioButton
                        key={ value }
                        label={ value }
                        checked={ this.state.selectedLocation == value }
                        onPress={ () => this.onLocation(value) }
                      />
                    );
                  })
                }
              </View>
            </View>

            <View style={ styles.buttonWrapper }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onDone() }>
                <View style={ styles.doneButton }>
                  <Text style={ styles.buttonText }>Done</Text>
                </View>
              </TouchableOpacity>
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
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonWrapper: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textTitle: {
    flex: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 22
  },
  mainContainer: {
    flex: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  cellContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cellValueContainer: {
    flexDirection: 'row',
  },
  textCellTitle: {
    color: '#fff',
    fontSize: 16,
  },
  textCellValue: {
    color: '#fff',
    fontSize: 14,
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
    backgroundColor: '#fff',
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
  paddingTwo: {
    marginRight: 40,
  },
  paddingThree: {
    marginRight: 20,
  },
  dropdownWrapper: {
    flexDirection: 'row',
    height: 30,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dropdown: {
    width : width * 0.6,
  },
  dropdownStyle: {
    height: 100,
    width : width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',

  },
  dropDownText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonWrapper: {
    flex: 1.3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  doneButton: {
    width: width - 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#fff',
    borderStyle: 'solid',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    paddingVertical: 10,
    paddingHorizontal: 40,
    height: 40,
  },
  buttonText: {
    color: '#73d3fd',
    fontSize: 20,
  },
});