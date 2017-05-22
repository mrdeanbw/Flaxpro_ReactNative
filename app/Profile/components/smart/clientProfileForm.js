import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Stars from 'react-native-stars-rating';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import Calendar from './calendar/Calendar';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');
const schedule = require('../../../Assets/images/schedule.png');
const edit = require('../../../Assets/images/edit.png');
const strengthTraining = require('../../../Assets/images/strength_training.png');
const pilates = require('../../../Assets/images/pilates.png');
const yoga = require('../../../Assets/images/yoga.png');
const totalWorkout = require('../../../Assets/images/total_workout.png');

//auth redux store
import * as authActions from '../../../Auth/actions';

import { allProfessions } from '../../../Components/tempDataUsers'

class ClientProfileForm extends Component {

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
    Actions.EditProfile();
  }

  onShowMoreLess(showMode) {
    this.setState({ showMoreOrLess: showMode });
  }

  onBack() {
    Actions.pop();
  }

  getIconWorkout(id) {
    for (let i = 0; i < allProfessions.length; i++) {
      const prof = allProfessions[i];
      if (prof.id == id) {
        return prof.icon;
      }
    }
    return null
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
    const { editable, auth } = this.props;

    return (
      editable ?
        <View style={ styles.navBarContainer }>
          <TouchableOpacity
            onPress={ () => this.onSchdule() }
            style={ styles.navButtonWrapper }
          >
            <Image source={ schedule } style={ styles.imageSchedule } resizeMode="cover"/>
          </TouchableOpacity>

          <Text style={ styles.textTitle }>{ auth.user.name && auth.user.name.toUpperCase() }</Text>

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
          <Text style={ styles.textTitle }>{ auth.user.name && auth.user.name.toUpperCase() }</Text>
          <View style={ styles.navButtonWrapper }/>          
        </View>
    );
  }

  render() {
    const { editable, auth } = this.props,
      { showMoreOrLess } = this.state;

    let countWorkouts = 0;
    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          
          { this.getShowNavBar }

          <View style={ styles.contentContainer }>
            <View style={ styles.avatarContainer }>
              <View style={ styles.avatarTopBackground }/>
              <View style={ styles.avatarBottomBackground }/>
              <View style={ styles.avatarWrapper }>
                <Image source={ auth.user.avatar } style={ styles.imageAvatar } resizeMode="cover"/>
              </View>
            </View>
            <View style={ [styles.contentMainContainer, editable ? { paddingBottom: 50 } : { paddingBottom: 0 }]}>
              <View style={ styles.workoutContainer }>
                {
                  auth.user.workouts && auth.user.workouts.map((workout) => {
                    countWorkouts += workout.count;
                    return <View style={ styles.workoutCell }>
                      <Image source={ this.getIconWorkout(workout.id) } style={ styles.imageWorkout } />
                      <Text style={ styles.textWorkoutTitle }>{ workout.workout }</Text>
                      <Text style={ [styles.textWorkoutValue, { color: '#41ce59'}] }>{ workout.count } WORKOUTS</Text>
                    </View>
                  })
                }
                <View style={ styles.workoutCell }>
                  <Image source={ totalWorkout } style={ styles.imageWorkout } />
                  <Text style={ styles.textWorkoutTitle }>Total Workout</Text>
                  <Text style={ [styles.textWorkoutValue, { color: '#0fc8fb'}] }>{countWorkouts}</Text>
                </View>
              </View>
              <ScrollView>
                <View style={ styles.infoContainer }>
                  <Text style={ styles.textInfoTitle }>BASIC INFO</Text>                  
                  <View style={ styles.infoRowContainer }>
                    <View style={ styles.infoRowLeftContainer }>
                      <Text style={ styles.textInfoField }>Sex : </Text>
                      <Text style={ styles.textInfoValue }>{auth.user.gender}</Text>
                    </View>
                    <View style={ styles.infoRowRightContainer }>
                      <Text style={ styles.textInfoField }>Year of experience : </Text>
                      <Text style={ styles.textInfoValue }> --- </Text>
                    </View>
                  </View>
                  <View style={ styles.infoRowContainer }>
                    <View style={ styles.infoRowLeftContainer }>
                      <Text style={ styles.textInfoField }>Affiliation : </Text>
                      <Text style={ styles.textInfoValue }>Gym</Text>
                    </View>
                    <View style={ styles.infoRowRightContainer }>
                      <Text style={ styles.textInfoField }>Certification : </Text>
                      <Text style={ styles.textInfoValue }>{auth.user.certification ? auth.user.certification : '---'}</Text>
                    </View>
                  </View>
                </View>
                <View style={ styles.infoContainer }>
                  <Text style={ styles.textInfoTitle }>ABOUT ME</Text>
                  <Text style={ styles.textInfoValue }>{auth.user.about}</Text>
                </View>

                <Text style={ [styles.textInfoTitle, { paddingHorizontal: 10 }] }>REVIEWS</Text>
                { auth.user.reviews && auth.user.reviews.map((review, index) => {
                    if (showMoreOrLess && index > 1) return null;
                    return <View style={ styles.infoContainer }>
                      <View style={ styles.starContainer }>
                        <Text style={ styles.textProfessionalName }>{ review.author }</Text>
                        <Stars
                          isActive={ false }
                          rateMax={ 5 }
                          isHalfStarEnabled={ false }
                          // onStarPress={ (rating) => console.log(rating) }
                          rate={ review.rating }
                          size={ 16 }
                        />
                      </View>
                      <Text style={ styles.textInfoValue }>{ review.review }</Text>
                      <Text style={ styles.textGray }>{ review.date }</Text>
                    </View>
                  })
                }
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
    infoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
  },
  infoRowLeftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoRowRightContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInfoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
    textInfoField: {
    fontSize: 12,
    color: '#11c6f8',
  },
  textInfoValue: {
    fontSize: 10,
  },
  starContainer: {
    flexDirection: 'row',
  },
  textProfessionalName: {
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

export default connect(state => ({
    auth: state.auth
  }),
  (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(ClientProfileForm);