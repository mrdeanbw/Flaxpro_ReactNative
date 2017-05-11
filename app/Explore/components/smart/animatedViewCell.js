import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import Stars from 'react-native-stars-rating';

const propTypes = {
  style: PropTypes.array,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  avatar: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  amount: PropTypes.number,
  onPress: PropTypes.func,
};

class AnimatedViewCell extends Component {

  constructor(props) {
    super(props);
  }

  onClick() {

    this.props.onPress();
  }

  render() {
    const { width, height, avatar, name, description, rating, amount, user, profession = {} } = this.props;
    return (
      <Animated.View style={ this.props.style }>
        <TouchableOpacity 
          onPress={ () => this.onClick() }
          style={ [{ width: width }, { height: height }] }
        >
          <View style={ styles.topContainer }>
            <Image source={ avatar } style={ [{ width: width * 0.36 }, { height: height * 0.36 }, { borderRadius: height * 0.18 }] } />
            <Text style={ styles.textName }>{ name }</Text>
            {
              user.professional &&
              <View style={ styles.starContainer }>
                <Stars
                  isActive={ false }
                  rateMax={ 5 }
                  isHalfStarEnabled={ false }
                  onStarPress={ (rating) => console.log(rating) }
                  rate={ rating }
                  size={ 12 }
                  color="gold"
                />
              </View>
            }
            <Text
              style={ styles.textDescription }
              numberOfLines={ 1 }
              ellipsizeMode="tail"
            >
              { description }
            </Text>
            {
              !user.professional && profession.name &&
              <Text style={ [styles.textDescription, { color: profession.color }] }>{ profession.name }</Text>
            }
          </View>
          <View style={ [styles.ratingContainer, {backgroundColor: !user.professional && profession.name ? profession.color : '#45c7f1'}] }>
            {
              !user.professional &&
              <Stars
                isActive={ false }
                rateMax={ 5 }
                isHalfStarEnabled={ false }
                onStarPress={ (rating) => console.log(rating) }
                rate={ rating }
                size={ 12 }
                color="white"
              />
            }
            <Text style={ styles.textPrice }>${ amount }</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

AnimatedViewCell.propTypes = propTypes;

module.exports = AnimatedViewCell;

const styles = StyleSheet.create({

  topContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starContainer: {

  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    backgroundColor: '#45c7f1',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  textTitle: {
    fontSize: 13,
    color: '#1c1c1c',
  },
  textDescription: {
    paddingHorizontal: 3,
    color: '#808080',
    fontSize: 10,
    textAlign: 'center',
  },
  textPrice: {
    color: '#fff',
  },
});