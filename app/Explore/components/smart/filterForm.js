import React, { Component } from 'react';
import {
  Animated,
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
import Slider from 'react-native-slider';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { RadioButtons } from 'react-native-radio-buttons'
import RadioButton from './radioButton';
import ModalDropdown from 'react-native-modal-dropdown';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');

const labelSex = ['Male', 'Female'];
const labelAge = ['16', '17', '18', '19', '20', '21'];
const labelVerified = ['Yes', 'No'];
const labelInsured = ['Yes', 'No'];
const labelAffiliation = ['Gym', 'Independent', 'All'];
const labelYearOfExprience = ['2004', '2005', '2006'];
const labelCertification = ['Certified Personal Professional1', 'Certified Personal Professional2', 'Certified Personal Professional3'];
const labelLocation = ['Meet at Home', 'One place'];
const labelProfession = ['Pilates', 'Yoga', 'Massage'];

const prices = [
  {item: '$', price: '$50-100', level: 1},
  {item: '$$', price: '$100-300', level: 2},
  {item: '$$$', price: '$300+', level: 3}
];

export default class FilterForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedSex: labelSex[0],
      selectedAge: 28,
      selectedVerified: labelVerified[0],
      selectedInsured: labelInsured[0],
      selectedAffiliation: labelAffiliation[0],
      selectedYourOfExperience: labelYearOfExprience[0],
      selectedCertification: labelCertification[0],
      selectedLocation: labelLocation[0],
      selectedProfession: labelProfession[0],
      priceLevel : prices[0].level
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

  onInsured(value) {
    this.setState({ selectedInsured: value });
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

  onProfession(value) {
    this.setState({ selectedProfession: value });
  }


  onCheckPrice(value) {
    this.setState({ priceLevel: value });
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
    let scale = (width * 3/4 -75) / 72 ;
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
              <Text style={ [styles.textCellTitle, styles.labelLine] }>Sex</Text>
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
              <View style={ styles.viewSlider }>
                <Animated.View style={ [styles.animateContainer, {paddingLeft: (this.state.selectedAge -15) * scale}] }>
                  <Animated.View style={ styles.bubble }>
                    <Animated.Text style={ [styles.textAboveSlider, styles.priceButtonText] }>{ this.state.selectedAge }</Animated.Text>
                  </Animated.View>
                  <Animated.View style={ styles.arrowBorder } />
                  <Animated.View style={ styles.arrow } />
                </Animated.View>
                <Slider style={ styles.slider }
                        maximumTrackTintColor="#9be5ff"
                        minimumTrackTintColor="#10c7f9"
                        trackStyle={{backgroundColor: '#9be5ff'}}
                        thumbStyle={ styles.thumbStyle }
                        minimumValue={ 15 }
                        maximumValue={ 85 }
                        step={ 1 }
                        value = { this.state.selectedAge }
                        onValueChange={ (value) => this.setState({ selectedAge: value }) }
                />
              </View>
            </View>


            <View style={ styles.cellContainer }>
              <Text style={ styles.textCellTitle }>Price</Text>
              <View style={ styles.pricesBlock }>
                {
                  prices.map((item, index) =>(
                    <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onCheckPrice(item.level) }>
                      <View style={ [styles.viewTwoText, item.level === this.state.priceLevel ? styles.priceButtonChecked : styles.priceButton] }>
                        <Text style={ [styles.textCellTitle, item.level === this.state.priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.item }</Text>
                        <Text style={ [styles.textSubTitle, item.level === this.state.priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.price }</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }

              </View>
            </View>

            {/*<View style={ styles.cellContainer }>*/}
              {/*<Text style={ [styles.textCellTitle, styles.labelLine] }>Age</Text>*/}
              {/*<RadioButtons*/}
                {/*options={ labelAge }*/}
                {/*onSelection={ this.onAge.bind(this) }*/}
                {/*selectedOption={ this.state.selectedAge }*/}
                {/*renderOption={ this.renderOption }*/}
                {/*renderContainer={ this.renderContainer }*/}
              {/*/>*/}
            {/*</View>*/}






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

            {/*<View style={ styles.cellContainer }>*/}
              {/*<Text style={ styles.textCellTitle }>Affiliation</Text>*/}
              {/*<View style={ styles.cellValueContainer }>*/}
                {/*{*/}
                  {/*labelAffiliation.map(value => {*/}
                    {/*return (*/}
                      {/*<RadioButton*/}
                        {/*style={ styles.paddingThree }*/}
                        {/*key={ value }*/}
                        {/*label={ value }*/}
                        {/*checked={ this.state.selectedAffiliation == value }*/}
                        {/*onPress={ () => this.onAffiliation(value) }*/}
                      {/*/>*/}
                    {/*);*/}
                  {/*})*/}
                {/*}*/}
              {/*</View>*/}
            {/*</View>*/}

            <View style={ styles.cellContainerBlock }>
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
              <Text style={ styles.textCellTitle }>Location</Text>
              <View style={ styles.pricesBlock }>
                {
                  labelLocation.map((item, index) =>(
                    <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onLocation(item) }>
                      <View style={ [styles.viewTwoText, item === this.state.selectedLocation ? styles.priceButtonChecked : styles.priceButton] }>
                        <Text style={ [styles.textSubTitle, item === this.state.selectedLocation ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item }</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>


            <View style={ styles.cellContainer }>
              <Text style={ styles.textCellTitle }>Insured</Text>
              <View style={ styles.cellValueContainer }>
                {
                  labelInsured.map(value => {
                    return (
                      <RadioButton
                        style={ styles.paddingTwo }
                        key={ value }
                        label={ value }
                        checked={ this.state.selectedInsured == value }
                        onPress={ () => this.onInsured(value) }
                      />
                    );
                  })
                }
              </View>
            </View>


            <View style={ styles.cellContainer }>
              <Text style={ styles.textCellTitle }>Profession</Text>
              <View style={ styles.pricesBlock }>
                {
                  labelProfession.map((item, index) =>(
                    <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onProfession(item) }>
                      <View style={ [styles.viewTwoText, item === this.state.selectedProfession ? styles.priceButtonChecked : styles.priceButton] }>
                        <Text style={ [styles.textSubTitle, item === this.state.selectedProfession ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item }</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
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

  cellContainerBlock: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  pricesBlock: {
    flexDirection: 'row',
  },
  viewTwoText: {
    flexDirection: 'column',
  },
  priceButtonChecked: {
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
  textSubTitle: {
    fontFamily: 'Open Sans',
    color: '#707070',
    fontSize: 10,
  },


  bubble: {
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    flex: 0,
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
  },
  textAboveSlider: {
    height: 15,
    width: 20,
    fontSize: 13,
  },
  priceButtonText: {
    color: '#6b6b6b',
    textAlign: 'center',
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -12,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  slider: {
    marginRight: 15,
    alignItems: 'center',
    height: 20,
    marginBottom: -10,
  },

  viewSlider:{
    flex: 1,
    flexDirection: 'column',
    marginLeft: width/4,
  },

  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  labelLine: {
    width : width * 0.15,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

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