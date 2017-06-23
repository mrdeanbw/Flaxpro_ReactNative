import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import VMasker from 'vanilla-masker'

import EntypoIcons from 'react-native-vector-icons/Entypo';
import FullScreenLoader from '../../../Components/fullScreenLoader';

const background = require('../../../Assets/images/background.png');
const creditCards = require('../../../Assets/images/credit_cards_logo.png');
import * as CommonConstant from '../../../Components/commonConstant';
const width = CommonConstant.WIDTH_SCREEN;
const height = CommonConstant.HEIHT_SCREEN;
const fontStyles = CommonConstant.FONT_STYLES;

export default class AddCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber : '',
      cardMonth : '',
      cardYear  : '',
      cardCvc   : '',
      loading: false,
      isAmericanExpress: false
    };
  }

  componentWillReceiveProps(newProps) {
    const { changePaymentForm } = this.props;
    if (!newProps.hire.loading) {
      !!newProps.hire.error ? Alert.alert(newProps.hire.error): changePaymentForm({addCardForm: false})
    }
  }

  onBack() {
    const { changePaymentForm } = this.props;
    changePaymentForm({addCardForm: false})
  }

  onCardChange (value){
    let mask = "9999 9999 9999 9999";
    if (value.length >= 2 && (value.slice(0, 2) === '34' || value.slice(0, 2) === '37')) {
      mask = "9999 999999 999999";
      this.setState({isAmericanExpress: true})
    } else {
      this.setState({isAmericanExpress: false})
    }
    let maskedValue = VMasker.toPattern(value, mask);
    this.setState({cardNumber: maskedValue});
  }
  onCardYearChange (value){
    this.setState({cardYear: value});
  }
  onCardMonthChange (value){
    this.setState({cardMonth: value});
  }
  onCardCvcChange (value){
    this.setState({cardCvc: value});
  }

  addCard () {
    let data = {
      number: this.state.cardNumber.replace(/\s/g , ''),
      expMonth: this.state.cardMonth,
      expYear: this.state.cardYear,
      cvc: this.state.cardCvc,
    };
    this.props.addCard(data);
  }

  render() {
    let cardNumberLength = this.state.isAmericanExpress? 17: 19;
    let valid = (this.state.cardNumber.length===cardNumberLength && this.state.cardMonth.length===2 &&
    this.state.cardYear.length===2 && this.state.cardCvc.length>2);
    return (
      <View style={ styles.container } pointerEvents={this.props.hire.loading ? "none" : "auto"}>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.navBarContainer }>
            <TouchableOpacity
              onPress={ () => this.onBack() }
              style={ styles.navButtonWrapper }
            >
              <EntypoIcons
                name="chevron-thin-left"  size={ 25 }
                color="#fff"
              />
            </TouchableOpacity>
            <Text style={ styles.textTitle }>ADD CARD</Text>
            <View style={ styles.navButtonWrapper } />
          </View>
          <View style={styles.mainContainer}>
            <ScrollView>
              <View style={ styles.acceptCardContainer }>
                <Text style={ styles.acceptText }>We Accept</Text>
                <Image source={creditCards} style={styles.creditCards} resizeMode="contain"/>
              </View>
              <View style={ styles.cellContainer }>
                <View>
                  <Text  style={styles.inputTextTitle}>Card Number</Text>
                  <View  style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputText}
                      value={ this.state.cardNumber }
                      onChangeText={this.onCardChange.bind(this)}
                      maxLength={ cardNumberLength }
                      placeholder={'**** **** **** ****'}
                      placeholderTextColor={"#e3e3e3"}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.inputTextTitle}>Expiration Date</Text>
                  <View style={{flex:1,flexDirection:"row"}}>
                    <View  style={[styles.inputContainer, styles.halfFlex]}>
                      <TextInput
                        style={styles.inputText}
                        value={ this.state.cardMonth }
                        onChangeText={this.onCardMonthChange.bind(this)}
                        maxLength={ 2 }
                        placeholder={'MM'}
                        placeholderTextColor={"#e3e3e3"}
                        keyboardType="numeric"
                      />
                    </View>
                    <View  style={[styles.inputContainer, styles.halfFlex]}>
                      <TextInput
                        style={styles.inputText}
                        value={ this.state.cardYear }
                        onChangeText={this.onCardYearChange.bind(this)}
                        maxLength={ 2 }
                        placeholder={'YY'}
                        placeholderTextColor={"#e3e3e3"}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.inputTextTitle}>CVV</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputText}
                      value={ this.state.cardCvc }
                      onChangeText={this.onCardCvcChange.bind(this)}
                      maxLength={ 4 }
                      placeholder={'****'}
                      placeholderTextColor={"#e3e3e3"}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
            <TouchableOpacity disabled={!valid} activeOpacity={ .5 } onPress={ () => this.addCard() }>
              <View style={[styles.addBtn, !valid && styles.disabled]}>
                <Text style={styles.addBtnText}>ADD CARD</Text>
              </View>
            </TouchableOpacity>

          </View>
        </Image>
        { this.props.hire.loading && <FullScreenLoader/>}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  creditCards: {
    height: 23,
    width: 104,
  },
  inputTextTitle : {
    color: '#19b8ff',
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  inputText : {
    marginVertical: 4,
    height: 15,
    color: '#6d6d6d',
  },
  cellContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    marginHorizontal: 20,
  },
  halfFlex: {
    flex: 0.5,
  },
  acceptCardContainer: {
    flexDirection:"row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    alignItems:'center',
    justifyContent:'center'
  },
  acceptText: {
    textAlign : 'center',
    color: '#6d6d6d',
    paddingHorizontal: 10,
  },
  addBtn:{
    height: 30,
    width: width*0.6,
    bottom: 30,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 13,
    backgroundColor: "#19b8ff",
    justifyContent: "center"
  },
  addBtnText:{
    textAlign:"center",
    color:"white"
  },
  disabled: {
    opacity: .5
  },
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  whiteText: {
    color: '#fff'
  },
  navBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',

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
    fontSize: 22,
    paddingVertical: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#efefef',
  },

});