import React, { PropTypes } from 'react';
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
  return (
      <View style={[styles.container,props.backgroundColor && {backgroundColor:props.backgroundColor}]}>
        {props.type==="url" && <ImageProgress source={ {uri: props.source} } indicator={ActivityIndicator} style={ [styles.image, props.avatarStyle] } resizeMode="cover"/>}
        {props.type==="image" && <Image source={props.source || avatarDefault} style={ [styles.image, props.avatarStyle] }/>}
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
