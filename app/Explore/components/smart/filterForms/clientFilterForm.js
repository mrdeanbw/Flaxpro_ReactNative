import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import SliderWithCounter from '../../../../Components/sliderWithCounter';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import RadioButton from '../../../../Components/radioButton';
import ModalDropdown from 'react-native-modal-dropdown';
import StarRating from 'react-native-stars-rating';

import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  PRICES as prices,
  client_filter_labels as labels,
  client_filter_names as stateNames,
} from '../../../../Components/commonConstant';

const background = require('../../../../Assets/images/background.png');

export default class FilterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    stateNames.map(stateName => {
      this.state['filter_'  + stateName] = true;
      this.state['selected_'+ stateName] = this.getDefaultState(stateName);
    });
  }

  getDefaultState(stateName) {
    switch (stateName){
      case 'age':
        return 28;
      case 'rating':
        return 2;
      case 'priceLevel':
        return prices[0].level;
      default:
        return labels[stateName][0];
    }
  }

  onClose() {
    Actions.pop();
  }
  prepareData(){
    let data = {};
    const { professions } = this.props;
    console.log(this.props)
    stateNames.map(stateName => {
      const stateField = this.state['selected_' + stateName];
      if (this.state['filter_' + stateName]) {
        if (stateName === 'availability') {
          if(stateField === 'Meet at Home') data.toClient = true;
          if(stateField === 'One place') data.ownSpace = true;
        } 
        else if(stateName === 'profession'){
          let pro = professions.filter((item)=>item.name===stateField);
          data.profession = pro.length>0?pro[0]._id:''
        }
        else { data[stateName] = stateField }
      }
    });
    return data;
  }

  onDone () {
    const { getProfessionals } = this.props;
    const data = this.prepareData();
    getProfessionals(data);
    Actions.pop();
  }

  onSex(value) {
    this.setState({ selected_gender: value });
  }

  onVerified(value) {
    this.setState({ selected_verified: value });
  }

  onInsured(value) {
    this.setState({ selected_insured: value });
  }

  onYearOfExperience(value) {
    this.setState({ selected_experience: value });
  }

  onCertification(value) {
    this.setState({ selected_cetification: value });
  }

  onLocation(value) {
    this.setState({ selected_availability: value });
  }

  onProfession(value) {
    this.setState({ selected_profession: value });
  }

  onRating(value) {
    this.setState({ selected_rating: value });
  }


  onCheckPrice(value) {
    this.setState({ selected_priceLevel: value });
  }

  generateFilterCheckbox (options) {
    const {title, stateName} = options;
    let name = 'filter_' + stateName;
    return (
      <RadioButton
        style={ styles.leftCheckbox }
        key={ name }
        label={ title }
        checked={ this.state[name] }
        onPress={ () => this.setState({[name]: !this.state[name]}) }
        size={18}
        labelStyle = {{paddingLeft: 10}}
      />
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">

          <View style={ styles.navBarContainer }>
            <View style={ styles.closeButtonWrapper } />
            <TouchableOpacity
              onPress={ () => this.onClose() }
              style={ styles.closeButtonWrapper }
            >
              <IonIcons
                name="md-close"  size={ 35 }
                color="#fff"
              />
            </TouchableOpacity>
            <Text style={ styles.textTitle }>FILTER</Text>
            <TouchableOpacity
              onPress={ () => this.onDone() }
              style={ styles.closeButtonWrapper }
            >
              <IonIcons
                name="md-checkmark"  size={ 35 }
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={ styles.mainContainer }>
              <View style={[ styles.cellContainer,  !this.state.filter_gender && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Sex', stateName: 'gender'})}
                <View style={ styles.cellValueContainer }>
                  {
                    labels.gender.map(value => {
                      return (
                        <RadioButton
                          style={ styles.checkbox }
                          key={ value }
                          label={ value }
                          checked={ this.state.selected_gender === value }
                          onPress={ () => this.onSex(value) }
                          size={23}
                        />
                      );
                    })
                  }
                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.filter_age && styles.deactivatedContainer, {paddingRight: 10}]}>
                {this.generateFilterCheckbox({title: 'Age', stateName: 'age'})}
                <View style={ styles.viewSlider }>
                  <SliderWithCounter
                    counter={ this.state.selected_age }
                    sliderWidth={ width * 0.8 }
                    additionalOffset={ 30 }
                    minimumTrackTintColor={"#fff"}
                    bubbleStyle={ {backgroundColor: '#fff', borderColor: '#fff'} }
                    arrowBorderStyle={ {borderTopColor: '#fff'} }
                    arrowStyle={ {borderTopColor: '#fff'} }
                    textAboveSliderStyle={ {color: '#82d7fd'} }
                    trackStyle={ {backgroundColor: 'rgba(255, 255, 255, 0.5);'} }
                    onSlidingComplete={ (value) => this.setState({ selected_age: value }) }
                  />
                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.filter_priceLevel && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Price', stateName: 'priceLevel'})}
                <View style={ styles.touchBlock }>
                  {
                    prices.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onCheckPrice(item.level) }>
                        <View style={ [styles.viewTwoText, styles.marginLeft_15, item.level === this.state.selected_priceLevel ? styles.priceButtonChecked : styles.priceButton] }>
                          <Text style={ [styles.textCellTitle, item.level === this.state.selected_priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.item }</Text>
                          <Text style={ [styles.textSubTitle, item.level === this.state.selected_priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.price }</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  }

                </View>
              </View>

              <View style={[ styles.cellContainer,  !this.state.filter_verified && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Verified', stateName: 'verified'})}
                <View style={ styles.cellValueContainer }>
                  {
                    labels.verified.map(value => {
                      return (
                        <RadioButton
                          style={ styles.checkbox }
                          key={ value }
                          label={ value }
                          checked={ this.state.selected_verified === value }
                          onPress={ () => this.onVerified(value) }
                          size={23}
                        />
                      );
                    })
                  }
                </View>
              </View>

              <View style={[ styles.cellContainerBlock,  !this.state.filter_experience && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Year of Experience', stateName: 'experience'})}
                <View style={ [styles.dropdownWrapper] }>
                  <ModalDropdown
                    options={ labels.experience }
                    defaultValue={ this.state.selectedYourOfExperience }
                    dropdownStyle={ [styles.dropdownStyle] }
                    onSelect={ (rowId, rowData) => this.onYearOfExperience(rowData) }
                  >
                    <Text style={ [styles.dropdown, styles.dropDownText] }>{this.state.selected_experience}</Text>
                    <EvilIcons
                      style={ styles.iconDropDown }
                      name="chevron-down"
                      size={ 30 }
                      color="#fff"
                    />
                  </ModalDropdown>
                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.filter_availability && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Location', stateName: 'availability'})}
                <View style={ [styles.touchBlock] }>
                  {
                    labels.availability.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onLocation(item) }>
                        <View style={ [styles.viewTwoTextPadding, styles.marginLeft_15, item === this.state.selected_availability ? styles.priceButtonChecked : styles.priceButton] }>
                          <Text style={ [styles.textSubTitle, item === this.state.selected_availability ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item }</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.filter_insured && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Insured', stateName: 'insured'})}
                <View style={ styles.cellValueContainer }>
                  {
                    labels.insured.map(value => {
                      return (
                        <RadioButton
                          size={23}
                          style={ styles.checkbox }
                          key={ value }
                          label={ value }
                          checked={ this.state.selected_insured === value }
                          onPress={ () => this.onInsured(value) }
                        />
                      );
                    })
                  }
                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.filter_rating && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Reviews', stateName: 'rating'})}
                <StarRating
                  color='#fff'
                  isActive={ true }
                  rateMax={ 5 }
                  isHalfStarEnabled={ false }
                  onStarPress={ (rating) => this.onRating(rating) }
                  rate={ this.state.selected_rating }
                  size={ 30 }
                  rating={this.state.selected_rating}
                />
              </View>
              <View style={[ styles.cellContainerBlock,  !this.state.filter_certification && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Certification', stateName: 'certification'})}
                <View style={ [styles.dropdownWrapper] }>
                  <ModalDropdown
                    options={ labels.certification }
                    dropdownStyle={ [styles.dropdownStyle] }
                    onSelect={ (rowId, rowData) => this.onCertification(rowData) }
                  >
                    <Text numberOfLines={1} style={ [styles.dropdown, styles.dropDownText] }>{this.state.selected_certification}</Text>
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
  deactivatedContainer: {
    opacity: .5,
  },
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
    borderBottomWidth: 0,
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
  priceButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  priceButtonTextChecked: {
    color: '#82d7fd',
    textAlign: 'center',
  },
  viewSlider:{
    flex: 1,
    flexDirection: 'column',
    marginLeft: width/5,
    marginBottom: 10,
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
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