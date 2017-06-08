import React from 'react';
import {
  StyleSheet,
  View,
}from 'react-native'

class EmptyScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  render(){
    return (
      <View style={{flex:1,backgroundColor:"white"}}>

      </View>
    )
  }
}

export default EmptyScreen;
