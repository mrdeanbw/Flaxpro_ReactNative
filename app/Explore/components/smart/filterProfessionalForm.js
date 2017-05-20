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
import { RadioButtons } from 'react-native-radio-buttons'
import RadioButton from './radioButton';
import ModalDropdown from 'react-native-modal-dropdown';
import StarRating from 'react-native-stars-rating';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');

const labelSex = ['Male', 'Female'];
const labelClientType = ['New', 'Regular'];


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
      priceLevel : prices[0].level,
      selectedClientType: labelClientType[0],
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

  onDone () {
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

  onAffiliation(value) {
    this.setState({ selectedAffiliation: value });
  }


  onLocation(value) {
    this.setState({ selectedLocation: value });
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
                          trackStyle= {{backgroundColor: 'rgba(255, 255, 255, 0.5);', marginTop: -4}}
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
                <Text style={ [styles.textCellTitle, styles.labelLine] }>Offer</Text>
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
                <View style={ styles.starContainer }>
                  <Text style={ [styles.textCellTitle, styles.labelLine ]}>Reviews</Text>
                  <StarRating
                    color='#fff'
                    isActive={ true }
                    rateMax={ 5 }
                    isHalfStarEnabled={ false }
                    onStarPress={ (rating) => console.log(rating) }
                    rate={ 5 }
                    size={ 30 }
                    rating={this.state.selectedReview}
                  />
                </View>
              </View>
              <View style={ styles.cellContainer }>
                <Text style={ [styles.textCellTitle, styles.labelLine] }>Client Type</Text>
                <View style={ [styles.touchBlock] }>
                  {
                    labelClientType.map((item, index) =>(
                      <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.onLocation(item) }>
                        <View style={ [styles.viewTwoTextPadding, item === this.state.selectedClientType ? styles.priceButtonChecked : styles.priceButton] }>
                          <Text style={ [styles.textSubTitle, item === this.state.selectedClientType ? styles.priceButtonTextChecked : styles.priceButtonText] }>{ item }</Text>
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

  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width : width * 0.25,
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