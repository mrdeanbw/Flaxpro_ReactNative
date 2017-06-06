import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  viewInputCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    marginHorizontal: 70,
  },
  textInputCenter: {
    paddingHorizontal:10,
    flex: 1,
    color: '#1e1e1e',
    fontFamily: 'Open Sans',
    fontSize: 18,
    height: 32,
  },
});

export default class InputCenter extends React.Component {
  static propTypes = {
    styleWrapper: PropTypes.object,
    autoCorrect: PropTypes.bool,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholderTextColor: PropTypes.string,
    autoCapitalize: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    styleWrapper: {},
    onChangeText: () => {},
    autoCorrect: false,
    placeholder: "Add your name here",
    placeholderTextColor: "#9e9e9e",
    autoCapitalize: "none",
    value: "",
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      styleWrapper,
      placeholder,
      autoCorrect,
      placeholderTextColor,
      autoCapitalize,
      onChangeText,
      value,
    } = this.props;
    return (
      <View style={ [styles.viewInputCenter, styleWrapper] }>
        <TextInput
          autoCapitalize={ autoCapitalize }
          autoCorrect={ autoCorrect }
          placeholder={ placeholder }
          placeholderTextColor={ placeholderTextColor }
          style={ [styles.textInputCenter] }
          value={ value }
          onChangeText={ onChangeText }
        />
      </View>
    );
  }
}
