import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import EntypoIcons from 'react-native-vector-icons/Entypo';
import * as CommonConstant from '../../../../Components/commonConstant';
import Moment from 'moment';
import { SUMMARY_FORM_TYPES } from '../../../constants';

const background = require('../../../../Assets/images/background.png');
const width = CommonConstant.WIDTH_SCREEN;
const height = CommonConstant.HEIHT_SCREEN;
const fontStyles = CommonConstant.FONT_STYLES;
const professionalConst = CommonConstant.user_professional;

export default class SummaryForm extends Component {
  constructor(props) {
    super(props);
    const isProf = props.role === CommonConstant.professionalConst;
    let paymentMethod = this.getPaymentMethod(props.payment, isProf);
    this.state = {
      numberOfSessions: props.numberOfSessions,
      numberOfPeople: props.numberOfPeople,
      selectedTimes: props.selectedTimes,
      payment: props.payment,
      buttonDisabled: false,
      paymentMethod,
    };
  };

  getPaymentMethod(payment, isProf) {

    if (!payment) { return null; }

    return !isProf ? 
        (typeof(payment) === 'string' ? 
          payment 
          : 
          'Card  ...' + payment.last4) 
        :
        null;
  }

  render() {
    const isProf = this.props.role === professionalConst,
          { payment, paymentMethod } = this.state;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.navBarContainer }>
            <TouchableOpacity
              onPress={ () => this.props.onBack() }
              style={ styles.navButtonWrapper }
            >
              <EntypoIcons
                name="chevron-thin-left"
                size={ 25 }
                color="#fff"
              />
            </TouchableOpacity>
            <Text style={ styles.textTitle }>PAYMENT SUMMARY</Text>
            <View style={ styles.navButtonWrapper } />

          </View>
          <View style={ styles.mainContainer }>
            <View style={ [styles.borderBottom, styles.rowContainer, styles.topContainer] }>
              <Text style={ [fontStyles, styles.textDescription] }>Total number of sessions</Text>
              <Text style={ styles.textHours }>{ this.state.numberOfSessions } sessions</Text>
            </View>

            <View style={ styles.middleContainer }>

              <View style={ [styles.borderBottom, styles.rowContainer] }>
                <Text style={ [fontStyles, styles.textDescription] }>Hourly Rate</Text>
                <View style={ styles.valueWrapper }>
                  <Text style={ styles.textBidDescription }>$ {this.props.price}/Hr</Text>
                </View>
              </View>

              <View style={ [styles.borderBottom, styles.rowContainer] }>
                <Text style={ [fontStyles, styles.textDescription] }>Total Hourly Rate</Text>
                <View style={ styles.valueWrapper }>
                  <Text style={ styles.textBidDescription }>$ { this.state.numberOfSessions * this.state.numberOfPeople * (this.props.price) }/Hr</Text>
                </View>
              </View>

              <View style={ [styles.borderBottom, styles.rowContainer] }>
                <Text style={ [fontStyles, styles.textDescription] }>Location</Text>
                <View style={ [styles.valueWrapper, styles.width06] }>
                  <Text style={ [styles.textBidDescription] }>{ this.props.userLocation.originalAddress }</Text>
                </View>
              </View>

              <View style={ [styles.borderBottom, styles.rowContainer] }>
                <Text style={ [fontStyles, styles.textDescription] }>Number of People</Text>
                <View style={ [styles.valueWrapper] }>
                  <Text style={ [styles.textBidDescription] }>{ this.state.numberOfPeople }</Text>
                </View>
              </View>

              {
                getPaymentMethodBlock(paymentMethod, isProf)
              }

            </View>
            <View style={ styles.bottomContainer }>
              <View style={ [styles.borderBottom,styles.rowContainer, styles.flex02] }>
                <Text style={ [fontStyles, styles.textDescription] }>Date and Time</Text>
              </View>
              <ScrollView>
              {
                this.state.selectedTimes.map((e) => (
                  <View style={ [styles.borderBottom, styles.rowContainer, styles.whiteRow, styles.dropdownWrapper, styles.flexStart] } key={e._id}>
                    <Text style={ [fontStyles, styles.textBidTitle] }>{ Moment(e.from).format('ddd, DD MMM YYYY')}</Text>
                    <View style={ styles.separator}>
                      <Text style={ [styles.textBidDescription, styles.padding10] }>{ Moment(e.from).format('hh:mm A')} To {Moment(e.to).format('hh:mm A')}</Text>
                    </View>
                  </View>
                ))
              }
              </ScrollView>
              { chooseButtons(this.props, this.state, this.setState.bind(this)) }
            </View>

