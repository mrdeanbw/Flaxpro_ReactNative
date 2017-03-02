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
import Calendar from 'react-native-calendar';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const schedule = require('../../../Assets/schedule.png');
const edit = require('../../../Assets/edit.png');
const avatar = require('../../../Assets/avatar.png');
const strengthTraining = require('../../../Assets/strength_training.png');
const pilates = require('../../../Assets/pilates.png');
const yoga = require('../../../Assets/yoga.png');
const totalWorkout = require('../../../Assets/total_workout.png');

export default class ClientProfileForm extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'ClientProfileRequest') {

    } else if (newProps.status == 'ClientProfileSuccess') {

    } else if (newProps.status == 'ClientProfileError') {

    }
  }

  onSchdule() {

  }

  onEdit() {

  }

  onShowMoreLess() {

  }

  onDateSelect(date) {

  }

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.navBarContainer }>
            <TouchableOpacity
              onPress={ () => this.onSchdule() }
              style={ styles.navButtonWrapper }
            >
              <Image source={ schedule } style={ styles.imageSchedule } resizeMode="cover"/>
            </TouchableOpacity>

            <Text style={ styles.textTitle }>SARA CLINTON</Text>

            <TouchableOpacity
              onPress={ () => this.onEdit() }
              style={ styles.navButtonWrapper }
            >
              <Image source={ edit } style={ styles.imageEdit } resizeMode="cover"/>
            </TouchableOpacity>
          </View>
          <View style={ styles.contentContainer }>
            <View style={ styles.avatarContainer }>
              <View style={ styles.avatarTopBackground }>
              </View>
              <View style={ styles.avatarBottomBackground }>
              </View>
              <View style={ styles.avatarWrapper }>
                <Image source={ avatar } style={ styles.imageAvatar } resizeMode="cover"/>
              </View>
            </View>
            <View style={ styles.contentMainContainer }>
              <View style={ styles.workoutContainer }>
                <View style={ styles.workoutCell }>
                  <Image source={ strengthTraining } style={ styles.imageWorkout } />
                  <Text style={ styles.textWorkoutTitle }>Strength Training</Text>
                  <Text style={ [styles.textWorkoutValue, { color: '#41ce59'}] }>89 WORKOUTS</Text>
                </View>
                <View style={ styles.workoutCell }>
                  <Image source={ pilates } style={ styles.imageWorkout } />
                  <Text style={ styles.textWorkoutTitle }>Pilates</Text>
                  <Text style={ [styles.textWorkoutValue, { color: '#ffb21c'}] }>36 WORKOUTS</Text>
                </View>
                <View style={ styles.workoutCell }>
                  <Image source={ yoga } style={ styles.imageWorkout } />
                  <Text style={ styles.textWorkoutTitle }>Yoga</Text>
                  <Text style={ [styles.textWorkoutValue, { color: '#a94df0'}] }>25 WORKOUTS</Text>
                </View>
                <View style={ styles.workoutCell }>
                  <Image source={ totalWorkout } style={ styles.imageWorkout } />
                  <Text style={ styles.textWorkoutTitle }>Total Workout</Text>
                  <Text style={ [styles.textWorkoutValue, { color: '#0fc8fb'}] }>150</Text>
                </View>
              </View>
              <ScrollView>
                <View style={ styles.infoContainer }>
                  <Text style={ styles.textInfoTitle }>BASIC INFO</Text>
                  <Text style={ styles.textInfoValue }>25 years / Male</Text>
                  <Text style={ styles.textInfoValue }>Mississauge</Text>
                </View>
                <View style={ styles.infoContainer }>
                  <Text style={ styles.textInfoTitle }>ABOUT ME</Text>
                  <Text style={ styles.textInfoValue }>O trained for many years, and I'm very confident about the skullset I developed over the years.</Text>
                </View>

                <Text style={ [styles.textInfoTitle, { paddingHorizontal: 10 }] }>REVIEWS</Text>

                <View style={ styles.infoContainer }>
                  <View style={ styles.starContainer }>
                    <Text style={ styles.textTrainerName }>Mark</Text>
                    <Stars
                      isActive={ false }
                      rateMax={ 5 }
                      isHalfStarEnabled={ false }
                      onStarPress={ (rating) => console.log(rating) }
                      rate={ 5 }
                      size={ 16 }
                    />
                  </View>
                  <Text style={ styles.textInfoValue }>O spent foor months with him and helped me reached my goal in no time. I love him.</Text>
                  <Text style={ styles.textGray }>SEP 18, 2016</Text>
                </View>
              </ScrollView>

              <View style={ styles.showContainer }>
                <TouchableOpacity
                  onPress={ () => this.onShowMoreLess() }
                  style={ styles.showButtonWrapper }
                >
                  <Text style={ styles.textGray }>Show More</Text>
                  <EntypoIcons
                    name="chevron-thin-down"  size={ 15 }
                    color="#7e7e7e"
                  />
                </TouchableOpacity>
              </View>

              <Calendar
                customStyle={ customStyle }
                dayHeadings={ ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ] }
                eventDates={ ['2017-03-15'] }
                nextButtonText={ '>' }
                onSwipeNext={ this.onSwipeNext }    // Callback for forward swipe event
                onSwipePrev={ this.onSwipePrev }    // Callback for back swipe event
                onTouchNext={ this.onTouchNext }    // Callback for next touch event
                onTouchPrev={ this.onTouchPrev }    // Callback for prev touch event
                prevButtonText={'<'}           // Text for previous button. Default: 'Prev'
                onDateSelect={ (date) => this.onDateSelect(date) }
                selectedDate={ '2017-03-17' }       // Day to be selected
                showControls={ true }               // False hides prev/next buttons. Default: False
                showEventIndicators={ true }        // False hides event indicators. Default:False
              />
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
    color: '#c6ccd2',
  },
  day: {
    color: '#c6ccd2',
  },
  dayHeading: {
    color: '#2e343b',
  },
  hasEventCircle: {
    backgroundColor: '#45c7f1',
  },
  hasEventText: {
    color: '#fff',
  },
  selectedDayCircle: {
    backgroundColor: '#fff',
  },
  selectedDayText: {
    color: '#c6ccd2',
  },
  weekendDayText: {
    color: '#c6ccd2',
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
    flex: 0.7,
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
  textTitle: {
    flex: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  },
  imageSchedule: {
    width: 26,
    height: 24,
  },
  imageEdit: {
    width: 24,
    height: 24,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTopBackground: {
    width: width,
    height: 32,
    backgroundColor: 'transparent',
  },
  avatarBottomBackground: {
    width: width,
    height: 32,
    backgroundColor: '#fff',
  },
  imageAvatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  avatarWrapper: {
    backgroundColor: '#fff',
    position: 'absolute',
    left: width / 2 - 32,
    height: 64,
    width: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 8.5,
    backgroundColor: 'transparent',
  },
  contentMainContainer: {
    flex: 8.5,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  workoutContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workoutCell: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (width - 40) / 4,
    marginHorizontal: 5,
  },
  imageWorkout: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  textWorkoutTitle: {
    color: '#000',
    fontSize: 8,
    paddingVertical: 5,
    textAlign: 'center',
  },
  textWorkoutValue: {
    fontSize: 11,
    textAlign: 'center',
  },
  infoContainer: {
    paddingVertical: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  textInfoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  textInfoValue: {
    fontSize: 10,
  },
  starContainer: {
    flexDirection: 'row',
  },
  textTrainerName: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingRight: 5,
  },
  textGray: {
    fontSize: 11,
    color: '#7e7e7e',
    paddingTop: 5,
  },
  showContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  showButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
