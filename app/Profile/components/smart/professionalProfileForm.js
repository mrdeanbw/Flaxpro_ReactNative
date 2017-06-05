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
import { connect } from 'react-redux';
import Stars from 'react-native-stars-rating';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import R from 'ramda';

import Calendar from './calendar/Calendar';
import FullScreenLoader from '../../../Components/fullScreenLoader';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');
const schedule = require('../../../Assets/images/schedule.png');
const edit = require('../../../Assets/images/edit.png');
const call = require('../../../Assets/images/call.png');
const message = require('../../../Assets/images/message.png');
const refer = require('../../../Assets/images/refer.png');
const hire = require('../../../Assets/images/hire.png');
const offer = require('../../../Assets/images/offer.png');
const verified = require('../../../Assets/images/verified.png');


const strengthTraining = require('../../../Assets/images/strength_training.png');
const pilates = require('../../../Assets/images/pilates.png');
const yoga = require('../../../Assets/images/yoga.png');
const totalWorkout = require('../../../Assets/images/total_workout.png');

class ProfessionalProfileForm extends Component {

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
    Actions.Payment();
  }

  onMakeAnOffer() {
    Actions.ProposeTerms({ user: this.user });
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

    console.log('===========', editable);
    return (
      editable ?
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
          {/*<TouchableOpacity*/}
            {/*onPress={ () => this.onSchdule() }*/}
            {/*style={ styles.navButtonWrapper }*/}
          {/*>*/}
            {/*<Image source={ schedule } style={ styles.imageSchedule } resizeMode="cover"/>*/}
          {/*</TouchableOpacity>*/}
          <View style={ styles.navBarTitleContainer }>
            <Text style={ styles.textTitle }>{ this.user.name && this.user.name.toUpperCase() }
              <Image source={ verified } style={ styles.imageVerified }/>
            </Text>

            <Text style={ styles.textSubTitle }>New good life, Fitness</Text>
          </View>
          {/*<TouchableOpacity*/}
            {/*onPress={ () => this.onEdit() }*/}
            {/*style={ styles.navButtonWrapper }*/}
          {/*>*/}
            {/*<Image source={ edit } style={ styles.imageEdit } resizeMode="cover"/>*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity
            onPress={ () => this.onBack() }
            style={ styles.navButtonWrapper }
          >
            <EntypoIcons
              name="dots-three-vertical"  size={ 25 }
              color="#fff"
            />
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
            <Text style={ styles.textTitle }>{ this.user.name && this.user.name.toUpperCase() }</Text>
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
              <Text style={ styles.textActionLarge }>${ this.user.amount }</Text>
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
    const { editable, user } = this.props;
    this.user = user;
    console.log('================', user);

    return (
      R.isEmpty(user) ?
        <FullScreenLoader/>
        :
        <View style={ styles.container }>
          <Image source={ background } style={ styles.background } resizeMode="cover">

            { this.showNavBar }

            <View style={ styles.contentContainer }>
              <View style={ styles.avatarContainer }>
                <View style={ styles.avatarWrapper }>
                  <Image source={ this.user.avatar } style={ styles.imageAvatar } resizeMode="cover"/>
                </View>
                <View style={ styles.actionBtnContainer }>
                  <View style={ styles.emptyGreenBtn }>
                    <Text style={ [styles.greenBtnText, styles.btnTextHeader, styles.textGreen] } >MESSAGE</Text>
                    <Text style={ [styles.greenBtnText, styles.btnText, styles.textGreen] }>TO DISSCUS CUSTOM ORDER</Text>
                  </View>
                  <View style={ styles.greenBtn }>
                    <Text style={ [styles.greenBtnText, styles.btnTextHeader, styles.textWhite] } >HIRE NOW</Text>

                    <Text style={ [styles.greenBtnText, styles.btnText, styles.textWhite] } >
                      <Text style={ [styles.greenBtnText, styles.btnTextHeader, styles.textWhite] }>$50 </Text>
                      / PER SESSION
                    </Text>
                  </View>
                </View>
              </View>

              <View style={ [styles.contentMainContainer, editable ? { paddingBottom: 50 } : { paddingBottom: 0 }]}>
                {
                  editable ? <View style={ styles.actionContainer }/> : this.showActions
                }
                <ScrollView>
                  <View style={ [styles.infoContainer, styles.infoBlock] }>
                    <Text style={ styles.textInfoTitle }>BASIC INFO</Text>
                    <View style={ styles.infoRowContainer }>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ styles.textInfoField }>Gender : </Text>
                        <Text style={ styles.textInfoValue }>Female</Text>
                      </View>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ styles.textInfoField }>Profession : </Text>
                        <Text style={ styles.textInfoValue }>Fitnes trenner</Text>
                      </View>
                    </View>
                    <View style={ styles.infoRowContainer }>
                      <View style={ styles.infoRowRightContainer }>
                        <Text style={ styles.textInfoField }>Age : </Text>
                        <Text style={ styles.textInfoValue }>26 years old</Text>
                      </View>
                      <View style={ styles.infoRowRightContainer }>
                        <Text style={ styles.textInfoField }>Certification : </Text>
                        <Text style={ styles.textInfoValue }>Certified Personal Professional</Text>
                      </View>
                    </View>
                    <View style={ styles.infoRowContainer }>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ styles.textInfoField }>Insured : </Text>
                        <Text style={ styles.textInfoValue }>true</Text>
                      </View>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ styles.textInfoField }>Years of experience : </Text>
                        <Text style={ styles.textInfoValue }>2008</Text>
                      </View>
                    </View>
                    <View style={ styles.infoRowContainer }>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ styles.textInfoField }>Location : </Text>
                        <Text style={ [styles.textInfoValue, styles.locationStyle] }>4 York st, Toronto ON L54 N7</Text>
                      </View>
                    </View>
                    <View style={ [styles.infoRowContainer, styles.actionIconContainer] }>
                      <View style={styles.actionIcon}>
                        <Image source={ this.user.avatar } style={ styles.actionIconImage } resizeMode="cover"/>
                        <Text>Go to client</Text>
                      </View>
                      <View style={styles.actionIcon}>
                        <Image source={ this.user.avatar } style={ styles.actionIconImage } resizeMode="cover"/>
                        <Text>Own space</Text>
                      </View>
                    </View>
                  </View>
                  <View style={ [styles.infoContainer, styles.infoBlock] }>
                    <Text style={ styles.textInfoTitle }>ABOUT ME</Text>
                    <Text style={ styles.textInfoValue }>O trained for many years, and I'm very confident about the skullset I developed over the years.</Text>
                  </View>

                  <View style={ [styles.infoContainer, styles.infoBlock] }>
                    <Text style={ [styles.textInfoTitle] }>REVIEWS</Text>

                    <View style={ styles.infoContainer }>
                      <View style={ styles.starContainer }>
                        <Text style={ styles.textProfessionalName }>Mark</Text>
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
                        <Text style={ styles.textProfessionalName }>Alex</Text>
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
  actionIconImage:  {
    width: 40,
    height: 40
  },
  actionIcon: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 100,
    padding: 5
  },

  actionIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationStyle: {
    borderWidth: 1,
    borderColor: '#0fcefc',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  btnTextHeader: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  btnText: {
    fontSize: 10,
  },
  textGreen: {
    color: '#b5e07b'
  },
  textWhite: {
    color: '#fff'
  },
  greenBtnText: {
    textAlign: 'center',
    flexDirection: 'row',
  },
  greenBtn: {
    flexDirection: 'column',
    backgroundColor: '#b5e07b',
    borderRadius: 20,
    width: 180,
    padding:5

  },
  emptyGreenBtn: {
    borderWidth: 1,
    borderColor: '#b5e07b',
    width: 180,
    borderRadius: 20,
    padding:5,

  },
  actionBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },

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
    height: 155,
    backgroundColor: '#F7F9FA'
  },

  imageAvatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  imageVerified: {
    height: 20,
    width: 20,
    marginTop: 5,
    marginLeft: 5,
  },
  avatarWrapper: {
    backgroundColor: '#fff',
    marginLeft: width / 2 - 32,
    height: 64,
    width: 64,
    borderRadius: 32,
    marginTop: 10,
    marginBottom: 30
  },
  contentContainer: {
    flex: 8.5,
    backgroundColor: '#f7f9fa',
  },
  contentMainContainer: {
    flex: 8.5,
    backgroundColor: '#f7f9fa',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
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
  infoBlock: {
    borderWidth: 1,
    borderColor: '#f0f1f1',
    backgroundColor: '#fff',
    marginBottom: 10
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
    auth: state.auth,
    explore: state.explore,
    user: state.profile.user,
  })
)(ProfessionalProfileForm);