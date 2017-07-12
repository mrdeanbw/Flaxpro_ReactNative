import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Slider from 'react-native-slider';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
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
    this.state = {
      filters: {},
      selected: {},
    };

    stateNames.map(stateName => {
      this.state.filters[stateName] = true;
      this.state.selected[stateName] = this.getDefaultState(stateName);
    });
  }

  getDefaultState(stateName) {
    switch (stateName){
      case 'priceLevel':
        return prices[0].level;
      default:
        return labels[stateName][0];
    }
  }

  onClose() {
    Actions.pop();
  }

  onDone () {
    let data = {};
    stateNames.map(stateName => {
      if (this.state.filters[stateName]) {
        data[stateName] = this.state.selected[stateName];
      }
    })
    const { getClients } = this.props;
    getClients(data);
    Actions.pop();
  }

  onSex(value) {
    this.setState({ selected: {...this.state.selected, gender: value } });
  }

  onLocation(value) {
    this.setState({ selected: {...this.state.selected, clientType: value } });
  }

  onCheckPrice(value) {
    this.setState({ selected: {...this.state.selected, priceLevel: value } });
  }

  onRating(value) {
    this.setState({ selected: {...this.state.selected, rating: value } });
  }

  generateFilterCheckbox (options) {
    const {title, stateName} = options;
    return (
      <RadioButton
        style={ styles.leftCheckbox }
        key={ stateName }
        label={ title }
        checked={ this.state.filters[stateName] }
        onPress={ () => this.setState({filters: {...this.state.filters, [stateName]: !this.state.filters[stateName]} }) }
        size={18}
        labelStyle = {{paddingLeft: 10}}
      />
    )
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
              <View style={[ styles.cellContainer,  !this.state.filters.gender && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Sex', stateName: 'gender'})}
                <View style={ styles.cellValueContainer }>
                  {
                    labels.gender.map(value => {
                      return (
                        <RadioButton
                          style={ styles.checkbox }
                          key={ value }
                          label={ value }
                          checked={ this.state.selected.gender === value }
                          onPress={ () => this.onSex(value) }
                          size={23}
                        />
                      );
                    })
                  }
                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.filters.age && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Age', stateName: 'age'})}
                <View style={ styles.viewSlider }>
                  <Animated.View style={ [styles.animateContainer, {paddingLeft: (this.state.selected.age -15) * scale}] }>
                    <Animated.View style={ styles.bubble }>
                      <Animated.Text style={ [styles.textAboveSlider, styles.priceButtonTextChecked] }>{ this.state.selected.age }</Animated.Text>
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
                          value = { this.state.selected.age }
                          onValueChange={ (value) => this.setState({ selected: {...this.state.selected, age: value } }) }
                  />
                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.filters.priceLevel && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Offer', stateName: 'priceLevel'})}
                <View style={ styles.touchBlock }>
                  {
                    prices.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onCheckPrice(item.level) }>
                        <View style={ [styles.viewTwoText, item.level === this.state.selected.priceLevel ? styles.priceButtonChecked : styles.priceButton] }>
                          <Text style={ [styles.textCellTitle, item.level === this.state.selected.priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.item }</Text>
                          <Text style={ [styles.textSubTitle, item.level === this.state.selected.priceLevel ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item.price }</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  }

                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.filters.rating && styles.deactivatedContainer]}>
                <View style={ styles.starContainer }>
                  {this.generateFilterCheckbox({title: 'Reviews', stateName: 'rating'})}
                  <StarRating
                    color='#fff'
                    isActive={ true }
                    rateMax={ 5 }
                    isHalfStarEnabled={ false }
                    onStarPress={ (rating) => this.onRating(rating) }
                    rate={ this.state.selected.rating }
                    size={ 30 }
                    rating={this.state.selected.rating}
                  />
                </View>
              </View>
              <View style={[ styles.cellContainer,  !this.state.filters.clientType && styles.deactivatedContainer]}>
                {this.generateFilterCheckbox({title: 'Client Type', stateName: 'clientType'})}
                <View style={ [styles.touchBlock] }>
                  {
                    labels.clientType.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onLocation(item) }>
                        <View style={ [styles.viewTwoTextPadding, item === this.state.selected.clientType ? styles.priceButtonChecked : styles.priceButton] }>
                          <Text style={ [styles.textSubTitle, item === this.state.selected.clientType ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item }</Text>
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
    marginRight: -8,
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