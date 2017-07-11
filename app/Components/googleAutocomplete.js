import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  GOOGLE_API_KEY as googleKey,
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor
} from './commonConstant';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    flex:1,
    width: width * 0.8,
  },
  description: {
    fontWeight: 'bold',
  },
  predefinedPlacesDescription: {
    color: appColor,
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: '#5d5d5d',
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 43,
    color: '#5d5d5d',
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,

  },
});

export default class GoogleAutocomplete extends React.Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    mainStyles: PropTypes.object,
    leftIcon: PropTypes.bool,
    leftIconName: PropTypes.string,
    iconColor: PropTypes.string,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    onPress: () => {},
    mainStyles: {},
    leftIcon: false,
    leftIconName: '',
    iconColor: '#fff',
    placeholder: 'Search',
  };

  constructor(props) {
    super(props);
  }

  _onPress(data, details) {
    if (this.props.onPress) {
      this.props.onPress(data, details);
    }
  }
  get leftButton() {
    const {
      leftIcon,
      leftIconName,
      iconColor,
    } = this.props;

    return leftIcon && (
      <EvilIcons
        style={{ paddingLeft: 5 }}
        name={ leftIconName }
        size={ 24 }
        color={ iconColor }
      />
      )
  }

  render() {
    const {
      mainStyles,
      placeholder,
    } = this.props;

    return (
      <GooglePlacesAutocomplete
        placeholder={ placeholder }
        minLength={2}
        autoFocus={false}
        returnKeyType={'search'}
        listViewDisplayed='auto'
        fetchDetails={true}
        onPress={ (data, details) => this._onPress(data, details) }
        query={{
          key: googleKey,
        }}
        styles={{ ...styles, ...mainStyles }}

        currentLocation={true}
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GoogleReverseGeocoding'
        debounce={200}
        renderLeftButton={ () => this.leftButton }
      />

    );
  }
}
