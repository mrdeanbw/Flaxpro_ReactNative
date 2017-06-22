import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RadioButton(props) {
  const iconName = props.checked ? props.checkedIconName : props.uncheckedIconName;
  const styles = StyleSheet.create({
    label: {
      fontSize: 14,
      color: '#fff',
    },
    icon: {
      marginLeft: -10,
    },
  });

  function onPress() {
    props.onPress(!props.checked);
  }

  return (
    <Icon.Button
      {...props}
      name={ iconName }
      size={ props.size }
      backgroundColor={ props.backgroundColor }
      color={ props.color }
      iconStyle={ [styles.icon, props.iconStyle, props.checked && props.checkedIconStyle] }
      onPress={ onPress }
      activeOpacity={ props.activeOpacity }
      underlayColor={ props.underlayColor }
      borderRadius={ props.borderRadius }
    >
      <Text
        style={ [styles.label, props.labelStyle] }
      >
        {props.label}
      </Text>
    </Icon.Button>
  );
}

RadioButton.propTypes = {
  size: PropTypes.number,
  checked: PropTypes.bool,
  label: PropTypes.string,
  labelStyle: Text.propTypes.style,
  iconStyle: Text.propTypes.style,
  checkedIconStyle: Text.propTypes.style,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func,
  underlayColor: PropTypes.string,
  activeOpacity: PropTypes.number,
  borderRadius: PropTypes.number,
  uncheckedIconName: PropTypes.string,
  checkedIconName: PropTypes.string,
};

RadioButton.defaultProps = {
  size: 25,
  checked: false,
  labelStyle: {},
  iconStyle: {},
  checkedIconStyle: {},
  color: '#fff',
  backgroundColor: 'rgba(0,0,0,0)',
  underlayColor: 'rgba(0,0,0,0)',
  activeOpacity: 1,
  borderRadius: 1,
  uncheckedIconName: 'checkbox-blank-circle-outline',
  checkedIconName: 'checkbox-marked-circle',
};
