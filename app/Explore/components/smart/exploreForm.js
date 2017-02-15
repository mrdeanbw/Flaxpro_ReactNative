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

import MapView from 'react-native-maps';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/EvilIcons';
import { SegmentedControls } from 'react-native-radio-buttons';
import SearchBar from './searchBar';

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA;
const SPACE = 0.01;

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const pin_gym = require('../../../Assets/gym.png');


export default class ExploreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSegmented : 'ALL',
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

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.searchBarWrap }>
            <SearchBar
              onSearchChange={() => console.log('On Focus')}
              height={25}
              autoCorrect={ false }
              returnKeyType={ "search" }
              iconColor={ "#ffffff99" }
              placeholderColor="#ffffff99"
              paddingTop={20}
            />
          </View>
          <View style={ styles.calendarBarWrap } >
            <Icon
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
          <MapView
            style={ styles.map }
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            <MapView.Marker
              image={ pin_gym }
              coordinate={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
              }}
              >

            </MapView.Marker>

            <MapView.Marker
              image={ pin_gym }
              coordinate={{
                latitude: LATITUDE - SPACE * 2,
                longitude: LONGITUDE + SPACE,
              }}
            >

            </MapView.Marker>

          </MapView>
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
  map: {
    flex: 1,
  }

});