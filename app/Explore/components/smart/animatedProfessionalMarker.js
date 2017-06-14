import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
} from 'react-native';

import Stars from 'react-native-stars-rating';
import * as CommonConstant from '../../../Components/commonConstant';

class AnimatedProfessionalMarker extends Component {
  render() {
    const { personName, amount, rating, selected, style, index, user, profession = {} } = this.props;

    const background = selected.interpolate({
      inputRange: [0, 1],
      outputRange: ['#fff', '#45c7f1'],
    });

    // console.log('background ' + index +': ' + background)

    const border = selected.interpolate({
      inputRange: [0, 1],
      outputRange: ['#acacac', '#a7a7a4'],
    });

    const textColor = selected.interpolate({
      inputRange: [0, 1],
      outputRange: ['#000', '#fff'],
    });

    const professionalClientData = {
      backgroundColor: user.role === CommonConstant.user_client && profession.color ? profession.color :'#45c7f1',
    };

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
          <Animated.Text style={ [styles.personName, { color: textColor }] }>{ personName }</Animated.Text>
          <Stars
            isActive={ false }
            rateMax={ 5 }
            isHalfStarEnabled={ false }
            onStarPress={ (rating) => console.log(rating) }
            rate={ rating }
            size={ 12 }
          />

        </Animated.View>
        <Animated.View style={ [styles.bubbleAmount, {backgroundColor: professionalClientData.backgroundColor}] }>
          <Animated.Text style={ styles.amount }>{user.role === CommonConstant.user_client ? '$'+amount : amount }</Animated.Text>
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

AnimatedProfessionalMarker.propTypes = {
  personName: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  selected: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired,
  style: PropTypes.any,
};

AnimatedProfessionalMarker.defaultProps = {
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
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#a7a7a7',
    borderWidth: 1,
  },
  amount: {
    color: '#fff',
    fontSize: 13,
  },
  bubbleAmount: {
    flex: 0,
    alignSelf: 'center',
    borderRadius: 13,
    marginBottom: -24,
    marginTop: 2,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  personName: {
    color: '#505050',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 7,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -16,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 7,
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

module.exports = AnimatedProfessionalMarker;
