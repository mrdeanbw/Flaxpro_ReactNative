import React from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  Platform
}from 'react-native'
import {Constants} from "../../common"
import {ProgressView} from "../../../theme"

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardDidShow:false
    }
  }
  render(){
    return (
      <View style={{flex:1}}>
        {this.renderContent()}

        {this.props.isShowProgress && <ProgressView />}
      </View>
    )
  }

  renderContent(){

  }

  componentWillMount () {
    if (Platform.OS==="ios") {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardDidShow.bind(this));
      this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardDidHide.bind(this));
    }else{
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow (e) {
    this.heightKeyboard = e.endCoordinates.height
    this.setState({keyboardDidShow:true})
  }

  keyboardDidHide () {
    this.setState({keyboardDidShow:false})
  }
}

export default Base;
