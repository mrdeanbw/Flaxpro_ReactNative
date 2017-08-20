import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text ,View, Image, ActivityIndicator} from 'react-native';
import ImageProgress from 'react-native-image-progress';
const avatarDefault = require('../../Assets/images/avatar.png');

const propTypes = {
  type: PropTypes.oneOf(['url', 'image', 'text']),
  backgroundColor: PropTypes.string,
  source: PropTypes.string,
  text: PropTypes.string,
  avatarStyle: Text.propTypes.style,
};
const defaultProps = {
  type: 'image',
  avatarStyle: {},
};

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic:props.type==='url'?{uri:props.source}:props.source || avatarDefault,
      status:true
    }
  }

  componentWillMount(){
    var profilePic = this.props.source;
    var defaultPic = avatarDefault;
    if (profilePic) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }
  
        if (request.status === 200) {
          this.setState({
            profilePic: {uri:profilePic}
          })
        } 
        else {
          this.setState({
            profilePic: defaultPic,
            status:false
          })
        }
      };
      request.open('GET', profilePic);
      request.send();
    }
  
  }
  render(){
  return (
      <View style={[styles.container,this.props.backgroundColor && {backgroundColor:this.props.backgroundColor}]}>
        {(this.props.type==="url" && this.state.status) && <ImageProgress source={ this.state.profilePic } indicator={ActivityIndicator} style={ [styles.image, this.props.avatarStyle] } resizeMode="cover"/>}
        {(this.props.type==="image" || !this.state.status) && <Image source={this.state.profilePic} style={ [styles.image, this.props.avatarStyle] }/>}
        {this.props.type==="text" && <Text style={styles.text}>{this.props.text}</Text>}
      </View>
    )
  }
};
const styles = StyleSheet.create({
  container: {
    width:40,
    height:40,
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center"
  },
  image:{
    height:40,
    width:40,
    borderRadius:20,
    resizeMode:"cover"
  },
  text:{
    fontSize:17,
    color:"white",
    alignItems:"center"
  }
});

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
