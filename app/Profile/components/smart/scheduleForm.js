import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { SegmentedControls } from 'react-native-radio-buttons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';

import Calendar from './calendar/Calendar';

import Ramda from 'ramda';
import Moment from 'moment';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');
const downArrow = require('../../../Assets/images/down_arrow.png');
const constants = {
  BASIC_INFO: 'BASIC INFO',
  CALENDAR: 'CALENDAR'
};
const schedules = [
  {
    date: '2017-03-10',
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
    date: '2017-03-15',
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
    date: '2017-03-20',
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

export default class ScheduleForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schedules: schedules,
      selectedDate: schedules[0].date,
      selectedOption: constants.CALENDAR,
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'ClientScheduleRequest') {

    } else if (newProps.status == 'ClientScheduleSuccess') {

    } else if (newProps.status == 'ClientScheduleError') {

    }
  }

  onAddTime() {
    let index = Ramda.findIndex(Ramda.propEq('date', this.state.selectedDate))(this.state.schedules);

    const { schedules } = this.state;
      
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
      schedules.push( data );
    } else {
      schedules[index].times.push({ start: '08:00 AM', end: '09:00 AM' });
    }

    this.setState({ schdules: schedules });
  }

  onSelectDate(date) {
    let day = Moment(date).format('YYYY-MM-DD');
    this.setState({ selectedDate: day });
  }

  onChangeStartTime(time, entryIndex) {
    let index = Ramda.findIndex(Ramda.propEq('date', this.state.selectedDate))(this.state.schedules);

    const { schedules } = this.state;
    schedules[index].times[entryIndex].start = time;
    this.setState({ schdules: schedules });
  }

  onChangeEndTime(time, entryIndex) {
    let index = Ramda.findIndex(Ramda.propEq('date', this.state.selectedDate))(this.state.schedules);

    const { schedules } = this.state;
    schedules[index].times[entryIndex].end = time;
    this.setState({ schdules: schedules });
  }

  onSetSchedule() {
    Actions.pop();
  }

  onBack() {
    Actions.pop();
  }
  onChangeOptions(option) {
    const { selectedOption } = this.state;

    if (selectedOption != option) {
      Actions.pop();
    }
  }


  get getShowNavBar() {
    const { selectedOption } = this.state;
    return (
      <View style={ styles.navigateButtons }>
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

          <Text style={ styles.textTitle }>SCHEDULE</Text>

          <View style={ styles.navButtonWrapper }/>
        </View>

        <View style={ styles.navigateButtons }>
          <SegmentedControls
            tint={ "#fff" }
            selectedTint= { "#41c3fd" }
            backTint= { "#41c3fd" }
            options={ [constants.BASIC_INFO, constants.CALENDAR] }
            onSelection={ (option) => this.onChangeOptions(option) }
            selectedOption={ selectedOption }
            allowFontScaling={ true }
            optionStyle={styles.segmentedControlsOptions}
            containerStyle= {styles.segmentedControlsContainer}
          />
        </View>
      </View>
    );
  }

  showSchedule() {
    let index = Ramda.findIndex(Ramda.propEq('date', this.state.selectedDate))(this.state.schedules)
    
    if (index == -1)
      return null;

    return this.state.schedules[index].times.map((entry, index) => {
      return (
        <View key={ index } style={ styles.timeRowContainer }>
          <DatePicker
            date={ entry.start }
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
            date={ entry.end }
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
      );
    });    
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
              eventDates={ Ramda.pluck('date')(this.state.schedules) }
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
    backgroundColor: '#fff',
  },
  currentDayText: {
    color: '#8d99a6',
  },
  day: {
    color: '#8d99a6',
  },
  dayHeading: {
    color: '#2e343b',
  },
  hasEventCircle: {
    backgroundColor: '#45c7f1',
    borderWidth: 1,
    borderColor: '#34aadc',
  },
  hasEventText: {
    color: '#fff',
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
    // flex: 1,
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: 'transparent',
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
    fontSize: 20,
    paddingBottom: 10,
  },  
  contentContainer: {
    flex: 8.5,
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
  navigateButtons: {
    flex:1.5,
    alignItems: 'center',
    flexDirection: 'column'
  },
  segmentedControlsOptions: {
    fontSize: 12,
    height: 20,
    paddingTop:3,
  },
  segmentedControlsContainer:{
    borderRadius:10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
