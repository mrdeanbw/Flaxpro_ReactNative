import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import EntypoIcons from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/images/background.png');
const strengthTraining = require('../../../Assets/images/strength_training.png');
const pilates = require('../../../Assets/images/pilates.png');
const yoga = require('../../../Assets/images/yoga.png');
const workoutDefault = require('../../../Assets/images/total_workout.png');


class SessionsProfile extends Component {
  constructor(props) {
    super(props);
  }

  onBack() {
    Actions.pop();
  }

  get getShowNavBar() {
    return (
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

          <Text style={ [styles.fontStyles, styles.textTitle, styles.marginRight] }> TOTAL WORKOUTS </Text>
        </View>
    );
  }
  getIcon(icon) {
    if (icon.includes('pilates')) return pilates;
    if (icon.includes('yoga')) return yoga;
    if (icon.includes('strength_training')) return strengthTraining;
    return workoutDefault;
  }

  render() {
    const {profile: {sessions}} = this.props;
    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          
          { this.getShowNavBar }
          <View style={ styles.contentMainContainer }>
            <View style={ [styles.mainContainer, styles.infoContainer] }>
              <Text style={ [styles.fontStyles, styles.textInfoValue, styles.textGray] }>Total Workouts</Text>
            </View>
            <View style={ styles.infoRowLeftContainer }>
              <ScrollView horizontal>
              {
                sessions.map((item, index) => (
                  <View style={ [styles.columnContainer, styles.workoutBlock] } key={index}>
                    {
                      item.profession && item.profession.icon ?
                        <Image source={this.getIcon(item.profession.icon) } style={ styles.imageAvatar } resizeMode="cover"/>
                        :
                        <Image source={ workoutDefault } style={ styles.imageAvatar } resizeMode="cover"/>
                    }
                    <Text style={ [styles.fontStyles, styles.textInfoValue] }>{item.profession.name}</Text>
                    <Text style={ [styles.textInfoTitle, styles.blueText, item.profession.color && {color: item.profession.color}] }>{item.quantity} Sessions</Text>
                  </View>
                ))
              }
              </ScrollView>
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

  fontStyles: {
    fontFamily: 'Open Sans',
    fontSize: 18,
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
    fontSize: 20,
  },
  marginRight: {
    marginRight:50,
  },
  contentMainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 5,
  },
  infoRowLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  workoutBlock: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfoValue: {
    fontSize: 14,
  },
  textGray: {
    color: '#7e7e7e',
  },
  mainContainer: {
    backgroundColor: '#F7F9FA',
    justifyContent: 'center',
  },

  imageAvatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  blueText:{
    color: '#11c6f8',
  },
});

export default connect(state => ({
    profile: state.profile,
  }),
  (dispatch) => ({
  })
)(SessionsProfile);