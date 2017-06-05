import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { SegmentedControls } from 'react-native-radio-buttons';
import Stars from 'react-native-stars-rating';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import ImageProgress from 'react-native-image-progress';
import R from 'ramda';

import Calendar from './calendar/Calendar';
import FullScreenLoader from '../../../Components/fullScreenLoader';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');
const schedule = require('../../../Assets/images/schedule.png');
const edit = require('../../../Assets/images/edit.png');
const strengthTraining = require('../../../Assets/images/strength_training.png');
const pilates = require('../../../Assets/images/pilates.png');
const yoga = require('../../../Assets/images/yoga.png');
const totalWorkout = require('../../../Assets/images/total_workout.png');
const avatarDefault = require('../../../Assets/images/avatar.png');

const constants = {
  BASIC_INFO: 'BASIC INFO',
  CALENDAR: 'CALENDAR'
};
const prices = [
  {item: '$', price: '$50-100', level: '1'},
  {item: '$$', price: '$100-300', level: '2'},
  {item: '$$$', price: '$300+', level: '3'}
];
//auth redux store
import { Reviews } from '../../../Components/dummyEntries'

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
      selectedOption: constants.BASIC_INFO,
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'ClientProfileRequest') {

    } else if (newProps.status == 'ClientProfileSuccess') {

    } else if (newProps.status == 'ClientProfileError') {

    }
  }

  onSchedule() {
    Actions.ScheduleForm({getSessions: this.props.getSessions});
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

  onChangeOptions(option) {
    const { selectedOption } = this.state;

    if (selectedOption != option) {
      const { getSessions } = this.props;
      getSessions({byField: 'day'})
      this.onSchedule();
      this.setState({ selectedOption });
    }
  }

  get showMoreOrLessButton() {
    return (
      this.state.showMoreOrLess ?
        <View style={ styles.showContainer }>
          <TouchableOpacity
            onPress={ () => this.onShowMoreLess( false ) }
            style={ styles.showButtonWrapper }
          >
            <Text style={ [styles.fontStyles, styles.textGray] }>Show More</Text>
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
            <Text style={ [styles.fontStyles, styles.textGray] }>Show Less</Text>
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
    const { selectedOption } = this.state;

    return (
      editable ?
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

            <Text style={ [styles.fontStyles, styles.textTitle] }> PROFILE </Text>

            <TouchableOpacity
              onPress={ () => this.onEdit() }
              style={ styles.navButtonWrapper }
            >
              <Image source={ edit } style={ styles.imageEdit } resizeMode="cover"/>
            </TouchableOpacity>
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
          <Text style={ [styles.fontStyles, styles.textTitle] }>{ user.name && user.name.toUpperCase() }</Text>
          <View style={ styles.navButtonWrapper }/>          
        </View>
    );
  }
  prepareProfessions() {
    const { explore: { professions }, user } = this.props;
    if(!user.professions) return [];
    const workouts = [...user.professions.map((e)=>(
      {
        profession: professions.filter((item)=>item._id===e.profession)[0] || {},
        price: prices.filter((item)=>(item.level===e.priceLevel))[0] || {},
      })
    )
    ];
    return workouts;
  }

  onShowSessions() {
    const { getSessions } = this.props;
    getSessions({byField: 'profession'})
    Actions.Sessions();
  }

  render() {
    const { editable, user } = this.props;
    const { showMoreOrLess } = this.state;
    const workouts = this.prepareProfessions();

    const reviews = (user.reviews && user.reviews.length) ? user.reviews : Reviews;

    return (
      R.isEmpty(user) ?
        <FullScreenLoader/>
        :
        <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          
          { this.getShowNavBar }

          <View style={ styles.contentContainer }>
            <View style={ styles.avatarContainer }>
              <View style={ styles.avatarWrapper }>
                { user.avatar ?
                  <ImageProgress source={ {uri: user.avatar} } indicator={ActivityIndicator} style={ styles.imageAvatar } resizeMode="cover"/>
                  :
                  <Image source={ avatarDefault } style={ styles.imageAvatar } resizeMode="cover"/>
                }
              </View>
              <Text style={ [styles.fontStyles, styles.textTitle, styles.blackText] }>{ user.name && user.name.toUpperCase() }</Text>
            </View>

            <View style={ [styles.contentMainContainer, { paddingBottom: 50 }] }>
              <ScrollView>
                <View style={ [styles.infoContainer, styles.infoBlock] }>
                  <Text style={ styles.textInfoTitle }>BASIC INFO</Text>
                  <View style={ [styles.spaceBetweenContainer] }>
                    <View style={ styles.columnContainer }>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ [styles.fontStyles, styles.textInfoField] }>Gender : </Text>
                        <Text style={ [styles.fontStyles, styles.textInfoValue] }>{user.gender}</Text>
                      </View>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ [styles.fontStyles, styles.textInfoField] }>Age : </Text>
                        <Text style={ [styles.fontStyles, styles.textInfoValue] }>{user.age}</Text>
                      </View>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ [styles.fontStyles, styles.textInfoField] }>Address : </Text>
                        <Text style={ [styles.fontStyles, styles.textInfoValue] }>{user.location.city}</Text>
                      </View>
                    </View>
                    <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onShowSessions() }>
                      <View style={ [styles.infoRowRightContainer, styles.blueBorderBlock] }>
                          <Text style={ [styles.fontStyles, styles.textInfoValue] }>Total Sessions   </Text>
                          <Text style={ [styles.textInfoTitle, styles.blueText] }>{user.totalSessions}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={ [styles.infoContainer, styles.infoBlock] }>
                  <Text style={ styles.textInfoTitle }>LOOKING FOR</Text>
                  <View style={ [styles.infoRowLeftContainer, styles.negativeMargin] }>
                    <ScrollView horizontal={ true } showsHorizontalScrollIndicator={false}>
                    {
                      workouts.map((item, index) => (
                        <View style={ [styles.columnContainer, styles.blueBorderBlock] } key={index}>
                          <Text style={ [styles.fontStyles, styles.textInfoValue] }>{item.profession.name}</Text>
                          <Text style={ [styles.textInfoTitle, styles.blueText] }>{item.price.price}</Text>
                        </View>
                      ))
                    }
                    </ScrollView>
                  </View>
                </View>

                <View style={ [styles.infoContainer, styles.infoBlock] }>
                  <Text style={ styles.textInfoTitle }>ABOUT ME</Text>
                  <Text style={ [styles.fontStyles, styles.textInfoValue] }>{user.description}</Text>
                </View>

                <View style={ [styles.infoContainer, styles.infoBlock] }>
                  <Text style={ [styles.textInfoTitle] }>REVIEWS</Text>
                  { reviews && reviews.map((review, index) => {
                    if (showMoreOrLess && index >= 1) return null;
                    return (
                      <View style={ styles.columnContainer } key={index}>
                        <View style={ styles.starContainer }>
                          <Text style={ styles.textProfessionalName }>{ review.author }</Text>
                          <Stars
                            isActive={ false }
                            rateMax={ 5 }
                            isHalfStarEnabled={ false }
                            onStarPress={ (rating) => console.log(rating) }
                            rate={ review.rating }
                            size={ 16 }
                          />
                        </View>
                        <Text style={ [styles.fontStyles, styles.textInfoValue] }>{ review.review }</Text>
                        <Text style={ [styles.fontStyles, styles.textGray] }>{ review.date }</Text>
                      </View>
                    )
                  })
                  }
                </View>
                { this.showMoreOrLessButton }
              </ScrollView>
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

  fontStyles: {
    fontFamily: 'Open Sans',
    fontSize: 18,
  },
  navigateButtons: {
    flex:1.5,
    alignItems: 'center',
    flexDirection: 'column'
  },
  navBarContainer: {
    // flex: 1,
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
    fontSize: 20,
  },
  imageSchedule: {
    width: 26,
    height: 24,
  },
  imageEdit: {
    width: 24,
    height: 24,
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
  contentContainer: {
    flex: 8.5,
    backgroundColor: 'transparent',
  },
  contentMainContainer: {
    flex: 8.5,
    backgroundColor: '#f7f9fa',
  },
  spaceBetweenContainer: {
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
    paddingTop: 5,
    paddingBottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  infoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
  },
   columnContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 5,
  },
  infoRowLeftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoRowRightContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  textInfoField: {
    fontSize: 14,
    color: '#11c6f8',
  },
  blueBorderBlock: {
    borderWidth: 2,
    borderColor: '#11c6f8',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfoValue: {
    fontSize: 14,
  },
  starContainer: {
    flexDirection: 'row',
  },
  textProfessionalName: {
    fontSize: 14,
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
  avatarContainer: {
    height: 135,
    backgroundColor: '#F7F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageAvatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  avatarWrapper: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginVertical: 10
  },
  blueText:{
    color: '#11c6f8',
  },
  blackText:{
    color: '#000',
  },
  infoBlock: {
    borderWidth: 1,
    borderColor: '#f0f1f1',
    backgroundColor: '#fff',
    marginBottom: 10
  },
  negativeMargin: {
    marginHorizontal: -10,
  }
});

export default connect(state => ({
    auth: state.auth,
    explore: state.explore,
    user: state.profile.user,
  })
)(ClientProfileForm);