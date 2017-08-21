import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RadioButton(props) {
  const iconName = props.checked ? props.checkedIconName : props.uncheckedIconName;
  const styles = StyleSheet.create({
    label: {
      fontSize: 14,
      color: '#fff',
      paddingLeft:3
    },
    icon: {
      // marginLeft: -10,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal:5
    }
  });

  function onPress() {
    props.onPress(!props.checked);
  }

  return (
    <TouchableOpacity onPress={ onPress } style={styles.content}>
      <Icon
        name={ iconName }
        size={ props.size }
        backgroundColor={ props.backgroundColor }
        color={ props.color }
        style={ [styles.icon, props.iconStyle, props.checked && props.checkedIconStyle] }
        activeOpacity={ props.activeOpacity }
        underlayColor={ props.underlayColor }
        borderRadius={ props.borderRadius }
      />
      <Text style={ [styles.label, props.labelStyle] } >
        {props.label}
      </Text>
    </TouchableOpacity>
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
