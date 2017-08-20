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
import {
  user_client as roleClient,
  WIDTH_SCREEN as width,
  HEIHT_SCREEN as height,
  APP_COLOR as appColor,
  FONT_STYLES as fontStyles
} from '../../../Components/commonConstant';
import { Avatar } from '../../../theme';

const propTypes = {
  style: PropTypes.array,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  experience: PropTypes.number,
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onPress: PropTypes.func,
  user: PropTypes.object,
};

class AnimatedViewCell extends Component {

  constructor(props) {
    super(props);
  }

  onClick() {

    this.props.onPress();
  }

  render() {
    const { width, height, avatar, name, description, experience, amount, user, profession = {} } = this.props;
    let rating = this.props.rating;
    if(rating < 1) rating = -1;
    const client = user.role === roleClient;

    const professionalClientData = {
      backgroundColor: client && profession.name ? profession.color : '#45c7f1',
      professionalProfessionBlock: client && profession.name &&
        <Text style={ [styles.textDescription, { color: profession.color }] }>{ profession.name }</Text>,
      professionalStarsBlock: !client &&
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
        </View>,
      clientStarsBlock: client &&
        <Stars
          isActive={ false }
          rateMax={ 5 }
          isHalfStarEnabled={ false }
          onStarPress={ (rating) => console.log(rating) }
          rate={ rating }
          size={ 12 }
          color="white"
        />,
      avatar: {
        type: avatar ? "url" : "image",
        source: avatar,
      },
      description: client ? `${experience} years experience` : description,
    };

    return (
      <Animated.View style={ this.props.style }>
        <TouchableOpacity 
          onPress={ () => this.onClick() }
          style={ [{ width: width }, { height: height }] }
        >
          <View style={ styles.topContainer }>
            <Avatar source={ professionalClientData.avatar.source }
                    type={ professionalClientData.avatar.type }
                    avatarStyle={ { width: width * 0.36,height: height * 0.36,borderRadius: height * 0.18 } }
            />
            <Text ellipsizeMode="tail" numberOfLines={1} style={ styles.textName }>{ name }</Text>
            {
              professionalClientData.professionalStarsBlock
            }
            <Text
              style={ styles.textDescription }
              numberOfLines={ 1 }
              ellipsizeMode="tail"
            >
              { professionalClientData.description }
            </Text>
            {
              professionalClientData.professionalProfessionBlock
            }
          </View>
          <View style={ [styles.ratingContainer, {backgroundColor: professionalClientData.backgroundColor}] }>
            {
              professionalClientData.clientStarsBlock
            }
            <Text style={ styles.textPrice }>{client ? '$'+amount : amount }</Text>
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