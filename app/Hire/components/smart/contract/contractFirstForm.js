import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Slider,
  Alert,
  ScrollView
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

export default class ContractFirstForm extends Component {
  static propTypes = {
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: false,
  };

  constructor(props) {
    super(props);
    const authUser = props.auth.user;
    const isProf = authUser.role === professionalConst;
    this.state = {
      numberOfSessions: props.hire.numberOfSessions,
      numberOfPeople: props.hire.numberOfPeople,
      selectedDates: props.hire.selectedDates,
      availableDates: props.hire.schedule,
      selectedTimes: props.hire.selectedTimes,
      offerPrice: (isProf? authUser.price: props.user.price).toString(),
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      numberOfSessions: newProps.hire.numberOfSessions,
      numberOfPeople: newProps.hire.numberOfPeople,
      selectedDates: newProps.hire.selectedDates,
      availableDates: newProps.hire.schedule,
      selectedTimes: newProps.hire.selectedTimes,
    })

  }

  onNext () {
    const { changeContractForm } = this.props;
    changeContractForm({...this.state, secondForm: true})
  }
  onBack() {
    Actions.pop();
  }
  onChangePeople(value) {
    const numberOfPeople = this.state.numberOfPeople + value;
    if (numberOfPeople < 1) return;
    this.setState({numberOfPeople});
  }
  onSelectDate(date) {
    const day = Moment(date).format('ddd, DD MMM YYYY');
    if(!R.find(R.propEq('date', day))(this.state.availableDates)) return;
    const selectedDates = [...this.state.selectedDates];
    if(selectedDates.includes(day)){
      selectedDates.splice(selectedDates.indexOf(day), 1)
    } else {
      selectedDates.push(day)
    }
    this.setState({ selectedDates });
  }

  onchangeOfferPrice(value) {
    this.setState({offerPrice: value})
  }

  render() {
    const {auth, user, hire: {schedule}, editable } = this.props;
    const isProf = auth.user.role === professionalConst;
    const price = (isProf? auth.user.price: user.price).toString();

    let hourlyRate = editable? this.state.offerPrice: price;
    let totalPayment = this.state.numberOfSessions * this.state.numberOfPeople * hourlyRate;

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
            <Text style={ styles.textTitle }>CONTRACT</Text>
            <View style={ styles.navButtonWrapper } />

          </View>
          <ScrollView style={ styles.mainContainer }>
            <View style={ [styles.borderBottom, styles.topContainer] }>
              <View style={ styles.rowContainer }>
                <Text style={ [fontStyles, styles.textDescription] }>Total number of sessions</Text>
                <Text style={ styles.textHours }>{ this.state.numberOfSessions } sessions</Text>
              </View>
              <View style={ styles.rowContainer }>
                <Slider style={ styles.slider }
                  minimumTrackTintColor={ '#10c7fa' }
                  maximumTrackTintColor={ '#a1a1a1' }
                  minimumValue={ 0 }
                  maximumValue={ 30 }
                  step={ 1 }
                  value = { this.state.numberOfSessions }
                  onValueChange={ (value) => this.setState({ numberOfSessions: value }) }
                />
              </View>
            </View>

            <View style={ styles.middleContainer }>

              <View style={ [styles.borderBottom, styles.rowContainer] }>
                <Text style={ [fontStyles, styles.textDescription] }>Hourly Rate</Text>
                <View style={ styles.valueWrapper }>
                  {editable?
                    <View style={ styles.offerPriceContainer }>
                      <Text style={ styles.textValue }>$</Text>
                      <TextInput
                        style={styles.inputText}
                        value={ this.state.offerPrice }
                        onChangeText={this.onchangeOfferPrice.bind(this)}
                        keyboardType="numeric"
                      />
                    </View>
                    :
                    <Text style={ styles.textValue }>$ { hourlyRate }</Text>
                  }
                </View>
              </View>

              <View style={ [styles.borderBottom, styles.rowContainer] }>
                <Text style={ [fontStyles, styles.textDescription] }>Number of People</Text>

                <View style={ [styles.valueWrapper, styles.row] }>
                  <TouchableOpacity
                    onPress={ () => this.onChangePeople(-1) }
                  >
                    <EntypoIcons
                      name="circle-with-minus"  size={ 25 }
                      color={CommonConstant.APP_COLOR}
                      on
                    />
                  </TouchableOpacity>
                  <Text style={ [styles.textValue, styles.padding10] }>{ this.state.numberOfPeople }</Text>
                  <TouchableOpacity
                    onPress={ () => this.onChangePeople(1) }
                  >
                    <EntypoIcons
                      name="circle-with-plus"  size={ 25 }
                      color={CommonConstant.APP_COLOR}
                    />
                  </TouchableOpacity>
                </View>

              </View>

              <View style={ [styles.borderBottom, styles.rowContainer] }>
                <Text style={ [fontStyles, styles.textDescription] }>Total Payment</Text>
                <View style={ styles.valueWrapper }>
                  <Text style={ styles.textValue }>$ { totalPayment }</Text>
                </View>
              </View>

            </View>
            <View style={ styles.bottomContainer }>
              <Calendar
                customStyle={ customStyle }
                dayHeadings={ ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ] }
                eventDates={ R.pluck('date')(schedule) }
                selectedDate={ this.state.selectedDates }
                nextButtonText={ '>' }
                prevButtonText={'<'}
                showControls={ true }
                onlyEvent={ true }
                showEventIndicators={ true }
                isSelectableDay={ true }
                onDateSelect={ (date) => this.onSelectDate(date) }
              />
              <View style={ [ styles.rowContainer, customStyle.selectedDayCircle, styles.dropdownWrapper] }>
                <Text style={ [fontStyles, styles.textDescription, styles.whiteText] }>
                  {this.state.selectedDates.length} dates selected out of {this.state.numberOfSessions}
                </Text>
              </View>
            </View>
            <View style={ styles.bottomButtonWrapper }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onNext() }>
                <View style={ styles.saveButton }>
                  <Text style={ styles.whiteText }>NEXT</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Image>
      </View>
    );
  }
}
const customStyle = {
  title: {
    color: '#2e343b',
  },
  calendarContainer: {
    backgroundColor: '#fff',
  },
  calendarControls: {
    backgroundColor: '#f3f3f3',
  },
  controlButtonText: {
    color: '#8e9296',
  },
  currentDayCircle: {
    backgroundColor: '#efefef',
  },
  currentDayText: {
    color: '#000',
  },
  day: {
    color: '#8d99a6',
  },
  dayHeading: {
    color: '#2e343b',
  },
  hasEventCircle: {
    backgroundColor: '#efefef',
    borderWidth: 1,
    borderColor: '#efefef',
  },
  hasEventText: {
    color: '#8d99a6',
  },
  selectedDayCircle: {
    backgroundColor: '#45c7f1',
    borderWidth: 1,
    borderColor: '#34aadc',
  },
  selectedDayText: {
    color: '#fff',
  },
  weekendDayText: {
    color: '#8d99a6',
  },
  weekendHeading: {
    color: '#2e343b',
  },
  weekRow: {
    backgroundColor: '#fff',
  },
};

const styles = StyleSheet.create({
  inputText : {
    flex: 1,
    fontSize: 18,
    color: '#4d4d4d',
    textAlign: "right"
  },
  offerPriceContainer : {
    width: width * .3,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#19b8ff",
    paddingBottom: 2,
    marginTop: 2
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
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 52
  },
  middleContainer: {
    flex: 1.5,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    flex: 2.5,
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

    width: width * 0.3,
    alignItems: 'flex-end',
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
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textBidDescription: {
    color: '#4d4d4d',
    fontSize: 12,
  },
  textBidValue: {
    color: '#10c7f9',
    fontSize: 32,
  },
  padding10: {
    paddingRight: 10,
    paddingLeft: 10,
  }

});