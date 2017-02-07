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

    Alert.alert('Clicked onSelectClient');
  }

  onSelectProfessional () {

    Alert.alert('Clicked onSelectProfessional');
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
              <Text style={ styles.text }> I am a fitness Professional </Text>
            </View>
            <View style={ styles.oneColumn }>
              <TouchableOpacity activeOpacity={ .5 } onPress={ () => this.onSelectClient() }>
                <View style={ styles.button }>
                  <Image source={ clientIcon } style={ styles.buttonIcon } resizeMode="contain" />
                </View>
              </TouchableOpacity>
                <Text style={ styles.text }> Seeking a fitness Professional </Text>
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