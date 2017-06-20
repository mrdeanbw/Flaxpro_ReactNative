import React,{Component} from 'react';
import {
  StyleSheet,
  Text ,
  View,
  Image,
} from 'react-native';

import styles from "./Session_Style.js"

class Session extends Component {

  render(){
    const progressWidth = 100;
    return (
      <View style={[styles.container,this.props.style]}>
        <Text style={styles.progressText}>{this.props.progress}/{this.props.total}</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progress,{width:this.props.progress/this.props.total*progressWidth},this.props.progress===this.props.total && {borderTopRightRadius:5,borderBottomRightRadius:5}]}></View>
        </View>
        {this.props.progress===this.props.total&&<Text style={styles.sessionEnd}>Sessions ended</Text>}
      </View>
    )
  }
}

Session.defaultProps = {
  progress:4,
  total:10,
}
export default Session;
