import React, { Component, PropTypes } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Stars from 'react-native-stars-rating';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import R from 'ramda';
import { SegmentedControls } from 'react-native-radio-buttons';
import ImageProgress from 'react-native-image-progress';
import PopupDialog from 'react-native-popup-dialog';

import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor,
  PRICES as prices,
  INFO_CALENDAR_OPTIONS as constants,
} from '../../../../Components/commonConstant';

import FullScreenLoader from '../../../../Components/fullScreenLoader';


const background = require('../../../../Assets/images/background.png');
const schedule = require('../../../../Assets/images/schedule.png');
const edit = require('../../../../Assets/images/edit.png');
const call = require('../../../../Assets/images/call.png');
const message = require('../../../../Assets/images/message.png');
const refer = require('../../../../Assets/images/refer.png');
const hire = require('../../../../Assets/images/hire.png');
const offer = require('../../../../Assets/images/offer.png');
const verified = require('../../../../Assets/images/verified.png');
const avatarDefault = require('../../../../Assets/images/avatar.png');
const goToClient = require('../../../../Assets/images/go_to_client.png');
const ownSpace = require('../../../../Assets/images/own_space.png');

const callCircle = require('../../../../Assets/images/call_circle.png');
const referToFriends = require('../../../../Assets/images/refer_to_friends.png');
const customOffer = require('../../../../Assets/images/custom_offer.png');
const availability = require('../../../../Assets/images/avability.png');

const pilates = require('../../../../Assets/images/pilates.png');
const yoga = require('../../../../Assets/images/yoga.png');
import { Reviews } from '../../../../Components/dummyEntries'
import Moment from 'moment';

export default class ProfessionalProfileForm extends Component {

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

  onChangeOptions(option) {
    const { selectedOption } = this.state;

    if (selectedOption !== option) {
      const { getSchedule } = this.props;
      getSchedule();
      this.onSchedule();
      this.setState({ selectedOption });
    }
  }

  onShowMoreLess(showMode) {
    this.setState({ showMoreOrLess: showMode });
  }

  onMessage() {
    this.closeCommunicationPopup();
    this.onShowMoreLess(true);
    this.props.inboxActions.activateChatByUserId(this.props.user.user, this.props.user.name);
    Actions.ChatForm();
  }

  onHire() {
    this.onShowMoreLess(true);
    Actions.Contract({ user: this.user, editable: false });
  }

  onCall() {
    this.closeCommunicationPopup();
    Alert.alert('Coming soon!');
  }

  onReferToFriend() {
    this.closeCommunicationPopup();
    Alert.alert('Coming soon!');
  }

  onMakeAnOffer() {
    this.closeCommunicationPopup();
    this.onShowMoreLess(true);
    Actions.Contract({ user: this.user, editable: true });
  }

  onGetAvailability() {
    this.closeCommunicationPopup();
    this.onShowMoreLess(true);
    const { getScheduleById, profile: { user } } = this.props;
    getScheduleById({ user });
    Actions.ScheduleForm({ editable: false });
  }

  onBack() {
    this.onShowMoreLess(true);
    Actions.pop();
  }

  onClickAddress = () => {
    const filterObj = {
      locationType: 'address',
      lat: this.props.user.coordinate.latitude,
      lon: this.props.user.coordinate.longitude
    };
    this.props.exploreActions.getProfessionals(filterObj);
    Actions.pop();
  }

  openCommunicationPopup () {
    this.popupDialogCommunication.openDialog ();
  }

