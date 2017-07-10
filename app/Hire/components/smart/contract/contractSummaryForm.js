import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Slider,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import Calendar from '../../../../Profile/components/smart/calendar/Calendar';
import R from 'ramda';
import Moment from 'moment';

const background = require('../../../../Assets/images/background.png');
import * as CommonConstant from '../../../../Components/commonConstant';
const width = CommonConstant.WIDTH_SCREEN;
const height = CommonConstant.HEIHT_SCREEN;
const fontStyles = CommonConstant.FONT_STYLES;
const professionalConst = CommonConstant.user_professional;

export default class ContractSummaryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfSessions: props.hire.numberOfSessions,
      numberOfPeople: props.hire.numberOfPeople,
      selectedDates: props.hire.selectedDates,
      availableDates: props.hire.schedule,
      selectedTimes: props.hire.selectedTimes,
      payment: props.hire.payment,
    };
  }

  componentWillReceiveProps(newProps) {
    const { resetProps } = this.props;
    this.setState({
      numberOfSessions: newProps.hire.numberOfSessions,
      numberOfPeople: newProps.hire.numberOfPeople,
      selectedDates: newProps.hire.selectedDates,
      availableDates: newProps.hire.schedule,
      selectedTimes: newProps.hire.selectedTimes,
      payment: newProps.hire.payment,
    });
    if (!newProps.hire.loading) {
      if (!!newProps.hire.error) {
        Alert.alert(newProps.hire.error)
      } else {
        Actions.Main();
        Alert.alert("Successful", null,[{text: 'Ok', onPress: () => resetProps()}])
      }
    }

  }

  onNext (paymentMethod, price, userLocation) {
    const { createContract } = this.props;
    const data = {
      userTo: this.props.user.user,
      rate: price,
      numberOfPeople: this.state.numberOfPeople,
      sessions: this.state.selectedTimes,
      paymentMethod: paymentMethod && paymentMethod.slice(0, 4),
      location:  'professional',
    };
    createContract(data);
  }
  onBack() {
    const { changeContractForm } = this.props;
    changeContractForm({ ...this.props.hire, ...{summaryForm: false, paymentForm: true} });
  }

  render() {
    const { user, profile, hire: {offerPrice} } = this.props;
    const { payment } = this.state;
    const userLocation = profile.user.location;
    const price = offerPrice || user.price;

    const isProf = this.props.auth.user.role === professionalConst;
    const paymentMethod = !isProf? (typeof(payment) === 'string'? payment: 'Card  ...'+ payment.last4) : null;

    return (
      <View style={ styles.container }>
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
                  <Text style={ styles.textBidDescription }>$ {price}/Hr</Text>
                </View>
              </View>

              <View style={ [styles.borderBottom, styles.rowContainer] }>
                <Text style={ [fontStyles, styles.textDescription] }>Total Hourly Rate</Text>
                <View style={ styles.valueWrapper }>
                  <Text style={ styles.textBidDescription }>$ { this.state.numberOfSessions * this.state.numberOfPeople * (price) }/Hr</Text>
                </View>
              </View>

              <View style={ [styles.borderBottom, styles.rowContainer] }>
                <Text style={ [fontStyles, styles.textDescription] }>Location</Text>
                <View style={ [styles.valueWrapper, styles.width06] }>
                  <Text style={ [styles.textBidDescription] }>{ userLocation.originalAddress }</Text>
                </View>
              </View>

              <View style={ [styles.borderBottom, styles.rowContainer] }>
                <Text style={ [fontStyles, styles.textDescription] }>Number of People</Text>
                <View style={ [styles.valueWrapper] }>
                  <Text style={ [styles.textBidDescription] }>{ this.state.numberOfPeople }</Text>
                </View>
              </View>

              {!isProf &&
                <View style={ [styles.borderBottom, styles.rowContainer] }>
                  <Text style={ [fontStyles, styles.textDescription] }>Payment Method</Text>
                  <View style={ [styles.valueWrapper] }>
                    <Text style={ [styles.textBidDescription] }>{ paymentMethod }</Text>
                  </View>
                </View>
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

            </View>
            <View style={ styles.bottomButtonWrapper }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onNext(paymentMethod, price, userLocation) }>
                <View style={ styles.saveButton }>
                  <Text style={ styles.whiteText }>CONFIRM OFFER</Text>
                </View>
              </TouchableOpacity>
            </View>
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
    marginHorizontal: 30,
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