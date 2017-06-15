import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Slider,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import Calendar from '../../../../Profile/components/smart/calendar/Calendar';
import Ramda from 'ramda';
import Moment from 'moment';

const background = require('../../../../Assets/images/background.png');
import * as CommonConstant from '../../../../Components/commonConstant';
const width = CommonConstant.WIDTH_SCREEN;
const height = CommonConstant.HEIHT_SCREEN;
const fontStyles = CommonConstant.FONT_STYLES;


export default class ContractSecondForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfSessions: props.hire.numberOfSessions,
      numberOfPeople: props.hire.numberOfPeople,
      selectedDates: props.hire.selectedDates,
      selectedDay: { schedule: [] },
      selectedTimes: [],
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'ProposeTermsRequest') {

    } else if (newProps.status == 'ProposeTermsSuccess') {

    } else if (newProps.status == 'ProposeTermsError') {

    }
  }

  onNext () {

    Actions.Payment();
  }
  onBack() {
    const { changeContractForm } = this.props;
    changeContractForm({...this.state, firstForm: true})
  }
  onChangePeople(value) {
    const numberOfPeople = this.state.numberOfPeople + value;
    this.setState({numberOfPeople});
  }
  onSelectDate(date) {
    const day = Moment(date).format('YYYY-MM-DD');
    const selectedDates = [...this.state.selectedDates];
    if(selectedDates.includes(day)){
      selectedDates.splice(selectedDates.indexOf(day), 1)
    } else {
      selectedDates.push(day)
    }
    this.setState({ selectedDates });
  }

  onYearOfExperience (data) {

  }
  render() {
    const { user, hire: {schedule} } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
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
            <Text style={ styles.textTitle }>CUSTOM OFFER</Text>
            <View style={ styles.navButtonWrapper } />

          </View>
          <View style={ styles.mainContainer }>
            <View style={ [styles.borderBottom, styles.topContainer] }>
              <View style={ [ styles.rowContainer, customStyle.selectedDayCircle, styles.dropdownWrapper] }>
                <Text style={ [fontStyles, styles.textDescription, styles.whiteText] }>
                  {this.state.selectedDay.schedule.length} dates selected out of {this.state.numberOfSessions}
                </Text>
              </View>
              <View style={ [ styles.rowContainer, styles.dropdownWrapper] }>
                <ScrollView horizontal={ true }
                            showsHorizontalScrollIndicator={ false }
                            ref={(ref) => {this.datesScroll = ref}}>
                  {
                    this.state.selectedDates.map((day, index) => (
                      <View style={ styles.sectionTitleContainer } key={index}>
                        <Text style={ styles.textSectionTitle }>{Moment(new Date(day)).format('ddd')}</Text>
                        <Text style={ styles.textSectionTitle }>{Moment(new Date(day)).format('D')}</Text>
                      </View>
                    ))
                  }
                </ScrollView>
              </View>
            </View>

            <View style={ styles.middleContainer }>
              {
                this.state.selectedDay.schedule.map((session) => (
                  <View style={ styles.timeMainContainer } key={session._id}>
                    <View style={ styles.timeRowContainer}>
                      <Text style={ [styles.textSectionTitle, styles.segmentedControlsOptions] }>{Moment(session.from).format('LT')} To {Moment(session.to).format('LT')}</Text>
                      <View style={ styles.separator}>
                        <Text style={ [styles.textSectionTitle] }>{session.profession.name}</Text>
                      </View>
                    </View>
                    <View style={ styles.timeRowContainer}>
                      <Image source={ avatarDefault } style={ styles.imageAvatar } resizeMode="cover"/>
                      <Text style={ styles.textSectionTitle }>{session[user.role === CommonConstant.user_client ? 'professional': 'client'].name || 'No Name'}</Text>
                    </View>
                  </View>
                ))
              }

            </View>
            <View style={ styles.bottomContainer }>

            </View>
            <View style={ styles.bottomButtonWrapper }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onContinue() }>
                <View style={ styles.saveButton }>
                  <Text style={ styles.whiteText }>NEXT</Text>
                </View>
              </TouchableOpacity>
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
    backgroundColor: '#efefef',
  },
  currentDayText: {
    color: '#000',
  },
  day: {
    color: '#8d99a6',
  },
  dayHeading: {
    color: '#2e343b',
  },
  hasEventCircle: {
    backgroundColor: '#efefef',
    borderWidth: 1,
    borderColor: '#efefef',
  },
  hasEventText: {
    color: '#8d99a6',
  },
  selectedDayCircle: {
    flex:0.8,
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
  whiteText: {
    color: '#fff'
  },
  navBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitleContainer: {
    flexDirection: 'column',
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    marginVertical: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    height:50,
    width:50,
    borderRadius: 25,
  },
  navButtonWrapper: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textCenter: {
    textAlign: 'center',
  },
  textTitle: {
    flex: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    paddingVertical: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  topContainer: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 1.5,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    flex: 2.5,
    justifyContent:'flex-start',
  },
  textDescription: {
    color: '#6d6d6d',
    fontSize: 16,
  },
  textHours: {
    color: '#4d4d4d',
    fontSize: 24,
  },
  slider: {
    flex: 1,
    alignItems: 'center',
  },
  textValue: {
    color: '#4d4d4d',
    fontSize: 18,
    paddingRight: 5,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
  },
  valueWrapper: {

    width: width * 0.3,
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dropdownWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownStyle: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonWrapper: {
    marginHorizontal: 30,
    justifyContent: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#19b8ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    height: 40,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  locationBorderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    borderTopWidth: 1,
    borderTopColor: '#d7d7d7',
  },
  bidBorderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    borderTopWidth: 1,
    borderTopColor: '#d7d7d7',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  textBidTitle: {
    color: '#6d6d6d',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textBidDescription: {
    color: '#4d4d4d',
    fontSize: 12,
  },
  textBidValue: {
    color: '#10c7f9',
    fontSize: 32,
  },
  padding10: {
    paddingRight: 10,
    paddingLeft: 10,
  }

});