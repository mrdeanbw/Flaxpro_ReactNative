import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    position: 'relative'
  },
  activityIndicatorContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#a3a4a7',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    opacity: 0.7,
    width,
    height
  },
});

export default class FullScreenLoader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator
          style={styles.activityIndicator}
          color="#0000ff"
          size="large"
        />
      </View> 
    );
  }
}
