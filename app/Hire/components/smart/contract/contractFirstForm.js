import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Slider,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ModalDropdown from 'react-native-modal-dropdown';

const { width, height } = Dimensions.get('window');
const background = require('../../../../Assets/images/background.png');

const duration = ['1 Months', '2 Months', '3 Months'];

export default class ContractFirstForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfSessions: 1,
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
    Actions.pop();
  }

  onYearOfExperience (data) {

  }
  render() {
    const { status, user } = this.props;

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
            <Text style={ styles.textTitle }>CONTRACT</Text>
            <View style={ styles.navButtonWrapper } />

          </View>
          <View style={ styles.mainContainer }>
            <View style={ styles.topContainer }>
              <View style={ styles.rowContainer }>
                <Text style={ styles.textDescription }>Total number of sessions</Text>
                <Text style={ styles.textHours }>{ this.state.numberOfSessions } sessions</Text>
              </View>
              <View style={ styles.rowContainer }>
                <Slider style={ styles.slider }
                  minimumTrackTintColor={ '#10c7fa' }
                  maximumTrackTintColor={ '#a1a1a1' }
                  minimumValue={ 0 }
                  maximumValue={ 30 }
                  step={ 1 }
                  value = { this.state.numberOfSessions }
                  onValueChange={ (value) => this.setState({ numberOfSessions: value }) }
                />
              </View>
            </View>
            <View style={ styles.middleContainer }>
              <View style={ styles.rowContainer }>
                <Text style={ styles.textDescription }>You'll earn</Text>
                <View style={ styles.valueWrapper }>
                  <Text style={ styles.textValue }>$ { this.state.numberOfSessions * user.amount }</Text>
                </View>
              </View>
              <View style={ styles.rowContainer }>
                <Text style={ styles.textDescription }>Duration</Text>
                <View style={ styles.valueWrapper }>
                  <View style={ styles.dropdownWrapper }>
                    <ModalDropdown
                      options={ duration }
                      defaultValue={ duration[2] }
                      textStyle ={ styles.textValue }
                      dropdownStyle={ styles.dropdownStyle }
                      onSelect={ (rowId, rowData) => this.onYearOfExperience(rowData) }
                    />
                    <EntypoIcons
                      name="chevron-thin-down"  size={ 20 }
                      color="#4d4d4d"
                    />
                  </View>
                </View>
              </View>
              <View style={ styles.rowContainer }>
                <Text style={ styles.textDescription }>Hourly Rate</Text>
                <View style={ styles.valueWrapper }>
                  <Text style={ styles.textValue }>$ { user.amount }</Text>
                </View>
              </View>
              <View style={ styles.locationBorderContainer }>
                <EvilIcons
                  name="location"  size={ 30 }
                  color="#4d4d4d"
                />
                <Text style={ styles.textDescription }>4 york st, Toronto Ontario MSJ 4C2</Text>
              </View>
            </View>
            <View style={ styles.bottomContainer }>
              <Text style={ styles.textBidTitle }>Your Bid</Text>
              <View style={ styles.bidBorderContainer }>
                <Text style={ styles.textBidDescription }>This is what the Clients Sees</Text>
                <Text style={ styles.textBidValue }>$ { this.state.numberOfSessions * user.amount }</Text>
              </View>
            </View>
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
  navBarContainer: {
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
    flex: 2,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    flex: 2.5,
    justifyContent:'flex-start',
  },
  textDescription: {
    color: '#6d6d6d',
    fontSize: 14,
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
  valueWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    width: width * 0.3,
    alignItems: 'flex-end',
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
  }


});