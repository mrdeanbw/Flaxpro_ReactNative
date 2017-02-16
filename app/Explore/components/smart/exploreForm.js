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
import PopupDialog from 'react-native-popup-dialog';

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
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE + SPACE,
          },
          key: 0,
        },
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE - SPACE,
          },
          key: 1,
        },
        {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
          key: 2,
        },
      ],
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

  onPressPin(key) {
    this.popupDialog.openDialog();
  }

  onCloseGym () {

    this.popupDialog.closeDialog();
  }
  onSetGym () {

    this.popupDialog.closeDialog();
  }

  render() {
    const { status } = this.props;
    const { region, markers } = this.state;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.searchBarWrap }>
            <SearchBar
              onSearchChange={() => console.log('On Focus')}
              height={ 25 }
              autoCorrect={ false }
              returnKeyType={ "search" }
              iconColor={ "#ffffff99" }
              placeholderColor="#ffffff99"
              paddingTop={ 20 }
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
            initialRegion={ region }
          >
            {
              this.state.markers.map(marker => (
                <MapView.Marker
                  image={ pin_gym }
                  key={ marker.key }
                  coordinate={ marker.coordinate }
                  calloutOffset={{ x: 0, y: 28 }}
                  calloutAnchor={{ x: 0.5, y: 0.4 }}
                  onPress={ () => this.onPressPin(marker.key) }
                >
                </MapView.Marker>
              ))
            }
          </MapView>
          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            width={ width * 0.8 }
            dialogStyle={ styles.dialogContainer }
          >
            <View style={ styles.dialogMainContentContainer }>
              <View style={ styles.dialogContentContainer }>
                <Text style={ styles.dialogText }>Do you want to set this Gym as the prefered workout location?</Text>
                <View style={ styles.dialogBottomContainer }>
                  <View style={ styles.leftButtonWrapper }>
                    <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onCloseGym() }>
                      <Text style={ styles.button }>NO</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={ styles.rightButtonWrapper }>
                    <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onSetGym() }>
                      <Text style={ styles.button }>YES</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={ styles.dialogTopContainer}>
                <Image source={ pin_gym } style={ styles.gymBanner } />
              </View>
            </View>
          </PopupDialog>

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
  },
  dialogContainer: {
    backgroundColor: 'transparent',
    marginTop: 150,
  },
  dialogMainContentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogTopContainer: {
    width: width * 0.8,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gymBanner: {
    width: 44,
    height: 44,
  },
  dialogContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 22,
    position: 'absolute',
    top: 22,
    width: width * 0.8,
    borderRadius: 20,
  },
  dialogText: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  dialogBottomContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
  },

  leftButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#e6e6e6',
    height: 40,

  },
  button: {
    textAlign: 'center',
  },
});