import React, { Component } from 'react';
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

const { width, height } = Dimensions.get('window');
const background = require('../../../Assets/images/background.png');

const duration = ['1 Months', '2 Months', '3 Months'];

export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfSessions: 3,
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'PaymentRequest') {

    } else if (newProps.status == 'PaymentSuccess') {

    } else if (newProps.status == 'PaymentError') {

    }
  }

  onClose () {
    const { user } = this.props;
    Actions.Main({ user_mode: user.role });
  }

  onSelectPaymentMethod(key) {
    Alert.alert('onSelectPaymentMethod');
  }

  onAddPaymentMethod() {
    const { changePaymentForm } = this.props;
    changePaymentForm({...this.state, addCardForm: true})
  }

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.navBarContainer }>
            <TouchableOpacity
              onPress={ () => this.onClose() }
              style={ styles.closeButtonWrapper }
            >
              <EvilIcons
                name="close"  size={ 35 }
                color="#fff"
              />
            </TouchableOpacity>
            <Text style={ styles.textTitle }>PAYMENT</Text>
            <View style={ styles.closeButtonWrapper } />
          </View>
          <View style={ styles.mainContainer }>
            <ScrollView>
              <View style={ styles.sectionContainer }>
                <Text style={ styles.textSectionTitle }>Payment Methods</Text>
              </View>
              <TouchableOpacity
                onPress={ () => this.onSelectPaymentMethod(0) }
                style={ styles.cellContainer }
              >
                <Text style={ styles.textCellTitle }>Payment Card</Text>
                <EntypoIcons
                  name="chevron-thin-right"  size={ 15 }
                  color="#707070"
                />
              </TouchableOpacity>
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
                onPress={ () => this.onAddPaymentMethod() }
                style={ styles.cellContainer }
              >
                <Text style={ styles.textCellAddValue }>Add Promo/Gift Code</Text>
              </TouchableOpacity>
            </ScrollView>
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