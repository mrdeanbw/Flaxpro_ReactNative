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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Calendar from '../../../../Profile/components/smart/calendar/Calendar';
import R from 'ramda';
import Moment from 'moment';
import SummaryForm from './summaryForm';

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
    const prevForm = this.props.auth.user.role === professionalConst? 'secondForm' : 'paymentForm';
    changeContractForm({ ...this.props.hire, [prevForm]: true });
  }

  render() {
    const { user, profile, hire: {offerPrice} } = this.props;
    const { payment } = this.state;
    const userLocation = profile.user.location;
    const price = offerPrice || user.price;

    return (
      <SummaryForm
        price={ price }
        payment={ payment }
        userLocation={ userLocation }
        numberOfSessions={ this.state.numberOfSessions }
        numberOfPeople={ this.state.numberOfPeople }
        selectedTimes={ this.state.selectedTimes }
        onBack={ this.onBack.bind(this) }
        onNext={ this.onNext.bind(this) }
        role={ this.props.auth.user.role }
      />
    );
  }
}