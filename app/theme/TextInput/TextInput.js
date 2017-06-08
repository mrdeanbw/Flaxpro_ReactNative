import React from 'react';
import { StyleSheet,TextInput,View } from 'react-native';
import {Text} from "../index"

const Input = (props) => {
    return <StandardTextInput {...props}/>
};

const StandardTextInput = (props) => (
  <View style={[styles.container,props.inputStyle]}>
    <TextInput
          style={[styles.textinput]}
          placeholderTextColor="#C7C7C7"
          autoCorrect={false}
          underlineColorAndroid='transparent'
          autoCapitalize="none"
          {...props}

        />
  </View>
);

const styles = StyleSheet.create({
  container:{
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1
  },
  textinput: {
    height: 40,
    textAlign: 'center',
  },
  text:{
    color:"white",
    fontSize:17
  }
});

export default Input;
