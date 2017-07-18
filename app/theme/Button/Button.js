import React from 'react';
import { StyleSheet,TouchableOpacity,View,Image,TouchableHighlight } from 'react-native';
import {Text} from "../index"

const Button = (props) => {
    if (props.type === "border") {
      return <BorderButton {...props}/>
    }else if (props.type === "image") {
      return <ImageButton {...props}/>
    }else if (props.type === "text") {
      return <TextButton {...props}/>
    }else if (props.type === "image_text") {
      return <ImageTextButton {...props}/>
    }else{
      return <StandardButton {...props}/>
    }

};

const StandardButton = (props) => (
  <TouchableHighlight onPress={()=>props.inactive||props.onPress()} style={[styles.button,props.style,props.inactive && {backgroundColor:"#C6D8E4"}]} activeOpacity={0.6} underlayColor="#C6D8E4">
      <View><Text {...props} onPress={()=>props.inactive||props.onPress()} style={[styles.text,props.textStyle]}>{props.text}</Text></View>
  </TouchableHighlight>
);

const BorderButton = (props) => (
  <TouchableHighlight onPress={()=>{return props.onPress()}} style={[styles.borderButton,props.style]} activeOpacity={0.6} underlayColor="#C6D8E4">
      <View><Text {...props} style={[styles.text,props.textStyle]}>{props.text}</Text></View>
  </TouchableHighlight>
);

const ImageButton = (props) => (
  <TouchableHighlight onPress={()=>{return props.onPress()}} activeOpacity={0.6} underlayColor="#C6D8E4" style={props.buttonStyle}>
      <Image {...props} style={props.imageStyle}/>
  </TouchableHighlight>
);

const TextButton = (props) => (
  <TouchableHighlight onPress={()=>{return props.onPress()}} activeOpacity={0.6} underlayColor="#C6D8E4">
      <View><Text {...props} style={[styles.text,props.textStyle]}>{props.text}</Text></View>
  </TouchableHighlight>
);

const ImageTextButton = (props) => (
  <TouchableHighlight onPress={()=>{return props.onPress()}} activeOpacity={0.95} underlayColor="#C6D8E4" style={{justifyContent:"center"}}>
      <View style={{alignItems:"center"}}>
        <Image source={props.source} style={styles.iconImage}/>
        <Text style={{fontSize:12,color:"white",textAlign:"center",marginTop:3}}>{props.text}</Text>
      </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor:"#0B4A7D",
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    color:"white",
    fontSize:17
  },
  borderButton:{
    height: 25,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
    borderRadius:5,
    borderColor:"white"
  },
  iconImage:{
    width:25,
    height:25,
    resizeMode:"contain"
  }
});

export default Button;
