import React, { PropTypes } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5bd5f9',
  },
  searchBarInput: {
    flex: 1,
    fontWeight: 'normal',
    color: '#212121',
    backgroundColor: 'transparent',
  },
});

export default class SearchBar extends React.Component {

  static propTypes = {
    height: PropTypes.number.isRequired,
    autoCorrect: PropTypes.bool,
    returnKeyType: PropTypes.string,
    onSearchChange: PropTypes.func,
    onEndEditing: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    padding: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    inputStyle: PropTypes.object,
    iconCloseName: PropTypes.string,
    iconSearchName: PropTypes.string,
    iconBackName: PropTypes.string,
    placeholderColor: PropTypes.string,
    value: PropTypes.string,
    iconColor: PropTypes.string,
    textStyle: PropTypes.object,
    editable: PropTypes.bool
  }

  static defaultProps = {
    onSearchChange: () => {},
    onEndEditing: () => {},
    onSubmitEditing: () => {},
    inputStyle: {},
    iconCloseName: "md-close-circle",
    iconSearchName: "md-search",
    iconBackName: "md-arrow-back",
    placeholder: "Search",
    returnKeyType: "search",
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    placeholderColor: "#bdbdbd",
    iconColor: "#737373",
    textStyle: {},
    editable: true
  }

  constructor(props) {
    super(props);
    this.state = {
      isOnFocus: false,
    };
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  _onClose() {
    this._textInput.setNativeProps({ text: '' });
    this.props.onSearchChange({ nativeEvent: { text : ''}});
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  _onFocus() {
    this.setState({ isOnFocus: true });
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  _onBlur() {
    this.setState({ isOnFocus: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this._dismissKeyboard();
  }

  _dismissKeyboard () {
    dismissKeyboard()
  }

  render() {
    const {
      height,
      autoCorrect,
      returnKeyType,
      onSearchChange,
      placeholder,
      padding,
      inputStyle,
      iconColor,
      iconBackName,
      iconSearchName,
      iconCloseName,
      placeholderColor,
      value,
      textStyle,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      editable,
    } = this.props;

    let { iconSize } = this.props

    iconSize = typeof iconSize !== 'undefined' ? iconSize : height * 0.8

    return (
      <View
        onStartShouldSetResponder={this._dismissKeyboard}
        style={{ padding: padding, paddingLeft: paddingLeft, paddingRight: paddingRight, paddingTop: paddingTop, paddingBottom: paddingBottom, }}
      >
        <View
          style={
            [
              styles.searchBar,
              {
                height: height + 10,
                paddingLeft: height * 0.25,
              },
              inputStyle
            ]
          }
        >
          <EvilIcons
            name={ iconSearchName }  size={ height * 1.2 }
            color={ iconColor }
          />
          {/*{ this.state.isOnFocus ?*/}
            {/*<Icon*/}
                {/*name={ iconSearchName } size={ height }*/}
                {/*color={ iconColor }*/}
            {/*/>*/}
          {/*:*/}
            {/*<Icon*/}
              {/*name={ iconSearchName } size={ height }*/}
              {/*color={ iconColor }*/}
            {/*/>*/}
          {/*}*/}
          <TextInput
            editable={ editable === true }
            autoCapitalize="none"
            autoCorrect={ autoCorrect === true }
            ref={ (c) => (this._textInput = c) }
            returnKeyType={ returnKeyType }
            onFocus={ this._onFocus }
            onBlur={ this._onBlur }
            onChangeText={ onSearchChange }
            onEndEditing={ this.props.onEndEditing }
            onSubmitEditing={ this.props.onSubmitEditing }
            placeholder={ placeholder }
            placeholderTextColor={ placeholderColor }
            value={ value }
            underlineColorAndroid="transparent"
            style={
              [styles.searchBarInput,
                {
                  // paddingLeft: height * 0.2,
                  fontSize: height * 0.6,
                  color: '#fff',
                },
                textStyle
              ]
            }
          />
          {this.state.isOnFocus ?
            <TouchableOpacity onPress={ this._onClose }>
              <Icon
                style={{ paddingRight: height * 0.5 }}
                name={ iconCloseName} size={ iconSize }
                color={ iconColor }
              />
            </TouchableOpacity>
          : null
          }
        </View>
      </View>
    );
  }
}