          </View>
        </Image>
      </View>
    )
  };
};

const button = (buttonText, buttonDisabled, callback) => {
  return (
          <View style={ styles.bottomButtonWrapper }>
            <TouchableOpacity 
              activeOpacity={ .5 } 
              onPress={ callback }
              disabled={ buttonDisabled }
            >
              <View style={ styles.saveButton }>
                <Text style={ styles.whiteText }>{buttonText.toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
};

const chooseButtons = (props, state, setState) => {
  const buttonDisabled = props.status ? props.status !== 'Pending' : false;
  switch(props.formType) {
    case SUMMARY_FORM_TYPES.ACCEPT: {
      const isProf = props.role === professionalConst,
            shouldDisplay = !buttonDisabled;
      let callbackAccept, callbackDecline;
      if (!isProf && !state.paymentMethod) {
        callbackAccept = () => {
          Actions.Payment({
            onBack: () => Actions.pop(),
            onSelected: (paymentMethod) => {
              Actions.pop();
              setState({paymentMethod: paymentMethod})
            },
          });
        }
      } else {
        callbackAccept = () => props.onReply(true, state.paymentMethod);
        callbackDecline = () => props.onReply(false, state.paymentMethod);
      }
      return shouldDisplay ? (
              <View style={ styles.bottomButtonWrapper }>
                { button('accept', buttonDisabled, callbackAccept) }
                { button('decline', buttonDisabled, callbackDecline) }
              </View>
            )
            :
            null;
    }
    case SUMMARY_FORM_TYPES.VIEW: {
      return null;
    }
    case SUMMARY_FORM_TYPES.CREATE: {
      callback = props.onNext(props.payment, propsbuttonDisabled.price, props.userLocation);
      return (<View>
                { button('confirm offer', buttonDisabled, callback) }
            </View>)
    }
    default: {
      const callback = () => props.onNext(props.payment, props.price, props.userLocation);
      return (<View>
                { button('confirm offer', buttonDisabled, callback) }
            </View>)
    }
  };
};

const getPaymentMethodBlock = (paymentMethod, isProf) => {
    if (!isProf && paymentMethod) {
    return (
        <View style={ [styles.borderBottom, styles.rowContainer] }>
          <Text style={ [fontStyles, styles.textDescription] }>Payment Method</Text>
          <View style={ [styles.valueWrapper] }>
            <Text style={ [styles.textBidDescription] }>{ paymentMethod }</Text>
          </View>
      </View>
    );
  } 
  return null;
}

const styles = StyleSheet.create({
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
  whiteRow: {
    backgroundColor: '#fff',
  },
  separator: {
    marginVertical:2,
    marginLeft:1,
    borderColor: '#d9d9d9',
    borderLeftWidth: 1,
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
  textCenter: {
    textAlign: 'center',
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
  topContainer: {
    flex: 0.5,
  },
  flex02: {
    flex: 0.2,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 1.7,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    flex: 2,
    justifyContent:'flex-start',
  },
  textDescription: {
    color: '#6d6d6d',
    fontSize: 16,
  },
  textHours: {
    color: '#4d4d4d',
    fontSize: 24,
  },
  slider: {
    flex: 1,
    alignItems: 'center',
  },
  textValue: {
    color: '#4d4d4d',
    fontSize: 18,
    paddingRight: 5,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
  },
  valueWrapper: {
    alignItems: 'flex-end',
  },
  width06: {
    width: width * 0.6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dropdownWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownStyle: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonWrapper: {
    marginHorizontal: 0,
    justifyContent: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#19b8ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    height: 40,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  locationBorderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    borderTopWidth: 1,
    borderTopColor: '#d7d7d7',
  },
  bidBorderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    borderTopWidth: 1,
    borderTopColor: '#d7d7d7',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  textBidTitle: {
    color: '#6d6d6d',
    fontSize: 14,
    paddingVertical: 10,
    paddingRight: 10,
  },
  textBidDescription: {
    fontWeight: 'bold',
    color: '#4d4d4d',
    fontSize: 14,
  },
  textBidValue: {
    color: '#10c7f9',
    fontSize: 32,
  },
  padding10: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  flexStart: {
    justifyContent: 'flex-start'
  },
});