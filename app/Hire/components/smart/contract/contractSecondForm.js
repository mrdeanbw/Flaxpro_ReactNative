import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import R from 'ramda';
import Moment from 'moment';
import RadioButton from '../../../../Components/radioButton';

const background = require('../../../../Assets/images/background.png');
import * as CommonConstant from '../../../../Components/commonConstant';
const width = CommonConstant.WIDTH_SCREEN;
const height = CommonConstant.HEIHT_SCREEN;
const fontStyles = CommonConstant.FONT_STYLES;
const professionalConst = CommonConstant.user_professional;


export default class ContractSecondForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfSessions: props.hire.numberOfSessions,
      numberOfPeople: props.hire.numberOfPeople,
      selectedDates: props.hire.selectedDates,
      availableDates: props.hire.schedule,
      selectedDay: props.hire.selectedDates.length ? R.find(R.propEq('date', props.hire.selectedDates[0]))(props.hire.schedule) : { schedules: [] },
      selectedTimes: props.hire.selectedTimes,
      offerPrice: props.hire.offerPrice,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      numberOfSessions: newProps.hire.numberOfSessions,
      numberOfPeople: newProps.hire.numberOfPeople,
      selectedDates: newProps.hire.selectedDates,
      availableDates: newProps.hire.schedule,
      selectedTimes: newProps.hire.selectedTimes,
      offerPrice: newProps.hire.offerPrice,
    })
  }

  componentDidMount() {
    const {getFullProfile} = this.props;
    getFullProfile(this.props.user);
  }

  onNext () {
    if (this.state.selectedTimes.length !== this.state.numberOfSessions) {
      return Alert.alert('Please select more dates/times or change number of sessions')
    }
    const { changeContractForm } = this.props;
    const nextForm = this.props.auth.user.role === professionalConst? 'summaryForm' : 'paymentForm';
    changeContractForm({...this.state, [nextForm]: true});
  };

  onBack() {
    const { changeContractForm } = this.props;
    changeContractForm({...this.state, firstForm: true})
  }

  onSelectDay(date) {
    this.setState({ selectedDay: R.find(R.propEq('date', date))(this.state.availableDates) });
  }

  onSelectTime(value) {
    const selectedTimes = [...this.state.selectedTimes];

    if(selectedTimes.includes(value)){
      selectedTimes.splice(selectedTimes.indexOf(value), 1)
    } else {
      selectedTimes.push(value)
    }
    this.setState({ selectedTimes });
  }
  
  render() {
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
            <Text style={ styles.textTitle }>CUSTOM OFFER</Text>
            <View style={ styles.navButtonWrapper } />

          </View>
          <View style={ styles.mainContainer }>
            <View style={ [styles.borderBottom, styles.topContainer] }>
              <View style={ [ styles.rowContainer, customStyle.selectedDayCircle, styles.dropdownWrapper, styles.flex08] }>
                <Text style={ [fontStyles, styles.textDescription, styles.whiteText] }>
                  {this.state.selectedTimes.length} dates selected out of {this.state.numberOfSessions}
                </Text>
              </View>
              <View style={ [ styles.rowContainer, styles.dropdownWrapper] }>
                <ScrollView horizontal={ true }
                            showsHorizontalScrollIndicator={ false }
                            ref={(ref) => {this.datesScroll = ref}}>
                  {
                    this.state.selectedDates.map((day, index) => (
                      <TouchableOpacity
                        onPress={ () => this.onSelectDay(day) }
                        key={index}
                      >
                        <View style={ [styles.sectionTitleContainer, this.state.selectedDay.date === day ? customStyle.selectedDayCircle : {}] }>
                          <Text style={ [styles.textSectionTitle, this.state.selectedDay.date === day && styles.whiteText] }>{Moment(new Date(day)).format('ddd')}</Text>
                          <Text style={ [styles.textSectionTitle, this.state.selectedDay.date === day && styles.whiteText] }>{Moment(new Date(day)).format('D')}</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </ScrollView>
              </View>
            </View>

            <View style={ [styles.middleContainer, styles.columnContainer] }>
              {
                this.state.selectedDay.schedules.length>0 &&
                <View style={ styles.navButtonWrapper }>
                  <Text style={ [styles.textSectionTitle, styles.textBlue] }>Select Available Hour</Text>
                </View>
              }
              {
                this.state.selectedDay.schedules.map((session) => (
                  <View style={ [styles.navButtonWrapper] } key={session._id}>
                    <RadioButton
                      label=""
                      color="#19b8ff"
                      style={{padding: 0, paddingHorizontal: 5}}
                      iconStyle={ styles.iconButton }
                      checked={ this.state.selectedTimes.includes(session) }
                      onPress={ () => this.onSelectTime(session) }
                    />
                    <Text style={ styles.textSectionTitle }>{Moment(session.from).format('hh:mm A')} to {Moment(session.to).format('hh:mm A')}</Text>
                  </View>
                ))
              }

            </View>
            <View style={ styles.bottomContainer }>

            </View>
            <View style={ styles.bottomButtonWrapper }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onNext() }>
                <View style={ styles.saveButton }>
                  <Text style={ styles.whiteText }>NEXT</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
  textSectionTitle: {
    fontFamily: 'Open Sans',
    color: '#6b6b6b',
    fontSize: 12,
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
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  flex08: {
    flex:0.8,
  },
  whiteText: {
    color: '#fff'
  },
  iconButton: {
    padding: 0,
    fontSize: 20,
    marginRight: 5,
    marginLeft: -5,
  },
  navBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitleContainer: {
    flexDirection: 'column',
    marginVertical: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    height:50,
    width:50,
    borderRadius: 25,
  },
  navButtonWrapper: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  columnContainer: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 5,
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
  textBlue: {
    color: '#10c7f9',
  },
  padding10: {
    paddingRight: 10,
    paddingLeft: 10,
  }

});