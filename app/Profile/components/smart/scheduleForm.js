import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { SegmentedControls } from 'react-native-radio-buttons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contractsActions from '../../../Contracts/actions';

import Calendar from './calendar/Calendar';

import R from 'ramda';
import Moment from 'moment';

import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor,
  user_client as userClient,
  user_professional as userProfessional,
  INFO_CALENDAR_OPTIONS as constants,
} from '../../../Components/commonConstant';

const background = require('../../../Assets/images/background.png');
const avatarDefault = require('../../../Assets/images/avatar.png');
const edit = require('../../../Assets/images/edit.png');

class ScheduleForm extends Component {

  static propTypes = {
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
  };

  constructor(props) {
    super(props);
    let schedule = this.props.profile.schedule;
    let events = R.pluck('date')(schedule);
    this.state = {
      selectedDates: events.includes(Moment(Moment()).format('ddd, D MMM YYYY'))?[Moment(Moment()).format('ddd, D MMM YYYY')]:[],
      selectedOption: constants.CALENDAR,
      contracts: [],
      contractsDates:[],
      contractsFromDates:[],
      filterStatus: false,
      isAll:false,
      allDates:[]
    };
  }

  componentWillMount(){
    if(this.props.auth.user.role === userClient) this.props.actions.getMyProfessionals();
    if(this.props.auth.user.role === userProfessional) this.props.actions.getMyClients();
    
  }
  componentWillReceiveProps(newProps) {
    if(newProps.contracts.loading) return;
    if(newProps.contracts.error) return Alert.alert(newProps.contracts.error);

    const {contracts: {contracts}} = newProps;
    const role = newProps.auth.user.role === userProfessional ? userClient.toLowerCase() : userProfessional.toLowerCase();
    const data = contracts.map( e => (
      {
        profession: e.profession.name,
        professionColor: e.profession.color,
        contracts: e.contracts.map(c => (
          {
            name: c[role].name,
            date: c.next ? c.next.from : '',
            image: c[role].avatar || null
          })
        )
      })
    );
    let dates = [];
    let fromDates = [];
    data[0].contracts.map((item) => {
      dates.push(Moment(item.date).format('ddd, D MMM YYYY'));
      fromDates.push(item.date);
    })
    this.setState({contracts:data[0].contracts, contractsDates:dates, contractsFromDates:fromDates});
  }

  getName (date) {
    let temp = this.state.contracts.filter((e)=>e.date===date);
    if(temp[0]) return (<Text style={ styles.textSectionTitle } >{temp[0].name}</Text>);
    else return (<Text style={ styles.textSectionTitle }> Available time </Text>);
    
  }

  getImage (date) {
    let temp = this.state.contracts.filter((e)=>e.date===date);
    if(temp[0]) return (<Image source={ temp[0].image? {uri:temp[0].image}:avatarDefault } style={ styles.imageAvatar } resizeMode="cover"/>);
    else return (<Image source={ avatarDefault } style={ styles.imageAvatar } resizeMode="cover"/>);
  }

  onSelectDate(date) {
    const day = Moment(date).format('ddd, D MMM YYYY');
    const selectedDates = [...this.state.selectedDates];
    if(selectedDates.includes(day)){
      selectedDates.splice(selectedDates.indexOf(day), 1)
    } else {
      selectedDates.push(day)
    }
    this.setState({ selectedDates });
  }

  onBack() {
    Actions.pop();
  }
  onChangeOptions(option) {
    const { selectedOption } = this.state;

    if (selectedOption !== option) {
      Actions.pop();
    }
  }
  onEdit() {
    Actions.EditAvailability(...this.props);
  }

  get getShowNavBar() {
    const { selectedOption } = this.state;
    return (
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

          <Text style={ styles.textTitle }>SCHEDULE</Text>

          {
            this.props.editable ?
              <TouchableOpacity
                onPress={ () => this.onEdit() }
                style={ styles.navButtonWrapper }
              >
                <Image source={ edit } style={ styles.imageEdit } resizeMode="cover"/>
              </TouchableOpacity>
              :
              <View style={ styles.navButtonWrapper }/>
          }

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
    );
  }

  onClickAll = () => {
    let schedule = this.props.profile.schedule;
    let events = R.pluck('date')(schedule);
    let dates = [];
    let data = this.state.filterStatus?events:events.filter((e)=> this.state.contractsDates.includes(e));
    if(!this.state.isAll)
      data.map((item)=>{
        const day = Moment(Moment(new Date(item))).format('ddd, D MMM YYYY');
        dates.push(day);
      })
    this.setState({allDates:dates});
    this.setState((prev)=>{return {isAll:!prev.isAll}});
  }

  onClickFilter = (value) =>{
    let schedule = this.props.profile.schedule;
    let events = R.pluck('date')(schedule);
    let dates = this.state.allDates;
    let data = !this.state.filterStatus?events:events.filter((e)=> this.state.contractsDates.includes(e));
    if(value!==this.state.filterStatus) this.setState({selectedDates:[]})
    if(this.state.isAll){
      data.map((item)=>{
        const day = Moment(Moment(new Date(item))).format('ddd, D MMM YYYY');
        dates.push(day);
      })
    }
    else{
      dates = this.state.selectedDates;
    }
      this.setState({filterStatus:value, allDates:dates});
  }


