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
import Stars from 'react-native-stars-rating';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Calendar from './calendar/Calendar';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');

export default class ScheduleForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'ClientScheduleRequest') {

    } else if (newProps.status == 'ClientScheduleSuccess') {

    } else if (newProps.status == 'ClientScheduleError') {

    }
  }

  onSetSchedule() {
    
  }

  onAddTime() {

  }

  onSelectDate(date) {

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

        <Text style={ styles.textTitle }>SCHEDULE</Text>

        <View style={ styles.navButtonWrapper }/>
      </View>
    );
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
              eventDates={ ['2017-03-15', '2017-03-25', '2017-03-08'] }
              nextButtonText={ '>' }
              prevButtonText={'<'}
              showControls={ true }
              showEventIndicators={ true }
              isSelectableDay={ true }
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

            <ScrollView>
              <View style={ styles.timeMainContainer }>
                <TouchableOpacity
                  onPress={ () => this.onAddTime() }                
                >
                  <Ionicons                
                    name="ios-add-circle-outline"  
                    size={ 50 }
                    color="#717171"
                    style={[{ paddingTop:5 }, { paddingHorizontal: 5 }]}
                  />
                </TouchableOpacity>  

              </View>
            </ScrollView>
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
    paddingVertical: 5,
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