  closeCommunicationPopup () {
    this.popupDialogCommunication.closeDialog ();
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
            <TouchableOpacity onPress={() => this.onMakeAnOffer()} >
              <View style={ styles.communicationBtnContainer }>
                <Image
                  source={ customOffer }
                  style={ styles.communicationBtnIcon }
                />
                <Text style={ styles.communicationBtnText }>Custom Offer</Text>
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

  get showNoEditableInfo() {
    return (
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
            <Text style={ [styles.fontStyles, styles.textInfoValue] }>{this.user.profession && this.user.profession.name}</Text>
          </View>
          <View style={ styles.infoRowLeftContainer }>
            <Text style={ [styles.fontStyles, styles.textInfoField] }>Certification : </Text>
            <Text style={ [styles.fontStyles, styles.textInfoValue] }>{this.user.certification}</Text>
          </View>
          <View style={ styles.infoRowLeftContainer }>
            <Text style={ [styles.fontStyles, styles.textInfoField] }>Years of experience : </Text>
            <Text style={ [styles.fontStyles, styles.textInfoValue] }>{Moment().format('Y') - this.user.experience}</Text>
          </View>
        </View>
      </View>
    );
  }

  get showEditableInfo() {
    return (
      <View style={ styles.infoRowContainer }>
        <View style={ styles.columnContainer }>
          <View style={ styles.infoRowLeftContainer }>
            <Text style={ [styles.fontStyles, styles.textInfoField] }>Sex : </Text>
            <Text style={ [styles.fontStyles, styles.textInfoValue] }>{this.user.gender}</Text>
          </View>
          <View style={ styles.infoRowLeftContainer }>
            <Text style={ [styles.fontStyles, styles.textInfoField] }>Affiliation : </Text>
            <Text style={ [styles.fontStyles, styles.textInfoValue] }>{this.user.affiliation || 'Gym'}</Text>
          </View>
        </View>
        <View style={ [styles.columnContainer, styles.leftPadding, styles.container] }>
          <View style={ styles.infoRowLeftContainer }>
            <Text style={ [styles.fontStyles, styles.textInfoField] }>Years of experience : </Text>
            <Text style={ [styles.fontStyles, styles.textInfoValue] }>{Moment().format('Y') - this.user.experience}</Text>
          </View>
          <View style={ styles.infoRowLeftContainer }>
            <Text style={ [styles.fontStyles, styles.textInfoField] }>Certification : </Text>
            <Text style={ [styles.fontStyles, styles.textInfoValue, styles.container] }
                  ellipsizeMode="tail"
                  numberOfLines={1}
            >
              {this.user.certification}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { editable, profile: { user } } = this.props;
    const { showMoreOrLess } = this.state;
    this.user = user;
    const reviews = (user.reviews && user.reviews.length) ? user.reviews : Reviews;

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
                        <TouchableOpacity onPress={() => this.onMessage()} >
                          <Text style={ [styles.greenBtnText, styles.btnTextHeader, styles.textGreen] } >MESSAGE</Text>
                          <Text style={ [styles.greenBtnText, styles.btnText, styles.textGreen] }>TO DISSCUS CUSTOM ORDER</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={ styles.greenBtn }>
                        <TouchableOpacity
                          onPress={ () => this.onHire() }
                        >
                          <Text style={ [styles.greenBtnText, styles.btnTextHeader, styles.textWhite] } >HIRE NOW</Text>

                          <Text style={ [styles.greenBtnText, styles.btnText, styles.textWhite] } >
                            <Text style={ [styles.greenBtnText, styles.btnTextHeader, styles.textWhite] }>${this.user.price} </Text>
                            / PER SESSION
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                }

              </View>

              <View style={ [styles.contentMainContainer, editable ? { paddingBottom: 50 } : { paddingBottom: 0 }]}>
                <ScrollView>
                  <View style={ [styles.infoContainer, styles.infoBlock] }>
                    <Text style={ styles.textInfoTitle }>BASIC INFO</Text>
                    {
                      editable ? this.showEditableInfo : this.showNoEditableInfo
                    }
                    <View style={ styles.infoRowContainer }>
                      <View style={ styles.infoRowLeftContainer }>
                        <Text style={ [styles.fontStyles, styles.textInfoField] }>Location : </Text>
                        { editable?
                        <View style={ [styles.container, styles.rowDirection] }>
                          <Text style={ [styles.fontStyles, styles.textInfoValue, styles.locationStyle] }
                                ellipsizeMode="tail"
                                numberOfLines={1}
                          >
                            {this.user.location.originalAddress || this.user.location.city}
                          </Text>
                        </View>
                        :
                        <TouchableOpacity style={ [styles.container, styles.rowDirection] } onPress={(e)=>this.onClickAddress()} >
                          <Text style={ [styles.fontStyles, styles.textInfoValue, styles.locationStyle] }
                                ellipsizeMode="tail"
                                numberOfLines={1}
                          >
                            {this.user.location.originalAddress || this.user.location.city}
                          </Text>
                        </TouchableOpacity>
                        }
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
  communicationClose: {position: 'absolute',
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
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#b5e07b',
    borderRadius: 20,
    paddingVertical:5,
    paddingHorizontal:10,
    marginHorizontal: 5,
  },
  emptyGreenBtn: {
    borderWidth: 1,
    borderColor: '#b5e07b',
    flex:1,
    flexDirection: 'column',
    borderRadius: 20,
    paddingVertical:5,
    paddingHorizontal:10,
    marginHorizontal: 5,
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
    flex: 1,
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