  render() {
    const { auth, profile: { schedule, user } } = this.props;
    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          { this.getShowNavBar }
          <View style={ styles.contentContainer }>

            <Calendar
              customStyle={ customStyle }
              dayHeadings={ ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ] }
              eventDates={ R.pluck('date')(schedule) }
              nextButtonText={ '>' }
              prevButtonText={'<'}
              showControls={ true }
              showEventIndicators={ true }
              isSelectableDay={ true }
              isNotEdit={true}
              isAll={this.state.isAll}
              filterStatus={this.state.filterStatus}
              onDateSelect={ (date) => this.onSelectDate(date) }
              selectedDate={this.state.selectedDates}
              contractsDate={this.state.contractsDates}
              onTouchNext={()=> { this.setState({selectedDates: []}) } }
              onTouchPrev={()=> { this.setState({selectedDates: []}) } }
            />
            <View style={[styles.sectionTitleContainer, { paddingVertical:10, alignItems:'center', justifyContent:'space-between' }]}>
              <View style={{flexDirection:'row', alignItems:'center', flex:1}}>
              <Text> Selected dates: { ' ' + Moment().format('MMM') + ' '}</Text>
              {
                !this.state.isAll && 
                  <ScrollView horizontal>
                    {
                      this.state.selectedDates.sort((a,b) => {return (new Date(a) > new Date(b)) ? 1 : ((new Date(b) > new Date(a)) ? -1 : 0);} ).map((e, index)=>{
                        return <TouchableOpacity key={index} onPress={(ee)=>this.onSelectDate(Moment(Moment(new Date(e))))}
                        style={[customStyle.selectedDayCircle,{ marginLeft:5, width: 24, height: 24, borderRadius: 12, justifyContent:'center', alignItems:'center'}]} >
                          <Text style={{color:'#fff'}} >{ Moment(Moment(new Date(e))).date()}</Text>
                        </TouchableOpacity>
                      })
                    }
                  </ScrollView>

              }
              </View>
              <TouchableOpacity onPress={(e)=>{this.onClickAll()}}>
                <Text style={{color: this.state.isAll?'#565656':'#8d99a6', fontWeight: this.state.isAll?'600':'300'}} > { this.state.isAll?'ALL DATES':'all dates'}</Text>  
              </TouchableOpacity>
            </View>
            <View style={[styles.sectionTitleContainer, { paddingVertical:5 }]}>
              <TouchableOpacity style={[styles.filterBtn, {borderRightWidth:1, borderColor:'#d9d9d9'}]} onPress={(e)=>{this.onClickFilter(false)}} >
                <Text style={{ color: !this.state.filterStatus?'#45c7f1':'#8d99a6', fontWeight:this.state.filterStatus?'300':'600' }} >{this.state.filterStatus?'show booking':'BOOKING'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterBtn} onPress={(e)=>{this.onClickFilter(true)}} >
                <Text style={{ color: this.state.filterStatus?'#45c7f1':'#8d99a6', fontWeight:this.state.filterStatus?'600':'300' }} >{this.state.filterStatus?'AVAILABILITY':'show availability'}</Text>
              </TouchableOpacity>
              </View>
            <ScrollView showsVerticalScrollIndicator={true}>
            {
              schedule.filter((e)=>this.state.isAll?this.state.allDates.includes(Moment(new Date(e.date)).format('ddd, D MMM YYYY')):this.state.selectedDates.includes(Moment(new Date(e.date)).format('ddd, D MMM YYYY'))).map((day, index) => (
                day.schedules.filter((e)=> this.state.filterStatus?!this.state.contractsFromDates.includes(e.from):this.state.contractsFromDates.includes(e.from)).length>0 &&
                <View key={index}>
                  <View style={ styles.sectionTitleContainer }>
                    <Text style={ styles.textSectionTitle }>{day.date}</Text>
                  </View>
                   {
                    day.schedules.filter((e)=> this.state.filterStatus?!this.state.contractsFromDates.includes(e.from):this.state.contractsFromDates.includes(e.from)).map((session, index) => (
                      <View style={ styles.timeMainContainer } key={index}>
                        <View style={ [styles.timeRowContainer, {flex:2.3, justifyContent:'space-between'}]}>
                          <Text style={ [styles.textSectionTitle, styles.segmentedControlsOptions] }>{Moment(session.from).format('LT')} To {Moment(session.to).format('LT')}</Text>
                          <View style={ styles.separator}>
                            <Text style={ [styles.textSectionTitle] }>{session.profession && session.profession.name}</Text>
                          </View>
                        </View>
                        <View style={ [styles.timeRowContainer, {flex:3, justifyContent:auth.user.role === userClient ?'flex-end': 'flex-start'}] }>
                          { !this.state.filterStatus && this.getImage(session.from)}
                          {this.getName(session.from)}
                        </View>
                      </View>
                    ))
                  } 
                </View>
              ))
            }
            </ScrollView>
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
    fontWeight:'bold'
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
  navBarContainer: {
    // flex: 1,
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: 'transparent',
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
    paddingVertical: 5,
  },  
  contentContainer: {
    flex: 8.5,
    backgroundColor: '#efefef',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#d9d9d9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  filterBtn:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:5
  },
  textSectionTitle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: 'center',
    color: '#565656',
  },
  imageEdit: {
    width: 24,
    height: 24,
  },
  timeMainContainer: {
    flex: 3,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#d9d9d9',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  separator: {
    marginVertical:2,
    marginLeft:1,
    borderColor: '#d9d9d9',
    borderLeftWidth: 1,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  scheduleButton: {
    width: width - 100,
    backgroundColor: '#14c2f7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#14c2f7',
    borderStyle: 'solid',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    paddingVertical: 15,
    paddingHorizontal: 40,
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  calendarTime: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    borderStyle: 'solid',
  },
  timeRowContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  textTimeTo: {
    paddingHorizontal: 20,
    textAlign: 'center',
    color: '#565656',
  },
  navigateButtons: {
    flex:1.5,
    alignItems: 'center',
    flexDirection: 'column'
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
  imageAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
   contracts: state.contracts,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(contractsActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleForm);

