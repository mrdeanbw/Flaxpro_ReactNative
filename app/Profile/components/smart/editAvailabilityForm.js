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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';

import Calendar from './calendar/Calendar';
import * as profileActions from '../../actions';

import Ramda from 'ramda';
import Moment from 'moment';

import * as CommonConstant from '../../../Components/commonConstant';
const width = CommonConstant.WIDTH_SCREEN;
const height = CommonConstant.HEIHT_SCREEN;
const appColor = CommonConstant.APP_COLOR;

const background = require('../../../Assets/images/background.png');
const downArrow = require('../../../Assets/images/down_arrow.png');

const schedule = [
  {
    date: '2017-06-10',
    times: [
      {
        start: '08:00 AM',
        end: '10:00 AM',
      },
      {
        start: '08:10 AM',
        end: '10:10 AM',
      },
    ],
  },
  {
    date: '2017-06-15',
    times: [
      {
        start: '08:30 AM',
        end: '10:30 AM',
      },
      {
        start: '08:40 AM',
        end: '10:40 AM',
      },
    ],
  },
  {
    date: '2017-06-20',
    times: [
      {
        start: '08:20 AM',
        end: '10:20 AM',
      },
      {
        start: '08:30 AM',
        end: '10:30 AM',
      },
    ],
  },

];

class EditAvailabilityForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schedule: props.profile.schedule,
      selectedDate: [],
    };
  }

  componentWillMount(){
    this.props.getSchedule();
  }

  componentWillReceiveProps(nextProps) {
    const { profile } = nextProps;

    if (profile.error) {
      Alert.alert(profile.error);
    }
    if (!profile.loading){
      this.setState({
        schedule: profile.schedule,
        selectedDate: profile.schedule.length ?  [profile.schedule[0].date] : []
      })
    }

  }

  onAddTime() {
    let index = Ramda.findIndex(Ramda.propEq('date', this.state.selectedDate))(this.state.schedule);

    const { schedule } = this.state;

    if (index == -1 ) {
      const data = {
        date: this.state.selectedDate,
        times: [
          {
            start: '08:00 AM',
            end: '09:00 AM',
          }
        ]
      };
      schedule.push( data );
    } else {
      schedule[index].times.push({ start: '08:00 AM', end: '09:00 AM' });
    }

    this.setState({ schedule });
  }

  onSelectDate(date) {
    let day = Moment(date).format('ddd, DD MMM YYYY');
    const selectedDate = [...this.state.selectedDate];
    if(selectedDate.includes(day)){
      selectedDate.splice(selectedDate.indexOf(day), 1)
    } else {
      selectedDate.push(day)
    }
    this.setState({ selectedDate });
  }

  onChangeStartTime(time, entryIndex) {
    let index = Ramda.findIndex(Ramda.propEq('date', this.state.selectedDate))(this.state.schedule);

    const { schedule } = this.state;
    schedule[index].schedules[entryIndex].start = time;
    this.setState({ schedule });
  }

  onChangeEndTime(time, entryIndex) {
    let index = Ramda.findIndex(Ramda.propEq('date', this.state.selectedDate))(this.state.schedule);

    const { schedule } = this.state;
    schedule[index].schedules[entryIndex].end = time;
    this.setState({ schedule });
  }

  onSetSchedule() {
    Actions.pop();
  }

  onBack() {
    Actions.pop();
  }

  get getShowNavBar() {
    return (
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

        <Text style={ styles.textTitle }>EDIT AVAILABILITY</Text>

        <View style={ styles.navButtonWrapper }/>
      </View>
    );
  }

  showSchedule() {

    return this.state.schedule.filter((e)=>this.state.selectedDate.includes(e.date)).map((day, indexDays) => (
      <View key={indexDays}>
        {
          day.schedules.map((entry, index) => (
              <View key={ index } style={ styles.timeRowContainer }>
                <DatePicker
                  date={ entry.from }
                  mode="time"
                  format="hh:mm A"
                  confirmBtnText="Done"
                  cancelBtnText="Cancel"
                  is24Hour={ false }
                  iconSource={ downArrow }
                  style = { styles.calendarTime }
                  customStyles={{
                    dateInput: {
                      borderColor: "transparent",
                      alignItems: "center",
                      height: 25,
                    },
                    dateText: {
                      color: "#4d4d4d",
                      fontSize: 20,
                    },
                    dateIcon: {
                      width: 18,
                      height: 10,
                    },
                  }}
                  onDateChange={ (time) => this.onChangeStartTime(time, index) }
                />
                <Text style={ styles.textTimeTo }>To</Text>
                <DatePicker
                  date={ entry.to }
                  mode="time"
                  format="hh:mm A"
                  confirmBtnText="Done"
                  cancelBtnText="Cancel"
                  is24Hour={ false }
                  iconSource={ downArrow }
                  style = { styles.calendarTime }
                  customStyles={{
                    dateInput: {
                      borderColor: "transparent",
                      alignItems: "center",
                      height: 25,
                    },
                    dateText: {
                      color: "#4d4d4d",
                      fontSize: 20,
                    },
                    dateIcon: {
                      width: 18,
                      height: 10,
                    },
                  }}
                  onDateChange={ (time) => this.onChangeEndTime(time, index) }
                />
              </View>
            ))
        }
      </View>
    ))
  }

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          { this.getShowNavBar }
          <View style={ styles.contentContainer }>
            <View style={ styles.sectionTitleContainer }>
              <EvilIcons
                name="calendar"
                size={ 35 }
                color="#565656"
                style={{ paddingTop: 5 }}
              />
              <Text style={ styles.textSectionTitle }>Select Date</Text>
            </View>
            <Calendar
              customStyle={ customStyle }
              dayHeadings={ ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ] }
              eventDates={ Ramda.pluck('date')(this.state.schedule) }
              nextButtonText={ '>' }
              prevButtonText={'<'}
              showControls={ true }
              showEventIndicators={ true }
              isSelectableDay={ true }
              onDateSelect={ (date) => this.onSelectDate(date) }
            />
            <View style={ styles.sectionTitleContainer }>
              <Ionicons
                name="ios-time-outline"
                size={ 30 }
                color="#565656"
                style={[{ paddingTop:5 }, { paddingHorizontal: 5 }]}
              />
              <Text style={ styles.textSectionTitle }>Select Time</Text>
            </View>

            <View style={ styles.timeMainContainer }>
              {
                this.state.schedule.length > 0 ?
                  <ScrollView>
                    { this.showSchedule() }

                    <View style={ styles.buttonWrapper }>
                      <TouchableOpacity
                        onPress={ () => this.onAddTime() }
                      >
                        <Ionicons
                          name="ios-add-circle-outline"
                          size={ 40 }
                          color="#717171"
                          style={[{ paddingTop:5 }, { paddingHorizontal: 5 }]}
                        />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                  :
                  <Text style={ styles.textSectionTitle }>Select a Date</Text>
              }

            </View>

            <View style={ styles.buttonWrapper }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onSetSchedule() }>
                <View style={ styles.scheduleButton }>
                  <Text style={ styles.buttonText }>Set Schedule</Text>
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
  weekendDayText: {
    color: '#8d99a6',
  },
  weekendHeading: {
    color: '#2e343b',
  },
  weekRow: {
    backgroundColor: '#fff',
  },
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
    fontSize: 20,
    paddingBottom: 10,
  },
  contentContainer: {
    flex: 9.2,
    backgroundColor: '#efefef',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#d9d9d9',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  textSectionTitle: {
    paddingLeft: 5,
    textAlign: 'center',
    color: '#565656',
  },
  timeMainContainer: {
    flex: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  scheduleButton: {
    width: width - 100,
    backgroundColor: '#14c2f7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#14c2f7',
    borderStyle: 'solid',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    paddingVertical: 15,
    paddingHorizontal: 40,
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  calendarTime: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    borderStyle: 'solid',
  },
  timeRowContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  textTimeTo: {
    paddingHorizontal: 20,
    textAlign: 'center',
    color: '#565656',
  },

});

export default connect(state => ({
    profile: state.profile,
    user: state.auth.user,
  }),
  (dispatch) => ({
    getSchedule: () => dispatch(profileActions.getSchedule()),
  })
)(EditAvailabilityForm);