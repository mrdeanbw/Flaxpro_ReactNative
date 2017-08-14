import React from 'react';
import {   
  View,
  StyleSheet,
  Text,
  Dimensions
  } from 'react-native'

export default class ToastComponent extends React.Component {
  constructor(props) {
     super(props);
     this.state = {

     };
   }

   render() {
     return(
        <View style={styles.alert}>
           <Text style={{color:'#ffffff', fontWeight:'bold'}}>{this.props.message}</Text>
        </View>
     )
    }


};

const styles = StyleSheet.create({
  alert:{
    position:'absolute',
    width: Dimensions.get('window').width*0.8,
    right:30,
    bottom:20,
    backgroundColor: '#00ff47', 
    borderRadius: 10, 
    padding:15,
    justifyContent: 'center', 
    alignItems: 'center',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1
    } 
  }
})