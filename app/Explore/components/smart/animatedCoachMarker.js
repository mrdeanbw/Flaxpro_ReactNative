import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
} from 'react-native';

import Stars from 'react-native-stars-rating';

class AnimatedCoachMarker extends Component {
  render() {
    const { amount, rating, selected, style } = this.props;

    const background = selected.interpolate({
      inputRange: [0, 1],
      outputRange: ['#fff', '#45c7f1'],
    });

    const border = selected.interpolate({
      inputRange: [0, 1],
      outputRange: ['#acacac', '#a7a7a4'],
    });

    const textColor = selected.interpolate({
      inputRange: [0, 1],
      outputRange: ['#000', '#fff'],
    });

    return (
      <Animated.View style={[styles.container, style]}>
        <Animated.View
          style={[
            styles.bubble,
            {
              backgroundColor: background,
              borderColor: border,
            },
            styles.contentContainer,
          ]}
        >
          <Animated.Text style={ [styles.amount, { color: textColor }] }>${ amount }</Animated.Text>
          <Stars
            isActive={ false }
            rateMax={ 5 }
            isHalfStarEnabled={ false }
            onStarPress={ (rating) => console.log(rating) }
            rate={ rating }
            size={ 12 }
          />

        </Animated.View>
        <Animated.View
          style={ [styles.arrowBorder, { borderTopColor: border }]}
        />
        <Animated.View
          style={ [styles.arrow, { borderTopColor: background }]}
        />
      </Animated.View>
    );
  }
}

AnimatedCoachMarker.propTypes = {
  amount: PropTypes.number.isRequired,
  selected: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired,
  style: PropTypes.any,
};

AnimatedCoachMarker.defaultProps = {
  rating: 5,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#a7a7a7',
    borderWidth: 1,
  },
  amount: {
    color: '#505050',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 10,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -22,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 10,
    borderColor: 'transparent',
    borderTopColor: '#a7a7a7',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  selectedBubble: {
    backgroundColor: '#45c7f1',
    borderColor: '#a7a7a4',
  },
  selectedArrow: {
    borderTopColor: '#45c7f1',
  },
  selectedArrowBorder: {
    borderTopColor: '#a7a7a4',
  },
});

module.exports = AnimatedCoachMarker;
