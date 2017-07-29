import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import SliderWithCounter from '../../../../Components/sliderWithCounter';
import IonIcons from 'react-native-vector-icons/Ionicons';
import RadioButton from '../../../../Components/radioButton';
import StarRating from 'react-native-stars-rating';

const background = require('../../../../Assets/images/background.png');

import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  PRICES as prices,
  professional_filter_labels as labels,
  professional_filter_names as stateNames,
} from '../../../../Components/commonConstant';

export default class FilterForm extends Component {
  constructor(props) {
    super(props);

    const { filters, isSelected } = props.dataForProfessionalFilter;
    this.state = {
      filters,
      isSelected,
    };
  }

  onClose() {
    Actions.pop();
  }

  onDone () {
    const data = {};
    const { getClients } = this.props;

    stateNames.map(stateName => {
      if (this.state.isSelected[stateName]) {
        data[stateName] = this.state.filters[stateName];
      }
    });
    getClients(data, this.state);
    Actions.pop();
  }

  onSex(value) {
    this.setState({ filters: {...this.state.filters, gender: value } });
  }

  onLocation(value) {
    this.setState({ filters: {...this.state.filters, clientType: value } });
  }

  onCheckPrice(value) {
    this.setState({ filters: {...this.state.filters, priceLevel: value } });
  }

  onRating(value) {
    this.setState({ filters: {...this.state.filters, rating: value } });
  }

  generateFilterCheckbox (options) {
    const {title, stateName} = options;
    return (
      <RadioButton
        style={ styles.leftCheckbox }
        key={ stateName }
        label={ title }
        checked={ this.state.isSelected[stateName] }
        onPress={ () => this.setState({isSelected: {...this.state.isSelected, [stateName]: !this.state.isSelected[stateName]} }) }
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
              <View style={[ styles.cellContainer,  !this.state.isSelected.gender && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Sex', stateName: 'gender'})}
                <View style={ styles.cellValueContainer }>
                  {
                    labels.gender.map(value => {
                      return (
                        <RadioButton
                          iconStyle={ styles.checkbox }
                          key={ value }
                          label={ value }
                          checked={ this.state.filters.gender === value }
                          onPress={ () => this.onSex(value) }
                          size={23}
                        />
                      );
                    })
                  }
                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.isSelected.age && styles.deactivatedContainer, {paddingRight: 10}]}>
                {this.generateFilterCheckbox({title: 'Age', stateName: 'age'})}
                <View style={ styles.viewSlider }>
                  <SliderWithCounter
                    counter={ this.state.filters.age }
                    sliderWidth={ width * 0.8 }
                    additionalOffset={ 30 }
                    minimumTrackTintColor={"#fff"}
                    bubbleStyle={ {backgroundColor: '#fff', borderColor: '#fff'} }
                    arrowBorderStyle={ {borderTopColor: '#fff'} }
                    arrowStyle={ {borderTopColor: '#fff'} }
                    textAboveSliderStyle={ {color: '#82d7fd'} }
                    trackStyle={ {backgroundColor: 'rgba(255, 255, 255, 0.5);'} }
                    onSlidingComplete={ (value) => this.setState({ filters: {...this.state.filters, age: value } }) }
                  />
                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.isSelected.priceLevel && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Offer', stateName: 'priceLevel'})}
                <View style={ styles.touchBlock }>
                  {
                    prices.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onCheckPrice(item.level) }>
                        <View style={ [styles.viewTwoText, item.level === this.state.filters.priceLevel ? styles.priceButtonChecked : styles.priceButton] }>
                          <Text style={ [styles.textCellTitle, item.level === this.state.filters.priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.item }</Text>
                          <Text style={ [styles.textSubTitle, item.level === this.state.filters.priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.price }</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  }

                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.isSelected.rating && styles.deactivatedContainer]}>
                <View style={ styles.starContainer }>
                  {this.generateFilterCheckbox({title: 'Reviews', stateName: 'rating'})}
                  <StarRating
                    color='#fff'
                    isActive={ true }
                    rateMax={ 5 }
                    isHalfStarEnabled={ false }
                    onStarPress={ (rating) => this.onRating(rating) }
                    rate={ this.state.filters.rating }
                    size={ 30 }
                    rating={this.state.filters.rating}
                  />
                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.isSelected.clientType && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Client Type', stateName: 'clientType'})}
                <View style={ [styles.touchBlock] }>
                  {
                    labels.clientType.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onLocation(item) }>
                        <View style={ [styles.viewTwoTextPadding, item === this.state.filters.clientType ? styles.priceButtonChecked : styles.priceButton] }>
                          <Text style={ [styles.textSubTitle, item === this.state.filters.clientType ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item }</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  }
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
    marginLeft: 30,
    paddingVertical: 0,
  },
  leftCheckbox: {
    paddingVertical: 0,
    marginLeft: 1,
  },

  starContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

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
    flex: 1,
    justifyContent: 'flex-end'
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
    top: 11,
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderColor: '#10c7f9',
    borderWidth: 1
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
    width : width * 0.25,
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