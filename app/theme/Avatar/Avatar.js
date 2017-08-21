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
  
const Avatar = (props) => {
  let pic = props.type === 'url' ? { uri:props.source } : props.source || avatarDefault;
  let status = true;
    var profilePic = props.source;
    var defaultPic = avatarDefault;
    if (profilePic) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }
  
        if (request.status === 200) {
            pic = {uri:profilePic}
        } 
        else {
            pic = defaultPic;
            status = false;
        }
      };
      request.open('GET', profilePic);
      request.send();
    }
  return (
      <View style={[styles.container,props.backgroundColor && {backgroundColor:props.backgroundColor}]}>
        {(props.type==="url" && status) && <ImageProgress source={ pic } indicator={ActivityIndicator} style={ [styles.image, props.avatarStyle] } resizeMode="cover"/>}
        {(props.type==="image" || !status) && <Image source={ pic } style={ [styles.image, props.avatarStyle] }/>}
        {props.type==="text" && <Text style={styles.text}>{props.text}</Text>}
      </View>
    )
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
