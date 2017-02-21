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

import DatePicker from 'react-native-datepicker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { SegmentedControls } from 'react-native-radio-buttons';
import SearchBar from './searchBar';
import ExploreMapView from './exploreMapView'

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const avatar = require('../../../Assets/avatar.png');
const list = require('../../../Assets/list.png');
const filter = require('../../../Assets/filter.png');

export default class ExploreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSegmented : 'ALL',
      mapStandardMode: true,
    };
  }

  componentWillReceiveProps(newProps) {

    if (newProps.status == 'explore_request') {

    } else if (newProps.status == 'explore_success') {

    } else if (newProps.status == 'explore_error') {

    }
  }

  onList() {

    Alert.alert('Clicked onList');
  }

  onFilter() {

    Alert.alert('Clicked onFilter');
  }

  get showBottomBar () {
    return (
      <View style={ styles.bottomBarContainer }>
        <TouchableOpacity
          onPress={ () => this.onList() }
          style={ styles.bottomBarButtonContainer }
        >
          <Text style={ styles.textListFilter }>List</Text>
          <Image source={ list } style={ styles.imageListFilter }/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ () => this.onList() }
          style={ styles.bottomBarButtonContainer }
        >
          <Text style={ styles.textListFilter }>Filter</Text>
          <Image source={ filter } style={ styles.imageListFilter }/>
        </TouchableOpacity>
      </View>
    );
  }

  get showTopBar () {

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
        <View style={ styles.segmentedControlsWrap }>
          <SegmentedControls
            tint={ "#fff" }
            selectedTint= { "#41c3fd" }
            backTint= { "#41c3fd" }
            options={ ["ALL", "NEARBY", "NEW", "EXPERIENCED"] }
            onSelection={ option => this.setState({ selectedSegmented: option }) }
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
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    const { status } = this.props;

    let bottomPosition = 60;
    if (this.state.mapStandardMode == false)
      bottomPosition = 190;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">

          { this.showTopBar }

          <ExploreMapView
            mapStandardMode={ this.state.mapStandardMode}
            onTapMap={ () => this.setState({ mapStandardMode:false }) }
          />

          <View style={ [styles.mainContentContainer, { bottom: bottomPosition }]}>
            { this.showBottomBar }
          </View>

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
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  mainContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60,

  },
  bottomBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,

  },
  bottomBarButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  imageListFilter: {
    height: 15,
    width: 17,
  },
  textListFilter: {
    backgroundColor: 'transparent',
    color: '#464646',
    alignSelf: 'center',
    paddingRight: 10,
  },

});