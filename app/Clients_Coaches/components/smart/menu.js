import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const menuItems = ['Message Client', 'Cancel Appointment', 'Reschdule Appointment', 'Transfer Client', 'Terminate Client', 'Refund'];

export default class Menu extends Component {
 
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView scrollsToTop={ false } style={ styles.menu }>
        <View style={ styles.line }/>
        {
          menuItems.map (( item, index) => {
            return (
              <TouchableOpacity key={ index } activeOpacity={ .5 } onPress={ () => this.props.onItemSelected(item) }>
                <View style={ styles.buttonWrapper }>
                  <Text style={ styles.textItem }>{ item }</Text>
                </View>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#fff',
  },
  textItem: {
    fontSize: 14,
    color: '#4d4d4d',
  },
  buttonWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
});
