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

import Ramda from 'ramda';
import Moment from 'moment';

import Calendar from './calendar/Calendar';
import * as profileActions from '../../actions';
import FullScreenLoader from '../../../Components/fullScreenLoader';

import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor,
} from '../../../Components/commonConstant';

const background = require('../../../Assets/images/background.png');
const downArrow = require('../../../Assets/images/down_arrow.png');


class EditAvailabilityForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schedule: [...props.profile.schedule],
      selectedDates: [],
      equalTimes: [],
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
        schedule: [...profile.schedule],
      })
    }

  }

  setTime({start = {}, end = {}, index}) {
    const selectedDates = [...this.state.selectedDates];
    const schedule = [...this.state.schedule];

    const updateSchedule = (date, time) => {
      const existDate = Ramda.find(Ramda.propEq('date', date))(schedule);
      switch (true) {
        case Number.isInteger(start.hours) && Number.isInteger(end.hours) :
          existDate ? existDate.schedules.push(time) : schedule.push({date, schedules: [time]});
          break;
        case Number.isInteger(start.hours) :
          existDate.schedules.filter(e => Moment(e.from).format("hh:mm A") === this.state.equalTimes[index].from)[0].from = time.from;
          break;
        case Number.isInteger(end.hours) :
          existDate.schedules.filter(e => Moment(e.from).format("hh:mm A") === this.state.equalTimes[index].from)[0].to = time.to;
          break;
      }
      this.findEqualTimes(selectedDates);
      this.setState({schedule})
    };

    selectedDates.forEach( selected => {
      const day = new Date(selected.date);

      const setNewTime = ( offset = 0 ) => {
        if (offset > 12) return;
        const defaultTime = {
          from: Number.isInteger(start.hours) ? new Date(day.setHours(start.hours + offset, start.minutes)) : new Date(),
          to: Number.isInteger(end.hours) ? new Date(day.setHours(end.hours + offset, end.minutes)) : new Date(),
        };

        if (Number.isInteger(start.hours) && selected.schedules.length) {
          const el = selected.schedules.filter(schedule => Moment(schedule.from).format() === Moment(defaultTime.from).format());
          if (el.length) {
            setNewTime(++offset)
          } else {
            if (Number.isInteger(start.hours) && Number.isInteger(end.hours)) {
              selected.schedules.push(defaultTime);
            }
            updateSchedule(selected.date, defaultTime);
          }
        } else {
          if (Number.isInteger(start.hours) && Number.isInteger(end.hours)) {
            selected.schedules.push(defaultTime);
          }
          updateSchedule(selected.date, defaultTime);
        }
      };
      setNewTime();
      this.setState({ selectedDates });
    });

  }

  onAddTime() {
    if (!this.state.selectedDates.length) return;

    const timeStart = {hours:8, minutes:0};
    const timeEnd = {hours:9, minutes:0};

    this.setTime({start: timeStart, end: timeEnd})
  }

  onSelectDate(date) {
    const day = Moment(date).format('ddd, D MMM YYYY');
    const selectedDates = [...this.state.selectedDates];
    const existDate = Ramda.find(Ramda.propEq('date', day))(this.state.schedule);

    if (selectedDates.length && Ramda.find(Ramda.propEq('date', day))(selectedDates)){
      selectedDates.splice(Ramda.findIndex(Ramda.propEq('date', day))(selectedDates), 1)
    } else {
      selectedDates.push({date:day, schedules: existDate ? [...existDate.schedules] : []})
    }
    this.findEqualTimes(selectedDates);
    this.setState({ selectedDates });
  }

  onChangeStartTime(time, entryIndex) {
    const startTime = {hours: +Moment(time, "hh:mm A").get('hour'), minutes:+Moment(time, "hh:mm A").get('minute')};
    this.setTime({start: startTime, index: entryIndex})
  }

  onChangeEndTime(time, entryIndex) {
    const endTime = {hours: +Moment(time, "hh:mm A").get('hour'), minutes:+Moment(time, "hh:mm A").get('minute')};
    this.setTime({end: endTime, index: entryIndex});
  }

  onRemoveTime(entry) {
    const selectedDates = [...this.state.selectedDates];
    let schedule = [...this.state.schedule];

    selectedDates.forEach( selected => {
      const existDate = Ramda.find(Ramda.propEq('date', selected.date))(schedule) ;
      selected.schedules = selected.schedules.filter(e => Moment(e.from).format("hh:mm A") !== entry.from);
      if(existDate) existDate.schedules = existDate.schedules.filter(e => Moment(e.from).format("hh:mm A") !== entry.from);
    });
    schedule = schedule.filter(e => !Ramda.isEmpty(e.schedules));
    this.findEqualTimes(selectedDates);
    this.setState({ selectedDates, schedule });

  }

  checkSchedule() {
    const el = this.state.schedule.filter( e => e.schedules.filter( s => (s.from >= s.to)).length);
    return el.length;
  }

  onSetSchedule() {
    const data = [];
    if (this.checkSchedule()) return Alert.alert(`Selected time "from" should be less than time "to". Please check your schedule`);
    this.state.schedule.forEach(e => data.push(...e.schedules));
    this.props.createSchedule(data);
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

  findEqualTimes(selectedDates) {
    let arr = selectedDates.filter(e => Ramda.isEmpty(e.schedules));
    if(arr.length) return this.setState({equalTimes: []});

    let uniqArr = [];
    selectedDates.forEach(e => {
      uniqArr = Ramda.uniq([...uniqArr, ...e.schedules.map(s => ({
          from: Moment(s.from).format("hh:mm A"),
          to: Moment(s.to).format("hh:mm A")
        }))
      ]);
    });
    selectedDates.forEach(e => {
      uniqArr = Ramda.intersectionWith(Ramda.eqBy(Ramda.prop('from')), uniqArr, e.schedules.map(s => ({
          from: Moment(s.from).format("hh:mm A"),
          to: Moment(s.to).format("hh:mm A")
        }))
      );
    });
    this.setState({equalTimes: uniqArr})
  }

  get showSchedule() {
    return this.state.equalTimes.map((entry, index) => (
      <View key={ index } style={ [styles.timeRowContainer, styles.timeBlock] }>

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
        <TouchableOpacity
          onPress={ () => this.onRemoveTime(entry) }
        >
          <EntypoIcons
            name="circle-with-cross"
            size={ 15 }
            color="#8d99a6"
            style={{position: 'relative', bottom: 10, left: 5, padding: 5}}
          />
        </TouchableOpacity>
      </View>
    ))

  }

  render() {
    const { profile: { loading } } = this.props;

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
              selectedDate={this.state.selectedDates.map(e => e.date)}
              onTouchNext={()=> { this.setState({selectedDates: []}) } }
              onTouchPrev={()=> { this.setState({selectedDates: []}) } }
            />
            <View style={ styles.sectionTitleContainer }>
              <Ionicons
                name="ios-time-outline"
                size={ 30 }
                color="#565656"
                style={{ paddingTop:5, paddingHorizontal: 5 }}
              />
              <Text style={ styles.textSectionTitle }>Select Time {this.state.selectedDates.length>1 && '(same for all selected dates)'}</Text>
            </View>

            <View style={ styles.timeMainContainer }>
              {
                this.state.selectedDates.length > 0 ?
                  <ScrollView>
                    { this.showSchedule }

                    <View style={ styles.buttonWrapper }>
                      <TouchableOpacity
                        onPress={ () => this.onAddTime() }
                      >
                        <Ionicons
                          name="ios-add-circle-outline"
                          size={ 40 }
                          color="#717171"
                          style={{ paddingTop:10, paddingHorizontal: 5, marginRight:12 }}
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
          {
            loading && <FullScreenLoader/>
          }
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
    width: 130,
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
    paddingLeft: 25,
    paddingRight: 15,
    textAlign: 'center',
    color: '#565656',
  },
  timeBlock: {
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default connect(state => ({
    profile: state.profile,
    user: state.auth.user,
  }),
  (dispatch) => ({
    getSchedule: () => dispatch(profileActions.getSchedule()),
    createSchedule: (data) => dispatch(profileActions.createSchedule(data)),
  })
)(EditAvailabilityForm);