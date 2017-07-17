import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor
} from './commonConstant';
import PopupDialog from 'react-native-popup-dialog';
import EntypoIcons from 'react-native-vector-icons/Entypo';

import GoogleAutocomplete from './googleAutocomplete';

const styles = StyleSheet.create({

  locationInputContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    height: 290,
  },

  locationHeaderText: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  locationClose: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 5,
    top: 10,
    color: appColor
  },
  locationDialogContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: width * 0.95,
    height: 375,
    borderRadius: 10,
  },
  locationDialogTopContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
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
    color: '#48c7f2'
  },
  dialogContainer: {
    backgroundColor: 'transparent',
    position: 'relative',
    top: -125,
    alignItems: 'center',
  },
});

export default class DialogGoogleAutocomplete extends React.Component {

  static propTypes = {
    onSetPopupAutocomplete: PropTypes.func.isRequired,
    onClosePopupAutocomplete: PropTypes.func.isRequired,
    currentAddress: PropTypes.object,
  };

  static defaultProps = {
    onSetPopupAutocomplete: () => {},
    onClosePopupAutocomplete: () => {},
    currentAddress: {},
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onSetPopupAutocomplete,
      onClosePopupAutocomplete,
      currentAddress,
    } = this.props;
    const originalAddress = currentAddress.formattedAddress;

    return (
      <PopupDialog
        ref={ (popupAutocomplete) => { this.popupAutocomplete = popupAutocomplete; } }
        dialogStyle={ styles.dialogContainer }
      >
        <View style={ styles.locationDialogContentContainer }>

          <View style={ styles.locationDialogTopContainer }>
            <Text style={ styles.locationHeaderText }>
              My location
            </Text>
            <EntypoIcons
              style={ styles.locationClose }
              onPress={ () => onClosePopupAutocomplete() }
              name="circle-with-cross"
              size={ 28 }
            />
            <Text>{ originalAddress }</Text>
          </View>
          <View style={styles.locationInputContainer}>
            <View style={ styles.locationMiddleContainer }>
              <Text style={ styles.locationBlueText }>Enter address</Text>
            </View>
            <GoogleAutocomplete onPress={ (data, details) => onSetPopupAutocomplete(data, details) } />
          </View>
        </View>
      </PopupDialog>
    );
  }
}
