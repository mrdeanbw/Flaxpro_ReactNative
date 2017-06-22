import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import DatePicker from 'react-native-datepicker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';

import PopupDialog from 'react-native-popup-dialog';

import R from 'ramda';

import { SegmentedControls } from 'react-native-radio-buttons';
import SearchBar from '../../../../Components/searchBar';
import ExploreMapView from '../exploreMapView';
import ExploreListView from '../exploreListView';

import { GymLocations } from '../../../../Components/dummyEntries';

import FullScreenLoader from '../../../../Components/fullScreenLoader';

const { width, height } = Dimensions.get('window');
import * as CommonConstant from '../../../../Components/commonConstant';

const background = require('../../../../Assets/images/background.png');
const arrow = require('../../../../Assets/images/right_arrow.png');

const locationGray = require('../../../../Assets/images/location_gray.png');
const locationMultiGray = require('../../../../Assets/images/location_multi_gray.png');
const locationNearbyGray = require('../../../../Assets/images/location_nearby_gray.png');

const locationWhite = require('../../../../Assets/images/location_white.png');
const locationMultiWhite = require('../../../../Assets/images/location_multi_white.png');
const locationNearbyWhite = require('../../../../Assets/images/location_nearby_white.png');

const otherLabel = {_id: 0, name: 'Other', color:'#000000',icon:'../Assets/images/sport.png'};
const allLabel = {_id: -1, name: 'All', color:'#4dc7fd'};
const prices = [
  {item: '$', price: '$50-$100', level: '1'},
  {item: '$$', price: '$100-$300', level: '2'},
  {item: '$$$', price: '$300+', level: '3'}
];

class ExploreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocationSegment : 'ALL',
      selectedPriceSegment : '$50-$100',
      mapStandardMode: true,
      showContentMode: 0,
      gymLocations: GymLocations,
      filteredClients: this.props.explore.clients,
      filteredProfessionals: this.props.explore.professionals,
      locationType: 'nearby',
      locationText: 'Nearby to me',
      locationAddress: '',
      professions: {
        selected: {},
        search:'',
        searchMode: false,
        listSelected: [],
        listFiltered: [],
        listOriginal: [],
        listOther: [],
      }
    };
  }

  componentWillMount(){
    const { getClients } = this.props;
    getClients();
  }

  componentWillReceiveProps(newProps) {
    const { explore: { error } } = newProps;
    if (error) {
      Alert.alert(error);
      return;
    }
    if(!newProps.explore.loading){
      this.filterClientsList(newProps);
    }
  }

  onList () {
    this.setState({ showContentMode: 1,  mapStandardMode: true });
  }

  onFilter () {
    const { getProfessionals, explore: { professions } } = this.props;

    Actions.FilterClientForm({ getProfessionals, professions });
  }

  onMap () {
    this.setState({ showContentMode: 0, mapStandardMode: true });
  }

  onClose () {
    this.setState({ mapStandardMode:true });
  }


  /**
   * For "Professional" role
   * Calls when user click on the one of the filters from topBar
   *
   * filtered "this.state.gymLocations" by the chosen filters
   * filtered clients list by the chosen filters:
   *
   */
  filterClientsList(props) {
    const workProp = props ? props : this.props;
    let filteredClients = workProp.explore.clients;
    let gymLocations = GymLocations;

    if(this.state.selectedPriceSegment){
      const filteredLevel = prices.filter((e) => e.price === this.state.selectedPriceSegment)[0].level;
      filteredClients = filteredClients.filter((e)=>e.priceLevel === filteredLevel);
    }
    this.setState({ filteredClients, gymLocations })
  };

  onSelectLocationFilterMode(option) {
    const { getClients } = this.props;
    this.setState({ selectedLocationSegment: option });
    if(option === 'ALL'){
      getClients();
    } else {
      getClients({locationType: option.toLowerCase()})
    }
  }

  onSelectPriceFilterMode(option) {
    this.setState({ selectedPriceSegment: option }, () => this.filterClientsList())
  }

  get showCloseTopBar () {

    return (
      <View style={ styles.navBarContainer }>
        <TouchableOpacity
          onPress={ () => this.onClose() }
          style={ styles.closeButtonWrapper }
        >
          <EvilIcons
            name="close"  size={ 35 }
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={ styles.textTitle }>MAP</Text>
        <View style={ styles.closeButtonWrapper } />
      </View>
    );
  }

  today() {
    return (new Date()).toDateString();
  }

  get showFullTopBar () {
    return (
      <View style={ styles.navContainer }>
        <View style={ styles.searchBarWrap }>
          <SearchBar
                onSearchChange={ () => console.log('On Focus') }
                height={ 20 }
                autoCorrect={ false }
                returnKeyType={ "search" }
                iconSearchName={ "location" }
                placeholder="Prefered Location"
                iconColor={ "#fff" }
                placeholderColor={ "#fff" }
                paddingTop={ 20 }
              />
        </View>
        <View style={ styles.calendarBarWrap } >
          <EvilIcons
            name="calendar"
            size={ 25 }
            color="#fff"
          />
          <DatePicker
            date={ this.state.birthday }
            mode="date"
            placeholder={this.today()}
            format="dddd, MMM DD, YYYY"
            minDate="01/01/1900"
            maxDate="12/31/2100"
            confirmBtnText="Done"
            cancelBtnText="Cancel"
            showIcon={ false }
            style = { styles.calendar }
            customStyles={{
              dateInput: {
                borderColor: "transparent",
                alignItems: "flex-start",
                height: 20,
              },
              dateText: {
                color: "#fff",
                fontFamily: 'Open Sans',
                fontSize: 12,
              },
              placeholderText: {
                color: "#fff",
                fontFamily: 'Open Sans',
                fontSize: 12,
              },
            }}
            onDateChange={ (date) => { this.setState({ birthday: date }) } }
          />
        </View>
        <View style={ styles.segmentsBlock }>
            <SegmentedControls
              tint={ "#41c3fd" }
              selectedTint= { "#fff" }
              backTint= { "#fff" }
              options={ ["ALL", "NEARBY"] }
              onSelection={ (option) => this.onSelectLocationFilterMode(option) }
              selectedOption={ this.state.selectedLocationSegment }
              allowFontScaling={ true }
              optionStyle={{
                fontSize: 10,
              }}
              containerStyle= {{
                borderRadius: 15,
                width:width/2 - 15,
                height: 25,
                marginLeft: 10,
                marginRight: 5,
                marginVertical: 7,
              }}
            />
            <SegmentedControls
              tint={ "#41c3fd" }
              selectedTint= { "#fff" }
              backTint= { "#fff" }
              options={ prices.map(e=>e.price) }
              onSelection={ (option) => this.onSelectPriceFilterMode(option) }
              selectedOption={ this.state.selectedPriceSegment }
              allowFontScaling={ true }
              optionStyle={{
                fontSize: 9,
              }}
              containerStyle= {{
                borderRadius: 15,
                width:width/2 - 15,
                height: 25,
                marginLeft: 5,
                marginRight: 10,
                marginVertical: 5,
              }}
            />
          </View>
      </View>
    );
  }

  render() {
    const { user } = this.props.auth;
    const explore = this.props.explore;
    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          {
            this.state.mapStandardMode ?
              this.showFullTopBar
              :
              this.showCloseTopBar
          }
          {
            this.state.showContentMode == 0 ?
              <ExploreMapView
                mapStandardMode={ this.state.mapStandardMode}
                onTapMap={ () => this.setState({ mapStandardMode:false }) }
                onFilter={ () => this.onFilter() }
                onList={ () => this.onList() }
                professionalsClients={ this.state.filteredClients }
                gymLocations={ this.state.gymLocations }
                user={ user }
              />
              :
              <ExploreListView
                onFilter={ () => this.onFilter() }
                onList={ () => this.onMap() }
                professionalsClients={ this.state.filteredClients }
                user={ user }
              />
          }
        </Image>
        { explore.loading ? <FullScreenLoader/> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  locationMulti: {
    width: 43,
    height: 28,
  },
  locationNearbyIcon: {
    width: 27,
    height: 27,
  },
  locationGrayIcon: {
    width: 20,
    height: 27,
  },
  arrowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 50,
  },
  imageArrow: {
    width: 30,
    height: 24,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  textInput: {
    height: 30,
    width: width * 0.8,
    paddingHorizontal: 10,
    borderRadius: 15
  },
  addressInputContaitner: {
    width: width * 0.8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    marginTop: 5,
  },
  locationInputContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },

  activeLocation: {
    backgroundColor: '#48C7F2',
  },
  locationBtnBlock: {
    flexDirection: 'row',
    marginBottom: 20
  },
  locationBtnContainer: {
    width: width * 0.3,
    alignItems: 'center',
  },
  locationBtn: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15)/2,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationBtnText: {
    fontWeight: '500',
    fontSize: 12,
  },
  locationHeaderText: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  locationClose: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 1,
    top: 2,
    color: '#48c7f2'
  },
  locationDialogContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: width * 0.95,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  locationDialogTopContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    alignSelf: 'stretch',

  },
  locationMiddleContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  locationBlueText: {
    color: '#85D9F3'
  },
  dialogContainer: {
    backgroundColor: 'transparent',
    position: 'relative',
    top: -160
  },
  container: {
    // width,
    // height,
    // backgroundColor: '#1abef2',
    flex: 1,
  },
  background: {
    width,
    height,
  },
  navContainer: {
  },
  searchBarWrap: {
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  calendarBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5bd5f9',
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  calendar: {
    width : width - 55,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentedControlsWrap: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  navBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  segmentsBlock: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonWrapper: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textTitle: {
    flex: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    paddingVertical: 10,
  },
  searchProfessionBlock: {
    flex:1,
    flexDirection: 'row',
  },
  searchProfessionCloseButon: {
    flex:1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  searchProfessionText: {
    margin:0,
    height:25,
    fontSize:12,
    paddingHorizontal: 5,
  },
  closeProfession: {
    position: 'absolute',
    right:0,
    top:-1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: 25,
    width: 25,
    backgroundColor: 'transparent',
  },
  closeProfessionIcon: {

  },
  closeProfessionView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'absolute',
    right: 3,
    top: 1,
    height: 15,
    width: 15,
    overflow: 'hidden'
  },

  //scroll view
  filterRowContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  buttonWrapper: {
    marginHorizontal: 2,
    marginTop: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4dc7fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    height: 20,
  },
  cellText: {
    color: '#4dc7fd',
    fontSize: 12,
  },
  cellContainer: {
    marginRight:150,
    borderRadius: 7,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  professionSearchContainer: {
    borderRadius: 7,
    flexDirection: 'row-reverse',
  },
  //end scroll view
  dropdownText: {
    paddingHorizontal:6,
    paddingVertical: 10,
    fontSize: 11,
    textAlignVertical: 'center',
  },
  dropdownSeparator:{
    marginHorizontal:5,
    borderWidth:0.5,
    borderColor: '#d3d3d3',
  },
  dropdown: {
    borderColor: '#d3d3d3',
    backgroundColor: '#fff',
    overflow:'hidden',
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: 'center',
    left: 10,
    width:width-20,
    zIndex: 3,
    position: 'absolute',
  },
  dropdownLimitHeight: {
    height: 210,
  },
  dropdownWrapper: {
    position: 'absolute',
    top: 140,
    zIndex: 1,
    width,
    height: height-140
  },
  dropdownBackground:{
    zIndex: 2,
    position: 'relative',
    backgroundColor: '#a3a4a7',
    opacity: 0.5,
    width,
    height: height-140}
});

export default ExploreForm;
