import React from 'react';
import Router from './Router';
import {BackAndroid} from "react-native"
class App extends React.Component {

  render(){
    return (
      <Router />
    )
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
     return true;
    });
  }
}

module.exports = App;
