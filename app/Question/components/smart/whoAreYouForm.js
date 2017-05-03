import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import localStorage from 'react-native-local-storage';
import * as CommonConstant from '../../../Components/commonConstant';

const { width, height } = Dimensions.get('window');

const background = require('../../../Assets/background.png');
const professionalIcon = require('../../../Assets/select_professional.png');
const clientIcon = require('../../../Assets/select_client.png');

export default class WhoAReYouForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType : '',
    };
  }

  onSelectClient () {

    // localStorage.get('userData')
    //   .then((data) => {
    //     localStorage.save([CommonConstant.user_mode, 'userData'], [
    //       CommonConstant.user_client, { ...data, professional: false }
    //     ])
    localStorage.save(CommonConstant.user_mode, CommonConstant.user_client)
    Actions.ClientInfo();
      // });
  }

  onSelectProfessional () {

    localStorage.save(CommonConstant.user_mode, CommonConstant.user_trainer)
    //   .then(() => {
    //     Actions.Main({ user_mode: CommonConstant.user_trainer });
    // })
    this.onProfessionalAlert()
    // Actions.TrainerInfo();//TODO: need create trainer info form
  }
  onProfessionalAlert () {

    Alert.alert('Clicked SelectProfessional');
  }

  render() {
    const { status } = this.props;

    return (
      <View style={ styles.container }>
        <Image source={ background } style={ styles.background } resizeMode="cover">
          <View style={ styles.rowWrapper }>
            <Text style={ styles.textTitle }> Who are you </Text>
          </View>
          <View style={ styles.columnWrapper }>
            <View style={ styles.oneColumn }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onSelectProfessional() }>
                <View style={ styles.button }>
                  <Image source={ professionalIcon } style={ styles.buttonIcon } resizeMode="contain" />
                </View>
              </TouchableOpacity>
              <Text style={ styles.text }> I am a Professional </Text>
            </View>
            <View style={ styles.oneColumn }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onSelectClient() }>
                <View style={ styles.button }>
                  <Image source={ clientIcon } style={ styles.buttonIcon } resizeMode="contain" />
                </View>
              </TouchableOpacity>
                <Text style={ styles.text }> Seeking a Professional </Text>
            </View>
          </View>
          <View style={ styles.spaceWrapper }/>
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
  columnWrapper: {
    flex: 2,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  oneColumn: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceWrapper: {
    flex: 3,
  },
  textTitle: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 40,
  },
  text: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonIcon: {
    height:125,
    width:125,
  },
  button: {
    backgroundColor: 'transparent',
  },
});