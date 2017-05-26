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
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Slider from 'react-native-slider';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import RadioButton from './radioButton';
import ModalDropdown from 'react-native-modal-dropdown';
import StarRating from 'react-native-stars-rating';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');

const labelSex = ['Male', 'Female'];
const labelVerified = ['Yes', 'No'];
const labelInsured = ['Yes', 'No'];
const labelAffiliation = ['Gym', 'Independent', 'All'];
const labelYearOfExprience = ['2004', '2005', '2006'];
const labelCertification = ['Certified Personal Professional1', 'Certified Personal Professional2', 'Certified Personal Professional3'];
const labelLocation = ['Meet at Home', 'One place'];
const labelProfession = ['Pilates', 'Yoga trainers', 'Massage'];

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
      selectedYearOfExperience: labelYearOfExprience[0],
      selectedCertification: labelCertification[0],
      selectedLocation: labelLocation[0],
      selectedProfession: labelProfession[0],
      priceLevel : prices[0].level,
      selectedReview: 2
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
  prepareData(){
    const data = {
      gender: this.state.selectedSex,
      age: this.state.selectedAge,
      priceLevel: this.state.priceLevel,
      insured: this.state.selectedInsured === 'Yes',
      profession: [this.state.selectedProfession],
      certification: this.state.selectedCertification,
      experience: +this.state.selectedYearOfExperience,
      rating: this.state.selectedReview,
      availability: {
        toClient: this.state.selectedLocation === 'Meet at Home',
        ownSpace: this.state.selectedLocation === 'One place'
      }
    };
    return data;
  }

  onDone () {
    const { getProfessionals } = this.props;
    const data = this.prepareData();
    getProfessionals(data);
    Actions.pop();
  }

  onSex(value) {
    this.setState({ selectedSex: value });
  }

  onVerified(value) {
    this.setState({ selectedVerified: value });
  }

  onInsured(value) {
    this.setState({ selectedInsured: value });
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

  onRating(value) {
    this.setState({ selectedReview: value });
  }


  onCheckPrice(value) {
    this.setState({ priceLevel: value });
  }

  render() {
    const { status } = this.props;
    let scale = (width) / 104 ;
    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">

          <View style={ styles.navBarContainer }>
            <View style={ styles.closeButtonWrapper } />
            <TouchableOpacity
              onPress={ () => this.onClose() }
              style={ styles.closeButtonWrapper }
            >
              <EvilIcons
                name="close"  size={ 35 }
                color="#fff"
              />
            </TouchableOpacity>
            <Text style={ styles.textTitle }>FILTER</Text>
            <TouchableOpacity
              onPress={ () => this.onDone() }
              style={ styles.closeButtonWrapper }
            >
              <EvilIcons
                name="check"  size={ 35 }
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
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
                          size={23}
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
                      <Animated.Text style={ [styles.textAboveSlider, styles.priceButtonTextChecked] }>{ this.state.selectedAge }</Animated.Text>
                    </Animated.View>
                    <Animated.View style={ styles.arrowBorder } />
                    <Animated.View style={ styles.arrow } />
                  </Animated.View>
                  <Slider style={ styles.slider }
                          maximumTrackTintColor="#b2e1fb"
                          minimumTrackTintColor="#ffffff"
                          trackStyle= {{backgroundColor: 'rgba(255, 255, 255, 0.5);'}}
                          thumbStyle={ styles.thumbStyle }
                          thumbTouchSize={{width: 40, height: 60}}
                          minimumValue={ 15 }
                          maximumValue={ 85 }
                          step={ 1 }
                          value = { this.state.selectedAge }
                          onValueChange={ (value) => this.setState({ selectedAge: value }) }
                  />
                </View>
              </View>
              <View style={ styles.cellContainer }>
                <Text style={ [styles.textCellTitle, styles.labelLine] }>Price</Text>
                <View style={ styles.touchBlock }>
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

              <View style={ styles.cellContainer }>
                <Text style={ [styles.textCellTitle, styles.labelLine] }>Verified</Text>
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
                          size={23}
                        />
                      );
                    })
                  }
                </View>
              </View>

              <View style={ styles.cellContainerBlock }>
                <Text style={styles.textCellTitle}>Year of Experience</Text>
                <View style={ [styles.dropdownWrapper] }>
                  <ModalDropdown
                    options={ labelYearOfExprience }
                    defaultValue={ this.state.selectedYourOfExperience }
                    dropdownStyle={ [styles.dropdownStyle] }
                    onSelect={ (rowId, rowData) => this.onYearOfExperience(rowData) }
                  >
                    <Text style={ [styles.dropdown, styles.dropDownText] }>{this.state.selectedYearOfExperience}</Text>
                    <EvilIcons
                      style={ styles.iconDropDown }
                      name="chevron-down"
                      size={ 30 }
                      color="#fff"
                    />
                  </ModalDropdown>
                </View>
              </View>
              <View style={ styles.cellContainer }>
                <Text style={ [styles.textCellTitle, styles.labelLine] }>Location</Text>
                <View style={ [styles.touchBlock] }>
                  {
                    labelLocation.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onLocation(item) }>
                        <View style={ [styles.viewTwoTextPadding, item === this.state.selectedLocation ? styles.priceButtonChecked : styles.priceButton] }>
                          <Text style={ [styles.textSubTitle, item === this.state.selectedLocation ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item }</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </View>
              <View style={ styles.cellContainer }>
                <Text style={ [styles.textCellTitle, styles.labelLine ]}>Insured</Text>
                <View style={ styles.cellValueContainer }>
                  {
                    labelInsured.map(value => {
                      return (
                        <RadioButton
                          size={23}
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
                <View style={ styles.starContainer }>
                  <Text style={ [styles.textCellTitle, styles.labelLine ]}>Reviews</Text>
                  <StarRating
                    color='#fff'
                    isActive={ true }
                    rateMax={ 5 }
                    isHalfStarEnabled={ false }
                    onStarPress={ (rating) => this.onRating(rating) }
                    rate={ this.state.selectedReview }
                    size={ 30 }
                    rating={this.state.selectedReview}
                  />
                </View>
              </View>
              <View style={ styles.cellContainerBlock }>
                <Text style={ styles.textCellTitle }>Profession</Text>
                <View style={ styles.touchBlock }>
                  {
                    labelProfession.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onProfession(item) }>
                        <View style={ [styles.viewTwoTextPadding, item === this.state.selectedProfession ? styles.priceButtonChecked : styles.priceButton] }>
                          <Text style={ [styles.textSubTitle, item === this.state.selectedProfession ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item }</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                  <EvilIcons
                    name="plus"
                    size={ 35 }
                    color="#fff"
                    style={ styles.addButton }
                  />
                </View>
              </View>
              <View style={ styles.cellContainerBlock }>
                <Text style={ styles.textCellTitle }>Certification</Text>

                <View style={ [styles.dropdownWrapper] }>
                  <ModalDropdown
                    options={ labelCertification }
                    dropdownStyle={ [styles.dropdownStyle] }
                    onSelect={ (rowId, rowData) => this.onCertification(rowData) }
                  >
                    <Text numberOfLines={1} style={ [styles.dropdown, styles.dropDownText] }>{this.state.selectedCertification}</Text>
                    <EvilIcons
                      style={ styles.iconDropDown }
                      name="chevron-down"
                      size={ 30 }
                      color="#fff"
                    />
                  </ModalDropdown>
                </View>
              </View>
            </View>
          </ScrollView>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconDropDown: {
    position: 'absolute',
    right: 0,
    top: -3,
  },
  addButton: {
    marginLeft: 10,
  },
  starContainer: {
    flexDirection: 'row',
  },
  cellContainerBlock: {
    flex: 0,
    marginVertical: 7,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  touchBlock: {
    flexDirection: 'row',
    marginLeft: -15,
    marginTop: 10
  },
  viewTwoText: {
    flexDirection: 'column',
  },
  viewTwoTextPadding: {
    paddingVertical: 6
  },
  priceButtonChecked: {
    alignItems: 'center',
    borderRadius: 30,
    width: 76,
    marginLeft: 15,
    backgroundColor: '#fff',
  },
  priceButton: {
    alignItems: 'center',
    borderRadius: 30,
    width: 76,
    marginLeft: 15,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  textSubTitle: {
    fontFamily: 'Open Sans',
    color: '#707070',
    fontSize: 10,
  },

  thumbStyle:{
    top:11,
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderColor: '#10c7f9',
    borderWidth: 1
  },

  animateContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginRight: 6,
    marginLeft: -6,
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
    color: '#fff',
    textAlign: 'center',
  },
  priceButtonTextChecked: {
    color: '#82d7fd',
    textAlign: 'center',
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -15,
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
    height: 20,
    marginBottom: -10,
  },

  viewSlider:{
    flex: 1,
    flexDirection: 'column',
    marginLeft: width/20,
    marginBottom:20
  },

  container: {
    flex: 0,
  },
  background: {
    width,
    height,
  },
  labelLine: {
    width : width * 0.23,
  },
  navBarContainer: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop:40,
  },
  closeButtonWrapper: {
    flex: 0,
    paddingVertical: 5,
  },
  textTitle: {
    flex: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 22
  },
  mainContainer: {
    flex: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:0,
    justifyContent: 'space-between',
    marginVertical: 7,

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
    marginRight: 30,
    paddingVertical: 0
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
    borderRadius:  10,
    borderWidth: 1,
    borderColor: '#6ad0fd',
    marginTop: 6
  },
  dropDownText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 15
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