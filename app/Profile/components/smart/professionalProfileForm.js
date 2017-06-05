import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
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
import { SegmentedControls } from 'react-native-radio-buttons';
import ImageProgress from 'react-native-image-progress';

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
const avatarDefault = require('../../../Assets/images/avatar.png');
const goToClient = require('../../../Assets/images/go_to_client.png');
const ownSpace = require('../../../Assets/images/own_space.png');

const strengthTraining = require('../../../Assets/images/strength_training.png');
const pilates = require('../../../Assets/images/pilates.png');
const yoga = require('../../../Assets/images/yoga.png');
const totalWorkout = require('../../../Assets/images/total_workout.png');

const constants = {
  BASIC_INFO: 'BASIC INFO',
  CALENDAR: 'CALENDAR'
};

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
    // Actions.EditProfile();
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
    const { selectedOption } = this.state;

    return (
      editable ?
        <View style={ styles.navigateButtons }>
          <View style={ styles.navBarContainer }>
            <View style={ styles.navButtonWrapper }/>

            <View style={ styles.navBarTitleContainer }>
              <Text style={ styles.textTitle }>TITLE</Text>

            </View>
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
          <View style={ styles.navBarTitleContainer }>
            <Text style={ styles.textTitle }>{ this.user.name && this.user.name.toUpperCase() }
              <Image source={ verified } style={ styles.imageVerified }/>
            </Text>
            <Text style={ styles.textSubTitle }>New good life, Fitness</Text>
          </View>
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

    return (
      R.isEmpty(user) ?
        <FullScreenLoader/>
        :
        <View style={ styles.container }>
          <Image source={ background } style={ styles.background } resizeMode="cover">

            { this.showNavBar }

            <View style={ styles.contentContainer }>
              <View style={ editable ? styles.avatarContainer : styles.avatarContainerWithBtn }>
                <View style={ styles.avatarWrapper }>
                  { this.user.avatar ?
                    <ImageProgress source={ {uri: this.user.avatar} } indicator={ActivityIndicator} style={ styles.imageAvatar } resizeMode="cover"/>
                    :
                    <Image source={ avatarDefault } style={ styles.imageAvatar } resizeMode="cover"/>
                  }
                </View>
                {
                  editable ?
                    <View style={ styles.navBarTitleContainer }>
                      <Text style={ [styles.textTitle, styles.blackText] }>{ this.user.name && this.user.name.toUpperCase() }
                        <Image source={ verified } style={ styles.imageVerified }/>
                      </Text>
                    </View>
                    :
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
                }

              </View>

              <View style={ [styles.contentMainContainer, editable ? { paddingBottom: 50 } : { paddingBottom: 0 }]}>
                {
                  editable ? <View style={ styles.actionContainer }/> : this.showActions
                }
                <ScrollView>
                  <View style={ [styles.infoContainer, styles.infoBlock] }>
                    <Text style={ styles.textInfoTitle }>BASIC INFO</Text>
                    <View style={ styles.infoRowContainer }>
                      <View style={ styles.columnContainer }>
                        <View style={ styles.infoRowLeftContainer }>
                          <Text style={ [styles.fontStyles, styles.textInfoField] }>Gender : </Text>
                          <Text style={ [styles.fontStyles, styles.textInfoValue] }>{this.user.gender}</Text>
                        </View>
                        <View style={ styles.infoRowLeftContainer }>
                          <Text style={ [styles.fontStyles, styles.textInfoField] }>Age : </Text>
                          <Text style={ [styles.fontStyles, styles.textInfoValue] }>{this.user.age} years old</Text>
                        </View>
                        <View style={ styles.infoRowLeftContainer }>
                          <Text style={ [styles.fontStyles, styles.textInfoField] }>Insured : </Text>
                          <Text style={ [styles.fontStyles, styles.textInfoValue] }>{this.user.insured ? 'Yes':'No'}</Text>
                        </View>
                      </View>
                      <View style={ [styles.columnContainer, styles.leftPadding] }>
                        <View style={ styles.infoRowLeftContainer }>
                          <Text style={ [styles.fontStyles, styles.textInfoField] }>Profession : </Text>
                          <Text style={ [styles.fontStyles, styles.textInfoValue] }>{this.user.profession.name}</Text>
                        </View>
                        <View style={ styles.infoRowLeftContainer }>
                          <Text style={ [styles.fontStyles, styles.textInfoField] }>Certification : </Text>
                          <Text style={ [styles.fontStyles, styles.textInfoValue] }>{this.user.certification}</Text>
                        </View>
                        <View style={ styles.infoRowLeftContainer }>
                          <Text style={ [styles.fontStyles, styles.textInfoField] }>Years of experience : </Text>
                          <Text style={ [styles.fontStyles, styles.textInfoValue] }>{this.user.experience}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={ styles.infoRowContainer }>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ [styles.fontStyles, styles.textInfoField] }>Location : </Text>
                        <Text style={ [styles.fontStyles, styles.textInfoValue, styles.locationStyle] }>{this.user.address.formattedAddress || this.user.location.city}</Text>
                      </View>
                    </View>
                    <View style={ [styles.infoRowContainer, styles.actionIconContainer] }>
                      {
                        this.user.toClient &&
                        <View style={styles.actionIcon}>
                          <Image source={ goToClient } style={ styles.actionIconImage } resizeMode="cover"/>
                          <Text>Go to client</Text>
                        </View>
                      }
                      {
                        this.user.ownSpace &&
                        <View style={styles.actionIcon}>
                          <Image source={ ownSpace } style={ styles.actionIconImage } resizeMode="cover"/>
                          <Text>Own space</Text>
                        </View>
                      }
                    </View>
                  </View>

                  <View style={ [styles.infoContainer, styles.infoBlock] }>
                    <Text style={ styles.textInfoTitle }>ABOUT ME</Text>
                    <Text style={ [styles.fontStyles, styles.textInfoValue] }>{user.description}</Text>
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
    // flex: 0.7,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 20,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigateButtons: {
    flex:1.4,
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 5,
  },
  navButtonWrapper: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
    height: 135,
    backgroundColor: '#F7F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainerWithBtn: {
    height: 155,
    backgroundColor: '#F7F9FA',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 80,
    width: 80,
    borderRadius: 40,
    marginVertical: 10
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
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  textInfoField: {
    fontSize: 14,
    color: '#11c6f8',
  },
  textInfoValue: {
    fontSize: 14,
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
  blackText:{
    color: '#000',
  },
  leftPadding:{
    paddingLeft: 20,
  },
  fontStyles: {
    fontFamily: 'Open Sans',
    fontSize: 18,
  },
});

export default connect(state => ({
    auth: state.auth,
    explore: state.explore,
    user: state.profile.user,
  })
)(ProfessionalProfileForm);