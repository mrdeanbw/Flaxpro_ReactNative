import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { SegmentedControls } from 'react-native-radio-buttons';
import Stars from 'react-native-stars-rating';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ImageProgress from 'react-native-image-progress';
import R from 'ramda';
import PopupDialog from 'react-native-popup-dialog';

import FullScreenLoader from '../../../../Components/fullScreenLoader';

import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor,
  PRICES as prices,
  INFO_CALENDAR_OPTIONS as constants,
} from '../../../../Components/commonConstant';

const background = require('../../../../Assets/images/background.png');
const schedule = require('../../../../Assets/images/schedule.png');
const edit = require('../../../../Assets/images/edit.png');
const pilates = require('../../../../Assets/images/pilates.png');
const yoga = require('../../../../Assets/images/yoga.png');
const avatarDefault = require('../../../../Assets/images/avatar.png');

const callCircle = require('../../../../Assets/images/call_circle.png');
const referToFriends = require('../../../../Assets/images/refer_to_friends.png');
const messageCircle = require('../../../../Assets/images/message_circle.png');
const availability = require('../../../../Assets/images/avability.png');

//auth redux store
import { Reviews } from '../../../../Components/dummyEntries'

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
      selectedOption: constants.BASIC_INFO,
    };
  }

  onSchedule() {
    this.onShowMoreLess(true);
    Actions.ScheduleForm();
  }

  onEdit() {
    this.onShowMoreLess(true);
    Actions.EditProfile();
  }

  onShowMoreLess(showMode) {
    this.setState({ showMoreOrLess: showMode });
  }

  onBack() {
    this.onShowMoreLess(true);
    Actions.pop();
  }

  onChangeOptions(option) {
    const { selectedOption } = this.state;

    if (selectedOption !== option) {
      const { getSchedule } = this.props;
      getSchedule();
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

  get getShowNavBar() {
    const { editable, profile: { user } } = this.props;
    const { selectedOption } = this.state;

    return (
      editable ?
        <View style={ styles.navigateButtons }>
          <View style={ styles.navBarContainer }>
            <View style={ styles.navButtonWrapper }/>

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
          <TouchableOpacity
            onPress={ () => this.openCommunicationPopup() }
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
  prepareProfessions() {
    const { explore: { professions }, profile: { user } } = this.props;
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

  onCustomOffer() {
    this.onShowMoreLess(true);
    Actions.Contract({ user: this.props.profile.user });
  }

  onShowSessions() {
    this.onShowMoreLess(true);
    const { getMySessions } = this.props;
    getMySessions({byField: 'profession'})
    Actions.Sessions();
  }

  openCommunicationPopup () {
    this.popupDialogCommunication.openDialog ();
  }

  closeCommunicationPopup () {
    this.popupDialogCommunication.closeDialog ();
  }
  onCall() {
    this.closeCommunicationPopup();
    Alert.alert('Coming soon!');
  }
  onReferToFriend() {
    this.closeCommunicationPopup();
    Alert.alert('Coming soon!');
  }
  onMessage() {
    this.closeCommunicationPopup();
    this.onShowMoreLess(true);
    Actions.ChatForm({ userName: this.props.profile.name });
  }
  onGetAvailability() {
    this.closeCommunicationPopup();
    this.onShowMoreLess(true);
    const { getScheduleById, profile: { user } } = this.props;
    getScheduleById({ user });
    Actions.ScheduleForm({ editable: false });
  }

  get dialogCommunication () {
    return (
      <PopupDialog
        ref={ (popupDialogCommunication) => { this.popupDialogCommunication = popupDialogCommunication; }}
        width={ width * 0.7 }
        dialogStyle={ styles.dialogContainer }
      >
        <View style={ styles.communicationDialogContainer }>
          <View style={ styles.communicationDialogTopContainer }>
            <EvilIcons
              style={ styles.communicationClose }
              onPress={ () => this.closeCommunicationPopup() }
              name="close"
              size={ 30 }
            />
          </View>
          <View  style={ styles.communicationBtnBlock }>
            <TouchableOpacity onPress={() => this.onCall()} >
              <View style={ styles.communicationBtnContainer }>
                <Image
                  source={ callCircle }
                  style={ styles.communicationBtnIcon }
                />
                <Text style={ styles.communicationBtnText }>Call</Text>
              </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onMessage()} >
              <View style={ styles.communicationBtnContainer }>
                <Image
                  source={ messageCircle }
                  style={ styles.communicationBtnIcon }
                />
                <Text style={ styles.communicationBtnText }>Message</Text>
              </View>

            </TouchableOpacity>
          </View>
          <View  style={ styles.communicationBtnBlock }>
            <TouchableOpacity onPress={() => this.onReferToFriend()} >
              <View style={ styles.communicationBtnContainer }>
                <Image
                  source={ referToFriends }
                  style={ styles.communicationBtnIcon }
                />
                <Text style={ styles.communicationBtnText }>Refer to friends</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onGetAvailability()} >
              <View style={ styles.communicationBtnContainer }>
                <Image
                  source={ availability }
                  style={ styles.communicationBtnIcon }
                />
                <Text style={ styles.communicationBtnText }>Availability</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View  style={ styles.communicationBtnBlock }>

          </View>
        </View>
      </PopupDialog>
    );
  }

  render() {
    const { editable, profile: { user } } = this.props;
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
              {
                editable ?
                  <Text style={ [styles.fontStyles, styles.textTitle, styles.blackText] }>{ user.name && user.name.toUpperCase() }</Text>
                  :
                  <View style={ [styles.borderStyle, styles.customOffer] }>
                    <TouchableOpacity
                      onPress={ () => this.onCustomOffer() }
                    >
                      <Text style={ styles.textActionMiddle }>CUSTOM OFFER</Text>
                    </TouchableOpacity>
                  </View>
              }
            </View>

            <View style={ [styles.contentMainContainer, editable ? { paddingBottom: 50 } : { paddingBottom: 0 }]}>
              <ScrollView>
                <View style={ [styles.infoContainer, styles.infoBlock] }>
                  {
                    editable &&
                    <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onShowSessions() } style={ [styles.absoluteRightTop] }>
                      <View style={ [styles.infoRowRightContainer, styles.blueBorderBlock] }>
                        <Text style={ [styles.fontStyles, styles.textInfoValue] }>Total Sessions </Text>
                        <Text style={ [styles.textInfoTitle, styles.blueText] }>{user.totalSessions}</Text>
                      </View>
                    </TouchableOpacity>
                  }
                  <Text style={ styles.textInfoTitle }>BASIC INFO</Text>
                  <View style={ [styles.spaceBetweenContainer] }>
                    <View style={ styles.columnContainer }>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ [styles.fontStyles, styles.textInfoField] }>Gender : </Text>
                        <Text style={ [styles.fontStyles, styles.textInfoValue] }>{user.gender}</Text>
                      </View>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ [styles.fontStyles, styles.textInfoField] }>Age : </Text>
                        <Text style={ [styles.fontStyles, styles.textInfoValue] }>{user.age} years old</Text>
                      </View>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ [styles.fontStyles, styles.textInfoField] }>Address : </Text>
                        <View style={ [styles.container, styles.rowDirection] }>
                          <Text style={ [styles.fontStyles, styles.textInfoValue, !editable && styles.borderStyle] }
                                ellipsizeMode="tail"
                                numberOfLines={1}
                          >
                            {user.location.originalAddress || user.location.city}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                {
                  editable &&
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
                }
                <View style={ [styles.infoContainer, styles.infoBlock] }>
                  <Text style={ styles.textInfoTitle }>{ editable?'ABOUT ME': user.name && 'ABOUT '+ user.name.toUpperCase()}</Text>
                  <Text style={ [styles.fontStyles, styles.textInfoValue] } numberOfLines={8}>{user.description.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ')}</Text>
                </View>

                <View style={ [styles.infoContainer, styles.infoBlock] }>
                  <Text style={ [styles.textInfoTitle] }>REVIEWS</Text>
                  { reviews && reviews.map((review, index) => {
                    if (showMoreOrLess && index >= 1) return null;
                    return (
                      <View style={ styles.columnContainer } key={index}>
                        <View style={ styles.rowDirection }>
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
          { this.dialogCommunication }
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
  borderStyle: {
    borderWidth: 1,
    borderColor: '#0fcefc',
    borderRadius: 10,
    paddingHorizontal: 10,
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
  absoluteRightTop: {
    position: 'absolute',
    zIndex:10,
    top: 10,
    right: 10
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
     flex: 1,
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
  rowDirection: {
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
    height: 140,
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
  },
  customOffer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15
  },
  communicationBtnText: {
    marginTop: 5,
    fontSize: 11
  },
  communicationBtnIcon: {
    width: 60,
    height: 60,
  },
  communicationBtnContainer: {
    width: width * 0.3,
    alignItems: 'center',
  },
  communicationBtnBlock: {
    flexDirection: 'row',
    marginTop: 20
  },
  communicationClose: {
    position: 'absolute',
    right: 7,
    top: 7,
    color: 'gray'
  },
  dialogContainer: {
    backgroundColor: 'transparent',
  },
  communicationDialogContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: width * 0.7,
    borderRadius: 20,
  },
  communicationDialogTopContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'stretch',
  },
});
