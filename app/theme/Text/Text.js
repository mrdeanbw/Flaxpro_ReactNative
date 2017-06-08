import React from 'react';
import { StyleSheet, Text } from 'react-native';

const MyText = (props) => {
    return <StandardText {...props}/>
};

const StandardText = (props) => (
    <Text {...props} style={[style.text,props.style]}>{props.children}</Text>
);

const style = StyleSheet.create({
  text: {
    
  }
});

export default MyText;
