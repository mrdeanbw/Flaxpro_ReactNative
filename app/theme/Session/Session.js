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
    return (
      <View style={[styles.container,this.props.style]}>
        <Text style={styles.progressText}>{this.props.progress}/10</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progress,{width:this.props.progress*10-2},this.props.progress==10 && {borderTopRightRadius:5,borderBottomRightRadius:5}]}></View>
        </View>
        {this.props.progress==10&&<Text style={styles.sessionEnd}>Sessions ended</Text>}
      </View>
    )
  }
}

Session.defaultProps = {
  progress:4
}
export default Session;
