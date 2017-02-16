import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

class ReviewCallout extends React.Component {
  render() {
    return (
      <View style={ [styles.container, this.props.style] }>
        <View style={ styles.bubble} >
          <View style={ styles.amount }>
            { this.props.children }
          </View>
        </View>
        <View style={ styles.arrowBorder } />
        <View style={ styles.arrow } />
      </View>
    );
  }
}

ReviewCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',

  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 6,
    borderColor: '#fff',
    borderWidth: 1,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = ReviewCallout;
