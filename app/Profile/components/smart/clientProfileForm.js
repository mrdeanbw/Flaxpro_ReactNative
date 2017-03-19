import React, { Component, PropTypes } from 'react';
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
import Calendar from './calendar/Calendar';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const schedule = require('../../../Assets/schedule.png');
const edit = require('../../../Assets/edit.png');
const strengthTraining = require('../../../Assets/strength_training.png');
const pilates = require('../../../Assets/pilates.png');
const yoga = require('../../../Assets/yoga.png');
const totalWorkout = require('../../../Assets/total_workout.png');

export default class ClientProfileForm extends Component {

  static propTypes = {
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      showMoreOrLess: true,
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'ClientProfileRequest') {

    } else if (newProps.status == 'ClientProfileSuccess') {

    } else if (newProps.status == 'ClientProfileError') {

    }
  }

  onSchdule() {
    Actions.ScheduleForm(); 
  }

  onEdit() {
    alert( 'Tapped onEdit!');
  }

  onShowMoreLess(showMode) {
    this.setState({ showMoreOrLess: showMode });
  }

  onBack() {
    Actions.pop();
  }

  get showMoreOrLessButton() {
    return (
      this.state.showMoreOrLess ?
        <View style={ styles.showContainer }>
          <TouchableOpacity
            onPress={ () => this.onShowMoreLess( false ) }
            style={ styles.showButtonWrapper }
          >
            <Text style={ styles.textGray }>Show More</Text>
            <EntypoIcons
              name="chevron-thin-down"  size={ 15 }
              color="#7e7e7e"
            />
          </TouchableOpacity>
        </View>
        :
        <View style={ styles.showContainer }>
          <TouchableOpacity
            onPress={ () => this.onShowMoreLess( true ) }
            style={ styles.showButtonWrapper }
          >
            <EntypoIcons
              name="chevron-thin-up"  size={ 15 }
              color="#7e7e7e"
            />
            <Text style={ styles.textGray }>Show Less</Text>
          </TouchableOpacity>
        </View>
    );
  }

  get showCalendar() {
    return (
      this.state.showMoreOrLess ?
        <Calendar
          customStyle={ customStyle }
          dayHeadings={ ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ] }
          eventDates={ ['2017-03-15', '2017-03-25', '2017-03-08'] }
          nextButtonText={ '>' }
          prevButtonText={ '<' }
          showControls={ true }
          showEventIndicators={ true }
          isSelectableDay={ false }
        />
      :
        null
    );
  }

  get getShowNavBar() {
    const { editable } = this.props;

    return (
      editable ?
        <View style={ styles.navBarContainer }>
          <TouchableOpacity
            onPress={ () => this.onSchdule() }
            style={ styles.navButtonWrapper }
          >
            <Image source={ schedule } style={ styles.imageSchedule } resizeMode="cover"/>
          </TouchableOpacity>

          <Text style={ styles.textTitle }>{ this.user.name.toUpperCase() }</Text>

          <TouchableOpacity
            onPress={ () => this.onEdit() }
            style={ styles.navButtonWrapper }
          >
            <Image source={ edit } style={ styles.imageEdit } resizeMode="cover"/>
          </TouchableOpacity>
        </View>
        :
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
          <Text style={ styles.textTitle }>{ this.user.name.toUpperCase() }</Text>
          <View style={ styles.navButtonWrapper }/>          
        </View>
    );
  }

  render() {
    const { status, editable, user } = this.props;
    this.user = user;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          
          { this.getShowNavBar }

          <View style={ styles.contentContainer }>
            <View style={ styles.avatarContainer }>
              <View style={ styles.avatarTopBackground }/>
              <View style={ styles.avatarBottomBackground }/>
              <View style={ styles.avatarWrapper }>
                <Image source={ this.user.avatar } style={ styles.imageAvatar } resizeMode="cover"/>
              </View>
            </View>
            <View style={ [styles.contentMainContainer, editable ? { paddingBottom: 50 } : { paddingBottom: 0 }]}>
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

                <View style={ styles.infoContainer }>
                  <View style={ styles.starContainer }>
                    <Text style={ styles.textTrainerName }>Alex</Text>
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

              { this.showMoreOrLessButton }
              { this.showCalendar }

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
    backgroundColor: '#fff',
  },
  selectedDayText: {
    color: '#8d99a6',
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
    height: 64,
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
  },
  showContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  showButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
