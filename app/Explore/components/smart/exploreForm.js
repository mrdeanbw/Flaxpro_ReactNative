import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import DatePicker from 'react-native-datepicker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import R from 'ramda';

import { SegmentedControls } from 'react-native-radio-buttons';
import SearchBar from '../../../Components/searchBar';
import ExploreMapView from './exploreMapView';
import ExploreListView from './exploreListView';

import { CoachesClients, GymLocations } from '../../../Components/dummyEntries';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const avatar = require('../../../Assets/avatar1.png');

export default class ExploreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSegmented : 'ALL',
      mapStandardMode: true,
      showContentMode: 0,
      coachesClients: CoachesClients,
      gymLocations: GymLocations,
    };
  }

  conponentWillMount() {
    // this.setState({ coachesClients: CoachesClients });
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'explore_request') {

    } else if (newProps.status == 'explore_success') {

    } else if (newProps.status == 'explore_error') {

    }
  }

  onList () {

    this.setState({ showContentMode: 1 });
    this.setState({ mapStandardMode:true });
  }

  onFilter () {

    Actions.FilterForm();
  }

  onMap () {
    this.setState({ showContentMode: 0 });
    this.setState({ mapStandardMode:true });
  }

  onClose () {
    this.setState({ mapStandardMode:true });
  }

  onSelectFilterMode(option) {
    this.setState({ selectedSegmented: option })

    if (option === 'ALL') {
      this.setState({ coachesClients: CoachesClients });
      return;
    }

    isEven = item => item.type === option;
    const filterValue = R.filter(isEven, CoachesClients);
    this.setState({ 
      coachesClients: filterValue,
      gymLocations: [],
    });
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

  get showFullTopBar () {

    return (
      <View style={ styles.navContainer }>
        <View style={ styles.searchBarWrap }>
          <SearchBar
            onSearchChange={ () => console.log('On Focus') }
            height={ 25 }
            autoCorrect={ false }
            returnKeyType={ "search" }
            iconColor={ "#ffffff99" }
            placeholderColor="#ffffff99"
            paddingTop={ 20 }
          />
        </View>
        <View style={ styles.calendarBarWrap } >
          <EvilIcons
            name="calendar"  size={ 35 }
            color="#fff"
          />
          <DatePicker
            date={ this.state.birthday }
            mode="date"
            placeholder="Tuesday, SEP 05, 2016"
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
                height: 25,
              },
              dateText: {
                color: "#fff",
              },
              placeholderText: {
                color: "#a2e2fe",
              },
            }}
            onDateChange={ (date) => { this.setState({ birthday: date }) } }
          />
        </View>
        <SegmentedControls
          tint={ "#fff" }
          selectedTint= { "#41c3fd" }
          backTint= { "#41c3fd" }
          options={ ["ALL", "NEARBY", "NEW", "REGULAR"] }
          onSelection={ (option) => this.onSelectFilterMode(option) }
          selectedOption={ this.state.selectedSegmented }
          allowFontScaling={ true }
          optionStyle={{
            fontSize: 12,
            height: 25,
          }}
          containerStyle= {{
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        />
      </View>
    );
  }

  render() {
    const { status } = this.props;
    
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
                coachesClients={ this.state.coachesClients }
                gymLocations={ this.state.gymLocations }
              />
              :
              <ExploreListView
                onFilter={ () => this.onFilter() }
                onList={ () => this.onMap() }
                coachesClients={ this.state.coachesClients }
              />
          }

        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: '#86d5f9',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  calendar: {
    width : width - 55,
    height: 35,
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
});