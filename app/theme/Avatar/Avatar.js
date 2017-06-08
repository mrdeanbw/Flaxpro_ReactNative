import React from 'react';
import { StyleSheet, Text ,View, Image} from 'react-native';

const Avatar = (props) => {
    return (
      <View style={[styles.container,props.backgroundColor && {backgroundColor:props.backgroundColor}]}>
        {props.type=="image" && <Image source={props.source} style={styles.image}/>}
        {props.type=="text" && <Text style={styles.text}>{props.text}</Text>}
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

export default Avatar;
