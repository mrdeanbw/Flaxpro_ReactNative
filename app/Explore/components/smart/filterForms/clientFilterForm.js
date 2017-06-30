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
import RadioButton from '../../../../Components/radioButton';
import ModalDropdown from 'react-native-modal-dropdown';
import StarRating from 'react-native-stars-rating';

const { width, height } = Dimensions.get('window');

const background = require('../../../../Assets/images/background.png');

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
      filterSex : false,
      filterAge : false,
      filterPrice : false,
      filterVerified : false,
      filterYearofExperience : false,
      filterLocation : false,
      filterInsured : false,
      filterReviews : false,
      filterProfession : false,
      filterCertification : false,

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

  onClose() {
    Actions.pop();
  }
  prepareData(){
    let data = {};
    if (this.state.filterSex) { data.gender = this.state.selectedSex }
    if (this.state.filterAge) { data.age = this.state.selectedAge }
    if (this.state.filterPrice) { data.priceLevel = this.state.priceLevel }
    if (this.state.filterVerified) { data.verified = this.state.selectedVerified }
    if (this.state.filterYearofExperience) { data.experience = this.state.selectedYearOfExperience }
    if (this.state.filterInsured) { data.insured = this.state.selectedInsured }
    if (this.state.filterReviews) { data.rating = this.state.selectedReview }
    if (this.state.filterProfession) { data.profession = this.state.selectedProfession }
    if (this.state.filterCertification) { data.certification = this.state.selectedCertification }
    if (this.state.filterLocation) { data.availability =
      {
        toClient : this.state.selectedLocation === 'Meet at Home',
        ownSpace : this.state.selectedLocation === 'One place'
      }
    }
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
    let filterCheckbox = (title)=> {
      let state = 'filter'+title.replace(/\s/g, '');
      return (
        <RadioButton
          style={ styles.leftCheckbox }
          key={ title.replace(/\s/g, '_') }
          label={ title }
          checked={ this.state[state] }
          onPress={ () => this.setState({[state]: !this.state[state]}) }
          size={18}
        />
      )
    };
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
                {filterCheckbox('Sex')}
                <View style={ styles.cellValueContainer }>
                  {
                    labelSex.map(value => {
                      return (
                        <RadioButton
                          style={ styles.checkbox }
                          key={ value }
                          label={ value }
                          checked={ this.state.selectedSex === value }
                          onPress={ () => this.onSex(value) }
                          size={23}
                        />
                      );
                    })
                  }
                </View>
              </View>
              <View style={ styles.cellContainer }>
                { filterCheckbox('Age') }
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
                { filterCheckbox('Price') }
                <View style={ styles.touchBlock }>
                  {
                    prices.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onCheckPrice(item.level) }>
                        <View style={ [styles.viewTwoText, styles.marginLeft_15, item.level === this.state.priceLevel ? styles.priceButtonChecked : styles.priceButton] }>
                          <Text style={ [styles.textCellTitle, item.level === this.state.priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.item }</Text>
                          <Text style={ [styles.textSubTitle, item.level === this.state.priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.price }</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  }

                </View>
              </View>

              <View style={ styles.cellContainer }>
                { filterCheckbox('Verified') }
                <View style={ styles.cellValueContainer }>
                  {
                    labelVerified.map(value => {
                      return (
                        <RadioButton
                          style={ styles.checkbox }
                          key={ value }
                          label={ value }
                          checked={ this.state.selectedVerified === value }
                          onPress={ () => this.onVerified(value) }
                          size={23}
                        />
                      );
                    })
                  }
                </View>
              </View>

              <View style={ styles.cellContainerBlock }>
                { filterCheckbox('Year of Experience') }
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
                { filterCheckbox('Location') }
                <View style={ [styles.touchBlock] }>
                  {
                    labelLocation.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onLocation(item) }>
                        <View style={ [styles.viewTwoTextPadding, styles.marginLeft_15, item === this.state.selectedLocation ? styles.priceButtonChecked : styles.priceButton] }>
                          <Text style={ [styles.textSubTitle, item === this.state.selectedLocation ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item }</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </View>
              <View style={ styles.cellContainer }>
                { filterCheckbox('Insured') }
                <View style={ styles.cellValueContainer }>
                  {
                    labelInsured.map(value => {
                      return (
                        <RadioButton
                          size={23}
                          style={ styles.checkbox }
                          key={ value }
                          label={ value }
                          checked={ this.state.selectedInsured === value }
                          onPress={ () => this.onInsured(value) }
                        />
                      );
                    })
                  }
                </View>
              </View>
              <View style={ styles.cellContainer }>
                { filterCheckbox('Reviews') }
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
              <View style={ styles.cellContainerBlock }>
                { filterCheckbox('Profession') }
                <View style={ [styles.touchBlock, {marginTop: 10}] }>
                  {
                    labelProfession.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onProfession(item) }>
                        <View style={ [styles.viewTwoTextPadding, styles.marginRight_15, item === this.state.selectedProfession ? styles.priceButtonChecked : styles.priceButton] }>
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
                { filterCheckbox('Certification') }
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
  checkbox: {
    marginRight: -8,
    marginLeft: 30,
    paddingVertical: 0,
  },
  leftCheckbox: {
    paddingVertical: 0,
    marginLeft: 1,
  },
  iconDropDown: {
    position: 'absolute',
    right: 0,
    top: -3,
  },
  addButton: {
    marginRight: 10,
  },
  cellContainerBlock: {
    flex: 0,
    paddingVertical: 7,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  touchBlock: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  viewTwoText: {
    flexDirection: 'column',
  },
  viewTwoTextPadding: {
    paddingVertical: 6
  },
  marginLeft_15: {
    marginLeft: 15,
  },
  marginRight_15: {
    marginRight: 15,
  },
  priceButtonChecked: {
    alignItems: 'center',
    borderRadius: 30,
    width: 76,
    backgroundColor: '#fff',
  },
  priceButton: {
    alignItems: 'center',
    borderRadius: 30,
    width: 76,
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
    height: 20,
    marginLeft: 20
  },

  viewSlider:{
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
    justifyContent: 'flex-end'
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
    paddingTop: 20,
    paddingHorizontal: 15,
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
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  cellContainer: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    flex:0,
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',

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
    // flexDirection: 'row',
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