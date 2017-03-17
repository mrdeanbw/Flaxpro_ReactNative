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
const avatar = require('../../../Assets/avatar1.png');
const call = require('../../../Assets/call.png');
const message = require('../../../Assets/message.png');
const refer = require('../../../Assets/refer.png');
const hire = require('../../../Assets/hire.png');
const offer = require('../../../Assets/offer.png');
const verified = require('../../../Assets/verified.png');


const strengthTraining = require('../../../Assets/strength_training.png');
const pilates = require('../../../Assets/pilates.png');
const yoga = require('../../../Assets/yoga.png');
const totalWorkout = require('../../../Assets/total_workout.png');

export default class TrainerProfileForm extends Component {

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

  onCall() {
    alert( 'Tapped onCall!');
  }

  onMessage() {
    alert( 'Tapped onMessage!');
  }

  onReferToFriend() {
    alert( 'Tapped onReferToFriend!');
  }

  onHire() {
    alert( 'Tapped onHire!');
  }

  onMakeAnOffer() {
    alert( 'Tapped onMakeAnOffer!');
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
          prevButtonText={'<'}
          showControls={ true }
          showEventIndicators={ true }
          isSelectableDay={ false }
        />
      :
        null
    );
  }

  get showNavBar() {
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
          <View style={ styles.navBarTitleContainer }>
            <Text style={ styles.textTitle }>ADAM LIPSKI</Text>
            <Text style={ styles.textSubTitle }>New good life, Fitness</Text>
          </View>
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
          <View style={ styles.navBarTitleContainer }>
            <Text style={ styles.textTitle }>ADAM LIPSKI</Text>
            <Text style={ styles.textSubTitle }>New good life, Fitness</Text>
          </View>
          <View style={ styles.navButtonWrapper }/>          
        </View>
    );
  }

  get showActions() {
    return (
      <View style={ styles.actionContainer }>
        <View style={ styles.actionCell }>
          <TouchableOpacity
            onPress={ () => this.onCall() }
          >
            <Image source={ call } style={ styles.imageButton } />
          </TouchableOpacity>
        </View>
        
        <View style={ styles.actionCell }>
          <TouchableOpacity
            onPress={ () => this.onMessage() }
          >
            <Image source={ message } style={ styles.imageButton } />
          </TouchableOpacity>
        </View>
        
        <View style={ styles.actionCell }>
          <TouchableOpacity
            onPress={ () => this.onReferToFriend() }
          >
            <Image source={ refer } style={ styles.imageButton }>
              <Text style={ styles.textActionMiddle }>REFER TO FRIEND</Text>
            </Image>
          </TouchableOpacity>
        </View>

        <View style={ styles.actionCell }>
          <TouchableOpacity
            onPress={ () => this.onHire() }
          >
            <Image source={ hire } style={ styles.imageButton }>
              <Text style={ styles.textActionSmall }>HIRE NOW</Text>
              <Text style={ styles.textActionLarge }>$250</Text>
            </Image>  
          </TouchableOpacity>
        </View>

        <View style={ styles.actionCell }>
          <TouchableOpacity
            onPress={ () => this.onMakeAnOffer() }
          >
            <Image source={ offer } style={ styles.imageButton }>
              <Text style={ styles.textActionMiddle }>MAKE AN OFFER</Text>
            </Image>  
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { status, editable } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          
          { this.showNavBar }

          <View style={ styles.contentContainer }>
            <View style={ styles.avatarContainer }>
              <View style={ styles.avatarTopBackground }/>
              <View style={ styles.avatarBottomBackground }/>
              <View style={ styles.avatarWrapper }>
                <Image source={ avatar } style={ styles.imageAvatar } resizeMode="cover"/>
                <Image source={ verified } style={ styles.imageVerified }/>
              </View>
            </View>
            <View style={ [styles.contentMainContainer, editable ? { paddingBottom: 50 } : { paddingBottom: 0 }]}>
              {
                editable ? <View style={ styles.actionContainer }/> : this.showActions
              }
              <ScrollView>
                <View style={ styles.infoContainer }>
                  <Text style={ styles.textInfoTitle }>BASIC INFO</Text>                  
                  <View style={ styles.infoRowContainer }>
                    <View style={ styles.infoRowLeftContainer }>
                      <Text style={ styles.textInfoField }>Sex : </Text>
                      <Text style={ styles.textInfoValue }>Male</Text>
                    </View>
                    <View style={ styles.infoRowRightContainer }>
                      <Text style={ styles.textInfoField }>Year of experience : </Text>
                      <Text style={ styles.textInfoValue }>2004</Text>
                    </View>
                  </View>
                  <View style={ styles.infoRowContainer }>
                    <View style={ styles.infoRowLeftContainer }>
                      <Text style={ styles.textInfoField }>Affiliation : </Text>
                      <Text style={ styles.textInfoValue }>Gym</Text>
                    </View>
                    <View style={ styles.infoRowRightContainer }>
                      <Text style={ styles.textInfoField }>Certification : </Text>
                      <Text style={ styles.textInfoValue }>Certified Personal Trainer</Text>
                    </View>
                  </View>
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
  navBarTitleContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {    
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  },
  textSubTitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 10,
    paddingVertical: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
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
  imageVerified: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: 0,
    bottom: 0,
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
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    paddingVertical: 5,    
  },
  actionCell: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (width - 40) / 5,
  },
  imageButton: {
    width: (width - 40) / 5,
    height: (width - 40) / 5 * 0.34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textActionLarge: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  textActionMiddle: {
    color: '#fff',
    fontSize: 8,
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  textActionSmall: {
    color: '#fff',
    fontSize: 6,
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
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
    fontSize: 12,
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
