import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FullScreenLoader from '../../../Components/fullScreenLoader';

const { width, height } = Dimensions.get('window');
const background = require('../../../Assets/images/background.png');
const CreditCard = require('../../../Assets/images/card.png');

const duration = ['1 Months', '2 Months', '3 Months'];

export default class Payment extends Component {
  static propTypes = {
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: false,
  };

  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const {getCards} = this.props;
    getCards();
  }


  componentWillReceiveProps(newProps) {
    if(newProps.hire.error) {
      Alert.alert(newProps.hire.error)
    }
  }

  onBack () {
    if (this.props.onBack) {
      return this.props.onBack();
    }

    const { changeContractForm } = this.props;
    this.props.editable ?
      Actions.pop()
      :
      changeContractForm({ ...this.props.hire, ...{secondForm: true, paymentForm: false} });
  }

  onSelectPaymentMethod(payment) {
    if (this.props.onSelected) {
      return this.props.onSelected(payment);
    }
    
    if (!this.props.editable) {
      const { changeContractForm } = this.props;
      changeContractForm({ ...this.props.hire, ...{summaryForm: true, paymentForm: false, payment} });
    } else {
      Alert.alert('onSelectPaymentMethod');
    }
  }

  onAddCode() {
    Alert.alert('Coming soon');
  }

  onAddPaymentMethod() {
    const { changePaymentForm } = this.props;
    changePaymentForm({addCardForm: true})
  }

  render() {
    const { editable } = this.props;
    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.navBarContainer }>
            <TouchableOpacity
              onPress={ () => this.onBack() }
              style={ styles.closeButtonWrapper }
            >
              <EntypoIcons name="chevron-thin-left" size={ 35 } color="#fff" />
            </TouchableOpacity>
            <Text style={ styles.textTitle }>PAYMENT</Text>
            <View style={ styles.closeButtonWrapper } />
          </View>
          <View style={ styles.mainContainer }>
            <ScrollView>
              <View style={ styles.sectionContainer }>
                <Text style={ styles.textSectionTitle }>{!editable&&"Select "}Payment Methods</Text>
              </View>
              {this.props.hire.creditCardsList.map( (creditCard, key) => {
                return (
                  <View key={key}>
                    <TouchableOpacity
                      onPress={ () => this.onSelectPaymentMethod(creditCard) }
                      style={ styles.cellContainer }
                    >
                      <View style={styles.creditCard}>
                        <Image source={CreditCard} style={styles.creditCardImg} resizeMode="contain"/>
                        <Text style={ styles.textCellTitle }>. . . {creditCard.last4}</Text>
                      </View>
                      <EntypoIcons
                        name="chevron-thin-right"  size={ 15 }
                        color="#707070"
                      />
                    </TouchableOpacity>
                  </View>
                )
              })}

              {(editable || !this.props.hire.creditCardsList.length) &&
                <View>
                  <TouchableOpacity
                    onPress={ () => this.onAddPaymentMethod() }
                    style={ styles.cellContainer }
                  >
                    <Text style={ styles.textCellAddValue }>Add Payment Method</Text>
                  </TouchableOpacity>

                  <View style={ styles.sectionContainer }>
                    <Text style={ styles.textSectionTitle }>Promotions</Text>
                  </View>
                  <TouchableOpacity
                    onPress={ () => this.onAddCode() }
                    style={ styles.cellContainer }
                  >
                    <Text style={ styles.textCellAddValue }>Add Promo/Gift Code</Text>
                  </TouchableOpacity>
                </View>
              }
              {!editable &&
                <TouchableOpacity
                  onPress={ () => this.onSelectPaymentMethod('Cash') }
                  style={ styles.cellContainer }
                >
                  <View style={styles.creditCard}>
                    <IonIcons name="ios-cash-outline" style={styles.cashIcon} color="#707070"/>
                    <Text style={ styles.textCellTitle }>Cash</Text>
                  </View>
                  <EntypoIcons name="chevron-thin-right" size={ 15 } color="#707070" />
                </TouchableOpacity>
              }
            </ScrollView>
          </View>
          { this.props.hire.loading && <FullScreenLoader/>}
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cashIcon: {
    height: 17,
    width: 22,
    fontSize: 21,
    marginHorizontal: 12,
  },
  creditCard: {
    flexDirection: 'row',
  },
  creditCardImg: {
    height: 17,
    width: 22,
    marginHorizontal: 12
  },
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  navBarContainer: {
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
    fontSize: 22,
    paddingVertical: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  sectionContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cellContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  textSectionTitle: {
    color: '#6b6b6b',
    fontSize: 14,
  },
  textCellTitle: {
    color: '#1e1e1e',
    fontSize: 14,
  },
  textCellValue: {
    color: '#707070',
    fontSize: 14,
  },
  textCellAddValue: {
    color: '#10c7f9',
    fontSize: 14,
  },

});